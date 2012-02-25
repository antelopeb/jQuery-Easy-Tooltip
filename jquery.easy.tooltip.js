/*
custom tooltip for jQuery

v 0.1

Author: Greg Davis
http://www.monsterworksdesign.com/

Takes options of topOffset to help align properly
and structure to allow the user to indicate their own 
string of HTML for the structure. To do this, one needs
to indicate a container with the class of "tooltipContent"
for the title to be written correctly.

Usage - 
create a href link with a class of "easyTooltip" and give it a title with the
information you want in the tooltip.
Then put in your document.ready:

$easy_tooltip(".easyTooltip", {
	topOffset: [an integer value],
	structure: [an HTML string for layout]
});

All options are optional. Tee-hee.
*/


;(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	//create the tooltip
	$easy_tooltip = function (items, options) {
		$(items).each(function(i){
			var data = $(this).attr("title");
			
			$easy_tooltip.render.init(data, i, options);
						
			$(this).bind({
				mouseover: function(){$easy_tooltip.show(this, i, options)},
				mouseout: function(){$easy_tooltip.close(this, data, i)}
			})
		});
	};
	
	$easy_tooltip.close = function(item, data, i) {
		//animation is nice, but it slows it down and causes problems
		//$('#tooltipMaster').hide('fast', function(){ $easy_tooltip.render.destroy() });
		//straight out destroy for better performance
		$easy_tooltip.render.hideTooltip(i);
		$(item).attr("title", data);
	};
	
	$easy_tooltip.show = function(item, i, options) {
		$easy_tooltip.render.showTooltip(item, i, options);
		$(item).removeAttr("title");
	};
	
	$easy_tooltip.defaults = {
		topOffset: 0, //must be an integer value, defines offset at top of tooltip
		structure: '<span class="tooltipContent"></span>' //a literal string structure to enclose the tooltip. Div for content must have class="tooltipContent"
	};
	
	$easy_tooltip.render = {
		tooltip: {},
		init: function(data, i, options) {
			var tip = this;

			tip.options = $.extend({}, $easy_tooltip.defaults, options);
			
			//make the container and hide it
			this.container = $('<div></div>')
				.attr('id','tooltip' + i)
				.addClass('tooltipMaster')
				.css({
					position: 'fixed',
					display: 'none',
					zIndex: '1000'
				});
			
			//append the container to the body
			$('body').append(this.container);
			
			//add the structure string to the master container
			$('#tooltip' + i).append(tip.options.structure);
			
			//add the data passed in
			$('#tooltip' + i + ' .tooltipContent').append(data);
			data = '';
			
		},
		showTooltip: function(item, i, options) {
			$('#tooltip' + i).css({display:'block'});
			
			var offset = $(item).offset(),
				width = $(item).width(),
				windowWidth = $(document).width(),
				itemWidth = $('#tooltip' + i).width();
			
			if((offset.left + itemWidth) < windowWidth) {
				//left tooltip
				$('#tooltip' + i).removeClass('tooltip-right');
				$('#tooltip' + i).css({
					left: offset.left+width+15 + 'px',
					top: offset.top-options.topOffset + 'px'
				})
			}
			else {
				//right tooltip
				$('#tooltip' + i).addClass('tooltip-right');
				$('#tooltip' + i).css({
					left: offset.left-itemWidth-15 + 'px',
					top: offset.top-options.topOffset + 'px'
				})
			}
			
		},
		hideTooltip: function(i) {
			$('#tooltip' + i).css({display:'none'});
		}
	};
	
}));