(function () {

	"use strict";
	/*global window, document, console, alert */


	'use strict';
	/*global window, document */

	var win = window;

	win.categories = win.categories || {};

	win.categories.animal_2 = {
		svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='38.76,115.334 38.76,65.334 63.76,90.334 63.76,140.334'/><polygon fill='#0C0' points='134.473,140.334 63.76,140.333 99.117,104.979'/><polygon fill='#0C0' points='174.115,179.979 188.76,165.334 88.76,165.334 63.761,140.334 38.76,165.334 63.76,190.334 38.76,215.334 209.471,215.334'/></svg>",
		name_en: 'Animals West',
		name_ru: 'Домашние',
		figures: [
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='38.76,115.334 38.76,65.334 63.76,90.334 63.76,140.334'/><polygon fill='#0C0' points='134.473,140.334 63.76,140.333 99.117,104.979'/><polygon fill='#0C0' points='174.115,179.979 188.76,165.334 88.76,165.334 63.761,140.334 38.76,165.334 63.76,190.334 38.76,215.334 209.471,215.334'/></svg>",
				id: 607061387039721
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='150.737,107.288 115.384,71.934 115.384,107.289 115.386,107.289 150.738,142.644 150.738,107.288'/><polygon fill='#0C0' points='161.094,117.644 161.094,67.644 186.094,92.644 186.094,142.644'/><polygon fill='#0C0' points='206.805,228.001 171.45,192.646 171.442,192.652 186.094,178.001 186.091,178.001 186.094,178 186.094,142.644 150.738,142.644 150.738,178 150.74,178.001 86.094,178 36.094,228'/></svg>",
				id: 985345182241872
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='218.479,231.678 168.479,181.678 68.478,181.678 43.478,206.678 93.478,206.678 68.478,231.678'/><polygon fill='#0C0' points='103.833,96.322 68.478,131.677 103.833,131.677 139.188,96.321'/><polygon fill='#0C0' points='68.478,60.966 68.478,131.677 33.123,96.321'/><polygon fill='#0C0' points='68.478,131.677 68.478,131.677 43.478,156.677 68.479,181.678 93.478,156.678'/></svg>",
				id: 9119242818560451
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='191.416,101.644 166.416,76.644 166.416,126.644'/><polygon fill='#0C0' points='113.384,126.644 78.028,91.288 113.384,91.288 148.738,126.644'/><polygon fill='#0C0' points='159.092,187.004 159.094,187 159.096,187 209.094,187 184.094,162 184.094,126.644 148.738,126.644 148.738,162 84.094,162 34.094,212 134.094,212 134.095,212 123.738,222.355 194.449,222.355 159.096,187'/></svg>",
				id: 177613158011809
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='172.159,133 172.159,158 51.449,158 76.449,183 51.449,208 151.448,208 172.159,228.711 172.159,183 197.159,158'/><polygon fill='#0C0' points='136.807,72.644 101.449,107.999 136.805,107.998 172.16,72.643'/><polygon fill='#0C0' points='101.449,107.999 51.449,57.999 101.449,58'/><polygon fill='#0C0' points='101.449,107.999 101.449,107.999 76.449,132.999 101.449,158 126.45,133'/></svg>",
				id: 7183652352541685
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='114.79,68.644 64.79,68.644 89.79,93.644 139.789,93.644'/><polygon fill='#0C0' points='139.79,129 175.145,129 175.145,93.644 139.79,93.644 139.789,93.648 139.789,93.645 69.079,164.355 69.079,235.066 119.079,235.066 144.078,210.066 119.079,185.066 119.078,185.067 139.789,164.355 139.789,189.355 164.789,164.355 139.789,139.355 139.789,128.998'/></svg>",
				id: 18239376205019653
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='99.048,78 99.048,128 124.047,103 124.047,53'/><polygon fill='#0C0' points='166.725,198.711 166.725,178 116.725,128 99.048,128 49.048,78 49.048,128 81.37,128 81.37,163.355 116.725,163.355 116.725,192.645 81.369,228 116.725,228 116.726,228 96.015,248.711 166.725,248.711 191.725,223.711'/></svg>",
				id: 424151255749166
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='110.047,91.644 110.047,141.644 135.047,116.644 135.047,66.644'/><polygon fill='#0C0' points='74.692,70.933 74.692,141.644 39.337,106.288'/><polygon fill='#0C0' points='110.047,177 110.047,141.644 74.692,141.644 74.692,177 60.047,177 35.047,202 85.047,202 60.047,227 160.047,227 210.047,177'/></svg>",
				id: 12808283884078264
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='180.337,82.944 180.337,132.944 205.337,107.944 205.337,57.944'/><polygon fill='#0C0' points='119.982,107.944 119.982,57.944 144.982,82.944 144.982,132.944'/><polygon fill='#0C0' points='74.271,168.301 38.917,203.656 74.271,239.012 144.982,239.012 144.982,168.301'/><polygon fill='#0C0' points='180.338,132.944 180.338,132.944 144.982,132.944 144.982,168.301 180.338,168.301'/></svg>",
				id: 14749922160990536
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='191.832,253.371 191.832,203.37 216.83,228.37 216.831,278.37'/><polygon fill='#0C0' points='191.832,203.37 121.121,132.66 121.121,132.661 121.12,61.949 85.765,26.594 50.41,61.948 85.767,61.949 85.765,61.949 85.765,97.305 50.41,97.304 50.417,97.311 50.409,97.305 25.409,122.305 75.41,122.305 75.409,122.303 121.121,168.016 85.766,203.37'/></svg>",
				id: 2409350285306573
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='46.355,87.289 46.355,158 11,122.644'/><polygon fill='#0C0' points='177.421,83 102.421,158 46.355,158.001 46.355,228.712 81.711,193.355 117.066,193.355 152.421,228.712 152.421,158 177.421,133 227.421,133'/></svg>",
				id: 763566151028499
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='204.627,153.178 179.627,128.178 154.627,153.178 154.628,153.179 144.271,153.178 144.271,82.467 73.561,82.467 108.916,117.822 108.917,117.822 73.561,153.178 73.561,188.534 38.206,223.891 73.561,223.891 108.915,188.535 108.916,188.535 108.916,188.534 144.271,188.534 179.627,223.891 179.627,153.18'/></svg>",
				id: 8718836370389909
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='190.725,191.68 165.725,166.68 165.725,216.68'/><polygon fill='#0C0' points='155.369,191.68 130.369,166.68 130.369,216.68'/><polygon fill='#0C0' points='165.727,95.968 165.727,95.979 165.725,95.968 130.369,131.323 59.658,131.323 59.658,202.034 95.017,166.676 95.014,166.68 165.725,166.68 165.725,145.969 190.725,120.968 190.725,170.968 215.725,145.968 215.725,95.968'/><polygon fill='#0C0' points='59.658,95.967 59.658,95.967 24.303,95.967 24.303,131.323 59.658,131.323'/></svg>",
				id: 8305290620774031
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='117.547,203 142.547,228 142.547,178'/><polygon fill='#0C0' points='42.547,213.355 77.902,213.355 42.547,178'/><polygon fill='#0C0' points='223.611,117.645 188.257,153 188.257,117.645 223.611,82.289'/><polygon fill='#0C0' points='117.547,153 67.547,103 17.548,103 17.547,153 42.554,127.993 42.547,128.001 67.546,153 67.548,152.999 42.547,178 142.547,178 188.257,223.711 188.257,153'/></svg>",
				id: 6207340143155307
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='29.934,108 29.934,143.355 65.289,108'/><polygon fill='#0C0' points='211.001,83 161,83 136,108 65.289,108 65.289,178.711 52.789,191.211 77.789,216.211 77.789,166.211 86,158 136,158 111,183 161,183 186,158 161,133 186,108.001 185.999,107.999 211,133'/></svg>",
				id: 24029413191601634
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='136.369,63.289 186.369,63.289 161.369,88.289 111.369,88.289'/><polygon fill='#0C0' points='111.369,88.289 61.369,38.288 111.369,38.289'/><polygon fill='#0C0' points='111.369,105.967 111.369,88.289 76.014,88.289 76.014,123.645 111.369,123.645 111.369,151.678 86.369,176.678 111.369,201.678 111.369,176.678 146.725,212.033 146.725,262.033 171.725,237.033 182.08,247.389 182.08,176.678'/></svg>",
				id: 8123217537067831
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='136.416,120.144 86.416,120.144 111.416,145.144 161.416,145.144'/><polygon fill='#0C0' points='161.416,95.144 161.416,145.144 186.415,120.144 186.415,70.144'/><polygon fill='#0C0' points='179.094,180.5 179.094,145.144 143.738,145.144 143.738,180.5 79.094,180.5 29.094,230.5 129.094,230.5 143.738,215.855 214.449,215.855'/></svg>",
				id: 8077514211181551
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='152.869,72.455 102.869,72.455 127.869,97.454 177.869,97.454'/><polygon fill='#0C0' points='102.869,90.133 102.869,72.455 67.514,72.455 67.514,107.812 102.869,107.812 102.869,125.488 67.514,160.844 102.869,160.844 102.87,160.844 123.581,181.556 123.58,181.555 98.58,206.555 123.58,231.555 123.58,231.554 173.58,231.555 173.58,160.844'/></svg>",
				id: 8777538039721549
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='65.467,90.5 65.467,40.5 90.467,65.5 90.467,115.5'/><polygon fill='#0C0' points='158.146,65.5 108.146,115.5 108.146,65.5'/><polygon fill='#0C0' points='158.146,203.89 158.146,183.179 108.146,133.179 108.145,133.182 108.145,115.5 72.79,115.5 72.79,150.856 108.145,150.856 108.146,165.51 108.145,165.501 72.789,200.856 108.145,200.856 108.146,200.851 108.146,233.179 108.148,233.177 87.436,253.89 158.146,253.89 183.146,228.89'/></svg>",
				id: 492940976517275
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='67.79,185.179 67.79,220.534 103.145,185.179'/><polygon fill='#0C0' points='78.146,92.5 78.146,42.5 103.146,67.5 103.146,117.5'/><polygon fill='#0C0' points='173.856,117.5 103.146,117.5 138.502,82.145'/><polygon fill='#0C0' points='153.146,205.89 153.146,185.179 103.146,135.179 103.145,135.182 103.145,117.5 67.79,117.5 67.79,152.856 103.145,152.856 103.146,235.179 82.436,255.89 153.146,255.89 178.146,230.89'/></svg>",
				id: 8416398982517421
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='131.047,155.644 81.046,155.644 106.046,130.644 156.047,130.644'/><polygon fill='#0C0' points='156.047,130.644 106.047,80.644 156.047,80.644'/><polygon fill='#0C0' points='206.047,166 191.402,166 191.402,130.644 156.047,130.644 156.047,166 106.047,166 81.047,191 31.047,191 56.047,216 206.047,216 181.047,191'/></svg>",
				id: 4049648945219815
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='70.982,109.978 70.982,145.333 106.337,109.978'/><polygon fill='#0C0' points='35.626,145.333 70.982,145.333 35.626,109.978'/><polygon fill='#0C0' points='127.047,95.333 77.049,145.331 70.982,145.331 70.982,180.688 106.337,180.688 106.337,216.043 127.048,195.332 177.047,195.332 177.047,195.333 202.047,220.333 202.047,170.333'/></svg>",
				id: 6908967015333474
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='108.627,159.678 73.271,124.322 87.917,124.322 62.917,99.322 37.917,124.322 48.273,134.679 48.271,134.678 23.271,159.678 48.272,184.678 73.272,159.68 73.271,159.678 73.271,159.678 98.271,184.678 98.271,184.678 73.271,209.678 223.271,209.678 223.271,159.678'/></svg>",
				id: 12965844525024295
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='72.98,96.144 72.98,131.499 108.336,96.144'/><polygon fill='#0C0' points='37.625,131.499 72.98,131.499 37.625,96.144'/><polygon fill='#0C0' points='129.047,81.5 79.048,131.499 72.981,131.499 72.981,166.855 108.336,166.855 108.336,202.211 143.691,166.855 179.047,202.211 179.047,181.5 204.047,206.5 204.047,156.5'/></svg>",
				id: 2436566634569317
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='139.827,94.288 164.827,119.288 164.827,69.288'/><polygon fill='#0C0' points='225.182,94.288 200.182,69.288 200.182,119.288'/><polygon fill='#0C0' points='164.827,119.288 164.827,154.645 41.083,154.645 16.084,179.645 16.084,229.645 41.083,204.645 41.083,225.355 76.438,190 147.148,190 147.147,189.998 182.505,225.355 182.505,154.645 200.182,154.645 200.182,119.288'/></svg>",
				id: 5983922814484686
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='165.128,127.5 190.128,152.5 190.128,102.5'/><polygon fill='#0C0' points='225.482,152.678 225.482,117.322 190.128,152.678'/><polygon fill='#0C0' points='179.771,152.5 129.771,102.5 115.126,117.145 44.416,117.145 19.417,142.145 19.417,192.145 44.416,167.145 44.416,187.855 79.772,152.5 104.771,152.5 154.771,202.5 154.773,187.855 190.128,187.855 190.128,152.5'/></svg>",
				id: 2270998798776418
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='225.79,126.987 84.369,126.988 119.724,162.343 119.724,212.343 144.725,187.343 155.079,197.698 190.438,162.339 190.436,162.344 190.436,212.344 215.434,187.344 215.434,137.344 215.433,137.344'/><polygon fill='#0C0' points='99.014,162.344 74.014,137.343 84.369,126.988 49.014,91.632 49.014,126.988 13.658,126.988 74.015,187.344'/></svg>",
				id: 20519393007270992
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='154.094,116.321 179.094,141.321 179.094,91.321'/><polygon fill='#0C0' points='204.094,116.321 179.094,141.321 229.094,141.321'/><polygon fill='#0C0' points='204.094,166.322 179.093,141.321 179.092,141.322 37.673,141.322 12.673,166.322 12.673,216.322 37.673,191.322 37.673,212.033 58.384,191.322 108.384,191.322 108.384,212.033 154.095,166.321 179.094,191.322'/></svg>",
				id: 12885585706681013
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='217.438,144.679 192.438,119.678 92.439,119.678 92.438,119.677 92.438,98.967 21.727,169.678 92.438,169.678 92.438,205.033 127.794,169.678 192.438,169.678 192.438,169.678 192.438,219.678 217.436,194.678 217.436,144.681'/></svg>",
				id: 1669969877693802
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='151.047,85.645 151.047,121 51.047,121 26.047,146 26.047,196 51.047,221 51.047,171 51.047,170.999 51.047,171 101.047,171 115.691,156.355 126.049,166.713 126.047,166.712 126.047,216.712 151.047,191.712 151.046,191.71 151.047,191.711 151.047,156.355 221.758,156.355'/></svg>",
				id: 4841993397567421
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='224.85,164 189.494,128.646 189.494,128.644 83.428,128.645 83.427,128.653 83.427,93.29 12.716,164 83.427,164 83.428,199.355 118.784,164 124.85,164 149.85,189 199.849,189 224.85,214 224.848,164'/></svg>",
				id: 8774371740873903
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='218.094,171.355 147.383,100.645 147.383,136 26.674,136 26.674,221.355 62.029,186 126.672,186 147.383,206.711 182.738,206.711 147.383,171.355'/></svg>",
				id: 35359802888706326
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='206.127,116.323 206.127,166.323 231.127,141.323 231.127,91.323'/><polygon fill='#0C0' points='181.127,141.323 181.127,141.322 60.417,141.322 60.417,116.322 10.417,166.322 60.417,166.322 60.417,212.033 81.127,191.322 181.126,191.322 181.127,191.323 206.127,216.323 206.127,166.323'/></svg>",
				id: 7916150442324579
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='158.805,95.645 158.805,131 38.095,131 38.095,131.004 38.094,131 13.095,156 13.095,206 38.094,181 138.094,181 158.805,201.711 158.805,166.355 229.516,166.355'/></svg>",
				id: 5260633605066687
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='104.771,142.322 104.771,106.966 69.417,71.61 34.061,71.61 69.417,106.966 69.416,106.966 69.416,106.967 34.061,142.322 69.416,142.322 69.416,213.033 104.773,177.676 104.772,177.678 140.127,213.033 175.482,177.678 200.482,202.678 200.482,152.678 210.838,142.322'/></svg>",
				id: 6154099095147103
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='208.094,119 208.091,119.002 218.448,108.644 183.094,108.645 147.738,144 33.094,144 8.094,169 33.094,194 183.094,194 158.094,169 183.094,144 183.086,143.999 183.093,143.999 183.095,143.997 183.094,143.999 208.096,169 233.094,144.001'/></svg>",
				id: 2641110310796648
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='189.449,131.646 164.449,156.646 118.741,156.646 79.094,117 79.091,116.999 79.094,116.999 114.449,81.644 79.094,81.645 43.739,117 29.094,117 29.094,167 54.094,142 79.095,167 54.094,192 68.739,192 68.739,227.355 104.094,192 154.093,192 189.449,227.355 189.449,156.646 214.449,156.646'/></svg>",
				id: 8745408880058676
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='169.46,188.012 169.46,138.012 69.46,138.012 48.749,117.301 48.75,163.013 48.749,163.012 23.749,188.012 48.749,213.012 48.75,188.012 134.104,188.012 169.46,223.366 204.814,223.366'/><polygon fill='#0C0' points='169.46,88.012 169.46,138.012 194.461,163.012 219.46,138.013'/></svg>",
				id: 4854286427143961
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='184.98,170 114.271,170 78.916,134.645 78.916,205.355 149.626,205.355 184.98,240.711'/><polygon fill='#0C0' points='53.916,180.355 28.916,205.355 78.916,205.355'/><polygon fill='#0C0' points='53.916,230.355 78.916,255.355 78.916,205.355'/><polygon fill='#0C0' points='114.271,49.29 78.916,84.645 114.27,84.644 149.626,49.289'/><polygon fill='#0C0' points='78.916,134.645 28.916,84.645 78.916,84.646'/><polygon fill='#0C0' points='220.336,134.645 220.336,134.645 184.98,134.645 184.98,170.002 220.336,170.002'/></svg>",
				id: 3806417433079332
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='178.467,76.289 143.111,76.289 178.467,111.645 163.82,111.645 124.176,151.289 53.466,151.289 53.466,126.289 28.466,151.289 53.466,176.289 53.466,222 88.821,186.645 138.82,186.645 174.177,222 174.177,186.645 188.82,186.645 163.818,161.644 163.822,161.645 188.82,136.645 188.82,136.645 213.82,161.645 213.82,111.645 213.822,111.645'/></svg>",
				id: 24017750518396497
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='62.562,98.966 62.562,134.322 97.917,98.966'/><polygon fill='#0C0' points='37.562,109.322 12.562,134.322 62.562,134.322'/><polygon fill='#0C0' points='203.982,134.322 203.982,134.322 62.562,134.322 62.561,134.322 37.562,159.321 62.563,184.322 87.562,159.322 133.271,205.033 133.271,184.322 183.271,184.322 183.271,184.322 203.982,205.033 203.982,184.322 228.982,209.322 228.982,159.322'/></svg>",
				id: 5147583584766835
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='223.161,120.345 223.161,84.99 187.806,120.345'/><polygon fill='#0C0' points='187.805,84.99 152.449,84.99 187.805,120.345'/><polygon fill='#0C0' points='187.805,155.701 187.805,120.345 102.449,120.345 102.449,120.345 87.804,134.99 87.804,134.989 17.093,134.989 17.093,205.7 52.449,170.345 117.095,170.345 152.45,205.7 187.805,205.7 152.45,170.345 152.449,170.345 152.449,155.701'/></svg>",
				id: 20169216115027666
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='15.206,164.033 50.561,164.033 15.206,128.678'/><polygon fill='#0C0' points='85.916,128.678 121.271,164.033 121.271,214.033 146.271,189.033 156.627,199.389 202.339,153.677 202.339,153.678 202.339,203.678 227.338,178.678 227.338,128.678'/><polygon fill='#0C0' points='75.561,139.033 85.916,128.678 50.561,93.322 50.561,164.033 75.562,189.033 100.561,164.033'/></svg>",
				id: 42811619117856026
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='209.594,119.966 184.594,94.966 184.594,144.966'/><polygon fill='#0C0' points='219.949,162.645 219.949,127.29 184.594,162.645'/><polygon fill='#0C0' points='134.594,94.966 94.949,134.611 24.238,134.611 24.238,205.322 59.594,169.967 109.594,169.967 109.594,169.967 99.239,180.322 134.594,215.678 134.594,144.967 134.594,144.968 134.594,144.966 149.239,144.966 149.239,180.322 184.594,180.322 184.594,144.966'/></svg>",
				id: 13973739696666598
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='44.381,127.645 69.381,152.645 69.381,102.645'/><polygon fill='#0C0' points='16.348,152.645 51.703,152.645 16.348,117.29'/><polygon fill='#0C0' points='204.736,117.289 134.025,117.289 119.381,102.645 69.381,152.645 51.703,152.645 51.703,188.001 87.058,188.001 87.058,152.645 119.381,152.645 119.381,202.645 169.381,152.645 204.736,188 204.736,167.289 229.736,192.289 229.736,142.289'/></svg>",
				id: 9608792697545141
			},
			{
				svg:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='240.094px' height='300px' viewBox='0 0 240.094 300' enable-background='new 0 0 240.094 300' xml:space='preserve'><polygon fill='#0C0' points='193.45,117.956 158.095,117.956 193.45,153.312'/><polygon fill='#0C0' points='228.806,153.313 193.45,153.313 228.806,188.668'/><polygon fill='#0C0' points='175.771,153.312 125.771,103.312 111.127,117.956 111.127,117.956 40.417,117.956 15.417,142.956 15.417,192.956 40.417,167.956 40.417,188.667 75.772,153.312 108.094,153.312 158.095,203.312 158.095,188.668 193.449,188.668 193.449,153.312'/></svg>",
				id: 8269494187552482
			}
		]
	}

}());
