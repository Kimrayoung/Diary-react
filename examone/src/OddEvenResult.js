//여기서 count변수는 Counter에서 내려 받아서 사용해야 함
//count의 props가 변경되면 even, odd가 변경됨 --> 즉, 부모의 props가 변경되면 자식의 props도 리렌더링 된다는 것을 알 수 있다
const OddEvenResult = ({count}) => {
    console.log(count)
    return <>
    {count % 2 === 0 ? "even" : "odd"}
    </>
}

export default OddEvenResult;