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


    //
    // dialogs
    //

    function wsweb_dlg_open ( dialog_obj )
    {
	    // check params
	    if (typeof dialog_obj !== "object") {
                return null ;
            }

	    // dialog
	    var ext_dlg_obj = {
		    title:          dialog_obj.title(),
		    message:        dialog_obj.body(),
		    value:          dialog_obj.value,
		    scrollable:     true,
		    size:           dialog_obj.size,
		    centerVertical: true,
		    keyboard:       true,
		    animate:        false,
		    onShow:         function() {
				       // onshown
				       dialog_obj.onshow() ;

				       // ui lang
				       var ws_idiom = get_cfg('ws_idiom') ;
				       i18n_update_tags('dialogs', ws_idiom) ;
				       i18n_update_tags('gui',     ws_idiom) ;

				       // auto-close tooltips
                                       setTimeout(wepsim_tooltips_closeAll, 500) ;
				    },
		    buttons:        dialog_obj.buttons
	    } ;
	    var d1 = bootbox.dialog(ext_dlg_obj) ;

            // custom...
	    d1.init(function(){
		       d1.attr("id", dialog_obj.id) ;
		    });

            // intercept events...
	    d1.one("hidden.bs.modal",
		    function () {
			wsweb_dialog_close(dialog_obj) ;
		    });

            // show
	    d1.find('.modal-header').addClass("bg-body-secondary") ;
	    d1.find('.modal-footer').addClass("bg-body-secondary") ;
	    d1.find('.modal-title').addClass("mx-auto") ;
	    d1.find('.bootbox-close-button').addClass("mx-1 btn-close border-0") ;

	    d1.modal('handleUpdate') ;
	    d1.modal('show');

	    // return dialog
	    return d1 ;
    }

    function wsweb_dlg_close ( dialog_obj )
    {
	    // check params
	    if (typeof dialog_obj !== "object") {
                return null ;
            }

	    // elements
	    var d1 = $('#' + dialog_obj.id) ;
	    d1.modal('hide') ;

	    // return dialog
	    return d1 ;
    }

    function wsweb_dlg_alert ( msg )
    {
             // alert object
	     var a_obj = {
		            title:          '<i class="fas fa-exclamation"></i> ' +
                                            '<span data-langkey="Alert">Alert</span>',
                            message:        '<div class="p-2">' + msg + '</div>',
			    scrollable:     true,
			    centerVertical: true,
			    keyboard:       true,
			    animate:        false,
			    buttons:        {
						cancel: {
						   label:     '<i class="fa fa-times me-2"></i>' +
                                                              '<span data-langkey="Close">Close</span>',
                                                   className: 'btn btn-primary btn-sm ' +
                                                              'col col-sm-3 float-right shadow-none'
						}
					    },
                            size:           ''
                         } ;

            // alert
	    var d1 = bootbox.dialog(a_obj) ;

            // show
	    d1.find('.modal-header').addClass("bg-body-secondary") ;
	    d1.find('.modal-footer').addClass("bg-body-secondary") ;
	    d1.find('.modal-title').addClass("ml-auto") ;
	    d1.modal('handleUpdate') ;
            d1.modal('show') ;

	    // return alert
	    return d1 ;
    }

