import { combineReducers } from "redux";

import wallet from "./wallet";
import party from "./party";
import auctions from "./auctions";

const rootReducer = combineReducers({
  wallet,
  party,
  auctions,
});

export default rootReducer;
