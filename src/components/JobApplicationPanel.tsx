import React from 'react';
import { InputField } from './Ui/InputField';
import { useFormContext } from './context/FormContext.tsx';

interface jobApplicationPanelType {
    readonly id?: Date
    name?: string
    email?: string
    phone?: string
    message?: string
    resume?: File | null | string
}

export const JobApplicationPanel: React.FC<jobApplicationPanelType> = () => {
    const { formData, setFormData } = useFormContext();

    const handleChange = (e: any) => {

        const { name, value, files } = e.target;
        if (name === 'resume' && files) {
            setFormData(prev => ({ ...prev, resume: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmitForm = (e: any) => {
        e.preventDefault();
        if (formData.name === '' || formData.email === '' || formData.phone === '' || formData.resume === null) {
            alert("Enter * value")
        } else {
            setFormData({
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                message: formData.message.trim(),
                resume: formData.resume ? formData.resume.name : null
            })

            const dataToStore = {
                id: new Date(),
                ...formData,
                resume: formData.resume ? formData.resume.name : null,
                submittedAt: new Date().toISOString(),
            };

            const existingData = JSON.parse(localStorage.getItem('jobFormData') || '[]');
            const updatedData = [...existingData, dataToStore];
            localStorage.setItem('jobFormData', JSON.stringify(updatedData));

            setFormData(formData)
        }
    };

    return (
        <div className='bg-indigo-500 h-[90vh]'>
            <div className='w-1/3 mx-auto'>
                <form onSubmit={handleSubmitForm} className='p-10'>
                    <InputField label='Name*' type='text' name='name' placeholder='Enter Name' value={formData.name} onChange={handleChange} />
                    <InputField label='Email*' type='email' name='email' placeholder='Enter Email' value={formData.email} onChange={handleChange} />
                    <InputField label='Phone*' type='tel' name='phone' placeholder='Enter Phone Number' value={formData.phone} onChange={handleChange} />
                    <InputField label='Message (optional)' type='text' name='message' placeholder='Enter Message' value={formData.message} onChange={handleChange} />
                    <InputField label='Resume Upload*' type='file' name='resume' accept='.pdf' onChange={handleChange} />
                    <button type='submit' className='bg-emerald-200 cursor-pointer px-4 py-2 rounded-lg mt-2'>Submit Form</button>
                </form>
            </div>
        </div>
    );
};
