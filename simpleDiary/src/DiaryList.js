//일기 리스트(작성한 다이어리가 표시됨)
import DiaryItem from "./DiaryItem";

const DiaryList = ({ onDelete, diaryList }) => {

    return (
        <div className="DiaryList">
            <h2>일기리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div> {/*여기에 diaryList의 전체가 붙어야하고, 리스트의 요소들을 하나로 묶는 div이다(즉, DiaryItem을 하나로 묶는 div) */}
                {diaryList.map((item) => (
                    <DiaryItem key={`diaryitem_${item.id}`} {...item} onDelete={onDelete}></DiaryItem>
                ))}
            </div>
        </div>
    )
}

DiaryList.defaultProps={
    diaryList: [],
}

export default DiaryList;
