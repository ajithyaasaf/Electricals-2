import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertProductSchema, insertServiceSchema, insertOrderSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch categories" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const { categoryId, search, limit, offset } = req.query;
      const filters = {
        categoryId: categoryId ? parseInt(categoryId as string) : undefined,
        search: search as string,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      };
      const products = await storage.getProducts(filters);
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ success: false, message: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const productData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, productData);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.json({ success: true, data: product });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ success: false, message: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProduct(id);
      if (!success) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete product" });
    }
  });

  // Services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json({ success: true, data: services });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ success: false, message: "Service not found" });
      }
      res.json({ success: true, data: service });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch service" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json({ success: true, data: service });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: "Invalid service data", errors: error.errors });
      }
      res.status(500).json({ success: false, message: "Failed to create service" });
    }
  });

  // Orders
  app.get("/api/orders", async (req, res) => {
    try {
      const { userId } = req.query;
      const orders = await storage.getOrders(userId ? parseInt(userId as string) : undefined);
      res.json({ success: true, data: orders });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
      const items = await storage.getOrderItems(id);
      res.json({ success: true, data: { ...order, items } });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      
      // Create order items
      const { items } = req.body;
      if (items && Array.isArray(items)) {
        for (const item of items) {
          await storage.createOrderItem({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          });
        }
      }
      
      res.status(201).json({ success: true, data: order });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ success: false, message: "Failed to create order" });
    }
  });

  // Bookings
  app.get("/api/bookings", async (req, res) => {
    try {
      const { userId } = req.query;
      const bookings = await storage.getBookings(userId ? parseInt(userId as string) : undefined);
      res.json({ success: true, data: bookings });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch bookings" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }
      res.json({ success: true, data: booking });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch booking" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json({ success: true, data: booking });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ success: false, message: "Failed to create booking" });
    }
  });

  // Users
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ success: false, message: "Failed to create user" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userData = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(id, userData);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ success: false, message: "Failed to update user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
