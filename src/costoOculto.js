const { generarVentasNo } = require("./generador");

// Copia instrumentada de clientesRecurrentes: cuenta por separado las comparaciones
// de clientes del doble ciclo y los elementos que recorre recurrentes.includes.
function clientesRecurrentesContado(ventas) {
  const recurrentes = [];
  const conteo = { comparaciones: 0, llamadasIncludes: 0, visitasIncludes: 0 };

  for (let i = 0; i < ventas.length; i++) {
    for (let j = i + 1; j < ventas.length; j++) {
      conteo.comparaciones += 1;
      if (ventas[i].cliente === ventas[j].cliente) {
        conteo.llamadasIncludes += 1;
        // includes recorre hasta encontrar el elemento o llegar al final.
        const posicion = recurrentes.indexOf(ventas[i].cliente);
        conteo.visitasIncludes += posicion === -1 ? recurrentes.length : posicion + 1;
        if (posicion === -1) {
          recurrentes.push(ventas[i].cliente);
        }
      }
    }
  }

  return { recurrentes, conteo };
}

// Peor caso para includes: la primera mitad son n/4 clientes que compran dos veces
// (llenan recurrentes), la segunda mitad es un solo cliente que compra n/2 veces.
// Ese cliente queda al final de recurrentes, y cada una de sus ~n²/8 coincidencias
// obliga a includes a recorrer ~n/4 elementos antes de encontrarlo.
function generarPeorCaso(n) {
  const ventas = [];
  for (let i = 0; i < n / 2; i++) {
    ventas.push({ cliente: `P${Math.floor(i / 2)}` });
  }
  for (let i = n / 2; i < n; i++) {
    ventas.push({ cliente: "GRANDE" });
  }
  return ventas;
}

function filas(generar) {
  return [500, 1000, 2000, 4000].map((n) => {
    const { conteo } = clientesRecurrentesContado(generar(n));
    return {
      n,
      comparaciones: conteo.comparaciones,
      "llamadas a includes": conteo.llamadasIncludes,
      "elementos recorridos por includes": conteo.visitasIncludes,
      total: conteo.comparaciones + conteo.visitasIncludes
    };
  });
}

console.log("Datos del generador (MiniReto 5, ~n/3 clientes):");
console.table(filas(generarVentasNo));

console.log("Peor caso construido para includes:");
console.table(filas(generarPeorCaso));

module.exports = { clientesRecurrentesContado, generarPeorCaso };
