'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Phone, Music, Utensils, Pizza, Wine, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const restaurantImages = [
  {
    url: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    alt: 'Pizza italienne margherita',
  },
  {
    url: 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    alt: 'Restaurant élégant',
  },
  {
    url: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    alt: 'Cuisine française raffinée',
  },
  {
    url: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    alt: 'Ambiance lounge bar',
  },
  {
    url: 'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    alt: 'Terrasse restaurant',
  },
];

export default function Home() {
  const section1 = useScrollAnimation();
  const section2 = useScrollAnimation();
  const section3 = useScrollAnimation();
  const section4 = useScrollAnimation();
  const section5 = useScrollAnimation();

  return (
    <div className="flex flex-col overflow-hidden">
      <section className="relative w-full">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {restaurantImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[600px] md:h-[750px] lg:h-[850px] w-full overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover object-center scale-110 hover:scale-105 transition-transform duration-[10000ms] ease-out"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center text-white">
                      <div className="max-w-5xl mx-auto">
                        <div className="mb-8 md:mb-12 animate-scale-in flex justify-center">
                          <Image
                            src="/logo.png"
                            alt="La Cité Fleurie"
                            width={700}
                            height={467}
                            className="w-[280px] sm:w-[380px] md:w-[500px] lg:w-[650px] h-auto object-contain drop-shadow-[0_35px_60px_rgba(211,203,194,0.9)] hover:scale-105 transition-transform duration-500"
                            priority
                          />
                        </div>
                        <p className="text-2xl sm:text-3xl md:text-4xl mb-8 md:mb-12 animate-slide-up font-light tracking-wide" style={{animationDelay: '0.2s'}}>
                          Restaurant · Pizzeria · Lounge Bar
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{animationDelay: '0.3s'}}>
                          <Link href="/menu">
                            <Button
                              size="lg"
                              className="w-full sm:w-auto bg-gradient-to-r from-[#d3cbc2] to-[#b8af9f] hover:from-[#b8af9f] hover:to-[#d3cbc2] text-gray-900 font-bold text-lg px-10 py-7 shadow-2xl hover:shadow-[#d3cbc2]/70 transition-all duration-500 hover:scale-110 border-2 border-white/20"
                            >
                              <Sparkles className="w-5 h-5 mr-2" />
                              Découvrir le Menu
                            </Button>
                          </Link>
                          <Link href="/contact">
                            <Button
                              size="lg"
                              variant="outline"
                              className="w-full sm:w-auto border-2 border-white bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-gray-900 font-bold text-lg px-10 py-7 shadow-2xl transition-all duration-500 hover:scale-110"
                            >
                              Réserver une Table
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:left-4 bg-white/90 hover:bg-white shadow-2xl hover:scale-125 hover:shadow-[#d3cbc2]/50 transition-all duration-500" />
          <CarouselNext className="right-2 md:right-4 bg-white/90 hover:bg-white shadow-2xl hover:scale-125 hover:shadow-[#d3cbc2]/50 transition-all duration-500" />
        </Carousel>
      </section>

      <section ref={section1.ref} className={`py-20 bg-gradient-to-b from-white to-gray-50 scroll-animate ${section1.isVisible ? 'visible' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Bienvenue à La Cité Fleurie
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#d3cbc2] to-transparent mx-auto mb-8 rounded-full shadow-lg"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Depuis 17 ans, nous vous accueillons dans notre restaurant à Onex pour vous faire découvrir
              les saveurs authentiques de la cuisine italienne et française. Nos pizzas au feu de bois
              et notre ambiance lounge bar créent une expérience culinaire unique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Pizza, title: 'Pizza au Feu de Bois', desc: 'Découvrez nos pizzas cuites au feu de bois selon la tradition italienne authentique.', delay: '0s' },
              { icon: Utensils, title: 'Cuisine Italienne & Française', desc: 'Une carte variée mêlant traditions culinaires italiennes et françaises.', delay: '0.1s' },
              { icon: Wine, title: 'Lounge Bar', desc: 'Profitez de notre bar dans une ambiance chaleureuse et conviviale.', delay: '0.2s' }
            ].map((item, idx) => (
              <Card key={idx} className="border-none shadow-2xl hover-lift overflow-hidden group relative bg-white" style={{transitionDelay: item.delay}}>
                <CardContent className="p-10 text-center relative z-10">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#d3cbc2] to-[#b8af9f] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl animate-float">
                    <item.icon className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-[#d3cbc2] transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">{item.desc}</p>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d3cbc2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section ref={section2.ref} className={`py-20 bg-white scroll-animate ${section2.isVisible ? 'visible' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-[#d3cbc2]/10 px-4 py-2 rounded-full mb-6">
                <span className="text-[#b8af9f] font-semibold">Événements Spéciaux</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Soirées Musicales
              </h2>
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#d3cbc2] to-[#b8af9f] rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">Tous les Vendredis et Samedis</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Venez profiter de nos soirées musicales pour une ambiance festive et conviviale.
                    Une expérience unique qui allie gastronomie et divertissement.
                  </p>
                </div>
              </div>

              <div className="space-y-6 bg-gray-50 p-8 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-4 group cursor-pointer hover:translate-x-2 transition-transform">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-xl transition-shadow">
                    <Clock className="w-6 h-6 text-[#d3cbc2]" />
                  </div>
                  <span className="text-gray-700 text-lg font-medium">Ouvert 7j/7 de 07:30 à 00:00</span>
                </div>
                <div className="flex items-center space-x-4 group cursor-pointer hover:translate-x-2 transition-transform">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-xl transition-shadow">
                    <Phone className="w-6 h-6 text-[#d3cbc2]" />
                  </div>
                  <a href="tel:+41227930350" className="text-gray-700 hover:text-[#d3cbc2] text-lg font-medium transition-colors">
                    +41 22 793 03 50
                  </a>
                </div>
                <div className="flex items-start space-x-4 group cursor-pointer hover:translate-x-2 transition-transform">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0 group-hover:shadow-xl transition-shadow">
                    <MapPin className="w-6 h-6 text-[#d3cbc2]" />
                  </div>
                  <span className="text-gray-700 text-lg font-medium">Chemin de l&apos;Echo 3, 1213 Onex, Suisse</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <img
                  src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Intérieur restaurant"
                  className="rounded-2xl shadow-2xl w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
                />
                <img
                  src="https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Plat gastronomique"
                  className="rounded-2xl shadow-2xl w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-6 pt-12">
                <img
                  src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Pizza"
                  className="rounded-2xl shadow-2xl w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                />
                <img
                  src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Plat italien"
                  className="rounded-2xl shadow-2xl w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={section3.ref} className={`py-20 bg-gradient-to-br from-[#d3cbc2] via-[#d3cbc2] to-[#b8af9f] relative overflow-hidden scroll-animate ${section3.isVisible ? 'visible' : ''}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Services & Facilités
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { emoji: '♿', label: 'Accessible PMR', delay: '0s' },
                { emoji: '🥡', label: 'Plats à Emporter', delay: '0.5s' },
                { emoji: '📅', label: 'Réservations', delay: '1s' },
                { emoji: '🍷', label: 'Service de Table', delay: '1.5s' }
              ].map((item, idx) => (
                <div key={idx} className="text-white group hover:scale-110 transition-transform duration-300">
                  <div className="text-6xl mb-4 animate-float" style={{animationDelay: item.delay}}>{item.emoji}</div>
                  <p className="font-semibold text-lg">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={section4.ref} className={`py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden scroll-animate ${section4.isVisible ? 'visible' : ''}`}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d3cbc2] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d3cbc2] rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Réservez Votre Table
            </h2>
            <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Pour profiter de notre cuisine et de notre ambiance unique, réservez dès maintenant votre table.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="tel:+41227930350">
                <Button size="lg" className="w-full sm:w-auto bg-[#d3cbc2] hover:bg-[#b8af9f] text-gray-900 font-semibold text-lg px-8 py-6 shadow-2xl hover:shadow-[#d3cbc2]/50 transition-all duration-300 hover:scale-105">
                  <Phone className="w-6 h-6 mr-3" />
                  Appeler pour Réserver
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-[#d3cbc2] bg-transparent text-[#d3cbc2] hover:bg-[#d3cbc2] hover:text-gray-900 font-semibold text-lg px-8 py-6 shadow-2xl transition-all duration-300 hover:scale-105">
                  Formulaire de Contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
