import { Eye, EyeOff } from "lucide-react";
import React from "react";

interface FormPasswordInputProps {
    name: string, 
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    placeholder?: string,
    showPassword: boolean,
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
}

const FormPasswordInput = ({ name, value , onChange, required, placeholder, showPassword, setShowPassword }: FormPasswordInputProps) => (
    <div className="relative">
        <input
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pr-10"
        />
        <button
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
        >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
    </div>
)

export default FormPasswordInput;