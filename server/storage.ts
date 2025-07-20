import { quotes, contacts, type Quote, type Contact, type InsertQuote, type InsertContact, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  createContact(contact: InsertContact): Promise<Contact>;
  getQuotes(): Promise<Quote[]>;
  getContacts(): Promise<Contact[]>;
  getQuoteById(id: number): Promise<Quote | undefined>;
  getContactById(id: number): Promise<Contact | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quotes: Map<number, Quote>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentQuoteId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.quotes = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentQuoteId = 1;
    this.currentContactId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.currentQuoteId++;
    const quote: Quote = { 
      ...insertQuote, 
      id, 
      createdAt: new Date(),
      status: "pending"
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date(),
      status: "unread"
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getQuoteById(id: number): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async getContactById(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }
}

export const storage = new MemStorage();
