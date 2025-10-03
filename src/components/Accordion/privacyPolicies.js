import { privacyPolicyData } from "../../constants/staticData";
import { Accordion } from "react-bootstrap";
let PrivacyPolicies = () => {
    return (
        <>
            <div className="container-fluid px-xxl-5 text-white text-center  pb-5 font">
                {privacyPolicyData.map((policy, index) => {
                    return <div className="   px-xxl-5 text-start outsideAccordion" key={index}>
                        <Accordion>
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>{policy?.question}</Accordion.Header>
                                <Accordion.Body>
                                    <div dangerouslySetInnerHTML={{ __html: policy?.answer }} />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                })}
            </div>

        </>
    );
};

export default PrivacyPolicies;
