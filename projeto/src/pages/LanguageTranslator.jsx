import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce'; 
import { Container, Title, Input, Button, Label, Select, TranslatedText, ErrorMessage, Loader } from '../styles/LanguageTranslator';
import LanguageService from '../services/LanguageService';

const LanguageTranslator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
        setError(error.message || 'An unexpected error occurred.');
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
        placeholder="Enter text to translate"
      />
      {translatedText && <TranslatedText>{translatedText}</TranslatedText>}
    </Container>
  );
};

export default LanguageTranslator;

