# General

En este base de datos puedes encontrar un montón de apartamentos y sus reviews, esto está sacado de hacer
webscrapping.

**Pregunta: Si montaras un sitio real, ¿qué posibles problemas pontenciales le ves a cómo está almacenada la
información?**

```
Lo primero de todo es que los datos obtenidos usando webscraping sin permiso puede violvar terminos de servicio del sitio web "scrapeado".

Los datos que tenemos no son actuales, son los datos en el momento que hicimos el scrape. En este caso, la disponibilidad y el precio quizas es importante.

Si se quiere actualizar los datos hay que tener un buen sistema para evitar duplicados o gestionar cambios.

En cuanto al documento, hay campos dentro del documento como images, host, reviews que parecen ser arrays y pueden afectar al tamano del documento.

En general vemos como los datos estan almacenados en grandes documentos en lugar de dividirse en varias tablas relacionadas (Modelo de MongoDB), esto nos ofrece lecturas rapidas, pero actualizaciones lentas. Si por ejemplo un dato se cambia y este se repite en otros documentos hay que actualizar todos los documentos.
```

# Consultas

## Basico

- **Saca en una consulta cuántos apartamentos hay en España.**

```
db.listingsAndReviews.find({"address.country": "Spain"}).count();
```

- **Lista los 10 primeros:**

  - **Sólo muestra: nombre, camas, precio, government_area**
  - **Ordenados por precio.**

```
db.listingsAndReviews.find(
    {"address.country": "Spain"},
    {
        _id: 0,
        name: 1,
        beds: 1,
        price: 1,
        "address.government_area": 1
    }
).sort({price: 1}).limit(10).pretty();
```

## Filtrando

- **Queremos viajar cómodos, somos 4 personas y queremos:**
- **4 camas.**
- **Dos cuartos de baño.**

```
db.listingsAndReviews.find(
    {
        "address.country": "Spain",
        beds: {$gte: 4},
        bathrooms: {$gte: 2.0}
    },
    {
        _id: 0,
        name: 1,
        beds: 1,
        price: 1,
        "address.government_area": 1
    }
).sort({price: 1}).limit(10).pretty();
```

- **Al requisito anterior, hay que añadir que nos gusta la tecnología queremos que el apartamento tenga wifi.**

```
db.listingsAndReviews.find(
    {
        "address.country": "Spain",
        beds: {$gte: 4},
        bathrooms: {$gte: 2.0},
        amenities: "Wifi"
    },
    {
        _id: 0,
        name: 1,
        beds: 1,
        price: 1,
        "address.government_area": 1
    }
).sort({price: 1}).limit(10).pretty();
```

- **Y bueno, un amigo se ha unido que trae un perro, así que a la query anterior tenemos que buscar que permitan mascota Pets Allowed**

```
db.listingsAndReviews.find(
    {
        "address.country": "Spain",
        beds: {$gte: 4},
        bathrooms: {$gte: 2.0},
        amenities: {$all: ["Wifi", "Pets Allowed"]}
    },
    {
        _id: 0,
        name: 1,
        beds: 1,
        price: 1,
        "address.government_area": 1
    }
).sort({price: 1}).limit(10).pretty();
```

## Operadores lógicos

- **Estamos entre ir a Barcelona o a Portugal, los dos destinos nos valen, peeero... queremos que el precio nos salga baratito (50 $), y que tenga buen rating de reviews**

```
db.listingsAndReviews.find(
    {
        $or: [
            {"address.country": "Spain", "address.market": "Barcelona"},
            {"address.country": "Portugal"}
        ],
        beds: {$gte: 4},
        bathrooms: {$gte: 2.0},
        amenities: "Wifi",
        price: {$lte: 50},
        "review_scores.review_scores_rating": {$gte: 4.5}
    },
    {
        _id: 0,
        name: 1,
        beds: 1,
        price: 1,
        "address.government_area": 1,
	"address.market": 1
    }
).sort({price: 1}).limit(10).pretty();

```

## Agregaciones

- **Queremos mostrar los pisos que hay en España, y los siguiente campos:**
  - **Nombre.**
  - **De que ciudad (no queremos mostrar un objeto, solo el string con la ciudad)**
  - **El precio**

```
db.listingsAndReviews.aggregate([
    {
        $match: {
            "address.country": "Spain"
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            city: "$address.market",
            price: 1
        }
    }
]).pretty();
```

- **Queremos saber cuántos alojamientos hay disponibles por país.**

```
db.listingsAndReviews.aggregate([
    {
        $group: {
            _id: "$address.country",
            count: { $sum: 1 }
        }
    },
    {
        $project: {
            country: "$_id",
            count: 1,
            _id: 0
        }
    },
    {
        $sort: {
            count: -1
        }
    }
]).pretty();

```

## Opcional

- **Queremos saber el precio medio de alquiler de airbnb en España.
  Como queremos agrupar todos los documentos sin preocuparnos de ninguna categoria, usamos \_id:null dentro de $group.**

```
db.listingsAndReviews.aggregate([
    {
        $match: {
            "address.country": "Spain"
        }
    },
    {
        $group: {
            _id: null,
            averagePrice: { $avg: "$price" }
        }
    },
    {
        $project: {
            _id: 0,
            averagePrice: 1
        }
    }
]).pretty();

```

- **¿Y si quisiéramos hacer como el anterior, pero sacarlo por paises?**

```
db.listingsAndReviews.aggregate([
    {
        $group: {
            _id: "$address.country",
            averagePrice: {$avg: "$price"}
        }
    }
]).pretty();
```

Lo podriamos ordenar por precio anadiendo $sort: {averagePrice: -1}

```
db.listingsAndReviews.aggregate([
    {
        $group: {
            _id: "$address.country",
            averagePrice: {$avg: "$price"}
        }
    },
    {
         $sort: {averagePrice: -1}
    }
]).pretty();
```

- **Repite los mismos pasos pero agrupando también por número de habitaciones.**

#### Precio medio de alquiler de Airbnb en España agrupado por numero de habitaciones

```
db.listingsAndReviews.aggregate([
    {
        $match: {"address.country": "Spain"}
    },
    {
        $group: {
            _id: "$bedrooms",
            averagePrice: {$avg: "$price"}
        }
    },
    {
        $sort: {_id: 1}
    }
]).pretty();

```

Como \_id es un poco confuso, podriamos modificar el nombre

```
db.listingsAndReviews.aggregate([
    {
        $match: {"address.country": "Spain"}
    },
    {
        $group: {
            "_id": "$bedrooms",
            "averagePrice": { $avg: "$price" }
        }
    },
    {
        $project: {
            "numberOfRooms": "$_id",
            "averagePrice": 1,
            "_id": 0
        }
    },
    {
        $sort: {"numberOfRooms": 1}
    }
])

```

#### Precio medio de alquiler de Airbnb por pais agrupado tambien por numero de habitaciones:

```
db.listingsAndReviews.aggregate([
    {
        $group: {
            _id: {
                country: "$address.country",
                bedrooms: "$bedrooms"
            },
            averagePrice: {$avg: "$price"}
        }
    },
    {
        $sort: {
            "_id.country": 1,
            "_id.bedrooms": 1
        }
    }
]).pretty();
```

# Desafio

- **Queremos mostrar el top 5 de apartamentos más caros en España, y sacar los siguentes campos:**
  - **Nombre.**
  - **Ciudad.**
  - **Amenities, pero en vez de un array, un string con todos los amenities.**

El problema lo abordamos de la siguiente forma:

1. Filtramos todos los documentos que tienen como country 'Spain'
2. Ordenamos por precio
3. Limitamos a los 5 resultados mas caros
4. Tenemos que usar $project para transformar 'amenities' en un string

```
db.listingsAndReviews.aggregate([
    { $match: {"address.country": "Spain"} },
    { $sort: {price: -1} },
    { $limit: 5 },
    {
        $project: {
            _id: 0,
            name: 1,
            city: "$address.city",
            amenities: {
                $reduce: {
                    input: "$amenities",
                    initialValue: "",
                    in: {
                        $cond: [
                            { $eq: ["$$value", ""] },
                            "$$this",
                            { $concat: ["$$value", ", ", "$$this"] }
                        ]
                    }
                }
            }
        }
    }
]).pretty();

```
