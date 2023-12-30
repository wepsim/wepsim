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
         *  Notifications
         */

        /* jshint esversion: 6 */
        class ws_notifications extends ws_uielto
        {
              // constructor
	      constructor ()
	      {
		    // parent
		    super();
	      }

              // render
	      render ( event_name )
	      {
                    // initialize render elements...
	            super.render() ;

                    // render current element
		    this.render_skel() ;
		    this.render_populate() ;
	      }

	      render_skel ( )
	      {
                    var o1  = '' ;

                    // build HTML
		    o1 += "<div class='card border-secondary h-100'>" +
			  "<div class='card-header border-body text-secondary bg-body-tertiary p-1'>" +
		          "  + <span data-langkey='Recent'>Recent</span>" +
                          "  <div class='dropdown float-end'>" +
                          "  <button class='btn btn-sm btn-outline-secondary text-danger py-1 dropdown-toggle' " +
                          "            type='button' id='resetyn' data-bs-toggle='dropdown' " +
                          "            aria-haspopup='true' aria-expanded='false' " +
			  "            ><span data-langkey='Reset'>Reset</span></button>" +
                          "   </button>" +
                          "    <div class='dropdown-menu' aria-labelledby='resetyn'>" +
                          "     <a class='dropdown-item py-2 bg-tertiary text-danger' type='button' " +
                          "        onclick='simcore_notifications_reset(); " +
			  "		    var notifications = simcore_notifications_get(); " +
			  "	            var ntf_html = table_notifications_html(notifications); " +
			  "		    $(\"#scroller-notifications3\").html(ntf_html); " +
			  "		    // reajust ui " +
			  "		    wepsim_uicfg_apply(); " +
			  "		    wsweb_scroll_record(\"#scroller-notifications3\"); " +
			  "		    simcore_record_captureInit(); " +
			  "		    return false;'" +
                          "         ><span data-langkey='Yes'>Yes</span></a>" +
			  "      <div class='dropdown-divider'></div>" +
                          "      <a class='dropdown-item py-2 bg-tertiary text-info' type='button' " +
                          "         ><span data-langkey='No'>No</span></a>" +
                          "    </div>" +
                          "  </div>" +
			  "</div>" +
			  "<div class='card-body p-1'>" +
		          "<div id='scroller-notifications3' class='container-fluid p-0' " +
	           	  "     style='overflow:auto; -webkit-overflow-scrolling:touch;'>" +
                          // placeholder
                          "</div>" +
			  "</div>" +
			  "<div class='card-footer border-light text-secondary bg-body-tertiary p-1'>" +
		          "  - <span data-langkey='Recent'>Recent</span>" +
			  " </div>" +
			  "</div>" ;

		    this.innerHTML = o1 ;
	      }

	      render_populate ( )
	      {
		    var notifications      = simcore_notifications_get() ;
		    var notifications_html = table_notifications_html(notifications) ;
		    $('#scroller-notifications3').html(notifications_html) ;
	      }
        }

        register_uielto('ws-notifications', ws_notifications) ;


        /*
         * Notifications (summary)
         */

        function table_notifications_html ( notifications )
        {
		// setup content...
		var u = '' ;
	        var t = null ;
		var m = '' ;
		for (var i=notifications.length-1; i!=-1; i--)
		{
		     t = new Date(notifications[i].date) ;
		     m = notifications[i].message.replace(/\n/g, '<br>\n') ;
	
	             u += '<li class="list-group-item list-group-item-' + notifications[i].type + ' rounded-lg mx-2 my-1 p-2 shadow-sm">' +
			  '<h5 class="m-0 collapse7 show">' +
			  '<span class="badge text-secondary">(' +
	                  t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds() + '.' + t.getMilliseconds() +
			  ')</span>' +
			  '<span class="badge text-secondary">[' + t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + ']</span>' +
			  '</h5>' +
			  '<span class="font-monospace">' + notifications[i].title + ':' + '</span>' + m +
			  '</li>' ;
		}
		if (u.trim() === '') {
		    u = '<p class="m-3 text-center py-4"><b>&lt;Empty&gt;</b></p>' ;
		}
	
		// build html
		var o = '<div id="container-notifications3" class="card border-secondary" ' +
	                '     style="max-height:50vh; overflow:auto; -webkit-overflow-scrolling: touch;">' +
		        '<ul class="list-group list-group-flush">' +
	                u +
		        '</ul>' +
		        '</div>' ;
	
		return o ;
        }

