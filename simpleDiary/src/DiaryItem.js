import { useRef, useState } from "react";

const DiaryItem = ({ onEdit, onRemove, author, content, emotion, created_date, id }) => {
    //현재 해당 일기가 수정 중인지 수정 중이 아닌지를 나타냄
    const [isEdit, setIsEdit] = useState(false);

    //수정하기 버튼을 누르면 isEdit이 t -> f로 f -> t로 변경이 일어남
    //먄약에 f -> t로 변경되면 아래 수정할 수 있게 폼을 띄워줘야 함
    const toggleIsEdit = () => setIsEdit(!isEdit);

    //기본 상태가 props를 통해서 받아온 content --> 수정하는 폼을 업데이트(이게 없으면 수정하기를 눌러서 나타나는 폼에 입력을 해도 아무것도 입력이 되지 않음)
    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef

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
                onChange={(e) => setLocalContent(e.target.value)}>
                    </textarea></> 
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

//수정하기를 누르면 본문이 나오는 것이 아니라 본문을 수정할 수 있는 폼이 나타나야 함 --> 수정하는 폼을 state로 나타내야 함
//state로 나타내는 이유는 화면의 변화가 일어나야 하는 부분 즉, 리렌더링 되어야 하는 부분이기 때문

//수정완료 이벤트를 DiaryItem에서 App까지 전달하기 위해서는 ? --> 데이터를 가지고 있는 App컴포넌트에 수정하는 기능을 하는 함수를 만들어서 DiaryItem까지 보내줘야 함
//onEdit함수의 setData를 이용해서 데이터를 수정해줌
//onEdit함수는 DiaryItem이 최종적으로 호출을 해야 함 -> DiaryItem의 부모인 DiaryList로 onEdit함수를 전달 -> 다시 DiaryItem으로 onEdit함수 전달, DiaryItem은 onEdit을 props로 받아서 호출

//수정 완료 버튼을 눌렀을 때 처리할 이벤트 핸들러 함수 -> handleEdit -> 이 함수가 궁극적으로  onEdit함수 수행
//onEdit이라는 함수가 존재한다는 것만 알고있고 수정하기 버튼을 눌러서 수정하기 이벤트가 발생하면 그 때 App.js로 이벤트 발생을 전달해서 onEdit props에 실제로 onEdit함수가 바인딩 되는 것?

//궁금증 : 수정완료 버튼이 눌리면 -> DiaryItem에서 수정하기 이벤트 발생 -> handleEdit 함수 호출 -> 이 함수가 props로 받은 onEdit함수 호출 -> onEdit이 setState호출 -> state변화
// ==> 여기서 대체 app으로 event를 전달한느 부분이 어디????