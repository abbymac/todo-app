import React, { useReducer, useState } from "react";
import styled from "styled-components";

import ListItem from "./components/ListItem.js";

const initialState = {
  todos: [
    { id: 1, name: "Grocery Shop", completed: false },
    { id: 2, name: "Study", completed: false },
    { id: 3, name: "Watch Avatar (not the movie)", completed: false },
  ],
  query: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length + 1,
            name: action.payload,
            completed: false,
          },
        ],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  const onChangeTodo = (e) => {
    setNewTodo(e.target.value);
  };

  const shouldShow = (todo) => {
    if (todo.completed && !showCompleted) {
      return false;
    }
    return true;
  };

  return (
    <AppContainer>
      <Header>ToDo Tasks</Header>
      <AddNewContainer>
        <NewInput
          type="text"
          value={newTodo}
          onChange={onChangeTodo}
          placeholder="New todo..."
        />
        <Button
          onClick={() => {
            dispatch({ type: "ADD_TODO", payload: newTodo });
            setNewTodo("");
          }}
        >
          Add todo
        </Button>
        <Button onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? "hide completed" : "show completed"}
        </Button>
      </AddNewContainer>
      <ListContainer>
        {state.todos.map((todo) => (
          <ListItem
            onClick={() => dispatch({ type: "TOGGLE_COMPLETE", id: todo.id })}
            todo={todo}
            key={todo.id}
            showCompleted={shouldShow(todo)}
            deleteTodo={() => dispatch({ type: "DELETE_TODO", id: todo.id })}
          />
        ))}
      </ListContainer>
    </AppContainer>
  );
}

export default App;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 70%;
  -moz-box-shadow: 1px 2px 3px #111;
  -webkit-box-shadow: 1px 2px 3px #111;
  box-shadow: 1px 2px 3px #111;
  padding: 20px;
  background-color: #f5f5f5;
  margin: 30px 0 50px 0;
  border-radius: 10px;
`;

const NewInput = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid gray;
  background-color: #2a4056;
  color: #f6f9f1;
  flex-grow: 2;
  &:focus {
    outline: none;
    border-bottom: 1px solid red;
  }
`;

const Button = styled.button`
  padding: 15px;
  background-color: #d24950;
  border: none;
  border-radius: 15px;
  min-width: 40px;
  outline: none;
  margin: 0 5px;
  font-weight: 600;
  text-transform: uppercase;
  color: #f6f9f1;
`;

const Header = styled.div`
  padding: 20px 0;
  font-size: 50px;
  font-weight: 200;
  display: flex;
  color: #2a4056;
  text-transform: uppercase;
  justify-content: center;
  align-content: center;
`;

const AddNewContainer = styled.div`
  margin: 20px 0;
  display: inline-flex;
  justify-content: center;
  padding: 20px;
  width: 70%;
  background-color: #2a4056;
  border-radius: 10px;
  box-shadow: 1px 2px 2px #111;
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(0deg, #2a4056 60%, #f6f9f1 40%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
