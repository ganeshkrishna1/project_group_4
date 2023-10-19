import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavigationBar from '../Navigation/NavigationBar';
import './PropertyDetailsPage.css';

function PropertyDetailsPage() {
  const { propertyId } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/property/${propertyId}`)
      .then((response) => {
        setPropertyDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [propertyId]);

  if (!propertyDetails) {
    return <div className="propertydetailspage-loading-message">Loading...</div>;
  }

  return (
    <div className="propertydetailspage-container">
      <NavigationBar />
      <h2 className="propertydetailspage-title">Booking</h2>
      <div className="propertydetailspage-details">
        <div className="propertydetailspage-image-container">
          <img
            src={`http://localhost:8081/${propertyDetails.image_path}`}
            alt="Property"
            className="propertydetailspage-image"
          />
        </div>
        <div className="propertydetailspage-info">
          <p>
            <strong>Property Type:</strong> {propertyDetails.property_type}
          </p>
          <p>
            <strong>Property Name:</strong> {propertyDetails.property_name}
          </p>
          <p>
            <strong>Location:</strong> {propertyDetails.location}
          </p>
          <p>
            <strong>Rent:</strong> {propertyDetails.rent}
          </p>
          <p>
            <strong>Bedrooms:</strong> {propertyDetails.bedrooms}
          </p>
          <p>
            <strong>Max Members:</strong> {propertyDetails.max_members}
          </p>
          <p>
            <strong>Description:</strong> {propertyDetails.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailsPage;
