import { useState, FormEvent, ChangeEvent, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import {v4 as uuidv4} from 'uuid';


type Beverage = {
    id: string;
    name: string;
    weight: string;
    price: number;
    roastLevel: number;
};


type BeverageFormProps = {
  setBeverages: React.Dispatch<SetStateAction<Beverage[]>>;
};

export default function BeverageForm({setBeverages} : BeverageFormProps) {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState(0);
    const [roastLevel, setRoastLevel] = useState(1);

    const mutation = useMutation({
        mutationFn: async (newBeverage: Beverage) => {
          const response = await fetch('http://localhost:5000/api/beverages', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBeverage)
          });
          return response.json();
        },
        onSuccess: (data: Beverage) => {
          setBeverages(prev => [...prev, data])
        }
      });
      

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
        const newBeverage: Beverage = {id: uuidv4(), name, weight, price, roastLevel };
        mutation.mutate(newBeverage)
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
                    <input required type="text" name="name" id="name" value={name} onChange={handleNameChange} />
                </div>
                <div>
                    <label htmlFor="weight">Package weight</label>
                    <div className="input-container">
                        <input required className="small" type="text" name="weight" id="weight" value={weight} onChange={handleWeightChange} />
                        <p>g</p>
                    </div>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <div className="input-container">
                        <input required className="small" type="number" name="price" id="price" value={isNaN(price) ? '' : price} onChange={handlePriceChange} />
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
