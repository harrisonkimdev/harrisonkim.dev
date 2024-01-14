'use client'

import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const PaginationNavigator = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)

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

          <span onClick={() => handlePagination(currentPage+0)}
            className='cursor-pointer'
          >{ currentPage+0 }</span>

          { currentPage+1 < lastPage ? (
            <span onClick={() => handlePagination(currentPage+1)}
              className='cursor-pointer'
            >{ currentPage+1 }</span>
          ) : (
            <>
              {/*  */}
            </>
          )}
          { currentPage+2 < lastPage ? (
            <span onClick={() => handlePagination(currentPage+2)}
              className='cursor-pointer'
            >{ currentPage+2 }</span>
          ) : (
            <>
              {/*  */}
            </>
          )}

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