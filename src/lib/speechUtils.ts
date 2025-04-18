'use client';

// Speech synthesis utility for Finbot
export class SpeechService {
  private static instance: SpeechService;
  private synthesis: SpeechSynthesis;
  private recognition: SpeechRecognition;
  private voices: SpeechSynthesisVoice[] = [];
  private preferredVoice: SpeechSynthesisVoice | null = null;
  private isListening: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis;
      
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

  public startListening(onResult: (text: string) => void, onError?: (error: string) => void): void {
    if (!this.recognition) return;

    this.recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      onResult(text);
    };

    this.recognition.onerror = (event) => {
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

      const utterance = new SpeechSynthesisUtterance(text);
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

  // Format currency values for speech
  public formatCurrencyForSpeech(value: string | number): string {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return 'invalid amount';
    
    const crore = Math.floor(num / 10000000);
    const lakh = Math.floor((num % 10000000) / 100000);
    const remaining = Math.floor((num % 100000) / 1000);
    
    let speech = '';
    if (crore > 0) speech += `${crore} crore `;
    if (lakh > 0) speech += `${lakh} lakh `;
    if (remaining > 0) speech += `${remaining} thousand `;
    
    return speech.trim() || 'zero';
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