//일기 리스트(작성한 다이어리가 표시됨)
import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {
    //정상적으로 props가 넘어왔는지 확인
    // console.log(diaryList);

    return (
        <div className="DiaryList">
            <h2>일기리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div> {/*여기에 diaryList의 전체가 붙어야하고, 리스트의 요소들을 하나로 묶는 div이다(즉, DiaryItem을 하나로 묶는 div) */}
                {diaryList.map((item) => (
                    <DiaryItem key={`diaryitem_${item.id}`} {...item}></DiaryItem>
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
//해결방법 : key props를 넘겨줌(현재 id라는 것을 고유하게 정해서 넘겨주므로 item.id를 사용해서 key값을 정의해줄 수 있음)
//if) id를 넘기고 있지 않는다면 인덱스값을 대체해서 사용할 수 있음 ex) map(item, idx) =>
//물론 배열을 삭제, 추가 하면 인덱스값으로 id를 했을경우 문제가 생길 수 있음

//현재 DiaryList컴포넌트들을 통해서 diaryList 배열을 렌더링하고 잇음
//문제 - diaryList를 삭제, 추가 
//그 기능이 diaryList.map부분에 추가가 되어야 함 -> 한 요소에 대해서 추가하고 삭제하는 기능이므로 
//그럼 일기 리스트를 보여주는 DiaryList 컴포넌트에서 일기 하나(diaryList중 하나의 인덱스)에 대해서 수정,삭제를 할때 이 컴포넌트 안에서 처리 -> 좋지 못한 코드
//배열 데이터를 이용해서 렌더해서 보여주는 아이템을 별도의 컴포넌트로 빼면 좋음
//즉, 배열 리스트가 한 컴포넌트 / 배열 각각의 요소가 한 컴포넌트
/* 배열의 인덱스 분리 전
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
*/
//왜,,