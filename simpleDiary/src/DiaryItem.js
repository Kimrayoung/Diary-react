const DiaryItem = ({ author, content, emotion, created_date, id }) => {
    return(
        <div className="DiaryItem">
            <div className="info">
                <span>작성자 : {author} | 감정점수: {emotion}</span>
                <br/>
                <span className="date">{new Date(created_date).toLocaleString()}</span>
            </div>
            <div className="content">{content}</div>
        </div>
    )
}

export default DiaryItem;

//new Date(crated_date)
//원래 new Date() --> 현재 시간을 기준으로 객체 생성
//new Date(created_date) --> 밀리세컨을 기준으로 객체 생성