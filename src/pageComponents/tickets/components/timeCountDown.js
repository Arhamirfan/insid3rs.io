import React, { useEffect, useState } from "react";
import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";
import DateDiff from 'date-diff';
import moment from "moment";


let TimeCountDown = (props) => {
  let [time, setCountDown] = useState("");
  useEffect(() => {
    timer(props.time)
  }, [])
  let timer = (time) => {
    let localTime = moment.utc(time);
    // let format_date = formatTime.trim().split(",").map(data => parseInt(data));
    let dif_time = new DateDiff(new Date(localTime), new Date()).seconds()
    let dif_sec = Math.abs(dif_time);
    if (dif_time > 0) {
      setCountDown(parseInt(dif_sec));
    } else {
      props.updateBidButton(false)
    }
  }
  return (
    <div className="timeCountDown">
      {time > 0 && (
        <CountdownTimer count={time} showTitle
          onEnd={() => { props.updateBidButton(false); setCountDown("") }}
        // dayTitle="Días" hourTitle="Horas" secondTitle="Segundos" minuteTitle="Minutos"
        />
      )}
    </div>
  )
};

export default TimeCountDown;
