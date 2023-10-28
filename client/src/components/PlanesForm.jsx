import React, { useEffect, useState } from 'react';
import PhotosUploader from './PhotosUploader';
import AccountNav from './AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function PlanesForm() {

    const {id} = useParams();
    console.log(id);
    const [name,setName] = useState('');
    const [capacity,setCapacity] = useState(0);
    const [speed,setSpeed] = useState(0);
    const [range,setRange] = useState(0);
    const [price,setPrice] = useState(0);
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [information,setInformation] = useState('');
    const [airportLocation,setAirportLocation] = useState('');
    const [redirectPlanesList, setRedirectPlanesList] = useState(false);

    useEffect(() => {
      if(!id) return;
      axios.get(`/planes/${id}`).then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setCapacity(response.data.capacity);
        setSpeed(response.data.speed);
        setRange(response.data.range);
        setPrice(response.data.price);
        setAddedPhotos(response.data.images);
        setDescription(response.data.description);
        setInformation(response.data.extraInfo);
      })
    }, [id])

    const formFields = [
        {
          label: 'Name',
          description: 'Name of the airplane model',
          type: 'text',
          placeholder: 'Cessna 172 Skyhawk',
          value: name,
          set: setName,
        },
        {
          label: 'Capacity',
          description: 'Number of passengers',
          type: 'number',
          placeholder: '4',
          value: capacity,
          set: setCapacity,
        },
        {
          label: 'Speed',
          description: 'Maximum speed in km/h',
          type: 'number',
          placeholder: '120',
          value: speed,
          set: setSpeed,
        },
        {
          label: 'Range',
          description: 'Maximum distance in km',
          type: 'number',
          placeholder: '1200',
          value: range,
          set: setRange,
        },
        {
          label: 'Price',
          description: 'Price per day in dollars',
          type: 'number',
          placeholder: '300',
          value: price,
          set: setPrice,
        },
        {
          label: 'Airport Location',
          description: 'Location of the airport where the plane is located',
          type: 'text',
          placeholder: '...',
          value: airportLocation,
          set: setAirportLocation,
        },
        {
            label: 'Description',
            description: 'Describe the plane',
            type: 'textarea',
            placeholder: 'A four-seat, single-engine, high-wing airplane.',
            value: description,
            set: setDescription,
          },
          {
            label: 'Additional Information',
            description: 'Other important information or fun facts',
            type: 'textarea',
            placeholder: '...',
            value: information,
            set: setInformation,
          },
      ];

    function saveNewPlane(e) {
        e.preventDefault();

        const data = {
          name,
          capacity,
          speed,
          range,
          price,
          airportLocation,
          photos: addedPhotos,
          description,
          information,
        }

        if(id){
          axios.put(`/planes/${id}`, {
            id, ...data
          }).then(res => {
            setRedirectPlanesList(true)
          })
          return;
        }else{
          axios.post('/planes', data).then(res => {
            setRedirectPlanesList(true)
          })
        }
      }

      if(redirectPlanesList){
        return < Navigate to="/account/planes" />
      }

    return (
      <div>
        <AccountNav />
        <div className='flex justify-center items-center'>
          <form className="m-3 w-11/12 max-w-screen-lg rounded-xl" onSubmit={saveNewPlane}>
              {formFields.map((field, index) => (
                  <div key={index}>
                      <h2>{field.label}</h2>
                      <p>{field.description}</p>
                      {field.type === 'textarea' ? (
                          <textarea placeholder={field.placeholder} value={field.value} onChange={e => field.set(e.target.value)}/>
                      ) : (
                          <input type={field.type} placeholder={field.placeholder} value={field.value} onChange={e => field.set(e.target.value)} />
                      )}
                  </div>
              ))}
              <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
              
              <button type="submit" className="login">Save</button>
          </form>
        </div>
        
      </div>
    )
}