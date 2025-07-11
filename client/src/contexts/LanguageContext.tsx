import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ta';
  setLanguage: (lang: 'en' | 'ta') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  en: {
    // Header
    'search.placeholder': 'Search electrical products...',
    'nav.products': 'Products',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.profile': 'Profile',
    'nav.cart': 'Cart',
    
    // Products
    'products.title': 'All Products',
    'products.filters': 'Filters',
    'products.category': 'Category',
    'products.priceRange': 'Price Range',
    'products.brand': 'Brand',
    'products.allCategories': 'All Categories',
    'products.allPrices': 'All Prices',
    'products.under500': 'Under ₹500',
    'products.500to1000': '₹500 - ₹1,000',
    'products.1000to5000': '₹1,000 - ₹5,000',
    'products.above5000': 'Above ₹5,000',
    'products.sortBy': 'Sort by',
    'products.featured': 'Featured',
    'products.priceLowHigh': 'Price: Low to High',
    'products.priceHighLow': 'Price: High to Low',
    'products.nameAZ': 'Name A-Z',
    'products.found': 'products found',
    'products.addToCart': 'Add to Cart',
    
    // Services
    'services.title': 'Our Services',
    'services.bookNow': 'Book Now',
    'services.duration': 'Duration',
    'services.starting': 'Starting from',
    
    // Common
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.price': 'Price',
    'common.quantity': 'Quantity',
    'common.total': 'Total',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
  },
  ta: {
    // Header
    'search.placeholder': 'மின்சாரம் தயாரிப்புகளைத் தேடுங்கள்...',
    'nav.products': 'பொருட்கள்',
    'nav.services': 'சேவைகள்',
    'nav.about': 'எங்களைப் பற்றி',
    'nav.contact': 'தொடர்பு',
    'nav.login': 'உள்நுழைவு',
    'nav.profile': 'சுயவிவரம்',
    'nav.cart': 'வண்டி',
    
    // Products
    'products.title': 'அனைத்து பொருட்கள்',
    'products.filters': 'வடிப்பான்கள்',
    'products.category': 'வகை',
    'products.priceRange': 'விலை வரம்பு',
    'products.brand': 'பிராண்ட்',
    'products.allCategories': 'அனைத்து வகைகள்',
    'products.allPrices': 'அனைத்து விலைகள்',
    'products.under500': '₹500 க்கு கீழ்',
    'products.500to1000': '₹500 - ₹1,000',
    'products.1000to5000': '₹1,000 - ₹5,000',
    'products.above5000': '₹5,000 க்கு மேல்',
    'products.sortBy': 'வரிசைப்படுத்து',
    'products.featured': 'சிறப்பு',
    'products.priceLowHigh': 'விலை: குறைந்த முதல் அதிக',
    'products.priceHighLow': 'விலை: அதிக முதல் குறைந்த',
    'products.nameAZ': 'பெயர் அ-ஆ',
    'products.found': 'பொருட்கள் கண்டறியப்பட்டது',
    'products.addToCart': 'வண்டியில் சேர்',
    
    // Services
    'services.title': 'எங்கள் சேவைகள்',
    'services.bookNow': 'இப்போது புத்தக செய்யுங்கள்',
    'services.duration': 'காலம்',
    'services.starting': 'தொடக்கம்',
    
    // Common
    'common.search': 'தேடு',
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'ஏதோ தவறு நடந்தது',
    'common.price': 'விலை',
    'common.quantity': 'அளவு',
    'common.total': 'மொத்தம்',
    'common.cancel': 'ரத்து',
    'common.confirm': 'உறுதிப்படுத்து',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ta'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ta';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const updateLanguage = (lang: 'en' | 'ta') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}