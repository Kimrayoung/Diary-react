import React, { useState, useEffect } from "react";

const CounterA = React.memo(({ count }) => {
    useEffect(() => {
        console.log(`CounterA Update - count: ${count}`);
    });

    return <div>{count}</div>
    }
);

const CounterB =({ obj }) => {
    useEffect(() => {
        console.log(`CounterB Update - count: ${obj.count}`);
    });

    return <div>{ obj.count }</div>
}

const areEqual = (preProps, nextProps) => {
    // return true; //이전 프롭스 = 현재 프롭스 -> 리렌더링 하지 않음
    // return false; //이전 프롭스 !=현재 프롭스 -> 리렌더링이 일어남
    if(preProps.obj.count === nextProps.obj.count) return true; //리렌더링 하지 않음
    else return false;
}

//areEqual --> 배열 내장 함수의 sort, react 내부의 비교함수 처럼 작동하게 됨
//areEqual함수가 비교를 통해서 같다면 true를 같지 않다면 false를 보내줌
//결론적으로 counterB는 areEqual함수의 결정에 따라서 리렌더링을 할지 말지 결정
//여기서 React.memo를 컴포넌트를 반환하는 고차 컴포넌트에 해당함
//CounterB를 memoization한 컴포넌트로 이용하기 위해서는 아래 return에서 MemoizedCounterB를 렌더해줘야 함


//아래에서 counterB의 버튼을 누르게 되면 areEqual함수가 동작하게 되고 return으로 true를 보내기 때문에 MemoizedcounterB가 리렌더링이 되지 않음
const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1 ,
    })

    return (
        <div style={{ padding:20 }}>
            <div>
                <h2>Counter A</h2>
                <CounterA count={count}></CounterA>
                {/* setCount에 count를 인자로 전달하게 되면 setCount로 인해서 상태 변화가 일어나기는 하지만 실제로는 count의 state는 변하지 않는다, 즉 count가 바뀌지 않음 -> 계속 값이 1 */}
                <button onClick={() => setCount(count)}>A button</button>
            </div>
            <div>
                <h2>Counter B</h2>
                <MemoizedCounterB obj={obj}/>
                <button onClick={() => setObj({
                    count: obj.count
                })}>B button</button>
            </div>
        </div>
    )
}

export default OptimizeTest;

//CounterA에 React.memo를 사용하게 되면 setCount가 인자로 count를 받아서 결과적으로 변화가 일어나지 않아서 새롭게 렌더링지 않는다
//하지만 CouterB에 React.memo를 사용하게 되면 SetObj에 obj.count를 넣어줘서 결과적으로 변화가 일어나지 않는 것 처럼 보인다.(왜냐하면 계속 같은 숫자인 1이 나오니까)
//-> 즉 counterB도 리렌더링 되지 않는 것 처럼 보인다
//하지만 CounterB에 React.memo를 넣어도 다시 리렌더링 된다
//그럼 React.Memo가 동작하지 않는걸까?
//아님 --> React.memo는 제대로 동작하고 있다. 단지 현재 인자가 객체여서 이런일이 발생하는 것
//기본적으로 자바스크립트는 객체에는 얕은 비교를 이용한다 .

//이렇게 얕으 비교를 수행하기 때문에 좀 더 강한 비교를 원한다면 두번째 인자를 사용하면 된다.

/*
function MyComponent(props) {
  // props를 사용하여 렌더링 
}
function areEqual(prevProps, nextProps) {
  
  //nextProps가 prevProps와 동일한 값을 가지면 true를 반환하고, 그렇지 않다면 false를 반환
  //여기서 깊은 비교를 구현을 하면 된다. 
  
}
export default React.memo(MyComponent, areEqual);
*/

//b버튼을 누르면 비교를 통해서 같은지 아닌지 구함
