import React from 'react';
import Todo from './Todo';
import { useState, useEffect } from 'react';


const TodoList = () => {
  const [opencount, countOpenTodos] = useState(0);
  const [todos, setTodos] = useState(() => {
    const items = localStorage.getItem("items");
    const parsed = JSON.parse(items);
    return parsed || [];
  });
  const [textinput, setTextInput] = useState("");

  const countOpen = () => {
    const donetodos = todos.filter((item) => {
      return !item.done;
    });
    countOpenTodos(donetodos.length);
  };

  const changeTodo = (index) => {
    const newTodos = [...todos];
    if (newTodos[index].done) { newTodos[index].done = false; }
    else { newTodos[index].done = true; }
    setTodos(newTodos);
  };


  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (textinput != "") {
      const newTodos = [...todos];
      newTodos.push({ "description": textinput, "done": false });
      setTodos(newTodos);
      setTextInput("");
    }
  };

  const changeTodoInput = (e) => {
    setTextInput(e.target.value);
  };

  useEffect(() => {
    countOpen();
    localStorage.setItem("items", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="shadow-sm hover:shadow-xl">
      <div className="text-center bg-gray-800 text-white py-4 font-semibold">
        <h1 className="text-3xl">Unsere Todos</h1>
        <h2 className="text-xl">Offene Todos: {opencount}</h2>
        <form className="grid grid-cols-3 py-2">
          <input
            onChange={changeTodoInput}
            className="col-span-2 py-2 text-gray-900"
            type="text"
            value={textinput}
            placeholder="Neues Todo eintragen.."
          ></input>
          <input
            type="submit"
            onClick={addTodo}
            value="Todo hinzufügen"
            className="col-span-1 text-gray-900 bg-gray-200 cursor-pointer"
          ></input>
        </form>
      </div>

      {todos.map((item, index) => {
        return (
          <Todo
            description={item.description}
            done={item.done}
            key={index}
            index={index}
            onChangeTodo={changeTodo}
            onDeleteTodo={deleteTodo}
          ></Todo>
        );
      })}
    </div>
  );
};

export default TodoList;