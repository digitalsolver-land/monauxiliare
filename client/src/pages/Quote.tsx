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
      <div className="container mx-auto px-6 py-16 md:py-24">
        {/* Hero Section with Gamification */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <ProgressTruckSVG progress={quoteProgress} className="w-64 h-16" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎮 Devis Interactif Gamifié
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-lg">
            Cliquez sur chaque hexagone pour débloquer votre devis personnalisé. 
            Plus vous avancez, plus vous gagnez d'avantages !
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mt-6">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${quoteProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Progression : {Math.round(quoteProgress)}% complété
            </p>
          </div>

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-badge">
                  🏆 {achievement}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Game Instructions */}
        <Card className="mb-8 bg-gradient-to-r from-brand-orange/10 to-brand-green/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="animate-bounce-custom">
                🎯
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Comment jouer :</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p>• <strong>Étape 1 :</strong> Cliquez sur chaque hexagone orange</p>
                    <p>• <strong>Étape 2 :</strong> Remplissez les informations demandées</p>
                    <p>• <strong>Étape 3 :</strong> Débloquez des bonus en progressant</p>
                  </div>
                  <div className="space-y-2">
                    <p>• <strong>🎁 Bonus 25% :</strong> Remise early bird</p>
                    <p>• <strong>🎁 Bonus 50% :</strong> Emballage gratuit inclus</p>
                    <p>• <strong>🎁 Bonus 100% :</strong> Devis prioritaire + conseil expert</p>
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
  );
}
