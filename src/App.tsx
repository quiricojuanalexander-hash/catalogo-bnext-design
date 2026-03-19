/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Search, ChevronRight, X, Download, ExternalLink, Home,
  Utensils, Pizza, IceCream, Coffee, Wine, Scissors, Pill, 
  Dumbbell, Sparkles, Flower2, Shirt, ShoppingBag, Footprints, 
  Smartphone, Monitor, Wrench, ShoppingCart, Store, ShoppingBasket, 
  Croissant, Cake, PawPrint, Church 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type SubCategory = {
  id: string;
  name: string;
  flag: string;
  pdfUrl: string;
};

type Category = {
  id: string;
  name: string;
  icon: React.ElementType;
  subcategories?: SubCategory[];
  pdfUrl?: string;
};

// --- DATA ---
// PDFs servidos directamente desde R2 (sin descarga local)
const R2_BASE = 'https://pub-273a525c44c946388add7b34ab7cac51.r2.dev';
const r2Url = (path: string) => `${R2_BASE}/${encodeURI(path)}`;
const r2RestauranteFile = (filename: string) => r2Url(`restaurante/${filename}`);
const r2LocalesFile = (filename: string) => r2Url(`locales/${filename}`);
const CATEGORIES: Category[] = [
  { 
    id: 'restaurante', 
    name: 'Restaurante', 
    icon: Utensils, 
    subcategories: [
      { id: 'chi', name: 'Chino', flag: '🇨🇳', pdfUrl: r2RestauranteFile('catalogo restaurantes Chino.pdf') },
      { id: 'hin', name: 'Hindú', flag: '🇮🇳', pdfUrl: r2RestauranteFile('catalogo restaurantes HINDU.pdf') },
      { id: 'ven', name: 'Venezolano', flag: '🇻🇪', pdfUrl: r2RestauranteFile('catalogo restaurantes Venezolanos.pdf') },
      { id: 'ame', name: 'Americano', flag: '🇺🇸', pdfUrl: r2RestauranteFile('catalogo restaurantes americano.pdf') },
      { id: 'ara', name: 'Árabe', flag: '🐪', pdfUrl: r2RestauranteFile('catalogo restaurantes arabe.pdf') },
      { id: 'col', name: 'Colombiano', flag: '🇨🇴', pdfUrl: r2RestauranteFile('catalogo restaurantes colombianos.pdf') },
      { id: 'mex', name: 'Mexicano', flag: '🇲🇽', pdfUrl: r2RestauranteFile('catalogo restaurantes mexicanos.pdf') },
    ]
  },
  { id: 'pizzeria', name: 'Pizzería', icon: Pizza, pdfUrl: r2LocalesFile('catalogo pizzeria.pdf') },
  { id: 'heladeria', name: 'Heladería', icon: IceCream, pdfUrl: r2LocalesFile('catalogo heladeria.pdf') },
  { id: 'cafeteria', name: 'Cafetería', icon: Coffee, pdfUrl: r2LocalesFile('catalogo cafetería.pdf') },
  { id: 'bar', name: 'Bar', icon: Wine, pdfUrl: r2LocalesFile('catalogo Bar.pdf') },
  { id: 'barberia', name: 'Barbería', icon: Scissors, pdfUrl: r2LocalesFile('catalogo barberia.pdf') },
  { id: 'farmacia', name: 'Farmacia', icon: Pill, pdfUrl: r2LocalesFile('catalogo farmacia.pdf') },
  { id: 'clinica-medica', name: 'Clínica médica', icon: Pill, pdfUrl: r2LocalesFile('catalogo Clinica médica.pdf') },
  { id: 'clinica-dental', name: 'Clínica dental', icon: Pill, pdfUrl: r2LocalesFile('catalogo clinica dental.pdf') },
  { id: 'gimnasio', name: 'Gimnasio', icon: Dumbbell, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'salon-belleza', name: 'Salón de belleza', icon: Sparkles, pdfUrl: r2LocalesFile('catalogo Salon.pdf') },
  { id: 'spa', name: 'Spa', icon: Flower2, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'tienda-ropa', name: 'Tienda de ropa', icon: Shirt, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'boutique', name: 'Boutique', icon: ShoppingBag, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'zapateria', name: 'Zapatería', icon: Footprints, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'tienda-celulares', name: 'Tienda de celulares', icon: Smartphone, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'tienda-electronica', name: 'Tienda de electronica', icon: Monitor, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'ferreteria', name: 'Ferretería', icon: Wrench, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'supermercado', name: 'Supermercado', icon: ShoppingCart, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'colmado', name: 'Colmado', icon: Store, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'minimarket', name: 'Minimarket', icon: ShoppingBasket, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'panaderia', name: 'Panadería', icon: Croissant, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'reposteria', name: 'Repostería', icon: Cake, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'veterinaria', name: 'Veterinaria', icon: PawPrint, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'iglesia', name: 'Iglesia', icon: Church, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<{ url: string, title: string } | null>(null);

  const selectedCategory = useMemo(() => 
    CATEGORIES.find(c => c.id === selectedCategoryId), 
  [selectedCategoryId]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return CATEGORIES;
    const lowerQuery = searchQuery.toLowerCase();
    return CATEGORIES.filter(c => 
      c.name.toLowerCase().includes(lowerQuery) || 
      (c.subcategories && c.subcategories.some(sub => sub.name.toLowerCase().includes(lowerQuery)))
    );
  }, [searchQuery]);

  const filteredSubcategories = useMemo(() => {
    if (!selectedCategory || !selectedCategory.subcategories) return [];
    if (!searchQuery) return selectedCategory.subcategories;
    const lowerQuery = searchQuery.toLowerCase();
    return selectedCategory.subcategories.filter(sub => sub.name.toLowerCase().includes(lowerQuery));
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-accent selection:text-white flex flex-col">
      
      {/* HEADER & BREADCRUMBS */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border-subtle px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-[0_0_15px_rgba(255,77,0,0.4)]">
              <span className="font-display font-bold text-white text-lg leading-none">C</span>
            </div>
            <span className="font-display font-bold text-xl tracking-wide">CloudCats</span>
          </div>

          <nav className="hidden sm:flex items-center gap-2 text-sm font-mono text-muted">
            <button 
              onClick={() => { setSelectedCategoryId(null); setSearchQuery(''); }}
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              <Home size={14} /> Inicio
            </button>
            {selectedCategory && (
              <>
                <ChevronRight size={14} />
                <span className="text-text-main">{selectedCategory.name}</span>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12">
        
        {/* HERO & SEARCH */}
        <motion.section 
          layout
          className="flex flex-col items-center text-center gap-6"
        >
          <motion.h1 layout className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Encuentra tu <span className="text-accent">Catálogo</span>
          </motion.h1>
          <motion.p layout className="text-muted text-lg max-w-2xl">
            Explora nuestra colección de catálogos en PDF por categoría y país. Rápido, visual y directo al grano.
          </motion.p>

          <motion.div layout className="w-full max-w-2xl relative mt-4 group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-muted group-focus-within:text-accent transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Busca: Restaurante mexicano, barbería..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border-subtle rounded-full py-4 pl-14 pr-6 text-lg outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-lg placeholder:text-muted/70"
            />
          </motion.div>
        </motion.section>

        {/* CONTENT AREA */}
        <AnimatePresence mode="wait">
          {!selectedCategoryId ? (
            /* VISTA DE CATEGORÍAS */
            <motion.section 
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-3xl font-semibold">Categorías</h2>
                <span className="font-mono text-sm text-muted">{filteredCategories.length} resultados</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <motion.button
                      key={cat.id}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (cat.subcategories && cat.subcategories.length > 0) {
                          setSelectedCategoryId(cat.id);
                          setSearchQuery('');
                        } else if (cat.pdfUrl) {
                          setSelectedPdf({ url: cat.pdfUrl, title: cat.name });
                        }
                      }}
                      className="group bg-surface border border-border-subtle rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-accent hover:shadow-[0_10px_30px_rgba(255,77,0,0.1)] transition-all duration-300 relative overflow-hidden text-center"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-16 h-16 rounded-full bg-background border border-border-subtle flex items-center justify-center text-muted group-hover:text-accent group-hover:border-accent/50 transition-colors z-10">
                        <Icon size={28} />
                      </div>
                      <h3 className="font-sans font-semibold text-xl z-10">{cat.name}</h3>
                      <p className="font-mono text-xs text-muted z-10">
                        {cat.subcategories ? `${cat.subcategories.length} opciones` : 'Catálogo directo'}
                      </p>
                    </motion.button>
                  );
                })}
                {filteredCategories.length === 0 && (
                  <div className="col-span-full py-12 text-center text-muted border border-dashed border-border-subtle rounded-2xl">
                    No se encontraron categorías para "{searchQuery}"
                  </div>
                )}
              </div>
            </motion.section>
          ) : (
            /* VISTA DE OPCIONES (DENTRO DE CATEGORÍA) */
            <motion.section 
              key="subcategories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <button 
                    onClick={() => setSelectedCategoryId(null)}
                    className="text-accent hover:text-accent/80 font-mono text-sm flex items-center gap-1 mb-2 transition-colors"
                  >
                    ← Volver a categorías
                  </button>
                  <h2 className="font-display text-4xl font-semibold">{selectedCategory?.name}</h2>
                  <p className="text-muted mt-1">Selecciona una opción para ver el catálogo</p>
                </div>
                <span className="font-mono text-sm text-muted">{filteredSubcategories.length} opciones</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSubcategories.map((sub) => (
                  <motion.button
                    key={sub.id}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPdf({ url: sub.pdfUrl, title: `${selectedCategory?.name} - ${sub.name}` })}
                    className="group bg-surface border border-border-subtle rounded-xl p-5 flex items-center gap-4 hover:border-accent hover:bg-accent/5 transition-all duration-300 text-left"
                  >
                    <span className="text-3xl drop-shadow-md group-hover:scale-110 transition-transform">{sub.flag}</span>
                    <div className="flex-1">
                      <h3 className="font-sans font-semibold text-lg">{sub.name}</h3>
                      <p className="font-mono text-xs text-muted group-hover:text-accent/80 transition-colors flex items-center gap-1 mt-1">
                        Ver catálogo <ChevronRight size={12} />
                      </p>
                    </div>
                  </motion.button>
                ))}
                {filteredSubcategories.length === 0 && (
                  <div className="col-span-full py-12 text-center text-muted border border-dashed border-border-subtle rounded-2xl">
                    No se encontraron opciones para "{searchQuery}"
                  </div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border-subtle py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center font-mono text-xs text-muted">
          <p>© {new Date().getFullYear()} CloudCats. Plataforma de Catálogos UI Spec.</p>
        </div>
      </footer>

      {/* PDF MODAL */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-background/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-surface border border-border-subtle rounded-2xl shadow-2xl w-full h-full max-w-6xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-background/50">
                <h3 className="font-display font-semibold text-xl">{selectedPdf.title}</h3>
                <div className="flex items-center gap-2">
                  <a 
                    href={selectedPdf.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-border-subtle text-muted hover:text-text-main transition-colors flex items-center gap-2 text-sm font-mono"
                    title="Abrir en nueva pestaña"
                  >
                    <ExternalLink size={18} />
                    <span className="hidden sm:inline">Abrir</span>
                  </a>
                  <a 
                    href={selectedPdf.url} 
                    download
                    className="p-2 rounded-lg hover:bg-border-subtle text-muted hover:text-accent transition-colors flex items-center gap-2 text-sm font-mono"
                    title="Descargar PDF"
                  >
                    <Download size={18} />
                    <span className="hidden sm:inline">Descargar</span>
                  </a>
                  <div className="w-px h-6 bg-border-subtle mx-2" />
                  <button 
                    onClick={() => setSelectedPdf(null)}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-muted hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* Modal Body (PDF Viewer) */}
              <div className="flex-1 bg-[#333] relative">
                <iframe 
                  src={`${selectedPdf.url}#toolbar=0&navpanes=0`} 
                  className="w-full h-full border-none"
                  title={selectedPdf.title}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
