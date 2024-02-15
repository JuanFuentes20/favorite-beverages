import express, { Express, Request, Response } from "express";
const fs = require('fs/promises');
const app: Express = express();
const PORT = process.env.PORT || 5000;


//Types
type Beverage = {
    name: string;
    weight: string;
    price: number;
    roastLevel: 1 | 2 | 3 | 4 | 5;
};

// Get all beverages from the JSON file
function getBeverages() : Beverage[] {
    try {
        const data = fs.readFileSync('beverages.json');
        return JSON.parse(data);
    } catch (error) {
        console.log(error)
        return [];
    }
}

// Add beverage to the beverage.json file
function addBeveragesToFile(beverages: Beverage[]): void {
    fs.writeFileSync('beverages.json', JSON.stringify(beverages, null, 2));
}

// Fetch beverages
app.get('/api/beverages', (req: Request, res: Response) => {
    const beverages = getBeverages();
    res.json(beverages);
});

// Post a beverage
app.post('/api/beverages', (req: Request, res: Response) => {
    const newBeverage: Beverage = req.body;
    const beverages = getBeverages();
    beverages.push(newBeverage);
    addBeveragesToFile(beverages);
    res.status(201).json(newBeverage);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
