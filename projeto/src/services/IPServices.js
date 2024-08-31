import axios from 'axios';

const findIp = async (ip) => { // Função assíncrona para buscar informações do IP
  try {
    const url = `https://ipinfo.io/${ip}/json`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do IP:", error);
    throw new Error('Não foi possível encontrar o IP. Por favor, tente novamente.');
  }
}

const createIP = async (data) => { // Função assíncrona para criar um registro de IP
  try {
    return await axios.post('/ip', data);
  } catch (error) {
    console.error("Erro ao criar registro de IP:", error);
    throw new Error('Não foi possível criar o registro de IP. Por favor, tente novamente.');
  }
}

export default { findIp, createIP };
