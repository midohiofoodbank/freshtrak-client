import React from 'react';
import { render, fireEvent,wait,act} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import FoodBankContainer from './../FoodBankContainer';
import { noop, mockFoodBankRegisterBuilder, mockFoodBankContactBuilder} from '../../../Testing';


test('should render', () => {
	expect(() => {
		render(<Router>
				<FoodBankContainer/>
			</Router>);
	}).not.toThrowError();
});

test ("Should show the validation erros on button click" ,async () => {
	const {container,getByText,getByTestId } = render(<Router><FoodBankContainer register={noop}/></Router>);
    const zipcode = container.querySelector('input[name="zipcode"]');
	const contact_email = container.querySelector('input[name="contact_email"]');
	const submitButton = container.querySelector('input[name="savefoodbank"]');
	let mockContact  = mockFoodBankContactBuilder();

    await act(async () => {
    	fireEvent.click(getByText(/Continue/i));
  	});
  	expect(getByTestId('registr-data')).toHaveTextContent('This field is required');
	
	fireEvent.change(zipcode, {target: {value: mockContact.firstName}});	
	
	await act(async () => {
    	fireEvent.click(getByText(/Continue/i));    	
  	});
  	expect(getByTestId('zip-code')).toHaveTextContent('The Zipcode is not valid');
	

    fireEvent.change(contact_email, {target: {value: mockContact.firstName}});
    fireEvent.click(getByText(/Continue/i));
    await act(async () => {
    	fireEvent.click(getByText(/Continue/i));    	
  	});  
  	expect(getByTestId('contact-email')).toHaveTextContent('The email address is not valid');  
    
});

test("Data saving successful in button click and proceed with ok",async()=>{
	let mockContact  = mockFoodBankContactBuilder();
	let mockRegister = mockFoodBankRegisterBuilder();
	const {container, getByText } = render(<Router><FoodBankContainer /></Router>);
	
	const org_name = container.querySelector('input[name="org_name"]');
	const address = container.querySelector('input[name="address"]');
	const zip_code = container.querySelector('input[name="zipcode"]');
	const suiteblg = container.querySelector('input[name="suiteblg"]');	
	const first_name = container.querySelector('input[name="first_name"]');
	const last_name = container.querySelector('input[name="last_name"]');
	const suffix = container.querySelector('select[name="suffix"]');
	const phone_number = container.querySelector('input[name="phone_number"]');
	const contact_email = container.querySelector('input[name="contact_email"]');
	const comm_preference = container.querySelector('select[name="comm_preference"]');

    fireEvent.change(org_name, {target: {value: mockRegister.orgName}});
    fireEvent.change(address, {target: {value: mockRegister.streetAddress}});
    fireEvent.change(suiteblg, {target: {value: mockRegister.suiteBlg}});    
	fireEvent.change(zip_code, {target: {value: mockRegister.zipCode}});
	fireEvent.change(first_name, {target: {value: mockContact.firstName}});
    fireEvent.change(last_name, {target: {value: mockContact.lastName}});
    fireEvent.change(suffix, {target: {value: mockContact.suffx}});
	fireEvent.change(phone_number, {target: {value: mockContact.phoneNumber}});
	fireEvent.change(contact_email, {target: {value: mockContact.contactEmail}});	
	fireEvent.change(comm_preference, {target: {value: mockContact.commPreference}});

	await act(async () => {
    	fireEvent.click(getByText(/Continue/i));    	
  	});
  	expect(getByText(/Are you sure you want to proceed/i));

  	await act(async () => {
    	fireEvent.click(getByText(/Ok/i));
  	});
  	expect(getByText(/Thank you for registering your organization!/i));

 },10000);
 
test("Data saving successful in button click and proceed with cancel",async()=>{
	let mockContact  = mockFoodBankContactBuilder();
	let mockRegister = mockFoodBankRegisterBuilder();
	const {container, getByText } = render(<Router><FoodBankContainer /></Router>);
	
	const org_name = container.querySelector('input[name="org_name"]');
	const address = container.querySelector('input[name="address"]');
	const zip_code = container.querySelector('input[name="zipcode"]');
	const suiteblg = container.querySelector('input[name="suiteblg"]');	
	const first_name = container.querySelector('input[name="first_name"]');
	const last_name = container.querySelector('input[name="last_name"]');
	const suffix = container.querySelector('select[name="suffix"]');
	const phone_number = container.querySelector('input[name="phone_number"]');
	const contact_email = container.querySelector('input[name="contact_email"]');
	const comm_preference = container.querySelector('select[name="comm_preference"]');

    fireEvent.change(org_name, {target: {value: mockRegister.orgName}});
    fireEvent.change(address, {target: {value: mockRegister.streetAddress}});
    fireEvent.change(suiteblg, {target: {value: mockRegister.suiteBlg}});    
	fireEvent.change(zip_code, {target: {value: mockRegister.zipCode}});
	fireEvent.change(first_name, {target: {value: mockContact.firstName}});
    fireEvent.change(last_name, {target: {value: mockContact.lastName}});
    fireEvent.change(suffix, {target: {value: mockContact.suffx}});
	fireEvent.change(phone_number, {target: {value: mockContact.phoneNumber}});
	fireEvent.change(contact_email, {target: {value: mockContact.contactEmail}});	
	fireEvent.change(comm_preference, {target: {value: mockContact.commPreference}});

	await act(async () => {
    	fireEvent.click(getByText(/Continue/i));    	
  	});
  	expect(getByText(/Are you sure you want to proceed/i));

  	await act(async () => {
    	fireEvent.click(getByText(/Cancel/i));
  	});
  	expect(getByText(/Organization Name/i));

 },10000);