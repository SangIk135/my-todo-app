// React의 useState 훅을 import (컴포넌트 내부에서 상태를 관리할 때 사용)
import { useState } from 'react';
// CSS Module을 import해서 스타일을 적용
import styles from './TodoItem.module.css';

// TodoItem 컴포넌트 정의. props로 부모 컴포넌트에서 데이터와 함수들을 전달받음
function TodoItem(props) {
    // 편집 모드 여부를 저장하는 상태 변수
    const [isEditing, setIsEditing] = useState(false);
    // 편집 중인 텍스트를 저장하는 상태 변수 (초기값은 현재 할 일 텍스트)
    const [editText, setEditText] = useState(props.item.text);

    // 삭제 버튼 클릭 시 실행되는 함수
    function handleDelete() {
        props.onRemove(props.item.id); // 부모에게 삭제 요청
    }

    // 완료/미완료 토글 버튼 클릭 시 실행되는 함수
    function handleToggle() {
        const newCompleted = !props.item.completed; // 완료 상태 반전
        props.onUpdate(props.item.id, { completed: newCompleted }); // 부모에게 상태 변경 요청
    }

    // 편집 input 값이 바뀔 때마다 실행되는 함수
    function handleChange(e) {
        setEditText(e.target.value); // 입력값을 상태에 저장
    }

    // 편집 input에서 엔터를 누르면 실행되는 함수
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            finishEditing(); // 편집 완료 처리
        }
    }

    // 편집 input에서 포커스를 잃으면 실행되는 함수
    function handleBlur() {
        finishEditing(); // 편집 완료 처리
    }

    // 편집 완료 처리 함수
    function finishEditing() {
        const trimmedText = editText.trim(); // 앞뒤 공백 제거
        if (!trimmedText) {
            alert('할 일을 비울 수 없습니다.');
            setEditText(props.item.text); // 원래 텍스트로 복원
        } else {
            if (trimmedText !== props.item.text) {
                props.onUpdate(props.item.id, { text: trimmedText }); // 부모에게 텍스트 변경 요청
            }
        }
        setIsEditing(false); // 편집 모드 해제
    }

    // 할 일 텍스트를 클릭하면 편집 모드로 전환
    function handleTextClick() {
        setIsEditing(true);
    }

    // 우선순위에 따라 색상을 다르게 표시
    const priorityColors = {
        1: '#e74c3c',   // 높음: 빨간색
        2: '#f1c40f',   // 보통: 노란색
        3: '#95a5a6',   // 낮음: 회색
    };

    // 실제로 화면에 렌더링되는 부분(JSX)
    return (
        <div className={`${styles.itemWrapper} ${props.item.completed ? styles.completedItem : ''}`}>
            {/* 우선순위 점 표시 */}
            <span
                className={styles.priorityDot}
                style={{ backgroundColor: priorityColors[props.item.priority] || '#ccc' }}
                title={`우선순위: ${props.item.priority === 1 ? '높음' : props.item.priority === 2 ? '보통' : '낮음'}`}
            ></span>
            {/* 편집 모드일 때는 input, 아닐 때는 텍스트 */}
            {isEditing ? (
                <input
                    className={styles.editInput}
                    value={editText}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                <p
                    className={`${styles.text} ${props.item.completed ? styles.completed : ''}`}
                    onClick={handleTextClick}
                    title="클릭해서 편집"
                    style={{ cursor: 'pointer' }}
                >
                    {props.item.text}
                </p>
            )}
            {/* 완료/미완료 토글 버튼 */}
            <button onClick={handleToggle} className={styles.button}>
                {props.item.completed ? '미완료로 변경' : '완료로 변경'}
            </button>
            {/* 삭제 버튼 */}
            <button onClick={handleDelete} className={styles.button}>
                삭제
            </button>
        </div>
    );
}

// 이 컴포넌트를 외부에서 사용할 수 있도록 export
export default TodoItem;