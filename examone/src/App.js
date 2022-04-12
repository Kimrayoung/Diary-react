import './App.css';
import MyHeader from './myHeader';
import MyFooter from './myFooter';

function App() {
  return (
    <div className="App">
      <MyHeader />
      <header className="App-header">
        <h2>안녕 react</h2>
        <b id='bold_text'>React.js</b>
      </header>
      <MyFooter />
    </div>
  );
}

export default App;
 