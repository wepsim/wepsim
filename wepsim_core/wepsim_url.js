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
     * File API
     */

    function wepsim_file_saveTo ( textToWrite, fileNameToSaveAs )
    {
        // checks
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem ;
        if (typeof window.requestFileSystem === "undefined") {
            return false ;
        }

        // save callbacks chain
	var koHandler = function(error) {
            wepsim_notify_error("<strong>ERROR</strong>: failed file write",
                                "Failed file write. " +
                                "Error found " +  error.toString()) ;
	} ;

	var okHandler = function(msg) {
	    wepsim_notify_success('<strong>INFO</strong>',
                                  'Successful file write request: ' + fileNameToSaveAs);
	} ;

	var onWriteFile = function(fileWriter) {
            var textFileAsBlob = new Blob([textToWrite],
                                          { type: 'text/plain' });
            fileWriter.onerror    = koHandler ;
            fileWriter.onwriteend = okHandler ;
            fileWriter.write(textFileAsBlob);
        } ;

	var onCreatFile = function(fileEntry) {
            fileEntry.createWriter(onWriteFile) ;
	} ;

	var onInitFs = function(fs) {
	    fs.root.getFile(fileNameToSaveAs,
                            {create: true, exclusive: false},
                            onCreatFile,
                            koHandler) ;
	} ;

        var grandedBytes = 2*1024*1024 ;

	var onQuotaFs = function(grantedBytes) {
            window.requestFileSystem(PERSISTENT, grandedBytes, onInitFs, koHandler) ;
	} ;

        navigator.webkitPersistentStorage.requestQuota(grandedBytes, onQuotaFs, koHandler) ;
        return true ;
    }


    /*
     * URL API
     */

    function wepsim_file_loadFrom ( fileToLoad, functionOnLoad )
    {
        // checks
        if (typeof fileToLoad === "undefined") {
            return false ;
        }
        var fileReader = new FileReader();
        if (fileReader === null) {
            return false ;
        }

        // read
        fileReader.onload  = function (fileLoadedEvent) {
                                var textFromFileLoaded = fileLoadedEvent.target.result;
                                if (null !== functionOnLoad) {
			            functionOnLoad(textFromFileLoaded);
			        }
                             };
	fileReader.onerror = function(e) {
                                wepsim_notify_error("<strong>ERROR</strong>",
                                                    "File could not be read. " +
                                                    "Error code " + e.target.error.code) ;
			     };

        fileReader.readAsText(fileToLoad, "UTF-8");
        return true ;
    }

    function wepsim_file_downloadTo ( textToWrite, fileNameToSaveAs )
    {
	    var windowURL      = (window.webkitURL || window.URL) ;
            var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' }) ;

            var downloadLink = document.createElement("a");
                downloadLink.innerHTML     = "Download File";
                downloadLink.style.display = "none";
                downloadLink.download      = fileNameToSaveAs;
                downloadLink.href          = windowURL.createObjectURL(textFileAsBlob);
                downloadLink.onclick       = function ( event ) {
                                                document.body.removeChild(event.target);
                                             } ;

            document.body.appendChild(downloadLink);
            downloadLink.click();

	    wepsim_notify_success('<strong>INFO</strong>',
                                  'Successful opportunity for downloading: ' + fileNameToSaveAs);
    }


    /*
     *  Auxiliar API
     */

    function getURLTimeStamp ( )
    {
                return Date.now() ;

/*
		var dateObj = new Date();
		var year    = dateObj.getUTCFullYear();
		var month   = dateObj.getUTCMonth() + 1;
		var day     = dateObj.getUTCDate();
		var hour    = dateObj.getUTCHours();
		var minutes = dateObj.getUTCMinutes();

		return year + month + day + hour + minutes ;
*/
    }

    function fetchURL ( f_url )
    {
		// on-line: try the fresh version
		if (navigator.onLine) {
		    return fetch(f_url + "?time=" + getURLTimeStamp());
		}

		// off-line: try cache version
		return caches.match(f_url);
    }


    /*
     *  Combined API
     */

    function wepsim_save_to_file ( textToWrite, fileNameToSaveAs )
    {
        var ret = false ;

	if (is_cordova())
             ret =     wepsim_file_saveTo(textToWrite, fileNameToSaveAs) ;
        else ret = wepsim_file_downloadTo(textToWrite, fileNameToSaveAs) ;

        return ret ;
    }

    function wepsim_load_from_url ( url, do_next )
    {
	if (false === is_mobile())
	{
		fetchURL(url).then(function(response)
				   {
				      if (typeof response == "undefined") {
					  wepsim_notify_error("<strong>ERROR</strong>",
					                      "File " + url + " could not be fetched:<br>\n" +
                                                              " * Please check that you are on-line.") ;
					  return ;
				      }

				      if (response.ok) {
					  response.text().then(function(text) {
								  do_next(text);
							       }) ;
				      }
				   }) ;
	}
	else
        {
		var xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function() {
			if ((xmlhttp.readyState == 4) && ((xmlhttp.status == 200) || (xmlhttp.status == 0)))
			{
			    var textFromFileLoaded = xmlhttp.responseText ;
			    if (null !== do_next)
				do_next(textFromFileLoaded);
			}
		};

		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}
    }

    function wepsim_url_getJSON ( url_json )
    {
       var jstr = {} ;
       var jobj = [] ;

       try {
           jstr = $.getJSON({'url': url_json, 'async': false}) ;
           jobj = JSON.parse(jstr.responseText) ;
       }
       catch (e) {
           ws_alert("Unable to load '" + url_json + "': " + e + ".\n") ;
           jobj = [] ;
       }

       return jobj ;
    }

    function wepsim_url_json ( json_url, do_after )
    {
	    // preload json_url only if file_size(json_url) < max_json_size bytes
	    var xhr = new XMLHttpRequest() ;
	    xhr.open("HEAD", json_url, true) ;

	    xhr.onreadystatechange = function() {
		if (this.readyState == this.DONE)
	        {
	            var size = 0 ;

		    var content_length = xhr.getResponseHeader("Content-Length") ;
		    if (content_length !== null) {
		        size = parseInt(content_length) ;
		    }

                    var max_json_size = get_cfg('max_json_size') ;
		    if (size < max_json_size) {
	                $.getJSON(json_url, do_after).fail(function(e) {
				                              wepsim_notify_do_notify('getJSON',
									              'There was some problem for getting ' + json_url,
									              'warning',
									              0);
			                                   }) ;
		    }
		}
	    } ;

	    xhr.send();
    }

