<?php

$path = $_GET['path'];
$files = array();

$dir = opendir($path);
while ($file = readdir($dir)) {
  if($file!='.' && $file!='..')
    $files[] = $file;
}

header('Content-type: application/json');
echo json_encode($files);
