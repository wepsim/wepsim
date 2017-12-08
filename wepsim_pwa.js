
// cache versioning
var cacheName = 'v185a:static';

// install
self.addEventListener('install', 
	              function(e) {
			    e.waitUntil(
				caches.open(cacheName).then(function(cache) {
				    return cache.addAll([
					'./images/arcos.svg',
					'./images/controlunit6.svg',
					'./images/cpu6.svg',
					'./images/processor6.svg',
					'./images/reset.svg',
					'./images/stop_classic.gif',
					'./images/keyboard1.png',
					'./images/monitor2.png',
					'./images/cfg-rf.gif',
					'./images/cfg-colors.gif',
					'./images/fire.gif',
                                        './external/jquery.mobile-1.4.5.min.css',
                                        './external/external.min.css',
                                        './external/jquery.min.js',
                                        './external/jquery-ui.min.js',
                                        './external/jquery.mobile-1.4.5.min.js',
                                        './external/external.min.js',
					'./help/about-en.html',
					'./help/about-es.html',
					'./help/signals-en.html',
					'./help/signals-es.html',
					'./help/simulator-en.html',
					'./help/simulator-es.html',
                                        './examples/exampleCodeS1E1.txt',
                                        './examples/exampleCodeS1E2.txt',
                                        './examples/exampleCodeS1E3.txt',
                                        './examples/exampleCodeS1E4.txt',
                                        './examples/exampleCodeS2E1.txt',
                                        './examples/exampleCodeS2E2.txt',
                                        './examples/exampleCodeS2E3.txt',
                                        './examples/exampleCodeS2E4.txt',
                                        './examples/exampleCodeS3E1.txt',
                                        './examples/exampleCodeS3E2.txt',
                                        './examples/exampleCodeS3E3.txt',
                                        './examples/exampleCodeS3E4.txt',
                                        './examples/exampleCodeS4E1.txt',
                                        './examples/exampleCodeS4E2.txt',
                                        './examples/exampleCodeS4E3.txt',
                                        './examples/exampleMicrocodeMIPS.txt',
                                        './examples/exampleMicrocodeS1E1.txt',
                                        './examples/exampleMicrocodeS1E2.txt',
                                        './examples/exampleMicrocodeS1E3.txt',
                                        './examples/exampleMicrocodeS1E4.txt',
                                        './examples/exampleMicrocodeS2E1.txt',
                                        './examples/exampleMicrocodeS2E2.txt',
                                        './examples/exampleMicrocodeS2E3.txt',
                                        './examples/exampleMicrocodeS2E4.txt',
                                        './examples/exampleMicrocodeS3E1.txt',
                                        './examples/exampleMicrocodeS3E2.txt',
                                        './examples/exampleMicrocodeS3E3.txt',
                                        './examples/exampleMicrocodeS3E4.txt',
                                        './examples/exampleMicrocodeS4E1.txt',
                                        './examples/exampleMicrocodeS4E2.txt',
                                        './examples/exampleMicrocodeS4E3.txt',
                                        './tutorials/welcome/config_usage.gif',
                                        './tutorials/welcome/example_usage.gif',
                                        './tutorials/welcome/help_usage.gif',
                                        './tutorials/welcome/menu_open.gif',
                                        './tutorials/welcome/simulation_xinstruction.gif',
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

