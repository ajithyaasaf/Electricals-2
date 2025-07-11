import { useQuery } from "@tanstack/react-query";
import { Category, Product } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Categories() {
  const { t } = useLanguage();
  
  const { data: categories } = useQuery<{ data: Category[] }>({
    queryKey: ['/api/categories'],
    queryFn: () => fetch('/api/categories').then(res => res.json()),
  });

  const { data: products } = useQuery<{ data: Product[] }>({
    queryKey: ['/api/products'],
    queryFn: () => fetch('/api/products').then(res => res.json()),
  });

  const categoryDetails = [
    {
      name: "Switches & Accessories",
      description: "Modular switches, traditional switches, socket outlets, cover plates",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
      subcategories: ["Modular Switches", "Traditional Switches", "Socket Outlets", "Cover Plates"],
      productCount: products?.data?.filter(p => p.categoryId === 1).length || 0
    },
    {
      name: "Wires & Cables", 
      description: "House wiring cables, industrial cables, flexible cables",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop",
      subcategories: ["House Wiring Cables", "Industrial Cables", "Flexible Cables", "Armored Cables"],
      productCount: products?.data?.filter(p => p.categoryId === 2).length || 0
    },
    {
      name: "Lighting Solutions",
      description: "LED lights, traditional lighting, industrial lighting",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      subcategories: ["LED Lights", "Traditional Lighting", "Industrial Lighting", "Smart Lighting"],
      productCount: products?.data?.filter(p => p.categoryId === 3).length || 0
    },
    {
      name: "Fans & Appliances",
      description: "Ceiling fans, exhaust fans, pedestal fans, table fans",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
      subcategories: ["Ceiling Fans", "Exhaust Fans", "Pedestal Fans", "Table Fans"],
      productCount: products?.data?.filter(p => p.categoryId === 4).length || 0
    },
    {
      name: "Protection & Control",
      description: "MCBs, DB boxes, surge protectors, circuit breakers",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop",
      subcategories: ["MCBs", "DB Boxes", "Surge Protectors", "Circuit Breakers"],
      productCount: products?.data?.filter(p => p.categoryId === 5).length || 0
    },
    {
      name: "Tools & Equipment",
      description: "Hand tools, power tools, testing equipment, safety gear",
      image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&h=200&fit=crop",
      subcategories: ["Hand Tools", "Power Tools", "Testing Equipment", "Safety Gear"],
      productCount: products?.data?.filter(p => p.categoryId === 6).length || 0
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-copper text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Product Categories</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Explore our comprehensive range of electrical products organized by category for easy browsing.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryDetails.map((category, index) => (
              <Link key={category.name} href={`/products?category=${index + 1}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={category.image}
                        alt={category.name}
                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-copper text-white">
                          {category.productCount} Products
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-copper transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-gray-800">Subcategories:</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.map((sub) => (
                            <Badge key={sub} variant="secondary" className="text-xs">
                              {sub}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Help Finding Products?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our expert team can help you find the right electrical products for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-copper hover:bg-copper-dark text-white px-8 py-3 rounded-lg font-semibold">
                Contact Our Experts
              </button>
            </Link>
            <Link href="/products">
              <button className="border-2 border-copper text-copper hover:bg-copper hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Browse All Products
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}