
// --- Lokale Icons (ersetzt lucide-react, keine externe Icon-Bibliothek noetig) ---
const { useState, useEffect, useMemo, useRef } = React;
function IconBase({ size = 16, children, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      {children}
    </svg>
  );
}
const Leaf = (p) => <IconBase {...p}><path d="M12 2C7 6 5 11 5 15a7 7 0 0 0 14 0c0-5-3-9-7-13z"/><path d="M12 8v13"/></IconBase>;
const ChevronLeft = (p) => <IconBase {...p}><polyline points="15 18 9 12 15 6"/></IconBase>;
const ChevronRight = (p) => <IconBase {...p}><polyline points="9 18 15 12 9 6"/></IconBase>;
const Plus = (p) => <IconBase {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></IconBase>;
const Trash2 = (p) => <IconBase {...p}><polyline points="3 6 5 6 21 6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></IconBase>;
const BookOpen = (p) => <IconBase {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></IconBase>;
const CalendarDays = (p) => <IconBase {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></IconBase>;
const ShoppingCart = (p) => <IconBase {...p}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></IconBase>;
const Sprout = (p) => <IconBase {...p}><path d="M7 20h10"/><path d="M12 20v-8"/><path d="M12 12S8 12 8 6c4 0 4 4 4 4s0-4 4-4c0 6-4 6-4 6z"/></IconBase>;
const X = (p) => <IconBase {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></IconBase>;
const Pencil = (p) => <IconBase {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></IconBase>;
const Search = (p) => <IconBase {...p}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></IconBase>;
const Camera = (p) => <IconBase {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></IconBase>;
const ClipboardList = (p) => <IconBase {...p}><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="15" y2="15"/></IconBase>;

const DAYS = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const DAYS_SHORT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const MEALS = ['Frühstück', 'Mittag', 'Abend'];
const PLANT_GOAL = 30;
const UNITS = ['g', 'kg', 'ml', 'l', 'Stück', 'EL', 'TL', 'Prise', 'Bund'];
const RECIPE_CATEGORIES = ['Frühstück', 'Hauptgericht', 'Suppe', 'Salat', 'Snack', 'Dessert', 'Beilage', 'Sauce/Dip'];

const CATEGORY_META = {
  gemuese: { label: 'Gemüse', color: '#4C7A3F' },
  obst: { label: 'Obst', color: '#D98A3C' },
  huelsen: { label: 'Hülsenfrüchte', color: '#7C8C3F' },
  getreide: { label: 'Vollkorn & Getreide', color: '#B8892F' },
  nuesse: { label: 'Nüsse & Samen', color: '#8B5E3C' },
  pilze: { label: 'Pilze', color: '#8A7B6C' },
  extras: { label: 'Gewürze, Tee & Öl', color: '#8B5A8C' },
  sonstige: { label: 'Sonstige Pflanzen', color: '#9AA08D' },
  milch: { label: 'Milchprodukte', color: '#C9A66B' },
  fleisch: { label: 'Fleisch & Wurst', color: '#9C4A3A' },
  fisch: { label: 'Fisch & Meeresfrüchte', color: '#4A7A93' },
  eier: { label: 'Eier', color: '#D9B54A' },
};
const CATEGORY_ORDER = ['gemuese', 'obst', 'huelsen', 'getreide', 'nuesse', 'pilze', 'extras', 'sonstige'];

// [Name, Kategorie, istPflanze, ¼-Punkt, kcal, Eiweiß, Fett, KH, Ballaststoffe] – Werte je 100 g/ml, Richtwerte
const RAW_FOODS = [
  ['Tomate', 'gemuese', 1, 0, 18, 0.9, 0.2, 3.9, 1.2], ['Gurke', 'gemuese', 1, 0, 12, 0.6, 0.1, 2.5, 0.5],
  ['Paprika', 'gemuese', 1, 0, 31, 1, 0.3, 6, 1.7], ['Zucchini', 'gemuese', 1, 0, 17, 1.2, 0.3, 3.1, 1.1],
  ['Aubergine', 'gemuese', 1, 0, 25, 1, 0.2, 6, 3], ['Brokkoli', 'gemuese', 1, 0, 34, 2.8, 0.4, 7, 2.6],
  ['Blumenkohl', 'gemuese', 1, 0, 25, 1.9, 0.3, 5, 2], ['Rosenkohl', 'gemuese', 1, 0, 43, 3.4, 0.3, 9, 3.8],
  ['Grünkohl', 'gemuese', 1, 0, 49, 4.3, 0.9, 9, 3.6], ['Spinat', 'gemuese', 1, 0, 23, 2.9, 0.4, 3.6, 2.2],
  ['Mangold', 'gemuese', 1, 0, 19, 1.8, 0.2, 3.7, 1.6], ['Rucola', 'gemuese', 1, 0, 25, 2.6, 0.7, 3.7, 1.6],
  ['Feldsalat', 'gemuese', 1, 0, 21, 2, 0.4, 3.6, 1.5], ['Kopfsalat', 'gemuese', 1, 0, 15, 1.4, 0.2, 2.9, 1.3],
  ['Karotte', 'gemuese', 1, 0, 41, 0.9, 0.2, 10, 2.8], ['Rote Bete', 'gemuese', 1, 0, 43, 1.6, 0.2, 10, 2.8],
  ['Sellerie', 'gemuese', 1, 0, 42, 1.5, 0.3, 9, 1.6], ['Pastinake', 'gemuese', 1, 0, 75, 1.2, 0.3, 18, 4.9],
  ['Kürbis', 'gemuese', 1, 0, 26, 1, 0.1, 7, 0.5], ['Fenchel', 'gemuese', 1, 0, 31, 1.2, 0.2, 7, 3.1],
  ['Lauch', 'gemuese', 1, 0, 61, 1.5, 0.3, 14, 1.8], ['Zwiebel', 'gemuese', 1, 0, 40, 1.1, 0.1, 9, 1.7],
  ['Knoblauch', 'gemuese', 1, 0, 149, 6.4, 0.5, 33, 2.1], ['Radieschen', 'gemuese', 1, 0, 16, 0.7, 0.1, 3, 1.6],
  ['Kohlrabi', 'gemuese', 1, 0, 27, 1.7, 0.1, 6, 3.6], ['Weißkohl', 'gemuese', 1, 0, 25, 1.3, 0.1, 5.8, 2.5],
  ['Rotkohl', 'gemuese', 1, 0, 31, 1.4, 0.2, 7, 2.1], ['Wirsing', 'gemuese', 1, 0, 27, 2, 0.3, 6, 2.5],
  ['Süßkartoffel', 'gemuese', 1, 0, 86, 1.6, 0.1, 20, 3], ['Spargel', 'gemuese', 1, 0, 20, 2.2, 0.2, 3.9, 2.1],
  ['Artischocke', 'gemuese', 1, 0, 47, 3.3, 0.2, 10, 5.4], ['Okra', 'gemuese', 1, 0, 33, 1.9, 0.2, 7, 3.2],
  ['Mais', 'gemuese', 1, 0, 96, 3.4, 1.5, 19, 2.7], ['Apfel', 'obst', 1, 0, 52, 0.3, 0.2, 14, 2.4],
  ['Birne', 'obst', 1, 0, 57, 0.4, 0.1, 15, 3.1], ['Banane', 'obst', 1, 0, 89, 1.1, 0.3, 23, 2.6],
  ['Orange', 'obst', 1, 0, 47, 0.9, 0.1, 12, 2.4], ['Mandarine', 'obst', 1, 0, 53, 0.8, 0.3, 13, 1.8],
  ['Zitrone', 'obst', 1, 0, 29, 1.1, 0.3, 9, 2.8], ['Limette', 'obst', 1, 0, 30, 0.7, 0.2, 11, 2.8],
  ['Grapefruit', 'obst', 1, 0, 42, 0.8, 0.1, 11, 1.6], ['Erdbeere', 'obst', 1, 0, 32, 0.7, 0.3, 8, 2],
  ['Himbeere', 'obst', 1, 0, 52, 1.2, 0.7, 12, 6.5], ['Blaubeere', 'obst', 1, 0, 57, 0.7, 0.3, 14, 2.4],
  ['Brombeere', 'obst', 1, 0, 43, 1.4, 0.5, 10, 5.3], ['Johannisbeere', 'obst', 1, 0, 56, 1.4, 0.2, 13, 4.3],
  ['Traube', 'obst', 1, 0, 69, 0.7, 0.2, 18, 0.9], ['Kirsche', 'obst', 1, 0, 63, 1.1, 0.2, 16, 2.1],
  ['Pflaume', 'obst', 1, 0, 46, 0.7, 0.3, 11, 1.4], ['Aprikose', 'obst', 1, 0, 48, 1.4, 0.4, 11, 2],
  ['Pfirsich', 'obst', 1, 0, 39, 0.9, 0.3, 10, 1.5], ['Nektarine', 'obst', 1, 0, 44, 1.1, 0.3, 10, 1.7],
  ['Ananas', 'obst', 1, 0, 50, 0.5, 0.1, 13, 1.4], ['Mango', 'obst', 1, 0, 60, 0.8, 0.4, 15, 1.6],
  ['Papaya', 'obst', 1, 0, 43, 0.5, 0.3, 11, 1.7], ['Kiwi', 'obst', 1, 0, 61, 1.1, 0.5, 15, 3],
  ['Granatapfel', 'obst', 1, 0, 83, 1.7, 1.2, 19, 4], ['Feige', 'obst', 1, 0, 74, 0.8, 0.3, 19, 2.9],
  ['Wassermelone', 'obst', 1, 0, 30, 0.6, 0.2, 8, 0.4], ['Honigmelone', 'obst', 1, 0, 36, 0.8, 0.2, 9, 0.9],
  ['Avocado', 'obst', 1, 0, 160, 2, 15, 9, 6.7], ['Kokosnuss', 'obst', 1, 0, 354, 3.3, 33, 15, 9],
  ['Kichererbse (gekocht)', 'huelsen', 1, 0, 164, 8.9, 2.6, 27, 7.6], ['Rote Linsen (gekocht)', 'huelsen', 1, 0, 116, 9, 0.4, 20, 7.9],
  ['Braune Linsen (gekocht)', 'huelsen', 1, 0, 116, 9, 0.4, 20, 7.9], ['Weiße Bohnen (gekocht)', 'huelsen', 1, 0, 127, 8.7, 0.5, 23, 6.3],
  ['Kidneybohnen (gekocht)', 'huelsen', 1, 0, 127, 8.7, 0.5, 23, 6.4], ['Schwarze Bohnen (gekocht)', 'huelsen', 1, 0, 132, 8.9, 0.5, 24, 8.7],
  ['Sojabohnen (gekocht)', 'huelsen', 1, 0, 173, 16.6, 9, 10, 6], ['Edamame', 'huelsen', 1, 0, 121, 11, 5, 10, 5.2],
  ['Erbsen (gekocht)', 'huelsen', 1, 0, 84, 5.4, 0.2, 14, 5], ['Erdnuss', 'huelsen', 1, 0, 567, 25.8, 49, 16, 8.5],
  ['Tofu', 'huelsen', 1, 0, 76, 8, 4.8, 1.9, 1.2], ['Tempeh', 'huelsen', 1, 0, 190, 19, 11, 9, 6],
  ['Vollkornweizenmehl', 'getreide', 1, 0, 340, 13, 2.5, 72, 11], ['Hafer (roh)', 'getreide', 1, 0, 372, 13.5, 7, 59, 10],
  ['Gerste (gekocht)', 'getreide', 1, 0, 123, 2.3, 0.4, 28, 3.5], ['Roggenmehl', 'getreide', 1, 0, 325, 8.8, 1.7, 69, 12],
  ['Dinkel (gekocht)', 'getreide', 1, 0, 127, 4.6, 1, 26, 3.6], ['Quinoa (gekocht)', 'getreide', 1, 0, 120, 4.4, 1.9, 21, 2.8],
  ['Amaranth (gekocht)', 'getreide', 1, 0, 102, 3.8, 1.6, 19, 2.1], ['Buchweizen (gekocht)', 'getreide', 1, 0, 92, 3.4, 0.6, 20, 2.7],
  ['Brauner Reis (gekocht)', 'getreide', 1, 0, 111, 2.6, 0.9, 23, 1.8], ['Hirse (gekocht)', 'getreide', 1, 0, 119, 3.5, 1, 24, 3.5],
  ['Bulgur (gekocht)', 'getreide', 1, 0, 83, 3, 0.2, 19, 4.5], ['Polenta (gekocht)', 'getreide', 1, 0, 70, 1.6, 0.4, 15, 1.3],
  ['Mandel', 'nuesse', 1, 0, 579, 21, 50, 22, 12.5], ['Walnuss', 'nuesse', 1, 0, 654, 15, 65, 14, 6.7],
  ['Haselnuss', 'nuesse', 1, 0, 628, 15, 61, 17, 9.7], ['Cashewkern', 'nuesse', 1, 0, 553, 18, 44, 30, 3.3],
  ['Pistazie', 'nuesse', 1, 0, 560, 20, 45, 28, 10.6], ['Paranuss', 'nuesse', 1, 0, 656, 14, 66, 12, 7.5],
  ['Macadamia', 'nuesse', 1, 0, 718, 7.9, 76, 14, 8.6], ['Pekannuss', 'nuesse', 1, 0, 691, 9.2, 72, 14, 9.6],
  ['Leinsamen', 'nuesse', 1, 0, 534, 18, 42, 29, 27], ['Chiasamen', 'nuesse', 1, 0, 486, 17, 31, 42, 34],
  ['Sonnenblumenkerne', 'nuesse', 1, 0, 584, 21, 51, 20, 8.6], ['Kürbiskerne', 'nuesse', 1, 0, 559, 30, 49, 11, 6],
  ['Sesam', 'nuesse', 1, 0, 573, 18, 50, 23, 11.8], ['Champignon', 'pilze', 1, 0, 22, 3.1, 0.3, 3.3, 1],
  ['Steinpilz', 'pilze', 1, 0, 24, 3, 0.4, 4, 1.5], ['Pfifferling', 'pilze', 1, 0, 32, 1.5, 0.5, 7, 3.8],
  ['Shiitake', 'pilze', 1, 0, 34, 2.2, 0.5, 7, 2.5], ['Austernpilz', 'pilze', 1, 0, 33, 3.3, 0.4, 6, 2.3],
  ['Kräuterseitling', 'pilze', 1, 0, 35, 2.5, 0.4, 5, 2], ['Petersilie', 'extras', 1, 1, 36, 3, 0.8, 6, 3.3],
  ['Basilikum', 'extras', 1, 1, 23, 3.2, 0.6, 2.7, 1.6], ['Koriander', 'extras', 1, 1, 23, 2.1, 0.5, 3.7, 2.8],
  ['Minze', 'extras', 1, 1, 44, 3.3, 0.7, 8, 8], ['Dill', 'extras', 1, 1, 43, 3.5, 1.1, 7, 2.1],
  ['Schnittlauch', 'extras', 1, 1, 30, 3.3, 0.7, 4.4, 2.5], ['Thymian', 'extras', 1, 1, 101, 5.6, 1.7, 24, 14],
  ['Rosmarin', 'extras', 1, 1, 131, 3.3, 5.9, 20, 14.1], ['Oregano', 'extras', 1, 1, 265, 9, 4.3, 69, 42.5],
  ['Salbei', 'extras', 1, 1, 315, 10.6, 12.7, 60, 40.3], ['Ingwer', 'extras', 1, 1, 80, 1.8, 0.8, 18, 2],
  ['Kurkuma', 'extras', 1, 1, 312, 9.7, 3.3, 67, 21], ['Zimt', 'extras', 1, 1, 247, 4, 1.2, 81, 53.1],
  ['Kreuzkümmel', 'extras', 1, 1, 375, 17.8, 22.3, 44, 10.5], ['Schwarzer Pfeffer', 'extras', 1, 1, 251, 10.4, 3.3, 64, 25.3],
  ['Chili', 'extras', 1, 1, 40, 1.9, 0.4, 9, 1.5], ['Paprikapulver', 'extras', 1, 1, 282, 14.1, 13, 54, 35],
  ['Grüner Tee', 'extras', 1, 1, 1, 0.2, 0, 0.3, 0], ['Schwarzer Tee', 'extras', 1, 1, 1, 0.1, 0, 0.3, 0],
  ['Kaffee', 'extras', 1, 1, 1, 0.1, 0, 0, 0], ['Olivenöl', 'extras', 1, 1, 884, 0, 100, 0, 0],
  ['Milch 3,5%', 'milch', 0, 0, 64, 3.3, 3.5, 4.8, 0], ['Milch 1,5%', 'milch', 0, 0, 47, 3.4, 1.5, 4.9, 0],
  ['Naturjoghurt', 'milch', 0, 0, 61, 3.5, 3.5, 4.7, 0], ['Griechischer Joghurt', 'milch', 0, 0, 115, 4.5, 10, 4, 0],
  ['Skyr', 'milch', 0, 0, 63, 11, 0.2, 4, 0], ['Magerquark', 'milch', 0, 0, 67, 12, 0.2, 4, 0],
  ['Speisequark 40%', 'milch', 0, 0, 145, 11, 10, 3.4, 0], ['Frischkäse', 'milch', 0, 0, 250, 7, 25, 3, 0],
  ['Butter', 'milch', 0, 0, 717, 0.9, 81, 0.7, 0], ['Sahne 30%', 'milch', 0, 0, 292, 2.4, 30, 3.4, 0],
  ['Crème fraîche', 'milch', 0, 0, 292, 2.4, 30, 3.4, 0], ['Mozzarella', 'milch', 0, 0, 280, 22, 22, 2.2, 0],
  ['Parmesan', 'milch', 0, 0, 392, 35, 26, 3.2, 0], ['Feta', 'milch', 0, 0, 264, 14, 21, 4, 0],
  ['Hüttenkäse', 'milch', 0, 0, 98, 11, 4.3, 3.4, 0], ['Gouda', 'milch', 0, 0, 356, 25, 28, 2.2, 0],
  ['Hähnchenbrust', 'fleisch', 0, 0, 110, 23, 1.6, 0, 0], ['Putenbrust', 'fleisch', 0, 0, 104, 24, 1, 0, 0],
  ['Rinderhack', 'fleisch', 0, 0, 220, 20, 15, 0, 0], ['Rindersteak', 'fleisch', 0, 0, 190, 21, 11, 0, 0],
  ['Schweinefilet', 'fleisch', 0, 0, 143, 21, 6, 0, 0], ['Speck', 'fleisch', 0, 0, 541, 9, 53, 0.5, 0],
  ['Salami', 'fleisch', 0, 0, 407, 20, 35, 1, 0], ['Kochschinken', 'fleisch', 0, 0, 106, 18, 3.5, 1, 0],
  ['Lammfleisch', 'fleisch', 0, 0, 250, 17, 20, 0, 0], ['Lachs', 'fisch', 0, 0, 208, 20, 13, 0, 0],
  ['Thunfisch', 'fisch', 0, 0, 144, 23, 5, 0, 0], ['Kabeljau', 'fisch', 0, 0, 82, 18, 0.7, 0, 0],
  ['Garnelen', 'fisch', 0, 0, 99, 21, 1.4, 0.2, 0], ['Forelle', 'fisch', 0, 0, 148, 20, 7, 0, 0],
  ['Makrele', 'fisch', 0, 0, 205, 19, 14, 0, 0], ['Ei (Huhn)', 'eier', 0, 0, 155, 13, 11, 1.1, 0],
  ['Kichererbse (roh)', 'huelsen', 1, 0, 364, 19, 6, 61, 17], ['Rote Linsen (roh)', 'huelsen', 1, 0, 353, 24, 1.1, 60, 11],
  ['Braune Linsen (roh)', 'huelsen', 1, 0, 353, 25, 1.1, 60, 11], ['Weiße Bohnen (roh)', 'huelsen', 1, 0, 333, 23, 1.5, 60, 15],
  ['Kidneybohnen (roh)', 'huelsen', 1, 0, 333, 24, 1, 60, 15], ['Schwarze Bohnen (roh)', 'huelsen', 1, 0, 341, 21, 1.4, 63, 15],
  ['Sojabohnen (roh)', 'huelsen', 1, 0, 446, 36, 20, 30, 9], ['Erbsen (getrocknet)', 'huelsen', 1, 0, 352, 25, 1, 60, 25],
  ['Quinoa (roh)', 'getreide', 1, 0, 368, 14, 6, 64, 7], ['Amaranth (roh)', 'getreide', 1, 0, 371, 14, 7, 65, 7],
  ['Buchweizen (roh)', 'getreide', 1, 0, 343, 13, 3.4, 71, 10], ['Brauner Reis (roh)', 'getreide', 1, 0, 370, 7.5, 2.7, 77, 3.5],
  ['Hirse (roh)', 'getreide', 1, 0, 378, 11, 4.2, 73, 8.5], ['Bulgur (roh)', 'getreide', 1, 0, 342, 12, 1.3, 76, 18],
  ['Polenta (roh)', 'getreide', 1, 0, 361, 8.5, 1.5, 77, 5.5], ['Gerste (roh)', 'getreide', 1, 0, 354, 9.9, 2.3, 73, 15],
  ['Dinkel (roh)', 'getreide', 1, 0, 338, 15, 2.4, 70, 11],
];
const FOOD_LIBRARY = RAW_FOODS.map(([name, cat, isPlant, quarter, kcal, protein, fat, carbs, fiber]) => ({
  name, cat, isPlant: !!isPlant, quarter: !!quarter, perHundred: { kcal, protein, fat, carbs, fiber },
}));
const PLANT_LIBRARY = FOOD_LIBRARY.filter(f => f.isPlant);
const PLANT_BY_KEY = new Map(PLANT_LIBRARY.map(p => [p.name.toLowerCase(), p]));
const UNIT_GRAMS = { g: 1, kg: 1000, ml: 1, l: 1000, EL: 15, TL: 5, Prise: 0.3, Bund: 50 };
function gramsFor(amount, unit) {
  if (!(unit in UNIT_GRAMS)) return null;
  return num(amount) * UNIT_GRAMS[unit];
}
function ingredientNutrients(ing) {
  if (ing.perHundred) {
    const g = gramsFor(ing.amount, ing.unit);
    if (g != null) {
      const f = g / 100;
      return { kcal: ing.perHundred.kcal * f, protein: ing.perHundred.protein * f, fat: ing.perHundred.fat * f, carbs: ing.perHundred.carbs * f, fiber: (ing.perHundred.fiber || 0) * f, computed: true };
    }
  }
  return { kcal: num(ing.kcal), protein: num(ing.protein), fat: num(ing.fat), carbs: num(ing.carbs), fiber: num(ing.fiber), computed: false };
}
const STORE_SECTIONS = ['Obst/Gemüse', 'Kühlregal', 'TK', 'Nicht-gekühlte Sachen', 'Backwaren'];
const SECTION_OVERRIDE = { tofu: 'Kühlregal', tempeh: 'Kühlregal', edamame: 'TK' };
const CATEGORY_TO_SECTION = {
  gemuese: 'Obst/Gemüse', obst: 'Obst/Gemüse', pilze: 'Obst/Gemüse',
  milch: 'Kühlregal', eier: 'Kühlregal', fleisch: 'Kühlregal', fisch: 'Kühlregal',
  huelsen: 'Nicht-gekühlte Sachen', getreide: 'Nicht-gekühlte Sachen', nuesse: 'Nicht-gekühlte Sachen',
  extras: 'Nicht-gekühlte Sachen', sonstige: 'Nicht-gekühlte Sachen',
};
function sectionForName(name, cat) {
  const key = (name || '').trim().toLowerCase();
  if (SECTION_OVERRIDE[key]) return SECTION_OVERRIDE[key];
  return CATEGORY_TO_SECTION[cat] || 'Nicht-gekühlte Sachen';
}

function getMonday(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const m = new Date(date);
  m.setDate(diff);
  m.setHours(0, 0, 0, 0);
  return m;
}
function getWeekKey(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}
function weekKeyForOffset(offset) {
  const m = getMonday(new Date());
  m.setDate(m.getDate() + offset * 7);
  return getWeekKey(m);
}
function fmtWeekLabel(monday) {
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const opts = { day: 'numeric', month: 'short' };
  return `${monday.toLocaleDateString('de-DE', opts)} – ${sunday.toLocaleDateString('de-DE', opts)}`;
}
function uid() {
  return Math.random().toString(36).slice(2, 10);
}
function num(v) {
  const n = parseFloat(String(v).replace(',', '.'));
  return isNaN(n) ? 0 : n;
}
function formatPoints(n) {
  const r = Math.round(n * 100) / 100;
  if (Number.isInteger(r)) return String(r);
  return r.toFixed(2).replace(/0$/, '').replace('.', ',');
}

function recipePlantsForWeek(weekKey, data, recipesById) {
  const map = new Map();
  const days = data.weekPlan[weekKey] || {};
  Object.values(days).forEach(meals => {
    Object.values(meals || {}).forEach(rid => {
      const r = recipesById[rid];
      if (!r) return;
      r.ingredients.forEach(ing => {
        if (ing.isPlant && ing.name.trim()) {
          const key = ing.name.trim().toLowerCase();
          if (!map.has(key)) map.set(key, { name: ing.name.trim(), cat: ing.cat || 'sonstige', quarter: !!ing.quarter });
        }
      });
    });
  });
  return map;
}
function fullPlantsForWeek(weekKey, data, recipesById, plantByKey) {
  const map = recipePlantsForWeek(weekKey, data, recipesById);
  const manual = data.plantLog[weekKey] || {};
  Object.keys(manual).forEach(key => {
    if (!manual[key] || map.has(key)) return;
    const lib = plantByKey.get(key);
    if (lib) map.set(key, { name: lib.name, cat: lib.cat, quarter: lib.quarter });
  });
  return map;
}
function pointsForMap(map) {
  let total = 0;
  map.forEach(p => { total += p.quarter ? 0.25 : 1; });
  return Math.round(total * 100) / 100;
}
function plantsForDay(dayMeals, recipesById) {
  const map = new Map();
  Object.values(dayMeals || {}).forEach(rid => {
    const r = recipesById[rid];
    if (!r) return;
    r.ingredients.forEach(ing => {
      if (ing.isPlant && ing.name.trim()) {
        const key = ing.name.trim().toLowerCase();
        if (!map.has(key)) map.set(key, { name: ing.name.trim(), cat: ing.cat || 'sonstige', quarter: !!ing.quarter });
      }
    });
  });
  return map;
}
function recipePerServing(recipe) {
  const totals = recipe.ingredients.reduce((acc, i) => {
    const n = ingredientNutrients(i);
    acc.kcal += n.kcal; acc.protein += n.protein; acc.fat += n.fat; acc.carbs += n.carbs; acc.fiber += n.fiber;
    return acc;
  }, { kcal: 0, protein: 0, fat: 0, carbs: 0, fiber: 0 });
  const servings = Math.max(1, num(recipe.servings) || 1);
  return { kcal: totals.kcal / servings, protein: totals.protein / servings, fat: totals.fat / servings, carbs: totals.carbs / servings, fiber: totals.fiber / servings };
}
function computeStreak(data, recipesById, plantByKey) {
  let streak = 0;
  let offset = 0;
  while (streak <= 200) {
    const wk = weekKeyForOffset(offset);
    const pts = pointsForMap(fullPlantsForWeek(wk, data, recipesById, plantByKey));
    if (pts >= PLANT_GOAL) { streak++; offset--; } else break;
  }
  return streak;
}
function computeLifetimePlants(data, recipesById) {
  const set = new Set();
  Object.values(data.plantLog).forEach(weekObj => {
    Object.keys(weekObj).forEach(k => { if (weekObj[k]) set.add(k); });
  });
  Object.values(data.weekPlan).forEach(days => {
    Object.values(days).forEach(meals => {
      Object.values(meals || {}).forEach(rid => {
        const r = recipesById[rid];
        if (!r) return;
        r.ingredients.forEach(ing => { if (ing.isPlant && ing.name.trim()) set.add(ing.name.trim().toLowerCase()); });
      });
    });
  });
  return set.size;
}
function computeWeekPlansCreated(data) {
  return Object.values(data.weekPlan).filter(days => Object.values(days).some(meals => Object.values(meals || {}).some(Boolean))).length;
}
function computeGoalReachedWeeks(data, recipesById, plantByKey) {
  const keys = new Set([...Object.keys(data.plantLog), ...Object.keys(data.weekPlan)]);
  let count = 0;
  keys.forEach(wk => { if (pointsForMap(fullPlantsForWeek(wk, data, recipesById, plantByKey)) >= PLANT_GOAL) count++; });
  return count;
}
function getBadges(stats) {
  return [
    { id: 'p25', emoji: '🌱', label: '25 Pflanzenarten entdeckt', earned: stats.lifetime >= 25 },
    { id: 'p50', emoji: '🌿', label: '50 Pflanzenarten entdeckt', earned: stats.lifetime >= 50 },
    { id: 'p100', emoji: '🌳', label: '100 Pflanzenarten entdeckt', earned: stats.lifetime >= 100 },
    { id: 'p150', emoji: '🏵️', label: '150 Pflanzenarten entdeckt', earned: stats.lifetime >= 150 },
    { id: 's2', emoji: '🔥', label: '2 Wochen Streak', earned: stats.streak >= 2 },
    { id: 's4', emoji: '🔥🔥', label: '4 Wochen Streak', earned: stats.streak >= 4 },
    { id: 's8', emoji: '🔥🔥🔥', label: '8 Wochen Streak', earned: stats.streak >= 8 },
    { id: 's12', emoji: '💯', label: '12 Wochen Streak', earned: stats.streak >= 12 },
    { id: 'r10', emoji: '📖', label: '10 Rezepte gesammelt', earned: stats.recipesCount >= 10 },
    { id: 'r30', emoji: '📚', label: '30 Rezepte gesammelt', earned: stats.recipesCount >= 30 },
    { id: 'w4', emoji: '🗓️', label: '4 Wochenpläne erstellt', earned: stats.weekPlansCreated >= 4 },
    { id: 'w12', emoji: '📅', label: '12 Wochenpläne erstellt', earned: stats.weekPlansCreated >= 12 },
    { id: 'g1', emoji: '🎯', label: 'Ziel 1× erreicht', earned: stats.goalReachedWeeks >= 1 },
    { id: 'g10', emoji: '🏆', label: 'Ziel 10× erreicht', earned: stats.goalReachedWeeks >= 10 },
    { id: 'g25', emoji: '👑', label: 'Ziel 25× erreicht', earned: stats.goalReachedWeeks >= 25 },
  ];
}

const DEFAULT_DATA = { recipes: [], weekPlan: {}, shoppingChecked: {}, plantLog: {}, shoppingExtras: {}, customPlants: [], planTemplates: [], shoppingOverrides: {} };
const EMPTY_ING = () => ({ id: uid(), name: '', amount: '', unit: 'g', isPlant: false, cat: undefined, quarter: false, perHundred: null, kcal: '', protein: '', fat: '', carbs: '', fiber: '' });
const EMPTY_RECIPE = () => ({ id: uid(), isNew: true, name: '', servings: 2, category: '', instructions: '', hasPhoto: false, photoDataUrl: null, removePhoto: false, ingredients: [] });

function handlePhotoFile(e, onChange, draft) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const maxW = 900;
      const scale = Math.min(1, maxW / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.72);
      onChange({ ...draft, photoDataUrl: dataUrl, hasPhoto: true, removePhoto: false });
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
.f-display { font-family: 'Fraunces', serif; }
.f-body { font-family: 'Inter', sans-serif; }
.f-mono { font-family: 'IBM Plex Mono', monospace; }
.scroll-thin::-webkit-scrollbar { height: 6px; width: 6px; }
.scroll-thin::-webkit-scrollbar-thumb { background: #C7CFC0; border-radius: 4px; }
input, select, textarea { font-size: 16px !important; }
`;

const C = {
  page: '#F4F6F0',
  card: '#FFFFFF',
  ink: '#1E2E22',
  inkSoft: '#5B6B5E',
  line: '#DFE5D8',
  accent: '#A6443C',
  accentSoft: '#F1DEDB',
  gold: '#B8892F',
  leaf: '#3F6046',
  leafSoft: '#E6ECDF',
};

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('recipes');
  const [weekOffset, setWeekOffset] = useState(0);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      const res = await window.storage.get('household-data', true);
      const parsed = res && res.value ? JSON.parse(res.value) : DEFAULT_DATA;
      setData({ ...DEFAULT_DATA, ...parsed });
    } catch (e) {
      setData(DEFAULT_DATA);
    }
    setLoading(false);
  }

  async function persist(next) {
    setData(next);
    try {
      const res = await window.storage.set('household-data', JSON.stringify(next), true);
      if (!res) setError('Speichern hat nicht geklappt. Bitte nochmal versuchen.');
      else setError('');
    } catch (e) {
      setError('Speichern hat nicht geklappt. Bitte nochmal versuchen.');
    }
  }

  const monday = useMemo(() => {
    const m = getMonday(new Date());
    m.setDate(m.getDate() + weekOffset * 7);
    return m;
  }, [weekOffset]);
  const weekKey = useMemo(() => getWeekKey(monday), [monday]);

  const safeData = data || DEFAULT_DATA;
  const recipesById = useMemo(() => Object.fromEntries(safeData.recipes.map(r => [r.id, r])), [safeData.recipes]);
  const weekAssignments = safeData.weekPlan[weekKey] || {};

  const customPlantEntries = useMemo(() => (safeData.customPlants || []).map(c => ({
    name: c.name, cat: c.cat, quarter: !!c.quarter, isPlant: true, perHundred: null, custom: true,
  })), [safeData.customPlants]);
  const effectiveFoodLibrary = useMemo(() => [...FOOD_LIBRARY, ...customPlantEntries], [customPlantEntries]);
  const effectivePlantLibrary = useMemo(() => effectiveFoodLibrary.filter(f => f.isPlant), [effectiveFoodLibrary]);
  const plantByKey = useMemo(() => new Map(effectivePlantLibrary.map(p => [p.name.toLowerCase(), p])), [effectivePlantLibrary]);

  function assignedRecipes() {
    const ids = [];
    DAYS_SHORT.forEach(day => MEALS.forEach(meal => {
      const rid = weekAssignments[day]?.[meal];
      if (rid && recipesById[rid]) ids.push(rid);
    }));
    return ids;
  }

  const recipeAutoMap = useMemo(() => recipePlantsForWeek(weekKey, safeData, recipesById), [weekKey, safeData.weekPlan, safeData.recipes, recipesById]);
  const viewedPlantMap = useMemo(() => fullPlantsForWeek(weekKey, safeData, recipesById, plantByKey), [weekKey, safeData.weekPlan, safeData.recipes, safeData.plantLog, recipesById, plantByKey]);

  const shoppingItems = useMemo(() => {
    const agg = new Map();
    assignedRecipes().forEach(rid => {
      recipesById[rid].ingredients.forEach(ing => {
        if (!ing.name.trim()) return;
        const key = `${ing.name.trim().toLowerCase()}|${ing.unit}`;
        const existing = agg.get(key);
        if (existing) existing.amount += num(ing.amount);
        else agg.set(key, { name: ing.name.trim(), unit: ing.unit, amount: num(ing.amount), isPlant: ing.isPlant, cat: ing.cat });
      });
    });
    return Array.from(agg.values()).sort((a, b) => a.name.localeCompare(b.name, 'de'));
  }, [safeData.weekPlan, safeData.recipes, weekKey]);

  const stats = useMemo(() => ({
    lifetime: computeLifetimePlants(safeData, recipesById),
    streak: computeStreak(safeData, recipesById, plantByKey),
    weekPlansCreated: computeWeekPlansCreated(safeData),
    goalReachedWeeks: computeGoalReachedWeeks(safeData, recipesById, plantByKey),
    recipesCount: safeData.recipes.length,
  }), [safeData, recipesById, plantByKey]);

  const trend = useMemo(() => {
    const arr = [];
    for (let o = -7; o <= 0; o++) {
      const wk = weekKeyForOffset(o);
      arr.push({ key: wk, label: 'W' + wk.split('-W')[1], pts: pointsForMap(fullPlantsForWeek(wk, safeData, recipesById, plantByKey)) });
    }
    return arr;
  }, [safeData, recipesById, plantByKey]);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.page }}>
        <style>{fonts}</style>
        <div className="flex items-center gap-2 f-body" style={{ color: C.inkSoft }}>
          <Sprout className="animate-pulse" size={20} />
          <span>Küchenbuch wird geöffnet …</span>
        </div>
      </div>
    );
  }

  function saveRecipe(draft) {
    const { photoDataUrl, removePhoto, isNew, ...rest } = draft;
    const clean = { ...rest, servings: Math.max(1, num(draft.servings) || 1), ingredients: draft.ingredients.filter(i => i.name.trim()) };
    let recipes;
    if (!isNew) {
      recipes = data.recipes.map(r => (r.id === clean.id ? clean : r));
    } else {
      recipes = [...data.recipes, clean];
    }
    persist({ ...data, recipes });
    if (photoDataUrl) {
      window.storage.set('photo:' + clean.id, photoDataUrl, true).catch(() => {});
    } else if (removePhoto) {
      window.storage.delete('photo:' + clean.id, true).catch(() => {});
    }
    setEditing(null);
  }

  function deleteRecipe(id) {
    const recipes = data.recipes.filter(r => r.id !== id);
    const weekPlan = {};
    Object.entries(data.weekPlan).forEach(([wk, days]) => {
      const nd = {};
      Object.entries(days).forEach(([day, meals]) => {
        const nm = {};
        Object.entries(meals).forEach(([meal, rid]) => { if (rid !== id) nm[meal] = rid; });
        nd[day] = nm;
      });
      weekPlan[wk] = nd;
    });
    persist({ ...data, recipes, weekPlan });
    window.storage.delete('photo:' + id, true).catch(() => {});
    setConfirmDelete(null);
  }

  function assign(day, meal, recipeId) {
    const wp = { ...data.weekPlan };
    const days = { ...(wp[weekKey] || {}) };
    const meals = { ...(days[day] || {}) };
    if (recipeId) meals[meal] = recipeId; else delete meals[meal];
    days[day] = meals;
    wp[weekKey] = days;
    persist({ ...data, weekPlan: wp });
  }

  function toggleChecked(itemKey) {
    const sc = { ...data.shoppingChecked };
    const wk = { ...(sc[weekKey] || {}) };
    wk[itemKey] = !wk[itemKey];
    sc[weekKey] = wk;
    persist({ ...data, shoppingChecked: sc });
  }

  function togglePlant(key) {
    const pl = { ...data.plantLog };
    const wk = { ...(pl[weekKey] || {}) };
    wk[key] = !wk[key];
    pl[weekKey] = wk;
    persist({ ...data, plantLog: pl });
  }

  function addShoppingExtra(item) {
    const se = { ...data.shoppingExtras };
    se[weekKey] = [...(se[weekKey] || []), item];
    persist({ ...data, shoppingExtras: se });
  }

  function removeShoppingExtra(id) {
    const se = { ...data.shoppingExtras };
    se[weekKey] = (se[weekKey] || []).filter(i => i.id !== id);
    persist({ ...data, shoppingExtras: se });
  }

  function updateShoppingExtra(id, patch) {
    const se = { ...data.shoppingExtras };
    se[weekKey] = (se[weekKey] || []).map(i => (i.id === id ? { ...i, ...patch } : i));
    persist({ ...data, shoppingExtras: se });
  }

  function setShoppingOverride(itemKey, amount) {
    const so = { ...data.shoppingOverrides };
    const wk = { ...(so[weekKey] || {}) };
    if (amount === '' || amount === null) delete wk[itemKey];
    else wk[itemKey] = amount;
    so[weekKey] = wk;
    persist({ ...data, shoppingOverrides: so });
  }

  function addCustomPlant(cat, name, quarter) {
    if (!name.trim()) return;
    const cp = [...data.customPlants, { name: name.trim(), cat, quarter: !!quarter }];
    persist({ ...data, customPlants: cp });
  }

  function saveWeekTemplate(name) {
    if (!name.trim()) return;
    const tpl = { id: uid(), name: name.trim(), createdAt: Date.now(), days: JSON.parse(JSON.stringify(weekAssignments)) };
    persist({ ...data, planTemplates: [...data.planTemplates, tpl] });
  }

  function applyWeekTemplate(templateId) {
    const tpl = data.planTemplates.find(t => t.id === templateId);
    if (!tpl) return;
    const wp = { ...data.weekPlan };
    wp[weekKey] = JSON.parse(JSON.stringify(tpl.days));
    persist({ ...data, weekPlan: wp });
  }

  function deleteWeekTemplate(templateId) {
    persist({ ...data, planTemplates: data.planTemplates.filter(t => t.id !== templateId) });
  }

  const checkedForWeek = data.shoppingChecked[weekKey] || {};
  const overridesForWeek = data.shoppingOverrides[weekKey] || {};

  return (
    <div className="min-h-screen f-body" style={{ background: C.page, color: C.ink }}>
      <style>{fonts}</style>

      <header className="sticky top-0 z-10 px-4 pt-5 pb-3" style={{ background: C.page, borderBottom: `1px solid ${C.line}` }}>
        <div className="flex items-baseline justify-between">
          <h1 className="f-display text-2xl" style={{ fontWeight: 600 }}>„Kraut &amp; Rüben"</h1>
          <span className="text-xs f-mono" style={{ color: C.inkSoft }}>{data.recipes.length} Rezepte</span>
        </div>
        <p className="text-xs mt-0.5" style={{ color: C.inkSoft }}>Meal Prepping by Johanna &amp; Kai-Lucas</p>

        <nav className="flex gap-1 mt-4 overflow-x-auto scroll-thin">
          {[
            ['recipes', 'Rezepte', BookOpen],
            ['plan', 'Wochenplan', CalendarDays],
            ['shopping', 'Einkaufsliste', ShoppingCart],
            ['points', 'PlantPoints', Leaf],
            ['report', 'Wochenbericht', ClipboardList],
          ].map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm whitespace-nowrap transition-colors"
              style={tab === key ? { background: C.ink, color: C.page } : { background: 'transparent', color: C.inkSoft }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="px-4 pb-28 pt-4 max-w-3xl mx-auto">
        {error && (
          <div className="mb-4 px-3 py-2 rounded-lg text-sm" style={{ background: C.accentSoft, color: C.accent }}>{error}</div>
        )}

        {tab === 'recipes' && (
          <RecipesTab
            recipes={data.recipes}
            onAdd={() => setEditing(EMPTY_RECIPE())}
            onOpen={r => setViewing(r)}
            onEdit={r => setEditing({ ...JSON.parse(JSON.stringify(r)), isNew: false, photoDataUrl: null, removePhoto: false })}
            onDelete={id => setConfirmDelete(id)}
          />
        )}

        {tab === 'plan' && (
          <PlanTab
            monday={monday}
            weekOffset={weekOffset}
            setWeekOffset={setWeekOffset}
            recipes={data.recipes}
            recipesById={recipesById}
            weekAssignments={weekAssignments}
            onAssign={assign}
            templates={data.planTemplates}
            onSaveTemplate={saveWeekTemplate}
            onApplyTemplate={applyWeekTemplate}
            onDeleteTemplate={deleteWeekTemplate}
          />
        )}

        {tab === 'shopping' && (
          <ShoppingTab
            monday={monday}
            weekOffset={weekOffset}
            setWeekOffset={setWeekOffset}
            items={shoppingItems}
            extras={data.shoppingExtras[weekKey] || []}
            checked={checkedForWeek}
            overrides={overridesForWeek}
            onToggle={toggleChecked}
            onAddExtra={addShoppingExtra}
            onRemoveExtra={removeShoppingExtra}
            onUpdateExtra={updateShoppingExtra}
            onSetOverride={setShoppingOverride}
            foodLibrary={effectiveFoodLibrary}
          />
        )}

        {tab === 'points' && (
          <PointsTab
            monday={monday}
            weekOffset={weekOffset}
            setWeekOffset={setWeekOffset}
            plantMap={viewedPlantMap}
            autoKeys={new Set(recipeAutoMap.keys())}
            manualSet={data.plantLog[weekKey] || {}}
            onTogglePlant={togglePlant}
            stats={stats}
            trend={trend}
            plantLibrary={effectivePlantLibrary}
            onAddCustomPlant={addCustomPlant}
          />
        )}

        {tab === 'report' && (
          <ReportTab
            monday={monday}
            weekOffset={weekOffset}
            setWeekOffset={setWeekOffset}
            weekAssignments={weekAssignments}
            recipesById={recipesById}
            plantMap={viewedPlantMap}
          />
        )}
      </main>

      {viewing && (
        <RecipeDetail
          recipe={viewing}
          onClose={() => setViewing(null)}
          onEdit={r => { setViewing(null); setEditing({ ...JSON.parse(JSON.stringify(r)), isNew: false, photoDataUrl: null, removePhoto: false }); }}
          onDelete={id => { setViewing(null); setConfirmDelete(id); }}
          onAssign={assign}
        />
      )}

      {editing && (
        <RecipeEditor
          draft={editing}
          onChange={setEditing}
          onCancel={() => setEditing(null)}
          onSave={() => saveRecipe(editing)}
          foodLibrary={effectiveFoodLibrary}
        />
      )}

      {confirmDelete && (
        <ConfirmModal
          text="Dieses Rezept wirklich löschen? Es wird auch aus geplanten Wochen entfernt."
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => deleteRecipe(confirmDelete)}
        />
      )}
    </div>
  );
}

function WeekNav({ monday, weekOffset, setWeekOffset }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <button onClick={() => setWeekOffset(weekOffset - 1)} className="p-2 rounded-full" style={{ background: C.card, border: `1px solid ${C.line}` }}>
        <ChevronLeft size={16} />
      </button>
      <div className="text-center">
        <div className="f-display text-lg" style={{ fontWeight: 600 }}>{fmtWeekLabel(monday)}</div>
        {weekOffset !== 0 && (
          <button onClick={() => setWeekOffset(0)} className="text-xs underline" style={{ color: C.inkSoft }}>zur aktuellen Woche</button>
        )}
      </div>
      <button onClick={() => setWeekOffset(weekOffset + 1)} className="p-2 rounded-full" style={{ background: C.card, border: `1px solid ${C.line}` }}>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

function RecipePhotoThumb({ id, hasPhoto, size = 80, wide = false }) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    if (!hasPhoto) { setSrc(null); return; }
    let active = true;
    window.storage.get('photo:' + id, true).then(res => { if (active && res) setSrc(res.value); }).catch(() => {});
    return () => { active = false; };
  }, [id, hasPhoto]);
  const boxStyle = wide ? { width: '100%', height: 180 } : { width: size, height: size };
  if (!hasPhoto) {
    return (
      <div className="rounded-lg flex items-center justify-center shrink-0" style={{ ...boxStyle, background: C.leafSoft }}>
        <BookOpen size={wide ? 32 : Math.round(size * 0.35)} style={{ color: C.leaf, opacity: 0.5 }} />
      </div>
    );
  }
  if (!src) return <div className="rounded-lg animate-pulse shrink-0" style={boxStyle} />;
  return <img src={src} alt="" className="rounded-lg object-cover shrink-0" style={boxStyle} />;
}

function RecipesTab({ recipes, onAdd, onOpen, onEdit, onDelete }) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <Sprout size={28} style={{ color: C.inkSoft, margin: '0 auto' }} />
        <p className="mt-3 text-sm" style={{ color: C.inkSoft }}>Noch keine Rezepte im Buch.</p>
        <button onClick={onAdd} className="mt-4 px-4 py-2 rounded-full text-sm f-body" style={{ background: C.ink, color: C.page }}>Erstes Rezept anlegen</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={onAdd} className="mb-4 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm" style={{ background: C.ink, color: C.page }}>
        <Plus size={15} /> Neues Rezept
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {recipes.map(r => {
          const totals = r.ingredients.reduce((acc, i) => {
            const n = ingredientNutrients(i);
            acc.kcal += n.kcal; acc.protein += n.protein; acc.fat += n.fat; acc.carbs += n.carbs;
            return acc;
          }, { kcal: 0, protein: 0, fat: 0, carbs: 0 });
          const perServing = Math.round(totals.kcal / (r.servings || 1));
          const plantCount = new Set(r.ingredients.filter(i => i.isPlant && i.name.trim()).map(i => i.name.trim().toLowerCase())).size;
          return (
            <div key={r.id} onClick={() => onOpen(r)} className="rounded-xl p-3 flex gap-3 cursor-pointer items-start"
              style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <RecipePhotoThumb id={r.id} hasPhoto={r.hasPhoto} size={72} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="f-display text-base leading-tight truncate" style={{ fontWeight: 600 }}>{r.name || 'Ohne Titel'}</h3>
                    {r.category && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full" style={{ background: C.leafSoft, color: C.leaf }}>{r.category}</span>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                    <button onClick={() => onEdit(r)} className="p-1.5 rounded-full" style={{ color: C.inkSoft }}><Pencil size={14} /></button>
                    <button onClick={() => onDelete(r.id)} className="p-1.5 rounded-full" style={{ color: C.accent }}><Trash2 size={14} /></button>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 mt-1.5 text-xs f-mono flex-wrap" style={{ color: C.inkSoft }}>
                  <span>{r.servings} Port.</span>
                  {totals.kcal > 0 && <span>{perServing} kcal</span>}
                  {plantCount > 0 && (
                    <span className="flex items-center gap-1" style={{ color: C.leaf }}><Leaf size={12} />{plantCount}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecipeDetail({ recipe, onClose, onEdit, onDelete, onAssign }) {
  const [showAssign, setShowAssign] = useState(false);
  const [day, setDay] = useState(DAYS_SHORT[0]);
  const [meal, setMeal] = useState(MEALS[0]);
  const [assigned, setAssigned] = useState(false);
  if (!recipe) return null;
  const totals = recipe.ingredients.reduce((acc, i) => {
    const n = ingredientNutrients(i);
    acc.kcal += n.kcal; acc.protein += n.protein; acc.fat += n.fat; acc.carbs += n.carbs; acc.fiber += n.fiber;
    return acc;
  }, { kcal: 0, protein: 0, fat: 0, carbs: 0, fiber: 0 });
  const servings = Math.max(1, num(recipe.servings) || 1);
  const plantCount = new Set(recipe.ingredients.filter(i => i.isPlant && i.name.trim()).map(i => i.name.trim().toLowerCase())).size;

  function confirmAssign() {
    onAssign(day, meal, recipe.id);
    setAssigned(true);
    setTimeout(() => { setAssigned(false); setShowAssign(false); }, 900);
  }

  return (
    <div className="fixed inset-0 z-20 flex items-end md:items-center justify-center" style={{ background: 'rgba(30,46,34,0.45)' }}>
      <div className="w-full md:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl md:rounded-2xl" style={{ background: C.page }}>
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <h2 className="f-display text-xl" style={{ fontWeight: 600 }}>{recipe.name || 'Ohne Titel'}</h2>
              {recipe.category && (
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full" style={{ background: C.leafSoft, color: C.leaf }}>{recipe.category}</span>
              )}
            </div>
            <button onClick={onClose} style={{ color: C.inkSoft }}><X size={20} /></button>
          </div>

          <RecipePhotoThumb id={recipe.id} hasPhoto={recipe.hasPhoto} wide />

          <div className="flex items-center gap-3 mt-3 text-xs f-mono flex-wrap" style={{ color: C.inkSoft }}>
            <span>{servings} Portionen</span>
            {totals.kcal > 0 && <span>{Math.round(totals.kcal / servings)} kcal/Port.</span>}
            {totals.protein > 0 && <span>{Math.round(totals.protein / servings)}g Eiw.</span>}
            {totals.fiber > 0 && <span>{Math.round((totals.fiber / servings) * 10) / 10}g BS</span>}
            {plantCount > 0 && <span className="flex items-center gap-1" style={{ color: C.leaf }}><Leaf size={12} />{plantCount}</span>}
          </div>

          <div className="mt-4">
            <div className="text-xs f-mono mb-1.5" style={{ color: C.inkSoft }}>Zutaten</div>
            <div className="rounded-xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              {recipe.ingredients.filter(i => i.name.trim()).map((i, idx) => (
                <div key={i.id || idx} className="flex items-center gap-2 px-3 py-2 text-sm"
                  style={{ borderTop: idx > 0 ? `1px solid ${C.line}` : 'none' }}>
                  {i.isPlant && <Leaf size={12} style={{ color: C.leaf }} className="shrink-0" />}
                  <span className="flex-1">{i.name}</span>
                  <span className="f-mono text-xs" style={{ color: C.inkSoft }}>{i.amount} {i.unit}</span>
                </div>
              ))}
            </div>
          </div>

          {recipe.instructions && (
            <div className="mt-4">
              <div className="text-xs f-mono mb-1.5" style={{ color: C.inkSoft }}>Zubereitung</div>
              <p className="text-sm whitespace-pre-wrap" style={{ color: C.ink }}>{recipe.instructions}</p>
            </div>
          )}

          <div className="mt-5">
            {showAssign ? (
              <div className="rounded-xl p-3" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                {assigned ? (
                  <p className="text-sm text-center py-1" style={{ color: C.leaf }}>Zum Wochenplan hinzugefügt ✓</p>
                ) : (
                  <>
                    <div className="flex gap-2 mb-2">
                      <select value={day} onChange={e => setDay(e.target.value)} className="flex-1 px-2 py-1.5 rounded-lg text-sm" style={{ background: C.page, border: `1px solid ${C.line}` }}>
                        {DAYS.map((d, i) => <option key={d} value={DAYS_SHORT[i]}>{d}</option>)}
                      </select>
                      <select value={meal} onChange={e => setMeal(e.target.value)} className="flex-1 px-2 py-1.5 rounded-lg text-sm" style={{ background: C.page, border: `1px solid ${C.line}` }}>
                        {MEALS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setShowAssign(false)} className="flex-1 py-1.5 rounded-full text-sm" style={{ border: `1px solid ${C.line}`, color: C.inkSoft }}>Abbrechen</button>
                      <button onClick={confirmAssign} className="flex-1 py-1.5 rounded-full text-sm" style={{ background: C.leaf, color: '#fff' }}>Eintragen</button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button onClick={() => setShowAssign(true)} className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm" style={{ background: C.leafSoft, color: C.leaf }}>
                <CalendarDays size={15} /> Zum Wochenplan hinzufügen
              </button>
            )}
          </div>

          <div className="flex gap-2 mt-3">
            <button onClick={() => onEdit(recipe)} className="flex-1 py-2 rounded-full text-sm flex items-center justify-center gap-1.5" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
              <Pencil size={14} /> Bearbeiten
            </button>
            <button onClick={() => onDelete(recipe.id)} className="flex-1 py-2 rounded-full text-sm flex items-center justify-center gap-1.5" style={{ border: `1px solid ${C.line}`, color: C.accent }}>
              <Trash2 size={14} /> Löschen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExistingPhotoPreview({ id, onRemove }) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let active = true;
    window.storage.get('photo:' + id, true).then(res => { if (active && res) setSrc(res.value); }).catch(() => {});
    return () => { active = false; };
  }, [id]);
  if (!src) return <div className="mb-3 h-24 rounded-lg animate-pulse" style={{ background: C.leafSoft }} />;
  return (
    <div className="relative mb-3">
      <img src={src} alt="" className="w-full h-40 object-cover rounded-lg" />
      <button type="button" onClick={onRemove} className="absolute top-2 right-2 p-1.5 rounded-full" style={{ background: 'rgba(30,46,34,0.7)', color: '#fff' }}><X size={14} /></button>
    </div>
  );
}

function IngredientRow({ ing, onChange, onRemove, foodLibrary }) {
  const [showSuggest, setShowSuggest] = useState(false);
  const q = ing.name.trim().toLowerCase();
  const suggestions = q.length > 0 ? foodLibrary.filter(p => p.name.toLowerCase().includes(q)).slice(0, 6) : [];
  function pick(p) {
    onChange({ ...ing, name: p.name, isPlant: p.isPlant, cat: p.cat, quarter: p.isPlant ? p.quarter : false, perHundred: p.perHundred });
    setShowSuggest(false);
  }
  const nutrients = ingredientNutrients(ing);
  return (
    <div className="rounded-lg p-2.5" style={{ background: C.card, border: `1px solid ${C.line}` }}>
      <div className="flex gap-2">
        <div className="flex-1 min-w-0 relative">
          <input value={ing.name}
            onChange={e => { onChange({ ...ing, name: e.target.value, isPlant: false, cat: undefined, quarter: false, perHundred: null }); setShowSuggest(true); }}
            onFocus={() => setShowSuggest(true)}
            onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
            placeholder="Zutat" className="w-full px-2 py-1.5 rounded text-sm"
            style={{ background: C.page, border: `1px solid ${C.line}` }} />
          {showSuggest && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 rounded-lg overflow-hidden z-10 scroll-thin" style={{ background: C.card, border: `1px solid ${C.line}`, maxHeight: 220, overflowY: 'auto' }}>
              {suggestions.map(p => (
                <button key={p.name} type="button" onMouseDown={() => pick(p)}
                  className="w-full text-left px-2.5 py-1.5 text-sm flex items-center gap-2">
                  <span className="inline-block rounded-full shrink-0" style={{ width: 7, height: 7, background: CATEGORY_META[p.cat].color }} />
                  {p.name}{p.quarter ? ' · ¼' : ''}
                </button>
              ))}
            </div>
          )}
        </div>
        <input value={ing.amount} onChange={e => onChange({ ...ing, amount: e.target.value })} placeholder="Menge"
          className="w-16 px-2 py-1.5 rounded text-sm f-mono" style={{ background: C.page, border: `1px solid ${C.line}` }} />
        <select value={ing.unit} onChange={e => onChange({ ...ing, unit: e.target.value })}
          className="w-20 px-1 py-1.5 rounded text-sm" style={{ background: C.page, border: `1px solid ${C.line}` }}>
          {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-3 mt-2 flex-wrap">
        <label className="flex items-center gap-1.5 text-xs" style={{ color: ing.isPlant ? (CATEGORY_META[ing.cat]?.color || C.leaf) : C.inkSoft }}>
          <input type="checkbox" checked={!!ing.isPlant} onChange={e => onChange({ ...ing, isPlant: e.target.checked })} />
          <Leaf size={12} /> pflanzlich{ing.isPlant && ing.cat ? ` · ${CATEGORY_META[ing.cat].label}${ing.quarter ? ' (¼)' : ''}` : ''}
        </label>
        <button type="button" onClick={onRemove} className="ml-auto" style={{ color: C.accent }}><Trash2 size={13} /></button>
      </div>
      {nutrients.computed ? (
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs f-mono" style={{ color: C.inkSoft }}>
          <span>≈ {Math.round(nutrients.kcal)} kcal</span>
          <span>{Math.round(nutrients.protein)}g Eiw.</span>
          <span>{Math.round(nutrients.fat)}g Fett</span>
          <span>{Math.round(nutrients.carbs)}g KH</span>
          <span>{Math.round(nutrients.fiber * 10) / 10}g BS</span>
          <span style={{ color: C.leaf }}>· aus Nährwerttabelle</span>
        </div>
      ) : (
        <details className="mt-2">
          <summary className="text-xs cursor-pointer" style={{ color: C.inkSoft }}>
            Nährwerte für diese Menge {ing.perHundred ? '(Einheit „Stück"/„Bund" – bitte manuell ergänzen)' : '(optional)'}
          </summary>
          <div className="grid grid-cols-5 gap-1.5 mt-1.5">
            {[['kcal', 'kcal'], ['protein', 'Eiw. g'], ['fat', 'Fett g'], ['carbs', 'KH g'], ['fiber', 'BS g']].map(([field, label]) => (
              <input key={field} value={ing[field]} onChange={e => onChange({ ...ing, [field]: e.target.value })} placeholder={label}
                className="w-full px-1.5 py-1 rounded text-xs f-mono" style={{ background: C.page, border: `1px solid ${C.line}` }} />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

function IngredientCompactRow({ ing, onExpand }) {
  return (
    <button type="button" onClick={onExpand} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left"
      style={{ background: C.card, border: `1px solid ${C.line}` }}>
      {ing.isPlant && <Leaf size={11} style={{ color: CATEGORY_META[ing.cat]?.color || C.leaf }} className="shrink-0" />}
      <span className="flex-1 text-sm truncate">{ing.name}</span>
      <span className="text-xs f-mono shrink-0" style={{ color: C.inkSoft }}>{ing.amount} {ing.unit}</span>
    </button>
  );
}

function IngredientQuickAdd({ foodLibrary, onAdd }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('g');
  const [matched, setMatched] = useState(null);
  const [showSuggest, setShowSuggest] = useState(false);
  const q = name.trim().toLowerCase();
  const suggestions = q.length > 0 ? foodLibrary.filter(p => p.name.toLowerCase().includes(q)).slice(0, 6) : [];
  function pick(p) {
    setName(p.name);
    setMatched(p);
    setShowSuggest(false);
  }
  function submit() {
    if (!name.trim()) return;
    onAdd({
      ...EMPTY_ING(), name: name.trim(), amount, unit,
      isPlant: matched ? matched.isPlant : false,
      cat: matched ? matched.cat : undefined,
      quarter: matched ? matched.quarter : false,
      perHundred: matched ? matched.perHundred : null,
    });
    setName(''); setAmount(''); setMatched(null);
  }
  return (
    <div className="rounded-lg p-2.5" style={{ background: C.leafSoft, border: `1px solid ${C.line}` }}>
      <div className="flex gap-2">
        <div className="flex-1 min-w-0 relative">
          <input value={name}
            onChange={e => { setName(e.target.value); setMatched(null); setShowSuggest(true); }}
            onFocus={() => setShowSuggest(true)}
            onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
            placeholder="Nächste Zutat …" className="w-full px-2 py-1.5 rounded text-sm"
            style={{ background: C.page, border: `1px solid ${C.line}` }} />
          {showSuggest && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 rounded-lg overflow-hidden z-10 scroll-thin" style={{ background: C.card, border: `1px solid ${C.line}`, maxHeight: 220, overflowY: 'auto' }}>
              {suggestions.map(p => (
                <button key={p.name} type="button" onMouseDown={() => pick(p)} className="w-full text-left px-2.5 py-1.5 text-sm flex items-center gap-2">
                  <span className="inline-block rounded-full shrink-0" style={{ width: 7, height: 7, background: CATEGORY_META[p.cat].color }} />
                  {p.name}{p.quarter ? ' · ¼' : ''}
                </button>
              ))}
            </div>
          )}
        </div>
        <input value={amount} onChange={e => setAmount(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }} placeholder="Menge"
          className="w-16 px-2 py-1.5 rounded text-sm f-mono" style={{ background: C.page, border: `1px solid ${C.line}` }} />
        <select value={unit} onChange={e => setUnit(e.target.value)} className="w-20 px-1 py-1.5 rounded text-sm" style={{ background: C.page, border: `1px solid ${C.line}` }}>
          {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
        <button type="button" onClick={submit} disabled={!name.trim()} className="p-2 rounded-lg shrink-0" style={{ background: name.trim() ? C.leaf : C.line, color: '#fff' }}>
          <Plus size={16} />
        </button>
      </div>
      {matched && (
        <div className="mt-1.5 text-xs f-mono" style={{ color: C.leaf }}>
          erkannt: {CATEGORY_META[matched.cat]?.label || matched.cat}{matched.isPlant && matched.quarter ? ' · ¼ Punkt' : ''}
        </div>
      )}
    </div>
  );
}

function RecipeEditor({ draft, onChange, onCancel, onSave, foodLibrary }) {
  const [expandedIngId, setExpandedIngId] = useState(null);
  function updateIngFull(id, updated) {
    onChange({ ...draft, ingredients: draft.ingredients.map(i => (i.id === id ? { ...updated, id } : i)) });
  }
  function addIng(ing) {
    onChange({ ...draft, ingredients: [...draft.ingredients, ing] });
    setExpandedIngId(null);
  }
  function removeIng(id) {
    onChange({ ...draft, ingredients: draft.ingredients.filter(i => i.id !== id) });
  }
  const totals = draft.ingredients.reduce((acc, i) => {
    const n = ingredientNutrients(i);
    acc.kcal += n.kcal; acc.protein += n.protein; acc.fat += n.fat; acc.carbs += n.carbs; acc.fiber += n.fiber;
    return acc;
  }, { kcal: 0, protein: 0, fat: 0, carbs: 0, fiber: 0 });
  const servings = Math.max(1, num(draft.servings) || 1);

  return (
    <div className="fixed inset-0 z-20 flex items-end md:items-center justify-center" style={{ background: 'rgba(30,46,34,0.45)' }}>
      <div className="w-full md:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl md:rounded-2xl p-5" style={{ background: C.page }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="f-display text-xl" style={{ fontWeight: 600 }}>{!draft.isNew ? 'Rezept bearbeiten' : 'Neues Rezept'}</h2>
          <button onClick={onCancel} style={{ color: C.inkSoft }}><X size={20} /></button>
        </div>

        <label className="text-xs f-mono" style={{ color: C.inkSoft }}>Name</label>
        <input value={draft.name} onChange={e => onChange({ ...draft, name: e.target.value })}
          placeholder="z. B. Kichererbsen-Curry" className="w-full mt-1 mb-3 px-3 py-2 rounded-lg text-sm"
          style={{ background: C.card, border: `1px solid ${C.line}` }} />

        <div className="flex gap-3 mb-3">
          <div>
            <label className="text-xs f-mono" style={{ color: C.inkSoft }}>Portionen</label>
            <input type="number" min="1" value={draft.servings} onChange={e => onChange({ ...draft, servings: e.target.value })}
              className="w-20 mt-1 px-3 py-2 rounded-lg text-sm block" style={{ background: C.card, border: `1px solid ${C.line}` }} />
          </div>
          <div className="flex-1">
            <label className="text-xs f-mono" style={{ color: C.inkSoft }}>Kategorie</label>
            <select value={draft.category || ''} onChange={e => onChange({ ...draft, category: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg text-sm" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <option value="">– wählen –</option>
              {RECIPE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <label className="text-xs f-mono block mb-1" style={{ color: C.inkSoft }}>Foto</label>
        {draft.photoDataUrl ? (
          <div className="relative mb-3">
            <img src={draft.photoDataUrl} alt="" className="w-full h-40 object-cover rounded-lg" />
            <button type="button" onClick={() => onChange({ ...draft, photoDataUrl: null, hasPhoto: false, removePhoto: true })}
              className="absolute top-2 right-2 p-1.5 rounded-full" style={{ background: 'rgba(30,46,34,0.7)', color: '#fff' }}><X size={14} /></button>
          </div>
        ) : draft.hasPhoto ? (
          <ExistingPhotoPreview id={draft.id} onRemove={() => onChange({ ...draft, hasPhoto: false, removePhoto: true })} />
        ) : (
          <label className="mb-3 flex items-center justify-center gap-2 h-24 rounded-lg text-sm cursor-pointer" style={{ background: C.card, border: `1px dashed ${C.line}`, color: C.inkSoft }}>
            <Camera size={16} /> Foto hinzufügen
            <input type="file" accept="image/*" className="hidden" onChange={e => handlePhotoFile(e, onChange, draft)} />
          </label>
        )}

        <div className="mt-4 mb-2">
          <span className="text-xs f-mono" style={{ color: C.inkSoft }}>Zutaten</span>
        </div>
        <IngredientQuickAdd foodLibrary={foodLibrary} onAdd={addIng} />

        <div className="space-y-1.5 mt-2">
          {draft.ingredients.map(ing => (
            expandedIngId === ing.id ? (
              <div key={ing.id}>
                <IngredientRow ing={ing} onChange={updated => updateIngFull(ing.id, updated)}
                  onRemove={() => { removeIng(ing.id); setExpandedIngId(null); }} foodLibrary={foodLibrary} />
                <button type="button" onClick={() => setExpandedIngId(null)} className="mt-1 text-xs" style={{ color: C.leaf }}>fertig, einklappen ✓</button>
              </div>
            ) : (
              <IngredientCompactRow key={ing.id} ing={ing} onExpand={() => setExpandedIngId(ing.id)} />
            )
          ))}
        </div>

        {totals.kcal > 0 && (
          <div className="mt-3 px-3 py-2 rounded-lg text-xs f-mono flex gap-3" style={{ background: C.leafSoft, color: C.leaf }}>
            <span>pro Portion: {Math.round(totals.kcal / servings)} kcal</span>
            <span>{Math.round(totals.protein / servings)}g Eiw.</span>
            <span>{Math.round(totals.fat / servings)}g Fett</span>
            <span>{Math.round(totals.carbs / servings)}g KH</span>
            <span>{Math.round((totals.fiber / servings) * 10) / 10}g BS</span>
          </div>
        )}

        <label className="text-xs f-mono block mt-4" style={{ color: C.inkSoft }}>Zubereitung</label>
        <textarea value={draft.instructions} onChange={e => onChange({ ...draft, instructions: e.target.value })}
          rows={4} className="w-full mt-1 px-3 py-2 rounded-lg text-sm" style={{ background: C.card, border: `1px solid ${C.line}` }} />

        <div className="flex gap-2 mt-5">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-full text-sm" style={{ border: `1px solid ${C.line}`, color: C.inkSoft }}>Abbrechen</button>
          <button onClick={onSave} disabled={!draft.name.trim()} className="flex-1 py-2.5 rounded-full text-sm"
            style={{ background: draft.name.trim() ? C.ink : C.line, color: C.page }}>Speichern</button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ text, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center p-4" style={{ background: 'rgba(30,46,34,0.45)' }}>
      <div className="w-full max-w-sm rounded-2xl p-5" style={{ background: C.page }}>
        <p className="text-sm mb-4">{text}</p>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-2 rounded-full text-sm" style={{ border: `1px solid ${C.line}` }}>Abbrechen</button>
          <button onClick={onConfirm} className="flex-1 py-2 rounded-full text-sm" style={{ background: C.accent, color: '#fff' }}>Löschen</button>
        </div>
      </div>
    </div>
  );
}

function MealSlotInput({ value, recipes, onChange }) {
  const matchedRecipe = recipes.find(r => r.id === value);
  const [text, setText] = useState(matchedRecipe ? matchedRecipe.name : (value || ''));
  const [showSuggest, setShowSuggest] = useState(false);
  const justPicked = useRef(false);
  useEffect(() => {
    const m = recipes.find(r => r.id === value);
    setText(m ? m.name : (value || ''));
  }, [value]);
  const q = text.trim().toLowerCase();
  const suggestions = (q.length > 0 ? recipes.filter(r => r.name.toLowerCase().includes(q)) : recipes).slice(0, 6);
  function pick(r) {
    justPicked.current = true;
    onChange(r.id);
    setText(r.name);
    setShowSuggest(false);
  }
  function commit() {
    const exact = recipes.find(r => r.name.toLowerCase() === text.trim().toLowerCase());
    onChange(exact ? exact.id : text.trim());
  }
  function handleBlur() {
    setTimeout(() => {
      setShowSuggest(false);
      if (justPicked.current) { justPicked.current = false; return; }
      commit();
    }, 150);
  }
  return (
    <div className="relative flex-1 min-w-0">
      <div className="flex items-center gap-1">
        <input value={text}
          onChange={e => { setText(e.target.value); setShowSuggest(true); }}
          onFocus={() => setShowSuggest(true)}
          onBlur={handleBlur}
          placeholder="Rezept oder eigener Text …"
          className="flex-1 min-w-0 px-2 py-1.5 rounded-lg text-sm" style={{ background: C.page, border: `1px solid ${C.line}` }} />
        {text && (
          <button type="button" onMouseDown={() => { justPicked.current = true; setText(''); onChange(''); }} style={{ color: C.inkSoft }}><X size={14} /></button>
        )}
      </div>
      {showSuggest && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 rounded-lg overflow-hidden z-10 scroll-thin" style={{ background: C.card, border: `1px solid ${C.line}`, maxHeight: 200, overflowY: 'auto' }}>
          {suggestions.map(r => (
            <button key={r.id} type="button" onMouseDown={() => pick(r)} className="w-full text-left px-2.5 py-1.5 text-sm">{r.name}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function PlanTab({ monday, weekOffset, setWeekOffset, recipes, recipesById, weekAssignments, onAssign, templates, onSaveTemplate, onApplyTemplate, onDeleteTemplate }) {
  const [showSave, setShowSave] = useState(false);
  const [showList, setShowList] = useState(false);
  const [name, setName] = useState('');
  function submitSave() {
    if (!name.trim()) return;
    onSaveTemplate(name);
    setName('');
    setShowSave(false);
  }
  return (
    <div>
      <WeekNav monday={monday} weekOffset={weekOffset} setWeekOffset={setWeekOffset} />

      {recipes.length === 0 && (
        <p className="text-sm text-center mb-3" style={{ color: C.inkSoft }}>Noch keine Rezepte im Buch – ihr könnt hier trotzdem schon eigenen Text eintragen.</p>
      )}

      <div className="space-y-2">
        {DAYS.map((day, idx) => {
          const dayMeals = weekAssignments[DAYS_SHORT[idx]] || {};
          const dayPts = pointsForMap(plantsForDay(dayMeals, recipesById));
          const dayNut = Object.values(dayMeals).reduce((acc, rid) => {
            const r = recipesById[rid];
            if (!r) return acc;
            const n = recipePerServing(r);
            acc.protein += n.protein; acc.fiber += n.fiber;
            return acc;
          }, { protein: 0, fiber: 0 });
          const hasAny = Object.values(dayMeals).some(Boolean);
          return (
            <div key={day} className="rounded-xl p-3" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <div className="flex items-center justify-between mb-2 flex-wrap gap-x-3 gap-y-1">
                <div className="f-display text-sm" style={{ fontWeight: 600 }}>{day}</div>
                {hasAny && (
                  <div className="flex items-center gap-2.5 text-xs f-mono" style={{ color: C.inkSoft }}>
                    <span className="flex items-center gap-1" style={{ color: C.leaf }}><Leaf size={11} />{formatPoints(dayPts)}</span>
                    <span>{Math.round(dayNut.protein)}g Eiw.</span>
                    <span>{Math.round(dayNut.fiber * 10) / 10}g BS</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {MEALS.map(meal => (
                  <div key={meal} className="flex items-center gap-2">
                    <span className="text-xs w-20 shrink-0 f-mono" style={{ color: C.inkSoft }}>{meal}</span>
                    <MealSlotInput
                      value={weekAssignments[DAYS_SHORT[idx]]?.[meal] || ''}
                      recipes={recipes}
                      onChange={v => onAssign(DAYS_SHORT[idx], meal, v)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mt-4 mb-3">
        <button onClick={() => { setShowSave(s => !s); setShowList(false); }} className="flex-1 py-2 rounded-full text-sm" style={{ background: C.ink, color: C.page }}>
          Als Vorlage speichern
        </button>
        <button onClick={() => { setShowList(s => !s); setShowSave(false); }} className="flex-1 py-2 rounded-full text-sm" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
          Vorlage anwenden{templates.length > 0 ? ` (${templates.length})` : ''}
        </button>
      </div>

      {showSave && (
        <div className="rounded-xl p-3 mb-3 flex gap-2" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name, z. B. Standardwoche"
            className="flex-1 min-w-0 px-2 py-1.5 rounded text-sm" style={{ background: C.page, border: `1px solid ${C.line}` }} autoFocus />
          <button onClick={submitSave} disabled={!name.trim()} className="px-3 py-1.5 rounded-full text-sm shrink-0" style={{ background: name.trim() ? C.ink : C.line, color: C.page }}>Speichern</button>
        </div>
      )}

      {showList && (
        <div className="rounded-xl overflow-hidden mb-3" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          {templates.length === 0 ? (
            <p className="text-sm text-center py-6" style={{ color: C.inkSoft }}>Noch keine Vorlage gespeichert.</p>
          ) : templates.map((t, i) => (
            <div key={t.id} className="flex items-center gap-2 px-4 py-3" style={{ borderTop: i > 0 ? `1px solid ${C.line}` : 'none' }}>
              <span className="flex-1 text-sm">{t.name}</span>
              <button onClick={() => { onApplyTemplate(t.id); setShowList(false); }} className="text-xs px-2.5 py-1 rounded-full" style={{ background: C.leafSoft, color: C.leaf }}>anwenden</button>
              <button onClick={() => onDeleteTemplate(t.id)} style={{ color: C.accent }}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddExtraForm({ onAdd, onClose, foodLibrary }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('g');
  const [section, setSection] = useState('Nicht-gekühlte Sachen');
  const [showSuggest, setShowSuggest] = useState(false);
  const [matched, setMatched] = useState(null);
  const q = name.trim().toLowerCase();
  const suggestions = q.length > 0 ? foodLibrary.filter(p => p.name.toLowerCase().includes(q)).slice(0, 6) : [];
  function pick(p) {
    setName(p.name);
    setSection(sectionForName(p.name, p.cat));
    setMatched(p);
    setShowSuggest(false);
  }
  function submit() {
    if (!name.trim()) return;
    onAdd({
      id: uid(), name: name.trim(), amount, unit, section,
      isPlant: matched ? matched.isPlant : false,
      cat: matched ? matched.cat : undefined,
      quarter: matched ? matched.quarter : false,
    });
    onClose();
  }
  return (
    <div className="rounded-xl p-3 mb-4" style={{ background: C.card, border: `1px solid ${C.line}` }}>
      <div className="flex gap-2 mb-2">
        <div className="flex-1 min-w-0 relative">
          <input value={name}
            onChange={e => { setName(e.target.value); setMatched(null); setShowSuggest(true); }}
            onFocus={() => setShowSuggest(true)}
            onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
            placeholder="Artikel, z. B. Klopapier" className="w-full px-2 py-1.5 rounded text-sm"
            style={{ background: C.page, border: `1px solid ${C.line}` }} autoFocus />
          {showSuggest && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 rounded-lg overflow-hidden z-10 scroll-thin" style={{ background: C.card, border: `1px solid ${C.line}`, maxHeight: 220, overflowY: 'auto' }}>
              {suggestions.map(p => (
                <button key={p.name} type="button" onMouseDown={() => pick(p)}
                  className="w-full text-left px-2.5 py-1.5 text-sm">{p.name}</button>
              ))}
            </div>
          )}
        </div>
        <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Menge"
          className="w-16 px-2 py-1.5 rounded text-sm f-mono" style={{ background: C.page, border: `1px solid ${C.line}` }} />
        <select value={unit} onChange={e => setUnit(e.target.value)}
          className="w-20 px-1 py-1.5 rounded text-sm" style={{ background: C.page, border: `1px solid ${C.line}` }}>
          {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
      <select value={section} onChange={e => setSection(e.target.value)}
        className="w-full mb-2 px-2 py-1.5 rounded text-sm" style={{ background: C.page, border: `1px solid ${C.line}` }}>
        {STORE_SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <div className="flex gap-2">
        <button onClick={onClose} className="flex-1 py-1.5 rounded-full text-sm" style={{ border: `1px solid ${C.line}`, color: C.inkSoft }}>Abbrechen</button>
        <button onClick={submit} disabled={!name.trim()} className="flex-1 py-1.5 rounded-full text-sm" style={{ background: name.trim() ? C.ink : C.line, color: C.page }}>Hinzufügen</button>
      </div>
    </div>
  );
}

function ShoppingTab({ monday, weekOffset, setWeekOffset, items, extras, checked, overrides, onToggle, onAddExtra, onRemoveExtra, onUpdateExtra, onSetOverride, foodLibrary }) {
  const [showAdd, setShowAdd] = useState(false);

  const grouped = STORE_SECTIONS.map(section => {
    const recipeItems = items.filter(item => sectionForName(item.name, item.cat) === section)
      .map(item => {
        const key = `${item.name.toLowerCase()}|${item.unit}`;
        const override = overrides[key];
        return { ...item, key, removable: false, amount: override !== undefined ? override : item.amount };
      });
    const extraItems = extras.filter(item => (item.section || 'Nicht-gekühlte Sachen') === section)
      .map(item => ({ ...item, key: `extra:${item.id}`, removable: true }));
    return { section, entries: [...recipeItems, ...extraItems] };
  }).filter(g => g.entries.length > 0);

  const isEmpty = grouped.length === 0;

  return (
    <div>
      <WeekNav monday={monday} weekOffset={weekOffset} setWeekOffset={setWeekOffset} />

      {showAdd ? (
        <AddExtraForm onAdd={onAddExtra} onClose={() => setShowAdd(false)} foodLibrary={foodLibrary} />
      ) : (
        <button onClick={() => setShowAdd(true)} className="mb-4 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm" style={{ background: C.ink, color: C.page }}>
          <Plus size={15} /> Artikel
        </button>
      )}

      {isEmpty ? (
        <p className="text-sm text-center py-10" style={{ color: C.inkSoft }}>Für diese Woche ist noch nichts eingeplant — die Liste füllt sich automatisch, sobald ihr im Wochenplan Rezepte zuweist, oder fügt oben einen Artikel manuell hinzu.</p>
      ) : (
        <div className="space-y-4">
          {grouped.map(({ section, entries }) => (
            <div key={section}>
              <div className="text-xs f-mono mb-1.5 px-1" style={{ color: C.inkSoft }}>{section}</div>
              <div className="rounded-xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                {entries.map((item, i) => {
                  const isChecked = !!checked[item.key];
                  return (
                    <div key={item.key} className="flex items-center gap-2 px-4 py-3"
                      style={{ borderTop: i > 0 ? `1px solid ${C.line}` : 'none', opacity: isChecked ? 0.45 : 1 }}>
                      <input type="checkbox" checked={isChecked} onChange={() => onToggle(item.key)} className="shrink-0" />
                      {item.isPlant && <Leaf size={13} style={{ color: C.leaf }} className="shrink-0" />}
                      <span className="flex-1 text-sm min-w-0" style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>{item.name}</span>
                      <input value={item.amount === 0 ? '' : item.amount}
                        onChange={e => {
                          const v = e.target.value === '' ? '' : num(e.target.value);
                          if (item.removable) onUpdateExtra(item.id, { amount: v });
                          else onSetOverride(item.key, v === '' ? '' : v);
                        }}
                        placeholder="0" className="w-12 px-1 py-1 rounded text-xs f-mono text-right shrink-0"
                        style={{ background: C.page, border: `1px solid ${C.line}` }} />
                      <span className="text-xs f-mono shrink-0" style={{ color: C.inkSoft, width: 28 }}>{item.unit}</span>
                      {item.removable && (
                        <button onClick={() => onRemoveExtra(item.id)} style={{ color: C.accent }} className="shrink-0"><X size={14} /></button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StreakRow({ streak }) {
  if (streak <= 0) {
    return <p className="text-sm mb-3" style={{ color: C.inkSoft }}>Noch kein Streak – schafft diese Woche 30 Punkte, um zu starten. 🌱</p>;
  }
  const flames = '🔥'.repeat(Math.min(streak, 6));
  return (
    <div className="flex items-center gap-2 mb-3">
      <span style={{ fontSize: '20px' }}>{flames}</span>
      <span className="text-sm f-mono" style={{ color: C.leaf }}>{streak} {streak === 1 ? 'Woche' : 'Wochen'} in Folge Ziel erreicht</span>
    </div>
  );
}

function PointsRing({ map, goal }) {
  const size = 160, stroke = 16, r = (size - stroke) / 2, cx = size / 2, cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const totals = {};
  map.forEach(p => { totals[p.cat] = (totals[p.cat] || 0) + (p.quarter ? 0.25 : 1); });
  let cumulative = 0;
  const segs = [];
  CATEGORY_ORDER.forEach(cat => {
    const pts = totals[cat] || 0;
    if (pts <= 0 || cumulative >= circumference) return;
    let length = (pts / goal) * circumference;
    if (cumulative + length > circumference) length = circumference - cumulative;
    segs.push({ cat, length, offset: cumulative });
    cumulative += length;
  });
  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.leafSoft} strokeWidth={stroke} />
      {segs.map(s => (
        <circle key={s.cat} cx={cx} cy={cy} r={r} fill="none" stroke={CATEGORY_META[s.cat].color} strokeWidth={stroke}
          strokeDasharray={`${s.length} ${circumference - s.length}`} strokeDashoffset={-s.offset}
          strokeLinecap="butt" transform={`rotate(-90 ${cx} ${cy})`} />
      ))}
    </svg>
  );
}

function TrendBars({ data, goal }) {
  const max = Math.max(goal, ...data.map(d => d.pts), 1);
  return (
    <div className="flex items-end gap-1.5 h-20">
      {data.map(d => (
        <div key={d.key} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t" style={{ height: `${Math.max(4, (d.pts / max) * 64)}px`, background: d.pts >= goal ? C.leaf : C.leafSoft }} />
          <span className="f-mono" style={{ fontSize: '9px', color: C.inkSoft }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function PlantPicker({ manualSet, autoKeys, onToggle, plantLibrary, onAddCustomPlant }) {
  const [query, setQuery] = useState('');
  const [addingCat, setAddingCat] = useState(null);
  const [newName, setNewName] = useState('');
  const q = query.trim().toLowerCase();
  function submitAdd(cat) {
    if (!newName.trim()) return;
    onAddCustomPlant(cat, newName.trim(), cat === 'extras');
    setNewName('');
    setAddingCat(null);
  }
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg" style={{ background: C.card, border: `1px solid ${C.line}` }}>
        <Search size={14} style={{ color: C.inkSoft }} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Pflanze suchen …" className="flex-1 text-sm outline-none" style={{ background: 'transparent' }} />
      </div>
      {CATEGORY_ORDER.map(cat => {
        const items = plantLibrary.filter(p => p.cat === cat && (!q || p.name.toLowerCase().includes(q)));
        if (items.length === 0 && q) return null;
        const meta = CATEGORY_META[cat];
        return (
          <div key={cat} className="mb-3">
            <div className="text-xs f-mono mb-1.5 flex items-center gap-1.5" style={{ color: meta.color }}>
              <span className="inline-block rounded-full" style={{ width: 8, height: 8, background: meta.color }} />
              {meta.label}{cat === 'extras' ? ' · ¼ Punkt' : ''}
            </div>
            <div className="flex flex-wrap gap-1.5 items-center">
              {items.map(p => {
                const key = p.name.toLowerCase();
                const isManual = !!manualSet[key];
                const isAuto = autoKeys.has(key);
                const active = isManual || isAuto;
                return (
                  <button key={p.name} onClick={() => onToggle(key)}
                    className="px-2.5 py-1 rounded-full text-xs flex items-center gap-1"
                    style={active ? { background: meta.color, color: '#fff' } : { background: C.card, border: `1px solid ${C.line}`, color: C.ink }}>
                    {p.name}{isAuto && <span style={{ fontSize: '10px' }}>🍽</span>}
                  </button>
                );
              })}
              {addingCat === cat ? (
                <div className="flex items-center gap-1">
                  <input value={newName} onChange={e => setNewName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') submitAdd(cat); if (e.key === 'Escape') setAddingCat(null); }}
                    placeholder="Name" autoFocus
                    className="w-24 px-2 py-1 rounded-full text-xs" style={{ background: C.page, border: `1px solid ${C.line}` }} />
                  <button onClick={() => submitAdd(cat)} className="px-2 py-1 rounded-full text-xs" style={{ background: meta.color, color: '#fff' }}>OK</button>
                </div>
              ) : (
                <button onClick={() => { setAddingCat(cat); setNewName(''); }}
                  className="px-2 py-1 rounded-full text-xs flex items-center gap-0.5" style={{ border: `1px dashed ${C.line}`, color: C.inkSoft }}>
                  <Plus size={11} /> eigene
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BadgesGrid({ stats }) {
  const badges = getBadges(stats);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {badges.map(b => (
        <div key={b.id} className="rounded-lg p-3 flex flex-col items-center text-center gap-1"
          style={{ background: b.earned ? C.leafSoft : C.card, border: `1px solid ${C.line}`, opacity: b.earned ? 1 : 0.55 }}>
          <span style={{ fontSize: '22px' }}>{b.earned ? b.emoji : '🔒'}</span>
          <span className="text-xs leading-tight">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

function PointsTab({ monday, weekOffset, setWeekOffset, plantMap, autoKeys, manualSet, onTogglePlant, stats, trend, plantLibrary, onAddCustomPlant }) {
  const total = pointsForMap(plantMap);
  const usedCats = CATEGORY_ORDER.filter(cat => Array.from(plantMap.values()).some(p => p.cat === cat));
  return (
    <div>
      <WeekNav monday={monday} weekOffset={weekOffset} setWeekOffset={setWeekOffset} />
      <StreakRow streak={stats.streak} />

      <div className="rounded-xl p-4 mb-4 flex flex-col items-center" style={{ background: C.card, border: `1px solid ${C.line}` }}>
        <div className="relative" style={{ width: 160, height: 160 }}>
          <PointsRing map={plantMap} goal={PLANT_GOAL} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="f-display text-3xl" style={{ fontWeight: 700, color: C.leaf }}>{formatPoints(total)}</span>
            <span className="text-xs f-mono" style={{ color: C.inkSoft }}>von {PLANT_GOAL}</span>
          </div>
        </div>
        {usedCats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3">
            {usedCats.map(cat => (
              <span key={cat} className="flex items-center gap-1 text-xs" style={{ color: C.inkSoft }}>
                <span className="inline-block rounded-full" style={{ width: 7, height: 7, background: CATEGORY_META[cat].color }} />
                {CATEGORY_META[cat].label}
              </span>
            ))}
          </div>
        )}
        <p className="text-xs text-center mt-2" style={{ color: C.inkSoft }}>
          Jede Pflanzenart zählt einmal pro Woche. Gewürze, Tee, Kaffee & Olivenöl zählen ¼ Punkt.
        </p>
      </div>

      <div className="rounded-xl p-4 mb-4" style={{ background: C.card, border: `1px solid ${C.line}` }}>
        <div className="text-xs f-mono mb-2" style={{ color: C.inkSoft }}>letzte 8 Wochen</div>
        <TrendBars data={trend} goal={PLANT_GOAL} />
      </div>

      <div className="mb-2 f-display text-lg" style={{ fontWeight: 600 }}>Pflanzen dieser Woche</div>
      <PlantPicker manualSet={manualSet} autoKeys={autoKeys} onToggle={onTogglePlant} plantLibrary={plantLibrary} onAddCustomPlant={onAddCustomPlant} />

      <div className="mb-2 mt-5 f-display text-lg" style={{ fontWeight: 600 }}>Abzeichen</div>
      <BadgesGrid stats={stats} />
    </div>
  );
}

function StatCard({ label, value, sub, color }) {
  return (
    <div className="rounded-xl p-3 text-center" style={{ background: C.card, border: `1px solid ${C.line}` }}>
      <div className="f-display text-xl" style={{ fontWeight: 700, color }}>{value}</div>
      <div className="text-xs f-mono mt-0.5" style={{ color: C.inkSoft }}>{label}</div>
      {sub && <div className="text-xs" style={{ color: C.inkSoft, opacity: 0.7 }}>{sub}</div>}
    </div>
  );
}

const PROTEIN_GOAL_DAILY = 100;
const FIBER_GOAL_DAILY = 30;

function ReportTab({ monday, weekOffset, setWeekOffset, weekAssignments, recipesById, plantMap }) {
  const weekPts = pointsForMap(plantMap);
  let weekProtein = 0, weekFiber = 0;
  const dayRows = DAYS.map((day, idx) => {
    const dayMeals = weekAssignments[DAYS_SHORT[idx]] || {};
    const dPts = pointsForMap(plantsForDay(dayMeals, recipesById));
    const dNut = Object.values(dayMeals).reduce((acc, rid) => {
      const r = recipesById[rid];
      if (!r) return acc;
      const n = recipePerServing(r);
      acc.protein += n.protein; acc.fiber += n.fiber;
      return acc;
    }, { protein: 0, fiber: 0 });
    weekProtein += dNut.protein; weekFiber += dNut.fiber;
    return { day, pts: dPts, ...dNut, hasAny: Object.values(dayMeals).some(Boolean) };
  });
  const avgProtein = weekProtein / 7;
  const avgFiber = weekFiber / 7;

  return (
    <div>
      <WeekNav monday={monday} weekOffset={weekOffset} setWeekOffset={setWeekOffset} />

      <div className="grid grid-cols-3 gap-2 mb-2">
        <StatCard label="PlantPoints" value={formatPoints(weekPts)} sub={`Woche · Ziel ${PLANT_GOAL}`} color={C.leaf} />
        <StatCard label="Eiweiß" value={`${Math.round(avgProtein)}g`} sub={`⌀/Tag · Ziel ${PROTEIN_GOAL_DAILY}g`} color={avgProtein >= PROTEIN_GOAL_DAILY ? C.leaf : C.accent} />
        <StatCard label="Ballaststoffe" value={`${Math.round(avgFiber)}g`} sub={`⌀/Tag · Ziel ${FIBER_GOAL_DAILY}g`} color={avgFiber >= FIBER_GOAL_DAILY ? C.leaf : C.gold} />
      </div>
      <p className="text-xs mb-4 px-1" style={{ color: C.inkSoft }}>
        Jede Pflanzenart zählt für die Wochensumme nur einmal — auch wenn sie an mehreren Tagen vorkommt. Eiweiß und Ballaststoffe sind der Tagesdurchschnitt über die ganze Woche (Wochensumme ÷ 7), pro geplanter Portion für eine Person.
      </p>

      <div className="rounded-xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.line}` }}>
        {dayRows.map((d, i) => (
          <div key={d.day} className="px-4 py-3 flex items-center justify-between flex-wrap gap-y-1"
            style={{ borderTop: i > 0 ? `1px solid ${C.line}` : 'none', opacity: d.hasAny ? 1 : 0.5 }}>
            <span className="text-sm f-display" style={{ fontWeight: 600 }}>{d.day}</span>
            {d.hasAny ? (
              <div className="flex gap-3 text-xs f-mono" style={{ color: C.inkSoft }}>
                <span className="flex items-center gap-1" style={{ color: C.leaf }}><Leaf size={11} />{formatPoints(d.pts)}</span>
                <span>{Math.round(d.protein)}g Eiw.</span>
                <span>{Math.round(d.fiber * 10) / 10}g BS</span>
              </div>
            ) : (
              <span className="text-xs" style={{ color: C.inkSoft }}>nichts geplant</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const rootEl = document.getElementById('root');
ReactDOM.createRoot(rootEl).render(<App />);
