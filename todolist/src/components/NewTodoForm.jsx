import { useState } from "react";
import './NewTodoForm.css';

export default function NewTodoForm({ addTodoItem }) {
  // 维护当前input输入框内的状态，数据结构使用字符串
  let [currInput, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // 清空输入框
    setInput("");
  }

  return (
    <>
      <h1>Todo</h1>
      {/* 创建一个form来提交表单 */}
      <form className="submit-todo" onSubmit={handleSubmit}>
        {/* 创建一个input来输入todo内容 */}
        <input type="text" value={currInput} onChange={(e) => setInput(e.target.value)} className="todo-content" />
        {/* 创建一个button来提交todo项 */}
        <button className="add-todo" onClick={() => { addTodoItem(currInput) }}>Add</button>
      </form>
    </>
  );
}
