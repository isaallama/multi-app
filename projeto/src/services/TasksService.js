import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Unable to fetch tasks. Please try again later.');
  }
};

const addTask = async (task) => {
  try {
    const newTask = { text: task };
    const response = await axios.post(API_URL, newTask);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw new Error('Unable to add task. Please try again later.');
  }
};

const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting task with id ${id}:`, error);
    throw new Error('Unable to delete task. Please try again later.');
  }
};

const updateTask = async (id, updatedText) => {
  try {
    const updatedTask = { text: updatedText };
    await axios.put(`${API_URL}/${id}`, updatedTask);
    return updatedTask;
  } catch (error) {
    console.error(`Error updating task with id ${id}:`, error);
    throw new Error('Unable to update task. Please try again later.');
  }
};

export default { fetchTasks, addTask, deleteTask, updateTask };

