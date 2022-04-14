import { useRef, useState } from "react";

const DiaryItem = ({ onEdit, onRemove, author, content, emotion, created_date, id }) => {
    //현재 해당 일기가 수정 중인지 수정 중이 아닌지를 나타냄
    const [isEdit, setIsEdit] = useState(false);

    //수정하기 버튼을 누르면 isEdit이 t -> f로 f -> t로 변경이 일어남
    //먄약에 f -> t로 변경되면 아래 수정할 수 있게 폼을 띄워줘야 함
    const toggleIsEdit = () => setIsEdit(!isEdit);

    //기본 상태가 props를 통해서 받아온 content --> 수정하는 폼을 업데이트(이게 없으면 수정하기를 눌러서 나타나는 폼에 입력을 해도 아무것도 입력이 되지 않음)
    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef()

     const handleRemove = () => {
        if(window.confirm(`${id+1}번쨰를 정말 삭제하시겠습니까?`)) {
            onRemove(id); //onDelete에 id를 전달
        }
     }

     //수정상태에서 나간다는 것을 의미함
     const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
     }

     //수정 완료버튼을 눌렀을때 이벤트를 처리할 함수
     const handleEdit = () => {
        if(localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }
        if(window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
            onEdit(id, localContent);
            toggleIsEdit(); //수정폼 닫기
        }
     }

    return(
        <div className="DiaryItem">
            <div className="info">
                <span>작성자 : {author} | 감정점수: {emotion}</span>
                <br/>
                <span className="date">{new Date(created_date).toLocaleString()}</span>
            </div>
            <div className="content">{
                isEdit 
                ? <><textarea 
                        ref={localContentInput}
                        value={localContent} 
                        onChange={(e) => setLocalContent(e.target.value)}/>
                    </> 
                : <>{content}</>
            }</div>
            {isEdit ? (
                <> {/* 수정하기를 누른 상태라면 */}
                    <button onClick={handleQuitEdit}>수정 취소</button>
                    <button onClick={handleEdit}>수정 완료</button>
                </>
            ) :
                <> {/* 수정하기를 누르지 않은 상태라면 */}
                    <button onClick={handleRemove}>삭제하기</button>
                    <button onClick={toggleIsEdit}>수정하기</button>
                </>
            }
        </div>
    )
}

export default DiaryItem;
