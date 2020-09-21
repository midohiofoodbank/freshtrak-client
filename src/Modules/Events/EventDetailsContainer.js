import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TagManager from 'react-gtm-module'
import { selectEvent } from '../../Store/Events/eventSlice';
import SpinnerComponent from '../General/SpinnerComponent';
import { API_URL, BASE_URL, RENDER_URL } from '../../Utils/Urls';
import axios from 'axios';
import RegistrationTextInfoComponent from '../Family/RegistrationTextInfoComponent';
import LoginModalComponent from '../Sign-In/LoginModal';
import { EventFormat } from '../../Utils/EventHandler';

const EventDetailsContainer = (props) => {
  const history = useHistory();

  const { id: eventDateId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [setUserToken] = useState(undefined);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSuccessful, setSuccessful] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pageError, setPageError] = useState(false);

  const event = useSelector(selectEvent);
  const [selectedEvent, setSelectedEvent] = useState(event);

  useEffect(() => {
      if(Object.keys(selectedEvent).length === 0 && !isError && !pageError) {
        getEvent();
      }
  });

  const getEvent = async () => {
    try {
      const resp = await axios.get(
        `${BASE_URL}api/event_dates/${eventDateId}/event_details`
      ).catch(error=>{
        setIsError(true);
      })
      const { data } = resp;
      if (data && data.event !== undefined) {
        setSelectedEvent(EventFormat(data.event, eventDateId));
        setLoading(false);
        setSuccessful(true);
      } else {
        setPageError(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUserToken = async () => {
    setLoading(true);
    const { GUEST_AUTH } = API_URL;
    try {
      const resp = await axios.post(GUEST_AUTH);
      const {
        data: { token, expires_at },
      } = resp;
      localStorage.setItem('userToken', token);
      localStorage.setItem('tokenExpiresAt', expires_at);
      history.push(`${RENDER_URL.EVENT_REGISTRATION_URL}/${selectedEvent.id}`);
    } catch (e) {
      console.error(e);
      setShowLoginModal(false);
      setLoading(false);
    }
  };

  const getUserToken = () => {
    TagManager.dataLayer({
      dataLayer: {
      event: "guest-login"
      }
    })
    const localUserToken = localStorage.getItem('userToken');
    const tokenExpiresAt = localStorage.getItem('tokenExpiresAt');

    if (new Date(tokenExpiresAt) < new Date() || !localUserToken || localUserToken === 'undefined') {
      showLoginModal ? fetchUserToken() : setShowLoginModal(true);
    } else {
      setUserToken(localUserToken);
      setShowLoginModal(false);
      history.push(`${RENDER_URL.EVENT_REGISTRATION_URL}/${selectedEvent.id}`);
    }
  };

  return (
    <Fragment>
      {isLoading && <SpinnerComponent />}
      <LoginModalComponent
            show={showLoginModal}
            onLogin={getUserToken} />
      {!isLoading && isSuccessful && (
        <div className="mt-4">
          <section className="container pt-100 pb-100 register-confirmation">
            <RegistrationTextInfoComponent event={selectedEvent} onRegisterNow={getUserToken} />
          </section>
        </div>
      ) }
    </Fragment>
  );
};

export default EventDetailsContainer;
