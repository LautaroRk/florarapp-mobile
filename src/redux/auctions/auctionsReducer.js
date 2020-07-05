const INITIAL_STATE = {
  auctions: [],
}

const AuctionsReducer = ( state = INITIAL_STATE, action ) => {
  switch( action.type ){
    case 'GET_AUCTIONS':
      if (action.payload !== undefined) {

        let sortedAuctions = [];

        if (action.payload.length) {
          const active = action.payload.filter(auction => 
            new Date(auction.start_date) <= new Date() &&
            new Date(auction.end_date) > new Date()
          ).sort((a,b) => new Date(a.end_date).valueOf() - new Date(b.end_date).valueOf());

          const starting = action.payload.filter(auction =>
            new Date(auction.start_date) > new Date()
          ).sort((a,b) => new Date(a.start_date).valueOf() - new Date(b.start_date).valueOf());

          const ended = action.payload.filter(auction =>
            new Date(auction.end_date) <= new Date()
          );
          
          sortedAuctions = [...active, ...starting, ...ended];
        }

        return {
          ...state,
          auctions: sortedAuctions,
        }
      }

    case 'UPDATE_STOCK': 
      return {
        ...state,
        auctions: state.auctions.map(auction => {
          if (auction._id === action.payload._id) {
            auction.stock_left = action.payload.stock_left;
          }
          return auction;
        }),
      }

    case 'ADD_SALE': 
      if (action.payload !== undefined) {

        // @TODO

        return state;
      }
    
    default: 
      return state;
  }
}

export default AuctionsReducer;