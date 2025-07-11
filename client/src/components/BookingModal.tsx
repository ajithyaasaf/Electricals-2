import { useState } from "react";
import { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { X } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
}

export default function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    preferredDate: "",
    preferredTime: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to book a service.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const bookingData = {
        serviceId: service.id,
        userId: 1, // This would come from actual user auth
        bookingNumber: `BK${Date.now()}`,
        preferredDate: new Date(formData.preferredDate),
        preferredTime: formData.preferredTime,
        phone: formData.phone,
        address: formData.address,
        notes: formData.notes,
        totalAmount: service.price,
        status: "pending",
      };

      await apiRequest("POST", "/api/bookings", bookingData);
      
      toast({
        title: "Booking confirmed!",
        description: "Your service booking has been confirmed. We'll contact you soon.",
      });
      
      onClose();
      setFormData({
        preferredDate: "",
        preferredTime: "",
        phone: "",
        address: "",
        notes: "",
      });
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-montserrat font-semibold text-2xl text-deep-gray">
            Book Service
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-gray-700 font-semibold">Service</Label>
            <div className="mt-1 p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold text-deep-gray">{service.name}</div>
              <div className="text-copper font-bold">₹{parseFloat(service.price).toFixed(2)}</div>
            </div>
          </div>

          <div>
            <Label htmlFor="date" className="text-gray-700 font-semibold">
              Preferred Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.preferredDate}
              onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
              className="mt-1 focus:ring-2 focus:ring-copper focus:border-transparent"
              required
            />
          </div>

          <div>
            <Label htmlFor="time" className="text-gray-700 font-semibold">
              Preferred Time
            </Label>
            <Select value={formData.preferredTime} onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTime: value }))}>
              <SelectTrigger className="mt-1 focus:ring-2 focus:ring-copper">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</SelectItem>
                <SelectItem value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</SelectItem>
                <SelectItem value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</SelectItem>
                <SelectItem value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="phone" className="text-gray-700 font-semibold">
              Contact Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="mt-1 focus:ring-2 focus:ring-copper focus:border-transparent"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div>
            <Label htmlFor="address" className="text-gray-700 font-semibold">
              Address
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="mt-1 focus:ring-2 focus:ring-copper focus:border-transparent h-20"
              placeholder="Enter your complete address"
              required
            />
          </div>

          <div>
            <Label htmlFor="notes" className="text-gray-700 font-semibold">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="mt-1 focus:ring-2 focus:ring-copper focus:border-transparent h-20"
              placeholder="Any specific requirements or instructions"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-copper hover:bg-copper-dark text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {isLoading ? "Booking..." : "Book Service"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
