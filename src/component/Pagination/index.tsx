// components/Pagination.tsx

"use client"; // Tambahkan baris ini

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = [...Array(totalPages).keys()].map(i => i + 1);

  return (
    <div className="flex justify-center items-center space-x-1 mt-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-2xl text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-2 rounded-2xl font-bold ${
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'text-blue-600 hover:bg-blue-100'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-2xl text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;