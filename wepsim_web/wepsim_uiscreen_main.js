/*    
 *  Copyright 2015-2022 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Simulation classic
         */

        /* jshint esversion: 6 */
        class ws_web_main extends ws_uielto
        {
              // constructor
	      constructor ()
	      {
		   // parent
		   super();
	      }

              // render
	      render ( )
	      {
                    // initialize render elements...
	            super.render() ;

                    // render current element
		    this.render_skel() ;
		    this.render_populate() ;
	      }

	      render_skel ( )
	      {
                   // make HTML code
                   var o1 = '<h2>Loading...</h2>' +
                            '<h2>Valid values for the "layout" attribute: classic, compact</h2>' ;

                   // load HTML
                   this.innerHTML = o1 ;
	      }

	      render_populate ( )
	      {
                   // get layout value
                   var ly = 'classic' ;
                   if (this.layout != null) {
                       ly = this.layout.trim() ;
                   }

                   // make HTML code
                   var o1 = '' ;

                   if ('classic' == ly) {
                        o1 += '<ws-topbar></ws-topbar>' +
                              '<ws-recordbar></ws-recordbar>' +
                              '<ws-screen-classic></ws-screen-classic>' ;
                   }
                   if ('compact' == ly) {
                        o1 += '<ws-topbar></ws-topbar>' +
                              '<ws-recordbar></ws-recordbar>' +
                              '<ws-screen-compact></ws-screen-compact>' ;
                   }

                   // load HTML
                   this.innerHTML = o1 ;
	      }
        }

        register_uielto('ws-web-main', ws_web_main) ;

