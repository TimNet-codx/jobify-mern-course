import React from 'react';
import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import {Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({request}) => {
  const formData = await request.formData();
  const file = formData.get('avatar');
  // check if  the file exist before and the size for the file you want upload 
  if(file && file.size > 500000){
   toast.error('Image size too large');
   return null;
  }
  // if the file is ok than do the below
   try {
    await customFetch.patch('/users/update-user', formData);
    toast.success('Profile Updated Successfully');
   } catch (error) {
    toast.error(error?.response?.data?.msg);
   }
   return null;
}

const Profile =() =>{
  const {user} = useOutletContext();
  const {name, lastName, email, location} = user;
  //const navigation = useNavigation();
  //const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>
        <div className='form-center'>
          {/*file input*/}
          <div className='form-row'>
            <label htmlFor='avatar' className='form-label'>
              Select an image file (max 0.5 MB)
            </label>
            <input type='file' id='avatar' name='avatar' className='form-input' accept='image/*' encType='multipart/form-data'/>
          </div>
          <FormRow type='text' name='name' defaultValue={name}/>
          <FormRow type='text' name='lastName' labelText='last name' defaultValue={lastName}/>
          <FormRow type='text' name='email' defaultValue={email}/>
          <FormRow type='text' name='location' defaultValue={location}/>
          {/*  <button className='btn btn-block form-btn' type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'submitting...' : 'submit'}
          </button> */}
          <SubmitBtn formBtn/>
        </div>
        </Form>
    </Wrapper>
  )
}

export default Profile;