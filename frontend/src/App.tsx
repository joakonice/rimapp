import { Routes, Route } from 'react-router-dom';
import Map from './components/Map';
import EventForm from './components/EventForm';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div>
          <h1>Hello World from Grok! If you see this, changes are working.</h1>
          <Map />
        </div>
      } />
      <Route path="/create" element={<EventForm />} />
    </Routes>
  );
}

export default App;
