const load = (result,progress)=>{
   
    let width = 1;
    let identity = setInterval(sence, 10); 
    function sence(){
        if (width >= 100) {
            clearInterval(identity);
          } else {
            width++; 
            result.innerHTML= width + '%'; 
            progress.style.width = width + '%'; 
          }
    }
}
export default load;