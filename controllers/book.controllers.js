const Book = require("../models/book.model");
const { validationResult } = require("express-validator");


const validEmotions = [
    "Inspiration",
    "Curiosity",
    "Espacism",
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
  const { emotion } = req.params;
  //Converting the parameter to match the model's format, ensuring consistent handling of emotions regardless of input case variations
  let modifiedEmotion = emotion.charAt(0).toUpperCase() + emotion.slice(1).toLowerCase();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: `Error when trying to find books with emotion ${modifiedEmotion}`,
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
    const books = await Book.find({ emotions: modifiedEmotion }).limit(20);
    return res.status(200).json({
      message: `Query by the emotion: ${modifiedEmotion} executed successfully`,
      results: books,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" }); // Handle any errors
  }
};

exports.getRandomRecommendationByEmotion = async (req, res) => {
    const { emotion } = req.params;
    let modifiedEmotion = emotion.charAt(0).toUpperCase() + emotion.slice(1).toLowerCase();
    console.log(modifiedEmotion)
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: `Error when trying to find a random book with emotion ${modifiedEmotion}`,
        errors: errors.array(),
      });
    }
    try {
        const randomBook = await Book.aggregate([
            { $match: { emotions: { $in: [modifiedEmotion] } } },  // Match books where the emotions array contains the given emotion
            { $sample: { size: 1 } }                       // Randomly select one book from the matched books
        ]);

        return res.status(200).json({
          message: `Random book by the emotion: ${modifiedEmotion} retrieved successfully`,
          results: randomBook[0],
        });
      } catch (error) {
        res.status(500).json({ error: "Error fetching books" }); // Handle any errors
      }
}