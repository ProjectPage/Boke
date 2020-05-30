

// 将选择的图片展示在页面中
var file = document.querySelector('#file');
var preview = document.querySelector('.preview');
file.onchange = function(){
    var fileread = new FileReader();
    fileread.readAsDataURL(this.files[0]);
    fileread.onload = function(){
        preview.src = fileread.result
    }
}