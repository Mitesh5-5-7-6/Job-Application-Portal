import React, { useState } from 'react'
import { InputField } from './Ui/InputField';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e: any) => {
        e.preventDefault()
        if (email === '' || password === '') {
            alert('Enter value')
        } else {
            if (email === 'admin@gmail.com' && password === 'Admin@123') {
                navigate('/adminPanel')
            } else {
                alert('worng credential')
            }
        }

    }

    return (
        <div className='h-[100vh] py-40 bg-indigo-500'>
            <h2 className='text-center text-2xl font-bold'>Login</h2>
            <div className='mx-auto w-1/3'>
                <form onSubmit={handleLogin} className='px-10'>
                    <InputField label='Email' type='email' name='email' onChange={(e) => setEmail(e.target.value)} />
                    <InputField label='Password' type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit' className='bg-emerald-200 px-4 cursor-pointer py-2 rounded-lg'>Login</button>
                </form>
            </div>
        </div>
    )
}
