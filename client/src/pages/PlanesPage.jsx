import { Link, Navigate, useParams } from "react-router-dom";
import Account from "./AccountPage";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";




export default function PlanesPage(){

    const [planes, setPlanes] = useState([]);

    useEffect(() => {
        axios.get('/user-planes').then((response) => {
            setPlanes(response.data);
        })
    }, [])

    return (
        <div className="mt-4">
            <AccountNav />
            <div className="flex flex-col justify-center items-center">
                <Link className="inline-flex gap-1 mt-4 max-w-2xl bg-primary text-white py-2 px-6 rounded-full" to={'/account/planes/add'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add a plane
                </Link>
                <div className="mt-4 w-11/12 max-w-screen-lg rounded-xl">
                    {planes.length > 0 && planes.map((plane) => (
                        <Link to={`/account/planes/${plane._id}`} className="flex cursor-pointer mt-4 bg-gray-100 gap-4 p-4 rounded-2xl" key={plane._id}>
                            <div className="w-32 h-32 bg-gray-300 shrink-0">
                                {plane.images.length > 0 && (
                                    <img className="w-full h-full object-cover" src={`http://localhost:4000/uploads/${plane.images[0]}`} alt="" />
                                )}
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{plane.name}</h2>
                                <p className="text-sm mt-2">{plane.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}