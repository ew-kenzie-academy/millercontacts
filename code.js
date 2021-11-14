/*
  + Code to create new records.
  + An edited state.
  + 
*/
const redlog=function(thread,obj){
  /**
  Still a newb and don't know how to use the clunky developer tools
  to follow the stack every time something is wrong; or to trace 
  execution.
  
  @param thread Description of the caller
  @param obj    Something that might be interesting
  */
  let redtimestamp=function(){
      // A horrendous way to make something iso-8601ish :P
      let lambda=new Date();
      return  `[${lambda.getFullYear().toString().slice(2)}`
            + `${lambda.getMonth()}${lambda.getDay()} `
            + `(${lambda.getSeconds()}.${lambda.getMilliseconds()})]`
  }
  const message=`:contacts: (${thread}) ${redtimestamp()}`+`> {${obj}}`;
  console.log(message);
}

// function script_0(){ setTimeout(redlog(0),200); }
function script_1(){ setTimeout(redlog(1),200); }

list=document.querySelectorAll(".field.scroll .words");
lambda=list[0];	
  
lambda.onfocus  = script_0 = function(){ setTimeout(redlog(0),200)} ;
lambda.onblur   = script_1;

console.log("Hello");