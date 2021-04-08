import React, { useEffect,useState } from "react";
import ProfileComponent from "../Profile/ProfileComponent";
import ProfileTabComponent from "../Profile/ProfileTabComponent";
import TakeTheAssessmentComponent from "../General/TakeTheAssessmentComponent";
import axios from 'axios';
import { API_URL } from '../../Utils/Urls';

const ProfileContainer = () => {

  const [informationData, setInformationData] = useState(null)
  useEffect(()=>{
    if(informationData == null){
      getInformationDetails()
    }
    
  })



  const getInformationDetails = async () =>{
    const userToken = localStorage.getItem('userToken');
    const {USER_INFORMATION} = API_URL;
    try {
      const userInfoResp = await axios.get(USER_INFORMATION, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      // setUsersReservation(usersRegData.data);
      //getEventByDateId(usersRegData.data);
      // setLoading();
      if(userInfoResp && userInfoResp.data && userInfoResp.data.data && userInfoResp.data.data[0]){
        setInformationData(userInfoResp.data.data[0])
      }
    } catch (e) {
      console.log("api error information >>",e);
    } 
}
  return (
    <div>
      <div className="container pt-100 pb-50">
      {informationData && <ProfileComponent data={informationData}/>}
    </div>
    <div className="profile-tabs-wrapper">
      <ProfileTabComponent/>
    </div>
    <div className="assessment-section">
      <TakeTheAssessmentComponent/>
    </div>
    </div>
  );
};
export default ProfileContainer;
