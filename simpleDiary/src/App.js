import { useState, useRef, useEffect } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const App = () => {
  const [data, setData] = useState([])

  const dataId = useRef(0);
  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments'
    ).then(res=>res.json());
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

  const onRemove = (targetId) => { 
    const NewDiaryList = data.filter((item) => item.id !== targetId);
    setData(NewDiaryList);
  }

  const onEdit = (targetId, newContent) => {
    setData(  
      data.map(item => item.id === targetId ? {...item, content:newContent} : item)
    )

  }

  const getDiaryAnalysis = () => {
    console.log("일기 분석 시작");

    const goodCnt = data.filter((item) => item.emotion >= 3).length; //emotion이 3이상인게 새로운 배열로 생성되고 그 배열의 길이를 구한것
    const badCnt = data.length - goodCnt;
    const goodRatio = (goodCnt / data.length) * 100;
    return {goodCnt, badCnt, goodRatio};
  }

  //여기서 먼저 이렇게 해주는 이유는 return에서 함수를 호출하게 되면 3번을 호출해야 하므로 비효율적임
  const {goodCnt, badCnt, goodRatio} = getDiaryAnalysis(); //해당 함수가 객체로 반환되므로 객체로 받아야 한다

  return (
    <div className="App">
       <DiaryEditor onCreate={onCreate} />
       <div>전체 일기 : {data.length} </div>
       <div>기분 좋은 일기 개수 : {goodCnt} </div>
       <div>기분 나쁜 일기 개수 : {badCnt} </div>
       <div>기분 좋은 일기 비율 : {goodRatio} </div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;

//App 컴포넌트에서 data state가 가진 일기 중에 1은 몇개를 가졌는지 3은 몇개를 가졌는지 5는 몇개를 가졌는지 등을 파악
