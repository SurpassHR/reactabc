import { useState } from 'react'
import './App.css'
import NewTodoForm from './components/NewTodoForm';
import NewFinishedTodoList from './components/NewFinishedTodoList';
import NewUnfinishedTodoList from './components/NewUnfinishedTodoList';

function App() {
  // 维护当前todo-list的内的todo-item，分为正在进行中的todo-item和已完成的todo-item，数据结构使用数组
  let [currTodoItem, setTodoItem] = useState([]);
  let [currFinishedItem, setFinishedItem] = useState([]);

  function addTodoItem(itemContent) {
    // ...使当前的数据继承原数据的属性
    setTodoItem([...currTodoItem, { itemId: crypto.randomUUID(), itemContent: itemContent, itemFinish: false }])
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
      <NewTodoForm addTodoItem={addTodoItem}></NewTodoForm>
      <NewUnfinishedTodoList currTodoItem={currTodoItem} onCheck={onCheck} onDelete={onDelete}></NewUnfinishedTodoList>
      <NewFinishedTodoList currFinishedItem={currFinishedItem} onDelete={onDelete}></NewFinishedTodoList>
    </>
  )
}

export default App
