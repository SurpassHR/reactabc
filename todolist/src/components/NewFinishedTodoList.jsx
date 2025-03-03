import './NewFinishedTodoList.css';

export default function NewFinishedTodoList({ currFinishedItem, onDelete }) {
  return (
    <>
      <h2 className="finished-todo-list">Finished Todos</h2>
      <ul className="todo-list-finished">
        {currFinishedItem.map((todo) => {
          return (
            <li className="todo-item-finished" key={todo.itemId}>
              {todo.itemContent}
              <button className="delete" onClick={() => {onDelete(todo.itemId, "finished")}}>Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  );
}
