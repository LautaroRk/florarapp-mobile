import AuctionCard from "../../components/AuctionCard/AuctionCard"

const INITIAL_STATE = {
  user: {},
  token: "",
  history: [],
  isLogout: false,
}

const AuthReducer = ( state = INITIAL_STATE, action ) => {
  switch(action.type){
    case 'LOGIN':
      if (action.payload !== undefined) {
        if (Object.keys(action.payload).includes("user") && Object.keys(action.payload).includes("token")) {
          return {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            isLogout: false,
          } 
        } else {
          return {
            ...state,
          }
        }
      }

    case 'GET_HISTORY':
      if (action.payload !== undefined) {
        //console.log(action.type, action.payload);
        if (Object.keys(action.payload).includes("history") && Object.keys(action.payload).includes("debt")) {
          return {
            ...state,
            history: action.payload.history,
            debt: action.payload.debt,
          }
        }
      }
      return {
        ...state
      }

    case 'LOGOUT':
      return {
        ...INITIAL_STATE,
        isLogout: true,
      }
    
    default: 
      return state;
  }
}

export default AuthReducer;