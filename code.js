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

contacttimestamp=function(){
  /**
  @return Current date is something ISO-8601
  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  */
  let lambda =new Date();
  let TZ     = lambda.toLocaleTimeString([],{timeZoneName:'short'}).split(" ").pop();
  return  `[${lambda.getFullYear()}-${lambda.getMonth() + 1}-${lambda.getDate()}`
        + ` ${lambda.getHours().toString().padStart(2,"0")}`
        + `:${lambda.getMinutes().toString().padStart(2,"0")} ${TZ}]`
}

function htmltotag(html){
  lambda=document.createElement('div');
  lambda.innerHTML=html;
  return lambda.firstChild;
}

function newrecord(symbol){
  return htmltotag(``
    + `<div class="record">`
    +   `<div class="anterior">`
    +       `<div class="field fixed">`
    +           `<div class="icon">♣</div>`
    +           `<div class="words">NAME</div>`
    +       `</div><!-- field fixed -->`
    +       `<div class="field timestamp">`
    +           `<div class="icon">X</div>`
    +           `<div class="words">[2021-11-08 23:30 MST]</div>`
    +           `<div class="idol">⭯</div>`
    +       `</div><!-- field timestamp -->`
    +   `</div><!-- anterior -->`
    + `</div><!-- "record" -->`
  )
}
function newfield(symbol){
  return htmltotag(``
    + `<div class="field scroll">`
    +   `<div class="icon">${symbol}</div>`
    +   `<div class="words" contenteditable="true"></div>`
    + `</div><!-- field scroll -->`)
}

function appendBlankRecord(appID){
  // lambda=document.createElement(`div`);
  {
   "name"    :0
  ,"phone"   :1
  ,"email"   :2
  ,"address" :3
  ,"note"    :4
  ,"group"   :5
  
  }
  lambda = htmltotag(``
    + `<div class="record">`
    +   `<div class="anterior">`
    +       `<div class="field fixed">`
    +           `<div class="icon">♣</div>`
    +           `<div class="words">NAME</div>`
    +       `</div><!-- field fixed -->`
    +       `<div class="field timestamp">`
    +           `<div class="icon">X</div>`
    +           `<div class="words">[2021-11-08 23:30 MST]</div>`
    +           `<div class="idol">⭯</div>`
    +       `</div><!-- field timestamp -->`
    +   `</div><!-- anterior -->`
    + `</div><!-- "record" -->`
  )
    // lambda.textContent="<td>text</td>"
    // return lambda.firstChild;
    return lambda;
}

redlog("sync","Hello App");

{/*event*/
  list=document.querySelectorAll(".field.scroll .words");
  lambda=list[0];	
    
  lambda.onfocus     = script_0    = function(){ setTimeout(redlog("onfocus"),100)} ;
  lambda.onblur      = script_1    = function(){ setTimeout(redlog("onblur" ),100)} ;
  // lambda.onfocusout  = script_2    = function(){ setTimeout(redlog("onfocusout"),100)} ;
}/**/

{/*taggen*/
  // body=document.getElementsByTagName("body")[0]
  recordstack=document.getElementById("phone") ; 
  x=appendBlankRecord();
  recordstack.append(x);
}/**/
