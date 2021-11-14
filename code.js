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
  setTimeout(console.log(message),100);
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
    +           `<div class="words">${contacttimestamp()}</div>`
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

function newpaunch(symbol){
  return htmltotag(`<div class="paunch"></div><!-- paunch -->`);
}

function newfieldstack(symbol){
  return htmltotag(`<div class="field-stack"></div>`);
}

function appendBlankRecord(stackID){
  stackID=stackID.toLowerCase();
  let [icon,arr] = {
     "name"    : ["♣"     , ["F","M","L","S" ]              ]
    ,"phone"   : ["☎"    , ["L","N"         ]              ]
    ,"email"   : ["ⓔ"     , ["L","E"         ]              ]
    ,"address" : ["⌂"     , ["A","^","C","P","+","S","D"]   ]
    ,"note"    : ["λ"     , ["N"             ]              ]
    ,"link"    : ["🔗"    , ["L","U"         ]              ]
    ,"group"   : ["👪"    , ["G"             ]              ]
  }[stackID];
  let recordstack = document.getElementById(stackID) ;
  let lambda      = newrecord(icon,stackID.toUpperCase());
  redlog("append",icon);
  redlog("append",arr);
  let head = lambda     ;
  let phi  = undefined  ;
  arr.forEach( (c) =>{
      if(c==="^"){
        phi   = newpaunch(c);
        head  = newfieldstack();
        phi.append(head);
        lambda.append(phi);
      }
      else if(c==="+"){
        phi   = head.parentElement;
        head  = newfieldstack();
        phi.append(head);
      }
      else if(c==="-"){
        head = lambda;
        phi=undefined;
      }
      else{
          redlog("append->else",c);
          head.append( newfield(c));
      }
    });
  let  post  =recordstack.querySelector(".posterior")
  if(! post){ recordstack.appendChild(lambda); }
  else{       post.before(lambda);             }
  return lambda;
}

redlog("sync","Hello App");

{/*eventsandbox*/
  list=document.querySelectorAll(".field.scroll .words");
  lambda=list[0];	
  
  script_3 = function(){ redlog("focusout::script_3","3") } ;
  function script_4(){   redlog("focusout::script_4","4") } ;
  glob5=undefined;function script_5(e){   
    redlog("focusout::script_5",""),100;
    glob5=e;
  };
  script_0 = function(e){
    redlog("script_0","starting 0")        ;
    let words  = e.target                  ;
    let parent = words.closest(".record")                  ;
    let twords = parent.querySelector(".timestamp .words") ;
    words.__instate=[words.innerHTML,twords.innerHTML];
    redlog("script_0","done: " + words.instate)        ;
  }
  lambda.onfocus     = script_0;
  glob6=undefined;lambda.onblur      = script_6    = function(e){
    glob6=e;
    redlog("onblur::script_6","start");
    let words  = e.target;
    let parent = words.closest(".record");
    let twords = parent.querySelector(".timestamp .words");
    let curr   = words.innerHTML;
    redlog("onblur::script_6","state: "+words.__instate);
    if(curr === words.__instate[0]){
      redlog("onblur::script_6",`the same: [${words.__instate}] is: [${curr}]`);
      words.__instate=undefined;
    }
    else{
      redlog("onblur::script_6",`changed: [${words.__instate}] is: [${curr}]`);
      twords.innerHTML=contacttimestamp();
      glob6=parent.querySelector(".idol");// .visibility="visible";
      parent.querySelector(".idol").style.visibility="visible";
    }
  } ;
  lambda.addEventListener( 'focusout' , script_3 );
  lambda.addEventListener( 'focusout' , script_4 );
  lambda.addEventListener( 'focusout' , script_4 );
  lambda.addEventListener( 'focusout' , script_5 );
}/*eventsandbox*/

{/*eventsandbox*/
/*   phonepost=document.querySelector("#phone .posterior");
  phonepost.onclick=function(e){
    redlog("phonepost.onclick","start");
    let post   = e.target;
    let parent = post.closest(".record-stack");
    appendBlankRecord(parent.id);
  }; */
}/*eventsandbox*/
{/*eventsandbox*/
  const postonclick=function(e){
    let post   = e.target;
    let parent = post.closest(".record-stack");
    redlog("postonclick",parent.id);
    appendBlankRecord(parent.id);
  };
  document.querySelectorAll(".posterior").forEach(lambda => lambda.onclick=postonclick )
}/*eventsandbox*/
{/*eventsandbox*/
  glob=undefined;
  const deleteonclick=function(e){
    let rmbut   = e.target;
    let parent  = rmbut.closest(".record");
    redlog("deleteonclick","got: "+parent.querySelector(".timestamp .words").innerHTML);
    // glob=parent;
    parent.remove(parent);
  };
  document.querySelectorAll(".timestamp .icon").forEach(lambda => lambda.onclick=deleteonclick )
}/*eventsandbox*/