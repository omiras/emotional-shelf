const getGoogleBookByISBN = async (isbn) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const googleBook = await response.json();

        if (googleBook.totalItems !== 0) {
            return googleBook.items[0].volumeInfo.imageLinks.thumbnail;
        } else {
            return "https://placehold.co/600x400/png";
        }
    } catch (error) {
        throw new Error('Error fetching book from Google Books API');
    }
};

module.exports = { getGoogleBookByISBN };
