var min_w = 300; // minimum video width allowed
var vid_w_orig;  // original video dimensions
var vid_h_orig;

jQuery(function() { // runs after DOM has loaded

    vid_w_orig = parseInt(jQuery('video').attr('width'));
    vid_h_orig = parseInt(jQuery('video').attr('height'));
    $('#debug').append("<p>DOM loaded</p>");

    jQuery(window).resize(function () { resizeToCover(); });
    jQuery(window).trigger('resize');
});

function resizeToCover() {

    // set the video viewport to the window size
    jQuery('#video-background').width(jQuery(window).width());
    jQuery('#video-background').height(jQuery(window).height());

    // use largest scale factor of horizontal/vertical
    var scale_h = jQuery(window).width() / vid_w_orig;
    var scale_v = jQuery(window).height() / vid_h_orig;
    var scale = scale_h > scale_v ? scale_h : scale_v;

    // don't allow scaled width < minimum video width
    if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

    // now scale the video
    jQuery('video').width(scale * vid_w_orig);
    jQuery('video').height(scale * vid_h_orig);
    // and center it by scrolling the video viewport
    jQuery('#video-background').scrollLeft((jQuery('video').width() - jQuery(window).width()) / 2);
    jQuery('#video-background').scrollTop((jQuery('video').height() - jQuery(window).height()) / 2);
};

$(function() {
    $(document).scroll(function() {
        var $nav = $('.bg-faded'); 
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});