import { useState } from "react"

type Beverage = {
    name: string;
    weight: string;
    price: number;
    roastLevel: 1 | 2 | 3 | 4 | 5;
};

const mockBeverages: Beverage[] = [
    {
        name: "Espresso",
        weight: "50g",
        price: 2.50,
        roastLevel: 5
    },
    {
        name: "Latte",
        weight: "350g",
        price: 3.50,
        roastLevel: 3
    },
    {
        name: "Cappuccino",
        weight: "300g",
        price: 3.00,
        roastLevel: 4
    },
    {
        name: "Americano",
        weight: "400g",
        price: 2.75,
        roastLevel: 2
    },
    {
        name: "Mocha",
        weight: "450g",
        price: 4.00,
        roastLevel: 3
    },
    {
        name: "Macchiato",
        weight: "200g",
        price: 2.25,
        roastLevel: 4
    },
    {
        name: "Flat White",
        weight: "350g",
        price: 3.75,
        roastLevel: 3
    }
];


export default function FavoriteList() {
    const [favorites, setFavorites] = useState<Beverage[]>(mockBeverages)
    const numberOfItemsToShow = 5
    const [visible, setVisible] = useState(numberOfItemsToShow)
    
    return (
        <div className="favorites-wrapper">
            <h2>My TOP-5 favorites</h2>
            <ul>
                {favorites.slice(0,visible).map((beverage, index) => {
                    return (
                    <li key={beverage.name}>
                        <p>{index + 1}</p>
                        <div>
                            <p>{beverage.name}</p>
                            <p>Degree of roast: {beverage.roastLevel}</p>
                            <p>{beverage.price}€, {beverage.weight}</p>
                        </div>
                    </li>
                )
                })}
            </ul>
            {(visible >= favorites.length + 1 ) ? null : <p className="see-all" onClick={() => setVisible(prev => prev + 3)}>See all</p>}
        </div>
    )
}