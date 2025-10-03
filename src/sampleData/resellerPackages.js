// Minimal reseller packages sample to feed ticketsByResellers

const resellerPackages = [
  {
    _id: "pkg-1",
    eventId: { _id: "evt-1" },
    title: "VIP Resale Bundle",
    auction: false,
    maticPrice: 360,
    minBid: null,
    tickets: [
      { count: 2, ticketId: { id: "tkt-1b", image: "/assets/images/eventProduction2.png", ticketTitle: "VIP Pass", ticketType: { ticketType: "VIP" } } },
    ],
  },
  {
    _id: "pkg-2",
    eventId: { _id: "evt-2" },
    title: "Standard Pair",
    auction: false,
    maticPrice: 210,
    minBid: null,
    tickets: [
      { count: 2, ticketId: { id: "tkt-2a", image: "/assets/images/rewardTicketSection.svg", ticketTitle: "Standard", ticketType: { ticketType: "Standard" } } },
    ],
  },
];

export default resellerPackages;


