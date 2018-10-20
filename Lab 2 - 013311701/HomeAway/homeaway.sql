-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2018 at 10:49 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homeaway`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookingdetails`
--

CREATE TABLE `bookingdetails` (
  `BookingId` int(11) NOT NULL,
  `PropertyId` int(11) DEFAULT NULL,
  `TravelerId` int(11) DEFAULT NULL,
  `Travelername` varchar(255) DEFAULT NULL,
  `Bookingstartdate` varchar(255) DEFAULT NULL,
  `Bookingenddate` varchar(255) DEFAULT NULL,
  `Guests` int(11) NOT NULL,
  `Totalcost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookingdetails`
--

INSERT INTO `bookingdetails` (`BookingId`, `PropertyId`, `TravelerId`, `Travelername`, `Bookingstartdate`, `Bookingenddate`, `Guests`, `Totalcost`) VALUES
(1, 11, 2, 'Arivoli AE', 'Oct 01', 'Oct 06', 2, 2100),
(2, 11, 2, 'Arivoli AE', 'Oct 15', 'Oct 17', 2, 1050),
(3, 9, 2, 'Arivoli AE', 'Oct 02', 'Oct 05', 2, 3000),
(4, 13, 2, 'Arivoli AE', 'Oct 02', 'Oct 08', 4, 3150);

-- --------------------------------------------------------

--
-- Table structure for table `propertydetails`
--

CREATE TABLE `propertydetails` (
  `PropertyId` int(11) NOT NULL,
  `Country` varchar(255) DEFAULT NULL,
  `Streetaddress` varchar(255) DEFAULT NULL,
  `Unitnumber` varchar(10) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `State` varchar(255) DEFAULT NULL,
  `Zipcode` varchar(255) DEFAULT NULL,
  `Headline` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Propertytype` varchar(255) DEFAULT NULL,
  `Bedrooms` int(11) DEFAULT NULL,
  `Accomodates` int(11) DEFAULT NULL,
  `Bathrooms` int(11) DEFAULT NULL,
  `Photos` varchar(255) DEFAULT NULL,
  `Availabilitystartdate` date NOT NULL,
  `Availabilityenddate` date NOT NULL,
  `Baserate` varchar(255) DEFAULT NULL,
  `Minstay` int(11) DEFAULT NULL,
  `OwnerId` int(11) NOT NULL,
  `Ownername` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `propertydetails`
--

INSERT INTO `propertydetails` (`PropertyId`, `Country`, `Streetaddress`, `Unitnumber`, `City`, `State`, `Zipcode`, `Headline`, `Description`, `Propertytype`, `Bedrooms`, `Accomodates`, `Bathrooms`, `Photos`, `Availabilitystartdate`, `Availabilityenddate`, `Baserate`, `Minstay`, `OwnerId`, `Ownername`) VALUES
(4, 'USA', '868 S 5th Street', '322', 'San Jose', 'CA', '95112', 'A 2B 2 BA apartment available', 'Fully Furnished. Gym, Swimming Pool and lounge', 'Apartment', 2, 5, 2, 'Property 1.jpg', '0000-00-00', '0000-00-00', '$450', 2, 0, ''),
(5, 'USA', '900, N 7th Street', '56', 'San Francisco', 'CA', '980789', 'A cottage home available', 'A comfortable cottage home available in the outskirts of the city.', 'Home', 3, 7, 2, 'Property 2.jpg', '2018-10-02', '2018-11-01', '$500', 2, 2, ''),
(6, 'USA', 'E Santa Clara Street', '345', 'San Jose', 'CA', '95113', 'A 3B 3BA house available', 'Friendly Neighborhood. Well maintained house', 'Individual House', 3, 5, 3, 'Property 3.jpg,Living Room 1.jpg,Bed room 1.jpg', '2018-10-02', '2018-11-01', '$350', 1, 2, 'Arivoli AE'),
(7, 'USA', 'E Santa Clara Street', '500', 'San Jose', 'CA', '95113', 'A 4B 3BA house available', 'Swimming Pool available', 'Individual House', 4, 7, 2, 'Property 5.jpg', '2018-10-02', '2018-11-01', '$700', 2, 2, 'Arivoli AE'),
(8, 'USA', '91209', '12091', 'San Jose', 'CA', '95112', 'ABCXYZ', 'ABCXYZABCXYZABCXYZABCXYZ', 'House', 3, 6, 3, 'Property 6.jpg', '2018-10-02', '2018-11-01', '$560', 2, 2, 'Arivoli AE'),
(9, 'USA', '980, 6th Street N', '67', 'San Francisco', 'CA', '908790', 'A vacation home available', 'A vacation home available', 'House', 3, 5, 3, 'Property 7.jpg', '2018-10-02', '2018-11-01', '$750', 2, 2, 'Arivoli AE'),
(10, 'USA', '980, 6th Street N', '67', 'San Francisco', 'CA', '908790', 'A vacation home available', 'A vacation home available', 'House', 3, 5, 3, 'Property 8.jpg', '2018-10-02', '2018-11-01', '$750', 2, 2, 'Arivoli AE'),
(11, 'USA', '900, N 7th Street', '345', 'San Jose', 'CA', '982902', 'A home away from home', 'A home away from homeA home away from home', 'Home', 2, 4, 2, 'Property 9.jpg', '2018-10-02', '2018-11-01', '$350', 2, 2, 'Arivoli AE'),
(12, 'USA', '980, E Victoria Street', '34', 'San Jose', 'CA', '95678', 'A comfortable home for your family', 'Bathtub, heater. Pet friendly. A comfortable home for your family', 'House', 3, 6, 3, 'Property 10.jpg', '2018-10-02', '2018-11-01', '$400', 2, 3, 'Akhil Krish'),
(13, 'USA', '980, S Santa Clara', '344', 'Santa Clara', 'CA', '95656', 'A 3 BHK for your vacation ', 'Bathtub, heater. Pet friendly. A comfortable home for your family.Bathtub, heater. Pet friendly. A comfortable home for your family', 'House', 3, 6, 3, 'Property 11.jpg', '2018-10-02', '2018-11-01', '$450', 1, 3, 'Akhil Krish'),
(14, 'USA', '908 E virginia Street', '23', 'San Jose', 'CA', '95112', 'A Condo for rent', 'A Condo for rent', 'Condo', 1, 2, 1, 'Property 12.jpg', '2018-10-02', '2018-11-01', '$250', 2, 2, 'Arivoli AE'),
(15, 'j', 'j', 'j', 'j', 'j', 'j', 'k', 'k', 'k', 0, 0, 0, 'Property 13.jpg', '2018-10-06', '2018-10-06', '456', 23, 2, 'Arivoli AE'),
(16, 'USA', '900 Downtown SJ', '45', 'San Jose', 'CA', '98790', 'An individual house for rent', 'An individual house for rent', 'House', 2, 4, 2, 'Property 14.jpg', '2018-10-06', '2018-11-13', '$350', 2, 6, 'Vijay Shankar'),
(17, 'USA', '908, S Down Street', '234', 'San Jose', 'CA', '95113', 'A comfortable house to spend your vacation', 'A comfortable house to spend your vacation', 'House', 4, 10, 4, 'Property 10.jpg', '2018-10-07', '2018-12-31', '$750', 2, 2, 'Arivoli AE');

-- --------------------------------------------------------

--
-- Table structure for table `userdetails`
--

CREATE TABLE `userdetails` (
  `ProfileId` int(11) NOT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Firstname` varchar(255) DEFAULT NULL,
  `Lastname` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Aboutme` varchar(255) DEFAULT NULL,
  `Country` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `Hometown` varchar(255) NOT NULL,
  `School` varchar(255) NOT NULL,
  `Company` varchar(255) NOT NULL,
  `Language` varchar(255) NOT NULL,
  `ProfileImage` varchar(255) NOT NULL,
  `Phonenumber` varchar(255) NOT NULL,
  `Accounttype` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userdetails`
--

INSERT INTO `userdetails` (`ProfileId`, `Username`, `Password`, `Firstname`, `Lastname`, `Email`, `Aboutme`, `Country`, `City`, `Gender`, `Hometown`, `School`, `Company`, `Language`, `ProfileImage`, `Phonenumber`, `Accounttype`) VALUES
(1, 'admin@gmail.com', '$2a$10$9RwGQoghDHkMrczCcjei8O93PtM7.PBhrgrGKREvJJS4WzTv3LvJO', 'Admin', 'User', 'admin@gmail.com', NULL, NULL, NULL, NULL, '', '', '', '', 'Deadpool-HD-Wallpaper-For-Android-1080x1920.jpg', '', 3),
(2, 'aehari2010@gmail.com', '$2a$10$UEGrQW0uExXxiE8TeBsVEeBYAFwN0PSKMdL3frvN1SUSY5MuJWUdS', 'Arivoli', 'AE', 'aehari2010@gmail.com', 'Traveler and Owner', 'USA', 'San Jose', 'Male', 'India', 'SJSU', 'ASP', 'English', '6-programmer-mascot.png', '669-274-8644', 3),
(3, 'akhil@gmail.com', '$2a$10$2FD.facwfT68BT250xMUweo5zgYvfgsAvpZjSSYQwKXIVZkHo7hKu', 'Akhil', 'Krish', 'akhil@gmail.com', NULL, NULL, NULL, 'Male', '', '', '', '', '', '', 1),
(5, 'sojan@gmail.com', '$2a$10$TXjyw47kAJZmnrcZxdGEu.rBKXhMGIYVOvx/pGuBMUz9IDMlbAsay', 'Sojan', 'M', 'sojan@gmail.com', NULL, NULL, NULL, NULL, '', '', '', '', 'best-live-wallpapers-for-android-HD6.jpg', '', 3),
(6, 'vijay@gmail.com', '$2a$10$tFMeRBdwvo4um4HN6leEi.n4MfNpj8ONG3SOw6eiq1nkjrQYRT1o2', 'Vijay', 'Shankar', 'vijay@gmail.com', NULL, NULL, NULL, NULL, '', '', '', '', 'abstract-hd-wallpapers-1920x1080.jpg', '', 2),
(7, 'sample@gmail.com', '$2a$10$BbjH9a.mb4yiBFeWJ0LaPu2OeJUhRG4O0b.EBFlTZ2PTX1DyKnbqu', 'Sample', 'Owner', 'sample@gmail.com', NULL, NULL, NULL, NULL, '', '', '', '', '', '', 3),
(9, 'sample1@gmail.com', '$2a$10$BbjH9a.mb4yiBFeWJ0LaPu2OeJUhRG4O0b.EBFlTZ2PTX1DyKnbqu', 'sample', 'owner', 'sample1@gmail.com', NULL, NULL, NULL, NULL, '', '', '', '', '', '', 3),
(10, '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', 3),
(11, 'ae@gmail.com', '', 'New user', 'user', 'ae@gmail.com', NULL, NULL, NULL, NULL, '', '', '', '', '', '', 3),
(12, 'j', '$2a$10$cBOXQkW9oehOHuna3M2thO9ADJvYuenAKZBrPAKHtkx59honlRMU6', 'j', 'j', 'j', NULL, NULL, NULL, NULL, '', '', '', '', '', '', 1),
(13, 'new', '$2a$10$GL27vr41g/GSzzpVK5dEXux6N48Z3CdXkuIIuJjITl8ZjR/2fGREC', 'n', 'n', 'new', NULL, NULL, NULL, NULL, '', '', '', '', '', '', 1),
(14, 'testowner@gmail.com', '$2a$10$wN414A/RBnlgIf58cUFm.O9P8Mc4/2icSJiIJ3hVA7RbhQkNfvmhC', 'Test', 'Owner', 'testowner@gmail.com', NULL, NULL, NULL, NULL, '', '', '', '', '', '', 2),
(15, 'testtraveler@gmail.com', '$2a$10$TrDQ5rQL9ZZPja/NrXEVe.oLyiMPyAOqEWi39IwPVRQrK8qOK/HZe', 'test', 'traveler', 'testtraveler@gmail.com', NULL, NULL, NULL, NULL, '', '', '', '', '', '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookingdetails`
--
ALTER TABLE `bookingdetails`
  ADD PRIMARY KEY (`BookingId`);

--
-- Indexes for table `propertydetails`
--
ALTER TABLE `propertydetails`
  ADD PRIMARY KEY (`PropertyId`);

--
-- Indexes for table `userdetails`
--
ALTER TABLE `userdetails`
  ADD PRIMARY KEY (`ProfileId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookingdetails`
--
ALTER TABLE `bookingdetails`
  MODIFY `BookingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `propertydetails`
--
ALTER TABLE `propertydetails`
  MODIFY `PropertyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `userdetails`
--
ALTER TABLE `userdetails`
  MODIFY `ProfileId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
