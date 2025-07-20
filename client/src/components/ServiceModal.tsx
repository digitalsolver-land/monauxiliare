import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Plus, Home, Building, Package, Warehouse } from "lucide-react";

type ServiceType = "residential" | "corporate" | "packing" | "storage";

const serviceContent = {
  residential: {
    title: "Déménagement Résidentiel",
    icon: Home,
    description: "Notre service de déménagement résidentiel prend en charge l'intégralité de votre projet, du studio à la villa.",
    included: [
      "Visite technique gratuite",
      "Fourniture du matériel d'emballage",
      "Démontage et remontage des meubles",
      "Transport sécurisé",
      "Assurance tous risques incluse",
    ],
    options: [
      "Emballage professionnel",
      "Garde-meuble temporaire",
      "Nettoyage post-déménagement",
      "Déménagement weekend/soir",
    ],
  },
  corporate: {
    title: "Déménagement Entreprise",
    icon: Building,
    description: "Spécialisés dans le transfert d'entreprises, nous minimisons l'interruption de votre activité.",
    included: [
      "Audit préalable complet",
      "Planning précis et coordination",
      "Transport spécialisé IT",
      "Interventions flexibles (soir/weekend)",
      "Remise en service rapide",
    ],
    options: [
      "Gestion des archives",
      "Destruction sécurisée de documents",
      "Installation électrique/réseau",
      "Formation des équipes",
    ],
  },
  packing: {
    title: "Emballage & Protection",
    icon: Package,
    description: "Protection optimale de vos biens grâce à notre expertise et nos matériaux de qualité.",
    included: [
      "Cartons renforcés double cannelure",
      "Film plastique étanche",
      "Papier bulle et rembourrages",
      "Étiquetage professionnel",
      "Sangles et fixations",
    ],
    options: [
      "Caisses sur mesure pour œuvres d'art",
      "Emballage sous vide",
      "Protection climatique renforcée",
      "Déballage à destination",
    ],
  },
  storage: {
    title: "Stockage Sécurisé",
    icon: Warehouse,
    description: "Solutions de stockage flexibles dans nos entrepôts climatisés et surveillés 24h/24.",
    included: [
      "Surveillance vidéo 24h/24",
      "Accès sécurisé par badge",
      "Système anti-incendie",
      "Assurance multirisque",
      "Climat contrôlé",
    ],
    options: [
      "Accès 7j/7",
      "Inventaire détaillé",
      "Service de livraison",
      "Emballage sur site",
    ],
  },
};

export default function ServiceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentService, setCurrentService] = useState<ServiceType>("residential");

  const openModal = (serviceType: ServiceType) => {
    setCurrentService(serviceType);
    setIsOpen(true);
  };

  const service = serviceContent[currentService];
  const IconComponent = service.icon;

  // Expose openModal function globally for use in other components
  (window as any).openServiceModal = openModal;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <IconComponent className="w-8 h-8 text-brand-blue" />
            {service.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {service.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-3 text-green-600">
                Prestations incluses :
              </h4>
              <ul className="space-y-2">
                {service.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-3 text-brand-blue">
                Options disponibles :
              </h4>
              <ul className="space-y-2">
                {service.options.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Plus className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button
              onClick={() => {
                setIsOpen(false);
                window.location.href = "/devis";
              }}
              className="w-full cta-button text-white font-bold py-3 rounded-full"
            >
              Demander un devis pour ce service
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
