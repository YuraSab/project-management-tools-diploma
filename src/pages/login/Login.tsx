import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom";
import FormPasswordInput from "../../ui/input/FormPasswordInput";
import FormTextInput from "../../ui/input/FormTextInput";
import FormButtonSubmit from "../../ui/button/FormButtonSubmit";
import AuthFormLayout from "../../layouts/authFormLayout/AuthFormLayout";
import { authService } from "../../services/authService";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await authService.login(formData.email, formData.password);
            navigate('/');
        } catch (error: any) {
            if (error.code === "auth/user-not-found")
                alert('User not found. Check your email address.');
            else if (error.code === "auth/wrong-password")
                alert('Wrong email or password.');
            else
                alert('Login error!')
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading)
        return <div>Loading</div>; // todo - real loader

    return (
        <AuthFormLayout handleSubmit={handleSubmit}>
            <h1 style={{fontSize: 28, fontWeight: "bold", textAlign: "center"}}>Login</h1>
            <FormTextInput name={"email"} value={formData.email} onChange={handleChange} required placeholder={"email"}/>
            <FormPasswordInput name={"password"} value={formData.password} onChange={handleChange} required showPassword={showPassword} setShowPassword={setShowPassword} placeholder={"password"}/>
            <FormButtonSubmit text={"Login"}/>
            <p className="text-center text-gray-500 text-sm" onClick={() => navigate("/register")}>or, sign up</p>
        </AuthFormLayout>
    )
}

export default Login;