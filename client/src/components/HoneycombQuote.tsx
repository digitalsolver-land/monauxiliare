import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { 
  Home, 
  Ruler, 
  MapPin, 
  Calendar, 
  Package, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Mail,
  MessageCircle
} from "lucide-react";

const steps = [
  {
    id: 0,
    title: "Type de Logement",
    description: "Sélectionnez le type de votre logement actuel",
    icon: Home,
  },
  {
    id: 1,
    title: "Surface & Pièces",
    description: "Précisez la taille de votre logement",
    icon: Ruler,
  },
  {
    id: 2,
    title: "Inventaire Objets",
    description: "Listez vos meubles et objets à transporter",
    icon: Package,
  },
  {
    id: 3,
    title: "Adresses & Accessibilité",
    description: "Adresses et facilité d'accès pour le camion",
    icon: MapPin,
  },
  {
    id: 4,
    title: "Date & Créneaux",
    description: "Choisissez votre date de déménagement préférée",
    icon: Calendar,
  },
  {
    id: 5,
    title: "Services Additionnels",
    description: "Sélectionnez les services supplémentaires souhaités",
    icon: User,
  },
  {
    id: 6,
    title: "Informations Contact",
    description: "Vos coordonnées pour l'établissement du devis",
    icon: User,
  },
];

const housingTypes = [
  { value: "studio", label: "Studio", icon: "🏠" },
  { value: "apartment", label: "Appartement", icon: "🏢" },
  { value: "house", label: "Maison", icon: "🏡" },
  { value: "villa", label: "Villa", icon: "🏰" },
  { value: "office", label: "Bureau", icon: "💼" },
  { value: "other", label: "Autre", icon: "❓" },
];

const timeSlots = [
  { value: "morning", label: "Matin", time: "8h-12h", icon: "🌅" },
  { value: "afternoon", label: "Après-midi", time: "13h-17h", icon: "☀️" },
  { value: "flexible", label: "Flexible", time: "Toute la journée", icon: "🕒" },
];

const furnitureItems = [
  { id: "sofa", label: "Canapé", icon: "🛋️" },
  { id: "bed", label: "Lit", icon: "🛏️" },
  { id: "wardrobe", label: "Armoire", icon: "👔" },
  { id: "table", label: "Table", icon: "🪑" },
  { id: "fridge", label: "Réfrigérateur", icon: "🧊" },
  { id: "washingmachine", label: "Lave-linge", icon: "🌊" },
  { id: "tv", label: "Télévision", icon: "📺" },
  { id: "piano", label: "Piano", icon: "🎹" },
  { id: "dishwasher", label: "Lave-vaisselle", icon: "🍽️" },
  { id: "books", label: "Bibliothèque", icon: "📚" },
  { id: "boxes", label: "Cartons divers", icon: "📦" },
  { id: "other", label: "Autres objets lourds", icon: "📋" },
];

const accessibilityOptions = [
  { value: "easy", label: "Facile", description: "Accès direct, pas d'obstacles" },
  { value: "moderate", label: "Modéré", description: "Quelques marches ou distance courte" },
  { value: "difficult", label: "Difficile", description: "Étages sans ascenseur, rue étroite" },
  { value: "very_difficult", label: "Très difficile", description: "Accès très compliqué pour camion" },
];

const additionalServices = [
  { id: "packing", label: "Emballage complet", description: "Nos équipes emballent tout" },
  { id: "unpacking", label: "Déballage", description: "Déballage à l'arrivée" },
  { id: "storage", label: "Stockage temporaire", description: "Garde-meuble sécurisé" },
  { id: "cleaning", label: "Nettoyage final", description: "Ancien et nouveau logement" },
  { id: "assembly", label: "Montage/Démontage", description: "Meubles et électroménager" },
  { id: "insurance", label: "Assurance renforcée", description: "Couverture étendue" },
];

type FormData = {
  housingType: string;
  surface: number;
  floor: number;
  bedrooms: number;
  livingRooms: number;
  kitchens: number;
  bathrooms: number;
  departureAddress: string;
  departureCity: string;
  departurePostal: string;
  arrivalAddress: string;
  arrivalCity: string;
  arrivalPostal: string;
  movingDate: string;
  dateFlexibility: string;
  timeSlot: string;
  additionalServices: string[];
  furnitureInventory: string[];
  departureAccessibility: string;
  arrivalAccessibility: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  budgetRange: string;
  additionalComments: string;
};

interface HoneycombQuoteProps {
  onProgressUpdate?: (progress: number) => void;
}

export default function HoneycombQuote({ onProgressUpdate }: HoneycombQuoteProps = {}) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    housingType: "",
    surface: 0,
    floor: 0,
    bedrooms: 0,
    livingRooms: 0,
    kitchens: 0,
    bathrooms: 0,
    departureAddress: "",
    departureCity: "",
    departurePostal: "",
    arrivalAddress: "",
    arrivalCity: "",
    arrivalPostal: "",
    movingDate: "",
    dateFlexibility: "",
    timeSlot: "",
    additionalServices: [],
    furnitureInventory: [],
    departureAccessibility: "",
    arrivalAccessibility: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    budgetRange: "",
    additionalComments: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createQuoteMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/quotes", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Demande de devis envoyée !",
        description: "Nous vous recontacterons dans les plus brefs délais.",
      });
      trackEvent("quote_submitted", "conversion", "honeycomb_form");
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi de votre demande.",
        variant: "destructive",
      });
      console.error("Quote submission error:", error);
    },
  });

  const selectStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    trackEvent("quote_step_selected", "engagement", `step_${stepIndex}`);
  };

  const completeStep = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      const newCompletedSteps = [...completedSteps, stepIndex];
      setCompletedSteps(newCompletedSteps);
      
      // Update progress
      const progress = (newCompletedSteps.length / steps.length) * 100;
      onProgressUpdate?.(progress);
      
      // Add achievements
      const newAchievements = [...achievements];
      if (newCompletedSteps.length === 2 && !achievements.includes("Débutant")) {
        newAchievements.push("Débutant");
        setAchievements(newAchievements);
      }
      if (newCompletedSteps.length === 4 && !achievements.includes("Intermédiaire")) {
        newAchievements.push("Intermédiaire");
        setAchievements(newAchievements);
      }
      if (newCompletedSteps.length === 6 && !achievements.includes("Expert")) {
        newAchievements.push("Expert");
        setAchievements(newAchievements);
      }
      
      // Dispatch custom event for progress
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('quote-progress', {
          detail: { 
            progress,
            achievement: newAchievements.length > achievements.length ? newAchievements[newAchievements.length - 1] : null
          }
        }));
      }
      
      trackEvent("quote_step_completed", "engagement", `step_${stepIndex}`);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      completeStep(currentStep);
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - submit form
      completeStep(currentStep);
      createQuoteMutation.mutate(formData);
      setCurrentStep(-1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData({ ...formData, ...updates });
  };

  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    const services = checked
      ? [...formData.additionalServices, serviceId]
      : formData.additionalServices.filter(s => s !== serviceId);
    updateFormData({ additionalServices: services });
  };

  const handleFurnitureToggle = (itemId: string, checked: boolean) => {
    const items = checked
      ? [...formData.furnitureInventory, itemId]
      : formData.furnitureInventory.filter(i => i !== itemId);
    updateFormData({ furnitureInventory: items });
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent("Demande de devis déménagement");
    const body = encodeURIComponent(`Bonjour,

Je souhaite obtenir un devis pour mon déménagement avec les détails suivants :

Type de logement: ${formData.housingType}
Surface: ${formData.surface} m²
Départ: ${formData.departureAddress}, ${formData.departureCity}
Arrivée: ${formData.arrivalAddress}, ${formData.arrivalCity}
Date souhaitée: ${formData.movingDate}
Services: ${formData.additionalServices.join(", ")}

Cordialement,
${formData.firstName} ${formData.lastName}
${formData.email}
${formData.phone}`);
    
    return `mailto:devis@d3drone.com?subject=${subject}&body=${body}`;
  };

  const generateWhatsAppLink = () => {
    const text = encodeURIComponent(`Bonjour, je souhaite un devis déménagement.
Type: ${formData.housingType}
Surface: ${formData.surface}m²
De: ${formData.departureCity} vers ${formData.arrivalCity}
Date: ${formData.movingDate}
Contact: ${formData.firstName} ${formData.lastName}`);
    
    return `https://wa.me/212661206929?text=${text}`;
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    const IconComponent = step.icon;

    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <IconComponent className="w-12 h-12 text-brand-blue" />
          </div>
          <CardTitle className="text-2xl">{step.title}</CardTitle>
          <p className="text-muted-foreground">{step.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {housingTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={formData.housingType === type.value ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => updateFormData({ housingType: type.value })}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="font-semibold text-sm">{type.label}</span>
                </Button>
              ))}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="surface">Surface approximative (m²)</Label>
                  <Input
                    id="surface"
                    type="number"
                    value={formData.surface || ""}
                    onChange={(e) => updateFormData({ surface: parseInt(e.target.value) || 0 })}
                    placeholder="Ex: 80"
                  />
                </div>
                <div>
                  <Label htmlFor="floor">Étage (sans ascenseur)</Label>
                  <Select value={formData.floor.toString()} onValueChange={(value) => updateFormData({ floor: parseInt(value) })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Rez-de-chaussée</SelectItem>
                      <SelectItem value="1">1er étage</SelectItem>
                      <SelectItem value="2">2ème étage</SelectItem>
                      <SelectItem value="3">3ème étage</SelectItem>
                      <SelectItem value="4">4ème étage et +</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Chambres</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="0"
                    value={formData.bedrooms}
                    onChange={(e) => updateFormData({ bedrooms: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="living-rooms">Salon/Séjour</Label>
                  <Input
                    id="living-rooms"
                    type="number"
                    min="0"
                    value={formData.livingRooms}
                    onChange={(e) => updateFormData({ livingRooms: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="kitchens">Cuisine</Label>
                  <Input
                    id="kitchens"
                    type="number"
                    min="0"
                    value={formData.kitchens}
                    onChange={(e) => updateFormData({ kitchens: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Salle de bain</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="0"
                    value={formData.bathrooms}
                    onChange={(e) => updateFormData({ bathrooms: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="font-semibold mb-4">Inventaire de vos objets à transporter</h4>
                <p className="text-muted-foreground">Sélectionnez tous les objets que vous souhaitez déménager</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {furnitureItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <Checkbox
                      id={item.id}
                      checked={formData.furnitureInventory.includes(item.id)}
                      onCheckedChange={(checked) => handleFurnitureToggle(item.id, checked as boolean)}
                    />
                    <label htmlFor={item.id} className="flex items-center gap-2 cursor-pointer flex-1">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="font-semibold mb-4">Adresses et accessibilité</h4>
                <p className="text-muted-foreground">Indiquez les adresses et évaluez la facilité d'accès pour notre camion</p>
              </div>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="departure-address">Adresse de départ</Label>
                  <Input
                    id="departure-address"
                    value={formData.departureAddress}
                    onChange={(e) => updateFormData({ departureAddress: e.target.value })}
                    placeholder="Adresse complète de départ"
                  />
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <Input
                      value={formData.departureCity}
                      onChange={(e) => updateFormData({ departureCity: e.target.value })}
                      placeholder="Ville"
                    />
                    <Input
                      value={formData.departurePostal}
                      onChange={(e) => updateFormData({ departurePostal: e.target.value })}
                      placeholder="Code postal"
                    />
                  </div>
                </div>

                <div>
                  <Label>Accessibilité du départ pour le camion</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {accessibilityOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={formData.departureAccessibility === option.value ? "default" : "outline"}
                        className="h-auto p-4 flex flex-col items-start gap-2"
                        onClick={() => updateFormData({ departureAccessibility: option.value })}
                      >
                        <span className="font-semibold">{option.label}</span>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="arrival-address">Adresse d'arrivée</Label>
                  <Input
                    id="arrival-address"
                    value={formData.arrivalAddress}
                    onChange={(e) => updateFormData({ arrivalAddress: e.target.value })}
                    placeholder="Adresse complète d'arrivée"
                  />
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <Input
                      value={formData.arrivalCity}
                      onChange={(e) => updateFormData({ arrivalCity: e.target.value })}
                      placeholder="Ville"
                    />
                    <Input
                      value={formData.arrivalPostal}
                      onChange={(e) => updateFormData({ arrivalPostal: e.target.value })}
                      placeholder="Code postal"
                    />
                  </div>
                </div>

                <div>
                  <Label>Accessibilité de l'arrivée pour le camion</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {accessibilityOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={formData.arrivalAccessibility === option.value ? "default" : "outline"}
                        className="h-auto p-4 flex flex-col items-start gap-2"
                        onClick={() => updateFormData({ arrivalAccessibility: option.value })}
                      >
                        <span className="font-semibold">{option.label}</span>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="moving-date">Date souhaitée</Label>
                  <Input
                    id="moving-date"
                    type="date"
                    value={formData.movingDate}
                    onChange={(e) => updateFormData({ movingDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="date-flexibility">Flexibilité</Label>
                  <Select value={formData.dateFlexibility} onValueChange={(value) => updateFormData({ dateFlexibility: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exact">Date exacte</SelectItem>
                      <SelectItem value="week">±1 semaine</SelectItem>
                      <SelectItem value="month">±1 mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Créneau horaire préféré</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.value}
                      variant={formData.timeSlot === slot.value ? "default" : "outline"}
                      className="h-auto p-3 flex flex-col items-center gap-1"
                      onClick={() => updateFormData({ timeSlot: slot.value })}
                    >
                      <span className="text-xl">{slot.icon}</span>
                      <div className="font-semibold text-sm">{slot.label}</div>
                      <div className="text-xs text-muted-foreground">{slot.time}</div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalServices.map((service) => (
                <div key={service.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <Checkbox
                    id={service.id}
                    checked={formData.additionalServices.includes(service.id)}
                    onCheckedChange={(checked) => handleServiceToggle(service.id, checked as boolean)}
                  />
                  <div className="space-y-1 flex-1">
                    <Label htmlFor={service.id} className="text-sm font-semibold cursor-pointer">
                      {service.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData({ firstName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData({ lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="budget-range">Budget approximatif (optionnel)</Label>
                <Select value={formData.budgetRange} onValueChange={(value) => updateFormData({ budgetRange: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une fourchette" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2000">Moins de 2 000 DH</SelectItem>
                    <SelectItem value="2000-5000">2 000 - 5 000 DH</SelectItem>
                    <SelectItem value="5000-10000">5 000 - 10 000 DH</SelectItem>
                    <SelectItem value="10000+">Plus de 10 000 DH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="additional-comments">Commentaires additionnels</Label>
                <Textarea
                  id="additional-comments"
                  value={formData.additionalComments}
                  onChange={(e) => updateFormData({ additionalComments: e.target.value })}
                  placeholder="Informations supplémentaires, objets fragiles, contraintes particulières..."
                  rows={4}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </Button>
            <Button
              onClick={nextStep}
              disabled={createQuoteMutation.isPending}
              className="flex items-center gap-2 cta-button text-white font-bold"
            >
              {currentStep === steps.length - 1 ? "Terminer" : "Suivant"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (createQuoteMutation.isSuccess) {
    return (
      <div className="text-center space-y-6">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold">Votre demande est prête !</h3>
              <p className="text-muted-foreground">
                Vous pouvez maintenant nous l'envoyer par email ou nous contacter directement sur WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button
                  asChild
                  className="cta-button text-white font-bold flex items-center gap-2"
                >
                  <a href={generateMailtoLink()}>
                    <Mail className="w-4 h-4" />
                    Envoyer par Email
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-green-500 hover:bg-green-600 text-white font-bold flex items-center gap-2"
                >
                  <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" />
                    Envoyer sur WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Honeycomb Grid */}
      <div className="honeycomb-container">
        {steps.map((step) => {
          const IconComponent = step.icon;
          const isCompleted = completedSteps.includes(step.id);
          const isActive = currentStep === step.id;
          
          return (
            <div
              key={step.id}
              className={`honeycomb-cell ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
              onClick={() => selectStep(step.id)}
            >
              <div className="hexagon"></div>
              <div className="hex-content">
                <IconComponent className="w-6 h-6 mx-auto mb-1" />
                <div className="text-xs font-bold leading-tight">
                  {step.title.split(" ").map((word, i) => (
                    <div key={i}>{word}</div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      {currentStep >= 0 && renderStepContent()}
    </div>
  );
}
