import React, {useEffect, useState} from "react";

//컴포인트 하나 당 파일 하나의 원칙을 고수했는데 그게 절대적인 것은 아님 -> 사용이유 : 가독성을 위해서 
const UnmountTest = () => {
    useEffect(() => {
        console.log("Mount!");

        return () => {
            //Unmount되는 시점에 실행됨
            console.log("UnMount!")
        }
    },[])
    return (
        <div>
            UnMount Testing component
        </div>
    )
}

const LifeCycle = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => setIsVisible(!isVisible);

    return (
        <div style={{ padding: 20 }}>
            <button onClick={toggle}>ON/OFF</button>
            {isVisible && <UnmountTest></UnmountTest>}
        </div>
    )
}

export default LifeCycle;

//컴포넌트가 탄생할 때 --> 즉, mount될때를 의미함
//count버튼을 눌러도 되지 Mount!가 다시 나타나지 않음 -> mount될때 즉, 처음에 생성될 때만 실행되기 때문