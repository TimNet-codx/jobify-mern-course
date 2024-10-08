import React from 'react';
import { Form, redirect, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({request}) => {
  const formData = await request.formData();
  //console.log(formData);
  const data = Object.fromEntries(formData);
  //console.log(data);

  try {
    await customFetch.post('/auth/register', data);
    //return null;
    toast.success('Registration Successful');
    return redirect('/login');
  } catch (error) {
    // getting the error type here and display the error
    toast.error(error?.response?.data?.msg);    
    return error;
  }
};

const Register = () => {
  //const navigation = useNavigation()
  //console.log(navigation);
  //const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name'/>
        <FormRow type='text' name='lastName' labelText='last name'/>
        <FormRow type='text' name='location'/>
        <FormRow type='email' name='email'/>
        <FormRow type='password' name='password'/>
        {/*<button type='submit' className='btn btn-block' disabled={isSubmitting}>{isSubmitting ? 'submitting....' : 'submit'}</button>*/}
        <SubmitBtn />
        <p>Already a member? <Link to='/login' className='member-btn'>Login</Link></p>
      </Form>
    </Wrapper>
  );
};
export default Register;