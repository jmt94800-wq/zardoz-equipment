import { useState, useEffect } from 'react';
import { 
  Zap, 
  Thermometer, 
  UtensilsCrossed, 
  Package, 
  ShoppingCart, 
  Menu, 
  X,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import './App.css';

// Equipment data structure
interface EquipmentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  amazonLink: string;
}

const equipmentData: EquipmentItem[] = [
  // Energy Section
  {
    id: 'energy-1',
    title: 'Panneau Solaire Portable',
    description: 'Kit solaire pliable de 100W pour camping et activités outdoor. Charge rapide, résistant aux intempéries, idéal pour une alimentation nomade.',
    image: '/solar-panel.jpg',
    category: 'energy',
    amazonLink: 'https://www.amazon.fr/s?k=panneau+solaire+portable&tag=zequipement-21'
  },
  {
    id: 'energy-2',
    title: 'Générateur Portable',
    description: 'Générateur électrique silencieux 1000W avec prises multiples, écran LCD et batterie longue durée. Parfait pour les situations d\'urgence.',
    image: '/generator.jpg',
    category: 'energy',
    amazonLink: 'https://www.amazon.fr/s?k=générateur+portablehttps://www.amazon.fr/s?k=panneau+solaire+portable&tag=zequipement-21'
  },
  {
    id: 'energy-3',
    title: 'Batterie Externe 30000mAh',
    description: 'Power bank haute capacité avec charge rapide USB-C et multiple ports. Autonomie exceptionnelle pour tous vos appareils mobiles.',
    image: '/powerbank.jpg',
    category: 'energy',
    amazonLink: 'https://www.amazon.fr/s?k=batterie+externe+30000mah&tag=zequipement-21'
  },
  {
    id: 'energy-4',
    title: 'Éolienne Résidentielle',
    description: 'Mini éolienne 400W pour installation domestique. Design moderne, faible bruit, production d\'énergie propre et renouvelable.',
    image: '/wind-turbine.jpg',
    category: 'energy',
    amazonLink: 'https://www.amazon.fr/s?k=éolienne+résidentielle&tag=zequipement-21'
  },
  // Thermal Regulation Section
  {
    id: 'thermal-1',
    title: 'Chauffage Électrique Céramique',
    description: 'Radiateur céramique avec thermostat programmable, 3 niveaux de puissance et sécurité anti-surchauffe. Chauffage rapide et économique.',
    image: '/heater.jpg',
    category: 'thermal',
    amazonLink: 'https://www.amazon.fr/s?k=chauffage+céramique&tag=zequipement-21'
  },
  {
    id: 'thermal-2',
    title: 'Climatiseur Mobile',
    description: 'Unité de climatisation portable 9000 BTU avec télécommande, minuterie et déshumidificateur intégré. Installation facile sans perçage.',
    image: '/ac-unit.jpg',
    category: 'thermal',
    amazonLink: 'https://www.amazon.fr/s?k=climatiseur+mobile&tag=zequipement-21'
  },
  {
    id: 'thermal-3',
    title: 'Thermostat Intelligent',
    description: 'Thermostat connecté WiFi avec écran tactile, programmation hebdomadaire et contrôle via smartphone. Compatible assistants vocaux.',
    image: '/thermostat.jpg',
    category: 'thermal',
    amazonLink: 'https://www.amazon.fr/s?k=thermostat+intelligen&tag=zequipement-21t'
  },
  {
    id: 'thermal-4',
    title: 'Panneaux Isolants',
    description: 'Kit de 10 panneaux isolants en mousse polyuréthane 60x60cm. Isolation thermique et acoustique pour murs, plafonds et sols.',
    image: '/insulation.jpg',
    category: 'thermal',
    amazonLink: 'https://www.amazon.fr/s?k=panneaux+isolants&tag=zequipement-21'
  },
  // Food Section
  {
    id: 'food-1',
    title: 'Réfrigérateur Commercial',
    description: 'Armoire réfrigérée professionnelle double porte vitrée, 1200L. Température réglable, éclairage LED, idéal pour commerces et restaurants.',
    image: '/refrigerator.jpg',
    category: 'food',
    amazonLink: 'https://www.amazon.fr/s?k=réfrigérateur+commercial&tag=zequipement-21'
  },
  {
    id: 'food-2',
    title: 'Congélateur Coffre',
    description: 'Congélateur horizontal 500L avec couvercle vitré coulissant, thermostat réglable et fonction dégivrage rapide. Économie d\'énergie A++.',
    image: '/freezer.jpg',
    category: 'food',
    amazonLink: 'https://www.amazon.fr/s?k=congélateur+coffre&tag=zequipement-21'
  },
  {
    id: 'food-3',
    title: 'Plaque à Induction',
    description: 'Table de cuisson induction 4 feux, 7000W puissance totale. 17 niveaux de puissance, minuterie, détection automatique des récipients.',
    image: '/cooktop.jpg',
    category: 'food',
    amazonLink: 'https://www.amazon.fr/s?k=plaque+induction&tag=zequipement-21'
  },
  {
    id: 'food-4',
    title: 'Robot Multifonction Pro',
    description: 'Robot de cuisine professionnel 1500W avec bol inox 5L, 8 accessoires inclus. Pétrin, mixeur, râpe et éminceur haute performance.',
    image: '/food-processor.jpg',
    category: 'food',
    amazonLink: 'https://www.amazon.fr/s?k=robot+multifonction+pro&tag=zequipement-21'
  },
  // Other Section
  {
    id: 'other-1',
    title: 'Perceuse-Visseuse Sans Fil',
    description: 'Perceuse 20V avec 2 batteries lithium, chargeur rapide et coffret 50 accessoires. Mandrin auto-serrant, 2 vitesses, couple réglable.',
    image: '/drill.jpg',
    category: 'other',
    amazonLink: 'https://www.amazon.fr/s?k=perceuse+visseuse+sans+fil&tag=zequipement-21'
  },
  {
    id: 'other-2',
    title: 'Kit de Sécurité Professionnel',
    description: 'Ensemble complet EPI : casque jaune, gants de protection, lunettes de sécurité et gilet haute visibilité. Conforme normes CE.',
    image: '/safety-kit.jpg',
    category: 'other',
    amazonLink: 'https://www.amazon.fr/s?k=kit+sécurité+professionnel&tag=zequipement-21'
  },
  {
    id: 'other-3',
    title: 'Rayonnage Métallique',
    description: 'Étagère industrielle 5 niveaux 200x60x200cm, charge 300kg par niveau. Acier galvanisé, montage sans outils, réglable en hauteur.',
    image: '/shelving.jpg',
    category: 'other',
    amazonLink: 'https://www.amazon.fr/s?k=rayonnage+métallique&tag=zequipement-21'
  },
  {
    id: 'other-4',
    title: 'Aspirateur Eau et Poussière',
    description: 'Aspirateur industriel 30L 1500W, fonction soufflerie inclus. Filtre HEPA, accessoires multiples, idéal chantier et atelier.',
    image: '/vacuum.jpg',
    category: 'other',
    amazonLink: 'https://www.amazon.fr/s?k=aspirateur+eau+poussière&tag=zequipement-21'
  }
];

const categories = [
  { id: 'energy', name: 'Énergie', icon: Zap, color: 'bg-amber-500' },
  { id: 'thermal', name: 'Éclairage', icon: Thermometer, color: 'bg-blue-500' },
  { id: 'food', name: 'Alimentation', icon: UtensilsCrossed, color: 'bg-emerald-500' },
  { id: 'other', name: 'Autre', icon: Package, color: 'bg-slate-500' },
];

function EquipmentCard({ item }: { item: EquipmentItem }) {
  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{item.description}</p>
        <a
          href={item.amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 w-full"
        >
          <Button className="w-full bg-[#FF9900] hover:bg-[#E88A00] text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Voir sur Amazon.fr
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}

function SectionHeader({ category }: { category: typeof categories[0] }) {
  const Icon = category.icon;
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className={`${category.color} p-4 rounded-2xl shadow-lg`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{category.name}</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-gray-900 to-gray-400 rounded-full mt-2" />
      </div>
    </div>
  );
}

function Navigation({ activeSection, onSectionClick }: { activeSection: string; onSectionClick: (id: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    onSectionClick(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3"
          >
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-xl">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Zardoz Equipment
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === cat.id
                      ? 'bg-gray-900 text-white'
                      : isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white/90 hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-xl">
          <div className="px-4 py-4 space-y-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activeSection === cat.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{cat.name}</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <Badge className="mb-6 px-4 py-2 bg-white/10 text-white border-white/20 backdrop-blur-sm">
          Équipement Professionnel & Industriel
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Zardoz{' '}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            Equipment
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          Découvrez notre sélection d'équipements professionnels de qualité. 
          De l'énergie à la régulation thermique, en passant par l'alimentation et bien plus.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => document.getElementById('energy')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl transition-all"
          >
            Explorer les produits
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-gray-400 text-sm">
            Livraison rapide via Amazon.fr
          </p>
        </div>
      </div>
    </section>
  );
}

function EquipmentSection({ category }: { category: typeof categories[0] }) {
  const items = equipmentData.filter(item => item.category === category.id);
  
  return (
    <section id={category.id} className="py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader category={category} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-xl">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Zardoz Equipment</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Votre partenaire pour l'équipement professionnel de qualité. 
              Nous sélectionnons les meilleurs produits pour répondre à vos besoins.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Catégories</h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a 
                    href={`#${cat.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Information</h3>
            <p className="text-gray-400 mb-4">
              Tous nos produits sont disponibles sur Amazon.fr avec livraison rapide et garantie.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <ShoppingCart className="w-5 h-5 text-[#FF9900]" />
              <span>Partenaire Amazon.fr</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Zardoz Equipment. Tous droits réservés.</p>
          <p className="mt-2 text-sm">
            Ce site contient des liens affiliés vers Amazon.fr
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    categories.forEach((cat) => {
      const element = document.getElementById(cat.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeSection={activeSection} onSectionClick={setActiveSection} />
      <Hero />
      <main className="relative">
        {/* Section dividers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full" style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.02) 50%, transparent 100%)'
          }} />
        </div>
        
        {categories.map((category, index) => (
          <div key={category.id}>
            <EquipmentSection category={category} />
            {index < categories.length - 1 && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              </div>
            )}
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;
