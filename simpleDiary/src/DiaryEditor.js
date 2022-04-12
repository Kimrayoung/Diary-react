import { useRef, useState } from "react";
const DiaryEditor = () => {
    const authorInput = useRef();
    const contentInput = useRef();

    const [state, setState] = useState({
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
        else {
            alert("저장 성공");
        }
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
                    onChange={handleChangeState}/>
            </div>
            <div>
                <textarea
                    ref={contentInput} 
                    name="content"
                    placeholder="일기"
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

export default DiaryEditor;

//배열에 아이템을 저장하기
//배열에 아이템 저장 후에 React에서 LIST를 렌더링 해보고 개별적인 컴포넌트로 만들어보기
