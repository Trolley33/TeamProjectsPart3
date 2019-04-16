(function ($) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	 /* This was written without jQuery prepared, so can be converted at some point */

	document.addEventListener('DOMContentLoaded', function () {
		// Put a page break after the label to match the rest of the style.
		var tag_br = document.createElement('BR');
	    var tag_label = document.getElementById('wpas_ticket-tag');
	    var os_br = document.createElement('BR');
	    var os_label = document.getElementById('wpas_OS');
	    var hardware_br = document.createElement('BR');
	    var hardware_label = document.getElementById('wpas_hardware');
	    var software_br = document.createElement('BR');
	    var software_label = document.getElementById('wpas_software');

	    if (tag_label !== null && os_label !== null && hardware_label !== null && software_label !== null)
	    {
	    	tag_label.labels[0].after(tag_br);
	    	os_label.labels[0].after(os_br);
	    	hardware_label.labels[0].after(hardware_br);
	    	software_label.labels[0].after(software_br);
		}
	   
	    var filter = document.getElementById('wpas_filter');

	    if (filter !== null) {
	    	filter.addEventListener('keyup', 
	    		function (event) 
	    		{
	    			if (event.keyCode !== 13)
	    			{
	    				return;
	    			}

	    			var val = this.value.toLowerCase();
	        		var list = document.getElementById('wpas_ticketlist');
	        		var rows = list.children[1].children;
	        		for (let i=0; i < rows.length; i++) {
	        			if (!rows[i].innerText.toLowerCase().includes(val))
	        			{
	        				rows[i].hidden = true;
	        			}
	        			else
	        			{
	        				rows[i].hidden = null;
	        			}
	        		}
	    		}, false);

	    	var clear_filter = document.getElementsByClassName('wpas-clear-filter');
	    	if (clear_filter.length !== 0)
	    	{
	    		clear_filter[0].addEventListener('click', function (event) {
	    				filter.value = "";
	    				var list = document.getElementById('wpas_ticketlist');
	    				var rows = list.children[1].children;
	    				for (let i=0; i < rows.length; i++) 
	    				{  
							rows[i].hidden = null;
						}
	    		}, false);
	    	}
	    }

	    // Sort list of table items.
		var table, rows, switching, i, x, y, shouldSwitch;
		table = document.getElementById("wpas_ticketlist");
		switching = true;
		/* Make a loop that will continue until
        no switching has been done: */
		while (switching) {
			// Start by saying: no switching is done:
			switching = false;
			rows = table.rows;
			/* Loop through all table rows (except the
            first, which contains table headers): */
			for (i = 1; i < (rows.length - 1); i++) {
				// Start by saying there should be no switching:
				shouldSwitch = false;
				/* Get the two elements you want to compare,
                one from current row and one from the next: */
				x = rows[i].getElementsByTagName("TD")[0];
				y = rows[i + 1].getElementsByTagName("TD")[0];
				// Check if the two rows should switch place:
				if (Number(x.innerHTML) < Number(y.innerHTML)) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
			if (shouldSwitch) {
				/* If a switch has been marked, make the switch
                and mark that a switch has been done: */
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
			}
		}
	}, false);
})(jQuery);
