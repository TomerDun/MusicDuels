import './App.css'
import './utils.css'
import { Routing } from './components/layout/Routing'
import Navbar from './components/layout/Navbar/Navbar';
import { observer } from 'mobx-react-lite';
import { userStore } from './stores/UserStore';
import { useEffect } from 'react';
import { onLogout } from './utils/authUtils';
import { useNavigate } from 'react-router';

function App() {

    const navigate = useNavigate();

    async function loadUserData() {
        if (localStorage.getItem('token')) {
            try {
                await userStore.loadActiveUser();
                userStore.loadActiveUserStats();
            }
            catch {
                onLogout(); //delete invalid token data
                navigate('/login')                                
            }            
        } else
            userStore.logoutUser();
    }

    useEffect(() => {
        if (!userStore.activeUser)
            loadUserData()
    }, [])

    return (
        <>
            <Navbar />
            <Routing />
        </>
    )
}

export default observer(App);
