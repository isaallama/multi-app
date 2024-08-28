import axios from 'axios';

// Definindo uma URL base para futuras requisições
const BASE_URL = 'https://api.mymemory.translated.net/get';

const translateText = async (text, sourceLang, targetLang) => {
  try {
    // Verifica se os parâmetros são válidos
    if (!text || !sourceLang || !targetLang) {
      throw new Error('Missing required parameters for translation.');
    }

    const response = await axios.get(BASE_URL, {
      params: {
        q: text,
        langpair: `${sourceLang}|${targetLang}`,
      },
      headers: {
        // Adicione cabeçalhos se necessário, por exemplo:
        // 'Content-Type': 'application/json',
      },
    });

    // Verifica se a resposta contém erros
    if (response.data.responseStatus !== 200) {
      throw new Error('Error from translation service.');
    }

    return response.data.responseData.translatedText;
  } catch (error) {
    console.error('Error translating text:', error.message);
    // Lança uma nova mensagem de erro para ser capturada pelo componente
    throw new Error('Unable to translate text. Please try again later.');
  }
};

export default { translateText };
