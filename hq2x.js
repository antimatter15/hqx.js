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
		if (c1 == c2) return c1;
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
		if (c1 == c2) return c1;
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
		if (c1 == c2) return c1;
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
		if (c1 == c2) return c1;
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
		var YUV1 = getYUV(c1 & 0x00FFFFFF);
		var YUV2 = getYUV(c2 & 0x00FFFFFF);
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
		var sp = new Uint32Array(src.data.buffer)
		var dp = new Uint32Array(dest.data.buffer);

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
				w[1] = sp[spIdx + prevline];
				w[4] = sp[spIdx];
				w[7] = sp[spIdx + nextline];

				if (i > 0) {
					w[0] = sp[spIdx + prevline - 1];
					w[3] = sp[spIdx - 1];
					w[6] = sp[spIdx + nextline - 1];
				} else {
					if (wrapX) {
						w[0] = sp[spIdx + prevline + Xres - 1];
						w[3] = sp[spIdx + Xres - 1];
						w[6] = sp[spIdx + nextline + Xres - 1];
					} else {
						w[0] = w[1];
						w[3] = w[4];
						w[6] = w[7];
					}
				}

				if (i < Xres - 1) {
					w[2] = sp[spIdx + prevline + 1];
					w[5] = sp[spIdx + 1];
					w[8] = sp[spIdx + nextline + 1];
				} else {
					if (wrapX) {
						w[2] = sp[spIdx + prevline - Xres + 1];
						w[5] = sp[spIdx - Xres + 1];
						w[8] = sp[spIdx + nextline - Xres + 1];
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
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 2:
					case 34:
					case 130:
					case 162: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 16:
					case 17:
					case 48:
					case 49: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 64:
					case 65:
					case 68:
					case 69: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 8:
					case 12:
					case 136:
					case 140: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 3:
					case 35:
					case 131:
					case 163: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 6:
					case 38:
					case 134:
					case 166: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 20:
					case 21:
					case 52:
					case 53: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 144:
					case 145:
					case 176:
					case 177: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 192:
					case 193:
					case 196:
					case 197: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 96:
					case 97:
					case 100:
					case 101: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 40:
					case 44:
					case 168:
					case 172: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 9:
					case 13:
					case 137:
					case 141: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 18:
					case 50: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 80:
					case 81: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 72:
					case 76: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 10:
					case 138: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 66: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 24: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 7:
					case 39:
					case 135: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 148:
					case 149:
					case 180: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 224:
					case 228:
					case 225: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 41:
					case 169:
					case 45: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 22:
					case 54: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 208:
					case 209: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 104:
					case 108: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 11:
					case 139: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 19:
					case 51: {
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[3]);
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx] = Mix4To2To1(w[4], w[1], w[3]);
							dp[dpIdx + 1] = Mix2To3To3(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 146:
					case 178: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						} else {
							dp[dpIdx + 1] = Mix2To3To3(w[4], w[1], w[5]);
							dp[dpIdx + dpL + 1] = Mix4To2To1(w[4], w[5], w[7]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						break;
					}
					case 84:
					case 85: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + 1] = Mix4To2To1(w[4], w[5], w[1]);
							dp[dpIdx + dpL + 1] = Mix2To3To3(w[4], w[5], w[7]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						break;
					}
					case 112:
					case 113: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL] = Mix4To2To1(w[4], w[7], w[3]);
							dp[dpIdx + dpL + 1] = Mix2To3To3(w[4], w[5], w[7]);
						}
						break;
					}
					case 200:
					case 204: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						} else {
							dp[dpIdx + dpL] = Mix2To3To3(w[4], w[7], w[3]);
							dp[dpIdx + dpL + 1] = Mix4To2To1(w[4], w[7], w[5]);
						}
						break;
					}
					case 73:
					case 77: {
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[1]);
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx] = Mix4To2To1(w[4], w[3], w[1]);
							dp[dpIdx + dpL] = Mix2To3To3(w[4], w[7], w[3]);
						}
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 42:
					case 170: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
							dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						} else {
							dp[dpIdx] = Mix2To3To3(w[4], w[3], w[1]);
							dp[dpIdx + dpL] = Mix4To2To1(w[4], w[3], w[7]);
						}
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 14:
					case 142: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
							dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						} else {
							dp[dpIdx] = Mix2To3To3(w[4], w[3], w[1]);
							dp[dpIdx + 1] = Mix4To2To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 67: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 70: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 28: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 152: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 194: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 98: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 56: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 25: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 26:
					case 31: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 82:
					case 214: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 88:
					case 248: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 74:
					case 107: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 27: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 86: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						break;
					}
					case 216: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 106: {
						dp[dpIdx] = Mix3To1(w[4], w[0]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 30: {
						dp[dpIdx] = Mix3To1(w[4], w[0]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 210: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 120: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						break;
					}
					case 75: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 29: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 198: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 184: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 99: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 57: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 71: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 156: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 226: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 60: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 195: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 102: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 153: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 58: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix6To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix6To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 83: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix6To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix6To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 92: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix6To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix6To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 202: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix6To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix6To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 78: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix6To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix6To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 154: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix6To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix6To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 114: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix6To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix6To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 89: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix6To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix6To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 90: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix6To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix6To1To1(w[4], w[1], w[5]);
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix6To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix6To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 55:
					case 23: {
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[3]);
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx] = Mix4To2To1(w[4], w[1], w[3]);
							dp[dpIdx + 1] = Mix2To3To3(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 182:
					case 150: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						} else {
							dp[dpIdx + 1] = Mix2To3To3(w[4], w[1], w[5]);
							dp[dpIdx + dpL + 1] = Mix4To2To1(w[4], w[5], w[7]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						break;
					}
					case 213:
					case 212: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix4To2To1(w[4], w[5], w[1]);
							dp[dpIdx + dpL + 1] = Mix2To3To3(w[4], w[5], w[7]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						break;
					}
					case 241:
					case 240: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix4To2To1(w[4], w[7], w[3]);
							dp[dpIdx + dpL + 1] = Mix2To3To3(w[4], w[5], w[7]);
						}
						break;
					}
					case 236:
					case 232: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						} else {
							dp[dpIdx + dpL] = Mix2To3To3(w[4], w[7], w[3]);
							dp[dpIdx + dpL + 1] = Mix4To2To1(w[4], w[7], w[5]);
						}
						break;
					}
					case 109:
					case 105: {
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[1]);
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx] = Mix4To2To1(w[4], w[3], w[1]);
							dp[dpIdx + dpL] = Mix2To3To3(w[4], w[7], w[3]);
						}
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 171:
					case 43: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
							dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						} else {
							dp[dpIdx] = Mix2To3To3(w[4], w[3], w[1]);
							dp[dpIdx + dpL] = Mix4To2To1(w[4], w[3], w[7]);
						}
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 143:
					case 15: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
							dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						} else {
							dp[dpIdx] = Mix2To3To3(w[4], w[3], w[1]);
							dp[dpIdx + 1] = Mix4To2To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 124: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						break;
					}
					case 203: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 62: {
						dp[dpIdx] = Mix3To1(w[4], w[0]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 211: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 118: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						break;
					}
					case 217: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 110: {
						dp[dpIdx] = Mix3To1(w[4], w[0]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 155: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 188: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 185: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 61: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 157: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 103: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 227: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 230: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 199: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 220: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix6To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 158: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix6To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 234: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix6To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 242: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix6To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 59: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix6To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 121: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix6To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 87: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix6To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 79: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix6To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 122: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix6To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix6To1To1(w[4], w[1], w[5]);
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix6To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 94: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix6To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix6To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix6To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 218: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix6To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix6To1To1(w[4], w[1], w[5]);
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix6To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 91: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix6To1To1(w[4], w[1], w[5]);
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix6To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix6To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 229: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 167: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 173: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 181: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 186: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix6To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix6To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 115: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix6To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix6To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 93: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix6To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix6To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 206: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix6To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix6To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 205:
					case 201: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						} else {
							dp[dpIdx + dpL] = Mix6To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 174:
					case 46: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[0]);
						} else {
							dp[dpIdx] = Mix6To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 179:
					case 147: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						} else {
							dp[dpIdx + 1] = Mix6To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 117:
					case 116: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						} else {
							dp[dpIdx + dpL + 1] = Mix6To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 189: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 231: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 126: {
						dp[dpIdx] = Mix3To1(w[4], w[0]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						break;
					}
					case 219: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 125: {
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[1]);
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx] = Mix4To2To1(w[4], w[3], w[1]);
							dp[dpIdx + dpL] = Mix2To3To3(w[4], w[7], w[3]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						break;
					}
					case 221: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix4To2To1(w[4], w[5], w[1]);
							dp[dpIdx + dpL + 1] = Mix2To3To3(w[4], w[5], w[7]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						break;
					}
					case 207: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
							dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						} else {
							dp[dpIdx] = Mix2To3To3(w[4], w[3], w[1]);
							dp[dpIdx + 1] = Mix4To2To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 238: {
						dp[dpIdx] = Mix3To1(w[4], w[0]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						} else {
							dp[dpIdx + dpL] = Mix2To3To3(w[4], w[7], w[3]);
							dp[dpIdx + dpL + 1] = Mix4To2To1(w[4], w[7], w[5]);
						}
						break;
					}
					case 190: {
						dp[dpIdx] = Mix3To1(w[4], w[0]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
							dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						} else {
							dp[dpIdx + 1] = Mix2To3To3(w[4], w[1], w[5]);
							dp[dpIdx + dpL + 1] = Mix4To2To1(w[4], w[5], w[7]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						break;
					}
					case 187: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
							dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						} else {
							dp[dpIdx] = Mix2To3To3(w[4], w[3], w[1]);
							dp[dpIdx + dpL] = Mix4To2To1(w[4], w[3], w[7]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 243: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix4To2To1(w[4], w[7], w[3]);
							dp[dpIdx + dpL + 1] = Mix2To3To3(w[4], w[5], w[7]);
						}
						break;
					}
					case 119: {
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx] = Mix3To1(w[4], w[3]);
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx] = Mix4To2To1(w[4], w[1], w[3]);
							dp[dpIdx + 1] = Mix2To3To3(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						break;
					}
					case 237:
					case 233: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix14To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 175:
					case 47: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix14To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						break;
					}
					case 183:
					case 151: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix14To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 245:
					case 244: {
						dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix14To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 250: {
						dp[dpIdx] = Mix3To1(w[4], w[0]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 123: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						break;
					}
					case 95: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						break;
					}
					case 222: {
						dp[dpIdx] = Mix3To1(w[4], w[0]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 252: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix14To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 249: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[1]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix14To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 235: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix2To1To1(w[4], w[2], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix14To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 111: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix14To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[5]);
						break;
					}
					case 63: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix14To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[8], w[7]);
						break;
					}
					case 159: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix14To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 215: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix14To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix2To1To1(w[4], w[6], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 246: {
						dp[dpIdx] = Mix2To1To1(w[4], w[0], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix14To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 254: {
						dp[dpIdx] = Mix3To1(w[4], w[0]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix14To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 253: {
						dp[dpIdx] = Mix3To1(w[4], w[1]);
						dp[dpIdx + 1] = Mix3To1(w[4], w[1]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix14To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix14To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 251: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[2]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix14To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 239: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix14To1To1(w[4], w[3], w[1]);
						}
						dp[dpIdx + 1] = Mix3To1(w[4], w[5]);
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix14To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[5]);
						break;
					}
					case 127: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix14To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix2To1To1(w[4], w[1], w[5]);
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix2To1To1(w[4], w[7], w[3]);
						}
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[8]);
						break;
					}
					case 191: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix14To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix14To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[7]);
						dp[dpIdx + dpL + 1] = Mix3To1(w[4], w[7]);
						break;
					}
					case 223: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix2To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix14To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[6]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix2To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 247: {
						dp[dpIdx] = Mix3To1(w[4], w[3]);
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix14To1To1(w[4], w[1], w[5]);
						}
						dp[dpIdx + dpL] = Mix3To1(w[4], w[3]);
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix14To1To1(w[4], w[5], w[7]);
						}
						break;
					}
					case 255: {
						if (diff(w[3], w[1], trY, trU, trV, trA)) {
							dp[dpIdx] = w[4];
						} else {
							dp[dpIdx] = Mix14To1To1(w[4], w[3], w[1]);
						}
						if (diff(w[1], w[5], trY, trU, trV, trA)) {
							dp[dpIdx + 1] = w[4];
						} else {
							dp[dpIdx + 1] = Mix14To1To1(w[4], w[1], w[5]);
						}
						if (diff(w[7], w[3], trY, trU, trV, trA)) {
							dp[dpIdx + dpL] = w[4];
						} else {
							dp[dpIdx + dpL] = Mix14To1To1(w[4], w[7], w[3]);
						}
						if (diff(w[5], w[7], trY, trU, trV, trA)) {
							dp[dpIdx + dpL + 1] = w[4];
						} else {
							dp[dpIdx + dpL + 1] = Mix14To1To1(w[4], w[5], w[7]);
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