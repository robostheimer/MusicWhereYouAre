<?php
//echo phpInfo();
$file = fopen("IP2LOCATION-LITE-DB5.csv","r");
echo $file;
print_r(fgetcsv($file));
fclose($file);
?>