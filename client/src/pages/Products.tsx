import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product, Category } from "@shared/schema";
import ProductCard from "@/components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import VoiceSearch from "@/components/VoiceSearch";

export default function Products() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const { data: categories } = useQuery<{ success: boolean; data: Category[] }>({
    queryKey: ["/api/categories"],
  });

  const { data: products, isLoading } = useQuery<{ success: boolean; data: Product[] }>({
    queryKey: ["/api/products", searchQuery, selectedCategory, 50],
  });

  const filteredProducts = products?.data?.filter(product => {
    const matchesPrice = priceRange === "all" || (() => {
      const price = parseFloat(product.price);
      switch (priceRange) {
        case "under-500": return price < 500;
        case "500-1000": return price >= 500 && price <= 1000;
        case "1000-5000": return price >= 1000 && price <= 5000;
        case "above-5000": return price > 5000;
        default: return true;
      }
    })();
    
    return matchesPrice;
  }) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return parseFloat(a.price) - parseFloat(b.price);
      case "price-high": return parseFloat(b.price) - parseFloat(a.price);
      case "name": return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-off-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-montserrat font-bold text-3xl text-deep-gray mb-4">
            {t('products.title')}
          </h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 focus:ring-2 focus:ring-copper focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <VoiceSearch 
                onResult={setSearchQuery} 
                className="bg-copper hover:bg-copper-dark text-white"
              />
              <Button type="submit" className="bg-copper hover:bg-copper-dark text-white">
                {t('common.search')}
              </Button>
            </div>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4" />
                  <h3 className="font-montserrat font-semibold text-lg text-deep-gray">
                    {t('products.filters')}
                  </h3>
                </div>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <Label className="font-semibold text-gray-700 mb-3 block">
                    {t('products.category')}
                  </Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="focus:ring-2 focus:ring-copper">
                      <SelectValue placeholder={t('products.allCategories')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('products.allCategories')}</SelectItem>
                      {categories?.data?.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <Label className="font-semibold text-gray-700 mb-3 block">
                    {t('products.priceRange')}
                  </Label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="focus:ring-2 focus:ring-copper">
                      <SelectValue placeholder={t('products.allPrices')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('products.allPrices')}</SelectItem>
                      <SelectItem value="under-500">{t('products.under500')}</SelectItem>
                      <SelectItem value="500-1000">{t('products.500to1000')}</SelectItem>
                      <SelectItem value="1000-5000">{t('products.1000to5000')}</SelectItem>
                      <SelectItem value="above-5000">{t('products.above5000')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <Label className="font-semibold text-gray-700 mb-3 block">
                    {t('products.brand')}
                  </Label>
                  <div className="space-y-2">
                    {["Havells", "Anchor", "Legrand", "Schneider", "Philips"].map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={brand} />
                        <Label htmlFor={brand} className="text-gray-600">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div className="text-gray-600">
                {sortedProducts.length} {t('products.found')}
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 focus:ring-2 focus:ring-copper">
                  <SelectValue placeholder={t('products.sortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">{t('products.featured')}</SelectItem>
                  <SelectItem value="price-low">{t('products.priceLowHigh')}</SelectItem>
                  <SelectItem value="price-high">{t('products.priceHighLow')}</SelectItem>
                  <SelectItem value="name">{t('products.nameAZ')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-square bg-gray-300 rounded-t-lg"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {!isLoading && sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <i className="fas fa-search text-4xl"></i>
                </div>
                <p className="text-gray-500">No products found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
