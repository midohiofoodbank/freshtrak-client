import React, {useState} from 'react';
import useForm from '../../Utils/UseForm';
import add from '../../Assets/img/add.svg';

const AdditionalPickUpFormComponent= React.forwardRef((props, ref)=> {

    const [pickupInfo, setpickupInfo] = React.useState('');
    const [pickupName, setpickupName] = React.useState('');
    const [pickupNumberPlate, setPickupNumberPlate] = React.useState('');
    const [pickupNumberPlateTwo, setPickupNumberPlateTwo] = React.useState('');
    const [pickupType, setPickupType] =  React.useState('Me');
    const [step, setStep] =  React.useState(false);
    const [element, setElement] =  React.useState('');
    let data= '';

    const buildAddressForm = (event) => {
        event.preventDefault();
        let name = event.target.name;
        setElement(name)
        switch (name) {
            case 'pickup_info':
                setpickupInfo(event.target.value);
                break;
            case 'vehicle_number_plate':
                setPickupNumberPlate(event.target.value);
                break;
            case 'pickup_name':
                setpickupName(event.target.value);
                break;
            case 'vehicle_number_plate_two':
                setPickupNumberPlateTwo(event.target.value);
                break;
            case 'pickup_type':
                setPickupType(event.target.value);
                break;
        }
    };

    const handleChange = () => {
        data = {
            pickupData: {
                pickupName: pickupName,
                pickupNumberPlate: pickupNumberPlate,
                pickupNumberPlateAdditional: pickupNumberPlateTwo,
                pickupType: pickupType,
            }
        };
        props.onSelectedChild(data);
    };

    React.useEffect(() => {
        handleChange();
    }, [element]);

    const additionalBox=(e)=> {
        e.preventDefault();
        if (step===true) {
            setStep(false);
        }else{
            setStep(true)
        }
    };

    return (
        <div className="form-fields pt-50">
        <div className="form-title">
        Additional Pickup Information (Optional)
    </div>
    <div className="form-group">
        <label>Who’s Picking up?</label>
    <select  className="form-control" onChange={buildAddressForm} name="pickup_type" id="pickup_type">
        <option value="Me">Me</option>
        <option value="Some one Else">Some one Else</option>
    </select>
    </div>
    <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" onChange={buildAddressForm} name="pickup_name" id="pickup_name"/>
        </div>
        <div className="form-group">
        <label>Vehicle License Plate Number</label>
    <input type="text" className="form-control" onChange={buildAddressForm} name="vehicle_number_plate" id="vehicle_number_plate" />
        </div>
        <div className="add-new-vehicle">
        <button className="add-button" onClick={additionalBox}><img src={add} alt="my image"  className="img-fluid" /></button>

        <span>Add a Vehicle </span>
    </div>
    {step &&(
    <div className="form-group">
        <input type="text" className="form-control" onChange={buildAddressForm} name="vehicle_number_plate_two" id="vehicle_number_plate_two" />
        </div>
    )}
<div className="form-text">
        Where possible, when you arrive we’ll look for your vehicle and bring your goods to you. See event details for more info.
    </div>
    </div>
)});

export default AdditionalPickUpFormComponent;
