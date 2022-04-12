import './App.css';
import Counter from './Counter';
import MyHeader from './myHeader';
import Container from './Container';

function App() {
  //부모 컴포넌트인 App컴포넌트에서 자식 컴포넌트인 Counter컴포넌트로 이름을 붙여서 전달하는 것을 prop이라고 부름 
  //props -> propertys
  //몇개를 부모 컴포넌트에서 자식 컴포넌트로 보내든 전부 하나의 객체로 담겨서 온다
  //하지만 inline으로 전달해줘야 하는 props를 보내게 되면 너무 많고 복잡해진다 -> 하나의 객체로 묶어서 보내는 것이 좋다
  const counterProps = {
    a:1,
    b:2,
    c:3,
    d:4,
    e:5,
    initialValue:5
  }
  return (
    <Container>
      <div className="App">
        <MyHeader></MyHeader>
        <Counter {...counterProps}></Counter>
      </div>
    </Container>
    
  );
}

export default App;
 