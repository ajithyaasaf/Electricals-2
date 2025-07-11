import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Brands() {
  const { t } = useLanguage();
  
  const { data: products } = useQuery<{ data: Product[] }>({
    queryKey: ['/api/products'],
    queryFn: () => fetch('/api/products').then(res => res.json()),
  });

  // Extract unique brands from products
  const brands = products?.data ? 
    [...new Set(products.data.map(p => p.brand))].filter(Boolean) : [];

  const brandInfo = [
    { name: "ANCHOR", description: "Modular switches, PANTA, ROMA series", logo: "https://logo.clearbit.com/anchor.com" },
    { name: "CROMPTON", description: "Fans - ceiling, exhaust, pedestal, table, wall", logo: "https://logo.clearbit.com/crompton.com" },
    { name: "HAVELLS", description: "Premium electrical items", logo: "https://logo.clearbit.com/havells.com" },
    { name: "POLYCAB", description: "Wires, cables and electrical solutions", logo: "https://logo.clearbit.com/polycab.com" },
    { name: "LEGRAND", description: "Premium switches and accessories", logo: "https://logo.clearbit.com/legrand.com" },
    { name: "V-GUARD", description: "Voltage stabilizers and protection", logo: "https://logo.clearbit.com/vguard.com" },
    { name: "GOLDMEDAL", description: "Electrical accessories", logo: "https://logo.clearbit.com/goldmedal.com" },
    { name: "FINOLEX", description: "Cables and wires", logo: "https://logo.clearbit.com/finolex.com" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-copper to-copper-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Premium Electrical Brands</h1>
            <p className="text-xl text-copper-100 max-w-2xl mx-auto">
              Discover our curated selection of trusted electrical brands for all your residential and commercial needs.
            </p>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {brandInfo.map((brand) => (
              <Link key={brand.name} href={`/products?brand=${encodeURIComponent(brand.name)}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <img 
                        src={brand.logo}
                        alt={brand.name}
                        className="w-20 h-20 mx-auto object-contain group-hover:scale-110 transition-transform"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/80x80/copper/white?text=${brand.name.charAt(0)}`;
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-copper transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {brand.description}
                    </p>
                    <Badge variant="secondary" className="bg-copper/10 text-copper">
                      View Products
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brand Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Premium Brands?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-copper/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-certificate text-2xl text-copper"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Certified Quality</h3>
              <p className="text-gray-600">All brands meet international safety and quality standards</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-copper/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl text-copper"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Warranty Protection</h3>
              <p className="text-gray-600">Comprehensive warranty coverage on all products</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-copper/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-tools text-2xl text-copper"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-gray-600">Professional installation and maintenance support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}