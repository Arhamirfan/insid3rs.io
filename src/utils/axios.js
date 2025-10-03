// Mocked axios-like client for demo mode with local sample data
import sampleEvents from "../sampleData/events";
import demoUser from "../sampleData/users";
import resellerPackages from "../sampleData/resellerPackages";

function createMockResponse(status, data) {
  return Promise.resolve({ status, data: { data } });
}

function notFound() {
  return Promise.resolve({ status: 404, data: { msg: "Not found", data: null } });
}

async function mockRequest(config) {
  const { url = "", method = "get", data } = config || {};
  const upperMethod = (method || "get").toLowerCase();

  // Events
  if (url === "/v1/events/" && upperMethod === "post") {
    return createMockResponse(200, sampleEvents);
  }
  if (url.startsWith("/v1/events/event/slug/") && upperMethod === "get") {
    const slug = url.split("/v1/events/event/slug/")[1];
    const event = sampleEvents.find((e) => e.slug === slug);
    return event ? createMockResponse(200, event) : notFound();
  }
  if (url.startsWith("/v1/events/event/") && upperMethod === "get") {
    const id = url.split("/v1/events/event/")[1];
    const event = sampleEvents.find((e) => e.id === id);
    return event ? createMockResponse(200, event) : notFound();
  }
  if (url === "/v1/events/tickets" && upperMethod === "get") {
    return createMockResponse(200, sampleEvents.flatMap((e) => e.tickets));
  }
  if (url.startsWith("/v1/events/ticket/slug/") && upperMethod === "get") {
    const slug = url.split("/v1/events/ticket/slug/")[1];
    let foundTicket = null;
    let foundEvent = null;
    for (const ev of sampleEvents) {
      const t = (ev.tickets || []).find((tk) => tk.slug === slug);
      if (t) {
        foundTicket = t;
        foundEvent = ev;
        break;
      }
    }
    if (!foundTicket) return notFound();
    const ticket = {
      ...foundTicket,
      _id: foundTicket.id || slug,
      event_id: {
        _id: foundEvent._id,
        slug: foundEvent.slug,
        eventName: foundEvent.eventName,
        image: foundEvent.image,
        location: foundEvent.location,
      },
    };
    // Many pages expect status 201 for success on this endpoint
    return Promise.resolve({ status: 201, data: { data: ticket } });
  }

  // Search
  if (url.startsWith("/v1/events/search/") && upperMethod === "get") {
    const term = decodeURIComponent(url.split("/v1/events/search/")[1] || "").toLowerCase();
    const result = sampleEvents.filter((e) =>
      e.eventName.toLowerCase().includes(term) ||
      e.description.toLowerCase().includes(term) ||
      e.location.toLowerCase().includes(term)
    );
    return createMockResponse(201, result);
  }

  if (url.startsWith("/v1/app/search/global/") && upperMethod === "get") {
    const term = decodeURIComponent(url.split("/v1/app/search/global/")[1] || "").toLowerCase();
    const events = sampleEvents.filter((e) =>
      e.eventName.toLowerCase().includes(term) ||
      e.description.toLowerCase().includes(term) ||
      e.location.toLowerCase().includes(term)
    );
    const tickets = sampleEvents.flatMap(e => e.tickets || []).filter(t =>
      (t.ticketTitle || "").toLowerCase().includes(term)
    );
    return Promise.resolve({ status: 200, data: { data: { events, tickets } } });
  }

  // Reseller/package endpoints
  if (url.startsWith("/v1/app/packages/") && upperMethod === "get") {
    const eventId = url.split("/v1/app/packages/")[1];
    const pkgs = resellerPackages.filter(p => p.eventId?._id === eventId);
    return createMockResponse(200, pkgs);
  }
  if (url.startsWith("/v1/app/package/") && upperMethod === "get") {
    const id = url.split("/v1/app/package/")[1];
    const pkg = resellerPackages.find(p => p._id === id);
    if (!pkg) return notFound();
    const ev = sampleEvents.find(e => e._id === pkg.eventId?._id);
    const enriched = {
      ...pkg,
      _id: pkg._id,
      packageId: pkg._id,
      eventId: ev ? {
        _id: ev._id,
        slug: ev.slug,
        eventName: ev.eventName,
        image: ev.image,
        location: ev.location,
        isPaused: false,
      } : pkg.eventId,
      incrementBidPercentage: pkg.incrementBidPercentage || 10,
      transactionHash: pkg.transactionHash || "",
      userId: pkg.userId || { _id: "seller-1", name: "Sample Reseller", photo: "" },
      buyerId: pkg.buyerId || { _id: "", name: "", photo: "" },
      tickets: (pkg.tickets || []).map(t => ({
        count: t.count || 1,
        ticketId: {
          ticketId: t.ticketId?.id || t.ticketId?._id || "",
          image: t.ticketId?.image,
          ticketType: { ticketType: t.ticketId?.ticketType?.ticketType || "Standard" },
          ticketTitle: t.ticketId?.ticketTitle,
        }
      })),
    };
    return createMockResponse(200, enriched);
  }
  if (url.startsWith("/v1/app/search/packages/") && upperMethod === "get") {
    const term = decodeURIComponent(url.split("/v1/app/search/packages/")[1] || "").toLowerCase();
    const pkgs = resellerPackages.filter(p => (p.title || "").toLowerCase().includes(term));
    return createMockResponse(200, pkgs);
  }

  // User/auth minimal endpoints
  if (url === "/v1/user/login" && upperMethod === "post") {
    return Promise.resolve({ status: 200, data: { data: { token: "demo-token", profile: demoUser } } });
  }
  if (url === "/v1/user/profile" && upperMethod === "get") {
    return createMockResponse(200, demoUser);
  }
  if (url === "/v1/user/verify-account" && upperMethod === "post") {
    return Promise.resolve({ status: 200, data: { msg: "Account verified", data: demoUser } });
  }

  // Payment and other side effects: return success no-ops
  if (url.startsWith("/v1/stripe/") && (upperMethod === "post" || upperMethod === "get")) {
    return Promise.resolve({ status: 200, data: { msg: "Stripe mocked", data: {} } });
  }

  // Default: return 200 empty for unhandled
  return Promise.resolve({ status: 200, data: { data: {} } });
}

export default function axiosLike(config) {
  return mockRequest(config);
}