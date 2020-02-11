function initSlack() {
  jQuery('.image-carousel.slack').slick({
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true
  });
};

function initMenu() {
	jQuery('.mobile-menu-toggle').click( function(e) {
		e.preventDefault();
		jQuery('html').toggleClass('menuActive');
	});
	jQuery('.has-sub-menu a.sub-menu-toggle').click(function(e) {
		e.preventDefault();
		jQuery(this).parent('.has-sub-menu').children('.sub-menu-wrapper').toggleClass('open');
	});
}

function initBag() {
	jQuery('.add-to-cart').click( function(e) {
		jQuery('html').toggleClass('cartActive');
	});
	jQuery('.mobile-btnBag').click( function(e) {
		e.preventDefault();
		jQuery('html').toggleClass('cartActive');
	});
	jQuery('.mobile-btnBag-close').click( function(e) {
		e.preventDefault();
		jQuery('html').removeClass('cartActive');
	});
	jQuery('.shoppingBagDrawer .hover').on('click', function(e) { 
		jQuery('html').removeClass('cartActive'); 
	});
}

function stickyItem() {
	$(window).load(function() {
		if( $('body.product').length == 1 ) {
			var triggerTop = $('.product-wrapper').offset().top;
			var triggerBottom = triggerTop + $('.product-image-container').height();
			var item = $('.lg-sticky');

			$(window).scroll(function() {
			    var curentScroll = $(window).scrollTop();
				var scrollBottom = $(window).scrollTop() + $(window).height();
			    var isSticky = (triggerBottom <= scrollBottom);
			    if (isSticky == true) {
				    item.addClass('freeze');
				} else {
					item.removeClass('freeze');
			    }
			});
		}
	});
}

function hideNav() {

	if ($(window).width() >= 566) {
		var lastScrollTop = 0;
		$(window).scroll(function(event){
			var st = $(this).scrollTop();

			if (st > lastScrollTop && st > 260) {
				$('.navigation').addClass('hideNav');
			} else {
				$('.navigation').removeClass('hideNav');
			}

			lastScrollTop = st;
		});

		$('.navigation').hover(function() {
			$(this).removeClass('hideNav');
		});
	}

}

jQuery(document).ready(function() {
	initSlack();
	initMenu();
	initBag();
	hideNav();
});
stickyItem();