/*
* Copyright © 2003 Maxim Stepin (maxst@hiend3d.com)
* Copyright © 2010 Cameron Zemek (grom@zeminvaders.net)
* Copyright © 2011 Tamme Schichler (tamme.schichler@googlemail.com)
* Copyright © 2012 A. Eduardo García (arcnorj@gmail.com)
* Copyright © 2013 Kevin Kwok (antimatter15@gmail.com)
*
* hqx-java is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* hqx-java is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with hqx-java. If not, see <http://www.gnu.org/licenses/>.
*/

var hq2x = (function(){
	function Mix3To1(c1, c2) {
		if (c1 == c2) {
			return c1;
		}
		return ((((c1 & 0x0000FF00) * 3 + (c2 & 0x0000FF00)) >> 2) & 0x0000FF00) |
			((((c1 & 0x00FF00FF) * 3 + (c2 & 0x00FF00FF)) >> 2) & 0x00FF00FF) |
			((((c1 & 0xFF000000) >> 2) * 3 + ((c2 & 0xFF000000) >> 2)) & 0xFF000000);
	}

	function Mix2To1To1(c1, c2, c3) {
		return ((((c1 & 0x0000FF00) * 2 + (c2 & 0x0000FF00) + (c3 & 0x0000FF00)) >> 2) & 0x0000FF00) |
			  ((((c1 & 0x00FF00FF) * 2 + (c2 & 0x00FF00FF) + (c3 & 0x00FF00FF)) >> 2) & 0x00FF00FF) |
			((((c1 & 0xFF000000) >> 2) * 2 + ((c2 & 0xFF000000) >> 2) + ((c3 & 0xFF000000) >> 2)) & 0xFF000000);
	}

	function Mix7To1(c1, c2) {
		//return (c1*7+c2)/8;
		if (c1 == c2) {
			return c1;
		}
		return ((((c1 & 0x0000FF00) * 7 + (c2 & 0x0000FF00)) >> 3) & 0x0000FF00) |
			((((c1 & 0x00FF00FF) * 7 + (c2 & 0x00FF00FF)) >> 3) & 0x00FF00FF) |
			((((c1 & 0xFF000000) >> 3) * 7 + ((c2 & 0xFF000000) >> 3)) & 0xFF000000);
	}

	function Mix2To7To7(c1, c2, c3) {
		return ((((c1 & 0x0000FF00) * 2 + (c2 & 0x0000FF00) * 7 + (c3 & 0x0000FF00) * 7) >> 4) & 0x0000FF00) |
			  ((((c1 & 0x00FF00FF) * 2 + (c2 & 0x00FF00FF) * 7 + (c3 & 0x00FF00FF) * 7) >> 4) & 0x00FF00FF) |
			((((c1 & 0xFF000000) >> 4) * 2 + ((c2 & 0xFF000000) >> 4) * 7 + ((c3 & 0xFF000000) >> 4) * 7) & 0xFF000000);
	}

	function MixEven(c1, c2) {
		if (c1 == c2) {
			return c1;
		}
		return ((((c1 & 0x0000FF00) + (c2 & 0x0000FF00)) >> 1) & 0x0000FF00) |
			((((c1 & 0x00FF00FF) + (c2 & 0x00FF00FF)) >> 1) & 0x00FF00FF) |
			((((c1 & 0xFF000000) >> 1) + ((c2 & 0xFF000000) >> 1)) & 0xFF000000);
	}

	function Mix4To2To1(c1, c2, c3) {
		return ((((c1 & 0x0000FF00) * 5 + (c2 & 0x0000FF00) * 2 + (c3 & 0x0000FF00)) >> 3) & 0x0000FF00) |
			  ((((c1 & 0x00FF00FF) * 5 + (c2 & 0x00FF00FF) * 2 + (c3 & 0x00FF00FF)) >> 3) & 0x00FF00FF) |
			((((c1 & 0xFF000000) >> 3) * 5 + ((c2 & 0xFF000000) >> 3) * 2 + ((c3 & 0xFF000000) >> 3)) & 0xFF000000);
	}

	function Mix6To1To1(c1, c2, c3) {
		return ((((c1 & 0x0000FF00) * 6 + (c2 & 0x0000FF00) + (c3 & 0x0000FF00)) >> 3) & 0x0000FF00) |
			  ((((c1 & 0x00FF00FF) * 6 + (c2 & 0x00FF00FF) + (c3 & 0x00FF00FF)) >> 3) & 0x00FF00FF) |
			((((c1 & 0xFF000000) >> 3) * 6 + ((c2 & 0xFF000000) >> 3) + ((c3 & 0xFF000000) >> 3)) & 0xFF000000);
	}

	function Mix5To3(c1, c2) {
		if (c1 == c2) {
			return c1;
		}
		return ((((c1 & 0x0000FF00) * 5 + (c2 & 0x0000FF00) * 3) >> 3) & 0x0000FF00) |
			  ((((c1 & 0x00FF00FF) * 5 + (c2 & 0x00FF00FF) * 3) >> 3) & 0x00FF00FF) |
			((((c1 & 0xFF000000) >> 3) * 5 + ((c2 & 0xFF000000) >> 3) * 3) & 0xFF000000);
	}

	function Mix2To3To3(c1, c2, c3) {
		return ((((c1 & 0x0000FF00) * 2 + (c2 & 0x0000FF00) * 3 + (c3 & 0x0000FF00) * 3) >> 3) & 0x0000FF00) |
			  ((((c1 & 0x00FF00FF) * 2 + (c2 & 0x00FF00FF) * 3 + (c3 & 0x00FF00FF) * 3) >> 3) & 0x00FF00FF) |
			((((c1 & 0xFF000000) >> 3) * 2 + ((c2 & 0xFF000000) >> 3) * 3 + ((c3 & 0xFF000000) >> 3) * 3) & 0xFF000000);
	}

	function Mix14To1To1(c1, c2, c3) {
		return ((((c1 & 0x0000FF00) * 14 + (c2 & 0x0000FF00) + (c3 & 0x0000FF00)) >> 4) & 0x0000FF00) |
			  ((((c1 & 0x00FF00FF) * 14 + (c2 & 0x00FF00FF) + (c3 & 0x00FF00FF)) >> 4) & 0x00FF00FF) |
			((((c1 & 0xFF000000) >> 4) * 14 + ((c2 & 0xFF000000) >> 4) + ((c3 & 0xFF000000) >> 4)) & 0xFF000000);
	}

	// var RGBtoYUV = {};

	function getYUV(c){
		// c &= 0x00FFFFFF;
		// if(c in RGBtoYUV) return RGBtoYUV[c];
		var r, g, b, y, u, v;
		r = (c & 0xFF0000) >> 16;
		g = (c & 0x00FF00) >> 8;
		b = c & 0x0000FF;
		y = Math.floor((+0.299 * r + 0.587 * g + 0.114 * b));
		u = Math.floor((-0.169 * r - 0.331 * g + 0.500 * b) + 128);
		v = Math.floor((+0.500 * r - 0.419 * g - 0.081 * b) + 128);
		
		return (y << 16) | (u << 8) | v;
	}

	function diff(c1, c2, trY, trU, trV, trA){
		var YUV1 = getYUV(c1);
		var YUV2 = getYUV(c2);
		return (
				(Math.abs((YUV1 & 0x00FF0000) - (YUV2 & 0x00FF0000)) > trY) ||
				(Math.abs((YUV1 & 0x0000FF00) - (YUV2 & 0x0000FF00)) > trU) ||
				(Math.abs((YUV1 & 0x000000FF) - (YUV2 & 0x000000FF)) > trV) ||
				(Math.abs(((c1 >> 24) - (c2 >> 24))) > trA)
				);
	}


	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');

	function hq2x(src, options){
		options = options || {}
		var trY = options.trY || 48, 
			trU = options.trU || 7, 
			trV = options.trV || 6, 
			trA = options.trA || 0, 
			wrapX = options.wrapX || false, 
			wrapY = options.wrapY || false;

		var Xres = src.width, Yres = src.height;
		var dest = ctx.createImageData(Xres * 2, Yres * 2);

		function get_pixel(pos){
			return  (255 << 24) | 
					// (src.data[pos * 4 + 3] << 24) |
					(src.data[pos * 4] << 16) | 
					(src.data[pos * 4 + 1] << 8) | 
					(src.data[pos * 4 + 2])
		}

		function set_pixel(pos, val){
			dest.data[pos * 4    ] = (val & 0x00FF0000) >> 16;
			dest.data[pos * 4 + 1] = (val & 0x0000FF00) >> 8;
			dest.data[pos * 4 + 2] = (val & 0x000000FF);
			dest.data[pos * 4 + 3] = 255 //(val & 0xFF000000) >> 24;
		}

		var spIdx = 0, dpIdx = 0;
		//Don't shift trA, as it uses shift right instead of a mask for comparisons.
		trY <<= 2 * 8;
		trU <<= 1 * 8;
		var dpL = Xres * 2;
		var prevline, nextline;
		var w = new Uint32Array(9);

		for (var j = 0; j < Yres; j++) {
			prevline = (j > 0) ? -Xres : wrapY ? Xres * (Yres - 1) : 0;
			nextline = (j < Yres - 1) ? Xres : wrapY ? -(Xres * (Yres - 1)) : 0;
			for (var i = 0; i < Xres; i++) {
				w[1] = get_pixel(spIdx + prevline);
				w[4] = get_pixel(spIdx);
				w[7] = get_pixel(spIdx + nextline);

				if (i > 0) {
					w[0] = get_pixel(spIdx + prevline - 1);
					w[3] = get_pixel(spIdx - 1);
					w[6] = get_pixel(spIdx + nextline - 1);
				} else {
					if (wrapX) {
						w[0] = get_pixel(spIdx + prevline + Xres - 1);
						w[3] = get_pixel(spIdx + Xres - 1);
						w[6] = get_pixel(spIdx + nextline + Xres - 1);
					} else {
						w[0] = w[1];
						w[3] = w[4];
						w[6] = w[7];
					}
				}

				if (i < Xres - 1) {
					w[2] = get_pixel(spIdx + prevline + 1);
					w[5] = get_pixel(spIdx + 1);
					w[8] = get_pixel(spIdx + nextline + 1);
				} else {
					if (wrapX) {
						w[2] = get_pixel(spIdx + prevline - Xres + 1);
						w[5] = get_pixel(spIdx - Xres + 1);
						w[8] = get_pixel(spIdx + nextline - Xres + 1);
					} else {
						w[2] = w[1];
						w[5] = w[4];
						w[8] = w[7];
					}
				}

				var pattern = 0, flag = 1;

				for (var k = 0; k < 9; k++){
					if (k == 4) continue;

					if (w[k] != w[4])
					{
						if (diff(w[4], w[k], trY, trU, trV, trA))
							pattern |= flag;
					}
					flag <<= 1;
				}

				switch (pattern) {
					case 0:
					case 1:
					case 4:
					case 32:
					case 128:
					case 5:
					case 132:
					case 160:
					case 33:
					case 129:
					case 36:
					case 133:
					case 164:
					case 161:
					case 37:
					case 165: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 2:
					case 34:
					case 130:
					case 162: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 16:
					case 17:
					case 48:
					case 49: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 64:
					case 65:
					case 68:
					case 69: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 8:
					case 12:
					case 136:
					case 140: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 3:
					case 35:
					case 131:
					case 163: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 6:
					case 38:
					case 134:
					case 166: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 20:
					case 21:
					case 52:
					case 53: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 144:
					case 145:
					case 176:
					case 177: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 192:
					case 193:
					case 196:
					case 197: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 96:
					case 97:
					case 100:
					case 101: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 40:
					case 44:
					case 168:
					case 172: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 9:
					case 13:
					case 137:
					case 141: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 18:
					case 50: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 80:
					case 81: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 72:
					case 76: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 10:
					case 138: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 66: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 24: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 7:
					case 39:
					case 135: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 148:
					case 149:
					case 180: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 224:
					case 228:
					case 225: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 41:
					case 169:
					case 45: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 22:
					case 54: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 208:
					case 209: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 104:
					case 108: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 11:
					case 139: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 19:
					case 51: {
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[3]));
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx, Mix4To2To1(w[4], w[1], w[3]));
							set_pixel(dpIdx + 1, Mix2To3To3(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 146:
					case 178: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						} else {
							set_pixel(dpIdx + 1, Mix2To3To3(w[4], w[1], w[5]));
							set_pixel(dpIdx + dpL + 1, Mix4To2To1(w[4], w[5], w[7]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						break;
					}
					case 84:
					case 85: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + 1, Mix4To2To1(w[4], w[5], w[1]));
							set_pixel(dpIdx + dpL + 1, Mix2To3To3(w[4], w[5], w[7]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						break;
					}
					case 112:
					case 113: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL, Mix4To2To1(w[4], w[7], w[3]));
							set_pixel(dpIdx + dpL + 1, Mix2To3To3(w[4], w[5], w[7]));
						}
						break;
					}
					case 200:
					case 204: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						} else {
							set_pixel(dpIdx + dpL, Mix2To3To3(w[4], w[7], w[3]));
							set_pixel(dpIdx + dpL + 1, Mix4To2To1(w[4], w[7], w[5]));
						}
						break;
					}
					case 73:
					case 77: {
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[1]));
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx, Mix4To2To1(w[4], w[3], w[1]));
							set_pixel(dpIdx + dpL, Mix2To3To3(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 42:
					case 170: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						} else {
							set_pixel(dpIdx, Mix2To3To3(w[4], w[3], w[1]));
							set_pixel(dpIdx + dpL, Mix4To2To1(w[4], w[3], w[7]));
						}
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 14:
					case 142: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						} else {
							set_pixel(dpIdx, Mix2To3To3(w[4], w[3], w[1]));
							set_pixel(dpIdx + 1, Mix4To2To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 67: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 70: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 28: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 152: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 194: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 98: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 56: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 25: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 26:
					case 31: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 82:
					case 214: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 88:
					case 248: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 74:
					case 107: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 27: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 86: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						break;
					}
					case 216: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 106: {
						set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 30: {
						set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 210: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 120: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						break;
					}
					case 75: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 29: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 198: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 184: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 99: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 57: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 71: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 156: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 226: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 60: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 195: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 102: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 153: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 58: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix6To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix6To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 83: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix6To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix6To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 92: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix6To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix6To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 202: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix6To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix6To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 78: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix6To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix6To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 154: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix6To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix6To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 114: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix6To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix6To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 89: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix6To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix6To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 90: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix6To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix6To1To1(w[4], w[1], w[5]));
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix6To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix6To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 55:
					case 23: {
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[3]));
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx, Mix4To2To1(w[4], w[1], w[3]));
							set_pixel(dpIdx + 1, Mix2To3To3(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 182:
					case 150: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						} else {
							set_pixel(dpIdx + 1, Mix2To3To3(w[4], w[1], w[5]));
							set_pixel(dpIdx + dpL + 1, Mix4To2To1(w[4], w[5], w[7]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						break;
					}
					case 213:
					case 212: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix4To2To1(w[4], w[5], w[1]));
							set_pixel(dpIdx + dpL + 1, Mix2To3To3(w[4], w[5], w[7]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						break;
					}
					case 241:
					case 240: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix4To2To1(w[4], w[7], w[3]));
							set_pixel(dpIdx + dpL + 1, Mix2To3To3(w[4], w[5], w[7]));
						}
						break;
					}
					case 236:
					case 232: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						} else {
							set_pixel(dpIdx + dpL, Mix2To3To3(w[4], w[7], w[3]));
							set_pixel(dpIdx + dpL + 1, Mix4To2To1(w[4], w[7], w[5]));
						}
						break;
					}
					case 109:
					case 105: {
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[1]));
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx, Mix4To2To1(w[4], w[3], w[1]));
							set_pixel(dpIdx + dpL, Mix2To3To3(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 171:
					case 43: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						} else {
							set_pixel(dpIdx, Mix2To3To3(w[4], w[3], w[1]));
							set_pixel(dpIdx + dpL, Mix4To2To1(w[4], w[3], w[7]));
						}
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 143:
					case 15: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						} else {
							set_pixel(dpIdx, Mix2To3To3(w[4], w[3], w[1]));
							set_pixel(dpIdx + 1, Mix4To2To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 124: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						break;
					}
					case 203: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 62: {
						set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 211: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 118: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						break;
					}
					case 217: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 110: {
						set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 155: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 188: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 185: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 61: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 157: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 103: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 227: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 230: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 199: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 220: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix6To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 158: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix6To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 234: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix6To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 242: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix6To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 59: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix6To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 121: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix6To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 87: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix6To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 79: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix6To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 122: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix6To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix6To1To1(w[4], w[1], w[5]));
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix6To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 94: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix6To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix6To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix6To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 218: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix6To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix6To1To1(w[4], w[1], w[5]));
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix6To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 91: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix6To1To1(w[4], w[1], w[5]));
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix6To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix6To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 229: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 167: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 173: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 181: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 186: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix6To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix6To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 115: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix6To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix6To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 93: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix6To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix6To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 206: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix6To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix6To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 205:
					case 201: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						} else {
							set_pixel(dpIdx + dpL, Mix6To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 174:
					case 46: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						} else {
							set_pixel(dpIdx, Mix6To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 179:
					case 147: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						} else {
							set_pixel(dpIdx + 1, Mix6To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 117:
					case 116: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						} else {
							set_pixel(dpIdx + dpL + 1, Mix6To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 189: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 231: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 126: {
						set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						break;
					}
					case 219: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 125: {
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[1]));
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx, Mix4To2To1(w[4], w[3], w[1]));
							set_pixel(dpIdx + dpL, Mix2To3To3(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						break;
					}
					case 221: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix4To2To1(w[4], w[5], w[1]));
							set_pixel(dpIdx + dpL + 1, Mix2To3To3(w[4], w[5], w[7]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						break;
					}
					case 207: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
							set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						} else {
							set_pixel(dpIdx, Mix2To3To3(w[4], w[3], w[1]));
							set_pixel(dpIdx + 1, Mix4To2To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 238: {
						set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						} else {
							set_pixel(dpIdx + dpL, Mix2To3To3(w[4], w[7], w[3]));
							set_pixel(dpIdx + dpL + 1, Mix4To2To1(w[4], w[7], w[5]));
						}
						break;
					}
					case 190: {
						set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
							set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						} else {
							set_pixel(dpIdx + 1, Mix2To3To3(w[4], w[1], w[5]));
							set_pixel(dpIdx + dpL + 1, Mix4To2To1(w[4], w[5], w[7]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						break;
					}
					case 187: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						} else {
							set_pixel(dpIdx, Mix2To3To3(w[4], w[3], w[1]));
							set_pixel(dpIdx + dpL, Mix4To2To1(w[4], w[3], w[7]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 243: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix4To2To1(w[4], w[7], w[3]));
							set_pixel(dpIdx + dpL + 1, Mix2To3To3(w[4], w[5], w[7]));
						}
						break;
					}
					case 119: {
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx, Mix3To1(w[4], w[3]));
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx, Mix4To2To1(w[4], w[1], w[3]));
							set_pixel(dpIdx + 1, Mix2To3To3(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						break;
					}
					case 237:
					case 233: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix14To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 175:
					case 47: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix14To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						break;
					}
					case 183:
					case 151: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix14To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 245:
					case 244: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix14To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 250: {
						set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 123: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						break;
					}
					case 95: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						break;
					}
					case 222: {
						set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 252: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix14To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 249: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[1]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix14To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 235: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[2], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix14To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 111: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix14To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[5]));
						break;
					}
					case 63: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix14To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[8], w[7]));
						break;
					}
					case 159: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix14To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 215: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix14To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[6], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 246: {
						set_pixel(dpIdx, Mix2To1To1(w[4], w[0], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix14To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 254: {
						set_pixel(dpIdx, Mix3To1(w[4], w[0]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix14To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 253: {
						set_pixel(dpIdx, Mix3To1(w[4], w[1]));
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[1]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix14To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix14To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 251: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[2]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix14To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 239: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix14To1To1(w[4], w[3], w[1]));
						}
						set_pixel(dpIdx + 1, Mix3To1(w[4], w[5]));
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix14To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[5]));
						break;
					}
					case 127: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix14To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix2To1To1(w[4], w[1], w[5]));
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix2To1To1(w[4], w[7], w[3]));
						}
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[8]));
						break;
					}
					case 191: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix14To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix14To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[7]));
						set_pixel(dpIdx + dpL + 1, Mix3To1(w[4], w[7]));
						break;
					}
					case 223: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix2To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix14To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[6]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix2To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 247: {
						set_pixel(dpIdx, Mix3To1(w[4], w[3]));
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix14To1To1(w[4], w[1], w[5]));
						}
						set_pixel(dpIdx + dpL, Mix3To1(w[4], w[3]));
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix14To1To1(w[4], w[5], w[7]));
						}
						break;
					}
					case 255: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							set_pixel(dpIdx, w[4]);
						} else {
							set_pixel(dpIdx, Mix14To1To1(w[4], w[3], w[1]));
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							set_pixel(dpIdx + 1, w[4]);
						} else {
							set_pixel(dpIdx + 1, Mix14To1To1(w[4], w[1], w[5]));
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL, w[4]);
						} else {
							set_pixel(dpIdx + dpL, Mix14To1To1(w[4], w[7], w[3]));
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							set_pixel(dpIdx + dpL + 1, w[4]);
						} else {
							set_pixel(dpIdx + dpL + 1, Mix14To1To1(w[4], w[5], w[7]));
						}
						break;
					}
				}
				spIdx++;
				dpIdx += 2;
			}
			dpIdx += dpL;
		}
		return dest;
	}

	return hq2x;
})();