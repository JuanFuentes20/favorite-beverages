import './App.css';
import Header from './components/Header';
import FavoriteList from './components/FavoriteList';
import BeverageForm from './components/BeverageForm';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <section className='wrapper'>
          <FavoriteList />
          <BeverageForm />
        </section>
      </main>
    </div>
  );
}

export default App;
