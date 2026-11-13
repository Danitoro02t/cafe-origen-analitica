## Diccionario de datos

Cada fila es una venta. Estos son los datos que trae cada una:

| Propiedad | Tipo | Significado |
|---|---|---|
| `id` | Número (`number`) | Número para identificar la venta. |
| `fecha` | Texto (`string`) | Día en que se hizo la venta. |
| `cliente` | Texto (`string`) | Código del cliente, por ejemplo `C01`. |
| `producto` | Texto (`string`) | Nombre del producto. |
| `ciudad` | Texto (`string`) | Ciudad que aparece en el registro. |
| `cantidad` | Número (`number`) | Cuántas unidades se vendieron. |
| `precio` | Número (`number`) | Precio de una unidad, en pesos. |

## Casos borde detectados

1. **La ciudad está escrita de dos formas:** vi `Medellín` y `medellín`. Las voy a dejar como están en estos datos. Si después hago un resumen por ciudad, las revisaré para que no parezcan dos ciudades distintas.
2. **Hay una cantidad en cero:** la venta con `id` 8 tiene `cantidad: 0`. No la voy a borrar por ahora; primero habría que confirmar si fue un error o si significa algo especial.
3. **Algunos clientes aparecen varias veces:** por ejemplo, `C01` tiene más de una venta. No voy a borrar esos registros, porque pueden ser compras distintas. Cada venta tiene su propio `id`.
4. **Los clientes solo tienen un código:** no aparecen sus nombres. Dejaré los códigos tal como están y no intentaré adivinar quiénes son.