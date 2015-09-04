var Renderer;

$(function() {

	setVariables();

	var repulsion = 75;
	var stiffness = 600;
	var friction = 0.5;
	var gravity = false;
	var fps = 55;
	var dt = 0.02;
	var precision = 0.8;

	var sys = arbor.ParticleSystem(repulsion, stiffness, friction, gravity,
			fps, dt, precision);
	sys.renderer = Renderer("#viewport");	
	
	// Listado de tramas
	var stories = [];
	var characters = [];
	
	// Personajes
	var genericCharacterData = {mass : 15, tipo : "personaje"};
	
	characters['KARSH'] = {name: 'Karsh', data: genericCharacterData};
	
	// Mirmidones de Karsh
	characters['MIRMIDON_1'] = {name: 'Hesiodo', data: genericCharacterData};
	characters['MIRMIDON_2'] = {name: 'Anacreonte', data: genericCharacterData};
	characters['MIRMIDON_3'] = {name: 'Jenofonte', data: genericCharacterData};
	characters['MIRMIDON_4'] = {name: 'Olimpia', data: genericCharacterData};
	characters['MIRMIDON_5'] = {name: 'Demóstenes', data: genericCharacterData};
	
	// Elegidos de Karsh para la Arena
	characters['MIRMIDON_CAIDO'] = {name: 'Iseo', data: genericCharacterData};
	characters['LUCHADOR_1'] = {name: 'Benicio ‘Benni’ Salvatore', data: genericCharacterData};
	characters['LUCHADOR_2'] = {name: 'Akasha', data: genericCharacterData};
	characters['LUCHADOR_3'] = {name: 'Matthew ‘Matt’ Gascoigne', data: genericCharacterData};

	// Corredores de apuestas
	characters['JEFE_CORREDORES'] = {name: 'Alejandra Saíd', data: genericCharacterData};
	characters['CORREDOR_1'] = {name: 'Corredor 1', data: genericCharacterData};
	characters['CORREDOR_2'] = {name: 'Corredor 2', data: genericCharacterData};
	
	characters['MECENAS'] = {name: 'El Toreador', data: genericCharacterData};
	characters['CANTANTE'] = {name: 'La Cantante', data: genericCharacterData};
	
	characters['INFERNALISTA'] = {name: 'El Tremere Elite', data: genericCharacterData};
	characters['ASTOR'] = {name: 'El Tremere Astor', data: genericCharacterData};
	characters['GREAT_HARPIE'] = {name: 'La Arpía Real', data: genericCharacterData};
	characters['HARPIE_1'] = {name: 'Arpía 1', data: genericCharacterData};
	characters['HARPIE_2'] = {name: 'Arpía 2', data: genericCharacterData};
	characters['HARPIE_3'] = {name: 'Arpía 3', data: genericCharacterData};
	characters['HARPIE_4'] = {name: 'Arpía 4', data: genericCharacterData};
	characters['HARPIE_5'] = {name: 'Arpía 5', data: genericCharacterData};
	
	characters['PRIMOGENITO_VENTRUE'] = {name: 'Primogénito Ventrue', data: genericCharacterData};
	characters['PRIMOGENITO_CHIQUILLA'] = {name: 'Chiquilla Primogénito Ventrue', data: genericCharacterData};
	
	characters['BIBLIOTECARIO'] = {name: 'El Bibliotecario', data: genericCharacterData};
	
	characters['PRINCIPE_RAVNOS'] = {name: 'El Príncipe gitano', data: genericCharacterData};
	characters['PRIMOGENITO_BRUJAH'] = {name: 'Primogénito Brujah', data: genericCharacterData};
	characters['PRIMOGENITO_TREMERE'] = {name: 'Primogénito Tremere', data: genericCharacterData};
	characters['PRIMOGENITO_NOSFERATU'] = {name: 'Primogénito Nsoferatu', data: genericCharacterData};
	
	characters['CONTACTO_ANARQUISTA_1'] = {name: 'Anarquista 1', data: genericCharacterData};
	characters['CONTACTO_ANARQUISTA_2'] = {name: 'Anarquista 2', data: genericCharacterData};
	characters['CONTACTO_ANARQUISTA_3'] = {name: 'Anarquista 3', data: genericCharacterData};
	
	characters['COTERIE_1_LIDER'] = {name: 'Líder Coterie 1', data: genericCharacterData};
	characters['COTERIE_1_MIEMBRO_1'] = {name: 'Miembro 1 Coterie 1', data: genericCharacterData};
	characters['COTERIE_1_MIEMBRO_2'] = {name: 'Miembro 2 Coterie 1', data: genericCharacterData};
	characters['COTERIE_1_MIEMBRO_3'] = {name: 'Miembro 3 Coterie 1', data: genericCharacterData};
	
	characters['COTERIE_2_LIDER'] = {name: 'Líder Coterie 2', data: genericCharacterData};
	characters['COTERIE_2_MIEMBRO_1'] = {name: 'Miembro 1 Coterie 2', data: genericCharacterData};
	characters['COTERIE_2_MIEMBRO_2'] = {name: 'Miembro 2 Coterie 2', data: genericCharacterData};
	
	
	// Tramas
	var genericStoryData = {mass : 75, tipo : "trama"};
	var charactersInStory = [];
	
	/* La arena de Karsh */
	charactersInStory = ['KARSH', 'LUCHADOR_1', 'LUCHADOR_2', 'LUCHADOR_3', 'MIRMIDON_CAIDO', 'JEFE_CORREDORES', 'CORREDOR_1', 'CORREDOR_2'];
	stories['ARENA_DE_KARSH'] = {name: 'La Arena de Karsh', data: genericStoryData, characters: charactersInStory};
	/* Los Mirmidones */
	charactersInStory = ['KARSH', 'MIRMIDON_1', 'MIRMIDON_2', 'MIRMIDON_3', 'MIRMIDON_4', 'MIRMIDON_5', 'MIRMIDON_CAIDO'];
	stories['LOS_MIRMIDONES'] = {name: 'Los Mirmidones', data: genericStoryData, characters: charactersInStory};
	/* El Concierto */
	charactersInStory = ['MECENAS', 'CANTANTE', 'GREAT_HARPIE', 'JEFE_CORREDORES'];
	stories['EL_CONCIERTO'] = {name: 'El Concierto', data: genericStoryData, characters: charactersInStory};
	/* Crónicas Mongolas*/
	
	/* Last flight of the Harpies */
	charactersInStory = ['INFERNALISTA', 'ASTOR', 'GREAT_HARPIE', 'HARPIE_1', 'HARPIE_2', 'HARPIE_3', 'HARPIE_4', 'HARPIE_5', 'PRIMOGENITO_VENTRUE', 'PRIMOGENITO_CHIQUILLA', 'BIBLIOTECARIO'];
	stories['LAST_FLIGHT'] = {name: 'Last flight of the Harpies', data: genericStoryData, characters: charactersInStory};
	/* El príncipe gitano */
	charactersInStory = ['PRINCIPE_RAVNOS', 'PRIMOGENITO_BRUJAH', 'PRIMOGENITO_TREMERE', 'PRIMOGENITO_NOSFERATU', 'PRIMOGENITO_VENTRUE', 'CONTACTO_ANARQUISTA_1', 'CONTACTO_ANARQUISTA_2', 'CONTACTO_ANARQUISTA_3'];
	stories['PRINCIPE_GITANO'] = {name: 'El Príncipe Gitano', data: genericStoryData, characters: charactersInStory};
	/* El intercambio */
	charactersInStory = ['COTERIE_1_LIDER', 'COTERIE_1_MIEMBRO_1', 'COTERIE_1_MIEMBRO_2', 'COTERIE_1_MIEMBRO_3', 'COTERIE_2_LIDER', 'COTERIE_2_MIEMBRO_1', 'COTERIE_2_MIEMBRO_2', 'MECENAS', 'CONTACTO_ANARQUISTA_2', 'CORREDOR_2'];
	stories['EL_INTERCAMBIO'] = {name: 'El intercambio', data: genericStoryData, characters: charactersInStory};
	
	createGraph(characters, stories, sys);	

});

function createGraph(characters, stories, sys) {
	createCharacterNodes(characters, sys);
	createStoryNodes(stories, characters, sys);
}

function createCharacterNodes(characters, sys) {
	// Creación de nodos de personaje
	var keys = Object.keys(characters);
	for (i = 0; i < keys.length; i++) {
		// Para cada personaje
		sys.addNode(characters[keys[i]].name, characters[keys[i]].data);
	}
}

function createStoryNodes(stories, characters, sys) {
	// Uniones entre tramas y personajes
	var keys = Object.keys(stories);
	for (i = 0; i < keys.length; i++) {
		// Para cada trama
		sys.addNode(stories[keys[i]].name, stories[keys[i]].data);
		for (j = 0; j < stories[keys[i]].characters.length; j++) {
			sys.addEdge(stories[keys[i]].name,
					characters[stories[keys[i]].characters[j]].name);
		}
	}
}