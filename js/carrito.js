/* ==========================================================================
   CARRITO.JS
   --------------------------------------------------------------------------
   Toda la lógica del carrito de compras. El carrito se guarda en
   localStorage bajo la clave "hades_carrito", así que sobrevive aunque
   el cliente cierre el navegador o vuelva otro día.

   Estructura de cada línea del carrito:
   { id, nombre, precio, imagen, cantidad }
   ========================================================================== */

const CLAVE_CARRITO = "hades_carrito";

/* Lee el carrito guardado en localStorage. Si no existe, devuelve un
   arreglo vacío en lugar de romper la página. */
function obtenerCarrito() {
  try {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    return datos ? JSON.parse(datos) : [];
  } catch (error) {
    console.error("No se pudo leer el carrito guardado:", error);
    return [];
  }
}

/* Guarda el carrito completo en localStorage y refresca el contador
   del ícono del carrito en el header. */
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

/* Agrega un producto al carrito. Si ya estaba, solo suma la cantidad. */
function agregarAlCarrito(idProducto, indicePresentacion = 0, cantidad = 1) {
  const producto = buscarProductoPorId(idProducto);
  if (!producto) return;

  const opcionPrecio = producto.precios[indicePresentacion];
  if (!opcionPrecio) return;

  const lineId = `${producto.id}-${indicePresentacion}`;
  const carrito = obtenerCarrito();
  const linea = carrito.find((item) => item.lineId === lineId);

  if (linea) {
    linea.cantidad += cantidad;
  } else {
    carrito.push({
      lineId,
      id: producto.id,
      nombre: producto.nombre,
      presentacion: opcionPrecio.presentacion,
      precio: opcionPrecio.precio,
      imagen: producto.imagen_url,
      cantidad: cantidad
    });
  }

  guardarCarrito(carrito);
  mostrarConfirmacionAgregado(`${producto.nombre} (${opcionPrecio.presentacion})`);
}

function quitarDelCarrito(lineId) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter((item) => item.lineId !== lineId);
  guardarCarrito(carrito);
  if (typeof renderizarCarrito === "function") renderizarCarrito();
}

function cambiarCantidad(lineId, delta) {
  const carrito = obtenerCarrito();
  const linea = carrito.find((item) => item.lineId === lineId);
  if (!linea) return;

  linea.cantidad += delta;

  if (linea.cantidad <= 0) {
    quitarDelCarrito(lineId);
    return;
  }

  guardarCarrito(carrito);
  if (typeof renderizarCarrito === "function") renderizarCarrito();
}

/* Suma cuántas unidades hay en total (para el contador del header). */
function contarUnidadesCarrito() {
  return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

/* Calcula el total en pesos de todo el carrito. */
function calcularTotalCarrito() {
  return obtenerCarrito().reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );
}

/* Actualiza el numerito rojo/dorado sobre el ícono del carrito, en
   cualquier página que tenga un elemento con id="contador-carrito". */
function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;
  const unidades = contarUnidadesCarrito();
  contador.textContent = unidades;
  contador.style.display = unidades > 0 ? "flex" : "none";
}

/* Pequeño aviso visual ("Agregado ✓") cuando el usuario suma un producto,
   para dar feedback sin necesidad de un alert() intrusivo. */
function mostrarConfirmacionAgregado(nombreProducto) {
  const aviso = document.createElement("div");
  aviso.className = "toast-agregado";
  aviso.textContent = `${nombreProducto} se agregó al carrito`;
  document.body.appendChild(aviso);

  // Se muestra y luego desaparece solo
  requestAnimationFrame(() => aviso.classList.add("visible"));
  setTimeout(() => {
    aviso.classList.remove("visible");
    setTimeout(() => aviso.remove(), 400);
  }, 2200);
}

/* Vacía el carrito por completo (se usa tras finalizar un pedido). */
function vaciarCarrito() {
  localStorage.removeItem(CLAVE_CARRITO);
  actualizarContadorCarrito();
}

/* Al cargar cualquier página, sincroniza el contador del header. */
document.addEventListener("DOMContentLoaded", async () => {
  if (typeof cargarProductos === "function") {
    await cargarProductos();
  }
  if (typeof renderizarCarrito === "function") {
    renderizarCarrito();
  }
});

/* ==========================================================================
   INTEGRACIÓN DEL PAGO SIMULADO
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const formPago = document.getElementById('payment-form');
    const mensajePago = document.getElementById('payment-message');
    const labelTotal = document.getElementById('display-total-pago');

    // Función auxiliar para actualizar el texto del total a cobrar
    function actualizarLabelTotal() {
        if (labelTotal) {
            const total = calcularTotalCarrito();
            labelTotal.textContent = `Total a cobrar: $${total.toLocaleString()}`;
        }
    }

    // Muestra el total a cobrar al cargar la página
    actualizarLabelTotal();

    // Sobrescribimos temporalmente renderizarCarrito (si existe) para que también actualice el total
    if (typeof renderizarCarrito === "function") {
        const originalRenderizarCarrito = renderizarCarrito;
        renderizarCarrito = function() {
            originalRenderizarCarrito();
            actualizarLabelTotal();
        };
    }

    if (formPago) {
        formPago.addEventListener('submit', function(e) {
            e.preventDefault(); 

            if (contarUnidadesCarrito() === 0) {
                alert("Tu carrito está vacío. Agrega productos antes de continuar.");
                return;
            }
            
            const btn = this.querySelector('#btn-pagar');
            const nombre = document.getElementById('nombre-cliente').value;
            
            btn.textContent = 'Procesando pago...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // Simula el tiempo de procesamiento con el banco
            setTimeout(() => {
                mensajePago.textContent = `¡Pago aprobado, ${nombre}! Procesando tu pedido...`;
                mensajePago.style.display = 'block';
                btn.textContent = 'Pago Completado';
                btn.style.backgroundColor = '#28a745';
                btn.style.borderColor = '#28a745';
                btn.style.color = '#fff';

                // Vacía el carrito local y actualiza la vista
                vaciarCarrito();
                
                if (typeof renderizarCarrito === "function") {
                    renderizarCarrito();
                }

                // Limpiar los campos del formulario
                formPago.reset();
                actualizarLabelTotal();

                // Restaurar el botón después de unos segundos
                setTimeout(() => {
                    mensajePago.style.display = 'none';
                    btn.textContent = 'Confirmar Pago';
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.backgroundColor = ''; // Restaura el color original de CSS
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 4000);

            }, 2000); 
        });
    }
});