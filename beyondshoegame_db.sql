-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 01, 2023 at 09:47 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beyondshoegame_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_brand`
--

DROP TABLE IF EXISTS `tbl_brand`;
CREATE TABLE IF NOT EXISTS `tbl_brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_brand`
--

INSERT INTO `tbl_brand` (`id`, `name`) VALUES
(1, 'Nike'),
(2, 'Adidas'),
(3, 'New Balance'),
(4, 'Vans'),
(5, 'Converse'),
(6, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

DROP TABLE IF EXISTS `tbl_category`;
CREATE TABLE IF NOT EXISTS `tbl_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`id`, `type`) VALUES
(1, 'Sneakers'),
(2, 'Apparels'),
(3, 'Essentials');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

DROP TABLE IF EXISTS `tbl_product`;
CREATE TABLE IF NOT EXISTS `tbl_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `main_img` varchar(255) DEFAULT NULL,
  `left_img` varchar(255) DEFAULT NULL,
  `right_img` varchar(255) DEFAULT NULL,
  `top_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `brand_id` (`brand_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_product`
--

INSERT INTO `tbl_product` (`id`, `brand_id`, `category_id`, `name`, `description`, `created_at`, `main_img`, `left_img`, `right_img`, `top_img`) VALUES
(1, 1, 1, 'J2 Black Cement', 'Introducing the Air Jordan 2 Black Cement, a bold fusion of heritage and contemporary design that draws inspiration from the iconic elements of the Air Jordan legacy. Building on the timeless allure of the Air Jordan 2 silhouette, this conceptual release takes cues from the celebrated \"Black Cement\" colorway, adding a new layer of sophistication to a beloved classic.', '2023-11-25 18:41:07', NULL, NULL, NULL, NULL),
(2, 2, 2, 'J4 Red Cement', 'Introducing the Air Jordan 4 Red Cement, a bold and electrifying iteration that pays homage to the iconic legacy of Jordan Brand. This classic silhouette, revered among sneaker enthusiasts and basketball fans alike, undergoes a vibrant transformation with the infusion of a striking red cement colorway.', '2023-11-26 22:44:04', NULL, NULL, NULL, NULL),
(5, 1, 1, 'J1 low Tokyo 96', 'Step into the vibrant energy of the metropolis with the Air Jordan 1 Low Tokyo 96, a tribute to both basketball heritage and the dynamic cityscape of Tokyo. This low-top rendition of the iconic Air Jordan 1 encapsulates the spirit of 1996, a year etched in basketball history and a time when Tokyo was a burgeoning hub of culture and style.', '2023-11-30 21:25:12', NULL, NULL, NULL, NULL),
(6, 1, 1, 'J1 Low TS Olive', 'Introducing the Air Jordan 1 Low TS Olive, a captivating fusion of style and streetwear sophistication. Crafted in collaboration with the iconic rapper Travis Scott, this low-top iteration of the legendary Air Jordan 1 pays homage to classic basketball aesthetics while infusing a contemporary edge.', '2023-11-30 21:25:46', NULL, NULL, NULL, NULL),
(7, 1, 1, 'J1 Low Emerald ', 'Dive into a world of timeless elegance and athletic flair with the Air Jordan 1 Low Emerald. This low-top rendition of the legendary Air Jordan 1 pays homage to the classic basketball silhouette while embracing a sophisticated color palette inspired by the captivating allure of emerald green.', '2023-11-30 21:26:37', NULL, NULL, NULL, NULL),
(8, 1, 1, 'J1 Low Aquatone', 'Dive into a realm of distinctive style with the Air Jordan 1 Low Aquatone, a captivating fusion of urban edge and aquatic inspiration. This low-top iteration of the iconic Air Jordan 1 takes its cues from the serene beauty of water, offering a refreshing and unique aesthetic that stands out in any setting.', '2023-11-30 21:29:05', NULL, NULL, NULL, NULL),
(9, 1, 1, 'J1 Low OG Blacktoe', 'Step into the timeless legacy of the Air Jordan 1 with the J1 Low OG Blacktoe, a modern reinterpretation of a classic silhouette that pays homage to basketball history. This low-top iteration combines heritage design with contemporary style, creating a sneaker that stands out effortlessly in any era.', '2023-11-30 21:31:17', NULL, NULL, NULL, NULL),
(10, 1, 1, 'J1 Low Panda', 'Step into the epitome of sleek and versatile style with the Air Jordan 1 Low Panda, a modern iteration that fuses iconic design with contemporary flair. This low-top sneaker takes inspiration from the classic black and white color scheme, creating a visually striking and timeless aesthetic.', '2023-11-30 21:31:17', NULL, NULL, NULL, NULL),
(11, 1, 1, 'J1 Low Vintage Grey', 'Step into the timeless allure of the Air Jordan 1 Low Vintage Grey, a contemporary rendition that effortlessly marries classic design with modern sophistication. This low-top sneaker pays homage to the heritage of the Air Jordan 1 while introducing a subdued and versatile color palette.', '2023-11-30 21:32:32', NULL, NULL, NULL, NULL),
(12, 2, 1, 'Yeezy 700 Claybrown', 'As of my last knowledge update in January 2022, I don\'t have specific information on a \"Yeezy 700 Clay Brown.\" Kanye West\'s Yeezy releases often include various colorways and models, and new releases may have occurred since then.', '2023-11-30 21:35:02', NULL, NULL, NULL, NULL),
(13, 2, 1, 'Yeezy Slides Marine', 'Dive into a realm of comfort and contemporary style with the Yeezy Slides Marine, an embodiment of casual luxury from the mind of Kanye West. Crafted with meticulous attention to detail, these slides redefine the boundaries of streetwear, offering a blend of minimalist design and unparalleled comfort.', '2023-11-30 21:35:02', NULL, NULL, NULL, NULL),
(14, 2, 1, 'Foam Runner Carbon', 'Step into the future of footwear with the Yeezy Foam Runner Carbon, an avant-garde creation that seamlessly blends innovative design with comfort and style. Crafted under the visionary direction of Kanye West, the Foam Runner Carbon represents a paradigm shift in contemporary fashion.', '2023-11-30 21:38:18', NULL, NULL, NULL, NULL),
(15, 3, 1, 'New Balance 550', 'Introducing the New Balance 550, a classic and timeless silhouette that effortlessly merges heritage design with contemporary style. Born from the world of basketball, this iconic sneaker has transcended its athletic roots to become a fashion statement celebrated for its clean lines and vintage charm.', '2023-11-30 21:38:18', NULL, NULL, NULL, NULL),
(16, 5, 1, 'Chuck 70', 'Chuck 70 is a timeless and iconic sneaker that epitomizes the spirit of a classic. Born from the heritage of the legendary Converse Chuck Taylor All Star, the Chuck 70 is a refined and elevated version that pays homage to its roots while embracing modern craftsmanship.', '2023-12-01 13:30:00', NULL, NULL, NULL, NULL),
(17, 4, 1, 'Old Skool Shoe', 'The Vans Old Skool shoe is an enduring icon in the realm of streetwear and skate culture, embodying a timeless style that has transcended generations. With its distinctive design and rich heritage, the Old Skool is a true classic that seamlessly blends comfort, functionality, and a touch of rebellious spirit.', '2023-12-01 13:31:57', NULL, NULL, NULL, NULL),
(18, 1, 2, 'Nike Everyday Plus (White)', 'Nike Everyday Plus socks redefine comfort and functionality, offering a perfect blend of performance and everyday wear. These socks are designed to seamlessly integrate into your daily routine, providing unparalleled support and style for any activity.', '2023-12-01 13:34:40', NULL, NULL, NULL, NULL),
(19, 4, 3, 'Milford Beanie', 'The Vans Milford Beanie is a stylish and versatile accessory that seamlessly combines warmth with a touch of urban flair. Crafted with meticulous attention to detail and bearing the iconic Vans logo, this beanie is a must-have for those seeking comfort and style during colder seasons.', '2023-12-01 13:36:14', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_productstock`
--

DROP TABLE IF EXISTS `tbl_productstock`;
CREATE TABLE IF NOT EXISTS `tbl_productstock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `size` varchar(100) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_productstock`
--

INSERT INTO `tbl_productstock` (`id`, `product_id`, `size`, `quantity`, `price`) VALUES
(1, 1, '14 us', 1, 8500),
(2, 2, '11 us', 2, 13500),
(3, 2, '12', 1, 13500),
(4, 2, '13 us', 1, 13500),
(5, 5, '4 us', 2, 8500),
(6, 6, '10.5 w', 5, 30000),
(7, 7, '10 us', 2, 8500),
(8, 8, '8 us', 1, 8000),
(9, 9, '14 us', 2, 9500),
(10, 10, '9.5 us', 2, 8000),
(11, 10, '11.5 us', 1, 8000),
(12, 11, '12.5 us', 2, 10000),
(13, 12, '4 us', 1, 13000),
(14, 12, '8.5 us', 1, 13000),
(15, 13, '9.5 w', 2, 6500),
(16, 14, '9 uk', 1, 7500),
(17, 15, '9.5 us', 1, 7500),
(18, 16, '10 us', 2, 4800),
(19, 16, '12 us', 2, 5000),
(20, 17, '10 us', 2, 4000),
(21, 18, '', 5, 950),
(22, 19, '', 2, 1500);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction`
--

DROP TABLE IF EXISTS `tbl_transaction`;
CREATE TABLE IF NOT EXISTS `tbl_transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productstock_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reference_number` int(11) NOT NULL,
  `date_of_purchase` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` int(11) NOT NULL,
  `mode_of_payment` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productstock_id` (`productstock_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_number` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD CONSTRAINT `tbl_product_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `tbl_brand` (`id`),
  ADD CONSTRAINT `tbl_product_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `tbl_category` (`id`);

--
-- Constraints for table `tbl_productstock`
--
ALTER TABLE `tbl_productstock`
  ADD CONSTRAINT `tbl_productstock_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `tbl_product` (`id`);

--
-- Constraints for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD CONSTRAINT `tbl_transaction_ibfk_1` FOREIGN KEY (`productstock_id`) REFERENCES `tbl_productstock` (`id`),
  ADD CONSTRAINT `tbl_transaction_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
