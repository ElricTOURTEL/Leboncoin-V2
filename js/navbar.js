function myDropdown(){
    document.getElementById("dropdown--header").classList.toggle("show");
  }
  window.onclick = function(event) {
    if(!event.target.matches('.dropButton')){
      let dropdowns = document.getElementsByClassName("container--dropdown__bloc")
      for(let i=0; i <dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  