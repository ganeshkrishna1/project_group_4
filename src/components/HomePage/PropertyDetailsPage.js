import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavigationBar from '../Navigation/NavigationBar';
import './PropertyDetailsPage.css';

function PropertyDetailsPage() {
  const { propertyId } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const userId = localStorage.getItem('userId'); // Get user_id from localStorage

  const [passportNumber, setPassportNumber] = useState('');
  const [usSinceDate, setUsSinceDate] = useState('');
  const [paymentInfo, setPaymentInfo] = useState(null);

  const [creditCardData, setCreditCardData] = useState({
    cardNo: '',
    validity: '',
    expiry: '',
    cvv: '',
    cardHolderName: '',
  });

  const [upiData, setUpiData] = useState({
    phoneNumber: '',
  });

  const [netBankingData, setNetBankingData] = useState({
    bankName: '',
    accountNo: '',
  });

    // Handle changes in credit card details
    const handleCreditCardChange = (e) => {
      const { name, value } = e.target;
      setCreditCardData({
        ...creditCardData,
        [name]: value,
      });
    };
  
    // Handle changes in UPI details
    const handleUpiChange = (e) => {
      const { name, value } = e.target;
      setUpiData({
        ...upiData,
        [name]: value,
      });
    };
  
    // Handle changes in net banking details
    const handleNetBankingChange = (e) => {
      const { name, value } = e.target;
      setNetBankingData({
        ...netBankingData,
        [name]: value,
      });
    };

    
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

  const handleVerificationSubmit = () => {
    // Perform client-side validation for passport number and US since date
    if (!passportNumber || !usSinceDate) {
      alert('Passport number and US since date are required.');
      return;
    }
    // Send the verification data to the server
    axios
      .post(`http://localhost:8081/verify`, {
        user_id: userId,
        propertyId,
        passportNumber,
        usSinceDate,
      })
      .then((response) => {
        // Update paymentInfo with data after successful verification
        setPaymentInfo({
          rent: propertyDetails.rent,
          paymentMethod: '', // Initially empty
          paymentStatus: 'Not Paid',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePaymentMethodChange = (event) => {
    // Handle radio button selection for payment methods
    setPaymentInfo({
      ...paymentInfo,
      paymentMethod: event.target.value,
    });
  };

  // Function to submit payment details
  const handlePaymentSubmit = (paymentMethod) => {
    let paymentData;
    switch (paymentMethod) {
      case 'Credit/Debit Card':
        paymentData = creditCardData;
        break;
      case 'UPI':
        paymentData = upiData;
        break;
      case 'Net Banking':
        paymentData = netBankingData;
        break;
      default:
        paymentData = {};
    }

    // Send payment data to the server
    axios
      .post(`http://localhost:8081/pay`, {
        user_id: userId,
        propertyId,
        paymentMethod,
        paymentData,
      })
      .then((response) => {
        setPaymentInfo({
          ...paymentInfo,
          paymentStatus: 'Paid',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!propertyDetails) {
    return <div className="propertydetailspage-loading-message">Loading...</div>;
  }

  return (
    <div>
      <NavigationBar />
      <div className="propertydetailspage-container">
        <h2 className="propertydetailspage-title">Confirm & Pay</h2>
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
        {paymentInfo ? (
          <div className="propertydetailspage-payment-info">
            <h3>Payment Information:</h3>
            <p>
              <strong>Total Amount:</strong> {paymentInfo.rent}
            </p>
            <p>
              <strong>Payment Method:</strong> {paymentInfo.paymentMethod}
            </p>
            <p>
              <strong>Payment Status:</strong> {paymentInfo.paymentStatus}
            </p>
          </div>
        ) : (
          <div className="propertydetailspage-verification">
            <h3>Verification</h3>
            <p>
              <strong>Passport Number:</strong>
              <input
                type="text"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
              />
            </p>
            <p>
              <strong>Living in the US since:</strong>
              <input
                type="date"
                value={usSinceDate}
                onChange={(e) => setUsSinceDate(e.target.value)}
              />
            </p>
            <button onClick={handleVerificationSubmit} className="Connect">
              Submit Verification
            </button>
          </div>
        )}
 {paymentInfo && paymentInfo.paymentStatus === 'Not Paid' ? (
          <div className="propertydetailspage-payment">
            <h3>Payment</h3>
            <p>Select Payment Method:</p>
            <div className="payment-method">
              <label>
                <input
                  type="radio"
                  value="Credit/Debit Card"
                  checked={paymentInfo.paymentMethod === 'Credit/Debit Card'}
                  onChange={handlePaymentMethodChange}
                />
                Credit/Debit Card
              </label>
              <label>
                <input
                  type="radio"
                  value="UPI"
                  checked={paymentInfo.paymentMethod === 'UPI'}
                  onChange={handlePaymentMethodChange}
                />
                UPI
              </label>
              <label>
                <input
                  type="radio"
                  value="Net Banking"
                  checked={paymentInfo.paymentMethod === 'Net Banking'}
                  onChange={handlePaymentMethodChange}
                />
                Net Banking
              </label>
            </div>
            {paymentInfo.paymentMethod === 'Credit/Debit Card' && (
              <div className="credit-card-details">
                <h4>Enter Credit Card Details:</h4>
                <input
                  type="text"
                  name="cardNo"
                  placeholder="Card Number"
                  value={creditCardData.cardNo}
                  onChange={handleCreditCardChange}
                />
                <input
                  type="text"
                  name="validity"
                  placeholder="validity"
                  value={creditCardData.validity}
                  onChange={handleCreditCardChange}
                />
                <input
                  type="text"
                  name="expiry"
                  placeholder="expiry"
                  value={creditCardData.expiry}
                  onChange={handleCreditCardChange}
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV Number"
                  value={creditCardData.cvv}
                  onChange={handleCreditCardChange}
                />
                <input
                  type="text"
                  name="cardHolderName"
                  placeholder="Card Holder Name"
                  value={creditCardData.cardHolderName}
                  onChange={handleCreditCardChange}
                />                
                <button onClick={() => handlePaymentSubmit('Credit/Debit Card')}>Pay</button>
              </div>
            )}
            {paymentInfo.paymentMethod === 'UPI' && (
              <div className="upi-details">
                <h4>Enter UPI Details:</h4>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={upiData.phoneNumber}
                  onChange={handleUpiChange}
                />
                <button onClick={() => handlePaymentSubmit('UPI')}>Pay</button>
              </div>
            )}
            {paymentInfo.paymentMethod === 'Net Banking' && (
              <div className="net-banking-details">
                <h4>Enter Net Banking Details:</h4>
                <input
                  type="text"
                  name="bankName"
                  placeholder="Bank Name"
                  value={netBankingData.bankName}
                  onChange={handleNetBankingChange}
                />
                <input
                  type="text"
                  name="accountNo"
                  placeholder="Account Number"
                  value={netBankingData.accountNo}
                  onChange={handleNetBankingChange}
                />
                <button onClick={() => handlePaymentSubmit('Net Banking')}>Pay</button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PropertyDetailsPage;
