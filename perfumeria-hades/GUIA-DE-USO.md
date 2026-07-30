# Guía de uso — Perfumería Hades

Esta guía explica, en lenguaje sencillo, cómo mantener y publicar tu tienda.
No necesitas saber programar para hacer los cambios más comunes.

---

## 0. Cómo abrir el proyecto

Descomprime la carpeta `perfumeria-hades` en tu computador. Para verla
funcionando, simplemente haz doble clic en **`index.html`** — se abrirá en
tu navegador (Chrome, Edge, etc.) y todo funcionará sin instalar nada.

Para **editar** los archivos, usa un editor de texto. Se recomienda
[Visual Studio Code](https://code.visualstudio.com/) (gratis), pero
funciona incluso con el Bloc de Notas.

---

## 1. Cómo cambiar productos (nombre, descripción, familia olfativa)

Abre el archivo:

```
js/productos.js
```

Ahí verás una lista de productos, cada uno entre llaves `{ ... }`, así:

```js
{
  id: 1,
  nombre: "Noche de Perséfone",
  categoria: "femenino",
  familia: "Floral Amaderado",
  descripcion: "Granada, iris y madera de cachemira...",
  precio: 189000,
  imagen: "../img/productos/noche-persefone.svg",
  destacado: true
}
```

- Cambia el texto entre comillas de `nombre`, `familia` o `descripcion`
  por lo que quieras.
- `categoria` solo puede ser `"femenino"` o `"masculino"`.
- `destacado: true` hace que el producto aparezca en la sección
  "Productos destacados" del inicio. Pon `false` si no quieres que
  aparezca ahí.
- Guarda el archivo y recarga la página en el navegador para ver el cambio.

Para **agregar un producto nuevo**, copia un bloque completo (desde `{`
hasta `}`), pégalo antes del `];` final, y cambia el `id` por uno que no
se repita (por ejemplo, el siguiente número disponible: 13, 14...).

Para **eliminar un producto**, borra su bloque completo (de `{` a `}`,
incluyendo la coma que lo separa del siguiente).

---

## 2. Cómo modificar precios

En el mismo archivo `js/productos.js`, busca el producto y cambia el
valor de `precio`. Debe ser solo el número, sin puntos ni signo de pesos:

```js
precio: 189000,   // esto se mostrará como $189.000 automáticamente
```

---

## 3. Cómo agregar nuevas imágenes

1. Guarda tu imagen (idealmente en formato `.jpg`, `.png` o `.svg`, tamaño
   cuadrado o vertical, máximo 500 KB para que cargue rápido) dentro de la
   carpeta:
   ```
   img/productos/
   ```
2. Ponle un nombre sin espacios ni tildes, por ejemplo: `mi-perfume-nuevo.jpg`.
3. En `js/productos.js`, en el producto correspondiente, cambia la línea
   `imagen` para que apunte a tu archivo:
   ```js
   imagen: "../img/productos/mi-perfume-nuevo.jpg",
   ```
   *(el `../` es necesario porque las páginas de catálogo están dentro de
   una subcarpeta; en el archivo no tienes que preocuparte por más, el
   sitio ajusta la ruta automáticamente en la página de inicio).*

Para cambiar el **logo**, reemplaza el archivo `img/logo/logo.svg` por tu
propio logo (mismo nombre de archivo, o actualiza las rutas `<img src="...">`
en cada HTML si usas otro nombre).

---

## 4. Cómo agregar nuevas categorías

El sitio viene con dos categorías: `femenino` y `masculino`. Si quieres
agregar una tercera (por ejemplo, "Unisex" o "Niños"):

1. En `js/productos.js`, usa ese nuevo valor en `categoria`, por ejemplo
   `categoria: "unisex"`.
2. Duplica la carpeta `femeninos/` completa, renómbrala (por ejemplo
   `unisex/`) y renombra el archivo `femeninos.html` a `unisex.html`
   dentro de ella.
3. Dentro de ese nuevo HTML, busca la línea:
   ```html
   <div class="catalogo-grid" id="grid-femeninos">
   ```
   y cambia el `id` a algo único, por ejemplo `id="grid-unisex"`.
4. En `js/main.js`, dentro de la función que arranca la página (busca
   `document.addEventListener("DOMContentLoaded"`), agrega una línea
   como las que ya existen:
   ```js
   renderizarCatalogo("unisex", "grid-unisex");
   ```
5. Agrega el enlace a la nueva página en el menú de navegación (`<nav>`)
   de todos los archivos HTML, copiando el patrón de los enlaces
   existentes.

---

## 5. Cómo cambiar el número de WhatsApp

Abre el archivo:

```
js/main.js
```

En la primera parte del archivo verás:

```js
const WHATSAPP_NUMERO = "573001234567";
```

Cambia ese número por el tuyo, **con indicativo de país y sin espacios,
signos "+" ni guiones**. Ejemplo para un celular colombiano
`300 123 4567`, el valor sería `"573001234567"`.

También actualiza los enlaces de WhatsApp que aparecen en el footer de
cada página HTML (búscalos con Ctrl+F escribiendo `wa.me`) y en el ícono
de WhatsApp de la sección de beneficios, si quieres que sean consistentes.

---

## 6. Cómo subir la página a Netlify

1. Crea una cuenta gratis en [https://www.netlify.com](https://www.netlify.com).
2. Comprime toda la carpeta `perfumeria-hades` en un archivo `.zip`
   **o** simplemente ten la carpeta lista en tu computador.
3. Entra a tu panel de Netlify y busca la opción **"Add new site" →
   "Deploy manually"** (o "Sites" → arrastra la carpeta).
4. Arrastra la carpeta `perfumeria-hades` (o el `.zip`) al recuadro que
   dice "Drag and drop your site folder here".
5. En segundos, Netlify publicará tu sitio y te dará una URL gratuita
   como `https://perfumeria-hades-123abc.netlify.app`.
6. Cada vez que quieras actualizar el sitio, repite el paso 4 con la
   carpeta actualizada (Netlify también permite conectar un repositorio
   de GitHub para que se actualice automáticamente, si más adelante
   quieres esa opción).

---

## 7. Cómo conectar un dominio propio (ej. perfumeriahades.com)

1. Compra el dominio en un proveedor como Namecheap, GoDaddy o donde
   prefieras.
2. En Netlify, entra a tu sitio → **"Domain settings"** →
   **"Add a domain"** → escribe `perfumeriahades.com` → sigue el asistente.
3. Netlify te mostrará unos registros DNS (generalmente un registro
   **A** apuntando a una IP de Netlify, y un **CNAME** para `www`).
4. Entra al panel de tu proveedor de dominio, busca la sección
   **"DNS" o "Administrar DNS"**, y agrega esos registros exactamente
   como Netlify los indica.
5. Los cambios de DNS pueden tardar entre 15 minutos y 24 horas en
   propagarse. Netlify activará automáticamente un certificado SSL
   gratuito (candado 🔒) una vez el dominio esté conectado.

---

## 8. Cómo publicar la web para que cualquiera pueda entrar desde Google Chrome

Una vez completado el paso 6 (Netlify) o el paso 7 (dominio propio), tu
sitio ya es público: cualquier persona en el mundo puede escribir tu
URL de Netlify o tu dominio en la barra de direcciones de Google Chrome
(o cualquier navegador) y tu tienda se abrirá normalmente, sin que tú
tengas que hacer nada más. No necesitas contratar hosting adicional ni
servidores: Netlify se encarga de que la página esté disponible las 24
horas del día.

**Consejo:** comparte el enlace en tus redes sociales (Instagram,
Facebook, WhatsApp Business) para que tus clientes empiecen a comprar
directamente desde ahí.

---

## Resumen rápido de archivos importantes

| Quiero cambiar...                  | Archivo a editar                          |
|-------------------------------------|--------------------------------------------|
| Productos, precios, descripciones   | `js/productos.js`                          |
| Número de WhatsApp                  | `js/main.js` (variable `WHATSAPP_NUMERO`)  |
| Colores, tipografía, estilos        | `css/style.css`                            |
| Comportamiento en celular/tablet    | `css/responsive.css`                       |
| Textos del inicio (hero, beneficios)| `index.html`                               |
| Textos de catálogos                 | `femeninos/femeninos.html`, `masculinos/masculinos.html` |
| Métodos de pago (Nequi, Bancolombia)| `carrito/carrito.html`                     |

¡Éxitos con tu tienda! 🖤🥂
