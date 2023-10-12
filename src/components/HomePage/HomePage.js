import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '../Navigation/NavigationBar';
import './HomePage.css'; // Import the CSS file

function HomePage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch property data from your backend API
    axios.get('http://localhost:8081/displayproperties')
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <NavigationBar />
      <br />
      <br />
      <center>
        <h1>Welcome to RentalApplication!!!</h1>
      </center>
      <div className="property-list">
        {properties.map((property) => (
          <div key={property.property_id} className="property-card">
            <img src={`http://localhost:8081/${property.image_path}`} alt="Property" />
            <h3>Property ID: {property.property_id}</h3>
            <p>Property Type: {property.property_type}</p>
            <p>Rent: {property.rent}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Max Members: {property.max_members}</p>
            <p>Description: {property.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
