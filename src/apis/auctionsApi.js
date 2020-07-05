import Requester from '../utils/requester';
import { API } from './routes';

class AuctionsApi {
  /**
   * Metodo para obtener subastas
   * @param queryParams: sortBy, order, limit, from, upTo
   *
   * @returns { Promise }
   */
  static async getAuctions(queryParams) {
    try {
      let path = `${API}/auctions`;

      // Añadimos los parametros a la ruta
      if (Object.keys(queryParams).length) path += '?';
      for (const param in queryParams) {
        if (queryParams.hasOwnProperty(param)) {
          path += `${param}=${queryParams[param]}`;
        }
      }
      console.log(path);

      // Request helper
      let req = new Requester();
      // Response server
      let response = await req.get(path);

      return response;

    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Metodo para generar una compra a una subasta
   * @param --
   *
   * @returns { Promise }
   */
  static async addSale(auctionId, userId, token, unit_price, quantity) {
    try {
      // Enndpoint server
      const path = `${API}/sale/${auctionId}/${userId}`;

      // Body
      const body = {
        unit_price,
        quantity,
      }

      // Request helper
      let req = new Requester();

      // Se le agrega el token en el header
      req.headersArray.append('Authorization', `Bearer ${token}`);

      // Response server.
      let response = await req.post(path, body);
  
      return response;
  
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuctionsApi;
