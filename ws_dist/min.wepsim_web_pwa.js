/*
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

var cacheName = 'v210g_static';


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
                                        './examples/checklist/cl-ep_s2_e2.txt',
                                        './examples/checklist/cl-ep_s3_e3.txt',
                                        './examples/checklist/cl-ep_s1_e3.txt',
                                        './examples/checklist/cl-ep_s4_e2.txt',
                                        './examples/checklist/cl-ep_s4_e1.txt',
                                        './examples/checklist/cl-ep_s1_e4.txt',
                                        './examples/checklist/cl-ep_s3_e4.txt',
                                        './examples/checklist/cl-ep_s1_e2.txt',
                                        './examples/checklist/cl-ep_s2_e4.txt',
                                        './examples/checklist/cl-ep_s3_e2.txt',
                                        './examples/checklist/cl-ep_s3_e1.txt',
                                        './examples/checklist/cl-ep_s2_e3.txt',
                                        './examples/checklist/cl-ep_s1_e1.txt',
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
                                        './examples/hardware/poc/images/controlunit.svg',
                                        './examples/hardware/poc/images/cpu.svg',
                                        './examples/hardware/poc/images/processor.svg',
                                        './examples/hardware/poc/help/hardware-ja.html',
                                        './examples/hardware/poc/help/hardware-zh_cn.html',
                                        './examples/hardware/poc/help/signals-ja.html',
                                        './examples/hardware/poc/help/signals-de.html',
                                        './examples/hardware/poc/help/signals-kr.html',
                                        './examples/hardware/poc/help/signals-zh_cn.html',
                                        './examples/hardware/poc/help/signals-fr.html',
                                        './examples/hardware/poc/help/signals/image001.jpg',
                                        './examples/hardware/poc/help/signals/colorschememapping.xml',
                                        './examples/hardware/poc/help/signals/image007.jpg',
                                        './examples/hardware/poc/help/signals/filelist.xml',
                                        './examples/hardware/poc/help/signals/image010.png',
                                        './examples/hardware/poc/help/signals/item0001.xml',
                                        './examples/hardware/poc/help/signals/image008.png',
                                        './examples/hardware/poc/help/signals/props002.xml',
                                        './examples/hardware/poc/help/signals/image006.png',
                                        './examples/hardware/poc/help/signals/image002.png',
                                        './examples/hardware/poc/help/signals/image006.jpg',
                                        './examples/hardware/poc/help/signals/image004.png',
                                        './examples/hardware/poc/help/signals/image005.png',
                                        './examples/hardware/poc/help/signals/themedata.thmx',
                                        './examples/hardware/poc/help/signals/image004.jpg',
                                        './examples/hardware/poc/help/signals/image008.jpg',
                                        './examples/hardware/poc/help/signals/image001.png',
                                        './examples/hardware/poc/help/signals/image003.png',
                                        './examples/hardware/poc/help/signals/image003.jpg',
                                        './examples/hardware/poc/help/signals/header.html',
                                        './examples/hardware/poc/help/signals/image009.png',
                                        './examples/hardware/poc/help/signals/image005.jpg',
                                        './examples/hardware/poc/help/hardware-es.html',
                                        './examples/hardware/poc/help/hardware-ru.html',
                                        './examples/hardware/poc/help/signals-es.html',
                                        './examples/hardware/poc/help/hardware-it.html',
                                        './examples/hardware/poc/help/hardware-hi.html',
                                        './examples/hardware/poc/help/hardware-fr.html',
                                        './examples/hardware/poc/help/signals-hi.html',
                                        './examples/hardware/poc/help/signals-ru.html',
                                        './examples/hardware/poc/help/hardware-kr.html',
                                        './examples/hardware/poc/help/signals-en.html',
                                        './examples/hardware/poc/help/signals-pt.html',
                                        './examples/hardware/poc/help/hardware-en.html',
                                        './examples/hardware/poc/help/signals-it.html',
                                        './examples/hardware/poc/help/hardware-pt.html',
                                        './examples/hardware/poc/help/hardware-de.html',
                                        './examples/assembly/asm-ep_s4_e4.txt',
                                        './examples/assembly/asm-ep_s2_e3.txt',
                                        './examples/assembly/asm-ep_s1_e4.txt',
                                        './examples/assembly/asm-ep_s1_e1.txt',
                                        './examples/assembly/asm-poc_s1_e1.txt',
                                        './examples/assembly/asm-poc_s5_e1.txt',
                                        './examples/assembly/asm-ep_s6_e1.txt',
                                        './examples/assembly/asm-ep_s4_e2.txt',
                                        './examples/assembly/asm-ep_s3_e3.txt',
                                        './examples/assembly/asm-ep_s6_e3.txt',
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
                                        './examples/assembly/asm-ep_s6_e2.txt',
                                        './examples/assembly/asm-ep_s5_e2.txt',
                                        './examples/assembly/asm-ep_r1_e1.txt',
                                        './examples/assembly/asm-ep_r1_e2.txt',
                                        './examples/assembly/asm-ep_r2_e1.txt',
                                        './examples/assembly/asm-ep_r3_e1.txt',
                                        './examples/microcode/mc-ep_bare.txt',
                                        './examples/microcode/mc-ep_mips.txt',
                                        './examples/microcode/mc-ep_mips_base.txt',
                                        './examples/microcode/mc-ep_mips_enhanced.txt',
                                        './examples/microcode/mc-ep_mips_interactive.txt',
                                        './examples/microcode/mc-ep_mips_os.txt',
                                        './examples/microcode/mc-ep_rv32.txt',
                                        './examples/microcode/mc-ep_rv32_bare.txt',
                                        './examples/microcode/mc-ep_z80.txt',
                                        './examples/microcode/mc-poc_bare.txt',
                                        './examples/microcode/mc-poc_mips_base.txt',
                                        './examples/microcode/mc-poc_mips_os.txt',
                                        './examples/examples_set/default.json',
                                        './examples/examples_set/default_packed.json',
                                        './examples/examples_set/ocw_packed.json',
                                        './images/author_acaldero.png',
                                        './images/splash/ipad_splash.png',
                                        './images/splash/iphone6_splash.png',
                                        './images/splash/iphoneplus_splash.png',
                                        './images/splash/iphone5_splash.png',
                                        './images/splash/ipadpro1_splash.png',
                                        './images/splash/iphonex_splash.png',
                                        './images/splash/ipadpro2_splash.png',
                                        './images/cfg-rf.gif',
                                        './images/examples/compiler-explorer-example.png',
                                        './images/author_jprieto.png',
                                        './images/author_fgarcia.png',
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
                                        './images/author_salonso.png',
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
                                        './help/simulator-ru.html',
                                        './help/simulator-zh_cn.html',
                                        './help/simulator-sv.html',
                                        './help/simulator-hi.html',
                                        './help/simulator-pt.html',
                                        './help/simulator-es.html',
                                        './help/simulator-en.html',
                                        './help/simulator-ja.html',
                                        './help/simulator-fr.html',
                                        './help/simulator-kr.html',
                                        './help/simulator-de.html',
                                        './help/simulator-it.html',
                                        './help/about-fr.html',
                                        './help/about-es.html',
                                        './help/about-pt.html',
                                        './help/about-ja.html',
                                        './help/about-sv.html',
                                        './help/about-en.html',
                                        './help/about-it.html',
                                        './help/about-kr.html',
                                        './help/about-ru.html',
                                        './help/about-de.html',
                                        './help/about-hi.html',
                                        './help/about-zh_cn.html',
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

