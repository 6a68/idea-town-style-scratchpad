
function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('.details-sticker').offset().top;
    if (window_top > div_top) {
        $('.details-header-wrapper').addClass('stick');
    } else {
        $('.details-header-wrapper').removeClass('stick');
    }
}

$(function () {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
});
