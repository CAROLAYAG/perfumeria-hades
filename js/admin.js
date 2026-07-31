let productoEnEdicion = null;
let archivoImagenNuevo = null;

/* ---------------------------- AUTENTICACIÓN ---------------------------- */

document.addEventListener("DOMContentLoaded", async () => {
  const { data } = await supabaseClient.auth.getSession();
  if (data.session) {
    mostrarPanel();
  } else {
    mostrarLogin();
  }
});

document.getElementById("form-login").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const errorEl = document.getElementById("login-error");

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    errorEl.textContent = "Correo o contraseña incorrectos.";
    return;
  }

  errorEl.textContent = "";
  mostrarPanel();
});

document.getElementById("boton-logout").addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  mostrarLogin();
});

function mostrarLogin() {
  document.getElementById("pantalla-login").classList.remove("oculto");
  document.getElementById("panel-admin").classList.add("oculto");
}

function mostrarPanel() {
  document.getElementById("pantalla-login").classList.add("oculto");
  document.getElementById("panel-admin").classList.remove("oculto");
  cargarProductosAdmin();
}

/* ------------------------------ LISTADO --------------------------------- */

async function cargarProductosAdmin() {
  const { data, error } = await supabaseClient.from("productos").select("*").order("id");

  if (error) {
    mostrarMensaje("Error cargando productos: " + error.message, "error");
    return;
  }

  const cuerpo = document.getElementById("admin-tabla-cuerpo");
  cuerpo.innerHTML = data
    .map(
      (p) => `
      <tr>
        <td><img src="${p.imagen_url || ""}" class="admin-tabla__miniatura" alt="${p.nombre}"></td>
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td>${p.familia}</td>
        <td>${p.precios && p.precios[0] ? formatearPrecio(p.precios[0].precio) : "—"}</td>
        <td>${p.destacado ? "✔️" : ""}</td>
        <td><button class="boton boton--fantasma boton--sm" data-editar="${p.id}">Editar</button></td>
      </tr>`
    )
    .join("");

  cuerpo.querySelectorAll("[data-editar]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const producto = data.find((p) => p.id === Number(boton.dataset.editar));
      abrirFormulario(producto);
    });
  });
}

function mostrarMensaje(texto, tipo = "exito") {
  const el = document.getElementById("admin-mensaje");
  el.textContent = texto;
  el.className = "admin-mensaje " + (tipo === "error" ? "admin-mensaje--error" : "admin-mensaje--exito");
  setTimeout(() => el.classList.add("oculto"), 4000);
}

/* --------------------------- FORMULARIO MODAL ---------------------------- */

document.getElementById("boton-nuevo-producto").addEventListener("click", () => abrirFormulario(null));
document.getElementById("cerrar-modal-form").addEventListener("click", cerrarFormulario);

function abrirFormulario(producto) {
  productoEnEdicion = producto;
  archivoImagenNuevo = null;

  document.getElementById("modal-form-titulo").textContent = producto ? "Editar producto" : "Nuevo producto";
  document.getElementById("campo-id").value = producto ? producto.id : "";
  document.getElementById("campo-nombre").value = producto ? producto.nombre : "";
  document.getElementById("campo-categoria").value = producto ? producto.categoria : "femenino";
  document.getElementById("campo-familia").value = producto ? producto.familia : "";
  document.getElementById("campo-descripcion").value = producto ? producto.descripcion.replace(/\\n/g, "\n") : "";
  document.getElementById("campo-destacado").checked = producto ? producto.destacado : false;
  document.getElementById("campo-imagen").value = "";

  const preview = document.getElementById("preview-imagen");
  if (producto && producto.imagen_url) {
    preview.src = producto.imagen_url;
    preview.classList.remove("oculto");
  } else {
    preview.classList.add("oculto");
  }

  const listaPrecios = document.getElementById("lista-precios");
  listaPrecios.innerHTML = "";
  const precios = producto && producto.precios && producto.precios.length
    ? producto.precios
    : [{ presentacion: "Decant 5ml", precio: "", stock: 10 }, { presentacion: "Decant 10ml", precio: "", stock: 10 }, { presentacion: "Botella 100ml", precio: "", stock: 10 }];

  const botonEliminar = document.getElementById("boton-eliminar-producto");
  if (producto) {
    botonEliminar.classList.remove("oculto");
    botonEliminar.onclick = () => eliminarProducto(producto.id);
  } else {
    botonEliminar.classList.add("oculto");
  }

  document.getElementById("modal-form-producto").classList.add("abierto");
}

function cerrarFormulario() {
  document.getElementById("modal-form-producto").classList.remove("abierto");
}

document.getElementById("campo-imagen").addEventListener("change", (e) => {
  archivoImagenNuevo = e.target.files[0] || null;
  if (archivoImagenNuevo) {
    const preview = document.getElementById("preview-imagen");
    preview.src = URL.createObjectURL(archivoImagenNuevo);
    preview.classList.remove("oculto");
  }
});

/* ---------------------- FILAS DE PRECIO (dinámicas) ----------------------- */

document.getElementById("boton-agregar-precio").addEventListener("click", () => agregarFilaPrecio("", ""));

function agregarFilaPrecio(presentacion, precio, stock) {
  const lista = document.getElementById("lista-precios");
  const fila = document.createElement("div");
  fila.className = "admin-fila-precio";
  fila.innerHTML = `
    <input type="text" class="precio-presentacion" placeholder="Ej: Decant 5ml" value="${presentacion || ""}">
    <input type="number" class="precio-valor" placeholder="Precio" value="${precio ?? ""}">
    <input type="number" class="precio-stock" placeholder="Unidades" value="${stock ?? 0}" min="0">
    <button type="button" class="admin-fila-precio__borrar">✕</button>
  `;
  fila.querySelector(".admin-fila-precio__borrar").addEventListener("click", () => fila.remove());
  lista.appendChild(fila);
}

/* ------------------------------- GUARDAR --------------------------------- */

document.getElementById("form-producto").addEventListener("submit", async (e) => {
  e.preventDefault();

 const precios = Array.from(document.querySelectorAll(".admin-fila-precio"))
    .map((fila) => ({
      presentacion: fila.querySelector(".precio-presentacion").value.trim(),
      precio: Number(fila.querySelector(".precio-valor").value),
      stock: Number(fila.querySelector(".precio-stock").value) || 0
    }))
    .filter((p) => p.presentacion && !Number.isNaN(p.precio));
  if (!precios.length) {
    mostrarMensaje("Agrega al menos una presentación con precio.", "error");
    return;
  }

  let imagenUrl = productoEnEdicion ? productoEnEdicion.imagen_url : null;

  if (archivoImagenNuevo) {
    const nombreArchivo = `${Date.now()}-${archivoImagenNuevo.name.replace(/\s+/g, "-")}`;
    const { error: errorSubida } = await supabaseClient.storage
      .from("productos-imagenes")
      .upload(nombreArchivo, archivoImagenNuevo);

    if (errorSubida) {
      mostrarMensaje("Error subiendo la imagen: " + errorSubida.message, "error");
      return;
    }

    const { data: urlData } = supabaseClient.storage.from("productos-imagenes").getPublicUrl(nombreArchivo);
    imagenUrl = urlData.publicUrl;
  }

  if (!imagenUrl) {
    mostrarMensaje("Debes subir una imagen para el producto.", "error");
    return;
  }

  const datosProducto = {
    nombre: document.getElementById("campo-nombre").value.trim(),
    categoria: document.getElementById("campo-categoria").value,
    familia: document.getElementById("campo-familia").value.trim(),
    descripcion: document.getElementById("campo-descripcion").value.trim(),
    destacado: document.getElementById("campo-destacado").checked,
    imagen_url: imagenUrl,
    precios
  };

  const id = document.getElementById("campo-id").value;

  const { error } = id
    ? await supabaseClient.from("productos").update(datosProducto).eq("id", id)
    : await supabaseClient.from("productos").insert(datosProducto);

  if (error) {
    mostrarMensaje("Error guardando: " + error.message, "error");
    return;
  }

  mostrarMensaje(id ? "Producto actualizado." : "Producto agregado.");
  cerrarFormulario();
  cargarProductosAdmin();
});

/* ------------------------------- ELIMINAR --------------------------------- */

async function eliminarProducto(id) {
  if (!confirm("¿Seguro que quieres eliminar este producto? Esta acción no se puede deshacer.")) return;

  const { error } = await supabaseClient.from("productos").delete().eq("id", id);

  if (error) {
    mostrarMensaje("Error eliminando: " + error.message, "error");
    return;
  }

  mostrarMensaje("Producto eliminado.");
  cerrarFormulario();
  cargarProductosAdmin();
}