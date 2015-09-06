
function getCharactersPage() {
	
	var pageId = $('#actualPage').val();
	
	var url = baseUrl + "/admin/characters/page/" + pageId;
	
	var source   = $("#characters-template").html();
	var template = Handlebars.compile(source);
	
	$.ajax({
		method: "POST",
		url: url
	}).done(function(data) {
		
		var characters = [];
		for (i = 0; i < data.length; i++) {
			
			var character = data[i];
			
			var id = data[i].chr_id;
			var name = data[i].chr_name;
			var clan = data[i].cln_name;
			var desc = data[i].chr_desc;
			var origin = data[i].chr_origin;
			var userName = data[i].name;
			
			var row = {id: id, name: name, clan: clan, desc: desc, origin: origin, user_name: userName};
			characters.push(row);
			
		}
		
		var context = { characters: characters};
		var html    = template(context);
		
		$('#charactersList').html(html);
		
		// Eventos asociados a la fila
		$("input:checkbox[name='characterId']").click(function () {
			if ($(this).prop('checked')) {
				$("input:checkbox[name='characterId']").prop('checked', false);
				$(this).prop('checked', true);
			}
			
			if ($("input:checkbox[name='characterId']:checked").length == 1) {
				// Mostramos botón
				$('#deleteButton').show();
			} else {
				// Ocultamos
				$('#deleteButton').hide();
			}
			
			//console.log($("input:checkbox[name='characterId']:checked").val());
		});
		
		$('#deleteButton').hide();

	});
	
	// Paginador
	$.ajax({
		method: "POST",
		url: baseUrl + "/admin/characters/count"
	}).done(function(data) {
		console.log(data);
		
		var paginator = '';
		for (i = 1; i <= data; i++) {
			if (pageId == i) {
				// Active
				paginator += '<li class="active"><a href="#">' + i + '</a></li>';
			} else {
				paginator += '<li><a href="#">' + i + '</a></li>';	
			}
		}
		
		$('#characterPaginator').html(paginator);
		
		$('#characterPaginator li').click(function (event) {
			pageSelected = $(this).children('a').html();
			$('#actualPage').val(pageSelected);
			
			getCharactersPage();
			
			event.preventDefault();
		});
		
	});
	
}

$(function() {

	$.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
	});
	
	$('#addCharacterDiv').on('hidden.bs.modal', function (e) {
  		// Limpiamos el formulario
  		$('#nameGroup').removeClass('has-error');

  		$('#chr_name').val('');
  		$('#chr_clan').val(0);
  		$('#chr_desc').val('');
  		$('#chr_origin').val('');

	});

	$('#saveCharacter').click(function () {

		// Validamos que el nombre no sea nulo
		if ($('#chr_name').val() == '') {
			// El nombre no puede ser nulo
			$('#nameGroup').addClass('has-error');
		} else {
			// Action del formulario
			var url = $('#addCharacterForm').attr('action');

			$('#nameGroup').removeClass('has-error');

			$.ajax({
				method: "POST",
	  			url: url,
	  			data: $('#addCharacterForm').serialize()
			}).done(function( msg ) {
	    		$('#addCharacterDiv').modal('hide')
	    		getCharactersPage();
	  		});
		}

	});
	
	$('#deleteCharacter').click(function () {
		
		var id = $("input:checkbox[name='characterId']:checked").val();
		var url = baseUrl + "/admin/characters/delete/" + id;
		
		$.ajax({
			method: "POST",
  			url: url
		}).done(function( msg ) {
    		$('#deleteCharacterDiv').modal('hide');
    		getCharactersPage();
  		});
		
	});
	
	getCharactersPage();
	
});
