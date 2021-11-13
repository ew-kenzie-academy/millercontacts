/*
  + Code to create new records.
  + An edited state.
  + 
*/

function script_0(){alert(1)}
function script_1(){alert(1)}

list=document.querySelectorAll(".field.scroll .words");
lambda=list[0];

lambda.onfocus=script_0;

lambda.onblur=script_1;

console.log("Hello");