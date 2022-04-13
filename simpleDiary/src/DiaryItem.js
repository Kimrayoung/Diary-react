const DiaryItem = ({ onRemove, author, content, emotion, created_date, id }) => {
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
                    onRemove(id); //onDelete에 id를 전달
                }
            }}>삭제하기</button>
        </div>
    )
}

export default DiaryItem;

