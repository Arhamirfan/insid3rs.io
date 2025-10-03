let Actions = {
  updateWallet: (data) => {
    return {
      type: "UPDATE_WALLET",
      payload: data,
    }
  },
  updateParty: (data) => {
    return {
      type: "UPDATE_PARTY",
      payload: data,
    }
  },
  addAuctionList: (data) => {
    return {
      type: "ADD_AUCTION_LIST",
      payload: data,
    }
  },
  updateAuctionList: (data) => {
    return {
      type: "UPDATE_AUCTION_LIST",
      payload: data,
    }
  },
  updateAuctionObjects: (data) => {
    return {
      type: "UPDATE_AUCTION_OBJECTS",
      payload: data,
    }
  },
};

export default Actions
