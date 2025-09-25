import './App.css'
import './utils.css'
import { Routing } from './components/layout/Routing'
import Navbar from './components/layout/Navbar/Navbar';
import { observer } from 'mobx-react-lite';
import { userStore } from './stores/UserStore';
import { useEffect } from 'react';


function App() {
    async function loadUserData() {
        if (localStorage.getItem('token')) {
            userStore.loadActiveUser();
            userStore.loadActiveUserStats();
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
