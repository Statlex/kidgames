(function (win) {

	"use strict";
	/*global window, document, console, alert */

	win.allFigures = win.allFigures || {};

	win.allFigures.figures = {
		svg:"<svg width='36px' height='24px' viewBox='0 0 36 24'><path d='m18,5c-15-15-20,10 0,18 20-10 15-32 0-18'></path></svg>",
		figures: [
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='822px' height='567px' viewBox='0 0 822 567' enable-background='new 0 0 822 567' xml:space='preserve'><rect x='0' y='0' width='822' height='567' fill='rgb(255,255,255)' /><title>Circle</title><desc>Vector coloring circle. Author Lobaz Roman. In the public domain. Site www. abc-color.com</desc><circle fill='rgb(255,255,255)' stroke='#000000' cx='411' cy='283.5' r='260'/></svg>",
				id: 7497093379497528
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='600px' height='600px' viewBox='0 0 600 600' enable-background='new 0 0 600 600' xml:space='preserve'><rect x='0' y='0' width='600' height='600' fill='rgb(255,255,255)' /><title>Coloring faceted star</title><desc>Vector coloring Faceted star</desc><polygon fill='rgb(255,255,255)' stroke='#000000' points='600,225 425,375 300,300'/><polygon fill='rgb(255,255,255)' stroke='#000000' points='600,225 300,300 380,220'/><polygon fill='rgb(255,255,255)' stroke='#000000' points='425,375 485,600 300,300'/><polygon fill='rgb(255,255,255)' stroke='#000000' points='300,300 485,600 300,470'/><polygon fill='rgb(255,255,255)' stroke='#000000' points='300,0 380,220 300,300'/><polygon fill='rgb(255,255,255)' stroke='#000000' points='300,300 300,470 115,600'/><polygon fill='rgb(255,255,255)' stroke='#000000' points='300,0 300,300 220,220'/><polygon fill='rgb(255,255,255)' stroke='#000000' points='300,300 115,600 175,375'/><polygon fill='rgb(255,255,255)' stroke='#000000' points='300,300 175,375 0,225'/><polygon fill='rgb(255,255,255)' stroke='#000000' points='300,300 0,225 220,220'/></svg>",
				id: 4293585878331214
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='822px' height='567px' viewBox='0 0 822 567' enable-background='new 0 0 822 567' xml:space='preserve'><rect x='0' y='0' width='822' height='567' fill='rgb(255,255,255)' /><title>heart</title><desc>Vector coloring heart</desc><path fill='rgb(255,255,255)' stroke='#000000' d='M686,171.771v31.977c-7.061,91.333-76.659,204.756-274.504,344.751 C213.668,408.505,143.051,295.082,136,203.749v-31.977c7.562-95.408,73.442-147.576,126.847-152.89c8.774-0.859,17.11,0,24.775,0 c61.744,0,89.986,29.248,123.874,69.95c33.887-40.702,62.13-69.95,123.874-69.95c7.665,0,16.082-0.859,24.774,0 C613.621,24.195,678.438,76.364,686,171.771z'/></svg>",
				id: 3893320057541132
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='822px' height='567px' viewBox='0 0 822 567' enable-background='new 0 0 822 567' xml:space='preserve'><rect x='0' y='0' width='822' height='567' fill='rgb(255,255,255)' /><title>Heart</title><desc>Vector coloring heart</desc><path fill='rgb(255,255,255)' stroke='#000000' stroke-miterlimit='10' d='M411,533.75c0,0-122.111-59.884-211.2-137.5 c-58.08-50.6-96.8-103.368-96.8-170.5c0-106.315,73.876-192.5,165-192.5c61.512,0,115.159,39.27,143.528,97.493 C440.161,74.962,493.246,37.496,554,37.496c91.124,0,165,84.282,165,188.254c0,63.393-43.131,121.527-96.8,170.5 C531.857,478.695,411,533.75,411,533.75z'/></svg>",
				id: 3632480972446501
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='600px' height='600px' viewBox='0 0 600 600' enable-background='new 0 0 600 600' xml:space='preserve'><rect x='0' y='0' width='600' height='600' fill='rgb(255,255,255)' /><title>Coloring star</title><desc>Vector coloring star</desc><polygon fill='rgb(255,255,255)' stroke='#000000' points='300,0 380,220 600,225 425,375 485,600 300,470 115,600 175,375 0,225 220,220'/></svg>",
				id: 19065903639420867
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='822px' height='567px' viewBox='0 0 822 567' enable-background='new 0 0 822 567' xml:space='preserve'><rect x='0' y='0' width='822' height='567' fill='rgb(255,255,255)' /><title>Coloring ten sectors of the circle</title><desc>Vector coloring ten sectors of the circle</desc><path fill='rgb(255,255,255)' stroke='#000000' d='M173.2,206.8L292,245.5c-4,12.2-6,25.1-6,38.5c0,13.5,2.1,26.5,6,38.6l-118.9,38.5l0,0 C165.3,336.9,161,311,161,284S165.3,231.2,173.2,206.8L173.2,206.8z'/><path fill='rgb(255,255,255)' stroke='#000000' d='M337.5,385.1l-73.4,101L264,486.2c-42.2-30.7-74.4-74.4-90.8-125.101l0,0L292,322.6 C300.3,348,316.4,369.8,337.5,385.1z'/><path fill='rgb(255,255,255)' stroke='#000000' d='M411,409v125c-55,0-105.8-17.7-147.1-47.7l0.1-0.1l73.4-101 C358.1,400.2,383.5,409,411,409z'/><path fill='rgb(255,255,255)' stroke='#000000' d='M411,534V409c27.5,0,52.9-8.8,73.5-23.9l73.5,101l0.1,0.101C516.8,516.3,466,534,411,534z'/><path fill='rgb(255,255,255)' stroke='#000000' d='M648.8,361.1L648.8,361.1C632.4,411.9,600.2,455.5,558,486.2l-0.1-0.101l-73.5-101 c21.1-15.3,37.199-37.1,45.399-62.5L648.8,361.1z'/><path fill='rgb(255,255,255)' stroke='#000000' d='M648.9,206.8C656.8,231.2,661,257,661,284s-4.2,52.9-12.1,77.1l0,0L530,322.6 c4-12.199,6-25.1,6-38.6s-2.1-26.5-6-38.6L648.9,206.8L648.9,206.8z'/><path fill='rgb(255,255,255)' stroke='#000000' d='M648.9,206.8L648.9,206.8L530,245.4c-8.2-25.4-24.4-47.2-45.4-62.5l73.5-101l0.101-0.1 C600.2,112.4,632.5,156.1,648.9,206.8z'/><path fill='rgb(255,255,255)' stroke='#000000' d='M558.1,81.7l-0.1,0.1l-73.5,101c-20.6-15-46-23.9-73.5-23.9V34 C466,34,516.8,51.7,558.1,81.7z'/><path fill='rgb(255,255,255)' stroke='#000000' d='M411,34v125c-27.5,0-52.9,8.9-73.5,23.9L264,81.8l-0.1-0.1C305.2,51.7,356,34,411,34z'/><path fill='rgb(255,255,255)' stroke='#000000' d='M264,81.8l73.4,101C316.3,198.1,300.2,220,292,245.4l-118.9-38.6l0,0 c16.4-50.7,48.6-94.4,90.8-125.1L264,81.8z'/></svg>",
				id: 7265328313224018
			}

		]
	}

}(window));
