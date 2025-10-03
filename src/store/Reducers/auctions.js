const initialState = {
  auctionId: "",
  minBidAmount: 0,
  list: []
}

const auctions = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_AUCTION_LIST":
      return action.payload;
    case "UPDATE_AUCTION_LIST":
      if (action.payload.auctionId == state.auctionId) {
        return { ...state, list: [action.payload.data, ...state.list], minBidAmount: action.payload.minBidAmount, };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default auctions;
