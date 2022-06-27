'use strict';

{
  const ids = [];
  const main = document.querySelector('main');
  const boxspan = document.querySelector('.boxspan');
  const editsec = document.querySelector('.editsec');
  const showbtn = document.querySelector('#showbtn');
  const closebtn = document.querySelector('#closebtn');
  const updatebtn = document.querySelector('#update');
  let checklimit = 0;
  const token = main.dataset.token;

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox =>{
    checkbox.addEventListener('change', () =>{
      
      if(checklimit > 4){
        checkbox.disabled = true;
        return;
      }

      if (checkbox.checked){

        addVocaset(editsec,checkbox,ids);
        // console.log(checklimit);
        checklimit++;

        if(checklimit > 0){
          updatebtn.classList.remove('disable');
        }

      } else{

        removeVocaset(editsec,checkbox,ids);
        checklimit--;

        if (checklimit <= 0){
          updatebtn.classList.add('disable');
        }
      }

    });
  });



  showbtn.addEventListener('click', () =>{
    if (!closebtn.classList.contains('disable')){
      return;
    }

    editsec.classList.add('show');
    closebtn.classList.remove('disable');
    showbtn.classList.add('disable');
  });


  closebtn.addEventListener('click', () =>{
    if (closebtn.classList.contains('disable')){
      return;
    }

    editsec.classList.remove('show');
    closebtn.classList.add('disable');
    showbtn.classList.remove('disable');
  });


  updatebtn.addEventListener('click', () =>{
    if (updatebtn.classList.contains('disable')){
      return;
    }

    console.log(ids);

    ids.forEach(path =>{
      console.log(path);
      const ul = document.getElementById(path);
      console.log(ul);
      console.log(ul.dataset.id);
      console.log(ul.dataset.vorder);
      console.log(ul.dataset.voca);
      console.log(ul.dataset.mean);

      fetch("?action=update",{
        method : 'POST',
        body : new URLSearchParams({
          id : ul.dataset.id,
          vorder : ul.dataset.vorder,
          voca : ul.dataset.voca,
          mean : ul.dataset.mean,
          token : token,
        }),
      })
      
      setTimeout(doReload, 2000);
      
    });

  });







  function addVocaset(editsec,checkbox,ids){
    const ul = document.createElement('ul');
    ul.setAttribute("id",checkbox.dataset.id);
    ul.setAttribute("data-id",checkbox.dataset.id);
    ul.setAttribute("data-vorder", checkbox.dataset.vorder);
    ul.setAttribute("data-voca", checkbox.dataset.voca);
    ul.setAttribute("data-mean", checkbox.dataset.mean);
    ids.push(checkbox.dataset.id);
        
    const textvorder = document.createElement('input');
    const textvoca = document.createElement('input');
    const textmean = document.createElement('textarea');

    textvorder.setAttribute("type", "text");
    textvorder.setAttribute("style", "width:15px;");
    textvorder.setAttribute("value", checkbox.dataset.vorder);
    textvorder.onchange = function change(){
      let newVorder = textvorder.value;
      ul.setAttribute("data-vorder", newVorder);
    };

    textvoca.setAttribute("type", "text");
    textvoca.setAttribute("value", checkbox.dataset.voca);
    textvoca.onchange = function change(){
      let newVoca = textvoca.value;
      ul.setAttribute("data-voca", newVoca);
    };

    textmean.setAttribute("type", "text");
    textmean.setAttribute("rows", "3");
    textmean.setAttribute("cols", "40");
    // textmean.setAttribute("value",checkbox.dataset.mean);
    textmean.textContent = checkbox.dataset.mean;
    textmean.addEventListener('change', ()=>{
      let newMean = textmean.value;
      ul.setAttribute("data-mean", newMean);
    });


    ul.appendChild(textvorder);
    ul.appendChild(textvoca);
    ul.appendChild(textmean);

    editsec.appendChild(ul);

    return ids;
  }


  function removeVocaset(editsec,checkbox,ids){
    const deleteId = ids.indexOf(checkbox.dataset.id);
    ids.splice(deleteId,1);
    let vId = checkbox.dataset.id;
    const ul = document.getElementById(vId);
    editsec.removeChild(ul);
    
    return ids;
  }

  function doReload(){
    window.location.reload();
  }



}