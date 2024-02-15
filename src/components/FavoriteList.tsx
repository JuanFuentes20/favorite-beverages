import { useState } from "react"

type Beverage = {
    id: string;
    name: string;
    weight: string;
    price: number;
    roastLevel: number;
};

export default function FavoriteList({ beverages, status }: { beverages?: Beverage[], status: string }) {
    const numberOfItemsToShow = 5;
    const [visible, setVisible] = useState(numberOfItemsToShow);
  
    return (
      <div className="favorites-wrapper">
        <h2>My TOP-5 favorites</h2>
        {(status === 'success' && beverages && beverages.length > 0) ? (
          <ul>
            {beverages.slice(0, visible).map((beverage, index) => {
              return (
                <li key={beverage.id}>
                  <p>{index + 1}</p>
                  <div>
                    <p>{beverage.name}</p>
                    <p>Degree of roast: {beverage.roastLevel}</p>
                    <p>{beverage.price}€, {beverage.weight}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (status === 'loading') ? <p>Loading...</p> : <p>No beverages saved</p>}
  
        {(beverages && beverages.length > 0 && visible >= beverages.length + 1) ? null : <p className="see-all" onClick={() => setVisible(prev => prev + 3)}>See all</p>}
      </div>
    );
  }
  