// Si necesitas llamar a alguna api, este es un buen sitio para
// invocar a tu modelo y obtener informacion del backend
import AuthApi from '../../apis/authApi';

// Por convencion, las acciones se generan en constantes
const CLEAN_REDUCER = 'CLEAN_REDUCER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const GET_HISTORY = 'GET_HISTORY';
//const RESET_PASSWORD = 'RESET_PASSWORD';

// Accion de ejemplo para limpiar el Reducer
export const cleanReducer = () => {
  return {
    type: CLEAN_REDUCER,
    payload: {}
  }
}

// ( SOLO SI LA INFORMACION CONSULTADA ES NECESARIO COMPARTIRLA o Persistirla )
// Si no, puedes invocar al modelo en la vista
export const login = ( username, password ) => {
  // Obtenemos la data
  let payload = AuthApi.login( username, password );

  // Retornamos la data
  return {
    type: LOGIN,
    payload
  }
}

export const getHistory = (userId, token) => {
  let payload = AuthApi.getHistory(userId, token);

  return {
    type: GET_HISTORY,
    payload
  }
}

export const logout = () => {
  AuthApi.logout();

  return {
    type: LOGOUT
  }
}
