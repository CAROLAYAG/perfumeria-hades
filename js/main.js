/* ==========================================================================
   MAIN.JS
   --------------------------------------------------------------------------
   Comportamiento general del sitio: menú móvil, header que reacciona al
   scroll, renderizado dinámico de productos (home, femeninos, masculinos),
   ficha rápida de producto, carrito y armado del mensaje de WhatsApp.

   Cada función revisa primero si el elemento que necesita existe en la
   página actual (por eso el mismo archivo sirve para las 4 páginas).
   ========================================================================== */

/* ⚠️ CAMBIA AQUÍ el número de WhatsApp de la tienda (con indicativo de país,
   sin "+" ni espacios). Este único valor alimenta todo el sitio. */
const WHATSAPP_NUMERO = "573245477480";

document.addEventListener("DOMContentLoaded", async () => {
  await cargarProductos();

  initMenuMovil();
  initHeaderScroll();
  initAnimacionesAlEntrar();
  renderizarDestacados();
  renderizarCatalogo("femenino", "grid-femeninos");
  renderizarCatalogo("masculino", "grid-masculinos");
  renderizarCarrito();
  initFormularioPedido();
  initModalProducto();
  marcarEnlaceActivo();
  initFiltrosCatalogo("femenino", "grid-femeninos", "filtros-femenino");
  initFiltrosCatalogo("masculino", "grid-masculinos", "filtros-masculino");
});
/* --------------------------------------------------------------------------
   MENÚ MÓVIL (hamburguesa)
   -------------------------------------------------------------------------- */
function initMenuMovil() {
  const boton = document.getElementById("boton-menu");
  const nav = document.getElementById("nav-principal");
  if (!boton || !nav) return;

  boton.addEventListener("click", () => {
    const abierto = nav.classList.toggle("abierto");
    boton.classList.toggle("activo", abierto);
    boton.setAttribute("aria-expanded", abierto ? "true" : "false");
  });

  // Cierra el menú al tocar un enlace (útil en celulares)
  nav.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      nav.classList.remove("abierto");
      boton.classList.remove("activo");
    });
  });
}

/* --------------------------------------------------------------------------
   HEADER: agrega sombra/fondo sólido cuando el usuario baja la página
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById("header-principal");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("con-scroll", window.scrollY > 30);
  });
}

/* --------------------------------------------------------------------------
   Resalta en el menú la página en la que el usuario está parado
   -------------------------------------------------------------------------- */
function marcarEnlaceActivo() {
  const ruta = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#nav-principal a[data-pagina]").forEach((a) => {
    if (a.dataset.pagina === ruta) a.classList.add("activo-nav");
  });
}

/* --------------------------------------------------------------------------
   Pequeñas animaciones de aparición al hacer scroll (IntersectionObserver).
   El observador se guarda en una variable de módulo porque el catálogo
   inserta tarjetas DESPUÉS de este init: cada vez que se genera contenido
   nuevo (destacados, catálogos) hay que volver a registrar sus elementos
   ".animar-entrada" con observarAnimaciones(), o quedarían con opacity:0
   para siempre (invisibles) al no haber sido observados nunca.
   -------------------------------------------------------------------------- */
let observadorAnimaciones = null;

function initAnimacionesAlEntrar() {
  if (!("IntersectionObserver" in window)) {
    observadorAnimaciones = null; // señal de "sin soporte": se maneja en observarAnimaciones()
  } else {
    observadorAnimaciones = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observadorAnimaciones.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }

  // Registra los elementos que YA existen en el HTML estático al cargar la página
  observarAnimaciones(document);
}

/* Registra con el IntersectionObserver todos los ".animar-entrada" que haya
   dentro de "raiz" (document completo, o un contenedor recién rellenado con
   innerHTML). Debe llamarse cada vez que se inserta contenido dinámico. */
function observarAnimaciones(raiz) {
  const elementos = raiz.querySelectorAll(".animar-entrada");
  console.log("[DEBUG animaciones] elementos .animar-entrada encontrados para observar:", elementos.length);
  if (!elementos.length) return;

  if (!observadorAnimaciones) {
    // Sin soporte de IntersectionObserver: mostrar todo directamente
    elementos.forEach((el) => el.classList.add("visible"));
    return;
  }

  elementos.forEach((el) => observadorAnimaciones.observe(el));
}

/* --------------------------------------------------------------------------
   Escapa caracteres HTML especiales (evita que texto de producto se
   interprete como etiquetas) y luego convierte saltos de línea \n en <br>,
   para poder mostrar descripciones multilínea sin exponer HTML crudo.
   -------------------------------------------------------------------------- */
function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto ?? "";
  return div.innerHTML;
}

function descripcionConSaltos(texto) {
  return escaparHTML(texto).replace(/\n/g, "<br>");
}

/* --------------------------------------------------------------------------
   Construye el HTML de una tarjeta de producto. "prefijo" es "" en home
   (donde las rutas de imagen ya vienen desde /img) o "" en catálogos
   (que usan ../img). PRODUCTOS.imagen ya trae la ruta correcta relativa
   a /femeninos o /masculinos; en home la ajustamos on-the-fly.
   -------------------------------------------------------------------------- */
function tarjetaProducto(producto) {
  const chips = producto.precios
    .map((p, i) => `
      <button type="button"
        class="chip-presentacion${i === 0 ? " activo" : ""}${p.stock <= 0 ? " agotado" : ""}"
        data-chip-presentacion="${i}"
        ${p.stock <= 0 ? "disabled" : ""}>
        ${p.presentacion.replace("Decant ", "").replace("Botella ", "")}
      </button>`)
    .join("");
    const todoAgotado = producto.precios.every((p) => p.stock <= 0);

  return `
    <article class="tarjeta-producto animar-entrada" data-presentacion-seleccionada="0">
      <div class="tarjeta-producto__imagen-wrap">
  <img src="${producto.imagen_url}" alt="${producto.nombre}, perfume ${producto.categoria}" loading="lazy" class="tarjeta-producto__imagen">
  ${producto.destacado && !todoAgotado ? '<span class="etiqueta-destacado">Destacado</span>' : ""}
  ${todoAgotado ? '<span class="etiqueta-agotado">Agotado</span>' : ""}
</div>
      <div class="tarjeta-producto__info">
        <span class="tarjeta-producto__familia">${producto.familia}</span>
        <h3 class="tarjeta-producto__nombre">${producto.nombre}</h3>
        <p class="tarjeta-producto__descripcion">${descripcionConSaltos(producto.descripcion)}</p>

        <div class="tarjeta-producto__presentaciones" data-grupo-presentacion="${producto.id}">
          ${chips}
        </div>

        <div class="tarjeta-producto__pie">
          <span class="tarjeta-producto__precio" data-precio-mostrado="${producto.id}">${formatearPrecio(producto.precios[0].precio)}</span>
          <div class="tarjeta-producto__botones">
            <button class="boton boton--fantasma boton--sm" data-ver-producto="${producto.id}">Ver producto</button>
            <button class="boton boton--dorado boton--sm" data-agregar-carrito="${producto.id}" ${todoAgotado ? "disabled" : ""}>Agregar</button>
          </div>
        </div>
      </div>
    </article>`;
}

function activarChipsPresentacion(contenedor) {
  contenedor.querySelectorAll(".tarjeta-producto").forEach((tarjeta) => {
    const grupo = tarjeta.querySelector("[data-grupo-presentacion]");
    if (!grupo) return;

    const idProducto = grupo.dataset.grupoPresentacion;
    const producto = buscarProductoPorId(idProducto);
    const precioEl = tarjeta.querySelector("[data-precio-mostrado]");

    grupo.querySelectorAll("[data-chip-presentacion]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const indice = Number(chip.dataset.chipPresentacion);

        grupo.querySelectorAll("[data-chip-presentacion]").forEach((c) => c.classList.remove("activo"));
        chip.classList.add("activo");

        tarjeta.dataset.presentacionSeleccionada = indice;
        if (precioEl && producto) {
          const opcion = producto.precios[indice];
          precioEl.textContent = opcion.stock > 0 ? formatearPrecio(opcion.precio) : "Agotado";
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   HOME: productos destacados
   -------------------------------------------------------------------------- */
function renderizarDestacados() {
  const contenedor = document.getElementById("productos-destacados");
  if (!contenedor) return;

  const destacados = PRODUCTOS.filter((p) => p.destacado);
  contenedor.innerHTML = destacados
    .map((p) => tarjetaProducto(p))
    .join("");

  observarAnimaciones(contenedor); // sin esto, las tarjetas quedan en opacity:0 para siempre
  activarChipsPresentacion(contenedor);
  activarBotonesDeCarrito(contenedor);
  activarBotonesVerProducto(contenedor);
}

/* --------------------------------------------------------------------------
   CATÁLOGOS: femeninos.html y masculinos.html
   -------------------------------------------------------------------------- */

function renderizarCatalogo(categoria, idContenedor, filtros = {}) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  let productos = PRODUCTOS.filter((p) => p.categoria === categoria);

  if (filtros.busqueda) {
    const texto = filtros.busqueda.trim().toLowerCase();
    productos = productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(texto) ||
        p.familia.toLowerCase().includes(texto)
    );
  }

  if (filtros.soloDestacados) {
    productos = productos.filter((p) => p.destacado);
  }

  if (filtros.precioMin != null && !Number.isNaN(filtros.precioMin)) {
    productos = productos.filter((p) => p.precios[0].precio >= filtros.precioMin);
  }

  if (filtros.precioMax != null && !Number.isNaN(filtros.precioMax)) {
    productos = productos.filter((p) => p.precios[0].precio <= filtros.precioMax);
  }

  if (filtros.orden === "precio-asc") {
    productos = [...productos].sort((a, b) => a.precios[0].precio - b.precios[0].precio);
  } else if (filtros.orden === "precio-desc") {
    productos = [...productos].sort((a, b) => b.precios[0].precio - a.precios[0].precio);
  }

  // --- LOG TEMPORAL DE DEPURACIÓN ---
  console.log(`[DEBUG catálogo:${categoria}] filtros aplicados:`, filtros, "| resultados:", productos.length);
  // -----------------------------------

  contenedor.innerHTML = productos.length
    ? productos.map((p) => tarjetaProducto(p)).join("")
    : '<p class="catalogo-vacio">No encontramos perfumes con esos filtros. Prueba ajustando la búsqueda.</p>';

  observarAnimaciones(contenedor);
  activarChipsPresentacion(contenedor);
  activarBotonesDeCarrito(contenedor);
  activarBotonesVerProducto(contenedor);
}
function initFiltrosCatalogo(categoria, idGrid, idFiltros) {
  const contenedorFiltros = document.getElementById(idFiltros);
  if (!contenedorFiltros) return;

  const inputBuscar = contenedorFiltros.querySelector(".filtro-buscar");
  const inputMin = contenedorFiltros.querySelector(".filtro-precio-min");
  const inputMax = contenedorFiltros.querySelector(".filtro-precio-max");
  const checkDestacados = contenedorFiltros.querySelector(".filtro-destacados");
  const selectOrden = contenedorFiltros.querySelector(".filtro-orden");

  function aplicarFiltros() {
    renderizarCatalogo(categoria, idGrid, {
      busqueda: inputBuscar.value,
      precioMin: inputMin.value !== "" ? Number(inputMin.value) : null,
      precioMax: inputMax.value !== "" ? Number(inputMax.value) : null,
      soloDestacados: checkDestacados.checked,
      orden: selectOrden.value
    });
  }

  inputBuscar.addEventListener("input", aplicarFiltros);
  inputMin.addEventListener("input", aplicarFiltros);
  inputMax.addEventListener("input", aplicarFiltros);
  checkDestacados.addEventListener("change", aplicarFiltros);
  selectOrden.addEventListener("change", aplicarFiltros);
}

/* --------------------------------------------------------------------------
   Delegación de eventos: cualquier botón [data-agregar-carrito] dentro
   del contenedor dado suma ese producto al carrito.
   -------------------------------------------------------------------------- */
function activarBotonesDeCarrito(contenedor) {
  contenedor.querySelectorAll("[data-agregar-carrito]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const idProducto = Number(boton.dataset.agregarCarrito);
      const tarjeta = boton.closest(".tarjeta-producto");
      const indice = tarjeta ? Number(tarjeta.dataset.presentacionSeleccionada || 0) : 0;

      const producto = buscarProductoPorId(idProducto);
      if (producto && producto.precios[indice].stock <= 0) {
        alert("Esta presentación está agotada. Elige otra.");
        return;
      }

      agregarAlCarrito(idProducto, indice);
    });
  });
}

function activarBotonesVerProducto(contenedor) {
  contenedor.querySelectorAll("[data-ver-producto]").forEach((boton) => {
    boton.addEventListener("click", () => {
      abrirModalProducto(Number(boton.dataset.verProducto));
    });
  });
}

/* --------------------------------------------------------------------------
   FICHA RÁPIDA DE PRODUCTO (modal)
   -------------------------------------------------------------------------- */
function initModalProducto() {
  const modal = document.getElementById("modal-producto");
  if (!modal) return;

  modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-cerrar-modal]") || e.target === modal) {
      cerrarModalProducto();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModalProducto();
  });
}
function rutaImagenParaPaginaActual(imagen) {
  const enSubcarpeta = /\/(femeninos|masculinos|carrito)\//.test(window.location.pathname);
  return enSubcarpeta ? imagen : imagen.replace("../", "");
}

function abrirModalProducto(id) {
  const modal = document.getElementById("modal-producto");
  const producto = buscarProductoPorId(id);
 
  if (!modal || !producto) return;

 modal.querySelector(".modal-producto__imagen").src = producto.imagen_url;
  modal.querySelector(".modal-producto__imagen").alt = producto.nombre;
  modal.querySelector(".modal-producto__familia").textContent = producto.familia;
  modal.querySelector(".modal-producto__nombre").textContent = producto.nombre;
  modal.querySelector(".modal-producto__descripcion").innerHTML = descripcionConSaltos(producto.descripcion);

  const grupoPresentacion = modal.querySelector(".modal-producto__presentaciones");
  grupoPresentacion.innerHTML = producto.precios
    .map((p, i) => `
      <button type="button"
        class="chip-presentacion${i === 0 ? " activo" : ""}${p.stock <= 0 ? " agotado" : ""}"
        data-chip-presentacion="${i}"
        ${p.stock <= 0 ? "disabled" : ""}>
        ${p.presentacion.replace("Decant ", "").replace("Botella ", "")}
      </button>`)
    .join("");

  const precioEl = modal.querySelector(".modal-producto__precio");
  precioEl.textContent = producto.precios[0].stock > 0 ? formatearPrecio(producto.precios[0].precio) : "Agotado";
  modal.dataset.presentacionSeleccionada = 0;

  grupoPresentacion.querySelectorAll("[data-chip-presentacion]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const indice = Number(chip.dataset.chipPresentacion);
      grupoPresentacion.querySelectorAll("[data-chip-presentacion]").forEach((c) => c.classList.remove("activo"));
      chip.classList.add("activo");
      const opcion = producto.precios[indice];
precioEl.textContent = opcion.stock > 0 ? formatearPrecio(opcion.precio) : "Agotado";
      modal.dataset.presentacionSeleccionada = indice;
    });
  });

  const botonAgregar = modal.querySelector("[data-agregar-desde-modal]");
  botonAgregar.onclick = () => {
    const indice = Number(modal.dataset.presentacionSeleccionada || 0);
    if (producto.precios[indice].stock <= 0) {
      alert("Esta presentación está agotada. Elige otra.");
      return;
    }
    agregarAlCarrito(producto.id, indice);
    cerrarModalProducto();
};

  modal.classList.add("abierto");
  document.body.classList.add("bloquear-scroll");
}

function cerrarModalProducto() {
  const modal = document.getElementById("modal-producto");
  if (!modal) return;
  modal.classList.remove("abierto");
  document.body.classList.remove("bloquear-scroll");
}

/* --------------------------------------------------------------------------
   PÁGINA DE CARRITO: dibuja las líneas, subtotal y total
   -------------------------------------------------------------------------- */
function renderizarCarrito() {
  const contenedor = document.getElementById("lista-carrito");
  if (!contenedor) return; // esta página no es carrito.html

  const carrito = obtenerCarrito();
  const vacio = document.getElementById("carrito-vacio");
  const resumen = document.getElementById("carrito-resumen");

  if (carrito.length === 0) {
    contenedor.innerHTML = "";
    if (vacio) vacio.style.display = "block";
    if (resumen) resumen.style.display = "none";
    return;
  }

  if (vacio) vacio.style.display = "none";
  if (resumen) resumen.style.display = "grid";

  contenedor.innerHTML = carrito
    .map(
      (item) => `
    <div class="linea-carrito" data-linea="${item.lineId}">
      <img src="${item.imagen}" alt="${item.nombre}" class="linea-carrito__imagen">
      <div class="linea-carrito__info">
        <h3 class="linea-carrito__nombre">${item.nombre}</h3>
        <span class="linea-carrito__presentacion">${item.presentacion}</span>
        <span class="linea-carrito__precio-unit">${formatearPrecio(item.precio)} c/u</span>
      </div>
      <div class="linea-carrito__cantidad">
        <button class="boton-cantidad" data-restar="${item.lineId}" aria-label="Disminuir cantidad">−</button>
        <span class="linea-carrito__numero">${item.cantidad}</span>
        <button class="boton-cantidad" data-sumar="${item.lineId}" aria-label="Aumentar cantidad">+</button>
      </div>
      <span class="linea-carrito__subtotal">${formatearPrecio(item.precio * item.cantidad)}</span>
      <button class="linea-carrito__eliminar" data-eliminar="${item.lineId}" aria-label="Eliminar producto">✕</button>
    </div>`
    )
    .join("");

  contenedor.querySelectorAll("[data-sumar]").forEach((b) =>
    b.addEventListener("click", () => cambiarCantidad(b.dataset.sumar, 1))
  );
  contenedor.querySelectorAll("[data-restar]").forEach((b) =>
    b.addEventListener("click", () => cambiarCantidad(b.dataset.restar, -1))
  );
  contenedor.querySelectorAll("[data-eliminar]").forEach((b) =>
    b.addEventListener("click", () => quitarDelCarrito(b.dataset.eliminar))
  );

  const total = calcularTotalCarrito();
  const elSubtotal = document.getElementById("carrito-subtotal");
  const elTotal = document.getElementById("carrito-total");
  if (elSubtotal) elSubtotal.textContent = formatearPrecio(total);
  if (elTotal) elTotal.textContent = formatearPrecio(total);
}

/* --------------------------------------------------------------------------
   FORMULARIO DE PEDIDO: valida datos, arma el mensaje y abre WhatsApp
   -------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   FORMULARIO DE PEDIDO: valida datos, arma el mensaje y abre WhatsApp
   -------------------------------------------------------------------------- */
function initFormularioPedido() {
  const formulario = document.getElementById("form-pedido");
  if (!formulario) return;

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
      alert("Tu carrito está vacío. Agrega al menos un producto antes de finalizar el pedido.");
      return;
    }

    const nombre = formulario.elements["nombre-cliente"].value.trim();
    const direccion = formulario.elements["direccion-cliente"].value.trim();

    if (!nombre || !direccion) {
      alert("Por favor completa tu nombre y dirección.");
      return;
    }

    const mensaje = generarMensajeWhatsApp({
      carrito,
      nombre,
      direccion
    });

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  });
}
/* Arma el texto exacto que se enviará por WhatsApp */
function generarMensajeWhatsApp({ carrito, nombre, direccion, metodoPago }) {
  const lineas = carrito
    .map(
      (item) =>
       `• ${item.nombre} (${item.presentacion})  x${item.cantidad}  —  ${formatearPrecio(item.precio * item.cantidad)}`
    )
    .join("\n");

  const total = calcularTotalCarrito();

  return (
    `Hola, quiero realizar el siguiente pedido en Perfumería Hades:\n\n` +
    `${lineas}\n\n` +
    `Total: ${formatearPrecio(total)}\n\n` +
    `Mi nombre es: ${nombre}\n` +
    `Mi dirección es: ${direccion}`
  );
}
