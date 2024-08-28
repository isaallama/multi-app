import { useState } from 'react';
import QRCode from 'qrcode.react';
import { Container, Title, Input, QRCodeContainer, ErrorMessage } from '../styles/QRCodeGenerator';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const input = e.target.value;
    if (input.trim() === '') {
      setError('Text cannot be empty.');
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
        placeholder="Enter text to encode"
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
