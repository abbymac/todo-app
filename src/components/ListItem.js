import React from "react";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// import EditIcon from "@material-ui/icons/Edit";
// import { Modal } from "@material-ui/core";

const ListItem = ({ todo, onClick, showCompleted, deleteTodo }) => {
  return (
    <ListItemContainer onClick={onClick} show={showCompleted} key={todo.id}>
      <NameContain>
        {/* <IconButton
          aria-label="Delete todo"
          component="span"
        >

          <EditIcon />
        </IconButton> */}
        <TodoName completed={todo.completed}>{todo.name}</TodoName>
      </NameContain>

      <IconContain>
        <ToggleButton completed={todo.completed} />
        <IconButton
          aria-label="Delete todo"
          component="span"
          onClick={deleteTodo}
        >
          <DeleteIcon />
        </IconButton>
      </IconContain>
    </ListItemContainer>
  );
};

export default ListItem;

const ListItemContainer = styled.div`
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  opacity: ${(props) => (props.show ? 1 : 0)};
  max-height: ${(props) => (props.show ? "100%" : 0)};
  padding: ${(props) => (props.show ? "20px 0" : 0)};
  display: inline-flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-bottom: solid 1px #999;
  transition: max-height 0.3s linear, padding 0.3s linear,
    visibility 0.3s linear, opacity 0.3s linear;
`;

const TodoName = styled.div`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const ToggleButton = styled.div`
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0px 0px 0px 1px #2a4056;
  height: 20px;
  width: 20px;
  background-color: ${(props) => (props.completed ? "#d24950" : "#f5f5f5")};
  transition: background-color 0.2s linear;
`;

const IconContain = styled.div`
  display: inline-flex;
  align-items: center;
`;

const NameContain = styled(IconContain)``;
