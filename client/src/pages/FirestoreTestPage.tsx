import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { initializeSampleData, categoriesService, productsService, servicesService } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";

export default function FirestoreTestPage() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const { toast } = useToast();

  const handleInitializeData = async () => {
    setIsInitializing(true);
    try {
      await initializeSampleData();
      toast({
        title: "Success",
        description: "Sample data initialized successfully!",
      });
    } catch (error) {
      console.error("Initialization error:", error);
      toast({
        title: "Error",
        description: "Failed to initialize sample data.",
        variant: "destructive",
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleLoadData = async () => {
    setIsLoading(true);
    try {
      const [categories, products, services] = await Promise.all([
        categoriesService.getAll(),
        productsService.getAll(),
        servicesService.getAll()
      ]);
      
      setData({ categories, products, services });
      toast({
        title: "Success",
        description: "Data loaded successfully!",
      });
    } catch (error) {
      console.error("Load error:", error);
      toast({
        title: "Error",
        description: "Failed to load data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Firestore Test Page</h1>
        <p className="text-gray-600">Test Firestore database operations</p>
        
        <div className="flex justify-center gap-4">
          <Button 
            onClick={handleInitializeData}
            disabled={isInitializing}
            variant="outline"
          >
            {isInitializing ? "Initializing..." : "Initialize Sample Data"}
          </Button>
          
          <Button 
            onClick={handleLoadData}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load Data"}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Count: {data.categories?.length || 0}</p>
              {data.categories?.map((category: any) => (
                <div key={category.id} className="border p-2 rounded">
                  <p className="font-medium">{category.name}</p>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Available products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Count: {data.products?.length || 0}</p>
              {data.products?.map((product: any) => (
                <div key={product.id} className="border p-2 rounded">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">₹{product.price}</p>
                  <p className="text-xs text-gray-500">{product.brand}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
            <CardDescription>Available services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Count: {data.services?.length || 0}</p>
              {data.services?.map((service: any) => (
                <div key={service.id} className="border p-2 rounded">
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-gray-600">₹{service.price}</p>
                  <p className="text-xs text-gray-500">{service.duration}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}