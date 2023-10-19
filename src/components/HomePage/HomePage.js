import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '../Navigation/NavigationBar';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './HomePage.css';

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
    <div className="homepage">
      <NavigationBar />
      <br />
      <br />
      <center>
        <h1>Welcome to Accomodation Connect!</h1>
      </center>
      <div className="homepage-property-list">
        {properties.map((property) => (
          <div key={property.property_id} className="homepage-property-card">
            <img src={`http://localhost:8081/${property.image_path}`} alt="Property" className="homepage-property-image" />
            <h3 className="homepage-property-title">Property ID: {property.property_id}</h3>
            <p className="homepage-property-info">Property Type: {property.property_type}</p>
            <p className="homepage-property-info">Rent: {property.rent}</p>
            <p className="homepage-property-info">Bedrooms: {property.bedrooms}</p>
            <p className="homepage-property-info">Max Members: {property.max_members}</p>
            <p className="homepage-property-info">Contact Number: {property.contact_no}</p>
            <p className="homepage-property-description">Description: {property.description}</p>
            <Link to={`/property/${property.property_id}`}>Book</Link> {/* Link to the property details page */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
