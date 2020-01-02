const data = {
	AZUAY: [
		'CUENCA',
		'GIRON',
		'GUALACEO',
		'NABON',
		'PAUTE',
		'PUCARA',
		'SAN FERNANDO',
		'SANTA ISABEL',
		'SIGSIG',
		'SAN FELIPE DE OÑA',
		'CHORDELEG',
		'EL PAN',
		'SEVILLA DE ORO',
		'GUACHAPALA',
		'CAMILO PONCE ENRIQUEZ'
	],
	BOLIVAR: [
		'GUARANDA',
		'CHILLANES',
		'SAN JOSE DE CHIMBO',
		'ECHEANDIA',
		'SAN MIGUEL',
		'CALUMA',
		'LAS NAVES'
	],
	CAÑAR: ['AZOGUES', 'BIBLIAN', 'CAÑAR', 'LA TRONCAL', 'EL TAMBO', 'DELEG', 'SUSCAL'],
	CARCHI: ['TULCAN', 'BOLIVAR', 'EL ANGEL', 'MIRA (CHONTAHUASI)', 'SAN GABRIEL', 'HUACA'],
	COTOPAXI: ['LATACUNGA', 'LA MANÁ', 'EL CORAZON', 'PUJILÍ', 'SAN MIGUEL', 'SAQUISILÍ', 'SIGCHOS'],
	RIOBAMBA: [
		'RIOBAMBA',
		'ALAUSÍ',
		'VILLA LA UNIÓN (CAJABAMBA)',
		'CHAMBO',
		'CHUNCHI',
		'GUAMOTE',
		'GUANO',
		'PALLATANGA',
		'PENIPE',
		'CUMANDÁ'
	],
	'EL ORO': [
		'MACHALA',
		'ARENILLAS',
		'PACCHA',
		'BALSAS',
		'CHILLA',
		'EL GUABO',
		'HUAQUILLAS',
		'MARCABELI',
		'PASAJE',
		'PIÑAS',
		'PORTOVELO',
		'SANTA ROSA',
		'ZARUMA',
		'LA VICTORIA'
	],
	ESMERALDAS: [
		'ESMERALDAS',
		'VALDEZ (LIMONES)',
		'MUISNE',
		'ROSA ZARATE (QUININDE)',
		'SAN LORENZO',
		'ATACAMES',
		'RIO VERDE',
		'LA CONCORDIA'
	],
	GUAYAS: [
		'GUAYAQUIL',
		'ELOY ALFARO (DURAN)',
		'DAULE',
		'PEDRO CARBO',
		'LOMAS DE SARGENTILLO',
		'BALZAR',
		'COLIMES',
		'BALAO',
		'VELASCO IBARRA (EL EMPALME)',
		'EL TRIUNFO',
		'MILAGRO',
		'EL TRIUNFO',
		'NARANJAL',
		'ALFREDO BAQUERIZO MORENO (JUJAN)',
		'NARANJITO',
		'PALESTINA',
		'SAMBORONDON',
		'SANTA LUCIA',
		'EL SALITRE (LAS RAMAS)',
		'SAN JACINTO DE YAGUACHI',
		'GENERAL VILLAMIL (PLAYAS)',
		'SIMÓN BOLÍVAR',
		'CORONEL MARCELINO MARIDUEÑA (SAN CARLOS)',
		'GENERAL ANTONIO ELIZALDE (BUCAY)',
		'ISIDRO AYORA'
	],
	IMBABURA: ['SAN MIGUEL DE IBARRA', 'ATUNTAQUI', 'COTACACHI', 'OTAVALO', 'PIMAMPIRO', 'URCUQUÍ'],
	LOJA: [
		'LOJA',
		'CARIAMANGA',
		'CATAMAYO (LA TOMA)',
		'CELICA',
		'CHAGUARPAMBA',
		'AMALUZA',
		'GONZANAMÁ',
		'MACARÁ',
		'CATACOCHA',
		'ALAMOR',
		'SARAGURO',
		'SOZORANGA',
		'ZAPOTILO',
		'PINDAL',
		'QUILANGA',
		'OLMEDO'
	],
	'LOS RIOS': [
		'BABAHOYO',
		'BABA',
		'MONTALVO',
		'PUEBLOVIEJO',
		'QUEVEDO',
		'CATARAMA',
		'VENTANAS',
		'VINCES',
		'PALENQUE',
		'SAN JACINTO DE BUENA FE',
		'VALENCIA',
		'MOCACHE',
		'QUINSALOMA'
	],
	MANABI: [
		'PORTOVIEJO',
		'CALCETA',
		'CHONE',
		'EL CARMEN',
		'FLAVIO ALFARO',
		'JIPIJAPA',
		'JUNÍN',
		'MANTA',
		'MONTECRISTI',
		'PAJÁN',
		'PICHINCHA',
		'ROCAFUERTE',
		'SANTA ANA DE VUELTA LARGA',
		'BAHÍA DE CARÁQUEZ',
		'SUCRE',
		'PEDERNALES',
		'OLMEDO',
		'PUERTO LÓPEZ',
		'JAMA',
		'JARAMIJÓ',
		'SAN VICENTE'
	],
	MORONA_SANTIAGO: [
		'MACAS',
		'GUALAQUIZA',
		'GENERAL LEONIDAS PLAZA GUTIERREZ (LIMÓN)',
		'PALORA (METZERA)',
		'SANTIAGO DE MENDEZ',
		'SUCUA',
		'HUAMBOYA',
		'SAN JUAN BOSCO',
		'TAISHA',
		'LOGROÑO',
		'PABLO SEXTO',
		'SANTIAGO'
	],
	NAPO: ['TENA', 'ARCHIDONA', 'EL CHACO', 'BAEZA', 'CARLOS JULIO AROSEMENA TOLA'],
	PASTAZA: ['PUYO', 'MERA', 'SANTA CLARA', 'ARAJUNO'],
	PICHINCHA: [
		'QUITO DISTRITO METROPOLITANO',
		'CAYAMBE',
		'MACHACHI',
		'SANGOLQUI',
		'SAN MIGUEL DE LOS BANCOS',
		'PEDRO VICENTE MALDONADO',
		'PUERTO QUITO'
	],
	TUNGURAHUA: ['AMBATO', 'BAÑOS DE AGUA SANTA', 'MOCHA', 'PATATE', 'PELILEO', 'PILLARO', 'TISALEO'],
	'ZAMORA CHINCHIPE': [
		'ZAMORA',
		'ZUMBA',
		'GUAYZIMI',
		'YANTZAZA (YANTZATZA)',
		'EL PANGUI',
		'ZUMBI',
		'PALANDA',
		'PAQUISHA'
	],
	GALAPAGOS: ['SAN CRISTOBAL', 'PUERTO VILLAMIL'],
	SUCUMBIOS: [
		'NUEVA LOJA',
		'LUMBAQUI',
		'PUERTO EL CARMEN DEL PUTUMAYO',
		'SHUSHUFINDI',
		'LA BONITA',
		'EL DORADO DE CASCALES',
		'TARAPOA'
	],
	ORELLANA: ['PUERTO FRANCISCO DE ORELLANA (EL COCA)', 'NUEVO ROCAFUERTE', 'LA JOYA DE LOS SACHAS'],
	'SANTO DOMINGO DE LOS COLORADOS': ['SANTO DOMINGO DE LOS COLORADOS'],
	'SANTA ELENA': ['SANTA ELENA', 'SALINAS', 'LA LIBERTAD']
};

export const getCities = value => {
	return data[value.label].map(city => ({
		value: city,
		label: city
	}));
};

export const getProvinces = () => {
	const provinces = [];
	const keys = Object.keys(data);
	keys.sort();
	keys.forEach(province => {
		provinces.push({ value: province, label: province });
	});
	return provinces;
};
