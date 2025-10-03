import { termsAndConditionsArray } from "../../constants/staticData";
import { Accordion } from "react-bootstrap";
let TermsAndConditions = () => {
    return (
        <>
            <div className="container text-white text-center mt-5 pb-5 font">
                <div className="xxxlCustomBoldText minimizeFont purpleColor">
                    <span>TERMS AND CONDITIONS</span>
                </div>
                {termsAndConditionsArray.map((terms, index) => {
                    return <div className="container-fluid px-2 px-md-5 text-start outsideAccordion" key={index}>
                        <Accordion>
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>{terms?.question}</Accordion.Header>
                                <Accordion.Body>
                                    <div dangerouslySetInnerHTML={{ __html: terms?.answer }} />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                })}
            </div>

        </>
    );
};

export default TermsAndConditions;
