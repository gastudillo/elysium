
$(function() {

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
	  		
	  		});
		}

	});
	
});
