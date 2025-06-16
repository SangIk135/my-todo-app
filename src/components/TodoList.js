// TodoItem 컴포넌트를 import (각 할 일 항목을 표시하는 컴포넌트)
import TodoItem from "./TodoItem";
// CSS Module을 import해서 리스트에 스타일을 적용
import styles from './TodoList.module.css';

// TodoList 컴포넌트 정의. props로 부모 컴포넌트에서 데이터와 함수들을 전달받음
function TodoList (props) {
    return (
        // 전체 리스트를 감싸는 div, 스타일 적용
        <div className={styles.listWrapper}>
            <ul>
                {/* props.items 배열을 map으로 반복하여 각 할 일을 li로 렌더링 */}
                {props.items.map((item, index) => (
                 <li key={index}> {/* 각 항목에 고유 key 부여 */}
                    {/* TodoItem 컴포넌트에 할 일 데이터와 함수 전달 */}
                    <TodoItem  item={item} 
                    onUpdate={props.onUpdate}
                    onRemove={props.onRemove}
                    />
                 </li>   
                ))}
            </ul>
        </div>
    )
}

// 이 컴포넌트를 외부에서 사용할 수 있도록 export
export default TodoList;