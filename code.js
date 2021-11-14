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
  let lambda=document.createElement('div');
  lambda.innerHTML=html;
  return lambda.firstChild;
}

function newrecord(icon,label){
  return htmltotag(``
    + `<div class="record">`
    +   `<div class="anterior">`
    +       `<div class="field fixed">`
    +           `<div class="icon">  ${icon}  </div>`
    +           `<div class="words"> ${label} </div>`
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

function newpauch(symbol){
  return htmltotag(`<div class="paunch"></div><!-- paunch -->`);
}

function newfieldstack(symbol){
  return htmltotag(`<div class="field-stack"></div>`);
}

function appendBlankRecord(stackID){
  stackID=stackID.toUpperCase();
  let [icon,label] = {
     "name"    : ["♣",      ] // ["F","M","L","S" ]
    ,"phone"   : ["☎",    ] // ["L","N"         ]
    ,"email"   : ["ⓔ",     ] // ["L","E"         ]
    ,"address" : ["⌂",   ] // ["A","^","C","P","+","S","D" ]
    ,"note"    : ["λ",      ] // ["N"             ]
    ,"link"    : ["🔗",     ] // ["L","U"         ]
    ,"group"   : ["👪",    ] // ["G"             ]
  }[stackID];
  let recordstack=document.getElementById(stackID) ; 
  let lambda=newrecord(icon,label);
  recordstack.appendChild(lambda);
  
  arr=["F","M","L","S" ];
  head = lambda;
  phi=undefined;
  arr.forEach( (c) =>{
      if(c==="^"){
        phi=newpaunch(c);
        head=newfieldstack();
        phi.append(head)
      }
      else if(c==="+"){
        phi=head.parentElement();
        head=newfieldstack();
        phi.append(head);
      }
      else if(c==="-"){
        head = lambda;
        phi=undefined;
      }
      else{
          head.append( newfield(c));
      }
    });
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

  // x=appendBlankRecord("phone");
  // recordstack.append(x);
}/**/
