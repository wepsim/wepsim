/*
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

var cacheName = 'v197a_static';


/*
 * install
 */

self.addEventListener('install', 
	              function(e) {
			    e.waitUntil(
				caches.open(cacheName).then(function(cache) {
				    return cache.addAll([
                                        './external/jquery.min.js',
                                        './min.wepsim_pwa.js',
                                        './min.external.css',
                                        './min.external.js',
                                        './min.sim_all.js',
                                        './min.wepsim_web.js',
                                        './images/ajax-loader.gif',
                                        './images/reset.svg',
                                        './images/author_salonso.png',
                                        './images/monitor2.png',
                                        './images/author_jprieto.png',
                                        './images/author_acaldero.png',
                                        './images/cfg-rf.gif',
                                        './images/keyboard1.png',
                                        './images/cfg-colors.gif',
                                        './images/fire.gif',
                                        './images/author_fgarcia.png',
                                        './images/arcos.svg',
					'./images/stop/stop_classic.gif',
					'./images/stop/stop_simple.gif',
					'./images/stop/stop_pushpin.gif',
					'./images/stop/stop_cat1.gif',
					'./images/stop/stop_dog1.gif',
					'./images/stop/stop_super.gif',
					'./images/stop/stop_batman.gif',
					'./images/stop/stop_hp1.gif',
					'./images/stop/stop_hp2.gif',
					'./images/stop/stop_lotr1.gif',
					'./images/stop/stop_lotr2.gif',
					'./images/stop/stop_lotr3.gif',
					'./images/stop/stop_lotr4.gif',
					'./images/stop/stop_bb8.gif',
					'./images/stop/stop_r2d2.gif',
					'./images/stop/stop_sw.gif',
					'./images/stop/stop_vader1.gif',
					'./images/stop/stop_grail.gif',
					'./images/stop/stop_despicable.gif',
                                        './docs/manifest.json',
                                        './docs/gpl.txt',
                                        './docs/lgpl.txt',
                                        './help/about-es.html',
                                        './help/about-en.html',
                                        './help/welcome/help_usage.gif',
                                        './help/welcome/config_usage.gif',
                                        './help/welcome/simulation_xinstruction.gif',
                                        './help/welcome/example_usage.gif',
                                        './help/simulator-en.html',
                                        './help/simulator-es.html',
                                        './help/simulator/simulator001.jpg',
                                        './help/simulator/simulator002.jpg',
                                        './help/simulator/simulator003.jpg',
                                        './help/simulator/simulator004.jpg',
                                        './help/simulator/simulator005.jpg',
                                        './help/simulator/simulator006.jpg',
                                        './help/simulator/simulator007.jpg',
                                        './help/simulator/simulator008.jpg',
                                        './help/simulator/simulator009.jpg',
                                        './help/simulator/simulator010.jpg',
                                        './help/simulator/simulator011.jpg',
                                        './help/simulator/simulator012.jpg',
                                        './help/simulator/simulator013.jpg',
                                        './help/simulator/simulator014.jpg',
                                        './help/simulator/simulator015.jpg',
                                        './help/simulator/simulator016.jpg',
                                        './help/simulator/simulator017.jpg',
                                        './help/simulator/assembly001.png',
                                        './help/simulator/assembly002.jpg',
                                        './help/simulator/assembly003.jpg',
                                        './help/simulator/assembly004.jpg',
                                        './help/simulator/assembly005.jpg',
                                        './help/simulator/firmware001.jpg',
                                        './help/simulator/firmware002.jpg',
                                        './help/simulator/firmware004.jpg',
                                        './help/simulator/firmware005.jpg',
                                        './examples/hardware/ep/hw_def.json',
                                        './examples/hardware/ep/images/controlunit.svg',
                                        './examples/hardware/ep/images/processor.svg',
                                        './examples/hardware/ep/images/cpu.svg',
                                        './examples/hardware/ep/help/signals-en.html',
                                        './examples/hardware/ep/help/signals-es.html',
                                        './examples/hardware/ep/help/signals/props002.xml',
                                        './examples/hardware/ep/help/signals/image008.jpg',
                                        './examples/hardware/ep/help/signals/image008.png',
                                        './examples/hardware/ep/help/signals/image009.png',
                                        './examples/hardware/ep/help/signals/colorschememapping.xml',
                                        './examples/hardware/ep/help/signals/item0001.xml',
                                        './examples/hardware/ep/help/signals/themedata.thmx',
                                        './examples/hardware/ep/help/signals/image002.png',
                                        './examples/hardware/ep/help/signals/image003.png',
                                        './examples/hardware/ep/help/signals/image003.jpg',
                                        './examples/hardware/ep/help/signals/image001.jpg',
                                        './examples/hardware/ep/help/signals/image001.png',
                                        './examples/hardware/ep/help/signals/image004.jpg',
                                        './examples/hardware/ep/help/signals/image004.png',
                                        './examples/hardware/ep/help/signals/image010.png',
                                        './examples/hardware/ep/help/signals/image005.png',
                                        './examples/hardware/ep/help/signals/image005.jpg',
                                        './examples/hardware/ep/help/signals/image007.jpg',
                                        './examples/hardware/ep/help/signals/filelist.xml',
                                        './examples/hardware/ep/help/signals/image006.png',
                                        './examples/hardware/ep/help/signals/image006.jpg',
                                        './examples/hardware/ep/help/signals/header.html',
                                        './examples/hardware/ep/help/hardware-en.html',
                                        './examples/hardware/ep/help/hardware-es.html',
                                        './examples/hardware/poc/hw_def.json',
                                        './examples/hardware/poc/images/controlunit.svg',
                                        './examples/hardware/poc/images/processor.svg',
                                        './examples/hardware/poc/images/cpu.svg',
                                        './examples/hardware/poc/help/signals-en.html',
                                        './examples/hardware/poc/help/signals-es.html',
                                        './examples/hardware/poc/help/signals/props002.xml',
                                        './examples/hardware/poc/help/signals/image008.jpg',
                                        './examples/hardware/poc/help/signals/image008.png',
                                        './examples/hardware/poc/help/signals/image009.png',
                                        './examples/hardware/poc/help/signals/colorschememapping.xml',
                                        './examples/hardware/poc/help/signals/item0001.xml',
                                        './examples/hardware/poc/help/signals/themedata.thmx',
                                        './examples/hardware/poc/help/signals/image002.png',
                                        './examples/hardware/poc/help/signals/image003.png',
                                        './examples/hardware/poc/help/signals/image003.jpg',
                                        './examples/hardware/poc/help/signals/image001.jpg',
                                        './examples/hardware/poc/help/signals/image001.png',
                                        './examples/hardware/poc/help/signals/image004.jpg',
                                        './examples/hardware/poc/help/signals/image004.png',
                                        './examples/hardware/poc/help/signals/image010.png',
                                        './examples/hardware/poc/help/signals/image005.png',
                                        './examples/hardware/poc/help/signals/image005.jpg',
                                        './examples/hardware/poc/help/signals/image007.jpg',
                                        './examples/hardware/poc/help/signals/filelist.xml',
                                        './examples/hardware/poc/help/signals/image006.png',
                                        './examples/hardware/poc/help/signals/image006.jpg',
                                        './examples/hardware/poc/help/signals/header.html',
                                        './examples/hardware/poc/help/hardware-en.html',
                                        './examples/hardware/poc/help/hardware-es.html',
                                        './examples/assembly/asm-ep_s4_e5.txt',
                                        './examples/assembly/asm-ep_s4_e4.txt',
                                        './examples/assembly/asm-ep_s2_e3.txt',
                                        './examples/assembly/asm-ep_s1_e4.txt',
                                        './examples/assembly/asm-ep_s1_e1.txt',
                                        './examples/assembly/asm-poc_s1_e1.txt',
                                        './examples/assembly/asm-poc_s5_e1.txt',
                                        './examples/assembly/asm-ep_s4_e2.txt',
                                        './examples/assembly/asm-ep_s3_e3.txt',
                                        './examples/assembly/asm-ep_s3_e4.txt',
                                        './examples/assembly/asm-ep_s1_e3.txt',
                                        './examples/assembly/asm-ep_s2_e4.txt',
                                        './examples/assembly/asm-ep_s3_e1.txt',
                                        './examples/assembly/asm-ep_s1_e2.txt',
                                        './examples/assembly/asm-ep_s2_e1.txt',
                                        './examples/assembly/asm-ep_s4_e3.txt',
                                        './examples/assembly/asm-ep_s2_e2.txt',
                                        './examples/assembly/asm-ep_s5_e1.txt',
                                        './examples/assembly/asm-ep_s4_e1.txt',
                                        './examples/assembly/asm-ep_s3_e2.txt',
                                        './examples/microcode/mc-ep_bare.txt',
                                        './examples/microcode/mc-ep_s2_e4.txt',
                                        './examples/microcode/mc-ep_s4_e1.txt',
                                        './examples/microcode/mc-ep_s4_e2.txt',
                                        './examples/microcode/mc-poc_base.txt',
                                        './examples/microcode/mc-ep_mips.txt',
                                        './examples/microcode/mc-ep_s3_e3.txt',
                                        './examples/microcode/mc-ep_s3_e1.txt',
                                        './examples/microcode/mc-ep_s4_e3.txt',
                                        './examples/microcode/mc-ep_s3_e4.txt',
                                        './examples/microcode/mc-ep_s3_e2.txt',
                                        './examples/microcode/mc-ep_enhanced.txt',
                                        './examples/microcode/mc-ep_base.txt',
                                        './examples/microcode/mc-ep_s2_e3.txt',
                                        './examples/microcode/mc-ep_s4_e4.txt',
                                        './examples/microcode/mc-poc_bare.txt',
                                        './examples/microcode/mc-poc_s3.txt',
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
			  // NEW: https://developer.mozilla.org/es/docs/Web/API/FetchEvent
			  if (event.request.method != 'GET') {
			      event.respondWith(fetch(event.request)) ;
			      return ;
                          }

			  event.respondWith(async function() {
			      const cache = await caches.open(cacheName);
			      const cachedResponse = await cache.match(event.request);

			      if ( (event.request.cache === 'only-if-cached') && 
                                   (event.request.mode  !== 'same-origin') ) {
			            return;
			      }

			      if (cachedResponse) {
			          event.waitUntil(cache.add(event.request));
			          return cachedResponse;
			      }
			      return fetch(event.request);
			  }());
                      });

