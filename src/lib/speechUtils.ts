'use client';

// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }

  interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
  }

  interface SpeechRecognitionEvent {
    results: {
      item(index: number): { item(index: number): SpeechRecognitionResult };
      length: number;
    };
  }
}

// Speech synthesis utility for Finbot
export class SpeechService {
  private static instance: SpeechService;
  private synthesis: SpeechSynthesis = window.speechSynthesis;
  private recognition: any;
  private voices: SpeechSynthesisVoice[] = [];
  private preferredVoice: SpeechSynthesisVoice | null = null;
  private isListening: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-IN';

      // Initialize voices when they're loaded
      if (this.synthesis.onvoiceschanged !== undefined) {
        this.synthesis.onvoiceschanged = () => {
          this.voices = this.synthesis.getVoices();
          // Prefer an Indian English voice if available, otherwise use any English voice
          this.preferredVoice = this.voices.find(voice => 
            voice.lang.includes('en-IN') || 
            voice.name.toLowerCase().includes('indian')
          ) || this.voices.find(voice => 
            voice.lang.startsWith('en-')
          ) || null;
        };
      }
    }
  }

  public static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }

  // Format numbers for natural speech
  private formatNumberForSpeech(num: number): string {
    // Handle special case for zero
    if (num === 0) return 'zero';

    // Convert number to words function
    const convertToWords = (n: number): string => {
      const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
      const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

      if (n < 20) return units[n];
      if (n < 100) {
        const digit = n % 10;
        return tens[Math.floor(n / 10)] + (digit > 0 ? '-' + units[digit] : '');
      }
      return ''; // For numbers >= 100, handled by main function
    };

    // Handle negative numbers
    const isNegative = num < 0;
    num = Math.abs(num);

    let words = '';

    // Handle crores
    if (num >= 10000000) {
      const crores = Math.floor(num / 10000000);
      words += convertToWords(crores) + ' crore ';
      num %= 10000000;
    }

    // Handle lakhs
    if (num >= 100000) {
      const lakhs = Math.floor(num / 100000);
      words += convertToWords(lakhs) + ' lakh ';
      num %= 100000;
    }

    // Handle thousands
    if (num >= 1000) {
      const thousands = Math.floor(num / 1000);
      words += convertToWords(thousands) + ' thousand ';
      num %= 1000;
    }

    // Handle hundreds
    if (num >= 100) {
      const hundreds = Math.floor(num / 100);
      words += convertToWords(hundreds) + ' hundred ';
      num %= 100;
    }

    // Handle remaining tens and units
    if (num > 0) {
      if (words !== '') words += 'and ';
      words += convertToWords(num);
    }

    // Clean up extra spaces and add negative if needed
    words = words.trim();
    return isNegative ? 'negative ' + words : words;
  }

  // Format currency for natural speech
  private formatCurrencyForSpeech(value: string | number): string {
    // If string, clean it up first
    const num = typeof value === 'string' ? 
      parseFloat(value.replace(/[₹,\s]/g, '')) : 
      value;

    if (isNaN(num)) return 'invalid amount';
    
    // Get the number in words
    const amountInWords = this.formatNumberForSpeech(num);
    
    // Add "rupees" at the start
    return `rupees ${amountInWords}`;
  }

  // Format mathematical expressions for speech
  private formatMathExpressionForSpeech(expression: string): string {
    return expression
      .replace(/\^/g, ' raised to the power of ')
      .replace(/\//g, ' divided by ')
      .replace(/\*/g, ' multiplied by ')
      .replace(/\+/g, ' plus ')
      .replace(/-/g, ' minus ')
      .replace(/\(/g, ' open bracket ')
      .replace(/\)/g, ' close bracket ')
      .replace(/√/g, ' square root of ')
      .replace(/=/g, ' equals ')
      .replace(/≈/g, ' approximately equals ')
      .replace(/%/g, ' percent ');
  }

  // Format formulas for speech
  private formatFormulaForSpeech(formula: string): string {
    // Replace common financial formula patterns
    return formula
      .replace(/CAGR/g, 'compound annual growth rate')
      .replace(/ROI/g, 'return on investment')
      .replace(/P\/E/g, 'price to earnings ratio')
      .replace(/EPS/g, 'earnings per share')
      .replace(/NPV/g, 'net present value');
  }

  public startListening(onResult: (text: string) => void, onError?: (error: string) => void): void {
    if (!this.recognition) return;

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const last = event.results.length - 1;
      const text = event.results.item(last).item(0).transcript;
      onResult(text);
    };

    this.recognition.onerror = (event: { error: string }) => {
      if (onError) onError(event.error);
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      console.error('Speech recognition error:', error);
      if (onError) onError('Failed to start speech recognition');
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  public speak(text: string, rate: number = 1, pitch: number = 1): Promise<void> {
    return new Promise((resolve) => {
      this.synthesis.cancel();

      // Pre-process the text to handle different types of content
      let processedText = text;
      
      // Handle currency amounts (₹ followed by numbers) - More specific pattern
      processedText = processedText.replace(/₹\s*[\d,]+(?:\.\d{1,2})?/g, (match) => {
        // Remove ₹ symbol and any spaces/commas before converting
        const numStr = match.replace(/[₹,\s]/g, '');
        const num = parseFloat(numStr);
        return this.formatCurrencyForSpeech(num);
      });
      
      // Handle mathematical expressions - but don't process numbers that were part of currency
      processedText = processedText.replace(/(?<!₹\s*)[\d+\-*/()^√=≈%]+/g, (match) => {
        // Only format if it's not part of a currency amount
        return this.formatMathExpressionForSpeech(match);
      });
      
      // Handle financial formulas
      processedText = this.formatFormulaForSpeech(processedText);

      const utterance = new SpeechSynthesisUtterance(processedText);
      utterance.rate = rate;
      utterance.pitch = pitch;

      // Use preferred voice if available
      if (this.preferredVoice) {
        utterance.voice = this.preferredVoice;
      }

      utterance.onend = () => {
        resolve();
      };

      this.synthesis.speak(utterance);
    });
  }

  public stop(): void {
    this.synthesis.cancel();
    this.stopListening();
  }

  public isRecognitionActive(): boolean {
    return this.isListening;
  }

  public isPaused(): boolean {
    return this.synthesis.paused;
  }

  public isPlaying(): boolean {
    return this.synthesis.speaking;
  }

  public pause(): void {
    this.synthesis.pause();
  }

  public resume(): void {
    this.synthesis.resume();
  }

  // Format stock updates for speech
  public formatStockUpdate(symbol: string, price: string, change: string): string {
    const priceInWords = this.formatCurrencyForSpeech(price);
    const changeNum = parseFloat(change);
    const direction = changeNum >= 0 ? 'up' : 'down';
    const changeAmount = Math.abs(changeNum);

    return `${symbol} is trading at ${priceInWords} rupees, ${direction} by ${changeAmount} rupees.`;
  }
} 