import { 
  users, categories, products, services, orders, orderItems, bookings,
  type User, type InsertUser, type Category, type InsertCategory,
  type Product, type InsertProduct, type Service, type InsertService,
  type Order, type InsertOrder, type OrderItem, type InsertOrderItem,
  type Booking, type InsertBooking
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;

  // Category methods
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;

  // Product methods
  getProducts(filters?: { categoryId?: number; search?: string; limit?: number; offset?: number }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Service methods
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;

  // Order methods
  getOrders(userId?: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;

  // Booking methods
  getBookings(userId?: number): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, booking: Partial<InsertBooking>): Promise<Booking | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private categories: Map<number, Category> = new Map();
  private products: Map<number, Product> = new Map();
  private services: Map<number, Service> = new Map();
  private orders: Map<number, Order> = new Map();
  private orderItems: Map<number, OrderItem> = new Map();
  private bookings: Map<number, Booking> = new Map();
  private currentId: number = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const sampleCategories: Category[] = [
      { id: 1, name: "Switches & Outlets", slug: "switches-outlets", description: "Premium quality switches and outlets", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop" },
      { id: 2, name: "Wires & Cables", slug: "wires-cables", description: "High-grade electrical wiring solutions", imageUrl: "https://images.unsplash.com/photo-1621905252472-e545f915d3c9?w=300&h=200&fit=crop" },
      { id: 3, name: "Tools & Equipment", slug: "tools-equipment", description: "Professional electrical tools", imageUrl: "https://images.unsplash.com/photo-1609592160928-dd36fb014c37?w=300&h=200&fit=crop" },
      { id: 4, name: "Lighting & Fixtures", slug: "lighting-fixtures", description: "Modern LED and lighting solutions", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop" },
    ];

    sampleCategories.forEach(cat => this.categories.set(cat.id, cat));

    // Seed products
    const sampleProducts: Product[] = [
      {
        id: 1,
        name: "Premium Switch Plate",
        slug: "premium-switch-plate",
        description: "Modular switch with LED indicator",
        sku: "PSP-001",
        brand: "Havells",
        categoryId: 1,
        price: "145.00",
        mrp: "199.00",
        discount: 27,
        stock: 85,
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"] as string[],
        unit: "piece",
        warranty: "2 years",
        taxHsn: "8536",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: 2,
        name: "Copper Wire 2.5mm",
        slug: "copper-wire-2-5mm",
        description: "100m roll, fire-resistant",
        sku: "CW-2.5-100",
        brand: "Polycab",
        categoryId: 2,
        price: "2850.00",
        mrp: "3200.00",
        discount: 11,
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1621905252472-e545f915d3c9?w=400&h=300&fit=crop",
        images: ["https://images.unsplash.com/photo-1621905252472-e545f915d3c9?w=400&h=300&fit=crop"] as string[],
        unit: "roll",
        warranty: "5 years",
        taxHsn: "8544",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: 3,
        name: "Digital Multimeter",
        slug: "digital-multimeter",
        description: "Professional grade, auto-ranging",
        sku: "DM-PRO-001",
        brand: "Fluke",
        categoryId: 3,
        price: "1299.00",
        mrp: "1599.00",
        discount: 19,
        stock: 42,
        imageUrl: "https://images.unsplash.com/photo-1609592160928-dd36fb014c37?w=400&h=300&fit=crop",
        images: ["https://images.unsplash.com/photo-1609592160928-dd36fb014c37?w=400&h=300&fit=crop"] as string[],
        unit: "piece",
        warranty: "3 years",
        taxHsn: "9030",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: 4,
        name: "LED Bulb 12W",
        slug: "led-bulb-12w",
        description: "Energy efficient, 5-year warranty",
        sku: "LED-12W-001",
        brand: "Philips",
        categoryId: 4,
        price: "249.00",
        mrp: "349.00",
        discount: 29,
        stock: 156,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"] as string[],
        unit: "piece",
        warranty: "5 years",
        taxHsn: "8539",
        isActive: true,
        createdAt: new Date(),
      },
    ];

    sampleProducts.forEach(product => this.products.set(product.id, product));

    // Seed services
    const sampleServices: Service[] = [
      {
        id: 1,
        name: "Home Installation",
        slug: "home-installation",
        description: "Complete electrical wiring and installation services for residential properties",
        price: "2999.00",
        duration: "4-6 hours",
        imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: 2,
        name: "Repair & Maintenance",
        slug: "repair-maintenance",
        description: "Expert repair services for all electrical equipment and systems",
        price: "1499.00",
        duration: "2-3 hours",
        imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: 3,
        name: "Commercial Solutions",
        slug: "commercial-solutions",
        description: "Industrial and commercial electrical installation and maintenance",
        price: "4999.00",
        duration: "Full day",
        imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
        isActive: true,
        createdAt: new Date(),
      },
    ];

    sampleServices.forEach(service => this.services.set(service.id, service));

    this.currentId = 5;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      address: insertUser.address ?? null,
      phone: insertUser.phone ?? null,
      isAdmin: insertUser.isAdmin ?? false
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updateUser: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updatedUser = { ...user, ...updateUser };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentId++;
    const category: Category = { 
      ...insertCategory, 
      id,
      description: insertCategory.description ?? null,
      imageUrl: insertCategory.imageUrl ?? null
    };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: number, updateCategory: Partial<InsertCategory>): Promise<Category | undefined> {
    const category = this.categories.get(id);
    if (!category) return undefined;
    const updatedCategory = { ...category, ...updateCategory };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<boolean> {
    return this.categories.delete(id);
  }

  // Product methods
  async getProducts(filters?: { categoryId?: number; search?: string; limit?: number; offset?: number }): Promise<Product[]> {
    let products = Array.from(this.products.values()).filter(p => p.isActive);
    
    if (filters?.categoryId) {
      products = products.filter(p => p.categoryId === filters.categoryId);
    }
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description?.toLowerCase().includes(search) ||
        p.brand?.toLowerCase().includes(search)
      );
    }
    
    const offset = filters?.offset || 0;
    const limit = filters?.limit || 50;
    
    return products.slice(offset, offset + limit);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(p => p.slug === slug);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentId++;
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date(),
      description: insertProduct.description ?? null,
      brand: insertProduct.brand ?? null,
      categoryId: insertProduct.categoryId ?? null,
      mrp: insertProduct.mrp ?? null,
      discount: insertProduct.discount ?? 0,
      stock: insertProduct.stock ?? 0,
      imageUrl: insertProduct.imageUrl ?? null,
      images: insertProduct.images as string[] | null ?? null,
      unit: insertProduct.unit ?? "piece",
      warranty: insertProduct.warranty ?? null,
      taxHsn: insertProduct.taxHsn ?? null,
      isActive: insertProduct.isActive ?? true
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, updateProduct: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    const updatedProduct: Product = { 
      ...product, 
      ...updateProduct,
      images: updateProduct.images ? updateProduct.images as string[] : product.images
    };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values()).filter(s => s.isActive);
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentId++;
    const service: Service = { 
      ...insertService, 
      id, 
      createdAt: new Date(),
      description: insertService.description ?? null,
      duration: insertService.duration ?? null,
      imageUrl: insertService.imageUrl ?? null,
      isActive: insertService.isActive ?? true
    };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: number, updateService: Partial<InsertService>): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;
    const updatedService = { ...service, ...updateService };
    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }

  // Order methods
  async getOrders(userId?: number): Promise<Order[]> {
    let orders = Array.from(this.orders.values());
    if (userId) {
      orders = orders.filter(o => o.userId === userId);
    }
    return orders;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date(),
      status: insertOrder.status ?? "pending",
      userId: insertOrder.userId ?? null,
      paymentMethod: insertOrder.paymentMethod ?? null,
      paymentStatus: insertOrder.paymentStatus ?? "pending",
      shippingAddress: insertOrder.shippingAddress ?? null,
      phone: insertOrder.phone ?? null,
      notes: insertOrder.notes ?? null
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: number, updateOrder: Partial<InsertOrder>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    const updatedOrder = { ...order, ...updateOrder };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentId++;
    const orderItem: OrderItem = { 
      ...insertOrderItem, 
      id,
      orderId: insertOrderItem.orderId ?? null,
      productId: insertOrderItem.productId ?? null
    };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  // Booking methods
  async getBookings(userId?: number): Promise<Booking[]> {
    let bookings = Array.from(this.bookings.values());
    if (userId) {
      bookings = bookings.filter(b => b.userId === userId);
    }
    return bookings;
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentId++;
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date(),
      status: insertBooking.status ?? "pending",
      userId: insertBooking.userId ?? null,
      serviceId: insertBooking.serviceId ?? null,
      preferredDate: insertBooking.preferredDate ?? null,
      preferredTime: insertBooking.preferredTime ?? null,
      notes: insertBooking.notes ?? null
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: number, updateBooking: Partial<InsertBooking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    const updatedBooking = { ...booking, ...updateBooking };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
}

export const storage = new MemStorage();
