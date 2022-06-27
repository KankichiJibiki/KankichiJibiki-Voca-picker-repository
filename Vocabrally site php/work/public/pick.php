<?php
  require_once(__DIR__ . '/../app/config.php');

  $pdo = Database::getInstance();
  $func = new Functions($pdo);
  $func->processServer();
  $orderPickIds = $func->getPickOrders();
  // var_dump($orderPickIds);

?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>Pick word page</title>
  <link rel="stylesheet" href="css/pickStyles.css">
</head>
<body>
  <header>
    <p><a href="pick.php">Pick words</a></p>
    <p><a href="pickRanVer.php">Pick Random words</a></p>
    <p><a href="edit.php">Edit words</a></p>
    <p><a href="index.php">Add words</a></p>
  </header>
  <main>
    <h1>Pick Vocabulary</h1>
    <p id="inst">Slot it to pick up ramdom words and speak it!</p>

    <section class="btnsec" data-token="<?= Utils::h($_SESSION['token']); ?>">
      <span id="slotbtn">Pick</span>
      <span id="defibtn" class="defi disable">Show meaning</span>
    </section>
    <?php foreach($orderPickIds as $orderPickId) : ?>
      <section class="display" data-id="<?= Utils::h($orderPickId->lastId); ?>">
        <ul>
          <li>You learn English words by heart</li>
          <li>Speak your mind with words you pick</li>
          <li>3 times a day everyday</li>
        </ul>
      </section>
    <?php endforeach; ?>
  </main>

  
  <script src="js/pickjs.js"></script>
</body>