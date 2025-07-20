import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home as HomeIcon, Building, Package, Warehouse, Phone, Calculator, Shield, Users, Clock, Star } from "lucide-react";

const services = [
  {
    icon: HomeIcon,
    title: "Déménagement Résidentiel",
    description: "Appartements, maisons, studios - nous nous occupons de tout.",
  },
  {
    icon: Building,
    title: "Déménagement Entreprise",
    description: "Bureaux, locaux commerciaux, transferts d'activité.",
  },
  {
    icon: Package,
    title: "Emballage & Protection",
    description: "Matériel professionnel pour protéger vos biens.",
  },
  {
    icon: Warehouse,
    title: "Stockage Sécurisé",
    description: "Solutions de stockage temporaire ou long terme.",
  },
];

const features = [
  {
    icon: Shield,
    title: "Assurance Complète",
    description: "Vos biens sont protégés par une assurance tous risques.",
    color: "text-brand-yellow bg-brand-yellow/20",
  },
  {
    icon: Users,
    title: "Équipe Experte",
    description: "Professionnels formés et expérimentés à votre service.",
    color: "text-brand-yellow bg-brand-yellow/20",
  },
  {
    icon: Clock,
    title: "Ponctualité Garantie",
    description: "Respect des délais et des horaires convenus.",
    color: "text-brand-yellow bg-brand-yellow/20",
  },
];

const testimonials = [
  {
    name: "Ahmed Benali",
    location: "Casablanca",
    rating: 5,
    text: "Service impeccable ! L'équipe était ponctuelle, professionnelle et très soigneuse avec nos affaires. Je recommande vivement !",
    initial: "A",
  },
  {
    name: "Sofia Alami",
    location: "Rabat",
    rating: 5,
    text: "Déménagement de bureau parfaitement organisé. Aucune interruption d'activité. Bravo à toute l'équipe !",
    initial: "S",
  },
  {
    name: "Youssef Tazi",
    location: "Marrakech",
    rating: 5,
    text: "Prix très compétitif et service de qualité. Le devis en ligne est très pratique. Merci Mon Auxiliaire !",
    initial: "Y",
  },
];

export default function Home() {
  return (
    <div className="page-view">
      {/* Hero Section */}
      <section className="hero-bg text-white">
        <div className="container mx-auto px-6 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Le déménagement,<br />la confiance en plus.
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Votre partenaire de confiance pour tous vos projets de déménagement au Maroc. Simple, rapide et sécurisé.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis">
              <Button size="lg" className="bg-white text-brand-blue font-bold hover:bg-gray-100 transition-all">
                <Calculator className="w-5 h-5 mr-2" />
                Devis Gratuit
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-brand-blue transition-all"
              asChild
            >
              <a href="tel:+212661206929">
                <Phone className="w-5 h-5 mr-2" />
                06 61 20 69 29
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Des solutions complètes pour chaque besoin</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Du studio à la multinationale, nous avons l'expertise pour un déménagement réussi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={index} 
                  className="service-card text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => (window as any).openServiceModal?.('residential')}
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <IconComponent className="w-8 h-8 text-brand-blue group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Pourquoi choisir Mon Auxiliaire ?</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              15 ans d'expérience au service de votre tranquillité.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-20 h-20 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">La parole à nos clients</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Leur satisfaction est notre plus grande fierté.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="flex text-brand-yellow">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {testimonial.initial}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-bg text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt pour votre déménagement ?</h2>
          <p className="text-lg mb-8 opacity-90">
            Obtenez votre devis personnalisé en quelques clics avec notre widget interactif.
          </p>
          <Link href="/devis">
            <Button size="lg" className="cta-button text-brand-dark font-bold hover:bg-yellow-400 transition-all">
              <Calculator className="w-5 h-5 mr-2" />
              Calculer mon devis
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
