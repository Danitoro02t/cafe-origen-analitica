function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
  let total = 0;

  for (const venta of ventas) {
    total += valorVenta(venta);
  }

  return total;
}

function totalVendidoM(ventas) {
  return ventas.reduce((total, venta) => total + valorVenta(venta), 0);
}

function unidadesVendidas(ventas) {
  let unidades = 0;

  for (const venta of ventas) {
    unidades += venta.cantidad;
  }

  return unidades;
}

function unidadesVendidasM(ventas) {
  return ventas.reduce((unidades, venta) => unidades + venta.cantidad, 0);
}

function ventaMayor(ventas) {
  if (ventas.length === 0) {
    return null;
  }

  let mayor = ventas[0];

  for (const venta of ventas) {
    if (valorVenta(venta) > valorVenta(mayor)) {
      mayor = venta;
    }
  }

  return mayor;
}

function ticketPromedio(ventas) {
  let total = 0;
  let contador = 0;

  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total += valorVenta(venta);
      contador += 1;
    }
  }

  if (contador === 0) {
    return 0;
  }

  return total / contador;
}

function ventasPorCiudad(ventas, ciudad) {
  let total = 0;
  const ciudadBuscada = ciudad.trim().toLowerCase();

  for (const venta of ventas) {
    const ciudadVenta = venta.ciudad.trim().toLowerCase();

    if (ciudadVenta === ciudadBuscada) {
      total += valorVenta(venta);
    }
  }

  return total;
}

function ventasPorCiudadM(ventas, ciudad) {
  const ciudadBuscada = ciudad.trim().toLowerCase();

  return ventas
    .filter((venta) => venta.ciudad.trim().toLowerCase() === ciudadBuscada)
    .map(valorVenta)
    .reduce((total, valor) => total + valor, 0);
}

function totalPorCiudad(ventas) {
  const acumulado = ventas.reduce((resultado, venta) => {
    const ciudad = venta.ciudad.trim();
    const clave = ciudad.toLowerCase();

    if (!Object.hasOwn(resultado.totales, clave)) {
      resultado.totales[clave] = 0;
      resultado.nombres[clave] = ciudad;
    }

    resultado.totales[clave] += valorVenta(venta);
    return resultado;
  }, { totales: {}, nombres: {} });

  return Object.entries(acumulado.totales).reduce((resultado, [clave, total]) => {
    resultado[acumulado.nombres[clave]] = total;
    return resultado;
  }, {});
}

function unidadesPorProducto(ventas) {
  return ventas.reduce((unidades, venta) => {
    unidades[venta.producto] = (unidades[venta.producto] ?? 0) + venta.cantidad;
    return unidades;
  }, {});
}

function topProductosPorValor(ventas, k) {
  const valoresPorProducto = ventas.reduce((valores, venta) => {
    valores[venta.producto] = (valores[venta.producto] ?? 0) + valorVenta(venta);
    return valores;
  }, {});

  return [...Object.entries(valoresPorProducto)]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([producto, valorGenerado]) => ({ producto, valorGenerado }));
}

module.exports = {
  valorVenta,
  totalVendido,
  totalVendidoM,
  unidadesVendidas,
  unidadesVendidasM,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  ventasPorCiudadM,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor
};