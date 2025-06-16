// React에서 useState 훅을 import합니다. (상태 관리를 위해 필요)
import { useState } from 'react';
// CSS Module을 import해서 컴포넌트에 스타일을 적용합니다.
import styles from './TodoForm.module.css';

// TodoForm 컴포넌트 정의. props로 부모 컴포넌트의 함수를 전달받음.
function TodoForm(props) {
  // 할 일 입력값을 저장하는 상태 변수와 setter 함수
  const [newTodoText, setNewTodoText] = useState('');
  // 우선순위 값을 저장하는 상태 변수와 setter 함수 (기본값: '2' = 보통)
  const [priority, setPriority] = useState('2');

  // 입력창의 값이 바뀔 때마다 상태를 업데이트하는 함수
  function handleChange(event) {
    setNewTodoText(event.target.value);
  }

  // 우선순위 select 값이 바뀔 때마다 상태를 업데이트하는 함수
  function handlePriorityChange(event) {
    setPriority(event.target.value);
  }

  // 폼 제출 시 실행되는 함수
  function handleSubmit(event) {
    event.preventDefault(); // 폼의 기본 동작(새로고침) 방지
    const data = {
      text: newTodoText, // 입력한 할 일 텍스트
      completed: false, // 기본 완료 상태는 false
      priority: Number(priority), // 우선순위는 숫자로 변환해서 저장
    };
    props.onCreate(data); // 부모 컴포넌트로 새 할 일 데이터 전달
    setNewTodoText(''); // 입력창 초기화
    setPriority('2'); // 우선순위 초기화
  }

  // 실제로 화면에 렌더링되는 부분(JSX)
  return (
    <div className={styles.formWrapper}> {/* 폼 전체를 감싸는 div, 스타일 적용 */}
      <form onSubmit={handleSubmit}> {/* 제출 이벤트 연결 */}
        <input
          type="text" // 텍스트 입력창
          value={newTodoText} // 입력값 상태와 연결
          onChange={handleChange} // 값이 바뀔 때마다 handleChange 실행
          className={styles.input} // CSS Module 스타일 적용
          placeholder="할 일을 입력하세요" // 안내 문구
        />
        <select
          value={priority} // 우선순위 상태와 연결
          onChange={handlePriorityChange} // 값이 바뀔 때마다 handlePriorityChange 실행
          className={styles.select} // CSS Module 스타일 적용
          aria-label="우선순위 선택" // 접근성(스크린리더용) 라벨
        >
          <option value="1">높음</option> {/* 우선순위: 높음 */}
          <option value="2">보통</option> {/* 우선순위: 보통 */}
          <option value="3">낮음</option> {/* 우선순위: 낮음 */}
        </select>
        <button type="submit" className={styles.button}> {/* 제출 버튼 */}
          추가
        </button>
      </form>
    </div>
  );
}

// 이 컴포넌트를 외부에서 사용할 수 있도록 export
export default TodoForm;