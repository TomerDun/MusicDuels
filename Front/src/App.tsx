import './App.css'
import { Routing } from './components/layout/Routing'

function App() {
   
    return (
        <div className='bg-red-600/50'>
            <div>
                <div id='header-row' className='`p-4 border-2 border-blue-400 head-box  hover:bg-amber-50 hover:shadow-2xl`'>Div1</div>                
                
            </div>

            <Routing />

        </div >
    )
}

export default App;
