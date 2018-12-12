<?php

require("phpsqlajax_dbinfo.php");

// Start XML file, create parent node

$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");
$parnode = $dom->appendChild($node);


// tietokantayhteys PDO
try {
 $connection = new PDO("mysql:host=magnesium;dbname=$database", $username, $password);
} catch (PDOException $e) {
 die("ERR: " . $e->getMessage());
}
$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$connection->exec("SET NAMES utf8");


$query = $connection->prepare("SELECT * FROM markers WHERE 1");
$query->execute();

header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each

while ($row = $query->fetch()) {
 $node = $dom->createElement("marker");
 $newnode = $parnode->appendChild($node);
 $newnode->setAttribute("name", $row['name']);
 $newnode->setAttribute("address", $row['address']);
 $newnode->setAttribute("lat", $row['lat']);
 $newnode->setAttribute("lng", $row['lng']);
 $newnode->setAttribute("type", $row['type']);
  $newnode->setAttribute("kuva", $row['kuva']);
  $newnode->setAttribute("linkki", $row['linkki']);
}

echo $dom->saveXML();

?>