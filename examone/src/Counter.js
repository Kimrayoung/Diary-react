import React,{ useState } from "react";
import OddEvenResult from "./OddEvenResult";

//비구조화할당을 통해서 부모 컴포넌트로 부터 내려받은 props들 중에 invalidNumber을 꺼내서 쓴다는 것을 의미한다
const Counter = ({initialValue}) => {
    // console.log(props);
    const [count, setCount] = useState(initialValue);

    const onIncrease = () => {
        setCount(count + 1);
    }
    const ondecrease = () => {
        setCount(count - 1);
    }

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={onIncrease}>+</button>
            <button onClick={ondecrease}>-</button>
            {/* count라는 변수를 count라는 이름으로 oddevenResult로 내려줌 */}
            <OddEvenResult count={count}></OddEvenResult>
        </div>
    )
}

//기본값을 props가 누락되서 왔을 때 
Counter.defaultProps = {
    initialValue: 0
}

export default Counter;