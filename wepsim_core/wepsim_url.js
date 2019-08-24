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
     * File/URL
     */

    function wepsim_file_loadFrom ( fileToLoad, functionOnLoad )
    {
        // checks
        var fileReader = new FileReader();
        if (fileReader === null)
            return false ;

        // read
        fileReader.onload  = function (fileLoadedEvent) {
                                var textFromFileLoaded = fileLoadedEvent.target.result;
                                if (null !== functionOnLoad)
			            functionOnLoad(textFromFileLoaded);
                             };
	fileReader.onerror = function(e) {
                                wepsim_notify_error("<strong>ERROR</strong>",
                                                    "File could not be read. " +
                                                    "Error code " + e.target.error.code) ;
			     };

        fileReader.readAsText(fileToLoad, "UTF-8");
        return true ;
    }

    function wepsim_file_saveTo ( textToWrite, fileNameToSaveAs )
    {
        // checks
        if (typeof window.requestFileSystem === "undefined") {
            return false ;
        }

        // save callbacks chain
	var koHandler = function(error) {
            wepsim_notify_error("<strong>ERROR</strong>: failed file write",
                                "Failed file write. " +
                                "Error found " +  e.toString()) ;
	} ;

	var okHandler = function(error) {
	    wepsim_notify_success('<strong>INFO</strong>',
                                  'Successful file write!');
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
                            {create: true, exclusive: true},
                            onCreatFile,
                            koHandler) ;
	} ;

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onInitFs, koHandler) ;
        return true ;
    }

    function wepsim_file_downloadTo ( textToWrite, fileNameToSaveAs )
    {
            var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });

            var downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL != null) {
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            }
            else {
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = function ( event ) {
                                            document.body.removeChild(event.target);
                                       };
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
            }

            downloadLink.click();
    }

    function wepsim_file_saveOrDownload ( textToWrite, fileNameToSaveAs )
    {
        var ret = wepsim_file_saveTo(textToWrite, fileNameToSaveAs) ;

        if (ret === false) {
            wepsim_file_downloadTo(textToWrite, fileNameToSaveAs) ;
        }
    }

	function getURLTimeStamp ( )
	{
		var dateObj = new Date();
		var year    = dateObj.getUTCFullYear();
		var month   = dateObj.getUTCMonth() + 1;
		var day     = dateObj.getUTCDate();
		var hour    = dateObj.getUTCHours();
		var minutes = dateObj.getUTCMinutes();

		return year + month + day + hour + minutes ;
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

    function wepsim_load_from_url ( url, do_next )
    {
	if (false === is_mobile())
	{
		fetchURL(url).then(function(response)
				   {
				      if (typeof response == "undefined") {
					  wepsim_notify_error("<strong>ERROR</strong>",
					                      "File " + url + " could not be fetched:" +
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

