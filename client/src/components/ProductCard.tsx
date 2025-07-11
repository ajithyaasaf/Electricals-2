import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const discountedPrice = parseFloat(product.price);
  const originalPrice = product.mrp ? parseFloat(product.mrp) : discountedPrice;
  const hasDiscount = product.discount && product.discount > 0;

  return (
    <Card className="product-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="font-montserrat font-semibold text-lg text-deep-gray mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-copper font-bold text-lg">
              ₹{discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-gray-400 line-through ml-2">
                ₹{originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {hasDiscount && (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {product.stock > 0 ? (
              <span className="text-green-600">In Stock ({product.stock})</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-accent-blue hover:bg-accent-blue-dark text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
