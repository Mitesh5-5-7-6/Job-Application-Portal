import React, { useState, useMemo } from 'react';
import { InputField } from './Ui/InputField';
import { useDebounce } from './hooks/useDebounce.ts';

const ITEMS_PER_PAGE = 5;

export const AdminPanel: React.FC = () => {
  const rawData = localStorage.getItem("jobFormData");
  const data = JSON.parse(rawData) || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredData = useMemo(() => {
    const query = debouncedSearch.toLowerCase();
    return data.filter((row: any) =>
      row.name?.toLowerCase().includes(query) ||
      row.email?.toLowerCase().includes(query)
    );
  }, [data, debouncedSearch]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  return (
    <>
      <div className='flex justify-end items-center gap-4 px-4 my-4'>
        <InputField
          type='text'
          name='filter'
          label='Filter Name and Email'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <table className='w-full bg-indigo-300'>
        <thead>
          <tr className='text-center border-b-2'>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row: any) => (
            <tr key={row.id} className='text-center'>
              <td className='py-1 border-b-1'>{row.name}</td>
              <td className='py-1 border-b-1'>{row.email}</td>
              <td className='py-1 border-b-1'>{row.phone}</td>
              <td className='py-1 border-b-1'>{row.resume}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-center mt-4 gap-2'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 cursor-pointer py-1 rounded ${currentPage === i + 1
              ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};
