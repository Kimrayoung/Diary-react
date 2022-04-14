import { useState, useRef, useEffect, useMemo } from 'react';
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

  //useMemo를 사용했을 때
  //getDiaryAnalysis는 마치 useMemo함수를 호출한 결과값처럼 됨
  //useMemo함수 안에 콜백 함수로 원래 getDiaryAnalysis가 수행하는 기능을 전달하는 것처럼 됨
  //useMemo함수는 첫번째 인자로 콜백함수를 받고 return하는 값을 최적화 할 수 있도록 도와준다, 
  //두번째 인자로 배열을 전달 -> useEffect의 두번째 인자인 defendency array와 동일한 역할을 수행한다 
  //두번째 인자인 배열에 data.length를 넣어주게 되면 data.length가 변화할 때만 useMemo의 첫번째 함수로 전달된 콜백함수가 시행됨
  //이렇게 useMemo를 해서 최적화를 해주면 더이상 getDiaryAnalysis는 함수가 아니다 원래 getDiaryAnalysis이 수행하던 내용은 useMemo의 콜백함수로 시행되고 있으므로 
  //useMemo는 콜백함수의 값을 return / 즉, getDiaryAnalysis는 값을 return 받게 됨
  const getDiaryAnalysis = useMemo(
    () => {
    console.log("일기 분석 시작");

    const goodCnt = data.filter((item) => item.emotion >= 3).length; //emotion이 3이상인게 새로운 배열로 생성되고 그 배열의 길이를 구한것
    const badCnt = data.length - goodCnt;
    const goodRatio = (goodCnt / data.length) * 100;
    return {goodCnt, badCnt, goodRatio};
  }, [data.length]
  );

  //여기서 먼저 이렇게 해주는 이유는 return에서 함수를 호출하게 되면 3번을 호출해야 하므로 비효율적임
  const {goodCnt, badCnt, goodRatio} = getDiaryAnalysis; //해당 함수가 객체로 반환되므로 객체로 받아야 한다

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

//일기 분석 시작이라는 콘솔이 두번 호출됨
//이유 : 처음 mount될때 data의 값은 []이 들어오면서 아래가 실행되어서 getDiaryAnalysis()도 실행된다
//그리고 쭉 실행되다가 useEffect함수를 만나서 처음에 mount될때 한번만 getData()가 실행이 된다. 그러면서 data가 새로 업데이트 되고 
//data의 값이 변동 되었으므로 리렌더링 되고(App함수가 다시 실행) getDiaryAnalysis도 다시 시행된다
//즉, 처음에 mount되었을 떄 시행 + getData로 성공으로 data의 state가 변경되었을 때 한번 총 2번 시행 된다. 
//주의! -> 리렌더링이 일어나는 것 = App함수가 다시 실행되는 것 / return 부분은 컴포넌트 함수의 실행 결과를 반환되는 내용!!

//만약에 일기 데이터 수정을 하게 된다면 리렌더링으로 인해서 App함수가 다시 호출된다 그러면 getDiaryAnalysis도 다시 호출됨
//낭비라고 할 수 있음 --> 이유 : 일기 데이터의 수정은 감정 데이터 개수의 변화와 상관이 없기 때문이다. 
//해결 --> 메모이제이션 기법을 사용을 통해서 연산 최적화를 할 수 있음 
//메모이제이션을 사용하기 위해서는 useMemo를 사용해야 한다. 

//useMemo사용법 --> memoizatino하고 싶은 함수를 감싸주면 됨