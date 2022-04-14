import React, { useEffect, useRef, useState } from "react";

const DiaryEditor = ( {onCreate} ) => {
    useEffect(() => {
        //실제로 렌더링 일어남
        console.log("DiaryEditor render");
    })
    const authorInput = useRef();
    const contentInput = useRef();

    const [state, setState] = useState({
        //작성자 input, 본문 textarea, emtion select가 변화가 일어나면 그 변화를 감지해서 화면을 리렌더링해주기 위해서 필요함
        author: "",
        content: "",
        emotion: 1,
    });

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = () => {
        if(state.author.length < 1) {
            authorInput.current.focus();
            return;
        }

        if (state.content.length < 5) {
            contentInput.current.focus();
            return;
        }
        onCreate(state.author, state.content, state.emotion); //App.js로 props로 받아온 함수 여기에 setData가 담겨있음
        //인자로 현재 author, content, emotion이 전달되고 newItem에 해당 데이터들이 담기고 그리고 이 newItem이 setData로 인해서 data에 추가되고
        console.log(state); //저장할 일기가 state에 담겨있음, input, textarea, select에서 변화가 일어나면 setState에 의해서 변화 감지되서 상태가 업데이트 되고 그게 state에 저장

        alert("저장 성공");
        setState({  //제대로 저장했으니까 state들을 빈 공간으로 변경
            author: "",
            content: "",
            emotion: 1,
        })
    }

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input
                    ref={authorInput}
                    name="author" 
                    value={state.author} 
                    placeholder="작성자"
                    onChange={handleChangeState}
                    type="text"/>
            </div>
            <div>
                <textarea
                    ref={contentInput} 
                    name="content"
                    placeholder="일기"
                    type="text"
                    value={state.content}
                    onChange={handleChangeState}
                />
            </div>
            <div>
                <span>오늘의 감정점수</span>
                <select 
                    name="emotion"
                    value={state.emotion}
                    onChange={handleChangeState}    
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div>
    )
    
}

//DiaryEditor함수 자체를 묶어줄 필요는 없고 아래처럼 컴포넌트 이름을 통해서 React.memo를 적용해주면 됨
//아래 끝은 React.memo로 묶인 DiaryEditor을 export하겠다는 것을 의미
export default React.memo(DiaryEditor);

//배열에 아이템을 저장하기
//배열에 아이템 저장 후에 React에서 LIST를 렌더링 해보고 개별적인 컴포넌트로 만들어보기

//App.component는 처음에 mount될 때 2번의 렌더링이 일어남
//1. 처음에 useState([])로 인해서 빈배열이 들어오면서 한번 렌더링이 일어남
//2. getData가 성공하면 setData()로 인해서 data 초기 데이터들이 들어오면서 리렌더링이 일어남 

//DiaryEditor컴포넌트는 App컴포넌트의 자식 컴포넌트에게 onCreate를 받고 있기 때문에 onCreate가 두번 렌더링되므로 DiaryEditor도 두번 렌더링이 된다.
//즉 리렌더링되면서 App컴포넌트의 onCreate부분이 계속 다시 생성이 되는 것
//하지만 App의 onCreate함수의 내용은 다시 생성이 되어도 동일함 
//하지만 onCreate는 비원시 타입이라 얕은 비교가 이루어짐 --> 즉, 동일하지 않다고 판단 -> 계속 다시 생성
//즉, onCreate함수는 App컴포넌트가 재생성 될 때마다 다시 생성되고 DiaryEditor에 전달되는 onCreate는 얕은 비교때문에 계속 다르다고 이전 props의 onCreate랑 다르다고 판단되고 계속해서 DiaryEditor은 재생성이 될 것

//문제의 이유 : App컴포넌트에서 onCreate함수가 계속 재생성되어서

//해결방법 1 : App컴포넌트의 onCreate의 함수를 재생성되지 않게 함 -> useMemo사용
//하지만 사용불가 
//이유 : useMemo를 통하면 함수가 반환되는 것이 아니라 값이 반환되기 때문에 onCreate가 함수가 아니게 됨

//해결방법 2: App컴포넌트의 onCreate함수를 재생성되지 않게 함 --> useCallback사용
// -> onCreate함수에 콜백함수를 넣어주고 두번째 인자로 빈배열을 넣어주면 초기에 mount될때만 onCreate가 생성되고 그 뒤로 변화하지 않음
//문제발생 : 일기를 새롭게 추가해주면 기존의 일기들은 사라지고 방금 생성한 일기만 있는 완전히 새로운 배열이 나오게 됨
//이유 : onCreate는 App컴포넌트가 mount되는 시점에 딱 한번 생성되고  그 당시의 data의 state가 []이다
//즉, onCreate함수가 가장 마지막으로 생성됬을때의 data의 state가 빈배열이어서 일기를 생성하면 다시 빈배열이 되고 거기에 작성한 일기가 들어가지는 것


//함수가 컴포넌트가 참조될때 다시 생성되는 이유 : 현재의 state값을 참조할 수 있어야 하기 때문
//하지만 onCreate함수는 콜백함수 안에 갇혀서 depth를 빈배열로 전달했기 때문에 onCreate함수가 알고있는 배열은 계속 빈배열
//그럼 이부분을 해결하기 위해서 빈배열에 data를 넣어주게 됨 -> [data]
//하지만 이렇게 되면 data가 바뀌면 결국 useCallback으로 전달한 함수를 다시 실행하게 되므로 onCreate가 계속 다시 생성됨
//--> 이상한 동작

//해결방법3 : 함수형 업데이트 활용
//setData(상태 변화 함수)에 값을 전달해서 값이 새로운 state의 값으로 변화한다
//set함수 안에 함수를 전달하면 됨
//setState라는 상태변화함수 안에 함수를 전달하는 것을 의미 