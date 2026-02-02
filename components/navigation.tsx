"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useContactSettings } from "@/hooks/use-contact-settings";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { settings } = useContactSettings();

  // Format phone for tel: link (remove spaces)
  const phoneLink = settings.phone.replace(/\s/g, '');

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/menu", label: "Menu" },
    { href: "/horaires", label: "Horaires" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/60 backdrop-blur-xl shadow-2xl"
          : "bg-white/95 backdrop-blur-sm shadow-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "h-20" : "h-28"
          }`}
        >
          <Link
            href="/"
            className="flex items-center transition-all duration-500 hover:scale-105"
          >
            <Image
              src="/logo_citedesvents_transparant.png"
              alt="La Cité des Vents"
              width={90}
              height={60}
              className="object-contain transition-all duration-500"
              style={{ width: "5.5rem", height: "auto" }}
              priority
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-semibold transition-all duration-300 relative group ${
                  isActive(link.href)
                    ? "text-[#d3cbc2]"
                    : isScrolled
                    ? "text-gray-900"
                    : "text-gray-700 hover:text-[#d3cbc2]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#d3cbc2] to-[#b8af9f] transform transition-all duration-300 origin-left ${
                    isActive(link.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#d3cbc2]/10 to-[#b8af9f]/10 hover:from-[#d3cbc2]/20 hover:to-[#b8af9f]/20 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#d3cbc2] to-[#b8af9f] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${phoneLink}`}
                  className={`font-semibold text-base transition-colors duration-300 hover:text-[#d3cbc2] ${
                    isScrolled ? "text-gray-900" : "text-gray-900"
                  }`}
                >
                  {settings.phone}
                </a>
                <span className="text-gray-400 font-bold">•</span>
                <a
                  href="tel:0227971070"
                  className={`font-semibold text-base transition-colors duration-300 hover:text-[#d3cbc2] ${
                    isScrolled ? "text-gray-900" : "text-gray-900"
                  }`}
                >
                  022 797 10 70
                </a>
              </div>
            </div>
          </div>

          <button
            className={`md:hidden transition-colors duration-300 ${
              isScrolled ? "text-gray-900" : "text-gray-700"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium py-2 px-4 rounded-lg transition-all duration-300 ${
                    isActive(link.href)
                      ? "bg-gradient-to-r from-[#d3cbc2] to-[#b8af9f] text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-gray-600 py-2 px-4">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={`tel:${phoneLink}`}
                      className="hover:text-[#d3cbc2] transition-colors duration-300 font-medium"
                    >
                      {settings.phone}
                    </a>
                    <span className="text-gray-400">•</span>
                    <a
                      href="tel:0227971070"
                      className="hover:text-[#d3cbc2] transition-colors duration-300 font-medium"
                    >
                      022 797 10 70
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-2 text-gray-600 py-2 px-4">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">
                    Chemin de l&apos;Echo 3, 1213 Onex
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
