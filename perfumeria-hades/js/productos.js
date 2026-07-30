/* ==========================================================================
   PRODUCTOS.JS
   --------------------------------------------------------------------------
   Aquí vive todo el catálogo de Perfumería Hades. No hay base de datos:
   cada perfume es un objeto dentro del arreglo PRODUCTOS. Las demás páginas
   (home, femeninos, masculinos, carrito) leen este mismo arreglo, así que
   basta con editarlo UNA vez para que el cambio se refleje en todo el sitio.

   CÓMO AGREGAR UN PRODUCTO NUEVO
   --------------------------------------------------------------------------
   1. Copia un objeto de ejemplo de abajo.
   2. Cambia el "id" por un número que no exista todavía.
   3. Cambia categoria a "femenino" o "masculino".
   4. Cambia nombre, descripcion y precio (número, sin puntos ni signos).
   5. Cambia imagen por la ruta del archivo dentro de /img/productos/
      (agrega tu imagen ahí primero).
   ========================================================================== */

const PRODUCTOS = [
  // ---------------------------- FEMENINOS ---------------------------------
  {
    id: 1,
    nombre: "Eclaire Lattafa",
    categoria: "femenino",
    familia: "Floral Amaderado",
    descripcion: 
    "Notas de salida: azúcar, caramelo y leche.\n" +
      "Corazón:  miel y flores blancas. \n" +
      "Base: vainilla, praliné y almizcle.",
    precios: [
      { presentacion: "Decant 5ml", precio: 17000 },
      { presentacion: "Decant 10ml", precio: 30000 },
      { presentacion: "Botella 100ml", precio: 180000 }
    ],
    imagen: "../img/productos/Eclaire-Lataffa.png",
    destacado: true
  },
  {
    id: 2,
    nombre: "Yara Lattafa",
    categoria: "femenino",
    familia: "Floral Amaderado",
    descripcion: 
    "Notas de salida: orquídea, heliotropo y naranja tangerina.\n" +
      "Corazón:  acorde goloso y frutas tropicales. \n" +
      "Base: vainilla, almizcle y sándalo.",
    precios: [
      { presentacion: "Decant 5ml", precio: 16000 },
      { presentacion: "Decant 10ml", precio: 28000 },
      { presentacion: "Botella 100ml", precio: 170000 }
    ],
    imagen: "../img/productos/Yara-Lataffa.png",
    destacado: true
  },
  {
    id: 3,
    nombre: "The Kingdom M",
    categoria: "masculino",
    familia: "Floral Amaderado",
    descripcion: 
    "Notas de salida: lavanda, menta y salvia.\n" +
      "Corazón: vainilla, tabaco, flor de azahar. \n" +
      "Base: haba tonka, benjuí y ládano.",
    precios: [
      { presentacion: "Decant 5ml", precio: 17000 },
      { presentacion: "Decant 10ml", precio: 30000 },
      { presentacion: "Botella 100ml", precio: 180000 }
    ],
    imagen: "../img/productos/The-Kingdom.png",
    destacado: true
  },
   {
    id: 4,
    nombre: "Rome Fantasmagory",
    categoria: "femenino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida:  anis y jengibre.\n" +
      "Corazón: almendra y notas florales. \n" +
      "Base: vainilla y cuero.",
    precios: [
      { presentacion: "Decant 5ml", precio: 17000 },
      { presentacion: "Decant 10ml", precio: 30000 },
      { presentacion: "Botella 100ml", precio: 180000 }
    ],
    imagen: "../img/productos/Rome-Fantasmagory.png",
    destacado: false
  },
  
  {
    id: 5,
    nombre: "Yum Yum Amarf",
    categoria: "femenino",
    familia: "Floral Amaderado",
    descripcion: 
    "Notas de salida: cereza, bergamota y bayas silvestres.\n" +
      "Corazón: rosa, flores blancas y vainilla. \n" +
      "Base:  ámbar, notas atalcadas y almizcle.",
    precios: [
      { presentacion: "Decant 5ml", precio: 20000 },
      { presentacion: "Decant 10ml", precio: 35000 },
      { presentacion: "Botella 100ml", precio: 210000 }
    ],
    imagen: "../img/productos/Yum-Armaf.png",
    destacado: true
  },
   {
    id: 6,
    nombre: "Rome Extradose Pour Femme",
    categoria: "femenino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: grosellas negras.\n" +
      "Corazón:  ron.\n" +
      "Base: vainilla ",
    precios: [
      { presentacion: "Decant 5ml", precio: 17000 },
      { presentacion: "Decant 10ml", precio: 30000 },
      { presentacion: "Botella 100ml", precio: 180000 }
    ],
    imagen: "../img/productos/Rome-Extradose-Pour.png",
    destacado: false
  },
  // ---------------------------- MASCULINOS --------------------------------
  {
    id: 7,
    nombre: "Hawas Kobra",
    categoria: "masculino",
    familia: "Fresco Amaderado",
    descripcion:
      "Notas de salida: jengibre, bergamota y naranja tangerina.\n" +
      "Corazón: te verde, canela y neroli\n" +
      "Base: almizcle, notas amaderadas y ámbar. ",
    precios: [
      { presentacion: "Decant 5ml", precio: 22000 },
      { presentacion: "Decant 10ml", precio: 37000 },
      { presentacion: "Botella 100ml", precio: 240000 }
    ],
    imagen: "../img/productos/Hawas-Kobra.png",
    destacado: true
  },
  {
    id: 8,
    nombre: "Hawas Tropical",
    categoria: "masculino",
    familia: "Aromático Fougère",
    descripcion:
      "Notas de salida: agua de coco, hojas de higuera y jengibre.\n" +
      "Corazón: coco, higo y menta.\n" +
      "Base: sándalo, haba tonka y almizcle.",
    precios: [
      { presentacion: "Decant 5ml", precio: 22000 },
      { presentacion: "Decant 10ml", precio: 37000 },
      { presentacion: "Botella 100ml", precio: 240000 }
    ],
    imagen: "../img/productos/Hawas-Tropical.png",
    destacado: true
  },
  {
    id: 9,
    nombre: "Hawas Fire",
    categoria: "masculino",
    familia: "Amaderado Intenso",
    descripcion:
      "Notas de salida: esclarea\n" +
      "Corazón: Notas marinas y jazmín egipcio.\n" +
      "Base: ámbar, notas minerales y ambar gris",
    precios: [
      { presentacion: "Decant 5ml", precio: 23000 },
      { presentacion: "Decant 10ml", precio: 38000 },
      { presentacion: "Botella 100ml", precio: 250000 }
    ],
    imagen: "../img/productos/Hawas-Fire.png",
    destacado: false
  },
  {
    id: 10,
    nombre: "Hawas Ice",
    categoria: "masculino",
    familia: "Acuático Fresco",
    descripcion: 
      "Notas de salida: manzana verde, limón italiano, bergamota de Sicilia.\n" +
      "Corazón:ciruela, cardamomo, flor de azahar. \n" +
      "Base: almizcle, musgo, trozos de madera y ámbar.",
    precios: [
      { presentacion: "Decant 5ml", precio: 23000 },
      { presentacion: "Decant 10ml", precio: 38000 },
      { presentacion: "Botella 100ml", precio: 260000 }
    ],
    imagen: "../img/productos/Hawas-Ice.png",
    destacado: false
  },
  {
    id: 11,
    nombre: "Precieux I Armaf",
    categoria: "masculino",
    familia: "Amaderado Clásico",
    descripcion: 
     "Notas de salida: piña, bergamota, caramelo y pimienta negra.\n" +
      "Corazón: anis, musgo de roble y jazmin. \n" +
      "Base: cuero, ambar, vainilla, ambroxan y cedro.",
    precios: [
      { presentacion: "Decant 5ml", precio: 35000 },
      { presentacion: "Decant 10ml", precio: 60000 },
      { presentacion: "Botella 100ml", precio: 280000 }
    ],
    imagen: "../img/productos/Precieux.png",
    destacado: true
  },
  {
    id: 12,
    nombre: "Rare Reef",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida:naranja, menta, cidra y grosellas negras.\n" +
      "Corazón: chabacano, albahaca y hojas de violeta. \n" +
      "Base: higo, almizcle ambreta y amberwood.",
    precios: [
      { presentacion: "Decant 5ml", precio: 21000 },
      { presentacion: "Decant 10ml", precio: 36000 },
      { presentacion: "Botella 100ml", precio: 200000 }
    ],
    imagen: "../img/productos/Rare-Reef.png",
    destacado: false
  },
   {
    id: 13,
    nombre: "Vulcan Feu",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: mango, limón, jengibre y ruibarbo.\n" +
      "Corazón: pimienta rosa, jazmín, violeta y praliné. \n" +
      "Base: cedro, ámbar gris, haba tonka y musgo.",
    precios: [
      { presentacion: "Decant 5ml", precio: 22000 },
      { presentacion: "Decant 10ml", precio: 37000 },
      { presentacion: "Botella 100ml", precio: 240000 }
    ],
    imagen: "../img/productos/Vulcan-Feu.png",
    destacado: false
  },
  {
    id: 14,
    nombre: "Liquid Brun",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: canela, cardamomo y bergamota.\n" +
      "Corazón: vainilla bourbon y elemí. \n" +
      "Base: praliné, ambroxan, madera de gaiac y almizcle.",
    precios: [
      { presentacion: "Decant 5ml", precio: 20000 },
      { presentacion: "Decant 10ml", precio: 35000 },
      { presentacion: "Botella 100ml", precio: 230000 }
    ],
    imagen: "../img/productos/Liquid-Brun.png",
    destacado: false
  },
  {
    id: 15,
    nombre: "Aether French",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: manzana verde, bergamota y mandarina.\n" +
      "Corazón: cedro, cachemira y violeta. \n" +
      "Base: muzgo de roble, amberwood y almizcle.",
    precios: [
      { presentacion: "Decant 5ml", precio: 22000 },
      { presentacion: "Decant 10ml", precio: 37000 },
      { presentacion: "Botella 100ml", precio: 240000 }
    ],
    imagen: "../img/productos/Aether-French.png",
    destacado: false
  },
  {
    id: 16,
    nombre: "Nitro Red",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: manzana, lavanda y bergamota.\n" +
      "Corazón: sandia, cedro y cálamo aromático. \n" +
      "Base:  ámbar, sándalo y pachulí.",
    precios: [
      { presentacion: "Decant 5ml", precio: 18000 },
      { presentacion: "Decant 10ml", precio: 32000 },
      { presentacion: "Botella 100ml", precio: 190000 }
    ],
    imagen: "../img/productos/Nitro-Red.png",
    destacado: false
  },
  {
    id: 17,
    nombre: "Dynasty Lataffa",
    categoria: "masculino",
    familia: "Floral Amaderado",
    descripcion: 
    "Notas de salida: bergamota, jengibre, frambuesa y nuez.\n" +
      "Corazón: té rooibos y gamuza.\n" +
      "Base:cedro, cachemira y amberwood.",
    precios: [
      { presentacion: "Decant 5ml", precio: 21000 },
      { presentacion: "Decant 10ml", precio: 36000 },
      { presentacion: "Botella 100ml", precio: 220000 }
    ],
    imagen: "../img/productos/Dynasty-Lattafa.png",
    destacado: true
  },


  {
    id: 18,
    nombre: "Rome Imagine",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: cidra y bergamota de calabria.\n" +
      "Corazón:  nerolí y canela.\n" +
      "Base: ambroxan y madera de gaiac.",
    precios: [
      { presentacion: "Decant 5ml", precio: 17000 },
      { presentacion: "Decant 10ml", precio: 30000 },
      { presentacion: "Botella 100ml", precio: 180000 }
    ],
    imagen: "../img/productos/Rome-Imagine.png",
    destacado: false
  },
 
  {
    id: 19,
    nombre: "Rome Extradose",
    categoria: "masculinoo",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: notas especiadas.\n" +
      "Corazón: lavanda silvestre. \n" +
      "Base: notas amaderadas.",
    precios: [
      { presentacion: "Decant 5ml", precio: 18000 },
      { presentacion: "Decant 10ml", precio: 32000 }
    
    ],
    imagen: "../img/productos/Rome-Extradose.png",
    destacado: false
  }, 
  {
    id: 20,
    nombre: "Mandaryn Sky",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: mandarina, naranja, azafran y salvia.\n" +
      "Corazón: caramelo y haba tonka. \n" +
      "Base: ambroxan, cedro y vetiver.",
    precios: [
      { presentacion: "Decant 5ml", precio: 16000 },
      { presentacion: "Decant 10ml", precio: 28000 },
      { presentacion: "Botella 100ml", precio: 170000 }
    
    ],
    imagen: "../img/productos/Mandaryn-Sky.png",
    destacado: false
  },
  {
    id: 21,
    nombre: "Momento Riiffs",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: azúcar, azafran y mandarina.\n" +
      "Corazón: haba tonka, rosa de damasco y madera de oud. \n" +
      "Base: caramelo, amberwood y cedro.",
    precios: [
      { presentacion: "Decant 5ml", precio: 17000 },
      { presentacion: "Decant 10ml", precio: 30000 },
      { presentacion: "Botella 100ml", precio: 180000 }
    
    ],
    imagen: "../img/productos/Momento-Riiffs.png",
    destacado: false
  },
  {
    id: 22,
    nombre: "Art of Universe",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: mandarina, jengibre, bergamota y menta.\n" +
      "Corazón: pera y flor de azahar del naranjo. \n" +
      "Base: almizcle, ámbar y cedro.",
    precios: [
      { presentacion: "Decant 5ml", precio: 22000 },
      { presentacion: "Decant 10ml", precio: 37000 },
      { presentacion: "Botella 100ml", precio: 240000 }
    
    ],
    imagen: "../img/productos/Art-of-Universe.png",
    destacado: false
  },
  {
    id: 23,
    nombre: "Asad Bourbon",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: lavanda, ciruela mirabel y pimienta rosa.\n" +
      "Corazón: cacao, nuez moscada y davana. \n" +
      "Base: vainilla bourbon, ambar y vetiver.",
    precios: [
      { presentacion: "Decant 5ml", precio: 17000 },
      { presentacion: "Decant 10ml", precio: 35000 },
      { presentacion: "Botella 100ml", precio: 180000 }
    
    ],
    imagen: "../img/productos/Asad-Bourbon.png",
    destacado: false
  },
  {
    id: 24,
    nombre: "Musamam White Intense",
    categoria: "femenino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: especias, bergamota y naranja.\n" +
      "Corazón: coco, ambroxan y mahonial. \n" +
      "Base: sándalo, almizcle y benjuí.",
    precios: [
      { presentacion: "Decant 5ml", precio: 20000 },
      { presentacion: "Decant 10ml", precio: 35000 },
      { presentacion: "Botella 100ml", precio: 210000 }
    
    ],
    imagen: "../img/productos/Musamam-White.png",
    destacado: false
  },
  {
    id: 25,
    nombre: "Island Khadlaj",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: piña, iris, jengibre y ciprés.\n" +
      "Corazón: coco y notas amaderadas. \n" +
      "Base: haba tonka, sándalo, ámbar y ámbar gris.",
    precios: [
      { presentacion: "Decant 5ml", precio: 18000 },
      { presentacion: "Decant 10ml", precio: 32000 },
      { presentacion: "Botella 100ml", precio: 190000 }
    
    ],
    imagen: "../img/productos/Island-Khadlaj.png",
    destacado: false
  },
  {
    id: 26,
    nombre: "Rayhann Wolf",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: cardamomo.\n" +
      "Corazón: tófe \n" +
      "Base: amberwood.",
    precios: [
      { presentacion: "Decant 5ml", precio: 20000 },
      { presentacion: "Decant 10ml", precio: 35000 },
      { presentacion: "Botella 100ml", precio: 220000 }
    
    ],
    imagen: "../img/productos/Rayhann-Wolf.png",
    destacado: false
  },
  {
    id: 27,
    nombre: "Odyssey Aqua",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: naranja, toronja y abrótano.\n" +
      "Corazón: menta y lavanda. \n" +
      "Base: ambroxan, ciprés y pachulí.",
    precios: [
      { presentacion: "Decant 5ml", precio: 17000 },
      { presentacion: "Decant 10ml", precio: 30000 },
      { presentacion: "Botella 100ml", precio: 180000 }
    
    ],
    imagen: "../img/productos/Odyssey-Aqua.png",
    destacado: false
  },
  {
    id: 28,
    nombre: "Dunescape",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: mandarina, bergamota, jengibre y salvia.\n" +
      "Corazón: manzana, notas ozonicas y rosa.\n" +
      "Base: almizcle, sándalo y ámbar.",
    precios: [
      { presentacion: "Decant 5ml", precio: 23000 },
      { presentacion: "Decant 10ml", precio: 38000 },
      { presentacion: "Botella 100ml", precio: 250000 }
    
    ],
    imagen: "../img/productos/Dunescape.png",
    destacado: false
  },

  {
    id: 29,
    nombre: "Sceptre Malachite",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: mandarina verde, bergamota y grosellas negras.\n" +
      "Corazón: lavanda, pimienta rosa y jazmín. \n" +
      "Base: vetiver, ámbar, almizcle y notas amaderada.",
    precios: [
      { presentacion: "Decant 5ml", precio: 17000 },
      { presentacion: "Decant 10ml", precio: 30000 },
      { presentacion: "Botella 100ml", precio: 180000 }
    
    ],
    imagen: "../img/productos/Sceptre-Malachite.png",
    destacado: false
  },
{
    id: 30,
    nombre: "9 PM Elixir",
    categoria: "masculino",
    familia: "Ahumado Especiado",
    descripcion:  
      "Notas de salida: cardamomo, nuez moscada y elemí..\n" +
      "Corazón:  pimienta, cuero y lavanda. \n" +
      "Base: vainilla, pachuli, ladano y heliántemo.",
    precios: [
      { presentacion: "Decant 5ml", precio: 21000 },
      { presentacion: "Decant 10ml", precio: 36000 },
      { presentacion: "Botella 100ml", precio: 220000 }
    
    ],
    imagen: "../img/productos/9Pm-Elixir.png",
    destacado: false
  },
  

];
/* --------------------------------------------------------------------------
   Utilidad: formatea un número como pesos colombianos ($189.000)
   -------------------------------------------------------------------------- */
function formatearPrecio(numero) {
  return "$" + numero.toLocaleString("es-CO");
}

/* --------------------------------------------------------------------------
   Utilidad: busca un producto por su id dentro del catálogo
   -------------------------------------------------------------------------- */
function buscarProductoPorId(id) {
  return PRODUCTOS.find((p) => p.id === Number(id)) || null;
}
