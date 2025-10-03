import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
//BOOTSTRAP
import Navbar from "../../src/components/header/navbar";
import Footer from "../../src/components/footer/footer";
import Spinner from "../../src/components/spinner/Index";
//data
import EventDetailCard from "../../src/components/Cards/eventDetailCard";
import TicketDetailCard from "../../src/components/Cards/ticketDetailCard";
import search from "../../src/api/search";
import RoutePaths from "../../src/routes/path";
let EventDetail = () => {
    let router = useRouter();
    let [searchData, setSearchData] = useState([]);
    let [apiLoading, setApiLoading] = useState(true);
    let query = router.query.query;

    useEffect(() => {
        if (query) {
            getSearchData(query);
        }
    }, [query]);

    let getSearchData = async (data) => {
        try {
            search.globalSearch(data)
                .then((result) => {
                    if (result && result.status == 200) {
                        console.log("searchData:", result.data.data);
                        setSearchData(result.data.data);
                    } else {
                        console.log(result);
                    }
                    setApiLoading(false);
                })
                .catch((error) => {
                    setApiLoading(false);
                });
        } catch (error) {
            setApiLoading(false);
        }
    };
    // let ticketDetails = (index) => {
    //     router.push(RoutePaths.tickets + "/" + index);
    // };

    return (
        <>
            <div className="backgroundColor font text-white ">
                <Navbar />
                {!apiLoading ? <>
                    {searchData.events.length > 0 || searchData.tickets.length > 0 ? <>
                        <div className="container-fluid text-white p-5 mt-5">
                            {/* TODO: call event cards  */}
                            {searchData.events.length > 0 ? <>
                                <div className="row align-items-center text-center text-sm-start">
                                    <div className="col-12  ">
                                        <h1 className="boldText">Events</h1>
                                    </div>
                                </div>
                                <div className="mt-5 row ">
                                    {searchData?.events?.map(
                                        (event, index) => {
                                            return (
                                                <div
                                                    className="col-xs-12 col-md-6 col-lg-4 col-xl-3 mb-4"
                                                    key={index}
                                                >
                                                    <EventDetailCard data={event} index={index} />
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </> : <></>}

                            {searchData.tickets.length > 0 ? <>
                                {/* TODO: call ticket cards  */}
                                <div className="row align-items-center text-center text-sm-start">
                                    <div className=" col-12  ">
                                        <h1 className="boldText">Tickets</h1>
                                    </div>
                                    <div className="mt-5 row ">
                                        {searchData.tickets
                                            .map((ticket, index) => (
                                                <div
                                                    className="col-xs-12 col-md-6 col-lg-4 col-xl-3 mb-4"
                                                    key={index}
                                                // onClick={() => ticketDetails(ticket._id)}
                                                >
                                                    <TicketDetailCard data={ticket} />
                                                </div>
                                            ))}
                                    </div>

                                </div>
                            </> : <></>}

                        </div>

                    </> : <>
                        <div className="d-flex pt-5 m-3 justify-content-center">
                            <h3 className="pt-5">No record found.</h3>
                        </div>
                    </>}
                </> : <>
                    <Spinner />
                </>
                }


                <Footer />
            </div>
        </>
    );
};

export default EventDetail;
