import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function Wholesale() {
  const { t } = useLanguage();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    requirement: ''
  });

  const { data: products } = useQuery<{ data: Product[] }>({
    queryKey: ['/api/products'],
    queryFn: () => fetch('/api/products').then(res => res.json()),
  });

  const wholesaleFeatures = [
    {
      icon: "fas fa-percent",
      title: "Bulk Pricing",
      description: "Special discounted rates for bulk orders and regular customers"
    },
    {
      icon: "fas fa-truck",
      title: "Free Delivery",
      description: "Complimentary delivery for orders above ₹10,000 within city limits"
    },
    {
      icon: "fas fa-handshake",
      title: "Credit Terms",
      description: "Flexible payment terms for registered business customers"
    },
    {
      icon: "fas fa-clock",
      title: "24/7 Support",
      description: "Round-the-clock customer support for wholesale inquiries"
    },
    {
      icon: "fas fa-warehouse",
      title: "Stock Availability",
      description: "Real-time inventory updates and guaranteed stock for large orders"
    },
    {
      icon: "fas fa-tools",
      title: "Technical Support",
      description: "Expert guidance on product selection and installation"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle wholesale inquiry submission
    console.log('Wholesale inquiry:', contactForm);
    alert('Thank you for your inquiry! We will contact you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-copper to-copper-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Wholesale Electrical Solutions</h1>
              <p className="text-xl text-copper-100 mb-8">
                Partner with CopperBear for competitive wholesale pricing, reliable supply, and exceptional service for your electrical business needs.
              </p>
              <div className="flex items-center gap-6">
                <Badge className="bg-green-600 text-white px-4 py-2 text-lg">
                  ✓ Bulk Discounts Available
                </Badge>
                <Badge className="bg-blue-600 text-white px-4 py-2 text-lg">
                  ✓ Credit Terms
                </Badge>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop"
                alt="Wholesale Electrical Products"
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose CopperBear for Wholesale?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wholesaleFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-copper/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className={`${feature.icon} text-2xl text-copper`}></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Wholesale Pricing Tiers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-200 hover:border-copper transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Bronze</h3>
                <div className="text-4xl font-bold text-copper mb-4">5-10%</div>
                <p className="text-gray-600 mb-6">Discount on orders ₹25,000+</p>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> Standard delivery</li>
                  <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> Email support</li>
                  <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> 30-day payment terms</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-copper bg-copper/5">
              <CardContent className="p-8 text-center">
                <div className="bg-copper text-white px-4 py-1 rounded-full text-sm mb-4">POPULAR</div>
                <h3 className="text-2xl font-bold mb-4">Silver</h3>
                <div className="text-4xl font-bold text-copper mb-4">10-15%</div>
                <p className="text-gray-600 mb-6">Discount on orders ₹50,000+</p>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> Priority delivery</li>
                  <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> Phone support</li>
                  <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> 45-day payment terms</li>
                  <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> Dedicated account manager</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-copper transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Gold</h3>
                <div className="text-4xl font-bold text-copper mb-4">15-25%</div>
                <p className="text-gray-600 mb-6">Discount on orders ₹1,00,000+</p>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> Express delivery</li>
                  <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> 24/7 support</li>
                  <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> 60-day payment terms</li>
                  <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> Technical consultation</li>
                  <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> Custom pricing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Get Wholesale Pricing
          </h2>
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <Input
                      value={contactForm.business}
                      onChange={(e) => setContactForm({...contactForm, business: e.target.value})}
                      placeholder="Enter your business name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requirement Details
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-copper"
                    value={contactForm.requirement}
                    onChange={(e) => setContactForm({...contactForm, requirement: e.target.value})}
                    placeholder="Tell us about your wholesale requirements..."
                  />
                </div>
                <div className="text-center">
                  <Button type="submit" size="lg" className="bg-copper hover:bg-copper-dark px-12">
                    Submit Inquiry
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}