import { Link, useLocation } from "wouter";
import { Search, User, ShoppingCart, Menu, ChevronDown } from "lucide-react";
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
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isBrandsMenuOpen, setIsBrandsMenuOpen] = useState(false);

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
          <nav className="hidden lg:flex space-x-6">
            {/* Products Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsMenuOpen(true)}
              onMouseLeave={() => setIsProductsMenuOpen(false)}
            >
              <button className={`flex items-center text-deep-gray hover:text-copper transition-colors font-medium ${location === '/products' ? 'text-copper' : ''}`}>
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isProductsMenuOpen && (
                <div className="absolute top-full left-0 w-96 bg-white shadow-xl border border-gray-200 rounded-lg p-6 z-50">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-copper mb-3">By Category</h3>
                      <ul className="space-y-2">
                        <li><Link href="/categories" className="text-gray-600 hover:text-copper">All Categories</Link></li>
                        <li><Link href="/products?category=1" className="text-gray-600 hover:text-copper">Switches & Accessories</Link></li>
                        <li><Link href="/products?category=2" className="text-gray-600 hover:text-copper">Wires & Cables</Link></li>
                        <li><Link href="/products?category=3" className="text-gray-600 hover:text-copper">Lighting Solutions</Link></li>
                        <li><Link href="/products?category=4" className="text-gray-600 hover:text-copper">Fans & Appliances</Link></li>
                        <li><Link href="/products?category=5" className="text-gray-600 hover:text-copper">Protection & Control</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-copper mb-3">Popular Products</h3>
                      <ul className="space-y-2">
                        <li><Link href="/products?search=modular%20switch" className="text-gray-600 hover:text-copper">Modular Switches</Link></li>
                        <li><Link href="/products?search=LED" className="text-gray-600 hover:text-copper">LED Lights</Link></li>
                        <li><Link href="/products?search=cable" className="text-gray-600 hover:text-copper">Electrical Cables</Link></li>
                        <li><Link href="/products?search=MCB" className="text-gray-600 hover:text-copper">Circuit Breakers</Link></li>
                        <li><Link href="/products?search=fan" className="text-gray-600 hover:text-copper">Ceiling Fans</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Brands Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsBrandsMenuOpen(true)}
              onMouseLeave={() => setIsBrandsMenuOpen(false)}
            >
              <button className={`flex items-center text-deep-gray hover:text-copper transition-colors font-medium ${location === '/brands' ? 'text-copper' : ''}`}>
                Brands <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isBrandsMenuOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-gray-200 rounded-lg p-4 z-50">
                  <ul className="space-y-2">
                    <li><Link href="/brands" className="text-gray-600 hover:text-copper font-medium">All Brands</Link></li>
                    <li><Link href="/products?brand=ANCHOR" className="text-gray-600 hover:text-copper">Anchor</Link></li>
                    <li><Link href="/products?brand=CROMPTON" className="text-gray-600 hover:text-copper">Crompton</Link></li>
                    <li><Link href="/products?brand=HAVELLS" className="text-gray-600 hover:text-copper">Havells</Link></li>
                    <li><Link href="/products?brand=POLYCAB" className="text-gray-600 hover:text-copper">Polycab</Link></li>
                    <li><Link href="/products?brand=LEGRAND" className="text-gray-600 hover:text-copper">Legrand</Link></li>
                    <li><Link href="/products?brand=V-GUARD" className="text-gray-600 hover:text-copper">V-Guard</Link></li>
                  </ul>
                </div>
              )}
            </div>

            <Link href="/wholesale" className={`text-deep-gray hover:text-copper transition-colors font-medium ${location === '/wholesale' ? 'text-copper' : ''}`}>
              Wholesale
            </Link>
            <Link href="/services" className={`text-deep-gray hover:text-copper transition-colors font-medium ${location === '/services' ? 'text-copper' : ''}`}>
              Services
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
