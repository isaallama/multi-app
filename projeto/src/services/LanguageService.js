import axios from 'axios';

const BASE_URL = 'https://api.mymemory.translated.net/get';

const translateText = async (text, sourceLang, targetLang) => { // Função assíncrona para traduzir um texto
  try {
    if (!text || !sourceLang || !targetLang) {
      throw new Error('Parametros inválidos');
    }

    const response = await axios.get(BASE_URL, {
      params: {
        q: text,
        langpair: `${sourceLang}|${targetLang}`,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

  
    if (response.data.responseStatus !== 200) {   // Verifica se a resposta contém erros
      throw new Error('Erro ao traduzir o texto');
    }

    return response.data.responseData.translatedText;
  } catch (error) {
    console.error('Erro ao traduzir o texto:', error.message); // Lança uma nova mensagem de erro para ser capturada pelo componente
    throw new Error('Não foi possível traduzir o texto. Por favor, tente novamente');
  }
};

export default { translateText };
