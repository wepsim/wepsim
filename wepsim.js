
    //
    // Error dialog
    //

    function showError ( Msg, editor ) 
    {
            var errorMsg = Msg.replace(/\t/g,' ').replace(/   /g,' ');

            var pos = errorMsg.match(/Problem around line \d+/);
            var lineMsg = '' ;
            if (null != pos) {
                pos = parseInt(pos[0].match(/\d+/)[0]);
                lineMsg += '<button type="button" class="btn btn-danger" ' + 
                           '        onclick="$.notifyClose();' +
                           '                      var marked = ' + editor + '.addLineClass(' + (pos-1) + ', \'background\', \'CodeMirror-selected\');' +
                           '                 setTimeout(function() { ' + editor + '.removeLineClass(marked, \'background\', \'CodeMirror-selected\'); }, 3000);' +
		           '		     var t = ' + editor + '.charCoords({line: ' + pos + ', ch: 0}, \'local\').top;' +
		           '		     var middleHeight = ' + editor + '.getScrollerElement().offsetHeight / 2;' +
		           '		     ' + editor + '.scrollTo(null, t - middleHeight - 5);">Go line ' + pos + '</button>&nbsp;' ;
            }

	    $.notify({ title: '<strong>ERROR</strong>', 
                       message: errorMsg + '<br>' + 
                                '<center>' +  
                                lineMsg + 
                                '<button type="button" class="btn btn-danger" onclick="$.notifyClose();">Close</button>' + 
                                '</center>' },
		     { type: 'danger', newest_on_top: true, delay: 0, placement: { from: 'top', align: 'center' } });
    }


    //
    // Assembly
    //

    function compileAssembly ( show_binary ) 
    {
        // get Assembly
        var textToConvert = inputasm.getValue() ;

        // get SIMWARE.firmware
        var SIMWARE = get_simware() ;
	if (SIMWARE.firmware.length == 0) {
            alert('WARNING: please load the microcode first.');
            $.mobile.pageContainer.pagecontainer('change','#main3');
            return false;
	} 

        // compile Assembly and show message
        var SIMWAREaddon = simlang_compile(textToConvert, SIMWARE);
        if (SIMWAREaddon.error != null) {
            showError(SIMWAREaddon.error, "inputasm") ;
            return false;
        }

	$.notify({ title: '<strong>INFO</strong>', message: 'Assembly was compiled and loaded.'},
		 { type: 'success', newest_on_top: true, delay: get_cfg('NOTIF_delay'), placement: { from: 'top', align: 'center' } });

        // update memory and segments
        set_simware(SIMWAREaddon) ;
	update_memories(SIMWARE);

        // update UI 
        if (true == show_binary)
        {
           $("#compile_results").html("<center>" +
                                      "<br>Loading binary, please wait..." +
                                      "<br><br>WARNING: loading binary might take time on slow mobile devices.</center>");
           $("#compile_results").css({width:"100%",height:"inherit !important"});
	   $('#bin1').popup('open');

	   setTimeout(function(){ showCompiledAssembly(); }, 500);
        }

        $("#asm_debugger").html(assembly2html(SIMWAREaddon.mp, 
                                              SIMWAREaddon.labels2, 
                                              SIMWAREaddon.seg, 
                                              SIMWAREaddon.assembly));
        showhide_asm_elements();

	reset();
        return true;
    }

    function showCompiledAssembly () 
    {
        var SIMWARE = get_simware() ;

        $("#compile_results").html(mp2html(SIMWARE.mp, SIMWARE.labels2, SIMWARE.seg));
        $("#bin1").popup("reposition", {positionTo: 'window'});

        for (skey in SIMWARE.seg) {
             $("#compile_begin_" + skey).html("0x" + SIMWARE.seg[skey].begin.toString(16));
             $("#compile_end_"   + skey).html("0x" + SIMWARE.seg[skey].end.toString(16));
        }
    }

    function showhide_asm_elements ( ) 
    {
	$("input:checkbox:checked").each(function() {
		var column = "table ." + $(this).attr("name");
		$(column).show();
	});

	$("input:checkbox:not(:checked)").each(function() {
		var column = "table ." + $(this).attr("name");
		$(column).hide();
	});
    }


    //
    // Firmware
    //

    function compileFirmware ( show_binary ) 
    {
        var textFromFileLoaded = inputfirm.getValue() ;

	var preSM = load_firmware(textFromFileLoaded) ;
	if (preSM.error != null) {
            showError(preSM.error, "inputfirm") ;
            return false;
        }

	$.notify({ title: '<strong>INFO</strong>', message: 'Microcode was compiled and loaded.'},
		 { type: 'success', newest_on_top: true, delay: get_cfg('NOTIF_delay'), placement: { from: 'top', align: 'center' } });

        // update UI 
        if (true == show_binary)
        {
           $("#compile_results").html("<center>" +
                               "<br>Loading binary, please wait..." +
                               "<br><br>WARNING: loading binary might take time on slow mobile devices.</center>");
           $("#compile_results").css({width:"100%",height:"inherit !important"});
	   $('#bin1').popup('open');

	   setTimeout(function(){ showCompiledFirmware(); }, 500);
        }

	reset() ;
        return true;
    }

    function showCompiledFirmware () 
    {
        var SIMWARE = get_simware() ;
        $("#compile_results").html(firmware2html(SIMWARE.firmware, true));
	$("#compile_results").css({width:"inherit !important", height:"inherit !important"});

	$("#bin1").enhanceWithin();
	$('#bin1').trigger('updatelayout');
        $("#bin1").popup("reposition", {positionTo: 'window'});
	$('#bin1').trigger('refresh');
    }


    //
    // File management
    //

    function load_assembly_from_file ( )
    {
        var fileToLoad = document.getElementById("fileToLoad2").files[0];
        var fileReader = new FileReader();
        fileReader.onload  = function (fileLoadedEvent) {
                                            var textFromFileLoaded = fileLoadedEvent.target.result;
					    inputasm.setValue(textFromFileLoaded);
                             };
	fileReader.onerror = function(e) {
			        console.error("File could not be read! Code " + e.target.error.code);
			     };
        fileReader.readAsText(fileToLoad, "UTF-8");
    }

    function load_firmware_from_file ( )
    {
        var fileToLoad = document.getElementById("fileToLoad").files[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
                                            var textFromFileLoaded = fileLoadedEvent.target.result;
					    inputfirm.setValue(textFromFileLoaded);
                                };
	fileReader.onerror = function(e) {
			        console.error("File could not be read! Code " + e.target.error.code);
			     };
        fileReader.readAsText(fileToLoad, "UTF-8");
    }

    function save_as_file ( contentInputName, filenameInputName )
    {
          //var textToWrite = document.getElementById(contentInputName).value;
            var textToWrite = contentInputName.getValue();
            var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
            var fileNameToSaveAs = document.getElementById(filenameInputName).value;

            var downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL != null) {
                // Chrome allows the link to be clicked
                // without actually adding it to the DOM.
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            }
            else {
                // Firefox requires the link to be added to the DOM
                // before it can be clicked.
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = function ( event ) {
                                            document.body.removeChild(event.target);
                                       };
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
            }

            downloadLink.click();
    }


    //
    // UI
    //

    function toggle_play ( btn1 )
    {
        if (DBG_stop == false) {
            DBG_stop = true ;
        } else {
            DBG_stop = false ;
            asmdbg_play(btn1) ;
        }
    }

    function show_help1 ( )
    {
        var rel = $('#help1_ref').data('relative') ;
        if (rel == "")
            return;

        $('#iframe_help1').load('help/simulator-' + get_cfg('ws_idiom') + '.html ' + rel,
			        function() {
                                    $('#help1').trigger('updatelayout'); 
                                    $('#help1').popup('open');
                                });
    }

    function sim_prepare_editor ( editor )
    {
	    editor.setValue("\n\n\n\n\n\n\n\n\n");
	    editor.getWrapperElement().style['text-shadow'] = '0.0em 0.0em'; 

	    if (get_cfg('editor_theme') == 'blackboard') {
		editor.getWrapperElement().style['font-weight'] = 'normal';
		editor.setOption('theme','blackboard');
	    }

	    var edt_mode = get_cfg('editor_mode');
	    if (edt_mode == 'vim') 
		editor.setOption('keyMap','vim');
	    if (edt_mode == 'emacs') 
		editor.setOption('keyMap','emacs');
	    if (edt_mode == 'sublime') 
		editor.setOption('keyMap','sublime');

	    setTimeout(function(){editor.refresh();}, 100);
    }

    function sim_init ( )
    {
	    var ref_p = document.getElementById('svg_p').contentDocument ;
	    if (ref_p != null)
            {
                var o  = ref_p.getElementById('text3495');
	        if (o != null) o.addEventListener('click', 
                                                  function() { 
                                                     $('#tab11').trigger('click');
                                                  }, false);
	        var o  = ref_p.getElementById('text3029');
	        if (o != null) o.addEventListener('click', 
                                                  function() { 
                                                     $('#tab11').trigger('click');
                                                  }, false);
	        var o  = ref_p.getElementById('text3031');
	        if (o != null) o.addEventListener('click', 
                                                  function() { 
                                                     $('#tab11').trigger('click');
                                                  }, false);
	        var o  = ref_p.getElementById('text3001');
	        if (o != null) o.addEventListener('click', 
                                                  function() { 
                                                     $('#tab14').trigger('click');
                                                  }, false);
	        var o  = ref_p.getElementById('text3183');
	        if (o != null) o.addEventListener('click', 
                                                  function() { 
                                                     $('#tab23').trigger('click');
                                                  }, false);
	        var o  = ref_p.getElementById('text3775');
	        if (o != null) o.addEventListener('click', 
                                                  function() { 
                                                     $('#tab15').trigger('click');
                                                  }, false);
	        var o  = ref_p.getElementById('text3829');
	        if (o != null) o.addEventListener('click', 
                                                  function() { 
                                                     $('#tab12').trigger('click');
                                                  }, false);
	        var o  = ref_p.getElementById('text3845');
	        if (o != null) o.addEventListener('click', 
                                                  function() { 
                                                     $('#tab12').trigger('click');
                                                  }, false);
                var o  = ref_p.getElementById('text3459-7');
                if (o != null) o.addEventListener('click', 
                                                  function() { 
                                                     execute_microinstruction(); 
                                                  }, false);
            }

	    var ref_cu = document.getElementById('svg_cu').contentDocument ;
	    if (ref_cu != null)
            {
	        var o  = ref_cu.getElementById('text3010');
	        if (o != null) o.addEventListener('click', 
                                                  function() { 
                                                     $('#tab16').trigger('click');
                                                  }, false);
                var o  = ref_cu.getElementById('text3346-5');
                if (o != null) o.addEventListener('click', 
                                                  function() { 
                                                     $('#tab22').trigger('click');
                                                  }, false);
                var o  = ref_cu.getElementById('text4138');
                if (o != null) o.addEventListener('click', 
                                                  function() { 
                                                     execute_microinstruction(); 
                                                  }, false);
            }
    }


    //
    // Example management
    //

    function load_from_example_assembly ( example_id )
    {
	var xmlhttp = new XMLHttpRequest();
	var url = "examples/exampleCode" + example_id + ".txt?time=20160730a" ;

	$.mobile.pageContainer.pagecontainer('change', '#main4');
	inputasm.setValue("Please wait...");
	inputasm.refresh();

	xmlhttp.onreadystatechange=function() {
		if ((xmlhttp.readyState == 4) && ((xmlhttp.status == 200) || (xmlhttp.status == 0)))
		{
		    var textFromFileLoaded = xmlhttp.responseText ;
		    inputasm.setValue(textFromFileLoaded);
	            var ok = compileAssembly(false);
                    setTimeout(function(){inputasm.refresh();}, 100);
                    if (true == ok) 
	                $.mobile.pageContainer.pagecontainer('change', '#main1');
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
    }

    function load_from_example_firmware ( example_id )
    {
	var xmlhttp = new XMLHttpRequest();
	var url = "examples/exampleMicrocode" + example_id + ".txt?time=20160730a" ;

	$.mobile.pageContainer.pagecontainer('change', '#main3');
	inputfirm.setValue("Please wait...");
	inputfirm.refresh();

	xmlhttp.onreadystatechange=function() {
	     // if ((xmlhttp.readyState == 4) &&  (xmlhttp.status == 200))
		if ((xmlhttp.readyState == 4) && ((xmlhttp.status == 200) || (xmlhttp.status == 0)))
		{
		    var textFromFileLoaded = xmlhttp.responseText ;
		    inputfirm.setValue(textFromFileLoaded);
	            var ok = compileFirmware(false);
                    setTimeout(function(){inputfirm.refresh();}, 100);
                    if (true == ok) 
	                load_from_example_assembly(example_id);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
    }

    function load_from_example ( example_id )
    {
        return load_from_example_firmware(example_id);
    }

