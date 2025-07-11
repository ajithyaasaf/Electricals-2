import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "wouter";

export default function CartSidebar() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, isOpen, setIsOpen } = useCart();
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (!user) {
      // Redirect to login
      setIsOpen(false);
      window.location.href = "/login";
      return;
    }
    // Proceed to checkout
    setIsOpen(false);
    window.location.href = "/checkout";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="font-montserrat font-semibold text-xl text-deep-gray">
              Shopping Cart
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <i className="fas fa-shopping-cart text-4xl"></i>
              </div>
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={product.imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop"} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-copper font-bold">
                          ₹{parseFloat(product.price).toFixed(2)}
                        </p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="mx-3 font-semibold">{quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-800">Total:</span>
              <span className="font-bold text-xl text-copper">
                ₹{getTotalPrice().toFixed(2)}
              </span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-accent-blue hover:bg-accent-blue-dark text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
