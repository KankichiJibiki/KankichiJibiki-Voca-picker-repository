<?php

require_once(__DIR__ . '/../app/config.php');
$pdo = Database::getInstance();
$func = new Functions($pdo);
$func->processServer();
$vocaSet = $func->getVocaSet();

?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <title>Edit words</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="css/editStyles.css">
</head>
<body>
<header>
    <p><a href="pick.php">Pick words</a></p>
    <p><a href="pickRanVer.php">Pick Random words</a></p>
    <p><a href="edit.php">Edit words</a></p>
    <p><a href="index.php">Add words</a></p>
</header>

<main data-token="<?= Utils::h($_SESSION['token']);?>">
  <h1>Edit Vocabulary</h1>
  <p id="inst">Edit Vocabulary set you have register here</p>

  <section class="editsec">
    <h1>Update words</h1>
    <button id="update" class="disable">UPDATE</button>

  </section>

  <section class="btnsec">
    <span id="showbtn">Show</span>
    <span id="closebtn" class="disable">Close</span>
  </section>

  <section class="boxsec">
    <?php foreach($vocaSet as $voca):?>
      <section class="boxspan">
        <label>
          <ul>
            <input type="checkbox" 
            data-id="<?= Utils::h($voca->id); ?>"
            data-vorder="<?= Utils::h($voca->vorder);?>"
            data-voca="<?= Utils::h($voca->voca); ?>"
            data-mean="<?= Utils::h($voca->mean); ?>"
            >
            <li><?= Utils::h($voca->vorder) . ':' ;?></li>
            <li>'W':<?= Utils::h($voca->voca);?></li>
            <li>'M':<?= Utils::h($voca->mean); ?></li>
          </ul>
        </label>
      </section>
    <?php endforeach;?>
  </section>
</main>

  
<script src="js/edit.js"></script>
</body>