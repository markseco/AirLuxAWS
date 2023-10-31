import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function IndexPage() {

    const [planes, setPlanes] = useState([]);

    useEffect(() => {
        axios.get('/planes').then(response => {
            console.log(response.data);
            setPlanes([...response.data]);
        });
    }, []);

    

    return (
        <div>
             <section class="bg-gradient-to-t from-blue-600 to-white py-16">
                <div class="container mx-auto text-center text-black">
                    <h1 class="text-4xl font-bold mb-4">Welcome to AirLux</h1>
                    <p class="text-xl mb-8">Where Dreams Take Flight</p>
                    <Link to={'/planes-filtering/'} class="bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:border py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out">Find your Jet</Link>
                </div>
            </section>
            <div className='py-4 px-4 gap-x-4 gap-y-6 grid grid-cols-2  lg:grid-cols-4'>
                {planes.length > 0 && planes.slice(0,4).map(plane => {
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



