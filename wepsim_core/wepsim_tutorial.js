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


    //
    // Tutorials
    //

    ws_info.tutorials = {} ;

    function sim_tutorial_goframe ( tutorial_name, from_step, to_step )
    {
        //var ws_lang  = get_cfg('ws_idiom') ;
        var tutorial = ws_info.tutorials[tutorial_name] ;

        // 1.- check parameters
        if (typeof tutorial === "undefined") {
            return ;
	}

	// 2.- do transition
	tutorial[from_step].code_post() ;

	if (typeof tutbox !== "undefined") {
	    tutbox.modal("hide") ;
        }

	setTimeout(function(){ sim_tutorial_showframe(tutorial_name, to_step); },
		   tutorial[from_step].wait_next) ;

	if (simcore_voice_canSpeak()) {
	    window.speechSynthesis.cancel() ;
        }
    }

    function sim_tutorial_cancelframe ( )
    {
	var ws_mode = get_cfg('ws_mode');
        wsweb_select_main(ws_mode);

	tutbox.modal("hide") ;

	if (simcore_voice_canSpeak()) {
	    window.speechSynthesis.cancel() ;
        }
    }

    function sim_tutorial_showframe ( tutorial_name, step )
    {
        var tutorial = ws_info.tutorials[tutorial_name] ;

        // 1.- check parameters
        if (typeof ws_info.tutorials == "undefined") {
            return ;
	}

        // 2.- check if
	if (step == tutorial.length) {
	    return ;
	}
	if (step < 0) {
	    return ;
	}

        simcore_ga('help', 'help.tutorial', 'help.tutorial.name=' + tutorial_name + ',step=' + step) ;

        // 3.- code_pre
        tutorial[step].code_pre();

        // 4.- dialog +
        //     code_post (next button) | cancel tutorials
        var wsi = get_cfg('ws_idiom') ;
        var bbbt = {} ;

        bbbt.cancel = {
		    label: i18n_get('gui', wsi, 'Disable tutorial mode'),
		    className: 'btn-danger col float-right',
		    callback: function() {
                        sim_tutorial_cancelframe() ;
		    }
		} ;

        if (step != 0)
            bbbt.prev = {
		    label: i18n_get('gui', wsi, 'Prev.'),
		    className: 'btn-success col float-right',
		    callback: function() {
                        sim_tutorial_goframe(tutorial_name, step, step - 1) ;
		    }
		};

	if (step != (tutorial.length - 1))
            bbbt.next = {
		    label: i18n_get('gui', wsi, 'Next'),
		    className: 'btn-success col float-right',
		    callback: function() {
                        sim_tutorial_goframe(tutorial_name, step, step + 1) ;
		    }
		};
	else
            bbbt.end = {
		    label: i18n_get('gui', wsi, 'End'),
		    className: 'btn-success col float-right',
		    callback: function() {
                        sim_tutorial_goframe(tutorial_name, step, step + 1) ;
		    }
		};

	tutbox = bootbox.dialog({
	    title:   tutorial[step].title,
	    message: tutorial[step].message,
	    buttons: bbbt,
	    size:    "large",
            animate: false
	});

	simcore_voice_speak(tutorial[step].title.replace(/<[^>]*>/g, '') + ". " +
		            tutorial[step].message.replace(/<[^>]*>/g, ''));

	// 5.- do translation
        i18n_update_tags("tutorial_" + tutorial_name) ;
    }

