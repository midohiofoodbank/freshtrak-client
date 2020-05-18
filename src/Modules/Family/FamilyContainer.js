import React from "react";
import PrimaryInfoFormComponent from './PrimaryInfoFormComponent';
import HouseHoldFormComponent from './HouseHoldFormComponent';
import MemberCountFormComponent from './MemberCountFormComponent';
import PasswordRegistrationFormComponent from './PasswordRegistrationFormComponent';
import AdditionalPickUpFormComponent from './AdditionalPickUpFormComponent';
import RegistrationTextComponent from './RegistrationTextComponent';
import NavigationBtnComponent from '../General/NavigationBtnComponent'
import {confirm} from '../../Utils/Util';
import EventDescriptionFormComponent from "../Events/EventDescriptionFormComponent";
import '../../Assets/scss/main.scss';
import ButtonComponent from '../General/ButtonComponent';
import {useHistory} from 'react-router-dom';
const FamilyContainer = () => {
    let familyData = {};
    let formError = {};
    const primaryFormRef = React.useRef();
    const addressFormRef = React.useRef();
    const passwordFormRef = React.useRef();
    const memberCountFormRef = React.useRef();
    const pickupCountFormRef = React.useRef();
    let history = useHistory();
    const [passwordFlag, setPasswordFlag] = React.useState(false);

    const formErrors = (errors) => {
        formError = errors;
    };
    const handleFormValidation = async (e) => {
        e.preventDefault();
        let componentErrors = [];

        if(Object.keys(formError).length===0){
        componentErrors.push(
            await addressFormRef.current.triggerErrors(),
            await primaryFormRef.current.triggerErrors(),
            await  passwordFormRef.current.triggerErrors(),
            await memberCountFormRef.current.triggerErrors()
            );
        }
        if( componentErrors.includes(true) || Object.keys(formError).length !== 0 || passwordFlag===false ){
            return false;
        }
        handleSubmitConfirm();
    };
    const handleSubmitConfirm = () => {
        let title = "Are you sure you want to proceed?";
        confirm(title, handleSubmit);
    };
    const handleSubmit = (e) => {
        let familyDetails = {
            familyMemberData:primaryFormRef.current.getCurrentData().primaryData ? primaryFormRef.current.getCurrentData().primaryData:'',
            HouseHoldData:addressFormRef.current.getCurrentData().addressData ? addressFormRef.current.getCurrentData().addressData:'',
            passwordData:passwordFormRef.current.getCurrentData().passwordData ? passwordFormRef.current.getCurrentData().passwordData:'',
            pickupData:pickupCountFormRef.current.getCurrentData().pickupData ? pickupCountFormRef.current.getCurrentData().pickupData:'',
            memberCountData:memberCountFormRef.current.getCurrentData().memberCountData ? memberCountFormRef.current.getCurrentData().memberCountData:''
        };
        // Deleted a condition check as it seemed unnecessary and has unreachable code
        history.push('/');
    };
    const getPasswordStatus = (passwordData) => {
        setPasswordFlag(passwordData.passwordStatus)
    };
    return (
        <div>
            <div className="main-wrapper">
                <section>
                    <div className="container pt-100 pb-100 register-confirmation">
                        <div className="row">
                            <div className="col-md-12">
                                <NavigationBtnComponent />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="title-wrap">
                                    <h1 className="big-title mt-5 mb-5 mobile-mb">
                                        Register Now. Save time Later.
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 col-md-6">
                                <EventDescriptionFormComponent/>
                            </div>
                            <div className="col-lg-4 col-md-6" data-testid="family-register">
                                <RegistrationTextComponent/>
                                <form onSubmit={handleFormValidation}>

                                    <div className="content-wrapper pt-100">
                                        <div className="form-fields">
                                            <HouseHoldFormComponent   ref={addressFormRef}
                                                                      onFormErrors = {formErrors} />
                                            <MemberCountFormComponent
                                                ref={memberCountFormRef}
                                                onFormErrors = {formErrors} />
                                        </div>
                                        <div className="form-fields pt-50">
                                            <PrimaryInfoFormComponent ref={primaryFormRef}
                                                                      onFormErrors = {formErrors} />
                                            <PasswordRegistrationFormComponent ref={passwordFormRef}
                                                                               
                                                                               onFormErrors = {formErrors}  getPasswordStatus={getPasswordStatus}/>
                                            <AdditionalPickUpFormComponent
                                                ref={pickupCountFormRef}
                                                onFormErrors = {formErrors} />
                                            <div className="button-wrap mt-4">
                                                <ButtonComponent type ='submit' data-testid="savefamily" name="savefamily" dataid= 'savefamily' id="save-family" value="Continue" className = 'btn custom-button' onClickfunction={handleFormValidation} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
};
export default FamilyContainer;
