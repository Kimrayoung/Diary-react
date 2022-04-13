//https://jsonplaceholder.typicode.com/comments
import { useState, useRef, useEffect } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const App = () => {
  const [data, setData] = useState([])

  const dataId = useRef(0);

  //API를 호출하는 함수 --> fetch함수 이용() --> promise를 반환(비동기)
  const getData = async() => {
    //url으로 결과를 가져오고 then은 프로미스가 성공적으로 실행된다면 실행됨, 즉, 성공한 결과값이 들어있음
    const res = await fetch('https://jsonplaceholder.typicode.com/comments'
    ).then(res=>res.json());
    // console.log(res);
    //res에서 20개만 자른 배열을 map을 통해서 반환되는 값을 모아서 다시 배열을 만듬
    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.author,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id : dataId.current++  //id를 지금 현재의current값으로 넣고 나서 나중에 +1을 해줄것
      }
    });

    setData(initData)
  }

  useEffect(() => {
    //처음에 Mount될때 실행 -> 즉, 처음에 Mount될때 getData가 실행되고 -> getData의 fetch로 then데이터들이 가져와짐
    //(then에 결과값이 가지고 있음) -> 그런후에 20개를 잘라서 해당 아이템을 하나씩 다시 리턴받아서 새로운 배열로 만들어줌
    getData();
  },[]);

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

//6-8 React에서 API를 호출하기
//useEffect를 이용하고 컴포넌트 Mount시점에 API를 호출하고 해당 API의 결과값을 일기 데이터의 초기값으로 이용하기
//Mount되자마자 url을 통해서 데이터를 가져올 것 이므로 useEffect사용