<?php

  session_start();

  define('DSN', 'mysql:host=db;dbname=myvoca;charset=utf8mb4');
  define('DB_USER', 'vocalearner');
  define('DB_PASS', 'vocaenglish');

  spl_autoload_register(function($class){
    $filename = sprintf(__DIR__ . '/%s.php', $class);

    if(file_exists($filename)){
      require_once($filename);
    } else {
      echo 'File not found' . $filename;
      exit;
    }
  });