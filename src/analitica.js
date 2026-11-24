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

function unidadesVendidas(ventas) {
  let unidades = 0;

  for (const venta of ventas) {
    unidades += venta.cantidad;
  }

  return unidades;
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

module.exports = {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad
};