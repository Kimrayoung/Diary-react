import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  const dummyList = [
    {
      id: 1,  //모든 데이터는 고유한 아이디가 필요함
      author: "김라영",
      content: "hi1",
      emotion: 3,
      created_date: new Date().getTime() //현재 시간을 기준으로 생성됨
      //getTime --> 시간을 받아서 밀리세컨즈로 변경해주는 함수 -> 여기서 바로 new Date()객체를 사용하는 경우, 문자열화를 해서 이용하는 경우 붏편함
    },
    {
      id: 2,  
      author: "홍길동",
      content: "hi2",
      emotion: 2,
      created_date: new Date().getTime() 
    },
    {
      id: 3,  
      author: "아무개",
      content: "hi3",
      emotion: 1,
      created_date: new Date().getTime() 
    },
  ]
  return (
    <div className="App">
      <DiaryEditor></DiaryEditor>
      <DiaryList diaryList={dummyList}></DiaryList>
    </div>
  );
}

export default App;
