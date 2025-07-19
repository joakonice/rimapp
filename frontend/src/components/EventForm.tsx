import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';

function EventForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [location, setLocation] = useState<[number, number] | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('/api/events', { title, description, date, location: { type: 'Point', coordinates: location }, organizer })
      .then(() => alert('Event created!'))
      .catch(err => console.error(err));
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e: L.LeafletMouseEvent) {
        setLocation([e.latlng.lng, e.latlng.lat]);
      },
    });
    return location ? <Marker position={location.reverse() as L.LatLngTuple} /> : null;
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="p-4">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="block mb-2" />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="block mb-2" />
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} className="block mb-2" />
        <input type="text" placeholder="Organizer" value={organizer} onChange={e => setOrganizer(e.target.value)} className="block mb-2" />
        <button type="submit" className="bg-blue-500 text-white p-2">Create Event</button>
      </form>
      <MapContainer center={[51.505, -0.09] as L.LatLngTuple} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default EventForm; 