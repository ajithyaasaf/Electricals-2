import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Product, Category, Service } from "@shared/schema";
import ProductCard from "@/components/ProductCard";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
  const { data: categories } = useQuery<{ success: boolean; data: Category[] }>({
    queryKey: ["/api/categories"],
  });

  const { data: featuredProducts } = useQuery<{ success: boolean; data: Product[] }>({
    queryKey: ["/api/products", { limit: 4 }],
  });

  const { data: services } = useQuery<{ success: boolean; data: Service[] }>({
    queryKey: ["/api/services"],
  });

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="hero-gradient py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-montserrat font-bold text-4xl lg:text-6xl mb-6">
                Professional Electrical Solutions
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Quality electrical products and expert installation services for homes and businesses in Madurai
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button className="bg-accent-blue hover:bg-accent-blue-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                    Shop Products
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-copper px-8 py-3 rounded-lg font-semibold transition-colors">
                    Book Service
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop" 
                alt="Professional electrical workshop" 
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-deep-gray mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our comprehensive range of electrical products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories?.data?.map((category) => (
              <Link key={category.id} href={`/products?category=${category.id}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <img 
                      src={category.imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"} 
                      alt={category.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-montserrat font-semibold text-xl text-deep-gray mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{category.description}</p>
                    <span className="text-copper font-semibold">View Products</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-deep-gray mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">
              Our best-selling electrical products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts?.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button className="bg-copper hover:bg-copper-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-deep-gray mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 text-lg">
              Professional electrical services by certified technicians
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services?.data?.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
