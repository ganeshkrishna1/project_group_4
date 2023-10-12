-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2023 at 08:29 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project4`
--

-- --------------------------------------------------------

--
-- Table structure for table `landlords`
--

CREATE TABLE `landlords` (
  `landlord_id` int(11) NOT NULL,
  `firstname` varchar(120) NOT NULL,
  `lastname` varchar(120) NOT NULL,
  `username` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `contact_no` int(10) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `landlords`
--

INSERT INTO `landlords` (`landlord_id`, `firstname`, `lastname`, `username`, `email`, `contact_no`, `password`) VALUES
(1, 'sample', 'sample', 'sample', 'sampleuser@gmail.com', 2147483647, 'sampleuser'),
(2, 'yash', 'yash', 'yash', 'yash@gmail.com', 2147483647, 'yashyash');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `property_id` int(11) NOT NULL,
  `landlord_id` int(11) NOT NULL,
  `property_type` varchar(50) NOT NULL,
  `property_name` varchar(120) NOT NULL,
  `location` varchar(100) NOT NULL,
  `rent` decimal(10,2) NOT NULL,
  `bedrooms` int(11) NOT NULL,
  `max_members` int(11) NOT NULL,
  `description` text NOT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`property_id`, `landlord_id`, `property_type`, `property_name`, `location`, `rent`, `bedrooms`, `max_members`, `description`, `image_path`) VALUES
(10, 1, 'apartment', 'Osama Property', 'beside apartment', 35.00, 3, 3, 'good', 'uploads\\image-1697091598102.jpg'),
(13, 1, 'apartment', 'Yahoo properties', 'beside apartment', 50.00, 2, 3, 'good', 'uploads\\image-1697089864973.jpg'),
(14, 1, 'Room', 'Osama', 'New Jersey', 600.00, 6, 4, 'Good Atmosphere', 'uploads\\image-1697090024470.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `firstname` varchar(120) NOT NULL,
  `lastname` varchar(120) NOT NULL,
  `username` varchar(120) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_no` int(10) NOT NULL,
  `password` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `firstname`, `lastname`, `username`, `email`, `contact_no`, `password`) VALUES
(2, 'Ram', 'Raju', 'Ram_raj', 'ram@gmail.com', 2147483647, 'ramaraju'),
(3, 'asd', 'asd', 'asd', 'asd@gmail.com', 0, 'asdasdasd'),
(6, 'arjun', 'arjun', 'arjun', 'arjun@gmail.com', 2147483647, 'arjunarjun');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `landlords`
--
ALTER TABLE `landlords`
  ADD PRIMARY KEY (`landlord_id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`property_id`),
  ADD KEY `landlord_id` (`landlord_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `landlords`
--
ALTER TABLE `landlords`
  MODIFY `landlord_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `property_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`landlord_id`) REFERENCES `landlords` (`landlord_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
