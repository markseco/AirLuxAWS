import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlanesPage from "./PlanesPage";
import AccountNav from "../components/AccountNav";

export default function Account() {

    const[redirect, setRedirect] = useState(null);
    const {user, ready, setUser} = useContext(UserContext);
    

    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
    }

    if(ready && !user.name){
        return <Navigate to={'/login'} />
    }
    
    if(!ready){
        return 'Loading...'
    }

    



    if(redirect){
        setUser(null)
        return <Navigate to={redirect} />
        
    }
    
    return (
        <div>
            <AccountNav />
            
            <div className="text-center max-w-lg mx-auto p-8">
                Logged in as {user.name} ({user.email})<br />
                <button onClick={logout} className="bg-black w-full text-white px-4 py-2 rounded-2xl max-w-sm mt-2 border hover:bg-red-500 hover:text-white">Logout</button>
            </div>
           
            
        </div>

    )
}