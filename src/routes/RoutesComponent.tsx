import { Route, Routes } from 'react-router'
import { LoginPage } from '../pages/login/LoginPage'
import { useSessionStore } from '../context/useStore'
import HomePage from '../pages/home/HomePage'
import NotFoundPage from '../pages/NotFoundPage'

const RoutesComponent: React.FC = () => {
    const isLoged = useSessionStore(state => state.user)

    return (
        <Routes>
            <Route index element={<HomePage />} />
            {
                !isLoged && <Route path='/login' index element={<LoginPage />} />
            }
            <Route path="*" element={<NotFoundPage />} />

        </Routes>

    )
}

export default RoutesComponent