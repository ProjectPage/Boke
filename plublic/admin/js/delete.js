// import { func } from "joi"

// 1.获得删除/取消/chacha元素节点对象
// 2.给这个两个节点对象添加点击方法
// 3.删除这个对象呢，他的方法是要给这个对象添加一个classNam
// 4.取消这个对象呢，他的方法是移除那个className
// 5.chaha 也是移除那个className



var table = document.querySelector('table');
var exit = document.querySelector('.exit');
var hidden_bottom_exit = document.querySelector('.hidden-bottom-exit');
var inputHidden = document.querySelector('input[type="hidden"]');
var hidden = document.querySelector('.hidden');
table.addEventListener('click',function(e){
    if(e.target.classList[2] === "delte"){
        inputHidden.value = e.target.parentNode.parentNode.children[0].textContent;
        hidden.classList.add('hidden-show-animation');
    }
},false)
exit.addEventListener('click',function(e){
    hidden.classList.remove('hidden-show-animation');
},false)
hidden_bottom_exit.addEventListener('click',function(e){
    hidden.classList.remove('hidden-show-animation');
},false)

