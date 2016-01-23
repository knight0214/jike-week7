$(function() {
    $(window).load(function() {
        imgLocation();
        var dataImg = {
            "data": [{
                "src": "p10.jpg"
            }, {
                "src": "p11.jpg"
            }, {
                "src": "p12.jpg"
            }, {
                "src": "p13.jpg"
            }, {
                "src": "p14.jpg"
            }, {
                "src": "p15.jpg"
            }, {
                "src": "p16.jpg"
            }, {
                "src": "p17.jpg"
            }, {
                "src": "p18.jpg"
            }, {
                "src": "p19.jpg"
            }, {
                "src": "p20.jpg"
            }]
        };
        window.onscroll = function() {
        	//通过滚动条是否到底部来判断是否要加载新内容
        	 var totalHeight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); 
        	if ($(document).height()<=totalHeight) {
        		  $.each(dataImg.data, function(index, value) {
                    var box = $('<div>').addClass('box').appendTo($('.box-con'));
                    // console.log('./img/'+$(value).attr('src'));
                    var img = $('<img>').attr('src', './img/' + $(value).attr('src')).appendTo(box);
                });
                imgLocation();//加载好box后在执行一遍函数来摆放图片的位置
        	}
            
        };
    });
    goToTop();
});

//用来定义图片的摆放位置
function imgLocation() {
    var con = $('.con');
    var box = $('.box'); //获取所有的box
    // console.log(box);
    var boxWidth = box.eq(0).outerWidth(); //获取每个box的宽度
    var num = Math.floor(con.outerWidth() / boxWidth);
    // console.log(num);
    var boxArr = [];
    box.each(function(index, value) {
        var boxHeight = box.eq(index).outerHeight();
        if (index < num) {
            boxArr[index] = boxHeight;
            // console.log(boxHeight);
        } else {
            var minBoxHeight = Math.min.apply(null, boxArr);
            // console.log(minBoxHeight);
            var minBoxIndex = $.inArray(minBoxHeight, boxArr);
            // console.log(minBoxIndex);
            $(value).css({
                "position": " absolute",
                "top": minBoxHeight,
                "left": box.eq(minBoxIndex).position().left
            });
            boxArr[minBoxIndex] += box.eq(index).outerHeight();
        }
    });

}
//用来设置返回顶部的按钮
function goToTop() {
    var goToTop = $(".backToTop").hide();
    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            goToTop.fadeIn(1500);
        } else {
            goToTop.fadeOut(1500);
        }
    });
    goToTop.click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
}
