import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false);

    useEffect(() => {
        // Use an async function and specify an empty dependency array to run this effect only on mount
        const fetchUserProfile = async () => {
          try {
            const userInformation = await axios.get('/profile', { withCredentials: true });
            setUser(userInformation.data);
            setReady(true); // Set ready to true after successfully setting user
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        };
    
        if (!user) {
          fetchUserProfile();
        }
      }, []);
    return (
        <UserContext.Provider value={{user,setUser,ready}}>
            {children} 
        </UserContext.Provider>
        
    )
}