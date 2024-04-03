import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");
  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  // write
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      todo,
      uuid,
    });
    // edit ^ for item_name, item_price, item_link

    setTodo("");
  };

  // read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);

  // update
  const handleEdit = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setTodo(todo.todo)
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      todo,
      uuid: tempUuid,
    });

    setTodo("");
    setIsEdit(false);
  };

  // delete
  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`));
  };

  return (
    <div className="App">
      <input type="text" value={todo} onChange={handleTodoChange} />
      {isEdit ? (
        <>
          <button onClick={handleSubmitChange}>submit change</button>
          <button onClick={() => {
            setIsEdit(false); 
            setTodo("");}}
            >X</button>
        </>
      ) : (
        <button onClick={ writeToDatabase }>submit</button>
      )}
      {todos.map((todo) => (
        <>
          <h1>{todo.todo}</h1>
          <button onClick={() => handleEdit(todo)}>update</button>
          <button onClick={() => handleDelete(todo)}>delete</button>
        </>
      ))}
    </div>
  );
}

export default App;
