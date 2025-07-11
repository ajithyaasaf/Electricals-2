import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Order, Booking } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Profile() {
  const { user } = useAuth();

  const { data: orders } = useQuery<{ success: boolean; data: Order[] }>({
    queryKey: ["/api/orders", { userId: 1 }], // This would use actual user ID
  });

  const { data: bookings } = useQuery<{ success: boolean; data: Booking[] }>({
    queryKey: ["/api/bookings", { userId: 1 }], // This would use actual user ID
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-off-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="font-montserrat font-bold text-2xl text-deep-gray mb-4">
                Please Log In
              </h1>
              <p className="text-gray-600 mb-6">
                You need to be logged in to view your profile.
              </p>
              <Link href="/login">
                <Button className="bg-copper hover:bg-copper-dark text-white">
                  Go to Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-off-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-copper rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white text-2xl"></i>
              </div>
              <div>
                <h1 className="font-montserrat font-bold text-2xl text-deep-gray">
                  {user.displayName || user.email}
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="bookings">Service Bookings</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat font-bold text-xl text-deep-gray">
                  Your Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders?.data?.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-shopping-cart text-gray-400 text-4xl mb-4"></i>
                    <p className="text-gray-500">No orders yet</p>
                    <Link href="/products">
                      <Button className="mt-4 bg-copper hover:bg-copper-dark text-white">
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders?.data?.map((order) => (
                      <Card key={order.id} className="border-l-4 border-l-copper">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-deep-gray">
                                Order #{order.orderNumber}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {new Date(order.createdAt!).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-600">
                                Payment: {order.paymentMethod}
                              </p>
                              <p className="text-sm text-gray-600">
                                Total: ₹{parseFloat(order.totalAmount).toFixed(2)}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat font-bold text-xl text-deep-gray">
                  Your Service Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookings?.data?.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-calendar text-gray-400 text-4xl mb-4"></i>
                    <p className="text-gray-500">No service bookings yet</p>
                    <Link href="/services">
                      <Button className="mt-4 bg-copper hover:bg-copper-dark text-white">
                        Book a Service
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings?.data?.map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-accent-blue">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-deep-gray">
                                Booking #{booking.bookingNumber}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {new Date(booking.createdAt!).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-600">
                                Date: {booking.preferredDate ? new Date(booking.preferredDate).toLocaleDateString() : 'TBD'}
                              </p>
                              <p className="text-sm text-gray-600">
                                Time: {booking.preferredTime || 'TBD'}
                              </p>
                              <p className="text-sm text-gray-600">
                                Total: ₹{parseFloat(booking.totalAmount).toFixed(2)}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
