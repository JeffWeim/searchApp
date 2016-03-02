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
		console.log(data);

		var mappedData = $.map(data.responseData.entries, function(i) {
			return i;
		});

		$.each(mappedData, function(index, value) {
			$('#anf-news').append('<li><a href=" ' + value.link + ' ">' + value.title + '</a></li>' + value.contentSnippet + '</br>');
		});

	};



})();