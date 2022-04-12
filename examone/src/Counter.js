import React,{ useState } from "react";

const Counter = () => {
    //0에서 출발
    //1씩 증가하고
    //1씩 감소하는
    //count 상태
    //그리고 이러한 count 상태를 만들기 위해서는 react의 기능 중의 하나인 useState가 필요함
    //count -> 상태 값(0번째 인덱스) / jsx에서 return을 통해서 화면에 보여줄 수 있음
    //setCount -> 상태 변화 함수(count라는 값을 변화시킴)
    //useState(0) -> 여기에서 0은 count의 초기값 / 즉, count의 초기값이 0이라는 것을 알 수 있음
    const [count, setCount] = useState(0);

    const onIncrease = () => {
        setCount(count + 1);
        //+버튼이 눌리면 setCount로 인해서 2가 되고 그게 count로 전달됨 
    }
    const ondecrease = () => {
        setCount(count - 1);
    }

    return (
        <div>
            <h2>{count}</h2>
            {/* 버튼을 눌렀을 때 onIncrease함수가 실행이 되게 하기 위해서 onIncrease함수를 연결 시켜줌
            카멜케이스를 사용하여 연결한다 */}
            <button onClick={onIncrease}>+</button>
            <button onClick={ondecrease}>-</button>
        </div>
    )
}

export default Counter;
//count state가 업데이트 될때마다 Counter이라는 함수가 반환을 다시 한다.
//왜냐하면 App 컴포넌트가 Counter 컴포넌트를 호출하고 반환받은 html을 화면에 표시하는 것이므로 Counter 컴포넌트가 리턴을 계속 다시하는 것
//Counter컴포넌트가 화면을 리렌더 하는 것을 의미함 --> 상태가 변화하면 화면을 다시 그려서 리렌더를 한다는 것을 말한다
//컴포넌트가 가진 state가 변경되면 화면이 리렌더링된다