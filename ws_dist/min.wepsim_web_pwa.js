/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

var cacheName = 'v221a_static';


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
                                        './examples/checkpoint/tutorial_2.txt',
                                        './examples/checkpoint/tutorial_1.txt',
                                        './examples/hardware/ep/images/controlunit.svg',
                                        './examples/hardware/ep/images/cpu.svg',
                                        './examples/hardware/ep/images/processor.svg',
                                        './examples/hardware/ep/help/hardware-ja.html',
                                        './examples/hardware/ep/help/hardware-zh_cn.html',
                                        './examples/hardware/ep/help/signals-ja.html',
                                        './examples/hardware/ep/help/signals-de.html',
                                        './examples/hardware/ep/help/signals-kr.html',
                                        './examples/hardware/ep/help/signals-zh_cn.html',
                                        './examples/hardware/ep/help/signals-fr.html',
                                        './examples/hardware/ep/help/signals/image001.jpg',
                                        './examples/hardware/ep/help/signals/colorschememapping.xml',
                                        './examples/hardware/ep/help/signals/image007.jpg',
                                        './examples/hardware/ep/help/signals/filelist.xml',
                                        './examples/hardware/ep/help/signals/image010.png',
                                        './examples/hardware/ep/help/signals/item0001.xml',
                                        './examples/hardware/ep/help/signals/image008.png',
                                        './examples/hardware/ep/help/signals/props002.xml',
                                        './examples/hardware/ep/help/signals/image006.png',
                                        './examples/hardware/ep/help/signals/image002.png',
                                        './examples/hardware/ep/help/signals/image006.jpg',
                                        './examples/hardware/ep/help/signals/image004.png',
                                        './examples/hardware/ep/help/signals/image005.png',
                                        './examples/hardware/ep/help/signals/themedata.thmx',
                                        './examples/hardware/ep/help/signals/image004.jpg',
                                        './examples/hardware/ep/help/signals/image008.jpg',
                                        './examples/hardware/ep/help/signals/image001.png',
                                        './examples/hardware/ep/help/signals/image003.png',
                                        './examples/hardware/ep/help/signals/image003.jpg',
                                        './examples/hardware/ep/help/signals/header.html',
                                        './examples/hardware/ep/help/signals/image009.png',
                                        './examples/hardware/ep/help/signals/image005.jpg',
                                        './examples/hardware/ep/help/hardware-es.html',
                                        './examples/hardware/ep/help/hardware-ru.html',
                                        './examples/hardware/ep/help/signals-es.html',
                                        './examples/hardware/ep/help/hardware-it.html',
                                        './examples/hardware/ep/help/hardware-hi.html',
                                        './examples/hardware/ep/help/hardware-fr.html',
                                        './examples/hardware/ep/help/signals-hi.html',
                                        './examples/hardware/ep/help/signals-ru.html',
                                        './examples/hardware/ep/help/hardware-kr.html',
                                        './examples/hardware/ep/help/signals-en.html',
                                        './examples/hardware/ep/help/signals-pt.html',
                                        './examples/hardware/ep/help/hardware-en.html',
                                        './examples/hardware/ep/help/signals-it.html',
                                        './examples/hardware/ep/help/hardware-pt.html',
                                        './examples/hardware/ep/help/hardware-de.html',
                                        './examples/assembly/mips/s1e4.asm',
                                        './examples/assembly/mips/s1e1.asm',
                                        './examples/assembly/mips/s1e3.asm',
                                        './examples/assembly/mips/s1e2.asm',
                                        './examples/assembly/rv32/s1e1.asm',
                                        './examples/assembly/rv32/s1e2.asm',
                                        './examples/assembly/rv32/s2e1.asm',
                                        './examples/assembly/rv32/s3e1.asm',
                                        './examples/microcode/mips/ep_bare.mc',
                                        './examples/microcode/mips/ep_base.mc',
                                        './examples/microcode/mips/ep_enhanced.mc',
                                        './examples/microcode/mips/ep_interactive.mc',
                                        './examples/microcode/mips/ep_os.mc',
                                        './examples/microcode/mips/poc_base.mc',
                                        './examples/microcode/mips/poc_os.mc',
                                        './examples/microcode/rv32/ep_bare.mc',
                                        './examples/microcode/rv32/ep_base.mc',
                                        './examples/microcode/rv32/ep_min.mc',
                                        './examples/microcode/rv32/poc_base.mc',
                                        './examples/microcode/rv32/poc_min.mc',
                                        './examples/microcode/z80/ep_bare.mc',
                                        './examples/examples_set/mips/default.json',
                                        './examples/examples_set/rv32/default.json',
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

