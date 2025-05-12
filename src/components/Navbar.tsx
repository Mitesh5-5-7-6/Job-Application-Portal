import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Navbar: React.FC = () => {

    const navigate = useNavigate()

    return (
        <div className='flex justify-between px-4 py-2 bg-blue-500'>
            <img src="/vite.svg" alt="" />
            <button type='button' className='bg-emerald-200 px-4 py-2 rounded-lg' onClick={() => navigate('/login')}>Login</button>
        </div>
    )
}
