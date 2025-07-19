import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';

interface Event {
  _id: string;
  title: string;
  date: string;
  location: { type: string; coordinates: [number, number] };
}

function Map() {
  const [events, setEvents] = useState<Event[]>([]);
  const [position, setPosition] = useState<L.LatLngTuple>([51.505, -0.09]); // Default position

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    }, (err) => {
      console.error(err);
      setPosition([51.505, -0.09]); // Fallback if geolocation fails
    });

    axios.get('/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {events.map(event => (
        <Marker key={event._id} position={event.location.coordinates.reverse() as L.LatLngTuple}>
          <Popup>{event.title} - {new Date(event.date).toLocaleString()}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map; 