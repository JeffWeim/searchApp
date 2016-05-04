(function(){

	// AJAX Calls
	$('#submit').on('click', function(){
		$.ajax({
			url: '/info',
			type: 'GET',
			success: function(data) {
				handleData(data);
			},
			error: function(error) {
				console.log(error);
			}
		});
	});

	$('#search_submit').on('click', function() {
		event.preventDefault();

		var query = $('#search_value').val();

		$.ajax({
			url: '/info-search',
			type: 'POST',
			data: {
				"query": query
			},
			success: function(data) {
				handleData(data);
			},
			error: function(error) {
				console.log(error);
			}
		});
	});

	// Data Handler Functions
	var handleData = function(data) {
		var mappedData = $.map(data.responseData.entries, function(i) {
			return i;
		});

		$('tr').remove();

		$.each(mappedData, function(index, data) {

			$('#news-output').append(
				'<tr>' +
					'<td>' + '<span id="index">' + (index + 1)+ ')</span>' + '<a href=" ' + data.link + ' ">' + data.title + '</a></td>' +
				'</tr>' +
				'<tr>' +
					'<td>' + data.contentSnippet + '</td>' +
				'</tr>'
				);
		});
	};
})();