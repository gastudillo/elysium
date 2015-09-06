<!-- Añadir personaje -->
<div id="addCharacterDiv" class="modal fade characterModal" role="dialog">

    <!-- Modal content-->
    <div class="modal-content">
    	<div class="modal-header">
        	<button type="button" class="close" data-dismiss="modal">&times;</button>
        	<h4 class="modal-title">Añadir personaje</h4>
      	</div>
    
	    <div class="modal-body">

	    	<div id="modalBodyForm">
			<form id="addCharacterForm" class="form-horizontal" action="<?php print(url('/admin/characters/add', $parameters = array(), $secure = null)); ?>">

				{!! csrf_field() !!}

				<div id="nameGroup" class="form-group">
					<label for="chr_name" class="col-sm-2 control-label">Nombre</label>
					<div class="col-sm-10">
						<input type="text" id="chr_name" name="chr_name" value="" placeholder="Introduce el nombre" class="form-control" required/>
					</div>
				</div>

				<div class="form-group">
					<label for="chr_clan" class="col-sm-2 control-label">Clan</label>
					<div class="col-sm-10">
						<select id="chr_clan" name="chr_clan" class="form-control">
							<option value="0">Selecciona clan</option>
							@foreach ($clans as $clan)
							<option value="{{ $clan->cln_id }}">{{ $clan->cln_name }}</option>
							@endforeach	
						</select> 
					</div>
				</div>

				<div class="form-group">
					<label for="chr_desc" class="col-sm-2 control-label">Descripción</label>
					<div class="col-sm-10">
						<textarea id="chr_desc" name="chr_desc" class="form-control" rows="4" cols="50" placeholder="Introduce una descripción"></textarea> 
					</div>
				</div>

				<div class="form-group">
					<label for="chr_origin" class="col-sm-2 control-label">Origen</label>
					<div class="col-sm-10">
						<input type="text" id="chr_origin" name="chr_origin" value="" placeholder="Introduce el origen" class="form-control"/>
					</div>
				</div>

			</form>
	    	</div>
	    </div>
	    
	    <div class="modal-footer">
			<button type="button" class="btn btn-default" id="saveCharacter">Guardar</button>
	    	<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
	    </div>
    </div>

</div>

<!-- Eliminar personaje -->
<div id="deleteCharacterDiv" class="modal fade characterModal" role="dialog">

    <!-- Modal content-->
    <div class="modal-content">
    	<div class="modal-header">
        	<button type="button" class="close" data-dismiss="modal">&times;</button>
        	<h4 class="modal-title">Eliminar personaje</h4>
      	</div>
    
	    <div class="modal-body">

	    	<div id="modalBodyForm">
	    		¿Seguro que quieres eliminar el personaje?
	    	</div>
	    </div>
	    
	    <div class="modal-footer">
			<button type="button" class="btn btn-default" id="deleteCharacter">Eliminar</button>
	    	<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
	    </div>
    </div>

</div>
