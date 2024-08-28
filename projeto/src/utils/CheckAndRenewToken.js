import jwtDecode from 'jwt-decode';
import { setStorage, getStorage } from '../stage';

const checkAndRenewToken = async () => {
    const token = getStorage('token');
    if (!token) return;
  
    const { exp } = jwtDecode(token); // Decodifica o token para obter a expiração
    const now = Date.now().valueOf() / 1000;
  
    if (exp - now < 300) { // Renova se o token estiver prestes a expirar 
      try {
        const response = await fetch('http://localhost:3000/refresh-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to renew token');
        }
  
        const { token: newToken } = await response.json();
        setStorage('token', newToken);
      } catch (error) {
        console.error('Erro ao renovar token:', error);
      }
    }
  };
  
  export default checkAndRenewToken;