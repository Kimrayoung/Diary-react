import React, { useState, useEffect } from "react";

//자식 컴포넌트 
const TextView = React.memo(({ text }) => {
    useEffect(() => {
        console.log(`Update :: Text : ${text}`);
    });

    return (
        <div>
            {text}
        </div>
    )
});

const CountView = React.memo(({ count }) => {
    useEffect(() => {
        console.log(`Update :: Count : ${count}`);
    });

    return (
        <div>
            {count}
        </div>
    )
});
//자식 컴포넌트

const OptimizeTest = () => {
    const [count, setCount] = useState(1);
    const [text, setText] = useState('');

    return (
        <div style={{ padding:20 }}>
            <div>
                <h2>count</h2>
                <CountView count={count}></CountView>
                <button onClick={() => setCount(count + 1)}>+</button>
            </div>
            <div>
                <h2>text</h2>
                <TextView text={text}></TextView>
                <input onChange={(e) => setText(e.target.value)}></input>
            </div>
        </div>
    )
}

export default OptimizeTest;

//만약에 count가 바뀌면 부모 컴포넌트가 리렌더링 되고 그 부모 컴포넌트에 자식 컴포넌트가 연결되어있으므로 
//CountView와 TextView모두 다시 렌더링 된다 --> Update :: Count , Update :: Text가 모두 다시 렌더링된다는 것을 알 수 있다 
//하지만 Count가 변화할 때 CountView는 다시 렌더링 되어야 하지만 Text는 변화하지 않으므로 TextView는 다시 렌더링 될 필요 없음
// --> 즉, 성능 낭비

//해결방법 : 컴포넌트 재사용 --> React.memo사용

//React.memo를 CountView컴포넌트와 TextView컴포넌트에 사용하게 되면 text의 state가 변하지 않는 이상 textview가 변하지 않을 것
//CountView또한 count state가 변하지 않는 이상 CountView가 리렌더링 되지 않을것 