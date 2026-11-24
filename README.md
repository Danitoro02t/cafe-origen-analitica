# Café Origen: motor de analítica v0.1

Proyecto de análisis de una muestra de 12 ventas de Café Origen. El motor calcula indicadores, agrupa resultados y presenta un informe legible en la consola con Node.js, sin dependencias externas.

## Requisitos

- Node.js LTS

## Ejecutar el reporte

Desde la raíz del proyecto, ejecuta:

```sh
node src/reporte.js
```

El informe muestra el resumen general, las ventas por ciudad, las unidades por producto y los tres productos con mayor valor vendido. También compara un día con ventas con uno sin ventas.

## Verificar los cálculos

```sh
node src/verificar.js
```

El proceso termina con código distinto de cero si alguna comprobación falla.

## Explorar los datos

```sh
node src/explorar.js
```

El script muestra el número de registros, el primero y el último, el producto del registro en la posición 4 y la tabla completa. La estructura de los datos, los casos borde y la bitácora de depuración están en [bitacora.md](./bitacora.md).

## Preguntas que responde

- ¿Cuánto se vendió en total y cuál fue el ticket promedio?
- ¿Cuántas unidades se vendieron por producto?
- ¿Cuánto vendió cada ciudad, agrupando variantes de mayúsculas y espacios?
- ¿Qué tres productos generaron más valor?
- ¿Cuáles fueron las ventas, unidades y ticket promedio de una fecha determinada?