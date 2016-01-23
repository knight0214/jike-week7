$(function() {
    //用来控制top-search焦点获取事件
    $('.top-search-inner').focus(function() {
        $('.top-search-btn').addClass('onfocus');
        $('.top-hot-words').hide();
    });
    $('.top-search-inner').focusout(function() {
        $('.top-search-btn').removeClass('onfocus');
        $('.top-hot-words').show();
    });
    //用来控制main-left-nav部分的菜单切换事件
    $('.main-left-li').each(function(index) {
        var liNode = $(this);
        liNode.mouseover(function() {
            $('.main-left-nav').addClass('actived-nav');
            $('.hidden-line').hide();
            $('.lesson-list-show').eq(index).show();
        });
        liNode.mouseout(function() {
            $('.main-left-nav').removeClass('actived-nav');
            $('.hidden-line').show();
            $('.lesson-list-show').eq(index).hide();
        });
    });
    //用来控制图片轮播
    bannerControl();
    //用来控制hot-lesson的标签切换
    $('.hot-lesson-nav>li').each(function(index) {
        var liNode = $(this);
        liNode.hover(function() {
            $('.actived-hot-lesson-li').removeClass('actived-hot-lesson-li');
            $('.actived-hot-lesson-list').removeClass('actived-hot-lesson-list');
            liNode.addClass('actived-hot-lesson-li');
            $('.hot-lesson-list').eq(index).addClass('actived-hot-lesson-list');
        });
    });
    //用来控制每个hot-lesson-list中的内容显示
    $('.hot-lesson-list>li').each(function(index) {
        var liNode = $(this);
        liNode.hover(function() {
            $('.lesson-play').eq(index).show();
            $('.more-info').eq(index).fadeIn(200);
            $('.level').eq(index).show();
            $('.learn-num').eq(index).show();
            $('.lesson-info').eq(index).animate({
                'height': '175px'
            }, 300);
        }, function() {
            $('.lesson-play').eq(index).hide();
            $('.more-info').eq(index).fadeOut(200);
            $('.level').eq(index).hide();
            $('.learn-num').eq(index).hide();
            $('.lesson-info').eq(index).animate({
                'height': '88px'
            }, 300);
        });
    });
    //用来控制title-icon的hover事件
    $('.title-icon').each(function(index) {
        var spanNode = $(this);
        spanNode.hover(function() {
            $('.title-info').eq(index).fadeIn(200);
        }, function() {
            $('.title-info').eq(index).fadeOut(200);
        });
    });
    //用来控制learn-card的hover事件
    showBorder('.learn-card', 4);
    //用来控制wiki的hover事件
    showBorder('.wiki-card', 2);
    //用来控制图片走马灯
   bannerControl2('.ep-banner','.ep-banner ul','.ep-banner ul li',6,'.ep-banner>.banner-left','.ep-banner>.banner-right');
   bannerControl2('.un-banner','.un-banner ul','.un-banner ul li',7,'.un-banner>.banner-left','.un-banner>.banner-right');
   bannerControl2('.mr-banner','.mr-banner ul','.mr-banner ul li',6,'.mr-banner>.banner-left','.mr-banner>.banner-right');
   //用来返回顶部
   goToTop('.gototop-btn');
   //用来删除广告
   delAd('.close-1','.float-ad-1');
   delAd('.close-2','.float-ad-2');
});
// 用来控制图片轮播
function bannerControl() {
    /*轮播*/
    var index = 1; //记录图片的指向位置
    var jindex = 0; //记录焦点的指向位置
    var jdlis = $('.swiper-pagination-switch'); /*焦点元素集合*/
    var timer; //用来承载定时器
    var liWidth = $('.swiper-wrap').width();
    var len = $('.swiper-wrap ul li').length; //轮播图片的总数
    var jlen = jdlis.length;
    //左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
    $('.swiper-wrap ul').css('width', liWidth * (len));
    $('.swiper-wrap ul').css("left", -liWidth);
    //上一张按钮
    $(".index-banner>.banner-left").click(function() {
        clearInterval(timer);
        jindex -= 1;
        index -= 1;
        if (jindex == -1) {
            jindex = jlen - 1;
        }
        if (index == -1) {
            $('.swiper-wrap ul').css('left', -(len - 2) * liWidth);
            index = len - 3;
        }
        showPic(jindex, index);

    });

    //下一张按钮
    $(".index-banner>.banner-right").click(function() {
        clearInterval(timer);
        jindex += 1;
        index += 1;
        //判断焦点的指向位置到头时，返回到初始位置
        if (jindex == jlen) {
            jindex = 0
        }
        //当图片移动到最后一张图，即重复图时变换ul的位置和图片指向的位置    
        if (index == len) {
            $('.swiper-wrap ul').css('left', -liWidth);
            index = 2;
        }
        showPic(jindex, index);

    });
    //轮播
    $('.swiper-wrap').hover(function() {
        clearInterval(timer); /*停止动画*/
        $('.index-banner>.banner-btn').show();
    }, function() {
        $('.index-banner>.banner-btn').hide();
        timer = setInterval(function() {
            jindex += 1;
            index += 1;
            //判断焦点的指向位置到头时，返回到初始位置
            if (jindex == jlen) {
                jindex = 0
            }
            //当图片移动到最后一张图，即重复图时变换ul的位置和图片指针的位置    
            if (index == len) {
                $('.swiper-wrap ul').css('left', -liWidth);
                index = 2;
            }
            showPic(jindex, index);
        }, 2000);
    }).trigger("mouseleave");
    /*显示index图片*/

    function showPic(jindex, index) {
        var nowLeft = -index * liWidth;
        jdlis.eq(jindex).addClass('swiper-active-switch');
        jdlis.not(jdlis.eq(jindex)).removeClass('swiper-active-switch');
        $('.swiper-wrap ul').animate({
            "left": nowLeft
        }, 1000);
    }
    /*$('#loginimg').hide().fadeIn(1000);*/
    $('.index-banner>.banner-btn').mouseover(function() {
        $('.index-banner>.banner-btn').show();
    });
    /*点击焦点区显示对应图*/
    jdlis.click(function() {
        clearInterval(timer);
        jindex = jdlis.index(this);
        index = jindex + 1;
        showPic(jindex, index);
    });

}
//用来控制不带焦点的图片走马灯
//bannerName:显示区域
// ulName:整体图片区域
// liName:单个图片
// showNum:同时显示图片的数量
// preBtn:上一个按钮
// nextBtn:下一个按钮
function bannerControl2(bannerName,ulName,liName,showNum,preBtn,nextBtn) {
    var index; //用来记录图片的位置
    index = showNum;
    var len = $(liName).length; //用来记录图片的总数
    var bannerWidth = $(bannerName).width();
    $(liName).css('width', bannerWidth / showNum);
    var liWidth = bannerWidth / showNum; //定义移动的位移
    $(ulName).css('width', liWidth * (len));
    $(ulName).css('left', -index * liWidth);
    //上一张按钮
    $(preBtn).click(function() {
        index -= 1;
        //当图片移动到最后一屏，即有重复图时变换ul的位置和图片指向的位置
        if (index == -1) {
            $(ulName).css('left', -(len - 2 * showNum) * liWidth);
            index = len - 2 * showNum - 1;
        }
        showPic(index);
    });

    //下一张按钮
    $(nextBtn).click(function() {
        index += 1;
        //当图片移动到最后一屏，即有重复图时变换ul的位置和图片指向的位置 
        if (index == (len - showNum)) {
            $(ulName).css('left', -(showNum - 1) * liWidth);
            index = showNum;
        }
        showPic(index);
    });
    //按钮显示问题
    $(bannerName).hover(function() {
        $(preBtn).fadeIn();
        $(nextBtn).fadeIn();
    },function() {
        $(preBtn).fadeOut();
        $(nextBtn).fadeOut();
    });

    //显示图片 
    function showPic(index) {
        var nowLeft = -index * liWidth;
        $(ulName).animate({
            "left": nowLeft
        }, 500);
    }
}
//用来控制边框的hover事件
function showBorder(className, keyIndex) {
    $(className).each(function(index) {
        var liNode = $(this);
        liNode.hover(function() {
            if (index < keyIndex) {
                liNode.css('border-color', '#35b558');
                $(className).eq(index + 1).css('border-left-color', '#35b558');
            } else if (index == keyIndex) {
                liNode.css('border-color', '#35b558');
            } else if (index > keyIndex) {
                liNode.css('border-color', '#35b558');
                $(className).eq(index + 1).css('border-left-color', '#35b558');
                $(className).eq(index - (keyIndex + 1)).css('border-bottom-color', '#35b558');
            }
        }, function() {
            if (index < keyIndex) {
                liNode.css('border-color', '#E4E4E4');
                $(className).eq(index + 1).css('border-left-color', '#E4E4E4');
            } else if (index == keyIndex) {
                liNode.css('border-color', '#E4E4E4');
            } else if (index > keyIndex) {
                liNode.css('border-color', '#E4E4E4');
                $(className).eq(index + 1).css('border-left-color', '#E4E4E4');
                $(className).eq(index - (keyIndex + 1)).css('border-bottom-color', '#E4E4E4');
            }
        });
    });
}
//用来返回顶部
function goToTop(gototopBtn) {
    var goToTop = $(gototopBtn).hide();
    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            goToTop.fadeIn();
        } else {
            goToTop.fadeOut();
        }
    });
    goToTop.click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        // return false;
    });
}
//用来删除ad
function delAd(closeBtn,adName){
    $(closeBtn).click(function(){
        $(adName).remove();
    });
}
