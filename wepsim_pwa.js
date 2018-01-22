/*
 *  Copyright 2015-2018 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
 *
 *  This file is part of WepSIM.
 *
 *  WepSIM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  WepSIM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


/*
 * cache versioning
 */

var cacheName = 'v187a:static';


/*
 * install
 */

self.addEventListener('install', 
	              function(e) {
			    e.waitUntil(
				caches.open(cacheName).then(function(cache) {
				    return cache.addAll([
                                        './wepsim_pwa.js',
                                        './images/ajax-loader.gif',
                                        './images/reset.svg',
                                        './images/author_salonso.png',
                                        './images/processor6.svg',
                                        './images/monitor2.png',
                                        './images/author_jprieto.png',
                                        './images/author_acaldero.png',
                                        './images/cfg-rf.gif',
                                        './images/controlunit6.svg',
                                        './images/keyboard1.png',
                                        './images/cfg-colors.gif',
                                        './images/fire.gif',
                                        './images/author_fgarcia.png',
                                        './images/cpu6.svg',
                                        './images/arcos.svg',
					'./images/stop_classic.gif',
					'./images/stop_simple.gif',
					'./images/stop_pushpin.gif',
					'./images/stop_cat1.gif',
					'./images/stop_dog1.gif',
					'./images/stop_super.gif',
					'./images/stop_batman.gif',
					'./images/stop_hp1.gif',
					'./images/stop_hp2.gif',
					'./images/stop_lotr1.gif',
					'./images/stop_lotr2.gif',
					'./images/stop_lotr3.gif',
					'./images/stop_lotr4.gif',
					'./images/stop_bb8.gif',
					'./images/stop_r2d2.gif',
					'./images/stop_sw.gif',
					'./images/stop_vader1.gif',
                                        './docs/manifest.json',
                                        './docs/gpl.txt',
                                        './docs/lgpl.txt',
                                        './examples/exampleMicrocodeS2E1.txt',
                                        './examples/exampleMicrocodeS2E2.txt',
                                        './examples/exampleMicrocodeS2E3.txt',
                                        './examples/exampleMicrocodeS4E1.txt',
                                        './examples/exampleMicrocodeS2E4.txt',
                                        './examples/exampleMicrocodeS4E2.txt',
                                        './examples/exampleMicrocodeS4E3.txt',
                                        './examples/exampleMicrocodeS3E2.txt',
                                        './examples/exampleMicrocodeS1E1.txt',
                                        './examples/exampleMicrocodeS3E3.txt',
                                        './examples/exampleMicrocodeS3E1.txt',
                                        './examples/exampleMicrocodeS1E3.txt',
                                        './examples/exampleMicrocodeS1E2.txt',
                                        './examples/exampleMicrocodeS3E4.txt',
                                        './examples/exampleMicrocodeMIPS.txt',
                                        './examples/exampleMicrocodeS1E4.txt',
                                        './examples/exampleCodeS2E4.txt',
                                        './examples/exampleCodeS4E2.txt',
                                        './examples/exampleCodeS4E3.txt',
                                        './examples/exampleCodeS4E1.txt',
                                        './examples/exampleCodeS2E2.txt',
                                        './examples/exampleCodeS2E3.txt',
                                        './examples/exampleCodeS2E1.txt',
                                        './examples/exampleCodeS1E4.txt',
                                        './examples/exampleCodeS3E4.txt',
                                        './examples/exampleCodeS3E1.txt',
                                        './examples/exampleCodeS1E3.txt',
                                        './examples/exampleCodeS1E2.txt',
                                        './examples/exampleCodeS3E2.txt',
                                        './examples/exampleCodeS1E1.txt',
                                        './examples/exampleCodeS3E3.txt',
                                        './tutorials/welcome/help_usage.gif',
                                        './tutorials/welcome/menu_open.gif',
                                        './tutorials/welcome/config_usage.gif',
                                        './tutorials/welcome/simulation_xinstruction.gif',
                                        './tutorials/welcome/example_usage.gif',
                                        './help/about-es.html',
                                        './help/about-en.html',
                                        './help/signals/props002.xml',
                                        './help/signals/image008.jpg',
                                        './help/signals/image008.png',
                                        './help/signals/image009.png',
                                        './help/signals/colorschememapping.xml',
                                        './help/signals/item0001.xml',
                                        './help/signals/themedata.thmx',
                                        './help/signals/image002.png',
                                        './help/signals/image003.png',
                                        './help/signals/image003.jpg',
                                        './help/signals/image001.jpg',
                                        './help/signals/image001.png',
                                        './help/signals/image004.jpg',
                                        './help/signals/image004.png',
                                        './help/signals/image010.png',
                                        './help/signals/image005.png',
                                        './help/signals/image005.jpg',
                                        './help/signals/image007.jpg',
                                        './help/signals/filelist.xml',
                                        './help/signals/image006.png',
                                        './help/signals/image006.jpg',
                                        './help/signals/header.html',
                                        './help/signals-en.html',
                                        './help/signals-es.html',
                                        './help/simulator-en.html',
                                        './help/simulator-es.html',
                                        './help/simulator/simulator002.jpg',
                                        './help/simulator/simulator016.jpg',
                                        './help/simulator/simulator017.jpg',
                                        './help/simulator/simulator003.jpg',
                                        './help/simulator/simulator015.jpg',
                                        './help/simulator/simulator001.jpg',
                                        './help/simulator/simulator014.jpg',
                                        './help/simulator/simulator010.jpg',
                                        './help/simulator/simulator004.jpg',
                                        './help/simulator/simulator005.jpg',
                                        './help/simulator/simulator011.jpg',
                                        './help/simulator/simulator007.jpg',
                                        './help/simulator/simulator013.jpg',
                                        './help/simulator/simulator012.jpg',
                                        './help/simulator/simulator006.jpg',
                                        './help/simulator/assembly004.jpg',
                                        './help/simulator/assembly005.jpg',
                                        './help/simulator/assembly001.png',
                                        './help/simulator/assembly002.jpg',
                                        './help/simulator/assembly003.jpg',
                                        './help/simulator/firmware001.jpg',
                                        './help/simulator/simulator008.jpg',
                                        './help/simulator/firmware002.jpg',
                                        './help/simulator/firmware003.png',
                                        './help/simulator/simulator009.jpg',
                                        './help/simulator/simulator018.jpg',
                                        './help/simulator/firmware004.jpg',
                                        './help/simulator/firmware005.jpg',
                                        './external/jquery.mobile-1.4.5.min.css',
                                        './external/jquery.min.js',
                                        './external/jquery-ui.min.js',
                                        './external/jquery.mobile-1.4.5.min.js',
                                        './external/external.min.css',
                                        './external/external.min.js',
                                        './min.sim_all.js',
                                        './min.sim_hw.js',
                                        './min.wepsim.js',
                                        './min.sim_info.js',
					'./index.html'
				    ]).then(function() {
					self.skipWaiting();
				    });
				})
			    );
});


 /*
  * fetch
  */

self.addEventListener('fetch', 
	              function(event) {
			    event.respondWith(fetchURL(event.request)) ;
                      });

