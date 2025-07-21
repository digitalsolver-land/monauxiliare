import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, BookOpen, User, Calendar, Filter, Search, Grid, List } from "lucide-react";
import { useState } from "react";
import { getAllArticles, getArticlesByCategory, type Article } from "@/data/articles";
import { TruckSVG, BoxesSVG, HouseSVG, MovingAnimation } from "@/components/MovingSVGs";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import HubSlider from "@/components/HubSlider";

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Planification": return "bg-brand-green text-black";
    case "Conseils pratiques": return "bg-brand-orange text-white";
    case "Finance": return "bg-green-600 text-white";
    case "Services": return "bg-blue-600 text-white";
    case "Administration": return "bg-red-600 text-white";
    case "International": return "bg-purple-600 text-white";
    default: return "bg-gray-600 text-white";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Planification": return <HouseSVG className="w-8 h-8" />;
    case "Conseils pratiques": return <BoxesSVG className="w-8 h-8" />;
    case "Finance": return <TruckSVG className="w-8 h-8" />;
    case "Services": return <BoxesSVG className="w-8 h-8" />;
    case "Administration": return <HouseSVG className="w-8 h-8" />;
    case "International": return <TruckSVG className="w-8 h-8" />;
    default: return <BoxesSVG className="w-8 h-8" />;
  }
};

const categories = [
  "Tous",
  "Planification", 
  "Conseils pratiques", 
  "Finance", 
  "Services", 
  "Administration", 
  "International"
];

export default function Hub() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const allArticles = getAllArticles();

  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = selectedCategory === "Tous" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categoryStats = categories.slice(1).map(category => ({
    name: category,
    count: getArticlesByCategory(category).length,
    color: getCategoryColor(category)
  }));

  return (
    <div className="page-view">
      <div className="container mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <HubSlider className="w-64 h-40" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-orange-600 dark:text-orange-400">
            Hub du Déménagement
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Votre centre de ressources complet pour un déménagement réussi. Guides détaillés, conseils d'experts et astuces pratiques.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold brand-orange">{allArticles.length}</div>
              <div className="text-sm text-muted-foreground">Articles</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold brand-green">{categories.length - 1}</div>
              <div className="text-sm text-muted-foreground">Catégories</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold brand-orange">50+</div>
              <div className="text-sm text-muted-foreground">Conseils</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold brand-green">100%</div>
              <div className="text-sm text-muted-foreground">Gratuit</div>
            </div>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Explorez par Catégorie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categoryStats.map((category) => (
              <Card 
                key={category.name} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedCategory(category.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-brand-orange/10 to-brand-green/10">
                      {getCategoryIcon(category.name)}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:brand-orange transition-colors">
                    {category.name}
                  </h3>
                  <Badge className={category.color}>
                    {category.count} article{category.count > 1 ? 's' : ''}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher des articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs lg:text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Articles Display */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "Tous" ? "Tous les Articles" : selectedCategory}
              <span className="text-muted-foreground ml-2 text-lg">
                ({filteredArticles.length})
              </span>
            </h2>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/hub/article/${article.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group h-full">
                    <div className="aspect-video overflow-hidden bg-gradient-to-br from-brand-orange/10 to-brand-green/10 flex items-center justify-center">
                      <div className="animate-float">
                        {getCategoryIcon(article.category)}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={getCategoryColor(article.category)}>
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:brand-orange transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {article.date}
                        </div>
                      </div>
                      <Button className="w-full cta-button font-bold group">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Lire l'article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/hub/article/${article.id}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-brand-orange/10 to-brand-green/10 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(article.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <Badge className={getCategoryColor(article.category)}>
                              {article.category}
                            </Badge>
                            <div className="flex items-center text-sm text-muted-foreground gap-4">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {article.readTime}
                              </div>
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {article.author}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {article.date}
                              </div>
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 group-hover:brand-orange transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {article.summary}
                          </p>
                          <Button className="cta-button font-bold group">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Lire l'article complet
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <Search className="w-16 h-16 mx-auto text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aucun article trouvé</h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche ou explorez une autre catégorie.
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="bg-white dark:bg-gray-900 border-2 border-orange-500">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <TruckSVG className="w-12 h-12 animate-bounce-custom text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">Restez informé de nos derniers conseils</h3>
              <p className="mb-6 text-orange-700 dark:text-orange-300 max-w-2xl mx-auto">
                Recevez nos guides exclusifs, astuces d'experts et nouveaux articles directement dans votre boîte mail. 
                Rejoignez plus de 10 000 personnes qui nous font confiance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none text-gray-900"
                />
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-bold">
                  S'abonner gratuitement
                </Button>
              </div>
              <p className="text-sm text-orange-600 dark:text-orange-400 mt-3">
                Pas de spam. Désabonnement facile à tout moment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}