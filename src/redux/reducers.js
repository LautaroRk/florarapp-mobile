import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import auctionsReducer from "./auctions/auctionsReducer";

export default combineReducers({ 
  authReducer,
  auctionsReducer,
});