var bgtheme = document.getElementsByClassName('bg-wrap');
var textheme = document.getElementsByClassName('text-wrap');
var bordertheme = document.getElementsByClassName('border-wrap');
console.log(bgtheme);
console.log(textheme);
console.log(bordertheme);

function changeTheme(color) {
    localStorage.themeColor = color;
    for (var i = 0; i < bgtheme.length; i++) {
        bgtheme[i].style.background = color;
    }
    for (var j = 0; j < textheme.length; j++) {
        textheme[j].style.color = color;
    }
    for (var k = 0; k < bordertheme.length; k++) {
        bordertheme[k].style.borderColor = color;
    }
}

window.onload=function getTheme() {
   
         var newTheme = localStorage.themeColor;
        for (var i = 0; i < bgtheme.length; i++) {
            bgtheme[i].style.background = newTheme;
        }
        for (var j = 0; j < textheme.length; j++) {
            textheme[j].style.color = newTheme;
        }
        for (var k = 0; k < bordertheme.length; k++) {
            bordertheme[k].style.borderColor = newTheme;
        } 
       
        console.log(newTheme);
    }


