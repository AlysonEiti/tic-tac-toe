import './App.css';
import Item from './Components/Item';
import Score from './Components/Score';
import Button from './Components/Button';
import Footer from './Components/Footer/';

function App() {
  const areaItem = [
    {item: 'a1', class: 'b r'}, {item: 'a2', class: 'b r'}, {item: 'a3', class: 'b'},
    {item: 'b1', class: 'b r'}, {item: 'b2', class: 'b r'}, {item: 'b3', class: 'b'},
    {item: 'c1', class: 'r'},   {item: 'c2', class: 'r'},   {item: 'c3', class: ''}
  ];

  return (
    <div className="App">

      <h1>Tic-Tac-Toe Game</h1>
      <div className='area'>
        {areaItem.map((item, key) => 
          <Item key={key} item={item.item} class={item.class}/>
        )}
      </div>

      <div className='info'>
          <Score description='Turn is' class='turn'/>
          <Score description='Winner' class='result'/>
      </div>

      <Button />
      <Footer />
    </div>
  );
}

export default App;
