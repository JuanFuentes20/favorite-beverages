import { useState } from "react"
import { Beverage } from '../types/Beverage';

export default function FavoriteList({ page, beverages, status }: { page: Number, beverages?: Beverage[], status: string }) {
    const numberOfItemsToShow = 5;
    const [visible, setVisible] = useState(numberOfItemsToShow);
  
    return (
      <div className="favorites-wrapper">
        {page === 0 ? <h2>My TOP-5 coffee's</h2> : (page === 1) ? <h2>My TOP-5 tea's</h2>: <h2>My TOP-5 favorites</h2>}
        {(status === 'success' && beverages && beverages.length > 0) ? (
          <ul>
            {beverages.slice(0, visible).map((beverage, index) => {
              return (
                <li key={beverage.id}>
                  <p>{index + 1}</p>
                  <div>
                    <p>{beverage.name}</p>
                    <p>Degree of roast: {beverage.roastLevel}</p>
                    <p>{beverage.price}€, {beverage.weight}g</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (status === 'loading') ? <p>Loading...</p> : <p>No beverages saved</p>}
  
        {(beverages && visible < beverages.length + 1) ? <p className="see-all" onClick={() => setVisible(prev => prev + 3)}>See all</p> : null}
      </div>
    );
  }
  