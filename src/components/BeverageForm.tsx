import { useState, FormEvent, ChangeEvent } from 'react';
import { useMutation } from 'react-query';
import {v4 as uuidv4} from 'uuid';
import { Beverage, RoastLevel, BeverageType } from '../types/Beverage';
  


type BeverageFormProps = {
  setBeverages: React.Dispatch<React.SetStateAction<Beverage[]>>;
};

export default function BeverageForm({setBeverages} : BeverageFormProps) {
    const [type, setType] = useState<BeverageType>(0)
    const [name, setName] = useState('');
    const [weight, setWeight] = useState(0);
    const [price, setPrice] = useState(0);
    const [roastLevel, setRoastLevel] = useState<RoastLevel>(1);

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
      

    const handleBeverageTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const beverageType: BeverageType = parseInt(e.target.value, 10);
        setType(beverageType);
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        const weigthValue = parseFloat(e.target.value);
        setWeight(weigthValue);
    };

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const priceValue = parseFloat(e.target.value);
        setPrice(priceValue);
    };

    const handleRoastLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
        const roastLevel: RoastLevel = parseInt(e.target.value, 10);
        setRoastLevel(roastLevel);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newBeverage: Beverage = {id: uuidv4(), type, name, weight, price, roastLevel };
        mutation.mutate(newBeverage)
        setType(0)
        setName('');
        setWeight(0);
        setPrice(0);
        setRoastLevel(1);
    };

    return (
        <div className="form-container">
            <h2>Add new</h2>
            <form onSubmit={handleSubmit}>
            <div className="radio-input">
                    <p>Type of beverage</p>
                    <div>
                        <input type="radio" id="coffee" name="coffee" value="0" checked={type === 0} onChange={handleBeverageTypeChange} />
                        <label htmlFor="coffee">Coffee</label>
                    </div>
                    <div>
                        <input type="radio" id="tea" name="tea" value="1" checked={type === 1} onChange={handleBeverageTypeChange} />
                        <label htmlFor="tea">Tea</label>
                    </div>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input required type="text" name="name" id="name" value={name} onChange={handleNameChange} />
                </div>
                <div>
                    <label htmlFor="weight">Package weight</label>
                    <div className="input-container">
                        <input required className="small" type="number" name="weight" id="weight" value={isNaN(weight) ? '' : weight} onChange={handleWeightChange} />
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
                <button type="submit" style={{opacity: mutation.isLoading ? '0.6' : '1', cursor: mutation.isLoading ? 'not-allowed' : 'initial'}}>Save</button>
            </form>
        </div>
    );
}
