import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Building, Package, Warehouse, Check } from "lucide-react";

// Import new service images
import stockageImage from "@assets/images (1)_1753063478497.jfif";
import emballageImage from "@assets/images_1753063478501.jfif";
import residentialImage from "@assets/demenagement_1753063478503.webp";
import corporateImage from "@assets/cover-r4x3w1000-5bb3465b93213-shutterstock-571663528_1753063478504.jpg";

const services = [
  {
    id: "residential",
    title: "Déménagement Résidentiel",
    icon: Home,
    description: "Service complet pour particuliers : démontage, emballage, transport et remontage de vos meubles.",
    features: [
      "Devis gratuit à domicile",
      "Emballage professionnel inclus",
      "Assurance tous risques",
      "Nettoyage final optionnel",
    ],
    image: residentialImage
  },
  {
    id: "corporate",
    title: "Déménagement Entreprise",
    icon: Building,
    description: "Solutions professionnelles pour le transfert de bureaux, locaux commerciaux et équipements IT.",
    features: [
      "Planification détaillée",
      "Déménagement en weekend",
      "Transport sécurisé IT",
      "Remise en service rapide",
    ],
    image: corporateImage
  },
  {
    id: "packing",
    title: "Emballage & Protection",
    icon: Package,
    description: "Matériel professionnel et techniques spécialisées pour protéger tous types d'objets.",
    features: [
      "Cartons renforcés",
      "Film plastique et papier bulle",
      "Protection spéciale œuvres d'art",
      "Sangles et fixations",
    ],
    image: emballageImage
  },
  {
    id: "storage",
    title: "Stockage Sécurisé",
    icon: Warehouse,
    description: "Espaces de stockage climatisés et sécurisés pour vos biens, de quelques jours à plusieurs mois.",
    features: [
      "Entrepôts surveillés 24h/24",
      "Contrôle température/humidité",
      "Accès flexible",
      "Inventaire détaillé",
    ],
    image: stockageImage
  },
];

export default function Services() {
  return (
    <div className="page-view">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Nos Services sur Mesure</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Une gamme complète de prestations pour répondre à toutes les exigences.
          </p>
        </div>
        
        <div className="space-y-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <Card key={service.id} className="overflow-hidden shadow-lg">
                <div className={`grid lg:grid-cols-2 gap-8 ${isEven ? "" : "lg:grid-flow-col-dense"}`}>
                  <div className={`${isEven ? "order-1" : "order-1 lg:order-2"}`}>
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                  </div>
                  <div className={`p-8 ${isEven ? "order-2" : "order-2 lg:order-1"}`}>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-3 text-2xl lg:text-3xl">
                        <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-brand-blue" />
                        </div>
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                      <p className="text-muted-foreground mb-6 text-lg">
                        {service.description}
                      </p>
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="cta-button text-white font-bold"
                        onClick={() => (window as any).openServiceModal?.(service.id)}
                      >
                        En savoir plus
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
