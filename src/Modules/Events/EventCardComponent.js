/**
 * Event Card Component
 */
import React , {useState} from 'react';
import { formatDateDayAndDate } from '../../Utils/DateFormat';
import '../../Assets/scss/main.scss';

const EventCardComponent = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const {
    event: {
      startTime,
      endTime,
      date,
      eventAddress,
      eventCity,
      eventState,
      eventZip,
      phoneNumber,
      agencyName,
      eventName,
      eventService,
      eventDetails,
    },
  } = props;

  return (
    <div className="col-lg-4 col-xl-4">
      <div className="day-view-item">
        <div className="day-view-item-header">
          <div className="day-view-header-title">{agencyName}</div>
          <div className="day-view-header-title">{eventName}</div>
          <div className="day-view-item-location d-flex justify-content-between">
            <div className="day-view-item-name">{eventService}</div>
          </div>
        </div>
        <div className="day-view-item-details">
          {/* <div className="registration-required">
              <span className="registration-required-label">Registration Required</span>
            </div> */}
          <div className="timings d-flex justify-content-between">
            <div className="date-wrapper">{formatDateDayAndDate(date)}</div>
            <div className="timing-wrapper">
              {startTime} - {endTime}
            </div>
          </div>
          <div className="address-wrap">
            {eventAddress}
            <br />
            {eventCity} {eventState} {eventZip}<br />
            {phoneNumber}
            <br /><br />
          </div>
          {showDetails && <div className="">
            <p>
              <b> Information </b>
              <br />
              {eventDetails}
            </p>
          </div>}
          <div className="day-view-item-detail-footer d-flex mt-3">
           {eventDetails.length > 0 && <button className="btn default-button flex-grow-1"
           onClick={()=>{
            setShowDetails(!showDetails)}}>
              {!showDetails? 'View Details': 'Hide details'}
            </button>}
            <button className="btn custom-button ml-1 flex-grow-1">
              Reserve Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardComponent;
