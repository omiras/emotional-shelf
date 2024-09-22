# Emotional Shelf

La empresa _Emotional Sheld_ (estantería emocional) es una empresa de venta de libros. Tiene un amplio catálogo de libros como cualquier otra empresa. El valor añadido de esta empresa es que son especialistas en recomendar libros en función del estado anímico del lector

## La emociones

Según diversos estudios llevados a cabo por _Emotional Shel_ , las principales emociones que llevan a leer a las personas son

- Inspiration
- Curiostity
- Espacism
- Nostalgia
- Happiness
- Sadness

Todo su catálogo de libros se basa en relacionar libros con estas emociones para su posterior recomendación

## Setup Inicial

Ejecuta el siguiente código en un cliente de MongoDB para crear una base de datos de nombre "emotional-shelf" e insertar los 20 primeros libros.

```
db.books.insertMany([
  {
    title: "The Power of Now",
    isbn: "9781577314806",
    photoUrl: "https://example.com/photo1.jpg",
    price: 15.99,
    description: "A practical guide for spiritual enlightenment.",
    emotions: ["Inspiration", "Happiness"]
  },
  {
    title: "The Great Gatsby",
    isbn: "9780743273565",
    photoUrl: "https://example.com/photo2.jpg",
    price: 12.99,
    description: "A portrait of life in America during the 1920s.",
    emotions: ["Nostalgia", "Sadness"]
  },
  {
    title: "The Alchemist",
    isbn: "9780062315007",
    photoUrl: "https://example.com/photo3.jpg",
    price: 10.99,
    description: "A journey toward self-discovery and following dreams.",
    emotions: ["Inspiration", "Happiness"]
  },
  {
    title: "1984",
    isbn: "9780451524935",
    photoUrl: "https://example.com/photo4.jpg",
    price: 14.99,
    description: "A critique of surveillance and oppression in a totalitarian society.",
    emotions: ["Curiosity", "Escapism"]
  },
  {
    title: "Pride and Prejudice",
    isbn: "9780141439518",
    photoUrl: "https://example.com/photo5.jpg",
    price: 9.99,
    description: "A novel about love and social prejudice.",
    emotions: ["Happiness", "Nostalgia"]
  },
  {
    title: "The Shadow of the Wind",
    isbn: "9788408205102",
    photoUrl: "https://example.com/photo6.jpg",
    price: 18.99,
    description: "A mystery set in post-war Barcelona.",
    emotions: ["Curiosity", "Escapism"]
  },
  {
    title: "The Book Thief",
    isbn: "9780385754532",
    photoUrl: "https://example.com/photo7.jpg",
    price: 13.99,
    description: "A story of a young girl in Nazi Germany who finds solace in stealing books.",
    emotions: ["Sadness", "Happiness"]
  },
  {
    title: "Brave New World",
    isbn: "9780060850520",
    photoUrl: "https://example.com/photo8.jpg",
    price: 11.99,
    description: "A dystopian novel exploring a technologically advanced society.",
    emotions: ["Curiosity", "Escapism"]
  },
  {
    title: "The House of the Spirits",
    isbn: "9780552772937",
    photoUrl: "https://example.com/photo9.jpg",
    price: 16.99,
    description: "A family saga that blends realism and supernatural elements.",
    emotions: ["Nostalgia", "Inspiration"]
  },
  {
    title: "The Diary of Anne Frank",
    isbn: "9780552776577",
    photoUrl: "https://example.com/photo10.jpg",
    price: 10.99,
    description: "The diary of a Jewish girl during the Nazi occupation.",
    emotions: ["Sadness", "Reflection"]
  },
  {
    title: "The Old Man and the Sea",
    isbn: "9780684832502",
    photoUrl: "https://example.com/photo11.jpg",
    price: 10.99,
    description: "The struggle of an old fisherman against a giant fish.",
    emotions: ["Inspiration", "Sadness"]
  },
  {
    title: "A Wrinkle in Time",
    isbn: "9780316353005",
    photoUrl: "https://example.com/photo12.jpg",
    price: 8.99,
    description: "A science fantasy story about a girl's journey through space and time.",
    emotions: ["Curiosity", "Escapism"]
  },
  {
    title: "The Catcher in the Rye",
    isbn: "9780316769488",
    photoUrl: "https://example.com/photo13.jpg",
    price: 14.99,
    description: "A story about teenage angst and alienation.",
    emotions: ["Sadness", "Nostalgia"]
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    isbn: "9780345391803",
    photoUrl: "https://example.com/photo14.jpg",
    price: 12.99,
    description: "A comedic science fiction adventure through space.",
    emotions: ["Happiness", "Curiosity"]
  },
  {
    title: "The Night Circus",
    isbn: "9780385534643",
    photoUrl: "https://example.com/photo15.jpg",
    price: 20.99,
    description: "A magical competition between two young illusionists.",
    emotions: ["Escapism", "Happiness"]
  },
  {
    title: "Fahrenheit 451",
    isbn: "9781451673319",
    photoUrl: "https://example.com/photo16.jpg",
    price: 13.99,
    description: "A dystopian novel where books are banned.",
    emotions: ["Curiosity", "Escapism"]
  },
  {
    title: "The Curious Incident of the Dog in the Night-Time",
    isbn: "9781400032716",
    photoUrl: "https://example.com/photo17.jpg",
    price: 14.99,
    description: "A unique perspective of a young boy with autism solving a mystery.",
    emotions: ["Curiosity", "Inspiration"]
  },
  {
    title: "Where the Crawdads Sing",
    isbn: "9780735219090",
    photoUrl: "https://example.com/photo18.jpg",
    price: 10.99,
    description: "A story of resilience and survival in the marshes of North Carolina.",
    emotions: ["Inspiration", "Sadness"]
  },
  {
    title: "The Secret Garden",
    isbn: "9780689843200",
    photoUrl: "https://example.com/photo19.jpg",
    price: 15.99,
    description: "A story about healing and the power of nature.",
    emotions: ["Happiness", "Nostalgia"]
  },
  {
    title: "Life of Pi",
    isbn: "9780156027328",
    photoUrl: "https://example.com/photo20.jpg",
    price: 12.99,
    description: "A boy's survival story on a lifeboat with a Bengal tiger.",
    emotions: ["Inspiration", "Escapism"]
  }
]);

```

## Iteración 1: On

Crea una estructura suficiente Express/NodeJS para crear un endpont que sea devuelve todos los libros de la base de datos en formato JSON.

Sigue el modelo modelo-vista-controlador (MVC). Recuerda que debes crear

- El fichero app.js
- El modelo en la carpeta **models**
- Los controladores en la carpeta **controllers**
- Las rutas en la carpeta **routes**
- Todas las rutas deben ir prefijadas con el prefijo '/api'

`GET /api/books` 

## Iteración 2

La funcionalidad estrella de la API es recomendar libros en función de la emoción que lleva a leerlos. Implemetna el siguiente _endpoint_ que dada una emoción, devuelve los 20 libros clasificados con dicha emoción

`GET /api/books/recommendations/:emotion`

1. La API debe devolver un JSON con 20 libros clasificados con la emoción ':emotion'
2. La API debe devolver un error en el caso que la emoción suministrada no sea ninguna de las que maneja la REST API

## Iteración 2.5

Usa el módulo de terceros [express-validator](https://express-validator.github.io/docs) para hacer la validación anterior, en vez de hacerlo _a mano_. 

## Iteración 3

Crea un _endpoint_ que dada una emoción, devuelva un libro de forma aleatória relcionado con esa emoción suministrada

`GET /api/books/recommendations/:emotion/random`

1. La API debe devolver un JSON con 1 libro aleatório clasificado con la emoción ':emotion'
2. La API debe devolver un error en el caso que la emoción suministrada no sea ninguna de las que maneja la REST API

## Iteración 4

Implementa un endpoint para poder añadir un libro nuevo

`POST /api/books/`

1. La API deve devolver un JSON con el identificador (Object ID) del libro que acaba de insertar en la base de datos
2. La API debe devolver un error si algunos de los campos del POST no és un valor admitido o cualquier otro valor demasiado grande, pequeño o peligroso que pueda comprometer la creación del libro.

Usa _express-validator_ para validar los datos que recibe la API.
Usa adecuadamente también la estructura de control try...catch para capturar cualquier error de validación de los datos contra el _Schema_ de la base de datos





