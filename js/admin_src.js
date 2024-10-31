function eddmp_admin()
{
	if(typeof eddmp_admin_evaluated != 'undefined') return;
	eddmp_admin_evaluated = true;

	var $ = jQuery;

	// Delete buttons
	$( document ).on(
		'click',
		'.eddmp-delete',
		function(evt)
		{
			evt.preventDefault();
			$(this).closest('tr').remove();
		}
	);

	// Add button
	$( document ).on(
		'click',
		'.eddmp-add',
		function(evt)
		{
			evt.preventDefault();
			var row = '<tr><td><input aria-label="File title" type="text" class="eddmp-file-name" placeholder="'+eddmp['File Name']+'" name="_eddmp_file_names[]" value="" /></td><td><input aria-label="File URL" type="text" class="eddmp-file-url" placeholder="http://" name="_eddmp_file_urls[]" value="" /></td><td width="1%"><a href="#" class="button eddmp-select-file">'+eddmp['Choose file']+'</a></td><td width="1%"><a href="#" class="eddmp-delete">'+eddmp['Delete']+'</a></td></tr>';
			$(this).closest('table').find('tbody').append(row);
		}
	);

	//
	$( document ).on(
		'change',
		'[name="_eddmp_own_demos"]',
		function()
		{
			$('.eddmp-demo-files')[ ( this.checked ) ? 'show' : 'hide' ]();
		}
	);

	// Select file button
	$( document ).on(
		'click',
		'.eddmp-select-file',
		function(evt)
		{
			evt.preventDefault();
			var field = $(this).closest('tr').find('.eddmp-file-url'),
				media = wp.media(
							{
								title: eddmp['Select audio file'],
								library:{ type: 'audio' },
								button: { text: eddmp['Select Item'] },
								multiple: false
							}
						).on(
							'select',
							(function( field ){
								return function() {
									var attachment = media.state().get('selection').first().toJSON(),
										url = attachment.url;
									field.val( url );
								};
							})( field )
						).open();
		}
	);

	// Main code
	$('.eddmp-add').trigger('click');
}

jQuery(eddmp_admin);
jQuery(window).on('load', eddmp_admin);