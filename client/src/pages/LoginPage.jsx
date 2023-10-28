import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";



export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function loginUser(e) {
        e.preventDefault();
        try {
            const userInformation = await axios.post('/login', {
                email,
                password
            })
            setUser(userInformation.data)
            alert('User logged in');
            setRedirect(true);
        } catch (err) {
            alert('Login failed')
        }

    }

    if(redirect){
        return < Navigate to="/" />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-70">
                <h1 className="text-4xl text-center mb-4">Login Page</h1>
                <form action="/" className="max-w-md mx-auto" onSubmit={loginUser}>
                    <input type="email"
                     placeholder="email@email.com"
                     value={email}
                     onChange={e => setEmail(e.target.value)} />
                    <input type="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}/>
                    <button className="login" type="submit">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Dont't have an account? <Link className="underline text-black" to={'/register'}>Register here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}