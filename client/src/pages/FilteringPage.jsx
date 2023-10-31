
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function FilteringPage() {

    const [price, setPrice] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [range, setRange] = useState(0);
    const [planes, setPlanes] = useState([]);

    function filterResults(e) {
        e.preventDefault();
        console.log(price, capacity, speed, range);
        axios.get(`/planes-filtering?price=${price}&capacity=${capacity}&speed=${speed}&range=${range}`).then((response) => {
            console.log(response.data);
            setPlanes([...response.data]);
        })
    }

    useEffect(() => {
        axios.get('/planes').then(response => {
            console.log(response.data);
            setPlanes([...response.data]);
        });
    }, []);


    
  

    return (
        <div>
            <form className='bg-blue-600 rounded-xl p-2 m-4 text-white'>
                <div className="flex justify-center items-center space-x-4">
                    <div className="relative">
                        <label htmlFor="capacity">Capacity</label>
                        <input className="text-black" type="number" id="capacity" placeholder="Min" onChange={e => setCapacity(e.target.value)} />
                    </div>
                    <div className="relative">
                        <label htmlFor="speed">Speed</label>
                        <input className="text-black" type="number" id="speed" placeholder="Min" onChange={e => setSpeed(e.target.value)} />
                    </div>
                    <div className="relative">
                        <label htmlFor="range">Range</label>
                        <input className="text-black" type="number" id="range" placeholder="Min" onChange={e => setRange(e.target.value)} />
                    </div>
                    <div className="relative">
                        <label htmlFor="price">Price</label>
                        <input className="text-black" type="number" id="price" placeholder="Max" onChange={e => setPrice(e.target.value)} />
                    </div>
                    <button className='relative bg-blue-500 hover:bg-blue-700 rounded-xl p-2 m-4 text-white h-14' onClick={filterResults}>Filter</button>
                </div>
            </form>

            {planes.length === 0 && (
                <div className="flex justify-center items-center">
                    <h1 className="text-2xl">No results found</h1>
                </div>
            )}

            <div className='py-4 px-4 gap-x-4 gap-y-6 grid grid-cols-2  lg:grid-cols-4'>
                {planes.length > 0 && planes.map(plane => {
                    return (
                        <Link to={'/plane/' + plane._id } className="m-2" key={plane._id}>
                            <div className='bg-gray-500 rounded-2xl flex'>
                                {plane.images.length > 0 && (
                                    <img className='rounded-2xl object-cover aspect-square' src={`http://52.17.153.59:4000/uploads/${plane.images[0]}`} alt="" />
                                )}   
                            </div> 
                            <h2>{plane.name}</h2>
                            <h3 className='text-sm truncate text-gray-500'>{plane.name}</h3>
                            <div className='mt-1'>
                                <span className='font-bold'>${plane.price}</span> per day
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
