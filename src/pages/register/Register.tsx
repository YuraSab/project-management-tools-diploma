import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../../layouts/authFormLayout/AuthFormLayout";
import FormTextInput from "../../ui/input/FormTextInput";
import FormPasswordInput from "../../ui/input/FormPasswordInput";
import FormButtonSubmit from "../../ui/button/FormButtonSubmit";
import { authService } from "../../services/authService";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        repeatedPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if ( !formData.name || !formData.email || !formData.password || !formData.repeatedPassword ) {
            setError("Please fill all the fields.");
            return;
        }
        if ( formData.password !== formData.repeatedPassword ) {
            setError("Passwords do not match!");
            return;
        }
        setIsLoading(true);
        try {
            await authService.register(formData.email, formData.password, formData.name);
            navigate('/');
        } catch(error) {
            setError('Faled user register!');
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading)
        return <div>Loading...</div>; // todo - real loader
    
    return (
        <AuthFormLayout handleSubmit={handleSubmit}>
            <h1 style={{fontSize: 28, fontWeight: "bold", textAlign: "center"}}>Register</h1>
            <FormTextInput name={"name"} value={formData.name} onChange={handleChange} placeholder="name" />
            <FormTextInput name={"email"} value={formData.email} onChange={handleChange} placeholder="email" />
            <FormPasswordInput  name={"password"} value={formData.password} onChange={handleChange} required showPassword={showPassword} setShowPassword={setShowPassword} placeholder={"password"} />
            <FormPasswordInput  name={"repeatedPassword"} value={formData.repeatedPassword} onChange={handleChange} required showPassword={showPassword} setShowPassword={setShowPassword} placeholder={"password"} />
            <FormButtonSubmit text={"Register"}/>
            <p className="text-center text-gray-500 text-sm" onClick={() => navigate("/login")}>or, you already have account</p>
            <h2 style={{color: 'red'}}>{error}</h2>
        </AuthFormLayout>
    );
}

export default Register;