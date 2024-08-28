import { useState, useEffect } from 'react';
import { Container, Title, Input, Button, TaskList, TaskItem, EditInput, ErrorMessage } from '../styles/TodoApp'; 
import TaskService from '../services/TaskService';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksData = await TaskService.fetchTasks();
        setTasks(tasksData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const addTask = async () => {
    try {
      if (task) {
        const newTask = await TaskService.addTask(task);
        setTasks([...tasks, newTask]);
        setTask('');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await TaskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const updateTask = async (id) => {
    try {
      await TaskService.updateTask(id, editingTaskText);
      setTasks(tasks.map(task => (task.id === id ? { ...task, text: editingTaskText } : task)));
      setEditingTaskId(null);
      setEditingTaskText('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Title>Todo App</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>} 
      <Input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <Button onClick={addTask}>Add Task</Button>
      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id}>
            {editingTaskId === task.id ? (
              <EditInput
                type="text"
                value={editingTaskText}
                onChange={(e) => setEditingTaskText(e.target.value)}
                onBlur={() => updateTask(task.id)}
              />
            ) : (
              <>
                {task.text}
                <div>
                  <button onClick={() => editTask(task.id, task.text)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
};

export default TodoApp;
