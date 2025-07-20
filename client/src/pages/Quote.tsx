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
      <div className="flex">
        {/* Sidebar with Features */}
        <div className="w-80 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <h3 className="text-xl font-bold mb-6 text-center">Nos Services</h3>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-3 p-0">
                  <div className="flex justify-center">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-center">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 py-16 md:py-24">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <TruckSVG className="w-32 h-20 animate-move-box" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Évaluer mon déménagement
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-lg">
              Cliquez sur chaque hexagone pour évaluer votre déménagement. 
              Remplissez chaque étape pour obtenir votre devis personnalisé.
            </p>
          </div>

        {/* Instructions */}
        <Card className="mb-8 bg-gradient-to-r from-brand-orange/10 to-brand-green/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="animate-bounce-custom">
                📋
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Comment réaliser mon déménagement :</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p>• <strong>Étape 1 :</strong> Choisissez votre type de logement</p>
                    <p>• <strong>Étape 2 :</strong> Indiquez la surface et les pièces</p>
                    <p>• <strong>Étape 3 :</strong> Listez vos objets à transporter</p>
                  </div>
                  <div className="space-y-2">
                    <p>• <strong>Étape 4 :</strong> Évaluez l'accessibilité des adresses</p>
                    <p>• <strong>Étape 5 :</strong> Choisissez votre date et services</p>
                    <p>• <strong>Étape 6 :</strong> Recevez votre devis par email</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <HoneycombQuote onProgressUpdate={setQuoteProgress} />

        {/* Motivational Section */}
        <div className="text-center mt-12">
          <Badge className="bg-brand-green text-black font-bold text-sm px-4 py-2">
            ⚡ Plus de 1000 déménagements réussis cette année !
          </Badge>
        </div>
      </div>
    </div>
  </div>
  );
}
