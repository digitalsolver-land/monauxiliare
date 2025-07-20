import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Clock, ArrowRight, BookOpen, User, Calendar, Tag } from "lucide-react";
import { useState } from "react";
import { getAllArticles, getArticle, getRelatedArticles, type Article } from "@/data/articles";
import { TruckSVG, BoxesSVG, HouseSVG, MovingAnimation } from "@/components/MovingSVGs";

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

const ArticleModal = ({ article, onClose }: { article: Article; onClose: () => void }) => {
  const relatedArticles = getRelatedArticles(article.id);

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] p-0">
      <DialogHeader className="p-6 pb-4 border-b">
        <div className="flex items-center gap-3 mb-3">
          <Badge className={getCategoryColor(article.category)}>
            {article.category}
          </Badge>
          <div className="flex items-center text-muted-foreground text-sm gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {article.author}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.date}
            </div>
          </div>
        </div>
        <DialogTitle className="text-2xl font-bold">{article.title}</DialogTitle>
        <DialogDescription className="text-lg">
          {article.summary}
        </DialogDescription>
      </DialogHeader>
      
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="text-lg leading-relaxed">
            {article.content.introduction}
          </div>

          {/* Sections */}
          {article.content.sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold brand-orange flex items-center gap-2">
                <BoxesSVG className="w-6 h-6" />
                {section.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
              
              {section.tips && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-brand-green">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">💡 Conseils pratiques :</h4>
                  <ul className="space-y-2">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-green-700 dark:text-green-300">
                        <span className="text-brand-green mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.warning && (
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">⚠️ Attention :</h4>
                  <p className="text-orange-700 dark:text-orange-300">{section.warning}</p>
                </div>
              )}
            </div>
          ))}

          {/* Conclusion */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 brand-orange">🎯 En résumé</h3>
            <p className="text-lg leading-relaxed">{article.content.conclusion}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div>
              <Separator className="mb-6" />
              <h3 className="text-xl font-semibold mb-4">Articles connexes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map((relatedArticle) => (
                  <Card key={relatedArticle.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <TruckSVG className="w-8 h-8 flex-shrink-0 animate-pulse-custom" />
                        <div>
                          <h4 className="font-semibold text-sm hover:brand-orange transition-colors">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {relatedArticle.summary.slice(0, 100)}...
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {relatedArticle.readTime}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

export default function Hub() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const articles = getAllArticles();

  const handleArticleClick = (articleId: string) => {
    console.log("Opening article:", articleId);
    const article = getArticle(articleId);
    if (article) {
      setSelectedArticle(article);
    }
  };

  return (
    <div className="page-view">
      <div className="container mx-auto px-6 py-16 md:py-24">
        {/* Hero Section with Animation */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <MovingAnimation className="w-48 h-32" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Le Hub du Déménagement</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-lg">
            Votre source d'information de référence. Guides complets et astuces pour un déménagement maîtrisé.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Dialog key={article.id}>
              <DialogTrigger asChild>
                <Card 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => handleArticleClick(article.id)}
                >
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-brand-orange/10 to-brand-green/10 flex items-center justify-center">
                    <div className="animate-float">
                      {article.id === 'checklist' && <HouseSVG className="w-20 h-20 brand-orange" />}
                      {article.id === 'packing-tips' && <BoxesSVG className="w-20 h-20" />}
                      {article.id === 'budget' && <TruckSVG className="w-20 h-20 brand-green" />}
                      {article.id === 'admin' && <HouseSVG className="w-20 h-20 brand-orange" />}
                      {article.id === 'international' && <TruckSVG className="w-20 h-20 brand-orange" />}
                      {article.id === 'storage' && <BoxesSVG className="w-20 h-20" />}
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
                    <h3 className="text-xl font-semibold mb-3 group-hover:brand-orange transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.summary}
                    </p>
                    <Button className="w-full cta-button font-bold">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Lire l'article complet
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <ArticleModal 
                article={article} 
                onClose={() => setSelectedArticle(null)} 
              />
            </Dialog>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="bg-brand-orange text-white">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <TruckSVG className="w-12 h-12 animate-bounce-custom" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Restez informé de nos derniers conseils</h3>
              <p className="mb-6 opacity-90">
                Recevez nos guides et astuces déménagement directement dans votre boîte mail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button className="cta-button px-6">
                  S'abonner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
