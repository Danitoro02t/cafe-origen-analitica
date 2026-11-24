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

## Métodos de arreglo, agrupaciones y ranking

### totalVendidoM

- ¿Qué recorro?: cada venta con `reduce`.
- ¿Qué filtro?: nada; todas las ventas cuentan.
- ¿Qué transformo?: cada venta en su valor mediante `valorVenta`.
- ¿Qué acumulo?: los valores de venta.
- ¿Cómo agrupo?: en un único total, inicializado en `0`.

### unidadesVendidasM

- ¿Qué recorro?: cada venta con `reduce`.
- ¿Qué filtro?: nada; se incluyen también las ventas con cero unidades.
- ¿Qué transformo?: cada venta en su cantidad.
- ¿Qué acumulo?: las unidades.
- ¿Cómo agrupo?: en un único total, inicializado en `0`.

### ventasPorCiudadM

- ¿Qué recorro?: cada venta.
- ¿Qué filtro?: las ventas cuya ciudad coincide con la ciudad buscada después de quitar espacios y normalizar mayúsculas.
- ¿Qué transformo?: las ventas coincidentes en su valor con `map` y el texto de las ciudades para compararlo.
- ¿Qué acumulo?: los valores de las ventas filtradas.
- ¿Cómo agrupo?: en el total de una ciudad indicada; `reduce` empieza en `0`.

### totalPorCiudad

- ¿Qué recorro?: cada venta con `reduce`.
- ¿Qué filtro?: nada; todas las ventas cuentan.
- ¿Qué transformo?: el nombre de ciudad se recorta y se normaliza para reconocer variantes del mismo nombre; cada venta se convierte en su valor.
- ¿Qué acumulo?: el valor vendido por ciudad.
- ¿Cómo agrupo?: en diccionarios por nombre normalizado y luego en un objeto con el nombre presentado en los datos.

### unidadesPorProducto

- ¿Qué recorro?: cada venta con `reduce`.
- ¿Qué filtro?: nada; todas las ventas cuentan.
- ¿Qué transformo?: cada registro en el par producto-cantidad.
- ¿Qué acumulo?: las cantidades de cada producto.
- ¿Cómo agrupo?: en un objeto diccionario cuya clave es el producto.

### topProductosPorValor

- ¿Qué recorro?: cada venta para sumar su valor por producto.
- ¿Qué filtro?: no se filtran ventas; después se limita el ranking a los primeros `k`.
- ¿Qué transformo?: los totales del diccionario en entradas producto-valor y luego en objetos con producto y valor generado.
- ¿Qué acumulo?: el dinero generado por las ventas de cada producto.
- ¿Cómo agrupo?: en un objeto diccionario por producto; sus entradas se ordenan de mayor a menor antes de tomar `k`, sin ordenar el arreglo original.

### ventasDelDia

- ¿Qué recorro?: cada venta con `filter`.
- ¿Qué filtro?: registros cuya fecha coincide exactamente con la fecha solicitada.
- ¿Qué acumulo?: nada; devuelve un arreglo nuevo con las ventas coincidentes.
- Fecha sin ventas: devuelve `[]`; los indicadores sobre ese arreglo devuelven cero.

## Registro de depuración

### Error 1: Bogotá aparece como dos ciudades

- **Síntoma:** Bogotá aparece más de una vez en el resumen por ciudad.
- **Entrada que lo produce:** registros con `ciudad: "Bogotá"`, `ciudad: "BOGOTÁ "` y `ciudad: "bogotá"`.
- **Hipótesis:** agrupar por el texto original sin normalizar crea una clave distinta por mayúsculas o espacios.
- **Prueba realizada:** se agregaron esos tres registros a la prueba de `totalPorCiudad`; el resultado esperado es una sola clave, `Bogotá`, con valor `400`.
- **Causa:** considerar el nombre original como clave de agrupación no reconoce variantes equivalentes.
- **Corrección:** `totalPorCiudad` agrupa usando `trim().toLowerCase()` como clave normalizada y conserva un solo nombre de presentación. La prueba de regresión pasa y el total aparece en un solo grupo.

### Error 2: ticket promedio `NaN` en un día sin ventas

- **Síntoma:** el ticket promedio se muestra como `NaN` al filtrar una fecha sin ventas.
- **Entrada que lo produce:** `ventasDelDia(ventas, "2026-09-07")`, que devuelve un arreglo vacío.
- **Hipótesis:** se calcula `total / cantidadDeVentas` con denominador cero.
- **Prueba realizada:** la prueba de regresión verifica para ese día un arreglo vacío, total `0`, unidades `0`, ticket promedio `0` y que el valor no sea `NaN`.
- **Causa:** dividir entre cero produce `NaN` cuando tanto el numerador como el denominador son cero.
- **Corrección:** `ticketPromedio` devuelve `0` cuando no encuentra ventas válidas; el reporte también muestra el mensaje “Sin ventas registradas para esta fecha.” No se divide entre cero.

## Predicción previa: crecimiento de operaciones

Antes de ejecutar `node src/medir.js`, predigo que al multiplicar `n` por 10:

- `totalVendido` hará 10 veces más operaciones: recorre cada venta una sola vez, así que espero crecimiento lineal, O(n).
- `ventaMayor` hará 10 veces más operaciones: recorre las ventas y compara cada una contra el máximo actual, así que espero crecimiento lineal, O(n).
- `totalPorCiudad` hará aproximadamente 10 veces más operaciones: recorre las ventas, verifica si ya existe la ciudad y al final recorre las ciudades agrupadas; espero crecimiento lineal, O(n), porque el número de ciudades está acotado.
- `primeraVenta` conservará el mismo número de operaciones: solo accede a la primera posición, así que espero crecimiento constante, O(1).

El contador se pasa como objeto `{ operaciones: 0 }` y las funciones incrementan su propiedad por referencia. Una operación contada representa una visita a un elemento o una comparación explícita del algoritmo: `totalVendido` suma una por venta; `ventaMayor`, una visita y una comparación por venta; `totalPorCiudad`, una visita y una comprobación de existencia por venta, más una visita por ciudad agregada; `primeraVenta`, una lectura cuando el arreglo no está vacío.

### Resultados medidos

Se generaron datos independientes para cada tamaño con las listas fijas de productos, precios, ciudades y fechas en `src/generador.js`. Una ejecución de `node src/medir.js` produjo:

| n | totalVendido | ventaMayor | totalPorCiudad | primeraVenta |
|---:|---:|---:|---:|---:|
| 100 | 100 | 200 | 204 | 1 |
| 1.000 | 1.000 | 2.000 | 2.004 | 1 |
| 10.000 | 10.000 | 20.000 | 20.004 | 1 |
| 100.000 | 100.000 | 200.000 | 200.004 | 1 |

La predicción coincide con los resultados: `totalVendido` y `ventaMayor` crecen exactamente 10 veces por cada salto de tamaño; `totalPorCiudad` pasa de 204 a 2.004, de 2.004 a 20.004 y de 20.004 a 200.004, cerca de 10 veces debido a las cuatro visitas finales por ciudad; `primeraVenta` permanece en 1. En otras ejecuciones, la selección aleatoria podría no incluir alguna ciudad en los 100 registros y reducir el conteo final hasta en cuatro operaciones; el término dominante sigue siendo 2n. Por tanto, las tres funciones de recorrido y agrupación son O(n), y `primeraVenta` es O(1). El conteo de `totalPorCiudad` no es O(n²): no compara cada venta con todas las demás, sino que consulta las claves de un objeto al recorrer cada venta.

## MiniReto 6: clientes recurrentes y crecimiento cuadrático

Un compañero agregó `clientesRecurrentes` (en `src/analitica.js`) para listar los clientes que compraron más de una vez. Con los datos de prueba funcionó, pero con el historial anual el reporte "se quedó pensando varios minutos".

### 1. Verificación con los 12 datos del Día 1

`node src/verificar.js` incluye la prueba `clientesRecurrentes: C01, C02 y C03 con los datos del Día 1`, que pasa: la función devuelve `["C01", "C02", "C03"]`. C01 compró en los registros 1, 4 y 11; C02, en el 2 y el 7; C03, en el 3 y el 9. Los demás clientes (C04 a C08) compraron una sola vez. También se comprobó que un arreglo vacío, uno de un solo registro y uno sin clientes repetidos devuelven `[]`.

### 2. Traza con 5 ventas

Se usan los cinco primeros registros del Día 1: `C01, C02, C03, C01, C04` (posiciones 0 a 4).

| i | cliente[i] | j recorridos | comparaciones | ¿coincide? | `includes` | recurrentes |
|---:|---|---|---:|---|---|---|
| 0 | C01 | 1, 2, 3, 4 | 4 | Sí con j=3 (C01) | `[].includes("C01")` → `false`, se agrega | `[C01]` |
| 1 | C02 | 2, 3, 4 | 3 | No | no se llama | `[C01]` |
| 2 | C03 | 3, 4 | 2 | No | no se llama | `[C01]` |
| 3 | C01 | 4 | 1 | No (C04) | no se llama | `[C01]` |
| 4 | C04 | ninguno | 0 | - | - | `[C01]` |
| **Total** | | | **10** | | 1 llamada | `[C01]` |

Con 5 ventas hace `4 + 3 + 2 + 1 + 0 = 10` comparaciones de clientes.

**Generalización:** con `n` ventas, la venta `i` se compara con las `n − 1 − i` ventas que vienen después. En total:

`(n − 1) + (n − 2) + … + 1 + 0 = n(n − 1) / 2`

Para n = 5 da `5·4/2 = 10`. Como `n(n − 1)/2 = n²/2 − n/2`, el término dominante es `n²`: la función es **O(n²)**. Este número no depende de los datos: aunque ningún cliente se repita, el doble ciclo hace siempre todas las comparaciones (no hay ningún `break`).

### 3. Tabla de tiempos

`node src/tiempos.js 100000` genera datos nuevos con `generarVentasNo` (MiniReto 5) para cada tamaño y mide con `console.time` / `console.timeEnd`. Antes de medir hace una ejecución de calentamiento para que la compilación JIT de V8 no caiga en la primera medición. Resultados de una ejecución (Node.js v24.19.0, Windows 11):

| n | comparaciones n(n−1)/2 | tiempo | factor vs. fila anterior | clientes recurrentes |
|---:|---:|---:|---:|---:|
| 1.000 | 499.500 | 9,2 ms | - | 270 |
| 2.000 | 1.999.000 | 27,9 ms | 3,03 | 532 |
| 4.000 | 7.998.000 | 123,9 ms | 4,45 | 1.078 |
| 8.000 | 31.996.000 | 567,5 ms | 4,58 | 2.143 |
| 16.000 | 127.992.000 | 2.164,6 ms (2,2 s) | 3,81 | 4.224 |
| 100.000 (ejecutado) | 4.999.950.000 | 131.788 ms (2 min 11,8 s) | - | - |

En una ejecución anterior se obtuvieron 12,9 / 29,6 / 139,9 / 595,4 / 2.217,5 ms (factores 2,30 / 4,72 / 4,26 / 3,72): los valores exactos varían, pero el patrón es el mismo.

### 4. Análisis: ¿qué pasa al duplicar n?

Cada vez que `n` se duplica, el tiempo se multiplica **aproximadamente por 4** (3,03; 4,45; 4,58; 3,81; el promedio de los tres últimos saltos es 4,3). Es justo lo que predice O(n²):

`t(2n) / t(n) ≈ (2n)² / n² = 4`

La columna de comparaciones confirma la causa: al duplicar `n` las comparaciones se multiplican casi exactamente por 4 (499.500 → 1.999.000 → 7.998.000 …). El primer salto (1.000 → 2.000) se aleja más de 4 porque con tiempos de pocos milisegundos pesan el ruido del sistema y la optimización del motor; desde 4.000 ventas el factor ya se estabiliza alrededor de 4. Una función O(n), como `totalVendido`, solo duplicaría su tiempo.

### 5. Estimaciones para 100.000 y 1.000.000 de ventas

Se usa la medición más grande (n = 16.000, 2.164,6 ms) y la regla cuadrática `t(n) ≈ t(16.000) · (n / 16.000)²`:

- **100.000 ventas:** `(100.000 / 16.000)² = 6,25² = 39,06` → `2.164,6 ms × 39,06 ≈ 84.554 ms ≈ 1,4 min`. Como es menor a dos minutos, se ejecutó.
- **1.000.000 de ventas:** `(1.000.000 / 16.000)² = 62,5² = 3.906,25` → `2.164,6 ms × 3.906,25 ≈ 8.455.469 ms ≈ 2 h 21 min`. **No se ejecutó.**

**Resultado real con 100.000:** 131.788 ms (2 min 11,8 s), es decir, un 56 % más que lo estimado. La forma cuadrática se mantiene, pero la constante empeora con datos grandes. La explicación más probable es la memoria: con 16.000 ventas los datos caben en la memoria rápida del procesador (caché) y con 100.000 ya no, así que cada comparación tarda un poco más. A eso se suma que `includes` recorre un arreglo de recurrentes cada vez más largo (punto 6).

**Estimación corregida para 1.000.000**, calculada a partir de la medición real de 100.000: `131.788 ms × (1.000.000 / 100.000)² = 131.788 ms × 100 ≈ 13.178.800 ms ≈ 3 h 40 min`. Con las dos mediciones, el reporte anual de un millón de ventas tardaría **entre 2,3 y 3,7 horas**; la cifra basada en 100.000 es la más confiable porque se mide más cerca del tamaño objetivo.

### 6. Costo oculto: `recurrentes.includes`

`includes` no es gratis: recorre `recurrentes` elemento por elemento hasta encontrar el cliente o llegar al final, así que cuesta O(r), donde `r` es el número de clientes recurrentes ya encontrados. Por el `&&`, solo se llama cuando los dos clientes coinciden, pero se llama **en cada coincidencia**, también cuando el cliente ya estaba en la lista.

`node src/costoOculto.js` usa una copia instrumentada de la función que cuenta por separado las comparaciones del doble ciclo y los elementos que recorre `includes`:

**Datos del generador (~n/3 clientes):**

| n | comparaciones | llamadas a `includes` | elementos recorridos por `includes` |
|---:|---:|---:|---:|
| 500 | 124.750 | 774 | 44.168 |
| 1.000 | 499.500 | 1.457 | 160.404 |
| 2.000 | 1.999.000 | 3.084 | 644.664 |
| 4.000 | 7.998.000 | 5.930 | 2.827.338 |

Con datos típicos, `includes` añade unas 0,35 visitas por cada comparación y también crece ×4: el costo total sigue siendo O(n²), pero alrededor de un 35 % más caro de lo que sugiere el doble ciclo solo.

**Peor caso construido:** la primera mitad son `n/4` clientes que compran dos veces (llenan `recurrentes`) y la segunda mitad es un único cliente que compra `n/2` veces. Ese cliente queda al final de la lista, y cada una de sus ≈ `(n/2)²/2 = n²/8` coincidencias obliga a `includes` a recorrer ≈ `n/4` elementos:

| n | comparaciones | llamadas a `includes` | elementos recorridos por `includes` |
|---:|---:|---:|---:|
| 500 | 124.750 | 31.250 | 3.929.499 |
| 1.000 | 499.500 | 125.000 | 31.343.374 |
| 2.000 | 1.999.000 | 500.000 | 250.374.249 |
| 4.000 | 7.998.000 | 2.000.000 | 2.001.498.499 |

Al duplicar `n`, las visitas de `includes` se multiplican por **8** (≈ `2³`): `n²/8 coincidencias × n/4 elementos ≈ n³/32`. Con 4.000 ventas, `includes` ya hace 250 veces más trabajo que el doble ciclo. Por tanto, **en el peor caso la función es O(n³)**, no O(n²): el doble ciclo pone el piso cuadrático y `includes`, dentro de él, añade un tercer recorrido. Basta con que un cliente muy frecuente (por ejemplo, una cafetería que compra todos los días) aparezca después de muchos clientes recurrentes para acercarse a este caso.

### 7. Conclusión para la gerente

El reporte de clientes recurrentes se vuelve lento porque, para saber si alguien compró más de una vez, revisa cada venta contra todas las demás del historial, una por una. Es como si, para encontrar clientes repetidos en una pila de facturas, alguien tomara la primera factura y la comparara con todas las otras, luego la segunda con todas las otras, y así hasta el final.

Con pocas ventas no se nota, pero el trabajo no crece al mismo ritmo que el historial: **cada vez que el historial se duplica, el reporte tarda unas cuatro veces más**. En nuestras pruebas, 16.000 ventas tomaron 2 segundos; 100.000 ventas, más de 2 minutos; y un año con 1.000.000 de ventas tomaría entre 2 y 4 horas. Además, cuando hay clientes que compran muy seguido, el reporte repasa también su lista de clientes ya encontrados una y otra vez, lo que puede empeorarlo todavía más.

El problema no es el computador ni la cantidad de datos en sí, sino la forma en que el reporte busca los repetidos. Si se cambia por un método que pase por cada venta una sola vez, llevando la cuenta de cada cliente, el tiempo crecería al mismo ritmo que las ventas y el reporte anual tardaría segundos en lugar de horas.