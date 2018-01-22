/*
 *  Copyright 2015-2018 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
        if (typeof tutorials[tutorial_name] == "undefined")
            return ;
        var tutorial = tutorials[tutorial_name][get_cfg('ws_idiom')] ;
        if (typeof tutorial == "undefined")
            return ;

        // 1.- check if
	if (step == tutorial.length)
	    return ;
	if (step < 0) 
	    return ;

        ga('send', 'event', 'help', 'help.tutorial', 'help.tutorial.name=' + tutorial_name + ',step=' + step);

        // 2.- code_pre
        tutorial[step].code_pre();
        if (wepsim_voice_canSpeak())
        {
	    tut_msg1 = new SpeechSynthesisUtterance(tutorial[step].title.replace(/<[^>]*>/g, '') + ". " + 
		                                    tutorial[step].message.replace(/<[^>]*>/g, ''));
	    tut_msg1.lang = 'en-US';
        }

        // 3.- dialog +
        //     code_post (next button) | cancel tutorials
        var bbbt = {} ;

	if (step != (tutorial.length - 1))
            bbbt.next = {
		    label: 'Next',
		    className: 'btn-success col-xs-3 col-sm-2 pull-right',
		    callback: function() {
			tutorial[step].code_post() ;
			setTimeout(function(){ 
					sim_tutorial_showframe(tutorial_name, step + 1) ;
				   }, tutorial[step].wait_next);
                        if (wepsim_voice_canSpeak())
			    window.speechSynthesis.cancel() ;
		    }
		};
	else
            bbbt.end = {
		    label: 'End',
		    className: 'btn-success col-xs-3 col-sm-2 pull-right',
		    callback: function() {
			tutorial[step].code_post() ;
			setTimeout(function(){ 
					sim_tutorial_showframe(tutorial_name, step + 1) ;
				   }, tutorial[step].wait_next);
                        if (wepsim_voice_canSpeak())
			    window.speechSynthesis.cancel() ;
		    }
		};

        if (step != 0)
            bbbt.prev = {
		    label: 'Prev',
		    className: 'btn-success col-xs-3 col-sm-2 pull-right',
		    callback: function() {
			tutorial[step].code_post() ;
			setTimeout(function(){ 
					sim_tutorial_showframe(tutorial_name, step - 1) ;
				   }, tutorial[step].wait_next);
                        if (wepsim_voice_canSpeak())
			    window.speechSynthesis.cancel() ;
		    }
		};

        bbbt.cancel = {
		    label: 'Disable tutorials',
		    className: 'btn-danger col-xs-4 col-sm-3 pull-right',
		    callback: function() {
			set_cfg('ws_mode', 'wepsim') ;
                        save_cfg();
			$("#select4").val('wepsim') ;
                        tutbox.modal("hide") ;
                        if (wepsim_voice_canSpeak())
			    window.speechSynthesis.cancel() ;
		    }
		} ;

	tutbox = bootbox.dialog({
	    title:   tutorial[step].title,
	    message: tutorial[step].message,
	    buttons: bbbt,
            animate: false
	});

        if (wepsim_voice_canSpeak())
	    window.speechSynthesis.speak(tut_msg1);
    }

