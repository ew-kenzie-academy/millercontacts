/*
  + Code to create new records.
  + An edited state.
  + 
*/

function script(){alert(1)}

list=document.querySelectorAll(".field.scroll .words");
lambda=list[0];

lambda.onfocus=script;

lambda.onblur=script;