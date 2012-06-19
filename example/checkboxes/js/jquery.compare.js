/* Author:Jeph Johnson
 * A jQuery plugin for comparing items side by side. This plugin runs in conjunction with Isotope v1.5.19 by David DeSandro / Metafizzy 
 * Compare items side by side
 * http://jephjohnson.com
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/jephjohnson/jQuery-Compare
*/
(function($){
    $.fn.extend({
        compare: function(options) {
					
						var defaults = {
                myclass: "",
								myid: "",
                checkboxes: "",
								active: ""
            };
             
            var options = $.extend(defaults, options);
         
            return this.each(function() {
                  var o =options;
                  var container = $(this);
									var activated = o.active.replace(".", "");
									
                 //if we are using checkboxes, uncheck them all when loading the page//
								 	$(o.checkboxes).filter(':checked').each(function () {
        						this.checked = false;
    							});
									
									container.isotope({
											itemSelector: $(o.myclass),
											itemPositionDataEnabled: true,
											transformsEnabled: false,
											masonry: {
													columnWidth: 30
											},
											getSortData: {
													selected: function ($item) {
															return ($item.hasClass(activated) ? -1000 : 0) + $item.first();
													}
											},
											sortBy: activated
									})
																		
									$(o.myclass).each(function (i, l) {
        						$(this).attr('id', o.myid + i);
    							});
									
									$(o.checkboxes).click(function () {
										
										var index = $(o.checkboxes).index(this);
        						var $previousSelected = $(o.active);
									
      							if(!(o.checkboxes=='input')){
											$(this).toggleClass(activated);
										}
										
										if($(this).hasClass(activated) || $(this).is(":checked")){
													$(o.myclass).each(function (i) {
																	if (i== index) {
																				$(this).addClass(activated);
																				if($(window).height()<container.height()){
																						$('html, body').delay(200).animate({scrollTop:0}, 700);
																				}
																				if ($(o.active).length > 1) {
																						if ( !$previousSelected.hasClass(activated) ) {
																							 $previousSelected.addClass(activated);
																							}
																						container.isotope('updateSortData', $(this)).isotope('updateSortData', $previousSelected).isotope();
																						}
																		}
															});
											}
											else {
												$(o.myclass).each(function (i) {
													if (i == index) {
															$(this).removeClass(activated);
															$previousSelected.hasClass(activated);
															container.isotope('updateSortData', $(this)).isotope('updateSortData', $previousSelected).isotope();
														}
													
												});
											}
   							 	});
						});
        }
    });
})(jQuery);
