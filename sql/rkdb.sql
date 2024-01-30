-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Jan 30, 2024 at 11:38 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rkdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `dino`
--

CREATE TABLE `dino` (
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dino`
--

INSERT INTO `dino` (`name`, `password`) VALUES
('END', '12345'),
('vishnu', 'Pool'),
('vishnu', 'Pool'),
('Ram', 'rk'),
('Ram', 'rk'),
('lavadey', '1234'),
('dom', 'd@123'),
('dom', 'd@123'),
('Rk', 'ram'),
('END', 'end'),
('Ngp', '12345'),
('Vk', 'vk'),
('Ram', 'kumar'),
('Kok', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `name` varchar(1000) NOT NULL,
  `score` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `score`
--

INSERT INTO `score` (`name`, `score`) VALUES
('null', 'null'),
('null', 'null'),
('null', 'null'),
('', 'null'),
('null', 'null'),
('null', 'null'),
('null', 'null'),
('null', 'null'),
('null', 'null'),
('null', 'null'),
('null', 'null'),
('null', 'null'),
('null', 'null'),
('null', 'null'),
('Ram', 'Your Score: 100'),
('Ram', 'Your Score: 100'),
('Ram', '100'),
('Ram', '100'),
('null', 'null'),
('Ram', 'Your Score: 100'),
('Ram', 'Your Score: 100'),
('Ram', '[object HTMLDivElement]'),
('null', 'null'),
('Ram', 'Your Score: 100'),
('null', 'null'),
('Ram', '[object HTMLDivElement]'),
('null', 'null'),
('Ram', '[object HTMLDivElement]'),
('null', 'null'),
('Ram', '[object HTMLDivElement]'),
('null', 'null'),
('Ram', '[object HTMLDivElement]'),
('null', 'null'),
('Ram', '[object HTMLDivElement]'),
('null', 'null'),
('Ram', '[object HTMLDivElement]'),
('Ram', '[object HTMLDivElement]'),
('null', 'null'),
('Ram', ''),
('null', 'null'),
('Ram', 'Your Score: 100'),
('Ram', ''),
('Ram', '[object HTMLDivElement]'),
('null', 'null'),
('null', 'null'),
('Ram', 'Your Score: 0'),
('null', 'null'),
('Ram', '0'),
('Ram', '0'),
('null', 'null'),
('null', 'null'),
('Ram', '0'),
('Ram', '0'),
('null', 'null'),
('null', 'null'),
('Ram', '[object HTMLDivElement]'),
('Ram', ''),
('Ram', ''),
('Ram', ''),
('Ram', ''),
('Ram', ''),
('Ram', ''),
('Ram', ''),
('Ram', ''),
('Ram', 'Your Score: 100'),
('null', 'null'),
('Ram', 'Your Score: 100'),
('null', 'null'),
('null', 'null'),
('Ram', 'Your Score: 100'),
('Ram', 'Your Score: 100'),
('null', 'null'),
('', ''),
('', ''),
('', ''),
('', ''),
('', ''),
('', ''),
('Ram', 'Your Score: 100'),
('Ram', 'Your Score: '),
('Ram', 'Your Score: [object HTMLDivElement]'),
('Ram', ''),
('Ram', 'Your Score: [object HTMLDivElement]'),
('Ram', 'Your Score: [object HTMLDivElement]'),
('Ram', 'Your Score: [object HTMLDivElement]'),
('Ram', 'Your Score: [object HTMLDivElement]'),
('Ram', 'Your Score: [object HTMLDivElement]'),
('Ram', 'Your Score: [object HTMLDivElement]'),
('Ram', 'Your Score: [object HTMLDivElement]'),
('Ram', 'Your Score: [object HTMLDivElement]'),
('Ram', 'Your Score: Your Score: 0'),
('Ram', 'Your Score: Your Score: 0'),
('Ram', 'Your Score: Your Score: 0'),
('Ram', 'Your Score: Your Score: 0'),
('Ram', 'Your Score: Your Score: 0'),
('Ram', 'Your Score: '),
('Ram', ' ');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
