import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

//복잡한 상태변화함수를 처리할 컴포넌트
//이 reducer함수는 두개의 인자를 받음 
//첫번째 인자 -> 상태변화가 일어나기 직접의 state
//두번째 인자 -> 어떤 상태변화를 일으켜야 하는지에 대한 정보가 담긴 action객체
//action객체에는 반드시 type 프로퍼티가 들어있는데 이 type프로퍼티를 통해서 상태변화 처리
//그리고 이 reducer가 return하는 값이 새로운 state의 값
const reducer = (state, action) => {
  switch(action.type) {
    case 'INIT': {
      //이 action.data로 새로운  state가 됨
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {  //새로운 일기 데이터 -> 이 데이터를 state에 추가하면 됨
        ...action.data, //아래 dispath함수에서 전달한 데이터가 들어있음 
        created_date
      }
      return [newItem, ...state];
    }
    case 'REMOVE': {
      //아래처럼 하면 state에서 targetid만 지우고 새로운 배열이 생성되서 오고 이 data가 return됨
      return state.filter((item) => item.id !== action.targetId);
    }
    case 'EDIT':{
      return state.map((item) => 
      item.id === action.targetId ? 
      {...item, content: action.newContent} : item);
    }
    default:
    return state; //state를 그대로 전달해서 어떤 변경이 일어나지 않고 그대로 사용한다면 값 변화 없음
  }
}

const App = () => {
  // const [data, setData] = useState([]);
  //이제 일기 data state를 useState가 아니라 useReducer을 통해서 관리
  //reducer -> 상태변화를 처리할 함수 --> 별도의 함수가 존재하는 것이 아니라 직접 만들어서 사용해야 함
  //[] -> data state의 초기값
  const [data, dispatch] = useReducer(reducer, [])

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
    //dispatch --> 어떤 action을 발생시키겠다는 것을 의미, INIT action에 필요한 데이터를 전달해줘야 함
    //그리고 data프로퍼티에 initData라는 값을 넣어놨기 때문에 action객체에서는 이 data를 넣어주면 됨
    //함수형 업데이트 필요없이, 알아서 현재의 state를 reducer가 참조해서 자동으로 실행 -> dependency array 걱정할 필요없음
    dispatch({type: "INIT", data: initData});

    // setData(initData) --> 더 이상 필요없음 setData가 하던 일을 reducer함수가 함
  }

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    //dispatch의 action객체 새롭게 생성된 데이터를 전달하면 reducer함수 부분에서 데이터를 추가해주면됨
    dispatch({
      type: 'CREATE', 
      data: {author, content, emotion, id: dataId.current}
    });
    dataId.current += 1;
  }, []);
    

  const onRemove = useCallback((targetId) => {
    dispatch({type:'REMOVE', targetId});
  }, []
  );

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({type: "EDIT", targetId, newContent});
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

//복잡한 상태변화 로직 분리
//현재 App컴포넌트에 3가지의 상태 변화 처리 함수가 있음
//ex. onCreate, onEdit, onRemove
//이 함수들은 컴포넌트 내에만 존재해야 했음 --> 왜냐하면 컴포넌트 내에있는 state의 상태를 참조해야 하기 때문

//useReducer
// 컴포넌트에서 상태변화 로직을 분리하는 것