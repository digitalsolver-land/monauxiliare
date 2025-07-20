
import HoneycombQuote from "@/components/HoneycombQuote";
import { trackEvent } from "@/lib/analytics";
import { useEffect, useState } from "react";
import { ProgressTruckSVG, TruckSVG, BoxesSVG, CheckmarkSVG } from "@/components/MovingSVGs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Quote() {
  const [quoteProgress, setQuoteProgress] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    trackEvent("quote_page_viewed", "engagement", "quote_funnel");
  }, []);

  // Simulate progress updates from honeycomb
  useEffect(() => {
    const handleProgress = (event: CustomEvent) => {
      setQuoteProgress(event.detail.progress);
      if (event.detail.achievement) {
        setAchievements(prev => [...prev, event.detail.achievement]);
      }
    };

    window.addEventListener('quote-progress', handleProgress as EventListener);
    return () => window.removeEventListener('quote-progress', handleProgress as EventListener);
  }, []);

  const features = [
    {
      icon: <TruckSVG className="w-8 h-8 animate-move-box" />,
      title: "Déplacement sécurisé",
      description: "Transport professionnel avec assurance complète"
    },
    {
      icon: <BoxesSVG className="w-8 h-8 animate-float" />,
      title: "Emballage expert",
      description: "Protection optimale de tous vos biens"
    },
    {
      icon: <CheckmarkSVG className="w-8 h-8" />,
      title: "Satisfaction garantie",
      description: "Service de qualité ou remboursement"
    }
  ];

  return (
    <div className="page-view">
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <TruckSVG className="w-24 h-16 animate-move-box" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Évaluer mon déménagement
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Cliquez sur chaque hexagone pour évaluer votre déménagement. 
            Remplissez chaque étape pour obtenir votre devis personnalisé.
          </p>
        </div>

        {/* Main Layout: Instructions + Honeycomb */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Instructions Panel - Left Side */}
          <div className="lg:col-span-1 space-y-6">
            {/* Instructions */}
            <Card className="bg-gradient-to-r from-brand-orange/10 to-brand-green/10">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="animate-bounce-custom text-lg">
                    📋
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-3">Comment réaliser mon déménagement :</h3>
                    <div className="space-y-2 text-sm">
                      <p>• <strong>Étape 1 :</strong> Choisissez votre type de logement</p>
                      <p>• <strong>Étape 2 :</strong> Indiquez la surface et les pièces</p>
                      <p>• <strong>Étape 3 :</strong> Listez vos objets à transporter</p>
                      <p>• <strong>Étape 4 :</strong> Évaluez l'accessibilité des adresses</p>
                      <p>• <strong>Étape 5 :</strong> Choisissez votre date et services</p>
                      <p>• <strong>Étape 6 :</strong> Recevez votre devis par email</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-center">Nos Services</h3>
              {features.map((feature, index) => (
                <Card key={index} className="p-3 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-2 p-0">
                    <div className="flex justify-center">
                      {feature.icon}
                    </div>
                    <h4 className="font-bold text-center text-sm">{feature.title}</h4>
                    <p className="text-muted-foreground text-xs text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Honeycomb + Modal Area */}
          <div className="lg:col-span-3">
            <HoneycombQuote onProgressUpdate={setQuoteProgress} />
          </div>
        </div>

        {/* Motivational Section */}
        <div className="text-center mt-8">
          <Badge className="bg-brand-green text-black font-bold text-sm px-4 py-2">
            ⚡ Plus de 1000 déménagements réussis cette année !
          </Badge>
        </div>
      </div>
    </div>
  );
}
