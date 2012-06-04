/* Author:Jeph Johnson
 * A jQuery plugin for comparing items side by side. This plugin runs in conjunction with Isotope v1.5.19 by David DeSandro / Metafizzy 
 * Compare items side by side
 * http://jephjohnson.com
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/orojeph/jQuery-Compare
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
									
									$(o.checkboxes).change(function () {

        						var index = $(o.checkboxes).index(this);
        						var $previousSelected = $(o.active);

										if ($(this).is(":checked")) {
																				
											$(o.myclass).each(function (i) {
															if (i== index) {
																		$(this).addClass(activated);
																		if ($(o.checkboxes).filter(':checked').length > 1) {
																				if ( !$previousSelected.hasClass(activated) ) {
                                           $previousSelected.addClass(activated);
                                          }
																				container.isotope('updateSortData', $(this)).isotope('updateSortData', $previousSelected).isotope();
																			}
															}
												});
										}
										else  {
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
