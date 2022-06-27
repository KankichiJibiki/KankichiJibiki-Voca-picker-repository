<?php

  require_once(__DIR__ . '/../app/config.php');

  $pdo = Database::getInstance();
  $func = new Functions($pdo);
  $func->processServer();
  $orderIds = $func->getAddOrders();

?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>AddVacaPage</title>
  <link rel="stylesheet" href="css/addStyles.css">
</head>
<body>
  <header>
    <p><a href="pick.php">Pick words</a></p>
    <p><a href="pickRanVer.php">Pick Random words</a></p>
    <p><a href="edit.php">Edit words</a></p>
    <p><a href="index.php">Add words</a></p>
  </header>
  <main>
    <h1>Add Vocabulary</h1>
    <p id="deli">↓To register words you want↓</p>
    
    <section class="form" >
      <form onsubmit="return false;" action="" autocomplete="off">
        <section class="word_sec">
          <p id="inst">Word :</p>
          <input type="text" name="word" placeholder="Type a word here">
          <span class="delete_word">×</span>
        </section>
      </form>

      <form onsubmit="return false;" action="" autocomplete="off">
        <section class="defi_sec">
          <p id="inst">Meaning : </p>
          <input type="text" name="defi" placeholder="Type definition for a word">
          <span class="delete_defi">×</span>
        </section>
      </form>

      <span id="btn">Add</span>
    </section>

    <section class="AddToSql">
      <section class="pendingList">
        <ul>
          <li>You need to add at least 5 words</li>
          <li>This is registered into MYSQL Database</li>
          <li>Note: if you click a reflesh btn, word resets as well</li>
        </ul>
      </section>
      <?php foreach($orderIds as $orderId): ?>
        <section class="btnGroup" data-id="<?= Utils::h($orderId->lastId); ?>" data-token="<?= Utils::h($_SESSION['token']); ?>">
          <span id="btn2" class="disable">Add To Database →</span>
          <span id="btn3" class="btn3 disable">-Show definitions-</span>
          <span id="btn4" class="disable">← Reset words</span>
        </section>
      <?php endforeach; ?>
    </section>
  </main>
  <footer>
  
  </footer>

  <script src="js/main.js"></script>
</body>