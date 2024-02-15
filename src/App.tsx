import './App.css';
import Header from './components/Header';
import FavoriteList from './components/FavoriteList';
import BeverageForm from './components/BeverageForm';
import { useQuery } from 'react-query'
import { useState } from 'react';


type Beverage = {
  id: string,
  name: string;
  weight: string;
  price: number;
  roastLevel: number;
};


function App() {

  const [beverages, setBeverages] = useState<Beverage[]>([])

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
      <Header />
      <main>
        <section className='wrapper'>
          <FavoriteList beverages={beverages} status={status}/>
          <BeverageForm setBeverages={setBeverages}/>
        </section>
      </main>
    </div>
  );
}

export default App;
