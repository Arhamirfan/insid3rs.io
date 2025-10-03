const initialState = {
  address: "",
  balance: "",
  network: "",
  profile: {}
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_WALLET":
      let updatedValues = action.payload
      return { ...state, ...updatedValues };
    default:
      return state;
  }
};

export default wallet;
