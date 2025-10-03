let totalTicketsCount = (props) => {
    let count = 0;
    props.tickets.map((ticketData) => count += ticketData.count);
    return count;
}
export default totalTicketsCount