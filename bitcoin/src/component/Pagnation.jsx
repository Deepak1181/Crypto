import React from 'react'
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
function Pagnation({ data }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems,setCurrentItem]= useState(null)
    const [pageCount,setPageCount] =useState(0)
    const itemsPerPage =100
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.length;
      setItemOffset(newOffset);
    };
  
    return (
      <>
        
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

export default Pagnation

