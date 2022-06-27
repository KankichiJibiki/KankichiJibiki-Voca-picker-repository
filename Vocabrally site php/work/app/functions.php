<?php

class Functions {
  private $pdo;
  public function __construct($pdo){
    $this->pdo = $pdo;
    Token::create();
  }

  public function processServer(){
    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
      Token::validate();
      $action = filter_input(INPUT_GET, 'action');
  
      switch($action){
        case 'add' :
          $this->addData();
          break;
        case 'show' :
          $voca = $this->showWord();
          header('Content-Type : application/json');
          echo json_encode($voca); 
          break;
        case 'showRandom' :
          $randVoca = $this->showRandom();
          header('Content-Type : application/json');
          echo json_encode($randVoca);
          break;
        case 'update' :
          $this->updateVoca();
          break;
      }
      exit;
    }
  }

  private function addData(){
    $word = trim(filter_input(INPUT_POST, 'word'));
    $defi = trim(filter_input(INPUT_POST, 'defi'));
    $vorder = filter_input(INPUT_POST, 'vorder');
  
    $stmt1 = $this->pdo->prepare("INSERT INTO vocaslist(voca,mean, vorder) VALUES(:word, :defi, :vorder) ");
  
    $stmt1->bindValue('word', $word, PDO::PARAM_STR);
    $stmt1->bindValue('defi', $defi, PDO::PARAM_STR);
    $stmt1->bindValue('vorder', $vorder, PDO::PARAM_INT);
    
    $stmt1->execute();
    
    $stmt2 = $this->pdo->prepare("INSERT INTO vocaorder(vorder) VALUES(:vorder)");
    $stmt2->bindValue('vorder', $vorder, PDO::PARAM_INT);
    $stmt2->execute();
  }


  public function showWord(){
    $vorder = filter_input(INPUT_POST, 'vorder');
    if ($vorder === ''){
      return;
    }

    $stmt = $this->pdo->prepare("SELECT * FROM vocaslist WHERE vorder = :vorder");
    $stmt->bindValue('vorder', $vorder, PDO::PARAM_INT);
    $stmt->execute();
    $vocaSet = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $vocaSet;
  }

  public function showRandom(){
    $rowNums = filter_input(INPUT_POST, 'rowNums', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
    if (is_null($rowNums)) return;
    var_dump($rowNums);
    //*-I think I didn't get Array via filter_input array ver because "var_dump did not work"-*
    $inClause = substr(str_repeat(',?', count($rowNums)), 1);

    $stmt = $this->pdo->prepare(sprintf("SELECT idvocaslist.* FROM (SELECT ROW_NUMBER() OVER (ORDER BY vorder) num, vocaslist.* FROM vocaslist ORDER BY vorder) idvocaslist WHERE num IN (%s)", $inClause));

    for ($i = 0; $i < 4; $i++){
      $stmt->bindValue('?',$rowNums[$i],PDO::PARAM_INT);
    }
    var_dump($stmt);

    $stmt->execute();
    $randVoca = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $randVoca;

  }

  
  public function getAddOrders(){
    $stmt = $this->pdo->query("SELECT MAX(vorder) + 1 AS lastId FROM vocaorder");
    $orderIds = $stmt->fetchAll();
    return $orderIds;
  }


  public function updateVoca(){
    $id = filter_input(INPUT_POST, 'id');
    $vorder = filter_input(INPUT_POST, 'vorder');
    $voca = filter_input(INPUT_POST, 'voca');
    $mean = filter_input(INPUT_POST, 'mean');

    if (empty($id)){
      return;
    }

    $stmt = $this->pdo->prepare("UPDATE vocaslist SET vorder = :vorder, voca = :voca, mean = :mean  WHERE id = :id");
    $stmt->bindValue('id', $id, PDO::PARAM_INT);
    $stmt->bindValue('vorder', $vorder, PDO::PARAM_INT);
    $stmt->bindValue('voca', $voca, PDO::PARAM_STR);
    $stmt->bindValue('mean', $mean, PDO::PARAM_STR);
    $stmt->execute();

    $stmt1 = $this->pdo->prepare("UPDATE vocaorder SET vorder = :vorder WHERE id = :id");
    $stmt1->bindValue('id', $id, PDO::PARAM_INT);
    $stmt1->bindValue('vorder', $vorder, PDO::PARAM_INT);
    $stmt1->execute();


  }


  public function getPickOrders(){
    $stmt = $this->pdo->query("SELECT MAX(vorder) AS lastId FROM vocaorder");
    $orderPickIds = $stmt->fetchAll();
    return $orderPickIds;
  }


  public function getVocaSet(){
    $stmt = $this->pdo->query("SELECT * FROM vocaslist");
    $vocaSet = $stmt->fetchAll();
    return $vocaSet;
  }

  public function getRowcount(){
    $stmt = $this->pdo->query("SELECT COUNT(*) AS lastRow FROM vocaslist");
    $rowCounts = $stmt->fetchAll();
    return $rowCounts;
  }
  
}


