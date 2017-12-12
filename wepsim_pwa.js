
// cache versioning
var cacheName = 'v185b:static';

// install
self.addEventListener('install', 
	              function(e) {
			    e.waitUntil(
				caches.open(cacheName).then(function(cache) {
				    return cache.addAll([
                                        './wepsim_pwa.js',
                                        './images/stop_pushpin.gif',
                                        './images/ajax-loader.gif',
                                        './images/reset.svg',
                                        './images/author_salonso.png',
                                        './images/processor6.svg',
                                        './images/monitor2.png',
                                        './images/stop_r2d2.gif',
                                        './images/author_jprieto.png',
                                        './images/stop_simple.gif',
                                        './images/stop_super.gif',
                                        './images/author_acaldero.png',
                                        './images/stop_sw.gif',
                                        './images/cfg-rf.gif',
                                        './images/controlunit6.svg',
                                        './images/keyboard1.png',
                                        './images/stop_cat1.gif',
                                        './images/cfg-colors.gif',
                                        './images/fire.gif',
                                        './images/stop_vader1.gif',
                                        './images/author_fgarcia.png',
                                        './images/stop_batman.gif',
                                        './images/stop_bb8.gif',
                                        './images/cpu6.svg',
                                        './images/stop_dog1.gif',
                                        './images/arcos.svg',
                                        './images/stop_classic.gif',
                                        './docs/gpl.txt',
                                        './docs/manifest.json',
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
                                        './help/simulator-en.html',
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
                                        './help/about-en.html',
                                        './help/signals-es.html',
                                        './help/simulator-es.html',
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

// fetch
self.addEventListener('fetch', 
	              function(event) {
			    // on-line: try the fresh version
                            if (navigator.onLine) {
				return fetch(event.request);
                            }

			    event.respondWith(
				caches.match(event.request).then(function(response) {
				    // cache
				    if (response) {
					return response;
				    }
				    // on-line
				    return fetch(event.request);
				})
			    );
});

