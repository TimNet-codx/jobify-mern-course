import React from 'react';
  import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
  import Wrapper from '../assets/wrappers/PageBtnContainer';
  import { useLocation, Link, useNavigate } from 'react-router-dom';
  import { useAllJobsContext } from '../pages/AllJobs'; 


/*const PageBtnContainer = () => {
    const {data: {numOfPages, currentPage}} = useAllJobsContext();
    console.log(numOfPages, currentPage);

    // Get the page number in to an array 
    const pages = Array.from({length: numOfPages}, (_, index) =>{
        return index + 1;
    })
    //console.log(pages);
    const {search, pathname} = useLocation();
    const navigate = useNavigate();

    const handlePageChange = (pageNumber) => {
       //console.log(pageNumber); 
       const searchParams = new URLSearchParams(search);
       searchParams.set('page', pageNumber);
       navigate(`${pathname}?${searchParams.toString()}`);
    };

  return (
   <Wrapper>
    <button className='btn prev-btn'
    onClick={() => {
        let pervPage = currentPage -1;
        if(pervPage < 1) pervPage = numOfPages;
        handlePageChange(pervPage);
    }}
    >
        <HiChevronDoubleLeft/>
        perv</button>
        <div className='btn-container'> 
            {pages.map((pageNumber) => {
                return(
                    <button 
                    className={`btn page-btn ${
                        pageNumber === currentPage && 'active'
                    }`}
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                )
            })}
        </div>
        <button className='btn next-btn'
           onClick={() => {
        let nextPage = currentPage  +1;
        if(nextPage > numOfPages) nextPage = 1;
        handlePageChange(nextPage);
          }}>
            next
        <HiChevronDoubleRight/>
        </button>
   </Wrapper>
  )
}*/

const PageBtnContainer = () => {
    const {data: {numOfPages, currentPage}} = useAllJobsContext();
   // console.log(numOfPages, currentPage);

    // Get the page number in to an array 
    const pages = Array.from({length: numOfPages}, (_, index) =>{
        return index + 1;
    })
    //console.log(pages);
    const {search, pathname} = useLocation();
    const navigate = useNavigate();

    const handlePageChange = (pageNumber) => {
       //console.log(pageNumber); 
       const searchParams = new URLSearchParams(search);
       searchParams.set('page', pageNumber);
       navigate(`${pathname}?${searchParams.toString()}`);
    };

    const addPageButton = ({pageNumber, activeClass}) => {
                return(
                    <button 
                    className={`btn page-btn ${activeClass && 'active'
                    }`}
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                );
    }

    const renderPageButtons = () =>{
        const pageButtons = [];
        // First Page
        pageButtons.push(addPageButton({pageNumber:1, activeClass: currentPage === 1}));
        // dots
        if(currentPage > 3){
            pageButtons.push(<span className='page-btn dots' key="dots-1">
                ...
            </span>)
        }
        // What will display before current page
        if(currentPage !==1 && currentPage !==2){
        pageButtons.push(addPageButton({pageNumber: currentPage -1, activeClass: false}));  
        }
        // Current Page
        if(currentPage !== 1 && currentPage !== numOfPages){
        pageButtons.push(addPageButton({pageNumber: currentPage, activeClass: true}));  
        }
         // What will display after the current page
        if(currentPage !== numOfPages && currentPage !== numOfPages -1 ){
        pageButtons.push(addPageButton({pageNumber: currentPage +1, activeClass: false}));  
        }
        // dots
        if(currentPage < numOfPages -2){
            pageButtons.push(<span className='page-btn dots' key="dots+1">
                ...
            </span>)
        }

        pageButtons.push(addPageButton({pageNumber: numOfPages, activeClass: currentPage === numOfPages }));

        return pageButtons;
    }

  return (
   <Wrapper>
    <button className='btn prev-btn'
    onClick={() => {
        let pervPage = currentPage -1;
        if(pervPage < 1) pervPage = numOfPages;
        handlePageChange(pervPage);
    }}
    >
        <HiChevronDoubleLeft/>
        perv</button>
        <div className='btn-container'>{renderPageButtons()}</div>
        <button className='btn next-btn'
           onClick={() => {
        let nextPage = currentPage  +1;
        if(nextPage > numOfPages) nextPage = 1;
        handlePageChange(nextPage);
          }}>
            next
        <HiChevronDoubleRight/>
        </button>
   </Wrapper>
  )
}

export default PageBtnContainer