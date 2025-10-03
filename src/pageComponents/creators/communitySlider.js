import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AgencyOne from "/public/assets/images/community/1.png";
import AgencyOne1 from "/public/assets/images/community/2.png";
import AgencyOne2 from "/public/assets/images/community/3.png";
export default class AsNavFor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    render() {
        return (
            <div className="row mt-5">
                <div className="col-lg-6">
                    <div className="communitySlider1">
                        <Slider
                            asNavFor={this.state.nav1}
                            ref={slider => (this.slider2 = slider)}
                            slidesToShow={3}
                            swipeToSlide={true}
                            focusOnSelect={true}
                            dots={false}
                            className="text-white"
                            centerMode={true}
                        >
                            <div className="px-3 pt-1"><img src={AgencyOne.src} width="85%" className="rounded" /></div>
                            <div className="px-3 pt-1"><img src={AgencyOne2.src} width="85%" className="rounded" /></div>
                            <div className="px-3 pt-1"><img src={AgencyOne1.src} width="85%" className="rounded" /></div>
                        </Slider>
                    </div>
                </div>
                <div className="col-lg-6 pt-5">
                    <div className="communitySlider2">
                        <Slider
                            asNavFor={this.state.nav2}
                            ref={slider => (this.slider1 = slider)}
                            className="text-white text-start"
                        >
                            <div>
                                <p>Continued fan engagement for the life of the ticket ensures optimal conversion rates, brand-building opportunities for your event and your sponsors, and post-event ongoing relationship management with event guests.</p>
                            </div>
                            <div>
                                <p>Driving top-of-funnel market awareness while building a strong core community based on your defined goals.</p>
                            </div>
                            <div>
                                <p>Social media growth hacking, content-based networking, podcast production, Discord server development, and more... from web3-native events industry experts.</p>
                            </div>

                        </Slider>
                    </div>

                </div>
            </div >
        );
    }
}