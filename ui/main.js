
var button=document.getElementById('counter');
var counter=0;
/* button.onclick=function () {
  counter=counter+1;
  var s=document.getElementById('count');
  s.innerHTML=counter.toString();
}; */
 button.onclick=function(){
    //create a request object
    var request=new XMLHttpRequest();
    //capturing the response and store it in the variable
    request.onreadystatechange=function(){
        if(request.readystate===XMLHttpRequest.DONE)
        {//take some ACTION
        if(request.status==200)
        {
         var counter=request.responseText;
         var span=document.getElementById('count');
         span.innerHTML=counter.toString();
         }
        }
        
    };
    //making the request
    request.open('GET','http://charanreddyanumula.imad.hasura-app.io/counter',true);
    request.send(null);
};

var button = document.getElementById('counter');

button.onclick = function() {

//Creat a request object
var request = new XMLHttpRequest();

//Capture the response and state and store it in a varible
request.onreadystatechange = function () {
  if (request.readyState === XMLHttpRequest.DONE) {
      //Take some action
      if (request.status === 200) {
          var counter = request.responseText;
          var span = document.getElementById('count');
          span.innerHtml = counter.toString();
      }
  }
  // Not done yet
};

// Make the request
request.open('GET', 'http://kumarankitx022.imad.hasura-app.io/counter', true);
request.send(null);
};


//->names-code:
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
   /* var names=['name1','name2','name3'];
    var list='';
    for(var i=0;i<names.length;i++)
        {list+='<li>'+names[i]+'</li>';}
 //->linkling submit and webpage
 */
 
 //create a request object
    var request=new XMLHttpRequest();
    //capturing the response and store it in the variable
    request.onreadystatechange=function(){
        if(request.readystate===XMLHttpRequest.DONE)
        {//take some ACTION
        if(request.status==200)
        {//capture a list of names and rendure them
          var list='';
         for(var i=0;i<names.length;i++)
        {list+='<li>'+names[i]+'</li>';
         }
         
        var ul=document.getElementById('namelist');
         ul.innerHTML=list;}

        }
        
    };
    //making the request
    var nameInput=document.getElementById('name');
    var name=nameInput.value;
    request.open('GET','http://charanreddyanumula.imad.hasura-app.io/submit-name?name='+name,true);
         request.send(null);
};
