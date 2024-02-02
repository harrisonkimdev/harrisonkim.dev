'use client'

import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const PaginationNavigator = ({
  currentPage,
  lastPage,
  setCurrentPage
} : {
  currentPage: number,
  lastPage: number,
  setCurrentPage: Function
}) => {
  const handlePagination = (pageNum: number) => {
    setCurrentPage(pageNum)
  }

  return (
    <>
      {/* pagination */}
      <div className='flex justify-center'>
        <div className='flex items-center gap-6'>
          <FaChevronLeft
            onClick={() => currentPage > 1
              ? handlePagination(currentPage-1)
              : handlePagination(1)
            }
            className='text-lg cursor-pointer'
          />

          {/* { 1 < currentPage && (
            <span onClick={() => handlePagination(currentPage-1)}
              className='cursor-pointer'
            >{ currentPage-1 }</span>
          )} */}

          <span onClick={() => handlePagination(currentPage+0)}
            className='cursor-pointer'
          >{ currentPage+0 }</span>

          {/* { currentPage+1 <= lastPage && (
            <span onClick={() => handlePagination(currentPage+1)}
              className='cursor-pointer'
            >{ currentPage+1 }</span>
          )} */}

          <FaChevronRight
            onClick={() => currentPage < lastPage
              ? handlePagination(currentPage+1)
              : handlePagination(lastPage)
            }
            className='text-lg cursor-pointer'
          />
        </div>
      </div>
    </>
  )
}

export default PaginationNavigator