
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext(false);

export function useAuth(Component) {
  const navigate=useNavigate()
    return function WrapperComponent(props) {
    return (
      <AuthContext.Consumer>
        {(auth) =>{
            if(!auth.authenticated){
                return navigate('/auth')
            }
            return( <Component {...props} auth={auth} />)}}
      </AuthContext.Consumer>
    );
  };
}
