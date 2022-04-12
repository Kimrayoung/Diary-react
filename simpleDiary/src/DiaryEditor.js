import { useRef, useState } from "react";
const DiaryEditor = () => {
    
    //useRef함수를 호출하고 그 반환값을 authorInput에 담아줌
    //그럼 useRef반환값으로 React.MutableRefObject가 저장이 됨
    //MutableRefObject -> html즉, DOM요소를 접근할 수 있도록 도와줌
    const authorInput = useRef();
    const contentInput = useRef();

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
        if(state.author.length < 1) {
            // alert("작성자는 최소 1글자 이상 입력해주세요.");
            //focus 위치
            //useRef로 생성한 authorInput의 현재요소를 가르킴(current)
            authorInput.current.focus();
            return;
        }

        if (state.content.length < 5) {
            // alert("본문은 최소 5글자 이상 입력해주세요.");
            //focus 위치
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

//요즘은 alert을 띄우지 않는게 대세임
//대신 alert -> focus효과를 주는 것이 좋음
//focus를 주기 위해서는 어떤 DOM element에 효과를 줘야하는지 알고 있어야 함 즉, 어떤 element가 변화해야 하는지 알고 있어야 함 --> useRef사용
//useRef -> 돔 요소를 선택하는 기능
//useRef를 이용해서 생성한 reference객체는 현재 가르키는 값을 current라는 값으로 불러와서 사용할 수 있음
//current속성을 가지고 있는 객체를 반환함
//인자로 넘어온 초기값을 current속성에 할당함
//html template부분에서 넘길 태그에 반드시 ref={}로 해서 바인딩을 시켜줘야 함
