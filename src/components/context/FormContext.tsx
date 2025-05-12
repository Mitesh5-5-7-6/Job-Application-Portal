import React, { createContext, useContext, useState } from 'react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    resume: File | null;
}

interface FormContextType {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
    const context = useContext(FormContext);
    return context;
};

export const FormProvider: React.FC<{ children: any }> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
        resume: null,
    });

    return (
        <FormContext.Provider value={{ formData, setFormData }
        }>
            {children}
        </FormContext.Provider>
    );
};
