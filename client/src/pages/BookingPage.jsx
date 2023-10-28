import { useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import PlaneGallery from "../components/PlaneGallery";
import DatesFormatting from "../components/DatesFormatting";


export default function BookingPage() {

    const {id} = useParams();

    const [booking, setBooking] = useState('')

    useEffect (() => {
        if(!id) return;
        axios.get(`/bookings/${id}`).then((response) => {
            setBooking(response.data);
            console.log(booking);
        });
    }, [id])

    return (
        <div className="flex items-center justify-center">
            {booking.plane && (
                <div className="mt-8 bg-gray-100 -mx-8 px-12 pt-8 max-w-screen-lg rounded-xl">
                    <h1 className="text-2xl">{booking.plane.name}</h1>
                    <a className="my-2 block font-semibold underline" target="_blank" href={`http://maps.google.com/?q=${encodeURIComponent(booking.plane.airport)}`}>{booking.plane.airport}</a>
                    <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
                        <p className="text-sm text-gray-700 leading-4">
                            <DatesFormatting booking={booking} />
                            <b>Price:</b> ${booking.price}
                           
                        </p>
                    </div>
                    <PlaneGallery plane={booking.plane} />
                    <div className="flex items-center justify-center p-8">
                        <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded  text-center">
                            Cancel Booking
                        </button>
                    </div>

                </div>
            )}
            
        </div>
    )
}