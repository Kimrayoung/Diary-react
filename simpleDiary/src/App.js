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
  const [data, setData] = useState([])

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    };
    dataId.current += 1; 
    setData([newItem, ...data ]);
  };

  const onRemove = (targetId) => {  //App.js에서 직접 onDelete를 호출하는 것이 아니라서 targetId를 매개변수로 전달받아야 함
    //데이터를 삭제하기 위해서는 DiaryItem에서 삭제버튼을 클릭했을 때 props로 전달받은 onDelete를 호출해서 데이터를 삭제
    const NewDiaryList = data.filter((item) => item.id !== targetId);
    setData(NewDiaryList);
  }

  const onEdit = (targetId, newContent) => {
    //수정대상 ID. 수정할 내용
    setData(  //수정할ID의 content만 변경해서 새로운 배열을 return 
      data.map(item => item.id === targetId ? {...item, content:newContent} : item)
    )

  }

  return (
    <div className="App">
       <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;

