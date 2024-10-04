import React, { createContext, useContext, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSiderbar, Navbar, SmallSiderbar } from '../components';
import { checkDefaultTheme } from '../App';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async () => {
try {
  const {data} = await customFetch.get('/users/current-user')
  return data;
} catch (error) {
  return redirect('/');
  
}
};
// Setting a Global Context
const DashboaedContext = createContext();



const DashboardLayout = ({}) => {
  // loader useLoaderData
  const {user} = useLoaderData();
  const navigate = useNavigate();
  //console.log(data);
  // // temp
  // const user = {name:'john'};
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () =>{
    //console.log('toggle dark theme');
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);

  };

  const toggleSidebar = () =>{
     setShowSidebar(!showSidebar)
  };
  const logoutUser = async   () => {
    // console.log('logout user');
    navigate('/')
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');

  };
  return (
    <DashboaedContext.Provider value={{user, showSidebar,isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser}} >
       <Wrapper>  
      <main className='dashboard'>
         <SmallSiderbar/>
         <BigSiderbar/>
         <div>
          <Navbar/>
          <div className='dashboard-page'>
    <         Outlet context={{user}}/> 
          </div>
         </div>
      </main>
    </Wrapper>
    </DashboaedContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboaedContext);
export default DashboardLayout;