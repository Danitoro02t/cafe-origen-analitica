const { isDeepStrictEqual } = require("node:util");
const ventas = require("./datos");
const {
  totalVendido,
  totalVendidoM,
  unidadesVendidas,
  unidadesVendidasM,
  ventasPorCiudad,
  ventasPorCiudadM,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor
} = require("./analitica");

const ventasOriginales = [...ventas];
let huboDiferencias = false;

function mostrarResultado(nombre, resultado) {
  const estado = resultado ? "OK" : "DIFERENTE";
  console.log(`${estado}: ${nombre}`);
  if (!resultado) {
    huboDiferencias = true;
  }
}

mostrarResultado(
  "totalVendido / totalVendidoM",
  isDeepStrictEqual(totalVendido(ventas), totalVendidoM(ventas))
);
mostrarResultado(
  "unidadesVendidas / unidadesVendidasM",
  isDeepStrictEqual(unidadesVendidas(ventas), unidadesVendidasM(ventas))
);
mostrarResultado(
  "ventasPorCiudad / ventasPorCiudadM",
  isDeepStrictEqual(
    ventasPorCiudad(ventas, " Medellín "),
    ventasPorCiudadM(ventas, " Medellín ")
  )
);

const ciudadesEsperadas = {
  Medellín: 356000,
  Bogotá: 276000,
  Cali: 185000,
  Pereira: 168000
};
mostrarResultado(
  "totalPorCiudad: cuatro ciudades y nombres normalizados",
  isDeepStrictEqual(
    totalPorCiudad(ventas.map((venta) => (
      venta.id === 2 ? { ...venta, ciudad: "Bogotá " } : venta
    ))),
    ciudadesEsperadas
  )
);

const unidadesEsperadas = {
  "Origen Huila 500 g": 7,
  "Origen Nariño 250 g": 6,
  "Prensa francesa": 2,
  "Origen Sierra 500 g": 5,
  "Molino manual": 1
};
mostrarResultado(
  "unidadesPorProducto",
  isDeepStrictEqual(unidadesPorProducto(ventas), unidadesEsperadas)
);

const topEsperado = [
  { producto: "Origen Huila 500 g", valorGenerado: 294000 },
  { producto: "Origen Sierra 500 g", valorGenerado: 225000 },
  { producto: "Prensa francesa", valorGenerado: 190000 }
];
mostrarResultado(
  "topProductosPorValor: tres primeros",
  isDeepStrictEqual(topProductosPorValor(ventas, 3), topEsperado)
);

mostrarResultado(
  "las funciones conservan el orden original de ventas",
  isDeepStrictEqual(ventas, ventasOriginales)
);

if (huboDiferencias) {
  process.exitCode = 1;
}
