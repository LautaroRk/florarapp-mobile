// Si necesitas llamar a alguna api, este es un buen sitio para
// invocar a tu modelo y obtener informacion del backend
import AuctionsApi from '../../apis/auctionsApi';

// Por convencion, las acciones se generan en constantes
const CLEAN_REDUCER = 'CLEAN_REDUCER';
const GET_AUCTIONS = 'GET_AUCTIONS';
const UPDATE_STOCK = 'UPDATE_STOCK';
const ADD_SALE = 'ADD_SALE';

// Accion de ejemplo para limpiar el Reducer
export const cleanReducer = () => {
  return {
    type: CLEAN_REDUCER,
    payload: {}
  }
}

export const getAuctions = (queryParams = {}) => {
  // Obtenemos la data
  let payload = AuctionsApi.getAuctions(queryParams);

  // Retornamos la data
  return {
    type: GET_AUCTIONS,
    payload
  }
}

export const updateStock = (_id, stock_left) => {
  return {
    type: UPDATE_STOCK,
    payload: {
      _id,
      stock_left,
    }
  }
}

export const addSale = (auctionId, userId, token, unit_price, quantity) => {
  // Obtenemos la data
  let payload = AuctionsApi.addSale(auctionId, userId, token, unit_price, quantity);

  // Retornamos la data
  return {
    type: ADD_SALE,
    payload
  }
}
