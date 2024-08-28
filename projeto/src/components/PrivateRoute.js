import { Route, Redirect } from 'react-router-dom';
import { getStorage } from '../utils/Stage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = getStorage('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
