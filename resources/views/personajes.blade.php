          <h1 class="sub-header">Listado de personajes</h1>
          <div id="operations">
            <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#addCharacterDiv">Añadir personaje</button>
          </div>

          <!-- Añadir personaje -->
          @include('addCharacter')

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
              
              <tbody>
                @foreach ($characters as $character)
                <tr>
                  <td></td>
                  <td>{{ $character->chr_name }}</td>
                  <td>{{ $character->chr_clan }}</td>
                  <td>{{ $character->chr_desc }}</td>
                  <td>{{ $character->chr_origin }}</td>
                  <td>{{ $character->chr_user_id }}</td>
                </tr>
                @endforeach
              </tbody>
            </table>
          </div>