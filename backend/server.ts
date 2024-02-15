import express, { Express, Request, Response } from "express";
import cors from 'cors';
import fs from 'fs/promises';

const app: Express = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Types
type Beverage = {
    name: string;
    weight: string;
    price: number;
    roastLevel: 1 | 2 | 3 | 4 | 5;
};

// Get all beverages from the JSON file
async function getBeverages(): Promise<Beverage[]> {
    try {
        const data = await fs.readFile('beverages.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Add beverage to the beverages.json file
async function addBeveragesToFile(beverages: Beverage[]): Promise<void> {
    try {
        await fs.writeFile('beverages.json', JSON.stringify(beverages, null, 2));
    } catch (error) {
        console.log(error);
    }
}

// Fetch beverages
app.get('/api/beverages', async (req: Request, res: Response) => {
    const beverages = await getBeverages();
    res.json(beverages);
});

// Post a beverage
app.post('/api/beverages', async (req: Request, res: Response) => {
    const newBeverage: Beverage = req.body;
    const beverages = await getBeverages();
    beverages.push(newBeverage);
    await addBeveragesToFile(beverages);
    res.status(201).json(newBeverage);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
