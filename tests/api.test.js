// Muchas veces cuando veaís otros códigos de testing

// podemos utilizar la función "describe" para separar los tests, por ejemplo, por los diferentes endpoints que eueremos probar
describe("/api/books", ()=> {
    // aquí van los diferentes tests para ese endpoint
    it('should return an array of books', async ()=> {
        const response = await fetch("http://localhost:3000/api/books");

        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.message).toBe("Query executed successfully");
        expect(data.results.length).toBeGreaterThan(0);


    })
});

describe("/api/books/recommendations/:emotion/random", ()=> {
    it('should return a random book related to sadness emotion', async ()=> {
        const response = await fetch("http://localhost:3000/api/books/recommendations/Sadness/random");

        const data = await response.json();

        // codigo 200
        expect(response.status).toBe(200);
        // Que el array de resultado tenga 1 solo elemento
        expect(data.results).toHaveLength(1);
        // Que la propiedad "emotions" del libro REALMENTE incluya el valor "Sadness"
        expect(data.results[0].emotions).toContain("Sadness");
    })
});