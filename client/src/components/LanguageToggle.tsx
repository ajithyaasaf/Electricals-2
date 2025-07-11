import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
      className="text-deep-gray hover:text-copper border-copper hover:border-copper-dark"
    >
      {language === 'en' ? 'தமிழ்' : 'EN'}
    </Button>
  );
}