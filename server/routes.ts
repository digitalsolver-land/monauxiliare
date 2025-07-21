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

  // Chatbot route
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversation } = req.body;
      
      if (!message) {
        res.status(400).json({ success: false, error: "Message requis" });
        return;
      }

      const openrouterKey = process.env.OPENROUTER_API_KEY;
      if (!openrouterKey) {
        res.status(500).json({ success: false, error: "Configuration OpenRouter manquante" });
        return;
      }

      // Construct conversation history for context
      const messages = [
        {
          role: "system",
          content: `Tu es l'assistant commercial expert de Mon Auxiliaire, une entreprise de déménagement au Maroc. Tu es un expert en déménagement et tu guides les clients sur le site web.

RÈGLES IMPORTANTES:
- Tu représentes uniquement Mon Auxiliaire et ses services
- Tu es expert en déménagement et conseille les clients professionnellement
- Tu restes TOUJOURS dans le sujet du déménagement et des services Mon Auxiliaire
- Tu suggères uniquement nos services
- Tu guides les clients vers notre formulaire de devis gratuit (/devis)
- Tu orientes vers notre numéro de téléphone: 06 61 20 69 29
- Tu ne sors JAMAIS du contexte déménagement/Mon Auxiliaire

NOS SERVICES:
- Déménagement résidentiel (appartements, maisons, villas)
- Déménagement d'entreprise (bureaux, magasins, industries)
- Emballage professionnel et protection des biens
- Stockage sécurisé temporaire ou longue durée
- Transport sécurisé partout au Maroc
- Démontage/remontage de meubles
- Services de nettoyage post-déménagement

CONSEILS DÉMÉNAGEMENT:
- Planification 4-6 semaines à l'avance
- Tri et désencombrement avant le déménagement
- Emballage soigné avec matériaux adaptés
- Étiquetage des cartons par pièce
- Protection des objets fragiles
- Coordination le jour J

HORAIRES: Lundi-Samedi 8h-18h
ZONE: Tout le Maroc (Casablanca, Rabat, Marrakech, etc.)

Réponds en français, sois professionnel et commercial, guide vers nos services.`
        },
        ...(conversation || []).map((msg: any) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text
        })),
        {
          role: "user",
          content: message
        }
      ];

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openrouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://monauxiliaire.ma",
          "X-Title": "Mon Auxiliaire Assistant"
        },
        body: JSON.stringify({
          model: "anthropic/claude-3.5-sonnet",
          messages: messages,
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || "Désolé, je rencontre un problème technique. Contactez-nous au 06 61 20 69 29.";

      res.json({ success: true, response: botResponse });
    } catch (error) {
      console.error("Error in chat API:", error);
      res.status(500).json({ 
        success: false, 
        error: "Erreur du service de chat",
        response: "Désolé, je rencontre un problème technique. Vous pouvez nous contacter directement au 06 61 20 69 29 ou utiliser notre formulaire de devis gratuit."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
