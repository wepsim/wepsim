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
     * Voice control
     */

    ws_info.voice_commands = {} ;
    var wepsim_voice_dialog = null ;


    // dialog
    ws_info.voice_commands['hello'] = function()
    {
	 // speak...
         var msg = "Hello, I am WepSIM, nice to meet you. " ;
	 simcore_voice_speak(msg) ;
    } ;

    ws_info.voice_commands['(show) configuration'] = function()
    {
	 wsweb_dialog_open('config') ;
    } ;

    ws_info.voice_commands['(show) examples'] = function()
    {
	 wsweb_dialog_open('examples') ;
    } ;

    ws_info.voice_commands['load example :mc_name (from) :asm_name'] = function ( mc_name, asm_name )
    {
         load_from_example_firmware("ep:" + mc_name + ":" + asm_name, true) ;
    } ;

    ws_info.voice_commands['(show) help'] = function()
    {
	 wsweb_dialog_open('help') ;
    } ;

    ws_info.voice_commands['close'] = function()
    {
         wsweb_dialog_close('help') ;
         wsweb_dialog_close('config') ;
         wsweb_dialog_close('examples') ;

	 if (null !== wepsim_voice_dialog) {
	     wepsim_voice_dialog.modal('hide');
	 }
    } ;


    // execution
    ws_info.voice_commands['reset'] = function()
    {
         wepsim_execute_reset(true, true) ;

	 // speak...
         var msg = "Current processor has been reset." ;
	 simcore_voice_speak(msg) ;
    } ;

    ws_info.voice_commands['next'] = function()
    {
         wepsim_execute_instruction() ;

	 // speak...
         var msg = "Next executed." ;
	 simcore_voice_speak(msg) ;
    } ;

    ws_info.voice_commands['next micro(instruction)'] = function()
    {
         wepsim_execute_microinstruction() ;

	 // speak...
         var msg = "Next microinstruction executed. " ;
	 simcore_voice_speak(msg) ;
    } ;

    ws_info.voice_commands['play'] = function()
    {
         wepsim_execute_play() ;
    } ;

    ws_info.voice_commands['stop'] = function()
    {
         wepsim_execute_stop() ;
    } ;


    // info
    ws_info.voice_commands['describe micro(instruction)'] = function()
    {
	 // speak...
         var msg = get_verbal_from_current_mpc() ;
	 simcore_voice_speak(msg) ;
    } ;

    ws_info.voice_commands['describe instruction'] = function()
    {
	 // speak...
         var msg = get_verbal_from_current_pc() ;
	 simcore_voice_speak(msg) ;
    } ;


    // control
    ws_info.voice_commands['list'] =  function()
    {
	 var vc_list = "available commands:<br>" ;

	 for (var vc in ws_info.voice_commands) {
	      vc_list = vc_list + " * '" + vc + "'<br>" ;
	 }

	 wepsim_voice_dialog = bootbox.alert(vc_list) ;
	 wepsim_voice_dialog.modal('show') ;

	 // speak...
         var msg = $("</p>").html(vc_list).text() ;
	 simcore_voice_speak(msg) ;
    } ;

    ws_info.voice_commands['silence'] = function()
    {
	 simcore_voice_stopSpeak() ;
    } ;

