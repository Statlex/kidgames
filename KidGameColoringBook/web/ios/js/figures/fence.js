(function (win) {

	"use strict";
	/*global window, document, console, alert */

	win.allFigures = win.allFigures || {};

	win.allFigures.fence = {
		svg:"<svg width='36px' height='24px' viewBox='0 0 36 24'><path d='m1,24v-20q2-6 4,0v20m2,0v-20q2-6 4,0v20m2,0v-20q2-6 4,0v20m2,0v-20q2-6 4,0v20m2,0v-20q2-6 4,0v20m2,0v-20q2-6 4,0v20m-4-4h-26v-2h26m0-10h-26v-2h26'></path></svg>",
		figures: [
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='822px' height='567px' viewBox='0 0 822 567' enable-background='new 0 0 822 567' xml:space='preserve'><rect x='0' y='0' width='822' height='567' fill='transparent'' /><polyline fill='transparent'' points='0,0 822,0 822,567'/><path fill='transparent'' stroke='#000000' d='M51.4,536.6'/><path fill='transparent'' stroke='#000000' d='M77.4,536.5'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M130.5,41.8c0-13.5-11-24.5-24.5-24.5s-24.5,11-24.5,24.5v85.9h49 V41.8z'/><rect x='81.5' y='438.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='94'/><rect x='81.5' y='160.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='245'/><rect x='155.5' y='438.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='94'/><rect x='155.5' y='160.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='245'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M204.5,41.8c0-13.5-11-24.5-24.5-24.5s-24.5,11-24.5,24.5v85.9h49 V41.8z'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M277.5,41.8c0-13.5-11-24.5-24.5-24.5s-24.5,11-24.5,24.5v85.9h49 V41.8z'/><rect x='228.5' y='160.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='245'/><rect x='228.5' y='438.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='94'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M351.5,41.8c0-13.5-11-24.5-24.5-24.5s-24.5,11-24.5,24.5v85.9h49 V41.8z'/><rect x='302.5' y='160.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='245'/><rect x='302.5' y='438.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='94'/><rect x='375.5' y='160.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='245'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M424.5,41.8c0-13.5-11-24.5-24.5-24.5s-24.5,11-24.5,24.5v85.9h49 V41.8z'/><rect x='375.5' y='438.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='94'/><rect x='449.5' y='160.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='245'/><rect x='449.5' y='438.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='94'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M498.5,41.8c0-13.5-11-24.5-24.5-24.5s-24.5,11-24.5,24.5v85.9h49 V41.8z'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M572.5,41.8c0-13.5-11-24.5-24.5-24.5c-13.6,0-24.5,11-24.5,24.5 v85.9h49V41.8z'/><rect x='523.5' y='438.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='94'/><rect x='523.5' y='160.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='245'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M645.5,41.8c0-13.5-11-24.5-24.5-24.5c-13.6,0-24.5,11-24.5,24.5 v85.9h49V41.8z'/><rect x='596.5' y='438.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='94'/><rect x='596.5' y='160.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='245'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M719.5,41.8c0-13.5-11-24.5-24.5-24.5s-24.5,11-24.5,24.5v85.9h49 V41.8z'/><rect x='670.5' y='438.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='94'/><rect x='670.5' y='160.7' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='49' height='245'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='668.9,405.7 615.3,405.7 588.5,405.7 535,405.7 508.2,405.7 454.6,405.7 427.8,405.7 374.3,405.7 347.5,405.7 293.9,405.7 267.1,405.7 213.6,405.7 186.8,405.7 133.2,405.7 106.4,405.7 52.9,405.7 25,405.7 25,438.7 52.9,438.7 106.4,438.7 133.2,438.7 186.8,438.7 213.6,438.7 267.1,438.7 293.9,438.7 347.5,438.7 374.3,438.7 427.8,438.7 454.6,438.7 508.2,438.7 535,438.7 588.5,438.7 615.3,438.7 668.9,438.7 695.7,438.7 749.2,438.7 775,438.7 775,405.7 749.2,405.7 695.7,405.7'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='133.2,160.7 186.8,160.7 213.6,160.7 267.1,160.7 293.9,160.7 347.5,160.7 374.3,160.7 427.8,160.7 454.6,160.7 508.2,160.7 535,160.7 588.5,160.7 615.3,160.7 668.9,160.7 695.7,160.7 749.2,160.7 775,160.7 775,127.7 749.2,127.7 695.7,127.7 668.9,127.7 615.3,127.7 588.5,127.7 535,127.7 508.2,127.7 454.6,127.7 427.8,127.7 374.3,127.7 347.5,127.7 293.9,127.7 267.1,127.7 213.6,127.7 186.8,127.7 133.2,127.7 106.4,127.7 52.9,127.7 25,127.7 25,160.7 52.9,160.7 106.4,160.7'/></svg>",
				id: 111587084364146
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='822px' height='567px' viewBox='0 0 822 567' enable-background='new 0 0 822 567' xml:space='preserve'><rect x='0' y='0' width='822' height='567' fill='transparent'' /><polyline fill='transparent'' points='0,0 822,0 822,567'/><rect x='354.5' y='165.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='22' height='225'/><rect x='286.5' y='165.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='23' height='225'/><rect x='219.5' y='165.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='22' height='225'/><rect x='151.5' y='165.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='23' height='225'/><rect x='489.5' y='165.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='22' height='225'/><rect x='624.5' y='165.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='22' height='225'/><rect x='556.5' y='165.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='23' height='225'/><rect x='421.5' y='165.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='23' height='225'/><rect x='354.5' y='390.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='22' height='30'/><rect x='691.5' y='390.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='33' height='30'/><rect x='74.5' y='390.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='32' height='30'/><rect x='151.5' y='390.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='23' height='30'/><rect x='286.5' y='390.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='23' height='30'/><rect x='219.5' y='390.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='22' height='30'/><rect x='556.5' y='390.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='23' height='30'/><rect x='489.5' y='390.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='22' height='30'/><rect x='624.5' y='390.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='22' height='30'/><rect x='421.5' y='390.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='23' height='30'/><rect x='286.5' y='135.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='23' height='30'/><rect x='489.5' y='135.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='22' height='30'/><rect x='624.5' y='135.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='22' height='30'/><rect x='556.5' y='135.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='23' height='30'/><rect x='691.5' y='135.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='33' height='30'/><rect x='151.5' y='135.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='23' height='30'/><rect x='74.5' y='135.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='32' height='30'/><rect x='421.5' y='135.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='23' height='30'/><rect x='219.5' y='135.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='22' height='30'/><rect x='354.5' y='135.5' fill='transparent'' stroke='#000000' stroke-miterlimit='10' width='22' height='30'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M151.5,165v-30V56.3c0-12.4-10.1-22.5-22.5-22.5 s-22.5,10.1-22.5,22.5V135v30v225v30v86.5h45V420v-30V165z'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M219.5,165v-30V56.3c0-12.4-10.1-22.5-22.5-22.5 s-22.5,10.1-22.5,22.5V135v30v225v30v86.5h45V420v-30V165z'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M286.5,165v-30V56.3c0-12.4-10.1-22.5-22.5-22.5 s-22.5,10.1-22.5,22.5V135v30v225v30v86.5h45V420v-30V165z'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M354.5,165v-30V56.3c0-12.4-10.1-22.5-22.5-22.5 s-22.5,10.1-22.5,22.5V135v30v225v30v86.5h45V420v-30V165z'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M421.5,165v-30V56.3c0-12.4-10.1-22.5-22.5-22.5 s-22.5,10.1-22.5,22.5V135v30v225v30v86.5h45V420v-30V165z'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M489.5,165v-30V56.3c0-12.4-10.1-22.5-22.5-22.5 s-22.5,10.1-22.5,22.5V135v30v225v30v86.5h45V420v-30V165z'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M556.5,165v-30V56.3c0-12.4-10.1-22.5-22.5-22.5 s-22.5,10.1-22.5,22.5V135v30v225v30v86.5h45V420v-30V165z'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M624.5,165v-30V56.3c0-12.4-10.1-22.5-22.5-22.5 s-22.5,10.1-22.5,22.5V135v30v225v30v86.5h45V420v-30V165z'/><path fill='transparent'' stroke='#000000' stroke-miterlimit='10' d='M691.5,135V56.3c0-12.4-10.1-22.5-22.5-22.5s-22.5,10.1-22.5,22.5 V135v30v225v30v86.5h45V420v-30V165V135z'/></svg>",
				id: 4832047678064555
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='822px' height='567px' viewBox='0 0 822 567' enable-background='new 0 0 822 567' xml:space='preserve'><rect x='0' y='0' width='822' height='567' fill='transparent'' /><polyline fill='transparent'' points='822,0 822,567 0,567'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='434.5,550.5 384.5,550.5 384.5,50 409.5,40 434.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='384.5,550.5 334.5,550.5 334.5,50 359.5,40 384.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='334.5,550.5 284.5,550.5 284.5,50 309.5,40 334.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='284.5,550.5 234.5,550.5 234.5,50 259.5,40 284.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='234.5,550.5 184.5,550.5 184.5,50 209.5,40 234.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='184.5,550.5 134.5,550.5 134.5,50 159.5,40 184.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='134.5,550.5 84.5,550.5 84.5,50 109.5,40 134.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='84.5,550.5 34.5,550.5 34.5,50 59.5,40 84.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='484.5,550.5 434.5,550.5 434.5,50 459.5,40 484.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='534.5,550.5 484.5,550.5 484.5,50 509.5,40 534.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='584.5,550.5 534.5,550.5 534.5,50 559.5,40 584.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='634.5,550.5 584.5,550.5 584.5,50 609.5,40 634.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='684.5,550.5 634.5,550.5 634.5,50 659.5,40 684.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='734.5,550.5 684.5,550.5 684.5,50 709.5,40 734.5,50'/><polygon fill='transparent'' stroke='#000000' stroke-miterlimit='10' points='784.5,550.5 734.5,550.5 734.5,50 759.5,40 784.5,50'/></svg>",
				id: 45960678020492196
			}
		]
	}

}(window));
