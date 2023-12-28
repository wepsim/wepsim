/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

var cacheName = 'v231a_static';


/*
 * install
 */

self.addEventListener('install',
	              function(e) {
			    e.waitUntil(
				caches.open(cacheName).then(function(cache) {
				    return cache.addAll([
                                        './external/jquery.min.js',
                                        './min.external.css',
                                        './min.external.js',
                                        './min.sim_all.js',
                                        './min.wepsim_web.js',
                                        './min.wepsim_i18n.js',
                                        './min.wepsim_web_pwa.js',
                                        './wepsim-classic.html',
                                        './wepsim-compact.html',
                                        './index.html',
                                        './repo/checkpoint/tutorial_2.txt',
                                        './repo/checkpoint/tutorial_1.txt',
                                        './repo/hardware/ep/images/controlunit.svg',
                                        './repo/hardware/ep/images/cpu.svg',
                                        './repo/hardware/ep/images/processor.svg',
                                        './repo/hardware/ep/help/hardware-ja.html',
                                        './repo/hardware/ep/help/hardware-zh_cn.html',
                                        './repo/hardware/ep/help/signals-ja.html',
                                        './repo/hardware/ep/help/signals-de.html',
                                        './repo/hardware/ep/help/signals-kr.html',
                                        './repo/hardware/ep/help/signals-zh_cn.html',
                                        './repo/hardware/ep/help/signals-fr.html',
                                        './repo/hardware/ep/help/signals/image001.jpg',
                                        './repo/hardware/ep/help/signals/colorschememapping.xml',
                                        './repo/hardware/ep/help/signals/image007.jpg',
                                        './repo/hardware/ep/help/signals/filelist.xml',
                                        './repo/hardware/ep/help/signals/image010.png',
                                        './repo/hardware/ep/help/signals/item0001.xml',
                                        './repo/hardware/ep/help/signals/image008.png',
                                        './repo/hardware/ep/help/signals/props002.xml',
                                        './repo/hardware/ep/help/signals/image006.png',
                                        './repo/hardware/ep/help/signals/image002.png',
                                        './repo/hardware/ep/help/signals/image006.jpg',
                                        './repo/hardware/ep/help/signals/image004.png',
                                        './repo/hardware/ep/help/signals/image005.png',
                                        './repo/hardware/ep/help/signals/themedata.thmx',
                                        './repo/hardware/ep/help/signals/image004.jpg',
                                        './repo/hardware/ep/help/signals/image008.jpg',
                                        './repo/hardware/ep/help/signals/image001.png',
                                        './repo/hardware/ep/help/signals/image003.png',
                                        './repo/hardware/ep/help/signals/image003.jpg',
                                        './repo/hardware/ep/help/signals/header.html',
                                        './repo/hardware/ep/help/signals/image009.png',
                                        './repo/hardware/ep/help/signals/image005.jpg',
                                        './repo/hardware/ep/help/hardware-es.html',
                                        './repo/hardware/ep/help/hardware-ru.html',
                                        './repo/hardware/ep/help/signals-es.html',
                                        './repo/hardware/ep/help/hardware-it.html',
                                        './repo/hardware/ep/help/hardware-hi.html',
                                        './repo/hardware/ep/help/hardware-fr.html',
                                        './repo/hardware/ep/help/signals-hi.html',
                                        './repo/hardware/ep/help/signals-ru.html',
                                        './repo/hardware/ep/help/hardware-kr.html',
                                        './repo/hardware/ep/help/signals-en.html',
                                        './repo/hardware/ep/help/signals-pt.html',
                                        './repo/hardware/ep/help/hardware-en.html',
                                        './repo/hardware/ep/help/signals-it.html',
                                        './repo/hardware/ep/help/hardware-pt.html',
                                        './repo/hardware/ep/help/hardware-de.html',
                                        './repo/assembly/mips/s1e4.asm',
                                        './repo/assembly/mips/s1e1.asm',
                                        './repo/assembly/mips/s1e3.asm',
                                        './repo/assembly/mips/s1e2.asm',
                                        './repo/assembly/rv32/s1e1.asm',
                                        './repo/assembly/rv32/s1e2.asm',
                                        './repo/assembly/rv32/s2e1.asm',
                                        './repo/assembly/rv32/s3e1.asm',
                                        './repo/microcode/mips/ep_bare.mc',
                                        './repo/microcode/mips/ep_base.mc',
                                        './repo/microcode/mips/ep_enhanced.mc',
                                        './repo/microcode/mips/ep_interactive.mc',
                                        './repo/microcode/mips/ep_os.mc',
                                        './repo/microcode/mips/poc_base.mc',
                                        './repo/microcode/mips/poc_os.mc',
                                        './repo/microcode/rv32/ep_bare.mc',
                                        './repo/microcode/rv32/ep_base.mc',
                                        './repo/microcode/rv32/ep_min.mc',
                                        './repo/microcode/rv32/poc_base.mc',
                                        './repo/microcode/rv32/poc_min.mc',
                                        './repo/microcode/z80/ep_bare.mc',
                                        './repo/examples_set/mips/default.json',
                                        './repo/examples_set/rv32/default.json',
                                        './images/author_jprieto.png',
                                        './images/author_fgarcia.png',
                                        './images/author_salonso.png',
                                        './images/author_acaldero.png',
                                        './images/splash/ipad_splash.png',
                                        './images/splash/iphone6_splash.png',
                                        './images/splash/iphoneplus_splash.png',
                                        './images/splash/iphone5_splash.png',
                                        './images/splash/ipadpro1_splash.png',
                                        './images/splash/iphonex_splash.png',
                                        './images/splash/ipadpro2_splash.png',
                                        './images/cfg-rf.gif',
                                        './images/simulator/simulator012.jpg',
                                        './images/simulator/assembly002b.jpg',
                                        './images/simulator/simulator013.jpg',
                                        './images/simulator/firmware004.jpg',
                                        './images/simulator/assembly005.jpg',
                                        './images/simulator/simulator006.jpg',
                                        './images/simulator/simulator002.jpg',
                                        './images/simulator/simulator010.jpg',
                                        './images/simulator/simulator015.jpg',
                                        './images/simulator/simulator014.jpg',
                                        './images/simulator/simulator022.jpg',
                                        './images/simulator/simulator001.jpg',
                                        './images/simulator/simulator009.jpg',
                                        './images/simulator/assembly002.jpg',
                                        './images/simulator/simulator018.jpg',
                                        './images/simulator/simulator020.jpg',
                                        './images/simulator/simulator005.jpg',
                                        './images/simulator/simulator023.jpg',
                                        './images/simulator/simulator011.jpg',
                                        './images/simulator/assembly003.jpg',
                                        './images/simulator/simulator008.jpg',
                                        './images/simulator/simulator021.jpg',
                                        './images/simulator/simulator007.jpg',
                                        './images/simulator/simulator004.jpg',
                                        './images/simulator/simulator024.jpg',
                                        './images/simulator/firmware002.jpg',
                                        './images/simulator/assembly001.png',
                                        './images/simulator/simulator017.jpg',
                                        './images/simulator/simulator003.jpg',
                                        './images/simulator/simulator016.jpg',
                                        './images/simulator/firmware001.jpg',
                                        './images/simulator/assembly004.jpg',
                                        './images/simulator/firmware005.jpg',
                                        './images/cfg-colors.gif',
                                        './images/ajax-loader.gif',
                                        './images/fire.gif',
                                        './images/icons/android-chrome-512x512.png',
                                        './images/icons/favicon-16x16.png',
                                        './images/icons/mstile-150x150.png',
                                        './images/icons/favicon-32x32.png',
                                        './images/icons/browserconfig.xml',
                                        './images/icons/apple-touch-icon.png',
                                        './images/icons/favicon-167x167.png',
                                        './images/icons/safari-pinned-tab.svg',
                                        './images/icons/favicon-180x180.png',
                                        './images/icons/apple-touch-icon-precomposed.png',
                                        './images/icons/favicon.ico',
                                        './images/icons/favicon-152x152.png',
                                        './images/icons/android-chrome-192x192.png',
                                        './images/reset.svg',
                                        './images/keyboard1.png',
                                        './images/wepsim.png',
                                        './images/monitor2.png',
                                        './images/welcome/config_usage.gif',
                                        './images/welcome/help_usage.gif',
                                        './images/welcome/states_usage.gif',
                                        './images/welcome/example_usage.gif',
                                        './images/welcome/change_signal_value.gif',
                                        './images/welcome/simulation_xinstruction.gif',
                                        './images/stop/stop_sw.gif',
                                        './images/stop/stop_lotr2.gif',
                                        './images/stop/stop_pushpin.gif',
                                        './images/stop/stop_lotr3.gif',
                                        './images/stop/stop_lotr4.gif',
                                        './images/stop/stop_r2d2.gif',
                                        './images/stop/stop_lotr1.gif',
                                        './images/stop/stop_hp1.gif',
                                        './images/stop/stop_classic.gif',
                                        './images/stop/stop_super.gif',
                                        './images/stop/stop_vader1.gif',
                                        './images/stop/stop_bb8.gif',
                                        './images/stop/stop_batman.gif',
                                        './images/stop/stop_hp2.gif',
                                        './images/stop/stop_simple.gif',
                                        './images/stop/stop_cat1.gif',
                                        './images/stop/stop_grail.gif',
                                        './images/stop/stop_dog1.gif',
                                        './images/stop/stop_despicable.gif',
                                        './help/simulator-es.html',
                                        './help/simulator-en.html',
                                        './help/about-es.html',
                                        './help/about-en.html',
                                        './images/arcos.svg',
                                        './images/dptoinf.png',
                                        './images/uc3m.png'
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
			      return null ;
                          }

			  event.respondWith(async function() {
			      const cache = await caches.open(cacheName);
			      const cachedResponse = await cache.match(event.request);

			      if ( (event.request.cache === 'only-if-cached') &&
                                   (event.request.mode  !== 'same-origin') ) {
			            return null ;
			      }

			      if (cachedResponse) {
			          event.waitUntil(cache.add(event.request));
			          return cachedResponse;
			      }
			      return fetch(event.request);
			  }());
                      });

