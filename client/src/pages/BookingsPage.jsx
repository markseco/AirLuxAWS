import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DatesFormatting from "../components/DatesFormatting";
import { useContext } from "react";
import { UserContext } from "../UserContext";




export default function BookingsPage() {

    const [bookings, setBookings] = useState([]);
    const { user } = useContext(UserContext);


    useEffect(() => {
        axios.get('/bookings',{user}).then((response) => {
            setBookings(response.data);
        })
    }, [])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    return (
        <div className="mt-4">
            <AccountNav />
            <div className="flex flex-col justify-center items-center">
               
                {bookings.length > 0 && bookings.map((booking) => (
                    <Link to={`/account/bookings/${booking._id}`} className="flex cursor-pointer mt-4 bg-gray-100 gap-4 p-4 w-11/12 max-w-screen-lg rounded-xl " key={booking._id}>
                        <div className="w-32 h-32 bg-gray-300 shrink-0">
                            {booking.plane.images.length > 0 && (
                                <img className="w-full h-full object-cover" src={`http://52.17.153.59:4000/uploads/${booking.plane.images[0]}`} alt="" />
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{booking.plane.name}</h2>
                            <p className="text-sm mt-2">{booking.plane.description}</p>
                            
                            <p><b>Price:</b> ${booking.price}</p>
                            <DatesFormatting booking={booking} />
                        </div>
                    </Link>
                ))}
               
                    
            </div>
        </div>
    )
}
