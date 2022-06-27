'use strict';

{
  let wordset = {
    w: [],
    m: [],
  };

  let words = wordset['w'];
  let defis = wordset['m'];
  let currentNum = 0;
  const ul = document.querySelector('ul');
  const token = document.querySelector('.btnGroup').dataset.token;
  const btn1 = document.querySelector('#btn');
  const btn2 = document.querySelector('#btn2');
  const btn3 = document.querySelector('#btn3');
  const btn4 = document.querySelector('#btn4');


  window.addEventListener('beforeunload', function(e){
    e.returnValue = '※Note! Words that you added are reset※';
  }, false);

  const delete_word = document.querySelector('.delete_word');
  delete_word.addEventListener('click', () =>{
    const word = document.querySelector('[name=word]');
    word.value = '';
  });

  const delete_defi = document.querySelector('.delete_defi');
  delete_defi.addEventListener('click', () =>{
    const defi = document.querySelector('[name=defi]');
    defi.value = '';
  });


  btn1.addEventListener('click', () =>{

    const word = document.querySelector('[name=word]');
    const defi = document.querySelector('[name=defi]');

    if (word.value === '' || defi.value === ''){
      return;
    }

    if (btn2.classList.contains('disable') &&
        btn3.classList.contains('disable') &&
        btn4.classList.contains('disable'))
        {
          btn2.classList.remove('disable');
          btn3.classList.remove('disable');
          btn4.classList.remove('disable');
    }

    words.push(word.value);
    defis.push(defi.value);

    while (ul.firstChild){
      ul.removeChild(ul.firstChild);
    }
    displayWords(words,btn3,ul);
    
    word.value = '';
    defi.value = '';
  });


  btn2.addEventListener('click', () => {
    if (!confirm('words go to the Database.')){
      return;
    }
    
    const currentWords = words;
    const currentDefis = defis;
    if (btn2.classList.contains('disable')){
      return;
    }


    for (let i = 0; i < currentWords.length; i++){

      fetch("?action=add", {
        method : 'POST',
        body : new URLSearchParams({
          word : currentWords[i],
          defi : currentDefis[i],
          vorder : btn2.parentNode.dataset.id,
          token : token,
        }),
      })
      // console.log('Ahu');

      if (i === currentWords.length){
        fetch("?action=getId", {
          method: 'POST',
          body: new URLSearchParams
        })
      }
    }
    // Object.keys(wordset).forEach(function(key) {
    //   let wor = (key,wordset[key]);
    //   console.log(wor);
    // });
    blankWordsAfterAdd(words, defis);
    
    const lis = document.querySelectorAll('li');
    deleteList(lis);
    alert('Added successfully!');
    doReload();
  });


  btn3.addEventListener('click', () => {
    if (btn3.classList.contains('disable')){
      return;
    }

    if (btn3.classList.contains('backWord')){
      showWords(words,btn3,currentNum);
    } else {
      showDefis(defis,btn3,currentNum);
    }

  });


  btn4.addEventListener('click', () =>{
    const lis = document.querySelectorAll('li');
    if (btn3.classList.contains('disable')){
      return;
    }

    deleteList(lis);
    
    blankWordsArray(words,defis,btn3);

    if (!btn2.classList.contains('disable') &&
        !btn3.classList.contains('disable') &&
        !btn4.classList.contains('disable'))
    {
      btn2.classList.add('disable');
      btn3.classList.add('disable');
      btn4.classList.add('disable');
    }
  });
}




// ----------------function------------------

function displayWords(words,btn3,ul){
  words.forEach(word => {
    const li = document.createElement('li');
    li.textContent = word;

    ul.appendChild(li);
  });
  if (btn3.classList.contains('backWord')){
    btn3.classList.remove('backWord');
    btn3.classList.add('btn3');
    btn3.textContent = '-Show definitions-';
  }
}


function blankWordsArray(words,defis,btn3){
  words.splice(0, words.length);
  defis.splice(0, defis.length);
  if (btn3.classList.contains('backWord')){
    btn3.classList.remove('backWord');
    btn3.classList.add('btn3');
    btn3.textContent = '-Show definitions-';
  }
}

function blankWordsAfterAdd(words,defis){
  words.splice(0, words.length);
  defis.splice(0, defis.length);
}

function deleteList(lis){
  lis.forEach(li =>{
    li.remove();
  });
}

function showDefis(defis,btn3,currentNum){
  const lis = document.querySelectorAll('li');
  btn3.textContent = "-Show words again-";
  btn3.classList.add('backWord');
  lis.forEach(li => {
    li.textContent = defis[currentNum];
    currentNum++;
  });

  currentNum = 0;
}


function showWords(words,btn3,currentNum){
  const lis = document.querySelectorAll('li');
  btn3.textContent = '-Show definitions-';
  btn3.classList.remove('backWord');
  btn3.classList.add('btn3');
  lis.forEach(li => {
    li.textContent = words[currentNum];
    currentNum++;
  });
  currentNum = 0;
}

function doReload(){
  window.location.reload();
}