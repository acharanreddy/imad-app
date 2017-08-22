
var button=document.getElementById('counter');
var counter=0;
button.onclick=function () {
  counter=counter+1;
  var s=document.getElementById('count');
  s.innerHTML=counter.toString();
};
