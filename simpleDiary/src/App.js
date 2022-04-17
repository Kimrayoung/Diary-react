import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useRef,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const reducer = (state, action) => {
    switch (action.type) {
        case "INIT": {
            return action.data;
        }
        case "CREATE": {
            const created_date = new Date().getTime();
            const newItem = {
                ...action.data,
                created_date,
            };
            return [newItem, ...state];
        }
        case "REMOVE": {
            //아래처럼 하면 state에서 targetid만 지우고 새로운 배열이 생성되서 오고 이 data가 return됨
            return state.filter((item) => item.id !== action.targetId);
        }
        case "EDIT": {
            return state.map((item) =>
                item.id === action.targetId
                    ? { ...item, content: action.newContent }
                    : item
            );
        }
        default:
            return state; //state를 그대로 전달해서 어떤 변경이 일어나지 않고 그대로 사용한다면 값 변화 없음
    }
};
//원래 App.js만 export해줬는데 DiaryStateContext도 내보내줘야 context들에서 사용이 가능함(provider도 컴포넌트니까)
//export default는 파일하나당 한번만 사용이 가능함
//기본적으로 App.js를 내보내고 있고 부가적으로 DiaryStateContext를 내보내고 있음
//나중에 Impor해서 사용할 때 export defulat한 것만 이름변경이 가능함(ex. React)
//그냥 export한 것은 비구조화 할당을 이용해야 함(즉, 이름을 변경할 수 없음 ) (ex. useEffect, useCallback 등)
//여기의 DiaryStateContext가 가진 provider이라는 컴포넌트 이용 --> App 컴포넌트가 리턴하고 있는 최상위 컴포넌트를 변경

//개발자 도구를 통해서 Context.Provider부분을 보면 파란색으로 표시된 부분이 Context부분과 일치함 --> 파란색 부분에 있는 props들은 어디서든 provider가 제공하는 props들을 사용가능함

//provider컴포넌트도 props이기 때문에 여기다가 바로 상태변화함수를 전달해주면 안됨
//이유 :  바로 상태변화함수를 전달해주게 되면 prop이 변경될 때 재생성 되기 때문에 --> provider컴포넌트가 재생성 되면 그 아래 컴포넌트도 모두 재생성 됨
//해결방법 : 상태변화함수를 보내는 Provider와 상태변화함수를 내보낼 아이를 따로 생성하면 됨(즉, context를 중첩으로 사용함)
export const DiaryStateContext = React.createContext();

//DiaryDispatchContext컴포넌트의 Provider에 OnEdit, OnRemove, OnCreate함수를 넣어줘도 문제가 안됨
//이유 : 왜냐하면 위 3개의 함수들은 재생성되지 않는 함수들로 이루어져 있기 때문
export const DiaryDispatchContext = React.createContext();

const App = () => {
    const [data, dispatch] = useReducer(reducer, []);

    const dataId = useRef(0);
    const getData = async () => {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/comments"
        ).then((res) => res.json());

        const initData = res.slice(0, 20).map((item) => {
            return {
                author: item.email,
                content: item.body,
                emotion: Math.floor(Math.random() * 5) + 1,
                created_date: new Date().getTime(),
                id: dataId.current++, //id를 지금 현재의current값으로 넣고 나서 나중에 +1을 해줄것
            };
        });
        dispatch({ type: "INIT", data: initData });
    };

    useEffect(() => {
        setTimeout(() => {
            getData();
        }, 1500);
    }, []);

    const onCreate = useCallback((author, content, emotion) => {
        //dispatch의 action객체 새롭게 생성된 데이터를 전달하면 reducer함수 부분에서 데이터를 추가해주면됨
        dispatch({
            type: "CREATE",
            data: { author, content, emotion, id: dataId.current },
        });
        dataId.current += 1;
    }, []);

    const onRemove = useCallback((targetId) => {
        dispatch({ type: "REMOVE", targetId });
    }, []);

    const onEdit = useCallback((targetId, newContent) => {
        dispatch({ type: "EDIT", targetId, newContent });
    }, []);
    const getDiaryAnalysis = useMemo(() => {
        if (data.length === 0) {
            return { goodcount: 0, badCount: 0, goodRatio: 0 };
        }

        const goodCount = data.filter((it) => it.emotion >= 3).length;
        const badCount = data.length - goodCount;
        const goodRatio = Math.floor((goodCount / data.length) * 100.0);
        return { goodCount, badCount, goodRatio };
    }, [data.length]);

    //useMemo를 사용하지 않으면 App컴포넌트가 재성생될 때 onCreate, onEdit, onRemove함수들도 재생성되게 됨
    const memoizedDiapatches = useMemo(() => {
        return { onCreate, onRemove, onEdit };
    }, []);

    const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={memoizedDiapatches}>
                <div className="App">
                    <DiaryEditor />
                    <div>전체 일기 : {data.length}</div>
                    <div>기분 좋은 일기 개수 : {goodCount}</div>
                    <div>기분 나쁜 일기 개수 : {badCount}</div>
                    <div>기분 좋은 일기 비율 : {goodRatio}</div>
                    <DiaryList
                    // onEdit={onEdit}
                    // onRemove={onRemove}
                    // // diaryList={data}  --> context를 통해서 데이터를 전달하고 있으므로 이렇게 props를 통해서 전달해주지 않아도 됨
                    //DiaryStateContext에서 data state를 가지고 있으므로 그냥 그 value에서 직접 꺼내서 사용하면 됨
                    />
                </div>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
};

export default App;

//가장 상단의 컴포넌트가 provider이라고 하는 공급자 컴포너트에게 모든 데이터를 전달
//provider은 자신의 자식 컴포넌트에 해당하는 컴포넌트 들에게 데이터를 직통을 전달 수 있음 --> props 드릴링이 사라짐
//코드 깔끔 + 가독성 높아짐
//공급자 컴포넌트의 자식 컴포넌트들로 배치되어서 해당 provider 컴포넌트가 공급하는 모든 데이터에 접근할 수 있는 컴포넌트들의 영역을 문맥 이라고 함
//문맥 --> 글의 방향
//provider 컴포넌트 아래에 있는 모든 컴포넌트들은 일기 데이터를 조작하고 관리한다라는 문맥하에 존재한다라는 의미
//일기 데이터를 관리하기 위한 문맥하에 존재한다는 것을 의미한다.
