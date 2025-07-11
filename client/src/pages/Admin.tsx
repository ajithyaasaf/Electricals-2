import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product, Service, Order, Booking } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Package, ShoppingCart, Calendar, Users } from "lucide-react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: products } = useQuery<{ success: boolean; data: Product[] }>({
    queryKey: ["/api/products"],
  });

  const { data: services } = useQuery<{ success: boolean; data: Service[] }>({
    queryKey: ["/api/services"],
  });

  const { data: orders } = useQuery<{ success: boolean; data: Order[] }>({
    queryKey: ["/api/orders"],
  });

  const { data: bookings } = useQuery<{ success: boolean; data: Booking[] }>({
    queryKey: ["/api/bookings"],
  });

  const stats = {
    totalProducts: products?.data?.length || 0,
    activeOrders: orders?.data?.filter(o => o.status === 'pending' || o.status === 'confirmed').length || 0,
    serviceBookings: bookings?.data?.filter(b => b.status === 'pending' || b.status === 'confirmed').length || 0,
    monthlyRevenue: orders?.data?.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0) || 0,
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-montserrat font-bold text-3xl text-deep-gray mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage products, services, and orders</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Products</p>
                      <p className="text-3xl font-bold text-copper">{stats.totalProducts}</p>
                    </div>
                    <div className="bg-copper/10 p-3 rounded-full">
                      <Package className="w-6 h-6 text-copper" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Active Orders</p>
                      <p className="text-3xl font-bold text-accent-blue">{stats.activeOrders}</p>
                    </div>
                    <div className="bg-accent-blue/10 p-3 rounded-full">
                      <ShoppingCart className="w-6 h-6 text-accent-blue" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Service Bookings</p>
                      <p className="text-3xl font-bold text-green-600">{stats.serviceBookings}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Monthly Revenue</p>
                      <p className="text-3xl font-bold text-purple-600">₹{stats.monthlyRevenue.toFixed(0)}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="font-montserrat font-bold text-xl text-deep-gray">
                    Products Management
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-copper hover:bg-copper-dark text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="product-name">Product Name</Label>
                          <Input id="product-name" placeholder="Enter product name" />
                        </div>
                        <div>
                          <Label htmlFor="product-price">Price</Label>
                          <Input id="product-price" type="number" placeholder="Enter price" />
                        </div>
                        <div>
                          <Label htmlFor="product-stock">Stock</Label>
                          <Input id="product-stock" type="number" placeholder="Enter stock quantity" />
                        </div>
                        <Button className="w-full bg-copper hover:bg-copper-dark text-white">
                          Add Product
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products?.data?.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img 
                                src={product.imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=50&h=50&fit=crop"} 
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.brand}</Badge>
                          </TableCell>
                          <TableCell>₹{parseFloat(product.price).toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge className={product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {product.stock}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="font-montserrat font-bold text-xl text-deep-gray">
                    Services Management
                  </CardTitle>
                  <Button className="bg-copper hover:bg-copper-dark text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services?.data?.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>
                            <div className="font-medium text-gray-900">{service.name}</div>
                            <div className="text-sm text-gray-500">{service.description}</div>
                          </TableCell>
                          <TableCell>₹{parseFloat(service.price).toFixed(2)}</TableCell>
                          <TableCell>{service.duration}</TableCell>
                          <TableCell>
                            <Badge className={service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {service.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat font-bold text-xl text-deep-gray">
                  Orders Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders?.data?.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{new Date(order.createdAt!).toLocaleDateString()}</TableCell>
                          <TableCell>₹{parseFloat(order.totalAmount).toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{order.paymentMethod}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat font-bold text-xl text-deep-gray">
                  Service Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings?.data?.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.bookingNumber}</TableCell>
                          <TableCell>{new Date(booking.createdAt!).toLocaleDateString()}</TableCell>
                          <TableCell>Service #{booking.serviceId}</TableCell>
                          <TableCell>₹{parseFloat(booking.totalAmount).toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
