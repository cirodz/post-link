import React from 'react'
import { Route, Routes } from 'react-router'
import AdminView from '../components/AdminView'
import { LoginPage } from '../pages/login/LoginPage'
import { useSessionStore } from '../context/useStore'

const RoutesComponent: React.FC = () => {
    const isLoged = useSessionStore(state => state.user)

    return (
        <Routes>
            <Route index element={<AdminView />} />
            {
                !isLoged && <Route path='/login' index element={<LoginPage />} />
            }
        </Routes>

    )
}

export default RoutesComponent