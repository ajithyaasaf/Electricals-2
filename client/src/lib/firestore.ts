import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  Timestamp,
  writeBatch
} from "firebase/firestore";
import { db } from "./firebase";

// Collection names
const COLLECTIONS = {
  USERS: 'users',
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  SERVICES: 'services',
  ORDERS: 'orders',
  BOOKINGS: 'bookings',
  CART: 'cart'
} as const;

// Types for Firestore documents
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sku: string;
  brand?: string;
  categoryId?: string;
  price: number;
  mrp?: number;
  discount?: number;
  stock: number;
  imageUrl?: string;
  images?: string[];
  unit?: string;
  warranty?: string;
  taxHsn?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  duration: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }>;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  scheduledDate: Date;
  scheduledTime: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to convert Firestore timestamp to Date
const convertTimestamps = (data: any) => {
  const converted = { ...data };
  Object.keys(converted).forEach(key => {
    if (converted[key] instanceof Timestamp) {
      converted[key] = converted[key].toDate();
    }
  });
  return converted;
};

// Categories
export const categoriesService = {
  async getAll(): Promise<Category[]> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.CATEGORIES));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as Category[];
  },

  async getById(id: string): Promise<Category | null> {
    const docRef = doc(db, COLLECTIONS.CATEGORIES, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...convertTimestamps(snapshot.data())
      } as Category;
    }
    return null;
  },

  async create(data: Omit<Category, 'id' | 'createdAt'>): Promise<Category> {
    const docRef = await addDoc(collection(db, COLLECTIONS.CATEGORIES), {
      ...data,
      createdAt: new Date()
    });
    const newDoc = await getDoc(docRef);
    return {
      id: newDoc.id,
      ...convertTimestamps(newDoc.data())
    } as Category;
  },

  async update(id: string, data: Partial<Category>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.CATEGORIES, id);
    await updateDoc(docRef, data);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.CATEGORIES, id);
    await deleteDoc(docRef);
  }
};

// Products
export const productsService = {
  async getAll(filters?: { 
    categoryId?: string; 
    search?: string; 
    limit?: number 
  }): Promise<Product[]> {
    let q = query(collection(db, COLLECTIONS.PRODUCTS));
    
    if (filters?.categoryId) {
      q = query(q, where('categoryId', '==', filters.categoryId));
    }
    
    if (filters?.search) {
      // Simple search by name (Firestore doesn't support full-text search)
      q = query(q, where('name', '>=', filters.search), where('name', '<=', filters.search + '\uf8ff'));
    }
    
    if (filters?.limit) {
      q = query(q, limit(filters.limit));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as Product[];
  },

  async getById(id: string): Promise<Product | null> {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...convertTimestamps(snapshot.data())
      } as Product;
    }
    return null;
  },

  async getBySlug(slug: string): Promise<Product | null> {
    const q = query(collection(db, COLLECTIONS.PRODUCTS), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...convertTimestamps(doc.data())
      } as Product;
    }
    return null;
  },

  async create(data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const docRef = await addDoc(collection(db, COLLECTIONS.PRODUCTS), {
      ...data,
      createdAt: new Date()
    });
    const newDoc = await getDoc(docRef);
    return {
      id: newDoc.id,
      ...convertTimestamps(newDoc.data())
    } as Product;
  },

  async update(id: string, data: Partial<Product>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
    await updateDoc(docRef, data);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
    await deleteDoc(docRef);
  }
};

// Services
export const servicesService = {
  async getAll(): Promise<Service[]> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.SERVICES));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as Service[];
  },

  async getById(id: string): Promise<Service | null> {
    const docRef = doc(db, COLLECTIONS.SERVICES, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...convertTimestamps(snapshot.data())
      } as Service;
    }
    return null;
  },

  async create(data: Omit<Service, 'id' | 'createdAt'>): Promise<Service> {
    const docRef = await addDoc(collection(db, COLLECTIONS.SERVICES), {
      ...data,
      createdAt: new Date()
    });
    const newDoc = await getDoc(docRef);
    return {
      id: newDoc.id,
      ...convertTimestamps(newDoc.data())
    } as Service;
  },

  async update(id: string, data: Partial<Service>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.SERVICES, id);
    await updateDoc(docRef, data);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.SERVICES, id);
    await deleteDoc(docRef);
  }
};

// Orders
export const ordersService = {
  async getAll(userId?: string): Promise<Order[]> {
    let q = query(collection(db, COLLECTIONS.ORDERS), orderBy('createdAt', 'desc'));
    
    if (userId) {
      q = query(q, where('userId', '==', userId));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as Order[];
  },

  async getById(id: string): Promise<Order | null> {
    const docRef = doc(db, COLLECTIONS.ORDERS, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...convertTimestamps(snapshot.data())
      } as Order;
    }
    return null;
  },

  async create(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const now = new Date();
    const docRef = await addDoc(collection(db, COLLECTIONS.ORDERS), {
      ...data,
      createdAt: now,
      updatedAt: now
    });
    const newDoc = await getDoc(docRef);
    return {
      id: newDoc.id,
      ...convertTimestamps(newDoc.data())
    } as Order;
  },

  async update(id: string, data: Partial<Order>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.ORDERS, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  }
};

// Bookings
export const bookingsService = {
  async getAll(userId?: string): Promise<Booking[]> {
    let q = query(collection(db, COLLECTIONS.BOOKINGS), orderBy('createdAt', 'desc'));
    
    if (userId) {
      q = query(q, where('userId', '==', userId));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    })) as Booking[];
  },

  async getById(id: string): Promise<Booking | null> {
    const docRef = doc(db, COLLECTIONS.BOOKINGS, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...convertTimestamps(snapshot.data())
      } as Booking;
    }
    return null;
  },

  async create(data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    const now = new Date();
    const docRef = await addDoc(collection(db, COLLECTIONS.BOOKINGS), {
      ...data,
      createdAt: now,
      updatedAt: now
    });
    const newDoc = await getDoc(docRef);
    return {
      id: newDoc.id,
      ...convertTimestamps(newDoc.data())
    } as Booking;
  },

  async update(id: string, data: Partial<Booking>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.BOOKINGS, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  }
};

// Initialize sample data
export const initializeSampleData = async () => {
  // Check if data already exists
  const categoriesSnapshot = await getDocs(collection(db, COLLECTIONS.CATEGORIES));
  if (!categoriesSnapshot.empty) {
    return; // Data already exists
  }

  const batch = writeBatch(db);

  // Sample categories
  const categories = [
    { name: "Switches & Outlets", slug: "switches-outlets", description: "Premium electrical switches and outlets", imageUrl: "/api/placeholder/200/150" },
    { name: "Wires & Cables", slug: "wires-cables", description: "High-quality electrical wires and cables", imageUrl: "/api/placeholder/200/150" },
    { name: "Tools & Equipment", slug: "tools-equipment", description: "Professional electrical tools", imageUrl: "/api/placeholder/200/150" },
    { name: "Lighting & Fixtures", slug: "lighting-fixtures", description: "Modern lighting solutions", imageUrl: "/api/placeholder/200/150" }
  ];

  // Add categories
  const categoryRefs = categories.map(category => {
    const ref = doc(collection(db, COLLECTIONS.CATEGORIES));
    batch.set(ref, { ...category, createdAt: new Date() });
    return ref;
  });

  // Sample products
  const products = [
    {
      name: "Premium Modular Switch",
      slug: "premium-modular-switch",
      description: "High-quality modular switch with modern design",
      sku: "CB-SW-001",
      brand: "Havells",
      price: 250,
      mrp: 300,
      discount: 17,
      stock: 50,
      imageUrl: "/api/placeholder/300/300",
      unit: "piece",
      warranty: "2 years",
      isActive: true
    },
    {
      name: "Copper House Wire",
      slug: "copper-house-wire",
      description: "99.9% pure copper wire for house wiring",
      sku: "CB-WR-001",
      brand: "Polycab",
      price: 1500,
      mrp: 1800,
      discount: 17,
      stock: 25,
      imageUrl: "/api/placeholder/300/300",
      unit: "meter",
      warranty: "1 year",
      isActive: true
    },
    {
      name: "Digital Multimeter",
      slug: "digital-multimeter",
      description: "Professional digital multimeter for electrical testing",
      sku: "CB-TL-001",
      brand: "Fluke",
      price: 3500,
      mrp: 4000,
      discount: 12,
      stock: 15,
      imageUrl: "/api/placeholder/300/300",
      unit: "piece",
      warranty: "3 years",
      isActive: true
    },
    {
      name: "LED Bulb 9W",
      slug: "led-bulb-9w",
      description: "Energy-efficient LED bulb with warm white light",
      sku: "CB-LT-001",
      brand: "Philips",
      price: 180,
      mrp: 220,
      discount: 18,
      stock: 100,
      imageUrl: "/api/placeholder/300/300",
      unit: "piece",
      warranty: "2 years",
      isActive: true
    }
  ];

  // Add products
  products.forEach((product, index) => {
    const ref = doc(collection(db, COLLECTIONS.PRODUCTS));
    batch.set(ref, { 
      ...product, 
      categoryId: categoryRefs[index % categoryRefs.length].id,
      createdAt: new Date() 
    });
  });

  // Sample services
  const services = [
    {
      name: "Home Inspection",
      slug: "home-inspection",
      description: "Comprehensive electrical safety inspection for your home",
      price: 1500,
      duration: "2-3 hours",
      imageUrl: "/api/placeholder/300/200",
      isActive: true
    },
    {
      name: "Wiring Installation",
      slug: "wiring-installation",
      description: "Professional electrical wiring installation service",
      price: 5000,
      duration: "1-2 days",
      imageUrl: "/api/placeholder/300/200",
      isActive: true
    },
    {
      name: "Appliance Repair",
      slug: "appliance-repair",
      description: "Expert repair service for electrical appliances",
      price: 800,
      duration: "1-2 hours",
      imageUrl: "/api/placeholder/300/200",
      isActive: true
    }
  ];

  // Add services
  services.forEach(service => {
    const ref = doc(collection(db, COLLECTIONS.SERVICES));
    batch.set(ref, { ...service, createdAt: new Date() });
  });

  // Commit all changes
  await batch.commit();
  console.log("Sample data initialized successfully");
};