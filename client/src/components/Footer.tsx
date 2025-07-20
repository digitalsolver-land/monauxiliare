import { Link } from "wouter";
import { Truck, Facebook, MessageCircle, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 text-xl font-bold brand-orange mb-4">
              <Truck className="w-6 h-6" />
              <span>Mon Auxiliaire</span>
            </div>
            <p className="text-gray-400 mb-4">
              Leader du déménagement au Maroc. Votre confiance, notre engagement.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="brand-orange hover:text-orange-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="brand-orange hover:text-orange-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="brand-orange hover:text-orange-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="brand-orange hover:text-orange-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/services" className="hover:brand-orange transition-colors">
                  Déménagement résidentiel
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:brand-orange transition-colors">
                  Déménagement entreprise
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:brand-orange transition-colors">
                  Emballage & Protection
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:brand-orange transition-colors">
                  Stockage sécurisé
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/hub" className="hover:brand-orange transition-colors">
                  Guide du déménagement
                </Link>
              </li>
              <li>
                <Link href="/hub" className="hover:brand-orange transition-colors">
                  Check-list complète
                </Link>
              </li>
              <li>
                <Link href="/hub" className="hover:brand-orange transition-colors">
                  Conseils emballage
                </Link>
              </li>
              <li>
                <Link href="/hub" className="hover:brand-orange transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                06 61 20 69 29
              </li>
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                contact@monauxiliaire.com
              </li>
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>14 Rue Farabi, Plage<br />Tanger - Maroc</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🕒</span>
                Lun-Sam: 8h-18h
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 Mon Auxiliaire. Tous droits réservés. |{" "}
            <a href="#" className="hover:brand-orange transition-colors">
              Mentions légales
            </a>{" "}
            |{" "}
            <a href="#" className="hover:brand-orange transition-colors">
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
