          <h1 class="sub-header">Listado de personajes</h1>
          <div id="operations">
          	<!-- Añadir personaje -->
            <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#addCharacterDiv">Añadir personaje</button>
            <!-- Eliminar personaje -->
            <button id="deleteButton" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#deleteCharacterDiv">Eliminar personaje</button>
          </div>

          <!-- Ventanas modales de personaje -->
          @include('modalCharacter')

          <div class="table-responsive">
            <table class="table table-striped">
              
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Clan</th>
                  <th>Descripción</th>
                  <th>Origen</th>
                  <th>Narrador</th>
                </tr>
              </thead>
              
              <tbody id="charactersList">

              </tbody>
              <tfoot>
              	<tr>
              		<th></th>
              		<th></th>
              		<th></th>
              		<th></th>
              		<th></th>
                  	<th>
                  		<ul id="characterPaginator" class="pagination">
						</ul>
						<input type="hidden" id="actualPage" value="1" />
                  	</th>
              	</tr>
              </tfoot>
            </table>
          </div>
          
		<script id="characters-template" type="text/x-handlebars-template">
		@{{#each characters}}
		<tr>
			<td>
				<input name="characterId" type="checkbox" value="@{{id}}"/>
			</td>
   	 		<td>@{{name}}</td>
    		<td>@{{clan}}</td>
    		<td>@{{desc}}</td>
    		<td>@{{origin}}</td>
    		<td>@{{user_name}}</td>
		</tr>
		@{{/each}}
		</script>
				
			