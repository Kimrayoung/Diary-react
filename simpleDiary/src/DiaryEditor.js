import { useState } from "react";
const DiaryEditor = () => {
    //제목과 본문을 묶어주는 부분
    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1,
    });
    const handleChangeState = (e) => {
        // console.log(e.target.value, e.target.name);
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    //일기의 제목
    // const [author, setAuthor] = useState("");  
    // //일기의 본문
    // const [content, setContent] = useState("");
    const handleSubmit = () => {
        console.log(state);
        alert("저장 성공");
    }

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input
                    name="author" 
                    value={state.author} 
                    onChange={handleChangeState}/>
            </div>
            <div>
                <textarea 
                    name="content"
                    value={state.content}
                    onChange={handleChangeState}
                />
            </div>
            <div>
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

export default DiaryEditor;
//여기서 input에 입력된 값을 DiaryEditor값이 핸들링 할 수 있도록 해야함 --> 즉, 사용자 값을 핸들링하기 위해서
//즉, 계속변화하는 상태값을 핸들링하기 위해서는 useState를 사용할 수가 있다

//author --> input의 내용을 관리하기 위한 author(state)
//setAuthor --> author라는 state의 상태변화를 주도할 함수
//input의 value에 author라는 state를 연결시켜줘도 input태그가 변하지 않는다(계속 ""임 -> 초기값이 계속들어가서 변화하지 않음)
//이유 : setAuthor라는 상태변화함수를 이용하지 않아서
//여기서 알 수 있는 것 : author라는 state를 변화시키기 위해서는 반드시 setAuthor라는 상태변화함수를 사용해야한다.
//그러므로 input에 사용자가 입력을 할 때마다 상태를 변화시켜주기 위해서 setAuthor를 연결 시켜줘야 함 -> 그걸 하기 위해서 onChange를 사용
//onChange --> 변화가 일어날 때(값이 변경됬을 때) 마다 발생하는 이벤트 함수를 의미함 / e는 event의 약자 / e에 event에 관련된 프로토타입이 들어가 있음

//textarea
//textarea의 값은 content가 가진 값으로 고정되어져 있음
//textarea에서 변화가 일어나면 setContent가 콜백함수로 연결되어있어서 변경이 일어나면 setContent가 실행되고 content가 변경되어서 화면이 리렌더링됨

//textarea와 author는 state를 변화시키는 것이 동일함, 또한 자료형까지 같음 -> 하나의 state로 묶어줄 수 있음

//jsx의 최상위 태그를 컴포넌트 이름과 맞춤으로 인해서 --> App.css에서 구분해주기위해서(어떤 컴포넌트에 적용될 건지를 바로 알 수 있음)
