import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom";
import FormPasswordInput from "../../ui/input/FormPasswordInput";
import FormTextInput from "../../ui/input/FormTextInput";
import FormButtonSubmit from "../../ui/button/FormButtonSubmit";
import AuthFormLayout from "../../layouts/authFormLayout/AuthFormLayout";
import { login } from "../../services/authService.ts";
import {handleAuthError} from "../../utils/handleAuthError.ts";
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = async () => {
        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (error) {
            const message = handleAuthError(error);
            alert(message);
        }
    };

    // if (isLoading)
    //     return <div>Loading</div>; // todo - real loader

    return (
        <AuthFormLayout onSubmit={handleSubmit}>
            <h1 className={styles.caption}>Login</h1>
            <FormTextInput name={"email"} value={formData.email} onChange={handleChange} required placeholder={"email"}/>
            <FormPasswordInput name={"password"} value={formData.password} onChange={handleChange} required showPassword={showPassword} setShowPassword={setShowPassword} placeholder={"password"}/>
            <FormButtonSubmit text={"Login"}/>
            <p className={styles.link} onClick={() => navigate("/register")}>or, sign up</p>
        </AuthFormLayout>
    );
};

export default Login;