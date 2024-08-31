import { useState, useEffect } from 'react';
import { Container, Title, Input, Button, TaskList, TaskItem, EditInput, ErrorMessage } from '../styles/TodoApp'; 
import { todoApp as TaskService } from '../services';


const TodoApp = () => {
  const [task, setTask] = useState(''); // estado para armazenar o texto da tarefa
  const [tasks, setTasks] = useState([]); // estado para armazenar as tarefas
  const [editingTaskId, setEditingTaskId] = useState(null); // estado para armazenar o ID da tarefa em edição
  const [editingTaskText, setEditingTaskText] = useState(''); // estado para armazenar o texto da tarefa em edição
  const [error, setError] = useState(null);  // estado para armazenar erros

  useEffect(() => { // função para buscar as tarefas
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

  const addTask = async () => { // função assíncrona para adicionar uma tarefa
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

  const deleteTask = async (id) => { // função assíncrona para excluir uma tarefa
    try {
      await TaskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const updateTask = async (id) => { // função assíncrona para atualizar uma tarefa
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
        placeholder="Adicione uma tarefa"
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
