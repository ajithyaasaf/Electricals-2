import { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import BookingModal from "./BookingModal";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'home-installation':
        return 'fas fa-home';
      case 'repair-maintenance':
        return 'fas fa-tools';
      case 'commercial-solutions':
        return 'fas fa-building';
      default:
        return 'fas fa-cog';
    }
  };

  return (
    <>
      <Card className="service-card bg-off-white rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
        <div className="w-16 h-16 bg-copper rounded-full flex items-center justify-center mx-auto mb-6">
          <i className={`${getServiceIcon(service.slug)} text-white text-2xl`}></i>
        </div>
        <h3 className="font-montserrat font-semibold text-xl text-deep-gray mb-4">
          {service.name}
        </h3>
        <p className="text-gray-600 mb-6 min-h-[48px]">
          {service.description}
        </p>
        <div className="mb-6">
          <div className="text-copper font-bold text-lg mb-2">
            Starting from ₹{parseFloat(service.price).toFixed(2)}
          </div>
          {service.duration && (
            <div className="text-gray-500 text-sm">
              Duration: {service.duration}
            </div>
          )}
        </div>
        <Button
          onClick={() => setIsBookingOpen(true)}
          className="bg-accent-blue hover:bg-accent-blue-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Book Service
        </Button>
      </Card>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        service={service}
      />
    </>
  );
}
