import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce'; 
import { Container, Title, Input, Button, Label, Select, TranslatedText, ErrorMessage, Loader } from '../styles/LanguageTranslator';
import LanguageService from '../services/LanguageService';

const LanguageTranslator = () => {
  const [text, setText] = useState(''); // Armazena o texto a ser traduzido
  const [translatedText, setTranslatedText] = useState(''); // Armazena o texto traduzido
  const [sourceLang, setSourceLang] = useState('en'); // Idioma de origem
  const [targetLang, setTargetLang] = useState('es'); // Idioma de destino
  const [error, setError] = useState(null); // Novo estado para capturar erros
  const [loading, setLoading] = useState(false); // Novo estado para controlar o carregamento

  const translateText = useCallback(
    debounce(async (text) => {
      if (!text.trim()) {
        setTranslatedText(''); // Limpa a tradução se o texto estiver vazio
        return;
      }
      setLoading(true);
      try {
        const translation = await LanguageService.translateText(text, sourceLang, targetLang);
        setTranslatedText(translation);
        setError(null); // Limpa o erro anterior
      } catch (error) {
        setError(error.message || 'Ocorreu um erro inesperado. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    }, 500), [sourceLang, targetLang]
  );

  const handleTextChange = (e) => {
    setText(e.target.value);
    translateText(e.target.value); // Inicia a tradução com debounce
  };

  return (
    <Container>
      <Title>Language Translator</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>} {/* Exibe a mensagem de erro */}
      {loading && <Loader>Loading...</Loader>} 
      <div>
        <Label>Source Language:</Label>
        <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
        </Select>
      </div>
      <div>
        <Label>Target Language:</Label>
        <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
        </Select>
      </div>
      <Input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Digite o texto que deseja traduzir."
      />
      {translatedText && <TranslatedText>{translatedText}</TranslatedText>}
    </Container>
  );
};

export default LanguageTranslator;

