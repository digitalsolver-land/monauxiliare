import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Award, Users, MapPin, Handshake, Star, Heart } from "lucide-react";

const values = [
  {
    icon: Handshake,
    title: "Confiance",
    description: "Transparence totale dans nos devis et respect scrupuleux de nos engagements.",
  },
  {
    icon: Star,
    title: "Excellence",
    description: "Formation continue de nos équipes et matériel professionnel de dernière génération.",
  },
  {
    icon: Heart,
    title: "Bienveillance",
    description: "Écoute attentive de vos besoins et accompagnement personnalisé à chaque étape.",
  },
];

const teamMembers = [
  {
    name: "Ahmed Kabbaj",
    role: "Directeur Général",
    description: "15 ans d'expérience dans la logistique. Diplômé de l'ENCG Casablanca.",
    initials: "AK",
  },
  {
    name: "Fatima El Mansouri",
    role: "Directrice Opérationnelle",
    description: "Expert en gestion de projets complexes. Garante de la qualité de nos services.",
    initials: "FE",
  },
];

const achievements = [
  {
    icon: Calendar,
    title: "Fondée en 2008",
    description: "Plus de 15 ans d'expertise",
  },
  {
    icon: Award,
    title: "Leader certifié du secteur",
    description: "Reconnu par nos pairs",
  },
  {
    icon: Users,
    title: "Plus de 10,000 clients satisfaits",
    description: "Une communauté qui nous fait confiance",
  },
  {
    icon: MapPin,
    title: "Présent dans tout le Maroc",
    description: "Couverture nationale complète",
  },
];

export default function About() {
  return (
    <div className="page-view">
      <div className="container mx-auto px-6 py-16 md:py-24 space-y-16">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Notre histoire, vos garanties.</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Depuis plus de 15 ans, Mon Auxiliaire s'est imposé comme un acteur majeur du déménagement au Maroc. 
              Fondée par des experts, notre mission est de vous offrir une tranquillité d'esprit absolue.
            </p>
            <div className="mt-6 space-y-3">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-brand-blue flex-shrink-0" />
                    <div>
                      <span className="font-semibold">{achievement.title}</span>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Équipe Mon Auxiliaire" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Values Section */}
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl md:text-3xl">Nos valeurs fondamentales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-brand-blue" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Notre équipe dirigeante</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center shadow-lg">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {member.initials}
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-brand-blue font-semibold mb-2">{member.role}</p>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Stats */}
        <Card className="bg-gradient-to-r from-brand-blue to-blue-600 text-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">15+</div>
                <p className="text-blue-100">Années d'expérience</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">10K+</div>
                <p className="text-blue-100">Clients satisfaits</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <p className="text-blue-100">Professionnels qualifiés</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">12</div>
                <p className="text-blue-100">Villes couvertes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <div className="text-center bg-muted/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            "Transformer l'expérience du déménagement en un moment de vie positif et serein. 
            Nous nous engageons à offrir des services d'excellence, adaptés à chaque situation, 
            avec la garantie d'un accompagnement professionnel et bienveillant du premier contact 
            jusqu'à votre installation complète."
          </p>
          <div className="mt-6">
            <p className="font-semibold">- L'équipe dirigeante Mon Auxiliaire</p>
          </div>
        </div>
      </div>
    </div>
  );
}
