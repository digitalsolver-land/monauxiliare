import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteSchema, insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Quote routes
  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(validatedData);
      res.json({ success: true, quote });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: "Données invalides", details: error.errors });
      } else {
        console.error("Error creating quote:", error);
        res.status(500).json({ success: false, error: "Erreur lors de la création du devis" });
      }
    }
  });

  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getQuotes();
      res.json({ success: true, quotes });
    } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ success: false, error: "Erreur lors de la récupération des devis" });
    }
  });

  app.get("/api/quotes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ success: false, error: "ID invalide" });
        return;
      }
      
      const quote = await storage.getQuoteById(id);
      if (!quote) {
        res.status(404).json({ success: false, error: "Devis non trouvé" });
        return;
      }
      
      res.json({ success: true, quote });
    } catch (error) {
      console.error("Error fetching quote:", error);
      res.status(500).json({ success: false, error: "Erreur lors de la récupération du devis" });
    }
  });

  // Contact routes
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: "Données invalides", details: error.errors });
      } else {
        console.error("Error creating contact:", error);
        res.status(500).json({ success: false, error: "Erreur lors de l'envoi du message" });
      }
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ success: true, contacts });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ success: false, error: "Erreur lors de la récupération des messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
