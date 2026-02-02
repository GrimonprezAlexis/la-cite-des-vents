'use client';

import Link from "next/link";
import { Facebook, Phone, MapPin, Mail } from "lucide-react";
import { useContactSettings } from "@/hooks/use-contact-settings";

export function Footer() {
  const { settings } = useContactSettings();

  // Format phone for tel: link (remove spaces)
  const phoneLink = settings.phone.replace(/\s/g, '');

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
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={`tel:${phoneLink}`}
                    className="hover:text-[#d3cbc2] transition-colors font-medium"
                  >
                    {settings.phone}
                  </a>
                  <span className="text-gray-500">•</span>
                  <a
                    href="tel:0227971070"
                    className="hover:text-[#d3cbc2] transition-colors font-medium"
                  >
                    022 797 10 70
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>
                  Chemin de l&apos;Echo 3<br />
                  1213 Onex
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
