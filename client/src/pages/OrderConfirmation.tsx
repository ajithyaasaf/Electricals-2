import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Package, Truck, Clock } from "lucide-react";

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-off-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="font-heading font-bold text-3xl text-deep-gray mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for your order. We'll process it soon.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Order Information</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">Order ID:</span> #CP{Date.now().toString().slice(-6)}</p>
                  <p><span className="text-gray-600">Date:</span> {new Date().toLocaleDateString()}</p>
                  <p><span className="text-gray-600">Status:</span> <span className="text-yellow-600">Processing</span></p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What's Next?</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span>Order is being processed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span>Packaging & Quality Check</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span>Shipped & Out for Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            You'll receive a confirmation email shortly with your order details.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products">
              <Button variant="outline">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/profile">
              <Button className="bg-copper hover:bg-copper-dark">
                View Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}