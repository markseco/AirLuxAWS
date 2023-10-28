import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import BookingWidget from "../components/BookingWidjet";
import PlaneGallery from "../components/PlaneGallery";



export default function IndividualPlanePage() {

    const {id} = useParams();
    const [plane, setPlane] = useState('')
    

    useEffect (() => {
        if(!id) return;
        axios.get(`/planes/${id}`).then((response) => {
            setPlane(response.data);
        });
    }, [id])

    if(!plane) return 'Loading...';

    
    return (
        <div className="flex justify-center items-center">
            <div className="mt-8 bg-gray-100 -mx-8 px-12 pt-8 max-w-screen-lg rounded-xl">
            <h1 className="text-2xl">{plane.name}</h1>
            <a className="my-2 block font-semibold underline" target="_blank" href={`http://maps.google.com/?q=${encodeURIComponent(plane.airport)}`}>{plane.airport}</a>
            <PlaneGallery plane={plane} />
            
            <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="text-xl">Description</h2>
                        <p className="mt-2">{plane.description}</p>
                    </div>
                    Range: {plane.range} km <br />
                    Speed: {plane.speed} km/h <br />
                    Capacity: {plane.capacity} people
                </div>
                <div>
                    <BookingWidget plane={plane} />
                </div>
                
            </div>
            <div className="bg-white mt-4 -mx-8 px-8 py-8 mb-4">
                    <div className="text-sm text-gray-700 leading-4 mb-4 mt-1">
                        <h2 className="mb-2">Extra Information</h2>
                            {plane.extraInfo}
                    </div>
            </div>
            </div>
        </div>
        
    )
}