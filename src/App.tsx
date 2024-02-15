import './App.css';
import Header from './components/Header';
import FavoriteList from './components/FavoriteList';

function App() {
  return (
    <div className="App">
      <Header />
      <main className='wrapper'>
        <FavoriteList />
      </main>
    </div>
  );
}

export default App;
