import './NewUnfinishedTodoList.css';

export default function NewUnFinishedTodoList({ currTodoItem, onCheck, onDelete }) {
  return (
    <>
      {/* 将维护的todo-list中的todo-item渲染出来 */}
      {/* 创建一个unordered list */}
      <h2 className="unifinished-todo-list">Unifinished Todos</h2>
      <ul className="todo-list-in-process">
        {currTodoItem.map((todo) => {
          return (
            <li className="todo-item-in-process" key={todo.itemId}>
              <input type="checkbox" name="finished" onChange={(e) => { onCheck(todo.itemId, e.target.checked) }} />{todo.itemContent + ' '}
              <button className="delete" onClick={() => { onDelete(todo.itemId, "unfinished") }}>Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  );
}
