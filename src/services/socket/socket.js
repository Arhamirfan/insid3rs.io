
import toast, { Toaster } from "react-hot-toast";
import ACTIONS from '../../store/Actions/Actions';
import store from "../../store/index";
import socketConnection from './socketConnection'
  

// client-side
socketConnection.on("connect", () => {
   console.log("your are connected.")
});
socketConnection.on("disconnect", () => {
   console.log("your disconnected")
});


socketConnection.on("ticketBuy", (data) => {
   if (data) {
      console.log("ticketBuy emit", data)
      try {
         let profileId = localStorage.getItem("profileId")
         if (profileId != data.userId) {
            let message = `${data.user.name} purchased ${data.ticketCount} tickets.`;
            partyEvent(message)
         }
      } catch (error) {
         console.log(error)
      }
   }
});
socketConnection.on("auctionBid", (data) => {
   if (data) {
      console.log("auctionBid emit ", data)
      store.dispatch(ACTIONS.updateAuctionList({ data: data.data, minBidAmount: data.minBidAmount, auctionId: data.auctionId }));
      let message = `${data?.data?.userId?.name} bid on auction with the amount ${data?.data?.bidAmount?.toFixed(4)} MATIC.`
      partyEvent(message)
   }
});

let partyEvent = (message) => {
   if (message) {
      toast(message)
   }
   store.dispatch(ACTIONS.updateParty(true));
   setTimeout(() => {
      store.dispatch(ACTIONS.updateParty(false));
   }, 7000);
}





// const getuserProfile = () => {
   // return store.getState().UserProfile.profile
// }












