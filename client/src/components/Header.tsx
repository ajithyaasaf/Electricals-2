import { Link, useLocation } from "wouter";
import { Search, User, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import VoiceSearch from "@/components/VoiceSearch";
import LanguageToggle from "@/components/LanguageToggle";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const { user } = useAuth();
  const { getTotalItems, setIsOpen } = useCart();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-copper rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-bolt text-white text-lg"></i>
              </div>
              <span className="font-montserrat font-bold text-xl text-deep-gray">CopperBear</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                className="w-full pr-12 rounded-full border-gray-300 focus:ring-2 focus:ring-copper focus:border-transparent"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <VoiceSearch 
                  onResult={setSearchQuery} 
                  className="bg-copper hover:bg-copper-dark text-white rounded-full px-3"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-copper hover:bg-copper-dark text-white rounded-full px-4"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link href="/products" className={`text-deep-gray hover:text-copper transition-colors font-medium ${location === '/products' ? 'text-copper' : ''}`}>
              {t('nav.products')}
            </Link>
            <Link href="/services" className={`text-deep-gray hover:text-copper transition-colors font-medium ${location === '/services' ? 'text-copper' : ''}`}>
              {t('nav.services')}
            </Link>
            <Link href="/about" className={`text-deep-gray hover:text-copper transition-colors font-medium ${location === '/about' ? 'text-copper' : ''}`}>
              {t('nav.about')}
            </Link>
            <Link href="/contact" className={`text-deep-gray hover:text-copper transition-colors font-medium ${location === '/contact' ? 'text-copper' : ''}`}>
              {t('nav.contact')}
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <Link href={user ? "/profile" : "/login"}>
              <Button variant="ghost" size="sm" className="text-deep-gray hover:text-copper">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-deep-gray hover:text-copper relative"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm" className="lg:hidden text-deep-gray">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
