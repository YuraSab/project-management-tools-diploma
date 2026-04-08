import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {AuthProvider} from './layouts/authProvider/AuthProvider.tsx'
import {BrowserRouter} from 'react-router-dom'
import '../src/styles/variables.css';
import ProfileProvider from "./layouts/profileProvider/ProfileProvider.tsx";

const query = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={query}>
            <BrowserRouter>
                <AuthProvider>
                    <ProfileProvider>
                        <App/>
                    </ProfileProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
