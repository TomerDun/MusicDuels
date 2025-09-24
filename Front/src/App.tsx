import './App.css'
import './utils.css'
import { Routing } from './components/layout/Routing'
import Navbar from './components/layout/Navbar/Navbar';
import { observer } from 'mobx-react-lite';
import { userStore } from './stores/UserStore';
import { useEffect } from 'react';


function App() {

    async function loadUserData(){
        const token = localStorage.getItem('token');
        if(token){
            userStore.loadActiveUser();
            userStore.loadActiveUserStats();
        }
    }

    useEffect(() => {
        if(!userStore.activeUser){
            loadUserData()
        }
    },[]) 

    return (
        <>
            <Navbar />
            <Routing />
        </>
    )
}

export default observer(App);
