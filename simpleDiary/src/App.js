import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const App = () => {
  const [data, setData] = useState([])

  const dataId = useRef(0);
  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments'
    ).then((res)=>res.json());

    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.author,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id : dataId.current++  //id를 지금 현재의current값으로 넣고 나서 나중에 +1을 해줄것
      }
    });
    console.log('initData', initData);
    setData(initData)
  }

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    };

    dataId.current += 1;
        //data배열을 인자로 넘겨줘서 아이템을 추가한 새로운 배열을 반환
    setData((data) => [newItem, ...data]);
  }, []);
    

  const onRemove = useCallback((targetId) => {
    //setData에서 함수형을 전달하는 경우에는 data를 전달해서 data를 리턴하는 방식을 이용해야 함
    //setData에 전달되는 파라미터(인자)에 최신 state(최신의 데이터)가 전달되는 것
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []
  );

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) => 
    //파라미터로 data를 받고 이 data를 data.map을 통해서 삭제한 일기를 제외하고 새로운 배열을 생성함
    //이걸 해석해보면 data = 해당 일기가 삭제된 배열
    //1. 해당 일기가 삭제된 배열 생성 
    //2. 1번에서 생긴 배열이 data에 저장
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []
  );
  const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodcount: 0, badCount: 0, goodRatio: 0 };
    }

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = Math.floor((goodCount / data.length) * 100.0);
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;

//최적화 문제 
//하나의 일기만 삭제해도 전체 일기 리스트가 모두 리렌더링됨