function unfold_current_page(base_name, hd_context) {
	var this_panel = $('#site-navigation .panel-collapse[data-nav-ref="' + base_name + '"]');
	var this_panel_body = $('#site-navigation .sidenav-ref[data-nav-ref="' + base_name + '"]');
	var panels_to_unfold = $(this_panel).parents("#site-navigation .panel-collapse");
	panels_to_unfold.addClass("panel-body-current").parent().addClass('sidenav-panel-current');
	this_panel.addClass("panel-body-current").parent().addClass('sidenav-panel-current');

	$(this_panel_body).attr("href", hd_context.hd_basename + "#");

    /* Make sure we are already fully unfolded when the function returns,
     * so that scroll can reach the exact spot */
    $.support.transition = false;
	panels_to_unfold.collapse("show");
	this_panel.collapse("show");
    $.support.transition = true;

	return this_panel;
}

/* TODO reenable scrolling to current page */
function scroll_to_current_page(hd_context) {
	var this_panel = unfold_current_page(hd_context.extension + "-" + hd_context.project_name + "-" + hd_context.hd_basename, hd_context);

	if ($(this_panel).length) {
        console.log("Ya", this_panel.offset().top);

        $('html').get(0).scrollTo({top: this_panel.offset().top - hd_context.navbar_height});
        //$(this_panel).get(0).scrollIntoView();
		//wrapper.mCustomScrollbar("scrollTo", this_panel.offset().top - wrapper.offset().top - $('#topnav').height() + 8);
	}
}

console.log("Hm");

window.addEventListener('message', event => {
    console.log ("Magic!", event.data);
    scroll_to_current_page(event.data);
});

$(document).ready(function() {
    window.parent.postMessage("ready", "*");
});
