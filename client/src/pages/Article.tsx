
import { useRoute, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Clock, ArrowLeft, User, Calendar, Tag, Share2, Facebook, Linkedin, MessageCircle, BookOpen, ArrowRight } from "lucide-react";
import { getArticle, getRelatedArticles, type Article } from "@/data/articles";
import { TruckSVG, BoxesSVG, HouseSVG } from "@/components/MovingSVGs";
import { useEffect, useState } from "react";

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
    case "Planification": return <HouseSVG className="w-6 h-6" />;
    case "Conseils pratiques": return <BoxesSVG className="w-6 h-6" />;
    case "Finance": return <TruckSVG className="w-6 h-6" />;
    case "Services": return <BoxesSVG className="w-6 h-6" />;
    case "Administration": return <HouseSVG className="w-6 h-6" />;
    case "International": return <TruckSVG className="w-6 h-6" />;
    default: return <BoxesSVG className="w-6 h-6" />;
  }
};

export default function Article() {
  const [match, params] = useRoute("/hub/article/:id");
  const [readingProgress, setReadingProgress] = useState(0);
  
  if (!match || !params?.id) {
    return (
      <div className="page-view flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <Link href="/hub">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au Hub
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const article = getArticle(params.id);
  
  if (!article) {
    return (
      <div className="page-view flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-6">
            L'article que vous cherchez n'existe pas ou a été déplacé.
          </p>
          <Link href="/hub">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au Hub
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.id);
  const currentUrl = window.location.href;
  const shareUrl = currentUrl;
  const shareText = `${article.title} - ${article.summary}`;

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        break;
    }
    window.open(url, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const element = document.documentElement;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const progress = (element.scrollTop / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="page-view">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-brand-orange to-brand-green transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Back Navigation */}
        <Link href="/hub">
          <Button variant="ghost" className="mb-6 hover:bg-brand-orange/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au Hub
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Badge className={`${getCategoryColor(article.category)} flex items-center gap-2`}>
              {getCategoryIcon(article.category)}
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

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {article.summary}
          </p>

          {/* Social Sharing */}
          <div className="flex items-center justify-between border-y py-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">Partager :</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                  className="hover:bg-blue-50"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className="hover:bg-blue-50"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                  className="hover:bg-blue-50"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('whatsapp')}
                  className="hover:bg-green-50"
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="hover:bg-gray-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copier le lien
            </Button>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {/* Introduction */}
          <div className="text-lg leading-relaxed mb-8 p-6 bg-gradient-to-r from-brand-orange/5 to-brand-green/5 rounded-lg border-l-4 border-brand-orange">
            {article.content.introduction}
          </div>

          {/* Sections */}
          {article.content.sections.map((section, index) => (
            <section key={index} className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 brand-orange">
                <span className="bg-gradient-to-r from-brand-orange to-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {section.content}
              </p>

              {section.tips && (
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    Conseils pratiques :
                  </h3>
                  <ul className="space-y-3">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-3 text-green-700 dark:text-green-300">
                        <span className="bg-brand-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                          ✓
                        </span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.warning && (
                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-3 flex items-center gap-2">
                    <span className="text-xl">⚠️</span>
                    Point d'attention important :
                  </h3>
                  <p className="text-orange-700 dark:text-orange-300 leading-relaxed">{section.warning}</p>
                </div>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h2 className="text-2xl font-bold mb-4 brand-orange flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              En résumé
            </h2>
            <p className="text-lg leading-relaxed">{article.content.conclusion}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1 px-3 py-1">
                <Tag className="w-3 h-3" />
                {tag}
              </Badge>
            ))}
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mb-12">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 brand-orange" />
              Articles connexes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link key={relatedArticle.id} href={`/hub/article/${relatedArticle.id}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 p-2 bg-gradient-to-br from-brand-orange/10 to-brand-green/10 rounded-lg">
                          {getCategoryIcon(relatedArticle.category)}
                        </div>
                        <div className="flex-1">
                          <Badge className={`${getCategoryColor(relatedArticle.category)} mb-2`}>
                            {relatedArticle.category}
                          </Badge>
                          <h3 className="font-semibold mb-2 group-hover:brand-orange transition-colors line-clamp-2">
                            {relatedArticle.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {relatedArticle.summary}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {relatedArticle.readTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {relatedArticle.author}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="w-full cta-button group">
                        Lire cet article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <Card className="bg-gradient-to-r from-brand-orange to-brand-green text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Cet article vous a été utile ?</h3>
            <p className="mb-6 opacity-90">
              Recevez nos derniers conseils et guides directement par email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button className="bg-white text-brand-orange hover:bg-gray-100 px-6 font-bold">
                S'abonner
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
