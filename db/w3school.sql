
SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `customers`
-- ----------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerID` varchar(100) DEFAULT NULL,
  `CustomerName` varchar(100) DEFAULT NULL,
  `ContactName` varchar(100) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `PostalCode` varchar(100) DEFAULT NULL,
  `Country` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  UNIQUE KEY `CustomerID` (`CustomerID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of customers
-- ----------------------------
INSERT INTO customers VALUES ('1', 'CUST_01', 'Alfreds Futterkiste', 'Maria Anders', 'Obere Str. 57', 'Berlin', '12209', 'Germany');
INSERT INTO customers VALUES ('2', 'CUST_02', 'Ana Trujillo Emparedados y helados', 'Ana Trujillo', 'Avda. de la Constitución 2222', 'México D.F.', '05021', 'Mexico');
INSERT INTO customers VALUES ('3', 'CUST_03', 'Antonio Moreno Taquería', 'Antonio Moreno', 'Mataderos 2312', 'México D.F.', '05023', 'Mexico');
INSERT INTO customers VALUES ('4', 'CUST_04', 'Around the Horn', 'Thomas Hardy', '120 Hanover Sq.', 'London', 'WA1 1DP', 'UK');
INSERT INTO customers VALUES ('5', 'CUST_05', 'Berglunds snabbköp', 'Christina Berglund', 'Berguvsvägen 8', 'Luleå', 'S-958 22', 'Sweden');
INSERT INTO customers VALUES ('6', 'CUST_06', 'Blauer See Delikatessen', 'Hanna Moos', 'Forsterstr. 57', 'Mannheim', '68306', 'Germany');
INSERT INTO customers VALUES ('7', 'CUST_07', 'Blondel père et fils', 'Frédérique Citeaux', '24, place Kléber', 'Strasbourg', '67000', 'France');
INSERT INTO customers VALUES ('8', 'CUST_08', 'Bólido Comidas preparadas', 'Martín Sommer', 'C/ Araquil, 67', 'Madrid', '28023', 'Spain');
INSERT INTO customers VALUES ('9', 'CUST_09', 'Bon app\'', 'Laurence Lebihans', '12, rue des Bouchers', 'Marseille', '13008', 'France');
INSERT INTO customers VALUES ('10', 'CUST_10', 'Bottom-Dollar Marketse', 'Elizabeth Lincoln', '23 Tsawassen Blvd.', 'Tsawassen', 'T2F 8M4', 'Canada');
INSERT INTO customers VALUES ('11', 'CUST_11', 'Jia Christie', 'Mike Abastos', '1234 Abaco St.', 'Manila', '4200', 'Philippines');
INSERT INTO customers VALUES ('12', 'CUST_12', 'Jesrel Rusiana', 'Ben 10', 'Lower Sampaguita', 'Mandaue City', '565656', 'Philippines');
INSERT INTO customers VALUES ('13', 'CUST_13', 'Jesrel Rusiana', 'Ben Afflecks', 'Lower Sampaguita', 'Mandaue City', '565656', 'Philippines');

-- ----------------------------
-- Table structure for `products`
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ProductID` varchar(100) DEFAULT NULL,
  `ProductName` varchar(100) DEFAULT NULL,
  `SupplierID` varchar(100) DEFAULT NULL,
  `CategoryID` varchar(100) DEFAULT NULL,
  `Unit` varchar(100) DEFAULT NULL,
  `Price` decimal(14,2) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  UNIQUE KEY `ProductID` (`ProductID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO products VALUES ('1', '1', 'Chais', '1', '1', '10 boxes x 20 bags', '18.00');
INSERT INTO products VALUES ('2', '2', 'Chang', '1', '1', '24 - 12 oz bottles', '19.00');
INSERT INTO products VALUES ('3', '3', 'Aniseed Syrup', '1', '2', '12 - 550 ml bottles', '10.00');
INSERT INTO products VALUES ('4', '4', 'Chef Anton\'s Cajun Seasoning', '2', '2', '48 - 6 oz jars', '22.00');
INSERT INTO products VALUES ('5', '5', 'Chef Anton\'s Gumbo Mix', '2', '2', '36 boxes', '21.35');
INSERT INTO products VALUES ('6', '6', 'Grandma\'s Boysenberry Spread', '3', '2', '12 - 8 oz jars', '25.00');
INSERT INTO products VALUES ('7', '7', 'Uncle Bob\'s Organic Dried Pears', '3', '7', '	12 - 1 lb pkgs.', '30.00');
INSERT INTO products VALUES ('8', '8', 'Northwoods Cranberry Sauce', '3', '2', '12 - 12 oz jars', '40.00');
INSERT INTO products VALUES ('9', '9', 'Mishi Kobe Niku', '4', '6', '18 - 500 g pkgs.', '97.00');
INSERT INTO products VALUES ('10', '10', 'Ikura', '4', '8', '12 - 200 ml jars', '31.00');

-- ----------------------------
-- Table structure for `shippers`
-- ----------------------------
DROP TABLE IF EXISTS `shippers`;
CREATE TABLE `shippers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ShipperID` varchar(100) DEFAULT NULL,
  `ShipperName` varchar(100) DEFAULT NULL,
  `Phone` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  UNIQUE KEY `ShipperID` (`ShipperID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of shippers
-- ----------------------------
INSERT INTO shippers VALUES ('1', '1', 'Speedy Express', '(503) 555-9831');
INSERT INTO shippers VALUES ('2', '2', 'United Package', '(503) 555-3199');
INSERT INTO shippers VALUES ('3', '3', 'Federal Shipping', '(503) 555-9931');

-- ----------------------------
-- Table structure for `suppliers`
-- ----------------------------
DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE `suppliers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SupplierID` varchar(100) DEFAULT NULL,
  `SupplierName` varchar(100) DEFAULT NULL,
  `ContactName` varchar(100) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `PostalCode` varchar(100) DEFAULT NULL,
  `Country` varchar(100) DEFAULT NULL,
  `Phone` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  UNIQUE KEY `SupplierID` (`SupplierID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of suppliers
-- ----------------------------
INSERT INTO suppliers VALUES ('1', '1', 'Exotic Liquid', 'Charlotte Cooper', '49 Gilbert St.', 'Londona', 'EC1 4SD', 'UK', '(171) 555-2222');
INSERT INTO suppliers VALUES ('2', '2', 'New Orleans Cajun Delights', 'Shelley Burke', 'P.O. Box 78934', 'New Orleans', '70117', 'USA', '(100) 555-4822');
INSERT INTO suppliers VALUES ('3', '3', 'Grandma Kelly\'s Homestead', 'Regina Murphy', '707 Oxford Rd.', 'Ann Arbor', '48104', 'USA', '(313) 555-5735');
INSERT INTO suppliers VALUES ('4', '4', 'Tokyo Traders', 'Yoshi Nagase', '9-8 Sekimai Musashino-shi', 'Tokyo', '100', 'Japan', '(03) 3555-5011');
INSERT INTO suppliers VALUES ('5', '5', 'Cooperativa de Quesos \'Las Cabras\'', 'Antonio del Valle Saavedra', 'Calle del Rosal 4', 'Oviedo', '33007', 'Spain', '(98) 598 76 54');
INSERT INTO suppliers VALUES ('6', '6', 'Mayumi\'s', 'Mayumi Ohno', '92 Setsuko Chuo-ku', 'Osaka', '545', 'Japan', '(06) 431-7877');
INSERT INTO suppliers VALUES ('7', '7', 'Pavlova, Ltd.', 'Ian Devling', '74 Rose St. Moonie Ponds', 'Melbourne', '3058', 'Australia', '(03) 444-2343');
INSERT INTO suppliers VALUES ('8', '8', 'Specialty Biscuits, Ltd.', 'Peter Wilson', '29 King\'s Way', 'Manchester', 'M14 GSD', 'UK', '(161) 555-4448');
INSERT INTO suppliers VALUES ('9', '9', 'PB Knäckebröd AB', 'Lars Peterson', 'Kaloadagatan 13', 'Göteborg', 'S-345 67', 'Sweden', '031-987 65 43');
INSERT INTO suppliers VALUES ('10', '10', 'Refrescos Americanas LTDA', 'Carlos Diaz', 'Av. das Americanas 12.890', 'São Paulo', '5442', 'Brazil', '(11) 555 4640');
