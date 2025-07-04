export interface CreditCard {
  bank: string;
  card: string;
  joiningFee: number;
  annualFee: number;
  rewardRate: string;
  welcomeBonus: string;
  loungeAccess: string;
  forexMarkup: string;
  features?: string[];
  description?: string;
  image?: string;
  slug?: string;
}

export const creditCardsData: CreditCard[] = [
  {
    bank: "HDFC Bank",
    card: "MoneyBack+ Credit Card",
    joiningFee: 500,
    annualFee: 500,
    rewardRate: "0.5 % on regular spends • up to 2 % on 10X partner brands",
    welcomeBonus: "500 CashPoints",
    loungeAccess: "0 visits / year",
    forexMarkup: "3.5 %",
    features: [
      "Cashback on online shopping",
      "Fuel surcharge waiver",
      "EMI conversion facility",
      "Zero liability on lost card"
    ],
    description: "Perfect for everyday spending with attractive cashback rewards",
    image: "/assets/cards/hdfc-moneyback.jpg",
    slug: "moneyback-plus"
  },
  {
    bank: "HDFC Bank",
    card: "Regalia Gold Credit Card",
    joiningFee: 2500,
    annualFee: 2500,
    rewardRate: "≈ 1.3 % base (4 RP/₹150) • higher on partner brands",
    welcomeBonus: "₹2,500 voucher + MMTBLACK & Swiggy One",
    loungeAccess: "12 dom + 6 intl / year",
    forexMarkup: "2 %",
    features: [
      "Airport lounge access",
      "Travel insurance coverage",
      "Dining privileges",
      "Golf program benefits"
    ],
    description: "Premium lifestyle card with exceptional travel and dining benefits",
    image: "/assets/cards/hdfc-regalia.jpg",
    slug: "regalia-gold"
  },
  {
    bank: "HDFC Bank",
    card: "Infinia Metal Credit Card",
    joiningFee: 12500,
    annualFee: 12500,
    rewardRate: "3.3 % (5 RP/₹150, 1 RP = ₹1)",
    welcomeBonus: "12,500 RP + 1-yr Club Marriott",
    loungeAccess: "Unlimited worldwide",
    forexMarkup: "2 %",
    features: [
      "Unlimited lounge access worldwide",
      "Club Marriott membership",
      "Premium concierge service",
      "Golf privileges worldwide"
    ],
    description: "Ultra-premium metal card for affluent customers",
    image: "/assets/cards/hdfc-infinia.jpg",
    slug: "infinia-metal"
  },
  {
    bank: "ICICI Bank",
    card: "Coral Credit Card",
    joiningFee: 500,
    annualFee: 500,
    rewardRate: "0.5 % base (2 RP/₹100)",
    welcomeBonus: "None",
    loungeAccess: "4 dom + 4 rail / year (1 each/qtr)",
    forexMarkup: "3.5 %",
    features: [
      "Railway lounge access",
      "Fuel surcharge waiver",
      "Movie ticket discounts",
      "Shopping privileges"
    ],
    description: "Entry-level card with basic rewards and benefits",
    image: "/assets/cards/icici-coral.jpg",
    slug: "coral"
  },
  {
    bank: "ICICI Bank",
    card: "Sapphiro Credit Card",
    joiningFee: 6500,
    annualFee: 3500,
    rewardRate: "0.5 % domestic • 1 % international",
    welcomeBonus: "Travel & shopping vouchers worth ₹9,500",
    loungeAccess: "16 dom + 2 intl / year",
    forexMarkup: "3.5 %",
    features: [
      "International lounge access",
      "Travel insurance",
      "Concierge services",
      "Dining privileges"
    ],
    description: "Travel-focused card with enhanced international benefits",
    image: "/assets/cards/icici-sapphiro.jpg",
    slug: "sapphiro"
  },
  {
    bank: "ICICI Bank",
    card: "Emeralde Private Metal Credit Card",
    joiningFee: 12499,
    annualFee: 12499,
    rewardRate: "1 % (4 RP/₹100)",
    welcomeBonus: "12,500 RP + Taj Epicure",
    loungeAccess: "Unlimited dom & intl",
    forexMarkup: "1.5–2 %",
    features: [
      "Unlimited lounge access",
      "Taj Epicure membership",
      "Private banking privileges",
      "Priority customer service"
    ],
    description: "Ultra-exclusive metal card for high-net-worth individuals",
    image: "/assets/cards/icici-emeralde.jpg",
    slug: "emeralde-private-metal"
  },
  {
    bank: "SBI Card",
    card: "SimplyCLICK Credit Card",
    joiningFee: 499,
    annualFee: 499,
    rewardRate: "1 % base • 2.5 % (10× RP) on partner sites",
    welcomeBonus: "₹500 Amazon voucher",
    loungeAccess: "0 visits / year",
    forexMarkup: "3.5 %",
    features: [
      "10X rewards on partner sites",
      "Online shopping benefits",
      "Fuel surcharge waiver",
      "Easy EMI options"
    ],
    description: "Digital-first card optimized for online shopping",
    image: "/assets/cards/sbi-simplyclick.jpg",
    slug: "simplyclick"
  },
  {
    bank: "SBI Card",
    card: "Prime Credit Card",
    joiningFee: 2999,
    annualFee: 2999,
    rewardRate: "0.5 % base • 2.5 % on dining/grocery/department-store",
    welcomeBonus: "₹3,000 brand voucher",
    loungeAccess: "8 dom + 4 intl / year",
    forexMarkup: "3.5 %",
    features: [
      "Enhanced dining rewards",
      "Grocery shopping benefits",
      "Airport lounge access",
      "Milestone benefits"
    ],
    description: "Premium card with enhanced lifestyle benefits",
    image: "/assets/cards/sbi-prime.jpg",
    slug: "prime"
  },
  {
    bank: "SBI Card",
    card: "Elite Credit Card",
    joiningFee: 4999,
    annualFee: 4999,
    rewardRate: "up to 2.5 % (5 RP/₹100 on category spends)",
    welcomeBonus: "₹5,000 e-voucher",
    loungeAccess: "8 dom + 6 intl / year",
    forexMarkup: "1.99 %",
    features: [
      "Category-based rewards",
      "International lounge access",
      "Golf privileges",
      "Concierge services"
    ],
    description: "Elite card with premium lifestyle and travel benefits",
    image: "/assets/cards/sbi-elite.jpg",
    slug: "elite"
  },
  {
    bank: "IDFC FIRST Bank",
    card: "Classic Credit Card",
    joiningFee: 0,
    annualFee: 0,
    rewardRate: "0.75 % base (3 RP/₹150) • 2.5 % on 10× slabs",
    welcomeBonus: "₹500 voucher + 5 % cashback on 1st EMI txn",
    loungeAccess: "0 airport (4 railway / qtr)",
    forexMarkup: "3.5 %",
    features: [
      "Lifetime free card",
      "Railway lounge access",
      "10X rewards on select categories",
      "EMI cashback benefits"
    ],
    description: "Entry-level lifetime free card with good rewards",
    image: "/assets/cards/idfc-classic.jpg",
    slug: "classic"
  },
  {
    bank: "IDFC FIRST Bank",
    card: "Millennia Credit Card",
    joiningFee: 0,
    annualFee: 0,
    rewardRate: "0.75 % base • up to 2.5 % (10×)",
    welcomeBonus: "₹500 voucher + 5 % cashback on 1st EMI txn",
    loungeAccess: "0 airport (4 railway / qtr)",
    forexMarkup: "3.5 %",
    features: [
      "Lifetime free card",
      "10X rewards program",
      "Railway lounge access",
      "Digital payment rewards"
    ],
    description: "Perfect for millennials with digital-first lifestyle",
    image: "/assets/cards/idfc-millennia.jpg",
    slug: "millennia"
  },
  {
    bank: "IDFC FIRST Bank",
    card: "Wealth Credit Card",
    joiningFee: 0,
    annualFee: 0,
    rewardRate: "1 % base • up to 2.5 % (10×)",
    welcomeBonus: "₹500 voucher",
    loungeAccess: "16 combined dom/intl + spa (4 / qtr)",
    forexMarkup: "1.5 %",
    features: [
      "Lifetime free card",
      "Airport and spa access",
      "Enhanced reward rates",
      "Wealth management services"
    ],
    description: "Premium lifetime free card for affluent customers",
    image: "/assets/cards/idfc-wealth.jpg",
    slug: "wealth"
  },
  {
    bank: "YES Bank",
    card: "Kisan Credit Card",
    joiningFee: 0,
    annualFee: 0,
    rewardRate: "N/A (agr-loan card)",
    welcomeBonus: "None",
    loungeAccess: "0 visits / year",
    forexMarkup: "N/A",
    features: [
      "Agriculture loan facility",
      "Crop insurance benefits",
      "Rural banking services",
      "Government scheme benefits"
    ],
    description: "Specialized card for farmers and agricultural needs",
    image: "/assets/cards/yes-kisan.jpg",
    slug: "kisan"
  },
  {
    bank: "YES Bank",
    card: "Prosperity Edge Credit Card",
    joiningFee: 399,
    annualFee: 399,
    rewardRate: "0.5 % (4 RP/₹200)",
    welcomeBonus: "None",
    loungeAccess: "≈ 6 domestic visits / year",
    forexMarkup: "≈ 3 %",
    features: [
      "Domestic lounge access",
      "Fuel surcharge waiver",
      "EMI conversion facility",
      "Online shopping benefits"
    ],
    description: "Affordable card with essential benefits",
    image: "/assets/cards/yes-prosperity.jpg",
    slug: "prosperity-edge"
  },
  {
    bank: "YES Bank",
    card: "Marquee Credit Card",
    joiningFee: 9999,
    annualFee: 4999,
    rewardRate: "2.25 % offline • 4.5 % online (18/36 RP per ₹200)",
    welcomeBonus: "ET Prime + 40,000 RP",
    loungeAccess: "24 dom (6/qtr) + Unlimited intl",
    forexMarkup: "1 %",
    features: [
      "Unlimited international lounge access",
      "ET Prime membership",
      "Enhanced online rewards",
      "Premium concierge services"
    ],
    description: "Ultra-premium card with exceptional online rewards",
    image: "/assets/cards/yes-marquee.jpg",
    slug: "marquee"
  }
];

export const getBankCards = (bankName: string): CreditCard[] => {
  return creditCardsData.filter(card => card.bank === bankName);
};

export const getCardBySlug = (slug: string): CreditCard | undefined => {
  return creditCardsData.find(card => card.slug === slug);
};

export const getAllBanks = (): string[] => {
  return Array.from(new Set(creditCardsData.map(card => card.bank)));
}; 