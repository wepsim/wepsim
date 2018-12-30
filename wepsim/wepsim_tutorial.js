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


    //
    // Tutorials
    //

    function sim_tutorial_showframe ( tutorial_name, step )
    {
        // 0.- get reference
        if (typeof tutorials[tutorial_name] == "undefined") {
            return ;
	}
        var tutorial = tutorials[tutorial_name][get_cfg('ws_idiom')] ;
        if (typeof tutorial == "undefined") {
            return ;
	}

        // 1.- check if
	if (step == tutorial.length) {
	    return ;
	}
	if (step < 0) {
	    return ;
	}

        ga('send', 'event', 'help', 'help.tutorial', 'help.tutorial.name=' + tutorial_name + ',step=' + step);

        // 2.- code_pre
        tutorial[step].code_pre();

        // 3.- dialog +
        //     code_post (next button) | cancel tutorials
        var bbbt = {} ;

        bbbt.cancel = {
		    label: 'Disable tutorials',
		    className: 'btn-danger col float-right',
		    callback: function() {
			simui_select_main('ep') ;
                        tutbox.modal("hide") ;
                        if (simcoreui_voice_canSpeak())
			    window.speechSynthesis.cancel() ;
		    }
		} ;

        if (step != 0)
            bbbt.prev = {
		    label: 'Prev.',
		    className: 'btn-success col float-right',
		    callback: function() {
			tutorial[step].code_post() ;
			setTimeout(function(){ 
					sim_tutorial_showframe(tutorial_name, step - 1) ;
				   }, tutorial[step].wait_next);
                        if (simcoreui_voice_canSpeak())
			    window.speechSynthesis.cancel() ;
		    }
		};

	if (step != (tutorial.length - 1))
            bbbt.next = {
		    label: 'Next',
		    className: 'btn-success col float-right',
		    callback: function() {
			tutorial[step].code_post() ;
			setTimeout(function(){ 
					sim_tutorial_showframe(tutorial_name, step + 1) ;
				   }, tutorial[step].wait_next);
                        if (simcoreui_voice_canSpeak())
			    window.speechSynthesis.cancel() ;
		    }
		};
	else
            bbbt.end = {
		    label: 'End',
		    className: 'btn-success col float-right',
		    callback: function() {
			tutorial[step].code_post() ;
			setTimeout(function(){ 
					sim_tutorial_showframe(tutorial_name, step + 1) ;
				   }, tutorial[step].wait_next);
                        if (simcoreui_voice_canSpeak())
			    window.speechSynthesis.cancel() ;
		    }
		};

	tutbox = bootbox.dialog({
	    title:   tutorial[step].title,
	    message: tutorial[step].message,
	    buttons: bbbt,
	    size: "large",
            animate: false
	});

	simcoreui_voice_speak(tutorial[step].title.replace(/<[^>]*>/g, '') + ". " + 
		              tutorial[step].message.replace(/<[^>]*>/g, ''));
    }

