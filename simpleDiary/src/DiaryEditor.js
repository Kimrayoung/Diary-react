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
