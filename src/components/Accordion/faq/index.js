let Faqs = ({ question, answer }) => {
  return (
    <>
      <div className="row px-sm-5">
        <div className="col">
          <div className="  mLargeBoldText boldText ">{question}</div>
          <div className="px-1 pt-1">
            <p className="mb-3 p_wrap">{answer}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;
