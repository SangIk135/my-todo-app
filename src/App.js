// React의 useState 훅을 import (컴포넌트 내부에서 상태를 관리할 때 사용)
import { useState } from 'react';
// 전체 앱 스타일을 import
import './App.css';
// 할 일 입력 폼 컴포넌트 import
import TodoForm from './components/TodoForm';
// 할 일 리스트 컴포넌트 import
import TodoList from './components/TodoList';

// App 컴포넌트 정의 (프로젝트의 메인 컴포넌트)
function App() {
  // 할 일 목록을 저장하는 상태 변수
  const [todos, setTodos] = useState([]);

  // 필터 상태 (all, completed, active)
  const [filter, setFilter] = useState('all');

  // 정렬 기준 상태 (created, priority)
  const [sortBy, setSortBy] = useState('created');

  // 필터링된 할 일 목록을 반환하는 함수
  function getFilteredTodos() {
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed); // 완료된 것만
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.completed); // 미완료만
    }
    return todos; // 전체
  }

  // 정렬된 할 일 목록을 반환하는 함수
  function getSortedTodos(filteredTodos) {
    const todosCopy = [...filteredTodos]; // 원본 배열 복사
    if (sortBy === 'priority') {
      todosCopy.sort((a, b) => a.priority - b.priority); // 우선순위 오름차순
    } else if (sortBy === 'created') {
      todosCopy.sort((a, b) => a.id - b.id); // 생성순(오래된 순)
    }
    return todosCopy;
  }

  // 화면에 보여줄 할 일 목록 (필터+정렬 적용)
  const displayedTodos = getSortedTodos(getFilteredTodos());

  // 필터 변경 시 실행되는 함수
  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  // 정렬 기준 변경 시 실행되는 함수
  function handleSortChange(e) {
    setSortBy(e.target.value);
  }

  // 새 할 일 추가 함수 (TodoForm에서 호출)
  function createTodoItem(data) {
    if (!data.text.trim()) {
      alert('할 일을 입력해주세요.')
      return;
    }
    data.id = Date.now(); // 고유 id 부여(생성 시각)
    setTodos([...todos, data]) // 새 할 일 추가
  }

  // 할 일 삭제 함수 (TodoList에서 호출)
  function deleteTodoItem(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  // 할 일 수정 함수 (텍스트, 완료여부 등)
  function updateTodoItem(id, data) {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      alert('해당하는 할 일이 없습니다.');
      return;
    }
    todos[todoIndex] = { ...todos[todoIndex], ...data, id }
    setTodos([...todos]);
  }

  // 실제로 화면에 렌더링되는 부분(JSX)
  return (
    <div className='App'>
      {/* 앱 제목 */}
      <h1 className="appTitle">📝 나만의 Todo-List</h1>
      {/* 할 일 입력 폼 */}
      <TodoForm onCreate={createTodoItem} />
      {/* 필터/정렬 선택 영역 */}
      <div style={{ margin: '16px 0', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <label>
          필터:&nbsp;
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">전체</option>
            <option value="active">완료</option>
            <option value="completed">미완료</option>
          </select>
        </label>

        <label>
          정렬:&nbsp;
          <select value={sortBy} onChange={handleSortChange}>
            <option value="created">생성순</option>
            <option value="priority">우선순위</option>
          </select>
        </label>
      </div>
      {/* 할 일 리스트 */}
      <TodoList items={displayedTodos} onRemove={deleteTodoItem} onUpdate={updateTodoItem} />
    </div>
  );
}

// 이 컴포넌트를 외부에서 사용할 수 있도록 export
export default App;