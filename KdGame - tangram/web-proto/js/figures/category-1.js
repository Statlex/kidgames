(function (win) {

	'use strict';
	/*global window, document */

	// 

	win.rabbit = {
		svg: "<?xml version='1.0' encoding='utf-8'?><svg version='1.2' baseProfile='tiny' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' xml:space='preserve'> <polygon fill='#BF7400' stroke='#000000' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' points=' 90.794,172.388 161.505,172.388 161.505,243.099 126.15,207.744 143.828,190.066 126.15,207.744 '/> <polygon fill='#BF7400' stroke='#000000' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' points=' 161.505,172.388 90.794,172.388 90.794,101.677 126.15,137.032 108.472,154.71 126.15,137.032 '/> <polygon fill='#BF7400' stroke='#000000' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' points=' 90.794,243.098 126.15,243.098 126.15,225.42 126.15,243.098 161.505,243.098 126.15,207.743 '/> <polygon fill='#BF7400' stroke='#000000' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' points=' 65.794,172.388 90.794,197.388 90.794,172.386 78.294,172.386 90.794,172.386 90.794,147.388 '/> <polygon fill='#BF7400' stroke='#000000' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' points=' 90.794,207.743 90.794,243.098 108.473,225.419 99.634,216.581 108.473,225.419 126.15,207.743 '/> <polygon fill='#BF7400' stroke='#000000' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' points=' 90.794,66.321 90.794,101.676 73.117,101.676 73.117,83.999 73.117,101.676 55.439,101.676 55.439,66.321 '/> <polygon fill='#BF7400' stroke='#000000' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' points=' 115.794,41.321 165.794,41.321 140.794,66.321 128.294,66.321 128.294,53.821 128.294,66.321 90.794,66.321 '/> </svg>",
		name: 'rabbit-name',
		figureCoords: [
			['B3A', 108, 154, 45],
			['B3A', 144, 190, -135],
			['M3A', 126, 225, -90],
			['S3A', 100, 216, -45],
			['S3A', 78, 172, 0],
			['SQR', 73, 84, 0],
			['TRP', 128, 53, -90]
		]
	};


	win.categories = win.categories || {};

	win.categories.animal_1 = {
		svg: "<svg version='1.1' baseProfile='tiny' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='277.5px' height='280.5px' viewBox='0 0 277.5 280.5' xml:space='preserve'> <polygon fill='#E3CCBA' points='182.934,224.862 112.222,224.862 112.223,154.151 147.578,189.507 129.9,207.185 147.578,189.507 '/> <polygon fill='#E3CCBA' points='162.223,204.151 112.222,154.151 162.223,104.152 162.223,154.151 137.223,154.151 162.223,154.151 '/> <polygon fill='#E3CCBA' points='187.223,79.151 212.223,104.151 212.223,79.151 199.723,79.151 212.223,79.151 212.223,54.152 '/> <polygon fill='#E3CCBA' points='187.223,79.152 162.223,54.152 162.223,79.152 174.723,79.152 162.223,79.152 162.223,104.152 '/> <polygon fill='#E3CCBA' points='76.867,224.861 41.512,189.507 76.868,189.507 85.706,198.346 76.867,207.184 85.706,198.346 112.222,224.861 '/> <polygon fill='#E3CCBA' points='162.223,174.861 162.223,139.507 179.898,139.507 162.223,139.507 162.223,104.151 197.577,139.507 '/> <polygon fill='#E3CCBA' points='212.223,104.151 199.723,116.651 187.223,104.151 199.723,116.651 187.223,129.151 162.223,104.151 187.223,79.152 '/> </svg>",
		name_ar: 'animals#1',
		name_de: 'animals#1',
		name_en: 'animals#1',
		name_es: 'animals#1',
		name_ru: 'animals#1',
		name_zh: 'animals#1',
		figures: [
			{
				svg: "<svg version='1.1' baseProfile='tiny' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='277.5px' height='280.5px' viewBox='0 0 277.5 280.5' xml:space='preserve'> <polygon fill='#E3CCBA' points='182.934,224.862 112.222,224.862 112.223,154.151 147.578,189.507 129.9,207.185 147.578,189.507 '/> <polygon fill='#E3CCBA' points='162.223,204.151 112.222,154.151 162.223,104.152 162.223,154.151 137.223,154.151 162.223,154.151 '/> <polygon fill='#E3CCBA' points='187.223,79.151 212.223,104.151 212.223,79.151 199.723,79.151 212.223,79.151 212.223,54.152 '/> <polygon fill='#E3CCBA' points='187.223,79.152 162.223,54.152 162.223,79.152 174.723,79.152 162.223,79.152 162.223,104.152 '/> <polygon fill='#E3CCBA' points='76.867,224.861 41.512,189.507 76.868,189.507 85.706,198.346 76.867,207.184 85.706,198.346 112.222,224.861 '/> <polygon fill='#E3CCBA' points='162.223,174.861 162.223,139.507 179.898,139.507 162.223,139.507 162.223,104.151 197.577,139.507 '/> <polygon fill='#E3CCBA' points='212.223,104.151 199.723,116.651 187.223,104.151 199.723,116.651 187.223,129.151 162.223,104.151 187.223,79.152 '/> </svg>",
				time: 0, // time to done
				id: 1
			},
			{
				svg: "<svg version='1.1' baseProfile='tiny' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='277.5px' height='280.5px' viewBox='0 0 277.5 280.5' xml:space='preserve'> <polygon fill='#E3CCBA' points='182.934,224.862 112.222,224.862 112.223,154.151 147.578,189.507 129.9,207.185 147.578,189.507 '/> <polygon fill='#E3CCBA' points='162.223,204.151 112.222,154.151 162.223,104.152 162.223,154.151 137.223,154.151 162.223,154.151 '/> <polygon fill='#E3CCBA' points='187.223,79.151 212.223,104.151 212.223,79.151 199.723,79.151 212.223,79.151 212.223,54.152 '/> <polygon fill='#E3CCBA' points='187.223,79.152 162.223,54.152 162.223,79.152 174.723,79.152 162.223,79.152 162.223,104.152 '/> <polygon fill='#E3CCBA' points='76.867,224.861 41.512,189.507 76.868,189.507 85.706,198.346 76.867,207.184 85.706,198.346 112.222,224.861 '/> <polygon fill='#E3CCBA' points='162.223,174.861 162.223,139.507 179.898,139.507 162.223,139.507 162.223,104.151 197.577,139.507 '/> <polygon fill='#E3CCBA' points='212.223,104.151 199.723,116.651 187.223,104.151 199.723,116.651 187.223,129.151 162.223,104.151 187.223,79.152 '/> </svg>",
				time: 0, // time to done
				id: 2
			}

		]

	}




}(window));
