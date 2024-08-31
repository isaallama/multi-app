import { Route, Redirect } from 'react-router-dom';
import { getStorage } from '../utils/Stage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = getStorage('token'); //Recupera o token de autenticação armazenado no localStorage

  return (
    <Route
      {...rest} 
      render={(props) =>  
        // Se o token existir, renderiza o componente desejado
        token ? <Component {...props} /> : <Redirect to="/login" /> // Caso contrário, redireciona o usuário para a página de login.
      }
    />
  );
};

export default PrivateRoute;
