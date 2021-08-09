
const  {parse, stringify} =require( 'roman-numerals');

    const text = document.getElementById("number");
    const answer = document.getElementById("text");


    document.getElementById("roman").addEventListener("click", function(){
        try {
            answer.innerHTML = parse(text.value);
          } catch (error) {
            answer.innerHTML = error.message;
          }      
   });
  
   document.getElementById("arabic").addEventListener("click", function(){
    if(!isNaN(+text.value)){
        try {
            answer.innerHTML = stringify(+text.value);
          } catch (error) {
            answer.innerHTML = error.message;
          }
    }else {
        answer.innerHTML = 'Not a number';
    }
    
});
