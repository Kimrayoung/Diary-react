import { useState, useRef, useEffect, useMemo } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import OptimizeTest from './OptimizeTest';

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

  const getDiaryAnalysis = useMemo(
    () => {
    const goodCnt = data.filter((item) => item.emotion >= 3).length; //emotion이 3이상인게 새로운 배열로 생성되고 그 배열의 길이를 구한것
    const badCnt = data.length - goodCnt;
    const goodRatio = (goodCnt / data.length) * 100;
    return {goodCnt, badCnt, goodRatio};
  }, [data.length]
  );

  const {goodCnt, badCnt, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
        <OptimizeTest></OptimizeTest>
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

//OptimizeTest --> 컴포넌트 재사용 실습용 컴포넌트(React.memo)
