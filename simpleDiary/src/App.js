import { useState, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
  //   {
  //     id: 1,  //모든 데이터는 고유한 아이디가 필요함
  //     author: "김라영",
  //     content: "hi1",
  //     emotion: 3,
  //     created_date: new Date().getTime() //현재 시간을 기준으로 생성됨
  //     //getTime --> 시간을 받아서 밀리세컨즈로 변경해주는 함수 -> 여기서 바로 new Date()객체를 사용하는 경우, 문자열화를 해서 이용하는 경우 붏편함
  //   },
  //   {
  //     id: 2,  
  //     author: "홍길동",
  //     content: "hi2",
  //     emotion: 2,
  //     created_date: new Date().getTime() 
  //   },
  //   {
  //     id: 3,  
  //     author: "아무개",
  //     content: "hi3",
  //     emotion: 1,
  //     created_date: new Date().getTime() 
  //   },
  // ]

const App = () => {
  const [data, setData] = useState([]) //데이터의 변화를 감시 -> 일기 데이터를 감사(DiaryEditor, DiaryList가 함께 사용)

  const dataId = useRef(0)  //추가될 데이터의 ID를 확인하기 위해서(만약에 지금 data의 마지막 id가 3이라면 그 다음은 4)

  const onCreate = (author, content, emotion) => {  //일기 배열에 새로운 데이터를 추가해주는 함수(이벤트 핸들러 --> 이벤트 처리함수)
    //DiaryEditor에 작성한 author, content, emotion을 oncreate함수가 받아서 data를 업데이트 시키는 로직을 setData함수를 이용해서 onCreate함수 안에 작성할 것
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    };
    dataId.current += 1; //1 증가시켜줘야 다음 id에 하나 증가한 값이 들어감
    //dataId로 인해서 리렌더링 되면 안되고 해당 아이디를 조회, 수정만 하므로 useRef사용
    setData([newItem, ...data ]);
  };

  return (
    <div className="App">
      {/* 앞의 onCreate가 DiaryEditor에서 props로 쓰일 이름, 그 이름에 App컴포넌트에서 정의해준 onCreate함수를 바인딩해줌
      그러면 DiaryEditor에서 onCreate라는 이름은 함수를 내려줄 수 있다 */}
       <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;
