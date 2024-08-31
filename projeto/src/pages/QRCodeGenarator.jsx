import { useState } from 'react';
import QRCode from 'qrcode.react';
import { Container, Title, Input, QRCodeContainer, ErrorMessage } from '../styles/QRCodeGenerator';

const QRCodeGenerator = () => {
  const [text, setText] = useState(''); // Texto para gerar o QRCODE
  const [error, setError] = useState(''); // Novo estado para capturar erros

  const handleChange = (e) => { // Função para capturar o texto digitado pelo usuário
    const input = e.target.value;
    if (input.trim() === '') {
      setError('O campo não deve estar vazio');
    } else {
      setError('');
      setText(input);
    }
  };

  return (
    <Container>
      <Title>QR Code Generator</Title>
      <Input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Digite o texto para gerar o QRCODE"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>} 
      {text && !error && (
        <QRCodeContainer>
          <QRCode value={text} size={256} />
        </QRCodeContainer>
      )}
    </Container>
  );
};

export default QRCodeGenerator;
