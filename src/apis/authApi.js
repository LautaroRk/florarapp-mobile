import Requester from '../utils/requester';
import { API } from './routes';

class AuthApi {
  /**
   * Metodo para loguear y obtener los datos del usuario
   * @param --
   *
   * @returns { Promise }
   */
  static async login(username, password) {
    try {
      // Enndpoint server
      let path = `${API}/signin`;
      // Request helper
      let req = new Requester();
      // Response server.
      let response = await req.post(path, {
        username: username,
        password: password,
      });

      return response;

    } catch (error) {
      console.error(error);
    }
  }

  static async logout() {
    try {
      let path = `${API}/signout`;
      let req = new Requester();
      let response = await req.get(path);

      return response;

    } catch (error) {
      console.error(error);
    }
  }

  static async getHistory(userId, token) {
    try {
      let path = `${API}/user/history/${userId}`;
      let req = new Requester();
      // Se le agrega el token en el header
      req.headersArray.append('Authorization', `Bearer ${token}`);
      let response = await req.get(path);

      return response;

    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthApi;
