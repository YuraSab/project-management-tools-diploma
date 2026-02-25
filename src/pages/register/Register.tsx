import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../../services/loginApi";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../../layouts/authFormLayout/AuthFormLayout";
import FormTextInput from "../../ui/input/FormTextInput";
import FormPasswordInput from "../../ui/input/FormPasswordInput";
import FormButtonSubmit from "../../ui/button/FormButtonSubmit";

const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            alert("Registration is successful!");
            navigate("/login");
        },
        onError: (error: any) => {
            throw new Error(`Error during registration. Status: ${error.message}`);
        }
    });

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        repeatedPassword: "",
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if ( !formData.name || !formData.username || !formData.password || !formData.repeatedPassword ) {
            alert("Password fields are different!");
            return;
        }
        if ( formData.password !== formData.repeatedPassword ) {
            alert("Passwords do not match!");
            return;
        }
        mutation.mutate({ 
            name: formData.name, 
            username: formData.username, 
            password: formData.password, 
            role: "member", 
            reservedMembers: [] 
        });
    }

    
    return (
        <AuthFormLayout handleSubmit={handleSubmit}>
            <h1 style={{fontSize: 28, fontWeight: "bold", textAlign: "center"}}>Register</h1>
            <FormTextInput name={"name"} value={formData.name} onChange={handleChange} placeholder="name" />
            <FormTextInput name={"username"} value={formData.username} onChange={handleChange} placeholder="username" />
            <FormPasswordInput  name={"password"} value={formData.password} onChange={handleChange} required showPassword={showPassword} setShowPassword={setShowPassword} placeholder={"password"} />
            <FormPasswordInput  name={"repeatedPassword"} value={formData.repeatedPassword} onChange={handleChange} required showPassword={showPassword} setShowPassword={setShowPassword} placeholder={"password"} />
            <FormButtonSubmit text={"Register"}/>
            <p className="text-center text-gray-500 text-sm" onClick={() => navigate("/login")}>or, you already have account</p>
        </AuthFormLayout>
    )
}

export default Register;