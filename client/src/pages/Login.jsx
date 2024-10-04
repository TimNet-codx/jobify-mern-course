import React from 'react';
import { Link, Form, useNavigate, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn} from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login Successful');
  return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};


const Login = () => {
 //const navigation = useNavigation();
 // const isSubmitting = navigation.state === 'submitting'

 const navigate = useNavigate();

 const loginDemoUser = async () => {
    console.log('test...')
  const data = {
     email:'test@test.com',
     password:'secret123',
    };
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Take a test drive');
    navigate('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);  
  }
 };

  return (
   <Wrapper>
    <Form method='post' className='form'>
     <Logo/>
     <h4>login</h4>
     <FormRow type='email' name='email'/>
     <FormRow type='password' name='password'/>
     {/*<button type='submit' className='btn btn-block' disabled={isSubmitting}>{isSubmitting ? 'submitting....' : 'login'}</button> */}
      <SubmitBtn />
      <button type='button' className='btn btn-block' onClick={loginDemoUser}>explore the app </button>
      <p>Do Not Have an Account Yet? <Link to='/register' className='member-btn'>Register</Link></p>
    </Form>
   </Wrapper> 
  );
};
export default Login;
