import { useContext } from "react";
import { DiaryStateContext } from "./App";
import DiaryItem from "./DiaryItem";

//diaryList는 원래 App 컴포넌트의 data의 값(정확히는 App컴포넌트이 data state값)
//하지만 이제 provider에 DiaryList 컴포넌트가 속해져 있고 Provider에 데이터로 data state 가 있으므로 굳이 props를 통해서 받을  필요가 없음

const DiaryList = () => {
    //provider에서 데이터를 받아오기 위해서는 useContext라는 훅을 사용
    //diaryList의 component에 hooks에 context라는 이름으로 해당 데이터가 들어있음

    //즉, useContext라는 기능을 통해서 어떤 Context를 지정해서 그 context로 부터 값을 꺼내올 수 있음
    //여기서 그 Context는 DiaryStateContext
    //그리고 context를 통해서 받아온 값은 devtools를 이용해서 확인 가능(hooks  -> context)
    const diaryList = useContext(DiaryStateContext);
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it) => (
                    <DiaryItem key={it.id} {...it} />
                ))}
            </div>
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;
