'use strict'
{
  let currentNum = 1;
  const ul = document.querySelector('ul');
  const display = document.querySelector('.display');
  const slotbtn = document.querySelector('#slotbtn');
  const defibtn = document.querySelector('#defibtn');
  const token = slotbtn.parentNode.dataset.token;
  let lastId = display.dataset.id;
  let vocaSet = {
    w:[],
    m:[],
  }
  let words = vocaSet['w'];
  let means = vocaSet['m'];
  const numbers = [];
  for (let i = 1; i < lastId; i++){
    numbers[i] = i + 1;
  }
  console.log(lastId);

  slotbtn.addEventListener('click', () =>{
    currentNum = Math.floor(Math.random() * numbers.length + 1);
    console.log(currentNum);
    console.log(typeof currentNum);
    fetch ("?action=show",{
      method : 'POST',
      body : new URLSearchParams({
        vorder : currentNum,
        token : token,
      }),
    })

    .then(response => {
      return response.json();
    })
    .then(json =>{
      // console.log(json);
      createList(json,ul,words,means);
    });

    if (defibtn.classList.contains('disable')){
      defibtn.classList.remove('disable');
    }

    if (defibtn.classList.contains('DefiMode')){
      defibtn.classList.remove('DefiMode');
      defibtn.textContent ='Show meaning';
    }

  });

  defibtn.addEventListener('click', ()=>{
    if (defibtn.classList.contains('disable')){
      return;
    }

    if (defibtn.classList.contains('defi')){
      if (defibtn.classList.contains('DefiMode')){
        defibtn.textContent ='Show meaning';
        defibtn.classList.remove('DefiMode');

        displayVoca(ul)
      } else {
        defibtn.textContent = 'Back To Words';
        defibtn.classList.add('DefiMode');

        displayDefis(ul);
      }
    }
  });








  function createList(json,ul,words,means){
    words.splice(0, words.length);
    means.splice(0, means.length);

    json.forEach(word => {
      words.push(word['voca']);
      means.push(word['mean']);
    });

    while(ul.firstChild){
      ul.removeChild(ul.firstChild);
    }

    let currentNum2 = 0;
    words.forEach(word =>{
      const li = document.createElement('li');
      li.textContent = currentNum2 + 1 + '.' + word;
      currentNum2++;

      ul.appendChild(li);
    });
  }


  function displayDefis(ul){
    const lis = document.querySelectorAll('li');
    let currentNum2 = 0;
    lis.forEach(li =>{
      li.textContent = currentNum2 + 1 + '.' + words[currentNum2] + ' ' + '--->' + ' ' + means[currentNum2];
      currentNum2++;
      
      ul.appendChild(li);
    });
  }


  function displayVoca(ul){
    const lis = document.querySelectorAll('li');
    let currentNum2 = 0;
    lis.forEach(li =>{
      li.textContent = currentNum2 + 1 + '.' + words[currentNum2];
      currentNum2++;
      
      ul.appendChild(li);
    });
  }

  
}