//일기 리스트(작성한 다이어리가 표시됨)
import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {

    return (
        <div className="DiaryList">
            <h2>일기리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div> {/*여기에 diaryList의 전체가 붙어야하고, 리스트의 요소들을 하나로 묶는 div이다(즉, DiaryItem을 하나로 묶는 div) */}
                {diaryList.map((item) => (
                    <DiaryItem key={`diaryitem_${item.id}`} {...item}></DiaryItem>
                ))}
            </div>
        </div>
    )
}

DiaryList.defaultProps={
    diaryList: [],
}

export default DiaryList;

//학습목표 
//React에서 리스트 데이터 추가하기 -> 배열을 이용한 React의 DiaryList에 아이템을 동적으로 추가해보기


//DiaryEditor에서 데이터를 입력하면 DiaryList에 추가 해줘야 함
//문제 : 같은 레벨에서는 데이터를 추가할 수가 없다. '
//문제의 이유 : react에서는 단방향으로만 데이터가 흐른다 --> ex) App.js에서 DiaryList로 dummyList로 데이터가 흐른것 처럼
//방법1. App데이터가 [data, setData]를 가지고 setData를 DiaryEditor로 내려주고 data를 DiaryList로 내려주면 됨 -> state 끌어올리기 방법

//방법1의 흐름
    //DiaryEditor에서 새로운 데이터(일기)가 추가되면 setData로 인해서 App컴포넌트의 data(배열)에 새로운 아이템이 추가될것
    //그러면 이 새롭게 추가되서 업데이트 된 데이터를 DiaryList로 내려주면 됨 -> 전달받은 데이터가 변경됬으니까 DiaryList가 리렌더링
    //App 컴포넌트는 DiaryEditor 컴포넌트가 어떤 일기를 언제 추가했는지 알아야 함 / 일기 추가와 같이 무언가 일이 발생했음을 '이벤트'라고함
    //이 이벤트를 처리하는 함수를 --> 이벤트 핸들러라고함
    //이 이벤트 핸들러는 새로운 일기 추가해주는 역할
    //이 이벤트 핸들러는 App컴포넌트에도 존재함(onCreate)
    //이 때 App 컴포넌트의 자식 컴포넌트인 DiaryEditor 컴포넌트에서 이벤트가 발생하면 해당 이벤트 핸들러를 통해 이벤트를 처리해야 하기 때문에, 이벤트 핸들러 자체를 prop으로 내려주는 것
//방법1로 알수있는 것
    //1. 리액트로 만든 컴포넌트들은 트리형태의 구조를 띈다
    //2. 데이터는 위에서 아래로만 흐른다(단방향 데이터 구조)
    //3. 이벤트(ex. 추가, 삭제)들은 아래에서 위로 흐른다(setData를 자식 컴포넌트로 전달한 다음에)
        //DiaryEditor에서 새로운 일기를 작성하면 create라는 새로운 이벤트가 발생하는 것
        //이 event는 부모 컴포넌트에서 전달한 setData를 호출해서 data를 변화시킴으로써 발생함


//정리
/* 
DiaryEditor에서 생성한 일기를 DiaryList에서 보여주려면 DiaryEditor에서 생성된 데이터를 DiaryList로 넘겨줘야 한다.
하지만 DiaryEditor과 DiaryList는 같은 레벨이기 때문에 데이터 전달이 불가능하다(데이터는 무조건 위에서 아래로 흐른다.)
그러므로 DiaryList는 새로운 데이터를 App컴포넌트를 이용해서 받야야한다. 

그리고 DiaryEditor은 데이터(배열)을 변화시켜줘야 한다. 즉, 새로운 일기를 작성해서 일기 저장하기를 누르면, 
새로운 일기가 생성됬다는 즉, 새로운 일기 생성이라는 이벤트가 App으로 전달이 되고
그로 인해서 props로 받은 onCreate함수를 호출
onCreate함수가 실행되어 setState로 인해서 데이터(배열)이 변화한다. 

즉, onCreate라는 이벤트 핸들러로 인해서 데이터가 변화함(생성이라는 이벤트가 발생하고 그 이벤트가 App으로 올라감)
배열에 데이터를 추가하는 것 자체가 이벤트!!! 배열에 데이터를 추가해서 App에 올림 즉, 이벤트를 발생시키고 수행해서 App에 올림
이벤트 처리를 통해서 setState가 변화된다 -> 이 setState의 변화를 App에서 감지
새로운 일기를 작성해서 저장을 누르게 되면 App이 DiaryEditor에게 props로 전달한 setData를 호출 -> 그리고 setData로 인해서 데이터가 변경
새로운 일기를 작성해서 저장을 누르면 그 때 App에서 DiaryEditor에게 props으로 전달한 setData를 호출하므로, 새로운 일기가 작성됬다는 것을 App에 알림(즉, 새로운 일기 생성이라는 이벤트가 App으로 전달이됨)
이 이벤트가 
*/