import React, { useId } from 'react';

interface TextFieldType {
    label: string;
    type: string;
    name: string;
    placeholder?: string;
    accept?: string;
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<TextFieldType> = ({
    label, type, name, placeholder, accept, onChange
}) => {
    const inputId = useId();

    return (
        <div className='mb-4'>
            <label htmlFor={inputId + name} className='block mb-1 font-semibold'>{label}</label>
            <input
                type={type}
                id={inputId + name}
                name={name}
                placeholder={placeholder}
                accept={accept}
                onChange={onChange}
                className='bg-cyan-50 text-black w-full py-2 px-4 rounded-lg'
            />
        </div>
    );
};
