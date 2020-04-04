/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

	    // elements
	    var oid      = dialog_obj.id ;
	    var otitle   = dialog_obj.title() ;
	    var obody    = dialog_obj.body() ;
	    var ovalue   = dialog_obj.value ;
	    var obuttons = dialog_obj.buttons ;
	    var opost    = dialog_obj.onshow ;
	    var osize    = dialog_obj.size ;

	    // dialog
	    var d1 = bootbox.dialog({
			    title:          otitle,
			    message:        obody,
			    value:          ovalue,
			    scrollable:     true,
			    size:           osize,
			    centerVertical: true,
			    keyboard:       true,
			    animate:        false,
                            onShow:         function() {
                                               // onshown
			                       opost() ;

                                               // ui lang
                                               var ws_idiom = get_cfg('ws_idiom') ;
                                               i18n_update_tags('dialogs', ws_idiom) ;
                                               i18n_update_tags('gui',     ws_idiom) ;
                                            },
			    buttons:        obuttons
	             });

            // custom...
	    d1.init(function(){
		       d1.attr("id", oid) ;
		    });

            // intercept events...
	    d1.one("hidden.bs.modal",
		    function () {
			wsweb_dialog_close(dialog_obj) ;
		    });

            // show
	    d1.find('.modal-title').addClass("ml-auto") ;
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

