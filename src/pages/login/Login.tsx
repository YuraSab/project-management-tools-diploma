import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useState } from "react"
import { login } from "../../services/loginApi";
import { useAuth } from "../../layouts/authProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { User } from "../../types/user";
import FormPasswordInput from "../../ui/input/FormPasswordInput";
import FormTextInput from "../../ui/input/FormTextInput";
import FormButtonSubmit from "../../ui/button/FormButtonSubmit";
import AuthFormLayout from "../../layouts/authFormLayout/AuthFormLayout";

const Login = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const setUser = useUserStore((state) => state.setLoggedInUser);

    const { login: authLogin } = useAuth();
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            const user: Omit<User, "password"> = {
                id: data.user.id,
                name: data.user.name,
                username: data.user.username,
                role: data.user.role,
                reservedMembers: data.user.reservedMembers,
            };
            authLogin(data.token);
            setUser(user);
            localStorage.setItem("token", data.token);
            queryClient.invalidateQueries({ queryKey: ["users"] });
            alert("Login success");
            navigate("/");
        },
        onError: (error: any) => {
            alert(`Login failed: ${error.message}`);
        }
    })

    const [formData, setFormData] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({ username: formData.username, password: formData.password });
    }

    return (
        <AuthFormLayout handleSubmit={handleSubmit}>
            <h1 style={{fontSize: 28, fontWeight: "bold", textAlign: "center"}}>Login</h1>
            <FormTextInput name={"username"} value={formData.username} onChange={handleChange} required placeholder={"login"}/>
            <FormPasswordInput name={"password"} value={formData.password} onChange={handleChange} required showPassword={showPassword} setShowPassword={setShowPassword} placeholder={"password"}/>
            <FormButtonSubmit text={"Login"}/>
            <p className="text-center text-gray-500 text-sm" onClick={() => navigate("/register")}>or, sign up</p>
        </AuthFormLayout>
    )
}

export default Login;