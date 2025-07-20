import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  housingType: text("housing_type").notNull(),
  surface: integer("surface"),
  floor: integer("floor"),
  bedrooms: integer("bedrooms").default(0),
  livingRooms: integer("living_rooms").default(0),
  kitchens: integer("kitchens").default(0),
  bathrooms: integer("bathrooms").default(0),
  departureAddress: text("departure_address").notNull(),
  departureCity: text("departure_city").notNull(),
  departurePostal: text("departure_postal"),
  arrivalAddress: text("arrival_address").notNull(),
  arrivalCity: text("arrival_city").notNull(),
  arrivalPostal: text("arrival_postal"),
  movingDate: text("moving_date"),
  dateFlexibility: text("date_flexibility"),
  timeSlot: text("time_slot"),
  additionalServices: jsonb("additional_services").$type<string[]>().default([]),
  budgetRange: text("budget_range"),
  additionalComments: text("additional_comments"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: text("status").default("pending").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  serviceType: text("service_type"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: text("status").default("unread").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
