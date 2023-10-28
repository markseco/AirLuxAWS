import React, {useState} from 'react';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function BookingWidget({plane}){

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [redirect, setRedirect] = useState(false);

    let numberOfDays = 0;

    if(startDate && endDate){
        numberOfDays = differenceInCalendarDays(new Date(endDate), new Date(startDate));
    }

    function bookPlane(){
        axios.post('/planes/:id/book', {
            id: plane._id,
            startDate,
            endDate,
            price: plane.price * numberOfDays,
        }).then(res => {
            console.log(res);
            setRedirect(`/account/bookings/${res.data._id}`);
        })
    }

    if(redirect){
        return <Navigate to={redirect} />
    }
        

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${plane.price} per day
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="py-3 px-4">
                    <label>Start date:</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}/>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>End date:</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}/>
                </div>
            </div>
                    
            <button className="login mt-4" onClick={bookPlane}>
                Book for
                {numberOfDays > 0 && (
                    <span> ${numberOfDays * plane.price} </span>
                )} 
            </button>
        </div>
    );
}