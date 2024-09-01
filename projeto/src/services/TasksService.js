import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw new Error('Não foi possível buscar as tarefas. Por favor, tente novamente');
  }
};

const addTask = async (task) => {
  try {
    const newTask = { text: task };
    const response = await axios.post(API_URL, newTask);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
    throw new Error('Não foi possível adicionar a tarefa. Por favor, tente novamente');
  }
};

const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar tarefa com id ${id}:`, error);
    throw new Error('Não foi possível deletar a tarefa. Por favor, tente novamente');
  }
};

const updateTask = async (id, updatedText) => {
  try {
    const updatedTask = { text: updatedText };
    await axios.put(`${API_URL}/${id}`, updatedTask);
    return updatedTask;
  } catch (error) {
    console.error(`Erro ao atualizar tarefa com id ${id}:`, error);
    throw new Error('Não foi possível atualizar a tarefa. Por favor, tente novamente');
  }
};

export default { fetchTasks, addTask, deleteTask, updateTask };
