const initialState = false

const party = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PARTY":
      return action.payload;
    default:
      return state;
  }
};

export default party;
