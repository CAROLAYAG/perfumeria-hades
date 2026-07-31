let PRODUCTOS = [];

async function cargarProductos() {
  const { data, error } = await supabaseClient.from("productos").select("*");
  if (error) {
    console.error("Error cargando productos:", error);
    return;
  }
  PRODUCTOS = data;
}

function formatearPrecio(valor) {
  return valor.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

function buscarProductoPorId(id) {
  return PRODUCTOS.find((p) => p.id === Number(id));
}