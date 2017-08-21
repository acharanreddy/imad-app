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