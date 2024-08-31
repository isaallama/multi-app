import { useState } from 'react'; 
import { Container, Title, Input, Button, ResultsContainer, ErrorMessage } from '../styles/IPAddressFinder';




const IPAddressFinder = () => {
  const [ip, setIp] = useState(''); // Estado para armazenar o IP digitado pelo usuário
  const [ipData, setIpData] = useState(null); // Estado para armazenar as informações do IP
  const [error, setError] = useState(null); // Novo estado para capturar erros


  const getIP = async () => {     // Função assíncrona para buscar informações do IP e atualizar o estado
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
        placeholder="Digite o endereço IP" 
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
