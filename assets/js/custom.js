$('[data-sidenav]').sidenav();

$(function() {
  $('a[href="#search"]').on("click", function(event) {
    event.preventDefault();
    $("#search").addClass("open");
    $('#search > form > input[type="search"]').focus();
  });

  $("#search, #search button.close").on("click keyup", function(event) {
    if (
      event.target == this ||
      event.target.className == "close" ||
      event.keyCode == 27
    ) {
      $(this).removeClass("open");
    }
  });

  $("form").submit(function(event) {
    event.preventDefault();
    return false;
  });
});

$('.category-shop-slider .owl-carousel').owlCarousel({
	loop: false,
	nav: true,
	dots: true,
	mouseDrag: false,
	margin: 50,
    responsiveClass: true,
    responsive:{
        0:{
            items:1,
			dots:false,
        },
        600:{
            items:2,
			dots:false,
        },
        1000:{
            items:3,
        }
    }
})

$('.most-popular-shop-slider .owl-carousel').owlCarousel({
	loop: false,
	nav: true,
	dots: true,
	mouseDrag: false,
	margin: 30,
    responsiveClass: true,
    responsive:{
        0:{
            items:1,
			dots:false,
        },
        600:{
            items:2,
			dots:false,
        },
        1000:{
            items:4,
        }
    }
})

$(document).ready(function() {
  $(".accordion").on("click", function() {
    $(this).toggleClass("active");
    $(this).next().slideToggle(200);
  });
});
