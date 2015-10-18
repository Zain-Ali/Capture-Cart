
<!DOCTYPE html>
<html>
    <head>
        <title>Installation of Capture Cart</title>
        <link rel="stylesheet" type="text/css" href="../../public/css/installDB.css">      
    </head>
    
    <body>
    
    <img class="images"src="../../public/images/webImages/captureCart.png" height="100" width="150" >
        <section id="installationForm">
        <?php

        if (file_exists('install.lock')) {
            die('CaptureCart has already been installed.');
        }

        $step = isset($_GET['step']) ? $_GET['step'] : 1;

        switch ($step) {
            case '1':
?>

        <form method="post" action="install.php?step=2">
            <section>
                <span>Host:</span><span class="required"></span> <input type="text" name="host" required="required" />
            </section>
            <section>
                <span>Username:</span> <input type="text" name="username"/>
            </section>
            <section>
                <span>Password:</span> <input type="text" name="password"/>
            </section>
            <div class="clearFloat"></div>
            <section>
                <input type="submit" name="submit" value="Next"/>
            </section>
        </form>

 <?php
                break;
            case '2':
                if (
                    !isset(
                        $_POST['host'],
                        $_POST['username'],
                        $_POST['password'])
                ) {
                    die('Incomplete DB');
                }

                if (empty($_POST['host'])) {
                    die('The DB host cannot be left empty.');
                }

                try {
                    $pdo = new PDO("mysql:host={$_POST['host']}",$_POST['username'],$_POST['password'],[PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

                    file_put_contents(
                        './DBConnect/dbconfig.json',
                        json_encode(
                            [
                                'host' => $_POST['host'],
                                'dbname' => 'CaptureCart',
                                'username' => $_POST['username'],
                                'password' => $_POST['password']
                            ]
                        )
                    ); 

                    $pdo->exec('CREATE DATABASE IF NOT EXISTS CaptureCart');

                    $pdo->exec('
                        CREATE TABLE IF NOT EXISTS CaptureCart.`Category` (
                        `CategoryID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          `CategoryName` varchar(100) NOT NULL
                        ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
                    ');

                    $pdo->exec('
                        CREATE TABLE IF NOT EXISTS CaptureCart.`Contact` (
                        `ContactID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          `Name` varchar(100) NOT NULL,
                          `Email` varchar(50) NOT NULL,
                          `ContactNo` int(20) NOT NULL,
                          `Query` text NOT NULL
                        ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
                    ');

                    $pdo->exec('
                        CREATE TABLE IF NOT EXISTS CaptureCart.`Products` (
                        `ProductID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          `CategoryID` int(10) NOT NULL,
                          `ProductName` varchar(45) NOT NULL,
                          `ProductDescription` text,
                          `ProductPrice` decimal(11,2) NOT NULL,
                          `ProductStockLevel` int(11) NOT NULL,
                          `ProductImage` varchar(1000) NOT NULL
                        ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
                    ');

                    $pdo->exec('
                        CREATE TABLE IF NOT EXISTS CaptureCart.`Order` (
                        `OrderID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          `Quantity` int(11) NOT NULL,
                          `Products_ProductID` int(11) NOT NULL,
                          FOREIGN KEY (`Products_ProductID`) REFERENCES CaptureCart.`Products` (`ProductID`) ON DELETE NO ACTION ON UPDATE NO ACTION
                        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
                    ');

                    $pdo->exec("
                        INSERT INTO CaptureCart.`Category` (`CategoryID`, `CategoryName`) VALUES (null, 'Electronics'), (2, 'Cars')
                    ");

                    $pdo->exec("
                        INSERT INTO CaptureCart.`Contact` (`ContactID`, `Name`, `Email`, `ContactNo`, `Query`) VALUES
                        (null, 'aa', 'aa', 0, 'aa'),
                        (null, 'sdafasdf', 'adsfasdf', 112, '121');
                    ");

                    $pdo->exec("
                        INSERT INTO CaptureCart.`Products` (`ProductID`, `CategoryID`, `ProductName`, `ProductDescription`, `ProductPrice`, `ProductStockLevel`, `ProductImage`) VALUES
                        (null, 1, 'iPhone', 'Book', '33.00', 2, 'books.jpg'),
                        (null, 2, 'BMW ', 'BMW Made by ME', '222.00', 3, 'pencil.jpg'),
                        (null, 2, 'sdfasdf', 'asdfadsfadsfasdfasdfsdf', '222.00', 2, 'pencil.jpg'),
                        (null, 2, 'pencil', 'adfasdfasdfasdfasdf', '2323.00', 2323, 'pencil.jpg'),
                        (null, 2, 'iPhone 6s', 'Made By Me', '232.00', 2, 'iphone6.png'),
                        (null, 2, 'alex', 'computer science', '2333.00', 2, 'pencil.jpg'),
                        (null, 2, 'sadfasdfd', 'sadfasdfasdf', '3232323.00', 2, 'twiiter.png');
                    ");

                    echo 'Capture Cart has been successfully installed!';

                    file_put_contents('install.lock', '');
                } catch(PDOException $e) {
                    echo 'Installation Failed:<br /><br />';
                    echo $e->getMessage();
                }
                break;
            default:
                die('Step is not valud.');
        }
?>
        </section>

    </body>
</html>