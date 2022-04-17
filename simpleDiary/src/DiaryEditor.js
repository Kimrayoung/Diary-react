import React, { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
    const { onCreate } = useContext(DiaryDispatchContext);
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
        });
    };
    const handleSubmit = () => {
        if (state.author.length < 1) {
            authorInput.current.focus();
            return;
        }

        if (state.content.length < 5) {
            contentInput.current.focus();
            return;
        }
        onCreate(state.author, state.content, state.emotion);
        console.log(state); //저장할 일기가 state에 담겨있음, input, textarea, select에서 변화가 일어나면 setState에 의해서 변화 감지되서 상태가 업데이트 되고 그게 state에 저장

        alert("저장 성공");
        setState({
            //제대로 저장했으니까 state들을 빈 공간으로 변경
            author: "",
            content: "",
            emotion: 1,
        });
    };

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
                    type="text"
                />
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
    );
};
export default React.memo(DiaryEditor);
