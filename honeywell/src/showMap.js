import axios from "axios";
import { useEffect,useState } from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';


function ShowMap(){
    const [cityList,setCityList]=useState([])
    const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');

  const options = cityList.map((data)=>data?.name)

  const handleDropdown1Change = (event) => {
    setSelectedOption1(event.target.value);
  };
  const handleDropdown2Change = (event) => {
    setSelectedOption2(event.target.value);
  };

useEffect(()=>{
axios.get('http://localhost:8080/cities').then((response)=>{
    setCityList(response?.data)
})

},[])

return(
    <div>
    <h2> Select Cities</h2>

    
    <label htmlFor="dropdown1">Source</label>
    <select id="dropdown1" value={selectedOption1} onChange={handleDropdown1Change}>
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>

    <br />

    
    <label htmlFor="dropdown2">Destination</label>
    <select id="dropdown2" value={selectedOption2} onChange={handleDropdown2Change}>
      <option value="">Select second city</option>
      {options.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>

    <br />

    {/* Display selected values */}
     <GoogleMapContainer selectedOption1={selectedOption1} selectedOption2={selectedOption2}/>
  </div>


)

}
 
const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, 
};

  const GoogleMapContainer = ({selectedOption1,selectedOption2}) =>{
    
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyACnAcnk8uR9hl9G_ZrZc2-vIsC2M3PxgE',
        libraries,
      });
    
      if (loadError) {
        return <div>Error loading maps</div>;
      }
    
      if (!isLoaded) {
        return <div>Loading maps</div>;
      }
    
    const location1={lat:selectedOption1.lat,lng:selectedOption1.lon}
    const location2={lat:selectedOption2.lat,lng:selectedOption2.lon}
    
    
    return (
    <div>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}

    >
     <Marker position={location1} label="source" />
        <Marker position={location2} label="destination" />
    </GoogleMap>
  </div>

  );}
export default  ShowMap;