
import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../Utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
   const {searchValues} = useAllJobsContext();
   // Set the form to the below in other to take current form input after refreshing the web page at defaultValue
   const {search, jobStatus, jobType, sort} = searchValues;

   const submit = useSubmit();

   //  debounce: The is use to set delay to search form in other to delay the input request and not to do more function at a time
   const debounce = (onChange) => {
      let timeout;
      return (e) => {
      // console.log('hello')
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      console.log(form);
       timeout = setTimeout(() =>{
      onChange(form);
       }, 1000); 
      };
   };
   return (
      <Wrapper>
         <Form className='form'>
            <h5 className='form-title'>search form</h5>
            <div className='form-center'>
               <FormRow 
               type='search' 
               name='search' 
               defaultValue={search} 
               onChange={debounce((form) => {
                  //console.log('hello');
                  submit(form)
               }) }/>
               <FormRowSelect
                labelText='job status'
                name='jobStatus'
                list={['all', ...Object.values(JOB_STATUS)]}
                defaultValue={jobStatus}
                onChange={(e) => {submit(e.currentTarget.form);}}
               />
               <FormRowSelect
               labelText='job type'
               name='jobType'
               list={['all', ...Object.values(JOB_TYPE)]}
               defaultValue={jobType}
               onChange={(e) => {submit(e.currentTarget.form);}}
              />
              <FormRowSelect
              name='sort'
              defaultValue={sort}
              list={[...Object.values(JOB_SORT_BY)]}
              onChange={(e) => {submit(e.currentTarget.form);}}
             />
             <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
              Reset Search Values
             </Link>
              {/* TEMP!!!! */}
             <SubmitBtn formBtn />
              
            </div>
         </Form>
      </Wrapper>
   )
};
export default SearchContainer;