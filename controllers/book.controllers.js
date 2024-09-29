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
    res.status(500).json({ error: "Error fetching books" }); // Handle any errors
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
    return res.status(200).json({
      message: `Random book by the emotion: ${emotion} retrieved successfully`,
      results: randomBook[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" }); // Handle any errors
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

    return res.status(200).json({ message: `New book "${newBook.title}" created correctly.`,bookId: newBook._id });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Error adding the book to the database" });
  }
};
