import { useState } from 'react'; 
import { Container, Title, Input, Button, ResultsContainer, ErrorMessage } from '../styles/IPAddressFinder';
import IPService from '../services/IPService'; 

const IPAddressFinder = () => {
  const [ip, setIp] = useState(''); 
  const [ipData, setIpData] = useState(null); 
  const [error, setError] = useState(null); // Novo estado para capturar erros

  const getIP = async () => {
    try {
      const response = await IPService.findIp(ip);
      setIpData(response);
      setError(null); // Limpa erro anterior
    } catch (error) {
      setError(error.message); // Define a mensagem de erro capturada
    }
  }

  return (
    <Container>
      <Title>IP Address Finder</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>} {/* Exibe a mensagem de erro */}
      <Input
        type="text"
        value={ip} 
        onChange={(e) => setIp(e.target.value)} 
        placeholder="Enter IP address" 
      />
      <Button onClick={getIP}>Find IP</Button> 
      {ipData && (
        <ResultsContainer>
          <p><strong>IP:</strong> {ipData.ip}</p>
          <p><strong>Location:</strong> {ipData.city}, {ipData.region}, {ipData.country}</p>
          <p><strong>ISP:</strong> {ipData.org}</p>
        </ResultsContainer>
      )}
    </Container>
  );
};

export default IPAddressFinder; 
