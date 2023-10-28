import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    async function registerUser(e) {
        e.preventDefault();
        try{
            await axios.post('/register', {
                name,
                email,
                password
            })
            alert('User registered');
        } catch(err) {
            alert('Registration failed')
        }
        
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-70">
                <h1 className="text-4xl text-center mb-4">Register Page</h1>
                <form action="/" className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text"
                        placeholder="Name" 
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input type="email"
                        placeholder="lalala@gmail.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                    <button className="login" type="submit">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" to={'/login'}>Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}