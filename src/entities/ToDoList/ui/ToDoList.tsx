import { useState } from "react";
import { useStoreMap } from "effector-react";
import { $todo, addTask, removeTask, toggleTask } from "../model";
import { Container, Button, Form, ListGroup } from "react-bootstrap";

export function ToDoList() {
  const [taskText, setTasktext] = useState<string>("");

  const todos = useStoreMap({
    store: $todo,
    keys: [],
    fn: (state) => state,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTasktext(event.target.value);
  };

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      isCompleted: false,
    };
    if (taskText.trim() !== "") {
      addTask(newTask);
      setTasktext("");
    }
  };

  const handleRemoveTask = (taskId: number) => {
    removeTask(taskId);
  };

  const handleToggleTask = (taskId: number) => {
    toggleTask(taskId);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <Container>
      <div className="d-flex flex-row mb-2 gap-2">
        <Form.Control
          placeholder="Введите текст"
          value={taskText}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
        />
        <Button onClick={handleAddTask}>Добавить</Button>
      </div>
      <ListGroup className="px-0">
        {todos.map((task, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between"
          >
            <Form.Check
              checked={task.isCompleted}
              onChange={() => handleToggleTask(task.id)}
            />
            <span
              className={
                task.isCompleted
                  ? "text-muted text-decoration-line-through"
                  : "none"
              }
            >
              {task.text}
            </span>
            <Button
              onClick={() => handleRemoveTask(task.id)}
              variant="outline-danger"
            >
              Удалить
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
