const DiaryItem = ({ onDelete, author, content, emotion, created_date, id }) => {
    return(
        <div className="DiaryItem">
            <div className="info">
                <span>작성자 : {author} | 감정점수: {emotion}</span>
                <br/>
                <span className="date">{new Date(created_date).toLocaleString()}</span>
            </div>
            <div className="content">{content}</div>
            <button onClick={() => {
                console.log(id);
                if(window.confirm(`${id}번쨰를 정말 삭제하시겠습니까?`)) {
                    onDelete(id); //onDelete에 id를 전달
                }
            }}>삭제하기</button>
        </div>
    )
}

export default DiaryItem;

//학습목표  - 데이터 삭제 
//각각의 아이템에 삭제버튼이 있어야 함
//실제로 데이터 삭제가 일어나려면 -> 삭제된  데이터 배열로 업데이트를 시켜줘야 함

//즉 삭제라는 이벤트가 발생되어서 위로 올라가야 함
//배열에서 삭제라는 이벤트가 발생되어서 실제 데이터가 삭제되어 App.js로 올라가고 그 바뀐 배열이 List로 내려가서 보여짐
//그리고 DiaryList에서 하는게 아니라 DiaryItem에서 하는 이유는 DiaryList의 각각의 요소에 대해서 이벤트가 발생해야 하므로
//DiaryItem에 대해서 이벤트를 처리해야한다. 

//삭제하기 버튼이 눌리면 props로 정달받은 onDelete가 호출 -> onDelte의 setState로 state변경 -> App.js가 state와 setState를 가지고 있으므로
//App.js가 변화를 감지 --> 즉 state가 변화한 이벤트를 감지 --> state를 실제로 그려주는 부분인 DiaryList를 통해서 화면을 다시 렌더링