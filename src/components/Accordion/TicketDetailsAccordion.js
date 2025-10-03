import { Accordion } from "react-bootstrap";
import PurchasersTab from "../../pageComponents/tickets/components/purchasersTab";
import ResellersTab from "../../pageComponents/tickets/components/resellersTab";

let TicketDetailsAccordion = ({ data }) => {
    return (
        <>
            <div className="container-fluid px-2 ticketAccordion">
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Benefits</Accordion.Header>
                        <Accordion.Body>
                            <p className="p_wrap">
                                {data?.benefits}
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    {/* <Accordion.Item eventKey="1">
                        <Accordion.Header>Purchasers</Accordion.Header>
                        <Accordion.Body>
                            <p className="p_wrap">
                                <PurchasersTab id={data._id} data={data} />
                            </p>
                        </Accordion.Body>
                    </Accordion.Item> */}
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Resellers</Accordion.Header>
                        <Accordion.Body>
                            <ResellersTab id={data._id} data={data} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

        </>
    );
};

export default TicketDetailsAccordion;
