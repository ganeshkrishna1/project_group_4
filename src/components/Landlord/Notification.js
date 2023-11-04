import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notification.css'
import LandlordNav from '../LandlordNav/LandlordNav';
function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const landlordId = localStorage.getItem('landlordId');
  const lastViewedTime = localStorage.getItem('lastViewedTime'); // Assuming you store the last viewed time in localStorage

  useEffect(() => {
    axios
      .get(`http://localhost:8081/notifications/${landlordId}`)
      .then((response) => {
        const receivedNotifications = response.data;
        setNotifications(receivedNotifications);

        // Calculate the number of unread notifications
        const newNotifications = receivedNotifications.filter(
          (notification) => new Date(notification.notification_time) > new Date(lastViewedTime)
        );
        setUnreadCount(newNotifications.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [landlordId, lastViewedTime]);

  const markNotificationsAsRead = () => {
    const currentTime = new Date().toISOString();
    localStorage.setItem('lastViewedTime', currentTime); // Update last viewed time in localStorage
    setUnreadCount(0); // Reset unread count
  };

  return (
    <div>
    <LandlordNav />
    <div className="notifications-page">
      <h1>Notifications ({unreadCount})</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.notification_id}>
            {notification.message}
          </li>
        ))}
      </ul>
      <button onClick={markNotificationsAsRead}>Mark as Read</button>
    </div>
    </div>

  );
}

export default NotificationsPage;
