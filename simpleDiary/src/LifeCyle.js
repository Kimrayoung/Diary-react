import React, {useEffect, useState} from "react";

const LifeCycle = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    //컴포넌트가 mount 되는 시점에만 작동
    useEffect(() => {
        //컴포넌트가 mount되는 시점에만 무언가를 하고 싶다면 useEffet의 두번째인자에 [](빈 배열)을 넣어주면 됨
        console.log("Mount!")
    },[]);

    //컴포넌트가 update되는 시점에 작동 -> state변경, 부모에게서 내려받는 props변경, 부모 컴포넌트 리렌더링
    useEffect(() => {
        //update되는 시점에 무언가를 하고 싶다면 useEffect의 두번째 인자를 아무것도 주지않으면 됨
        console.log("update!");
    });

    //두번째 인자인 defandency array가 변화하게 된다면 그 순간 콜백함수가 수행이 된다
    // 즉, defandency array만 잘 활용하면 감지하고 싶은 값만 감지해서 그 값이 변화하는 순간에만 콜백함수를 수행할 수 있다
    useEffect(() => {
        //이 useEffect의 콜백함수는 count함수가 변화하는 순간 실행됨
        console.log(`count is update: ${count}`);
        if(count > 5) {
            alert("count가 5를 넘었습니다 따라서 1로 초기화됩니다.");
            setCount(1);
        }
    },[count]);

    useEffect(() => {
        //이 콜백함수는 count함수가 변화하는 순간 실행됨
        console.log(`text is update: ${text}`);
    },[text]);


    return (
        <div style={{ padding: 20 }}>
            <div>
                {count}
                <button onClick={() => setCount(count+1)}>+</button>
            </div>
            <div>
                <input value={text} onChange={(e) => setText(e.target.value)}></input>
            </div>
        </div>
    )
}

export default LifeCycle;

//컴포넌트가 탄생할 때 --> 즉, mount될때를 의미함
//count버튼을 눌러도 되지 Mount!가 다시 나타나지 않음 -> mount될때 즉, 처음에 생성될 때만 실행되기 때문