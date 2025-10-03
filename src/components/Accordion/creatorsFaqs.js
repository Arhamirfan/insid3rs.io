import { StaticFaqs } from "../../constants/staticData";
import { Accordion } from "react-bootstrap";
let CreatorsFaqs = () => {
  return (
    <>
      {StaticFaqs?.map((faq, index) => {
        return (
          <>
            <div className="container-fluid px-2 px-md-5 text-start outsideAccordion" key={index}>
              <Accordion>
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>{faq?.question}</Accordion.Header>
                  <Accordion.Body>
                    <div dangerouslySetInnerHTML={{ __html: faq?.answer }} />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </>
        );
      })}
    </>
  );
};

export default CreatorsFaqs;
