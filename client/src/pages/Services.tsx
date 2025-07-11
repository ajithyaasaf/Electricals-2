import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import ServiceCard from "@/components/ServiceCard";
import { Card, CardContent } from "@/components/ui/card";

export default function Services() {
  const { data: services, isLoading } = useQuery<{ success: boolean; data: Service[] }>({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-off-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-montserrat font-bold text-3xl lg:text-4xl text-deep-gray mb-4">
              Our Services
            </h1>
            <p className="text-gray-600 text-lg">
              Professional electrical services by certified technicians
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-12 bg-gray-300 rounded mb-6"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-montserrat font-bold text-3xl lg:text-4xl text-deep-gray mb-4">
            Our Services
          </h1>
          <p className="text-gray-600 text-lg">
            Professional electrical services by certified technicians
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services?.data?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Why Choose Us */}
        <section className="bg-white rounded-xl p-8 mb-16">
          <h2 className="font-montserrat font-bold text-2xl text-deep-gray mb-8 text-center">
            Why Choose CopperBear?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-copper/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-certificate text-copper text-2xl"></i>
              </div>
              <h3 className="font-montserrat font-semibold text-lg text-deep-gray mb-2">
                Certified Technicians
              </h3>
              <p className="text-gray-600">
                Our team consists of licensed and experienced electrical technicians
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-copper/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clock text-copper text-2xl"></i>
              </div>
              <h3 className="font-montserrat font-semibold text-lg text-deep-gray mb-2">
                Quick Response
              </h3>
              <p className="text-gray-600">
                Same-day service available for urgent electrical issues
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-copper/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-copper text-2xl"></i>
              </div>
              <h3 className="font-montserrat font-semibold text-lg text-deep-gray mb-2">
                Quality Guarantee
              </h3>
              <p className="text-gray-600">
                All our work comes with a comprehensive warranty
              </p>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="bg-white rounded-xl p-8">
          <h2 className="font-montserrat font-bold text-2xl text-deep-gray mb-8 text-center">
            Service Areas in Madurai
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              "Anna Nagar", "KK Nagar", "Sellur", "Gomathipuram",
              "Villapuram", "Pasumalai", "Thiruparankundram", "Samayanallur",
              "Chintamani", "Arappalayam", "Narimedu", "Simmakkal"
            ].map((area) => (
              <div key={area} className="p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-medium">{area}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
