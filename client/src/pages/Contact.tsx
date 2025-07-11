import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-off-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-montserrat font-bold text-4xl text-deep-gray mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with CopperBear for all your electrical needs in Madurai
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat text-2xl text-deep-gray">
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-copper rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-gray">Address</h3>
                    <p className="text-gray-600">
                      123 Electrical Street<br />
                      Madurai, Tamil Nadu 625001<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-copper rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-gray">Phone</h3>
                    <p className="text-gray-600">+91 9876543210</p>
                    <p className="text-gray-600">+91 4452 123456</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-copper rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-gray">Email</h3>
                    <p className="text-gray-600">info@copperbear.com</p>
                    <p className="text-gray-600">support@copperbear.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-copper rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-gray">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 text-sm mt-2">
                      Emergency services available 24/7
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Card */}
            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat text-xl text-deep-gray">
                  Our Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-off-white rounded-lg">
                    <i className="fas fa-home text-copper text-2xl mb-2"></i>
                    <p className="text-sm font-medium text-deep-gray">Home Installation</p>
                  </div>
                  <div className="text-center p-4 bg-off-white rounded-lg">
                    <i className="fas fa-tools text-copper text-2xl mb-2"></i>
                    <p className="text-sm font-medium text-deep-gray">Repair & Maintenance</p>
                  </div>
                  <div className="text-center p-4 bg-off-white rounded-lg">
                    <i className="fas fa-building text-copper text-2xl mb-2"></i>
                    <p className="text-sm font-medium text-deep-gray">Commercial Solutions</p>
                  </div>
                  <div className="text-center p-4 bg-off-white rounded-lg">
                    <i className="fas fa-exclamation-triangle text-copper text-2xl mb-2"></i>
                    <p className="text-sm font-medium text-deep-gray">Emergency Services</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat text-2xl text-deep-gray">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-deep-gray mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="focus:ring-2 focus:ring-copper focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-deep-gray mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="focus:ring-2 focus:ring-copper focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-deep-gray mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="focus:ring-2 focus:ring-copper focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-deep-gray mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="focus:ring-2 focus:ring-copper focus:border-transparent"
                      placeholder="Tell us about your electrical needs..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-copper hover:bg-copper-dark text-white font-semibold py-3"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}