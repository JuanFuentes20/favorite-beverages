import './App.css';
import Header from './components/Header';
import FavoriteList from './components/FavoriteList';
import BeverageForm from './components/BeverageForm';
import { useQuery } from 'react-query'
import { useState, useEffect } from 'react';


enum BeverageType {
  Coffee,
  Tea
}

type Beverage = {
  id: string;
  type: BeverageType;
  name: string;
  weight: number;
  price: number;
  roastLevel: number;
};


function App() {

  const [beverages, setBeverages] = useState<Beverage[]>([])
  const [filteredBeverages, setFilteredBeverages] = useState<Beverage[]>([])
  const [page, setPage] = useState<0 | 1 | 2>(0)

  useEffect(() => {
    if(beverages.length > 0){
      const beveragesByPage = beverages.filter(beverage => {
        if(page === 2) return beverage
        return beverage.type === page 
      })
      setFilteredBeverages(beveragesByPage)
    }
    
  }, [page, beverages])

  const fetchBeverages = async () => {
    const response = await fetch('http://localhost:5000/api/beverages')
    const responseJson = await response.json()
    return responseJson
}

  const { status } = useQuery({
    queryKey: ['beverages'],
    queryFn: fetchBeverages,
    onSuccess: (data: Beverage[]) => {
      setBeverages(data);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  return (
      <div className="App">
      <Header page={page} setPage={setPage}/>
      <main>
        <section className='wrapper'>
          <FavoriteList page={page} beverages={filteredBeverages} status={status}/>
          <BeverageForm setBeverages={setBeverages}/>
        </section>
      </main>
    </div>
  );
}

export default App;
