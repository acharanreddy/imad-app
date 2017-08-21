console.log('Loaded!');
var button=document.getElementById('counter');

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
         var span=document.getElementById('count')
         spam.innerHTML=counter.toString();
         }
        }
        
    };
    //making the request
    request.open('GET','http://charanreddyanumula.imad.hasura-app.io/counter',true);
    request.send(null);
}
var nameInput=document.getElementById('name');
var name=nameInput.value;
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
    var names=['name1','name2','name3'];
    var list='';
    for(var i=0;i<names.length;i++)
        {list+='<li>'+names[i]+'</li>';}
}
var ul=document.getElementById('namelist');
ul.innerHTML=list;
