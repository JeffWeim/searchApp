(function(){

	//AJAX Calls
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

		$('li').remove();

		$.each(mappedData, function(index, value) {
			$('#news-output').append('<li><a href=" ' + value.link + ' ">' + value.title + '</a></li><li>' + value.contentSnippet + '</li>');
		});
	};
})();