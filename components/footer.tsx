import Link from "next/link";
import { Facebook, Phone, MapPin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              La Cité des Vents
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Restaurant - Pizzeria - Lounge Bar depuis 17 ans. Cuisines
              Italienne et Française, Pizza au feu de bois. Soirées musicales
              tous les vendredis et samedis.
            </p>
            <a href="/admin" className="flex items-center space-x-2 hover:text-[#d3cbc2] transition-colors">
              <Mail className="w-5 h-5" />
              <span>Admin</span>
            </a>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="tel:0227971070"
                className="flex items-center space-x-3 hover:text-[#d3cbc2] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>022 797 10 70</span>
              </a>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>
                  Rue de la Coupe Gordon-Bennett 3<br />
                  1219 Aïre
                </span>
              </div>
              <a
                href="https://www.facebook.com/p/La-Cit%C3%A9-Fleurie-100063631886817/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-[#d3cbc2] transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Accessible en fauteuil roulant</li>
              <li>Plats à emporter</li>
              <li>Réservations</li>
              <li>Terrasse</li>
              <li>Service de table</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} La Cité des Vents. Tous droits
            réservés.
            {" - "}
            <Link
              href="/mentions-legales"
              className="hover:text-[#d3cbc2] transition-colors"
            >
              Mentions légales
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
