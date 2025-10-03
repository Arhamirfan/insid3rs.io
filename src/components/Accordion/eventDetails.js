import { useEffect, useState } from "react";
import Faqs from "./faq";
import { Accordion } from "react-bootstrap";
let AccordionFaq = ({ experience, needToKnow, faqs }) => {
  const [resolution, setResolution] = useState("");

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    setResolution(window.innerWidth);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [])

  function handleWindowSizeChange() {
    setResolution(window.innerWidth);
  }

  return (
    <>
      <div className="container-fluid px-2 px-md-5 outsideAccordion" >
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>About the Experience</Accordion.Header>
            <Accordion.Body>
              <p className="p_wrap">   {experience ? experience : ""}</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>What you need to know</Accordion.Header>
            <Accordion.Body>
              <p className="p_wrap">
                {needToKnow ? needToKnow : ""}
              </p>
            </Accordion.Body>
          </Accordion.Item>
          {faqs?.length > 0 ?
            <Accordion.Item eventKey="2">
              <Accordion.Header>{resolution > 700 ? "Frequently asked Questions" : "FAQs"}</Accordion.Header>
              <Accordion.Body>
                {faqs?.map((faq, index) => (
                  <div className="px-sm-3 pt-4" key={index}>
                    <Faqs question={faq.question} answer={faq.answer} />
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
            : <></>}
        </Accordion>
      </div>

    </>
  );
};

export default AccordionFaq;
