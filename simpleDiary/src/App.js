import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  //문제가 발생하는 코드 -> 하지만 onCreate함수는 콜백함수 안에 갇혀있고
  //전달된 배열을 사용해야하는데 depth를 빈배열로 전달했기 때문에 onCreate함수가 알고있는 배열은 계속 빈배열
  // const onCreate = useCallback(
  //   (author, content, emotion) => { //callback
  //   const created_date = new Date().getTime();
  //   const newItem = {
  //     author,
  //     content,
  //     emotion,
  //     created_date,
  //     id: dataId.current
  //   };
  //   dataId.current += 1; 
  //   setData([newItem, ...data ]);
  //   //초기에 mount될때 한번만 만들어지고 그 뒤로 변화하지 않기 때문에 빈배열([])을 넣어서 mount될때 한번만 생성
  // }, []);

  //해결방법2. useCallback -> 배열이 []이므로 계속해서 초기화되는 문제 발생
  // const onCreate = useCallback(
  //   (author, content, emotion) => { //callback
  //   const created_date = new Date().getTime();
  //   const newItem = {
  //     author,
  //     content,
  //     emotion,
  //     created_date,
  //     id: dataId.current
  //   };
  //   dataId.current += 1; 
  //   setData([newItem, ...data ]);
  // }, [data]);

  //해결방법3 . 상태변화함수에 함수를 전달 

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
    

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodcount: 0, badCount: 0, goodRatio: 0 };
    }

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
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

//최적화 하기 -> 하는 방법 : devtools의 하이라이팅 기능을 이용함
//지금 일기 하나를 삭제를 하면 diaryEditor부분도 함께 렌더링된다 
//-> 삭제하는 부분과 일기를 작성하는 diaryEditor부분은 상관이 없으므로 이부분이 렌더링될 필요가 없음
