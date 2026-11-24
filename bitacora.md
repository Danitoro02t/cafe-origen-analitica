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

## Planes en pseudocódigo

### valorVenta

- Recorres: un registro de venta.
- Condición: ninguna.
- Acumulas: no aplica.
- Inicializas: no aplica.
- Devuelves: `venta.cantidad * venta.precio`.

### totalVendido

- Recorres: cada registro del arreglo con `for...of`.
- Condición: ninguna.
- Acumulas: el valor de cada venta en un total.
- Inicializas: `total = 0`.
- Arreglo vacío: devuelves `0`.

### unidadesVendidas

- Recorres: cada registro del arreglo con `for...of`.
- Condición: ninguna.
- Acumulas: `venta.cantidad` en el contador de unidades.
- Inicializas: `unidades = 0`.
- Arreglo vacío: devuelves `0`.

### ventaMayor

- Recorres: cada registro del arreglo con `for...of`.
- Condición: el valor de la venta actual es mayor que el valor del máximo guardado.
- Acumulas: sustituyes la referencia al registro máximo.
- Inicializas: el primer registro como máximo.
- Arreglo vacío: devuelves `null`.

### ticketPromedio

- Recorres: cada registro del arreglo con `for...of`.
- Condición: `venta.cantidad > 0`.
- Acumulas: el valor vendido y la cantidad de ventas válidas.
- Inicializas: `total = 0` y `contador = 0`.
- Arreglo vacío o sin ventas válidas: devuelves `0`.
- Devuelves: `total / contador`.

### ventasPorCiudad

- Recorres: cada registro del arreglo con `for...of`.
- Condición: normalizas la ciudad buscada y la ciudad del registro con `trim().toLowerCase()` y comparas que sean iguales.
- Acumulas: el valor de la venta válida para esa ciudad.
- Inicializas: `total = 0`.
- Arreglo vacío: devuelves `0`.

## Tablas de traza manual

### Traza 1: total vendido y unidades vendidas

| Paso | id | cantidad | precio | valor | total acumulado | unidades acumuladas |
|---|---|---:|---:|---:|---:|---:|
| Inicio | - | - | - | - | 0 | 0 |
| 1 | 1 | 2 | 42.000 | 84.000 | 84.000 | 2 |
| 2 | 2 | 1 | 26.000 | 26.000 | 110.000 | 3 |
| 3 | 3 | 1 | 95.000 | 95.000 | 205.000 | 4 |
| 4 | 4 | 1 | 42.000 | 42.000 | 247.000 | 5 |
| 5 | 5 | 3 | 45.000 | 135.000 | 382.000 | 8 |
| 6 | 6 | 2 | 26.000 | 52.000 | 434.000 | 10 |
| 7 | 7 | 1 | 120.000 | 120.000 | 554.000 | 11 |
| 8 | 8 | 0 | 42.000 | 0 | 554.000 | 11 |
| 9 | 9 | 2 | 45.000 | 90.000 | 644.000 | 13 |
| 10 | 10 | 4 | 42.000 | 168.000 | 812.000 | 17 |
| 11 | 11 | 1 | 95.000 | 95.000 | 907.000 | 18 |
| 12 | 12 | 3 | 26.000 | 78.000 | 985.000 | 21 |

Resultado manual: `totalVendido = 985.000` y `unidadesVendidas = 21`.

### Traza 2: venta mayor y Medellín

| Paso | id | cantidad | precio | valor | mayor actual | ¿ciudad normalizada coincide con Medellín? | acumulado Medellín |
|---|---|---:|---:|---:|---|---|---:|
| Inicio | - | - | - | - | null | - | 0 |
| 1 | 1 | 2 | 42.000 | 84.000 | id 1 | Sí | 84.000 |
| 2 | 2 | 1 | 26.000 | 26.000 | id 1 | No | 84.000 |
| 3 | 3 | 1 | 95.000 | 95.000 | id 1 | No | 84.000 |
| 4 | 4 | 1 | 42.000 | 42.000 | id 1 | Sí | 126.000 |
| 5 | 5 | 3 | 45.000 | 135.000 | id 5 | Sí: `medellín ` -> `medellín` | 261.000 |
| 6 | 6 | 2 | 26.000 | 52.000 | id 5 | No | 261.000 |
| 7 | 7 | 1 | 120.000 | 120.000 | id 5 | No | 261.000 |
| 8 | 8 | 0 | 42.000 | 0 | id 5 | No | 261.000 |
| 9 | 9 | 2 | 45.000 | 90.000 | id 5 | No | 261.000 |
| 10 | 10 | 4 | 42.000 | 168.000 | id 10 | No | 261.000 |
| 11 | 11 | 1 | 95.000 | 95.000 | id 10 | Sí | 356.000 |
| 12 | 12 | 3 | 26.000 | 78.000 | id 10 | No | 356.000 |

Resultado manual: la venta mayor es el registro con `id 10` y Medellín acumula `356.000`.

### Traza 3: ticket promedio

Hay 11 ventas con `cantidad > 0`; la venta con `id 8` se excluye.

`985.000 / 11 = 89.545,454545...`

Resultado manual: el ticket promedio es aproximadamente `89.545,45`.

## Decisiones de casos borde

- `totalVendido([])`: `0`.
- `unidadesVendidas([])`: `0`.
- `ventaMayor([])`: `null`, porque no existe un registro máximo.
- `ticketPromedio([])`: `0`, porque no hay ventas válidas y no se puede dividir entre cero.
- `ventasPorCiudad([], ciudad)`: `0`.
- El arreglo de un solo elemento usa las mismas funciones: el único registro es máximo, su valor se acumula una vez y su cantidad cuenta una vez si es mayor que cero.

## Pruebas con tres formas de entrada

### Arreglo completo

- `valorVenta(ventas[0])`: `84.000`.
- `totalVendido(ventas)`: `985.000`.
- `unidadesVendidas(ventas)`: `21`.
- `ventaMayor(ventas)`: registro con `id 10`.
- `ticketPromedio(ventas)`: `89.545,454545...`.
- `ventasPorCiudad(ventas, " Medellín ")`: `356.000`.

### Arreglo de un solo elemento

- `valorVenta([ventas[0]])`: `84.000`.
- `totalVendido([ventas[0]])`: `84.000`.
- `unidadesVendidas([ventas[0]])`: `2`.
- `ventaMayor([ventas[0]])`: registro con `id 1`.
- `ticketPromedio([ventas[0]])`: `84.000`.
- `ventasPorCiudad([ventas[0]], "Medellín")`: `84.000`.

### Arreglo vacío

- `valorVenta([])` no aplica a un registro.
- `totalVendido([])`: `0`.
- `unidadesVendidas([])`: `0`.
- `ventaMayor([])`: `null`.
- `ticketPromedio([])`: `0`.
- `ventasPorCiudad([], "Medellín")`: `0`.