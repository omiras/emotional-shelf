const Book = require("../models/book.model");
const { validationResult } = require("express-validator");

const modifyEmotion = (emotion) => {
  return emotion.charAt(0).toUpperCase() + emotion.slice(1).toLowerCase();
};

exports.validEmotions = [
  "Inspiration",
  "Curiosity",
  "Escapism",
  "Nostalgia",
  "Happiness",
  "Sadness",
];
// otra forma de exportar varios recursos, ¿cuál os gusta más?
exports.getBooks = async (req, res) => {
  const books = await Book.find().limit(20);
  // console.log(books)

  return res.status(200).json({
    message: "Query executed successfully",
    results: books,
  });
};

exports.getBooksByEmotion = async (req, res) => {
  //Converting the parameter to match the model's format, ensuring consistent handling of emotions regardless of input case variations
  const emotion = modifyEmotion(req.params.emotion);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: `Error when trying to find books with emotion ${emotion}`,
      errors: errors.array(),
    });
  }

  //    Check if the provided emotion is valid
  //    if (!validEmotions.includes(emotion)) {
  //     return res.status(400).json({
  //         error: `Please provide one of the following emotions: ${validEmotions.join(', ')}`
  //     });
  // }
  try {
    const books = await Book.find({ emotions: emotion }).limit(20);
    return res.status(200).json({
      message: `Query by the emotion: ${emotion} executed successfully`,
      results: books,
    });
  } catch (error) {
    res.status(400).json({ error: "Error fetching books" }); // Handle any errors
  }
};

exports.getRandomRecommendationByEmotion = async (req, res) => {
  const emotion = modifyEmotion(req.params.emotion);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: `Error when trying to find a random book with emotion ${emotion}`,
      errors: errors.array(),
    });
  }
  try {
    const randomBook = await Book.aggregate([
      { $match: { emotions: { $in: [emotion] } } }, // Match books where the emotions array contains the given emotion
      { $sample: { size: 1 } }, // Randomly select one book from the matched books
    ]);

    console.log('random book: ', randomBook)
     // Iteración 5: Necesitamos realizar una petición a la API De Google y obtener el libro relacionado con el ISBN y encontrar una propiedad en la respuesta de la API Google para obtener la imagen del libro. Luego, de alguna manera, hay adjuntar esta imagen en la respuesta al cliente. Quizás la forma más sencilla es crear un objeto de cero con todos los campos necesarios.
    /**
     * 
  "message": "Query executed successfully",
  "results": [
    {
      "title": "The Fault in Our Stars",
      "description": "Two teenagers with cancer find love and meaning.",
      "price": 12.99,
      "isbn": 12.99,
      "_id": "66faeca9ec0fb18c609eb4b1",
      "emotions": [
        "Happiness",
        "Sadness"
      ],
      "imageURL": "http://books.google.com/books/content?id=Dc2LDQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    }
  ]
}
     */
    console.log('isbn: ', randomBook[0].isbn)

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${randomBook[0].isbn}`);

    const data = await response.json();
    console.log('data: ', data)

    res.status(200).json({
      message: `Random book by the emotion: ${emotion} retrieved successfully`,
      results: randomBook[0], // Iteración 5: ¿Cómo adunto la propiedad imageUrl a este libro?
    });
  } catch (error) {
    res.status(400).json({ error: "Error fetching books" }); // Handle any errors
  }
};

// Handle the submission of a new apartment
exports.postNewBook = async (req, res) => {
  const { title, isbn, price, description, emotions } = req.body;

  try {
    // Create a new apartment in the database
    const newBook = await Book.create({
      title,
      isbn,
      price,
      description,
      emotions,
    });

    // Return the Object ID of the newly created book

    return res.status(201).json({ message: `New book "${newBook.title}" created correctly.`, bookId: newBook._id });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(400).json({ message: `Error adding the book to the database. Error: ${error.message}` });
  }
};



