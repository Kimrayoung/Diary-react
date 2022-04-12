//일기 리스트(작성한 다이어리가 표시됨)
const DiaryList = ({ diaryList }) => {
    //정상적으로 props가 넘어왔는지 확인
    // console.log(diaryList);

    return (
        <div className="DiaryList">
            <h2>일기리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((item) => ( //이 부분도 컴포넌트라고 할 수 있음(DiaryList의 자식 컴포넌트)
                    <div key={item.id}>
                        <div>작성자: {item.author}</div>
                        <div>본문: {item.content}</div>
                        <div>감정: {item.emotion}</div>
                        <div>작성 시간(ms): {item.created_date}</div>
                    </div>
                    
                ))}
            </div>
        </div>
    )
}

//props로 배열이 내려올 거라고 생각했지만 배열로 내려오지 않고 undefined로 내려왔을 경우 -> length가 없어서 에러가 발생
//막기위해서 기본 props값을 준다
DiaryList.defaultProps={
    diaryList: [],
}

export default DiaryList

//1단게 - 예시용으로 App.js에서 임시배열을 만들어서 DiaryList에 props로 전달해서 보여주기

//Warning: Each child in a list should have a unique "key" prop. --> 에러 발생
//이유 : diaryList의 자식컴포넌트인 실제 배열을 보여주는 부분에 key가 없어서 
//해결방법 : key props를 넘겨줌