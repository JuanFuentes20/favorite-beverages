import { useState, FormEvent, ChangeEvent } from 'react';

type Beverage = {
    name: string;
    weight: string;
    price: number;
    roastLevel: number;
};

export default function BeverageForm() {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState(0);
    const [roastLevel, setRoastLevel] = useState(1);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value);
    };

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const priceValue = parseFloat(e.target.value);
        setPrice(priceValue);
    };

    const handleRoastLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
        const roastLevel = parseFloat(e.target.value);
        setRoastLevel(roastLevel);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newBeverage: Beverage = { name, weight, price, roastLevel };
        console.log(newBeverage)
        setName('');
        setWeight('');
        setPrice(0);
        setRoastLevel(1);
    };

    return (
        <div className="form-container">
            <h2>Add new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={name} onChange={handleNameChange} />
                </div>
                <div>
                    <label htmlFor="weight">Package weight</label>
                    <div className="input-container">
                        <input className="small" type="text" name="weight" id="weight" value={weight} onChange={handleWeightChange} />
                        <p>g</p>
                    </div>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <div className="input-container">
                        <input className="small" type="number" name="price" id="price" value={isNaN(price) ? '' : price} onChange={handlePriceChange} />
                        <p>€</p>
                    </div>
                </div>
                <div className="radio-input">
                    <p>Degree of roast</p>
                    <div>
                        <input type="radio" id="light" name="roastLevel" value="1" checked={roastLevel === 1} onChange={handleRoastLevelChange} />
                        <label htmlFor="light">Light roast</label>
                    </div>
                    <div>
                        <input type="radio" id="medium" name="roastLevel" value="2" checked={roastLevel === 2} onChange={handleRoastLevelChange} />
                        <label htmlFor="medium">Medium roast</label>
                    </div>
                    <div>
                        <input type="radio" id="dark" name="roastLevel" value="3" checked={roastLevel === 3} onChange={handleRoastLevelChange} />
                        <label htmlFor="dark">Dark roast</label>
                    </div>
                    <div>
                        <input type="radio" id="espresso" name="roastLevel" value="4" checked={roastLevel === 4} onChange={handleRoastLevelChange} />
                        <label htmlFor="espresso">Espresso roast</label>
                    </div>
                    <div>
                        <input type="radio" id="french" name="roastLevel" value="5" checked={roastLevel === 5} onChange={handleRoastLevelChange} />
                        <label htmlFor="french">French roast</label>
                    </div>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
