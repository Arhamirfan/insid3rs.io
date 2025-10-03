
import Event1 from "../../../public/assets/images/eventProduction1.png";
import Event2 from "../../../public/assets/images/eventProduction2.png";
import Event3 from "../../../public/assets/images/eventProduction3.png";
let EventTypes = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row pt-5 justify-content-center   pb-5 ">
                    <div className="col-auto   text-center pt-5 grow">
                        <img className="w-55 circularRadius coverImg" src={Event1.src} />
                        <div className="xlBoldText boldText pt-3">{"BTC 2022"}</div>
                    </div>
                    <div className="col-auto text-center pt-3  grow">
                        <img className="w-100 coverImg" src={Event2.src} />
                        <div className="xxxlBoldText boldText pt-3">{"EXPOVERSE"}</div>
                    </div>
                    <div className="col-auto   text-center pt-5 grow">
                        <img className="w-55 circularRadius coverImg" src={Event3.src} />
                        <div className="xlBoldText boldText pt-3">{"TNABC"}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventTypes;