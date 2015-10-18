-- MySQL Script generated by MySQL Workbench
-- Wed Mar 25 12:46:39 2015
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Category` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Category` (
  `CategoryID` INT NOT NULL AUTO_INCREMENT,
  `CategoryName` VARCHAR(45) NOT NULL,
  `Description` TEXT(1000) NULL,
  PRIMARY KEY (`CategoryID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Products` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Products` (
  `ProductID` INT NOT NULL AUTO_INCREMENT,
  `Category_CategoryID` INT NOT NULL,
  `ProductName` VARCHAR(45) NOT NULL,
  `ProductDescription` TEXT(1000) NULL,
  `Quantity` INT NOT NULL,
  `Price` INT NOT NULL,
  `StockLevel` INT NOT NULL,
  PRIMARY KEY (`ProductID`),
  INDEX `fk_Products_Category_idx` (`Category_CategoryID` ASC),
  CONSTRAINT `fk_Products_Category`
    FOREIGN KEY (`Category_CategoryID`)
    REFERENCES `mydb`.`Category` (`CategoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`OrderDetails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`OrderDetails` ;

CREATE TABLE IF NOT EXISTS `mydb`.`OrderDetails` (
  `OrderID` INT NOT NULL AUTO_INCREMENT,
  `Quantity` INT NOT NULL,
  `TotalPrice` INT NOT NULL,
  `OrderDetails` VARCHAR(45) NOT NULL,
  `Products_ProductID` INT NOT NULL,
  PRIMARY KEY (`OrderID`),
  INDEX `fk_OrderDetails_Products1_idx` (`Products_ProductID` ASC),
  CONSTRAINT `fk_OrderDetails_Products1`
    FOREIGN KEY (`Products_ProductID`)
    REFERENCES `mydb`.`Products` (`ProductID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Delivery/Shipping`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Delivery/Shipping` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Delivery/Shipping` (
  `idDelivery/Shipping` INT NOT NULL,
  PRIMARY KEY (`idDelivery/Shipping`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;