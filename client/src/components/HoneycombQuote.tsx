
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
  MessageCircle,
  X
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

  const closeModal = () => {
    setCurrentStep(-1);
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
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <IconComponent className="w-8 h-8 text-brand-blue" />
            <div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={closeModal}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {currentStep === 0 && (
            <div className="grid grid-cols-2 gap-3">
              {housingTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={formData.housingType === type.value ? "default" : "outline"}
                  className="h-auto p-3 flex flex-col items-center gap-2"
                  onClick={() => updateFormData({ housingType: type.value })}
                >
                  <span className="text-xl">{type.icon}</span>
                  <span className="font-semibold text-xs">{type.label}</span>
                </Button>
              ))}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="surface" className="text-sm">Surface (m²)</Label>
                  <Input
                    id="surface"
                    type="number"
                    size="sm"
                    value={formData.surface || ""}
                    onChange={(e) => updateFormData({ surface: parseInt(e.target.value) || 0 })}
                    placeholder="Ex: 80"
                  />
                </div>
                <div>
                  <Label htmlFor="floor" className="text-sm">Étage</Label>
                  <Select value={formData.floor.toString()} onValueChange={(value) => updateFormData({ floor: parseInt(value) })}>
                    <SelectTrigger size="sm">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">RDC</SelectItem>
                      <SelectItem value="1">1er</SelectItem>
                      <SelectItem value="2">2ème</SelectItem>
                      <SelectItem value="3">3ème</SelectItem>
                      <SelectItem value="4">4ème+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <Label htmlFor="bedrooms" className="text-xs">Chambres</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    size="sm"
                    min="0"
                    value={formData.bedrooms}
                    onChange={(e) => updateFormData({ bedrooms: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="living-rooms" className="text-xs">Salon</Label>
                  <Input
                    id="living-rooms"
                    type="number"
                    size="sm"
                    min="0"
                    value={formData.livingRooms}
                    onChange={(e) => updateFormData({ livingRooms: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="kitchens" className="text-xs">Cuisine</Label>
                  <Input
                    id="kitchens"
                    type="number"
                    size="sm"
                    min="0"
                    value={formData.kitchens}
                    onChange={(e) => updateFormData({ kitchens: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms" className="text-xs">SDB</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    size="sm"
                    min="0"
                    value={formData.bathrooms}
                    onChange={(e) => updateFormData({ bathrooms: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {furnitureItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800">
                    <Checkbox
                      id={item.id}
                      checked={formData.furnitureInventory.includes(item.id)}
                      onCheckedChange={(checked) => handleFurnitureToggle(item.id, checked as boolean)}
                    />
                    <label htmlFor={item.id} className="flex items-center gap-2 cursor-pointer flex-1">
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-xs font-medium">{item.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="departure-address" className="text-sm">Adresse de départ</Label>
                <Input
                  id="departure-address"
                  size="sm"
                  value={formData.departureAddress}
                  onChange={(e) => updateFormData({ departureAddress: e.target.value })}
                  placeholder="Adresse complète"
                />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Input
                    size="sm"
                    value={formData.departureCity}
                    onChange={(e) => updateFormData({ departureCity: e.target.value })}
                    placeholder="Ville"
                  />
                  <Input
                    size="sm"
                    value={formData.departurePostal}
                    onChange={(e) => updateFormData({ departurePostal: e.target.value })}
                    placeholder="Code postal"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Accessibilité départ</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {accessibilityOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={formData.departureAccessibility === option.value ? "default" : "outline"}
                      className="h-auto p-2 flex flex-col items-start gap-1"
                      onClick={() => updateFormData({ departureAccessibility: option.value })}
                    >
                      <span className="font-semibold text-xs">{option.label}</span>
                      <span className="text-xs text-muted-foreground">{option.description}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="arrival-address" className="text-sm">Adresse d'arrivée</Label>
                <Input
                  id="arrival-address"
                  size="sm"
                  value={formData.arrivalAddress}
                  onChange={(e) => updateFormData({ arrivalAddress: e.target.value })}
                  placeholder="Adresse complète"
                />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Input
                    size="sm"
                    value={formData.arrivalCity}
                    onChange={(e) => updateFormData({ arrivalCity: e.target.value })}
                    placeholder="Ville"
                  />
                  <Input
                    size="sm"
                    value={formData.arrivalPostal}
                    onChange={(e) => updateFormData({ arrivalPostal: e.target.value })}
                    placeholder="Code postal"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Accessibilité arrivée</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {accessibilityOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={formData.arrivalAccessibility === option.value ? "default" : "outline"}
                      className="h-auto p-2 flex flex-col items-start gap-1"
                      onClick={() => updateFormData({ arrivalAccessibility: option.value })}
                    >
                      <span className="font-semibold text-xs">{option.label}</span>
                      <span className="text-xs text-muted-foreground">{option.description}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="moving-date" className="text-sm">Date souhaitée</Label>
                  <Input
                    id="moving-date"
                    type="date"
                    size="sm"
                    value={formData.movingDate}
                    onChange={(e) => updateFormData({ movingDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="date-flexibility" className="text-sm">Flexibilité</Label>
                  <Select value={formData.dateFlexibility} onValueChange={(value) => updateFormData({ dateFlexibility: value })}>
                    <SelectTrigger size="sm">
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
                <Label className="text-sm">Créneau horaire</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.value}
                      variant={formData.timeSlot === slot.value ? "default" : "outline"}
                      className="h-auto p-2 flex flex-col items-center gap-1"
                      onClick={() => updateFormData({ timeSlot: slot.value })}
                    >
                      <span className="text-sm">{slot.icon}</span>
                      <div className="font-semibold text-xs">{slot.label}</div>
                      <div className="text-xs text-muted-foreground">{slot.time}</div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="grid grid-cols-1 gap-3">
              {additionalServices.map((service) => (
                <div key={service.id} className="flex items-start space-x-3 p-3 border rounded hover:bg-accent/50 transition-colors">
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

          {currentStep === 6 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName" className="text-sm">Prénom *</Label>
                  <Input
                    id="firstName"
                    size="sm"
                    value={formData.firstName}
                    onChange={(e) => updateFormData({ firstName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm">Nom *</Label>
                  <Input
                    id="lastName"
                    size="sm"
                    value={formData.lastName}
                    onChange={(e) => updateFormData({ lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="email" className="text-sm">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    size="sm"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    size="sm"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="budget-range" className="text-sm">Budget approximatif</Label>
                <Select value={formData.budgetRange} onValueChange={(value) => updateFormData({ budgetRange: value })}>
                  <SelectTrigger size="sm">
                    <SelectValue placeholder="Sélectionner" />
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
                <Label htmlFor="additional-comments" className="text-sm">Commentaires</Label>
                <Textarea
                  id="additional-comments"
                  value={formData.additionalComments}
                  onChange={(e) => updateFormData({ additionalComments: e.target.value })}
                  placeholder="Informations supplémentaires..."
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </Button>
          <Button
            size="sm"
            onClick={nextStep}
            disabled={createQuoteMutation.isPending}
            className="flex items-center gap-2 cta-button text-white font-bold"
          >
            {currentStep === steps.length - 1 ? "Terminer" : "Suivant"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  if (createQuoteMutation.isSuccess) {
    return (
      <div className="text-center space-y-6">
        <Card className="max-w-lg mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-bold">Votre demande est prête !</h3>
              <p className="text-muted-foreground text-sm">
                Vous pouvez maintenant nous l'envoyer par email ou nous contacter sur WhatsApp.
              </p>
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  asChild
                  size="sm"
                  className="cta-button text-white font-bold flex items-center gap-2"
                >
                  <a href={generateMailtoLink()}>
                    <Mail className="w-4 h-4" />
                    Envoyer par Email
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
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
    <div className="space-y-6">
      {/* Main Layout: Honeycomb + Modal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Honeycomb Grid */}
        <div className="honeycomb-container justify-start">
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
                  <IconComponent className="w-5 h-5 mx-auto mb-1" />
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

        {/* Modal Content Area */}
        <div className="min-h-[400px]">
          {currentStep >= 0 && (
            <Card className="w-full">
              <CardContent className="p-4">
                {renderStepContent()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
