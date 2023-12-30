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


    /*
     * Copy to clipboard
     */

    ws_info.clipboard_copy = '' ;

    function get_clipboard_copy ( )
    {
        return ws_info.clipboard_copy ;
    }

    // credit for the SelectText function:
    // https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
    function SelectText (element)
    {
        var doc = document
            , text = doc.getElementById(element)
            , range, selection
        ;
        if (doc.body.createTextRange)
	{
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        }
	else if (window.getSelection)
	{
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    function wepsim_clipboard_CopyFromDiv ( element_name )
    {
	    var msg = 'unsuccessful' ;

	    try
	    {
                 SelectText(element_name) ;

                 if (document.execCommand('copy'))
		 {
		     ws_info.clipboard_copy = $('#' + element_name).text() ;
		     msg = 'successful' ;
		 }
	    }
	    catch (e)
	    {
		 msg += msg + ' because ' + e ;
	    }

	    wepsim_notify_success('<strong>INFO</strong>',
                                  'Copied ' + msg + '!.') ;
    }

    function wepsim_clipboard_CopyFromTextarea ( element_name )
    {
	    var msg = 'successful' ;

	    try {
		 var copyTextarea = document.getElementById(element_name);
		 copyTextarea.select();
                 document.execCommand('copy') ;
		 ws_info.clipboard_copy = $('#' + element_name).val() ;
	    }
            catch (err) {
		 msg = 'unsuccessful' ;
	    }

	    wepsim_notify_success('<strong>INFO</strong>',
                                  'Copied ' + msg + '!.') ;
    }

