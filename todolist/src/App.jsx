import { useState } from 'react'
import './App.css'

function App() {
  // 维护当前input输入框内的状态，数据结构使用字符串
  let [currInput, setInput] = useState("");
  // 维护当前todo-list的内的todo-item，分为正在进行中的todo-item和已完成的todo-item，数据结构使用数组
  let [currTodoItem, setTodoItem] = useState([]);
  let [currFinishedItem, setFinishedItem] = useState([]);

  function onSubmit(e) {
    e.preventDefault();
    // 清空输入框
    setInput("");
  }

  function addTodoItem(itemId, itemContent, itemFinish) {
    // ...使当前的数据继承原数据的属性
    setTodoItem([...currTodoItem, { itemId: itemId, itemContent: itemContent, itemFinish: itemFinish }])
  }

  function checkItem(itemId, isChecked) {
    // 维护currTodoItem，使被点击checkbox的todo-item的checkbox改变状态
    // 遍历currTodoItem，找到被点击的那个，这个新建为修改checkbox状态的todo-item
    setTodoItem((current) => {
      return current.map((todo) => {
        if (todo.itemId === itemId) {
          return { ...todo, itemFinish: isChecked }
        } else {
          return todo;
        }
      })
    })
  }

  function toggleFinishItem(itemId, isChecked) {
    // 维护未完成todo-item
    setTodoItem((current) => {
      return current.filter((todo) => {
        if ((todo.itemId === itemId) && (isChecked === true)) {
          setFinishedItem([ ...currFinishedItem, todo ])
          return false;
        }
        return true;
      })
    })
  }

  function onCheck(itemId, isChecked) {
    checkItem(itemId, isChecked);
    toggleFinishItem(itemId, isChecked);
  }

  function onDelete(itemId, listName) {
    // 维护currTodoItem数组，删除被点击Delete button的todo-item
    // 使用array.filter()方法，使不满足条件的todo-item不返回
    if (listName === "unfinished") {
      setTodoItem((current) => {
        return current.filter((todo) => {
          return todo.itemId !== itemId;
        })
      })
    } else if (listName === "finished") {
      setFinishedItem((current) => {
        return current.filter((todo) => {
          return todo.itemId !== itemId;
        })
      })
    }
  }

  return (
    <>
      <h1>Todo</h1>
      {/* 创建一个form来提交表单 */}
      <form className="submit-todo" onSubmit={onSubmit}>
        {/* 创建一个input来输入todo内容 */}
        <input type="text" value={currInput} onChange={(e) => setInput(e.target.value)} className="todo-content" />
        {/* 创建一个button来提交todo项 */}
        <button className="add-todo" onClick={() => { addTodoItem(crypto.randomUUID(), currInput, false) }}>Add</button>
      </form>
      {/* 将维护的todo-list中的todo-item渲染出来 */}
      {/* 创建一个unordered list */}
      <h2 className="unifinished-todo-list">Unifinished Todos</h2>
      <ul className="todo-list-in-process">
        {currTodoItem.map((todo) => {
          return (
            <li className="todo-item-in-process" key={todo.itemId}>
              <input type="checkbox" name="finished" onChange={(e) => {onCheck(todo.itemId, e.target.checked)}} />{todo.itemContent + ' '}
              <button className="delete" onClick={() => {onDelete(todo.itemId, "unfinished")}}>Delete</button>
            </li>
          )
        })}
      </ul>
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
  )
}

export default App
