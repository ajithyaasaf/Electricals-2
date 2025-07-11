import { useQuery } from "@tanstack/react-query";
import { Product, Service, Category } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ShoppingCart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useMemo } from "react";

export default function Home() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { data: products } = useQuery<{ data: Product[] }>({
    queryKey: ['/api/products'],
    queryFn: () => fetch('/api/products').then(res => res.json()),
  });

  const { data: services } = useQuery<{ data: Service[] }>({
    queryKey: ['/api/services'],
    queryFn: () => fetch('/api/services').then(res => res.json()),
  });

  const { data: categories } = useQuery<{ data: Category[] }>({
    queryKey: ['/api/categories'],
    queryFn: () => fetch('/api/categories').then(res => res.json()),
  });

  const featuredProducts = products?.data?.slice(0, 10) || [];
  const bestDeals = products?.data?.slice(0, 7) || [];
  const topCategories = categories?.data?.slice(0, 10) || [];

  // Generate fixed discount percentages that won't change on re-render
  const categoryDiscounts = useMemo(() => {
    return topCategories.map(() => Math.floor(Math.random() * 50) + 20);
  }, [topCategories.length]);

  // Define different slide content
  const slides = [
    {
      title: "Up to 70% Off*",
      subtitle: "On Electrical Products",
      description: "Claim GST Benefits on Business Purchase",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop",
      alt: "Electrical Products"
    },
    {
      title: "Premium Quality",
      subtitle: "MCCBs & Circuit Breakers",
      description: "Professional grade electrical safety equipment",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      alt: "Circuit Breakers"
    },
    {
      title: "Smart Solutions",
      subtitle: "IoT & Smart Switches",
      description: "Modern electrical automation for homes & offices",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      alt: "Smart Switches"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Product Categories Bar */}
      <section className="bg-white py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center overflow-x-auto gap-4 pb-2">
            {topCategories.map((category, index) => (
              <Link key={category.id} href={`/products?category=${category.id}`}>
                <div className="flex-shrink-0 text-center cursor-pointer group min-w-[100px]">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg mb-2 flex items-center justify-center group-hover:bg-copper/10 transition-colors">
                    <img 
                      src={category.imageUrl || `https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=80&h=80&fit=crop&crop=center`}
                      alt={category.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </div>
                  <h3 className="text-xs font-medium text-gray-800 group-hover:text-copper transition-colors">
                    {category.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 mt-1">
                    {categoryDiscounts[index]}% OFF*
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-copper/90 to-slate-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/10 rotate-12"></div>
          <div className="absolute top-1/2 right-32 w-16 h-16 border border-white/10 rotate-45"></div>
        </div>
        
        <div className="relative h-[600px] flex items-center">
          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-4 flex items-center z-20">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="text-white hover:bg-white/20 rounded-full w-12 h-12 p-0"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center z-20">
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="text-white hover:bg-white/20 rounded-full w-12 h-12 p-0"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content Side */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center bg-copper/20 backdrop-blur-sm border border-copper/30 text-copper-100 px-4 py-2 rounded-full">
                    <span className="font-semibold">✨ Premium Quality</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-white to-copper-200 bg-clip-text text-transparent">
                      {slides[currentSlide].title}
                    </span>
                  </h1>
                  
                  <p className="text-xl lg:text-2xl text-copper-100 font-medium">
                    {slides[currentSlide].subtitle}
                  </p>
                  
                  <p className="text-lg text-gray-300 max-w-lg">
                    {slides[currentSlide].description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <Link href="/products">
                      <Button size="lg" className="bg-copper hover:bg-copper/90 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
                        Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/services">
                      <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold">
                        Our Services
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-green-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Free Delivery ₹500+</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>24/7 Support</span>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-300">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>1 Year Warranty</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image Side */}
              <div className="relative">
                <div className="relative z-10">
                  <img 
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].alt}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl transition-all duration-700 transform hover:scale-105"
                  />
                  {/* Floating Stats */}
                  <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm text-slate-900 p-4 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold text-copper">10K+</div>
                    <div className="text-sm">Happy Customers</div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm text-slate-900 p-4 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold text-copper">24/7</div>
                    <div className="text-sm">Support</div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-20 h-20 bg-copper/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
          
          {/* Modern Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 bg-copper' 
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Best Deals Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Best Deals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
            {bestDeals.map((product) => (
              <Card key={product.id} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="relative">
                    <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs">
                      {product.discount}% Off
                    </Badge>
                    <img 
                      src={product.imageUrl || "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=200&h=150&fit=crop"}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src={`https://logo.clearbit.com/${product.brand.toLowerCase()}.com`}
                      alt={product.brand}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="text-xs font-medium text-gray-600">
                      {product.brand.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 group-hover:text-copper transition-colors">
                    {product.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Shop by Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {topCategories.slice(0, 10).map((category) => (
              <Link key={category.id} href={`/products?category=${category.id}`}>
                <Card className="group hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <img 
                      src={category.imageUrl || "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=150&h=120&fit=crop"}
                      alt={category.name}
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-medium text-sm text-gray-900 group-hover:text-copper transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Services - Exclusive Deals */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Professional Services - Exclusive Deals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services?.data?.map((service) => (
              <Card key={service.id} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="relative">
                    <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs">
                      Best Price
                    </Badge>
                    <img 
                      src={service.imageUrl || "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=200&h=150&fit=crop"}
                      alt={service.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-orange-600">
                      COPPERBEAR
                    </span>
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 group-hover:text-copper transition-colors mb-2">
                    {service.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{service.price}
                    </span>
                    <Button size="sm" className="bg-copper hover:bg-copper-dark">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-copper text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our complete range of electrical products and professional services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-copper hover:bg-gray-100">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shop Products
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-copper">
                <ArrowRight className="mr-2 h-5 w-5" />
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}