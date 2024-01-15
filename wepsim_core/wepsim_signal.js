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


        function wepsim_update_signal_dialog_title ( key )
        {
	        var b_btns  = key + ': ' +
			      '<button onclick="$(\'#bot_signal\').carousel(0);" ' +
			      '        type="button" class="btn btn-info">Value</button>' +
			      '<button onclick="$(\'#bot_signal\').carousel(1); ' +
                              '                 var shval = $(\'#ask_shard\').val(); ' +
                              '                 var shkey = $(\'#ask_skey\').val(); ' +
                              '                 update_signal_loadhelp(\'#help2\', shval, shkey);" ' +
			      '        type="button" class="btn btn-success">Help</button>' ;

                return wepsim_config_dialog_dropdown("success",
						     b_btns,
						     'var shval = $(\'#ask_shard\').val(); ' +
						     'var shkey = $(\'#ask_skey\').val(); ' +
						     'update_signal_loadhelp(\'#help2\', shval, shkey);"') ;
        }

        function wepsim_update_signal_dialog_body ( key, signal_obj )
        {
		// update signal
		var checkvalue  = (signal_obj.value >>> 0) ;
		var str_bolded  = '' ;
		var str_checked = '' ;
		var input_help  = '' ;
		var behav_raw   = '' ;
		var behav_str   = '' ;
		var notif       = '' ;
		var n10 = 0;
		var n2  = 0;

		var nvalues = Math.pow(2, signal_obj.nbits) ;
		if (signal_obj.behavior.length == nvalues)
		{
		    input_help = '<ol start="0" class="list-group list-group-flush">' ;

		    for (var k = 0; k < signal_obj.behavior.length; k++)
		    {
			 str_checked = ' ' ;
			 if (k == checkvalue) {
			     str_checked = ' checked="checked" ' ;
			 }
			 str_bolded = ' ' ;
			 if (k == signal_obj.default_value) {
			     str_bolded = '<span class="badge bg-info">default value</span>' ;
			 }

			 behav_raw = signal_obj.behavior[k] ;
			 behav_str = compute_signal_verbals(key, k) ;
			 if ('' == behav_str.trim()) {
			     behav_str = '&lt;without main effect&gt;' ;
			 }

			 n10 = k.toString(10) ;
                         n2  = k.toString(2).padStart(signal_obj.nbits, '0') ;

                         if (nvalues != 2) {
                             notif = '<span class="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-success">' + n10 + '</span>' ;
                         }

			 input_help += '<li class="list-group-item p-1">' +
				       '<label class="m-1 btn-like" id="' + key + '_' + n10 + '">' +
				       '  <input aria-label="value ' + n10 + '" type="radio" name="ask_svalue" ' +
				       '         value="' + n10 + '" ' + str_checked + '/>' +
				       '<span class="badge bg-secondary badge-pill position-relative mx-2">' +
                                         n2 + notif +
                                       '</span>' +
				       '  <span>' + behav_str + '</span>&nbsp;' + str_bolded +
				       '<p class="m-0 ml-3 bg-body-tertiary collapse collapse7">' +
                                       '<small>' + behav_raw + '</small>' +
                                       '</p>' +
				       '</label>' +
				       '</li>' ;
		    }

		    input_help += '</ol>' ;
		}
		else
		{
		    input_help += '<ol start="0">' +
				  '<span><center><label>' +
				  '<input aria-label="value for ' + key + '" type="number" size=4 min=0 max=' + (nvalues - 1) + ' class=dial ' +
				  '       name="ask_svalue" value="' + signal_obj.value + '"/>' + '&nbsp;&nbsp;' + ' 0 - ' + (nvalues - 1) +
				  '</center></label></span>\n' +
				  '</ol>' ;
		}

		var curr_hw = simhw_short_name() ;
		if ("" == curr_hw) {
		    curr_hw = "ep" ;
		}

                // dialogbox
	        return   '<div id="bot_signal" class="carousel" data-ride="carousel" data-interval="false">' +
			 '  <div class="carousel-inner" role="listbox">' +
			 '    <div class="carousel-item active">' +
			 '    <div id="scroller-signal" ' +
                         '         style="max-height:70vh; width:inherit; overflow:auto; -webkit-overflow-scrolling:touch;">' +
			 '         <form class="form-horizontal" style="white-space:wrap;">' +
			 '         <input aria-label="value for ' + key     + '" id="ask_skey"  name="ask_skey"  type="hidden" value="' + key     + '" class="form-control input-md"> ' +
			 '         <input aria-label="value for ' + curr_hw + '" id="ask_shard" name="ask_shard" type="hidden" value="' + curr_hw + '" class="form-control input-md"> ' +
			 input_help +
			 '         </form>' +
			 '    </div>' +
			 '    </div>' +
			 '    <div class="carousel-item">' +
			 '         <div id=help2 style="max-height:65vh; width:inherit; overflow:auto; -webkit-overflow-scrolling:touch;">Loading...</div>' +
			 '    </div>' +
			 '  </div>' +
			 '</div>' ;
        }

        function wepsim_update_signal_dialog ( key )
        {
		// check signal
		var signal_obj = simhw_sim_signal(key) ;
		if (typeof signal_obj === "undefined") {
		    return null ;
	        }

                // open dialog
                var dlg_obj = {
			id:      'dlg_updatesignal',
			title:   function() {
				    return wepsim_update_signal_dialog_title(key) ;
				 },
			body:    function() {
				    return wepsim_update_signal_dialog_body(key, signal_obj) ;
				 },
			value:   signal_obj.value,
			buttons: {
				    success: {
					label:      '<i class="fas fa-screwdriver"></i> ' +
                                                    '<span data-langkey="Save">Save</span>',
					className:  'btn-info btn-sm col col-md-3 float-right',
					callback:   function ()
						    {
							key        = $('#ask_skey').val();
							user_input = $("input[name='ask_svalue']:checked").val();
							if (typeof user_input == "undefined") {
							   user_input = $("input[name='ask_svalue']").val();
							}
							user_input = parseInt(user_input) ;

							wepsim_update_signal_with_value(key, user_input) ;
							wsweb_dialogbox_close_updatesignal() ;
						    }
				    },
				    close: {
					label:      '<i class="fa fa-times me-2"></i>' +
						    '<span data-langkey="Close">Close</span>',
					className:  'btn-primary btn-sm col col-md-3 float-right',
					callback:   function() {
						        wsweb_dialogbox_close_updatesignal() ;
						   }
				    }
		        },
			onshow:  function() {
				    // ui ajust
				    if (typeof $(".dial").knob !== "undefined")
				    {
		                        var nvalues = Math.pow(2, signal_obj.nbits) ;
				        $(".dial").knob({ 'min':0, 'max':(nvalues-1) })
						  .val(signal_obj.value)
						  .trigger('change') ;
				    }

				    var bb = $('#dlg_updatesignal') ;
				    bb.find(".modal-title").addClass("mx-auto") ;
				    bb.find(".bootbox-close-button").addClass("mx-1 btn-close border-0") ;
				    bb.modal('handleUpdate') ;

				    // uicfg and events
				    wsweb_scroll_record('#scroller-signal') ;
				    simcore_record_captureInit() ;
				 },
			size:    'large'
                } ;

		return wsweb_dlg_open(dlg_obj) ;
        }

        function wepsim_update_signal_quick ( key )
        {
		// check signal
		var signal_obj = simhw_sim_signal(key) ;
		if (typeof signal_obj === "undefined") {
		    return ;
	        }

		// update signal
		var nvalues = Math.pow(2, simhw_sim_signal(key).nbits) ;
		var user_input = simhw_sim_signal(key).value ;
		user_input = (user_input + 1) % nvalues ;

                wepsim_update_signal_with_value(key, user_input) ;
        }

        function wepsim_update_signal_with_value ( key, value )
        {
                // update signal
		simhw_sim_signal(key).value = value ;
		propage_signal_update(key) ;

                // add if recording
                simcore_record_append_new('Update signal ' + key + ' with value ' + value,
                                          'wepsim_update_signal_with_value("' + key + '", ' + value + ');\n') ;
        }

        // Show signal dependencies

        function show_visgraph ( jit_fire_dep, jit_fire_order )
        {
	    var sig = {} ;
            var tmp_hash  = {} ;
            var tmp_nodes = [] ;
            var tmp_id    = 0;

            for (sig in simhw_sim_signals())
            {
                 tmp_hash[sig] = tmp_id ;
                 tmp_nodes.push({id: tmp_id,
                                 label: sig,
                                 title: sig}) ;
                 tmp_id++ ;
            }
            for (var i=0; i<jit_fire_order.length; i++) {
                 tmp_nodes[tmp_hash[jit_fire_order[i]]].color = '#7BE141' ;
            }
	    var jit_dep_nodes = new vis.DataSet(tmp_nodes) ;

            var tmp_edges = [] ;
            for (sig in simhw_sim_signals()) {
                 for (var sigorg in jit_fire_dep[sig]) {
                      tmp_edges.push({from: tmp_hash[sigorg],
                                      to:   tmp_hash[sig],
                                      arrows: 'to'}) ;
                }
            }
	    var jit_dep_edges = new vis.DataSet(tmp_edges) ;

	    var jit_dep_container = document.getElementById('depgraph1c') ;
	    var jit_dep_data    = { nodes: jit_dep_nodes,
                                    edges: jit_dep_edges } ;
	    var jit_dep_options = { interaction: {hover:true},
                                    height: '255px',
                                    nodes: { borderWidth: 2, shadow:true },
                                    edges: { width: 2, shadow:true } } ;
	    jit_dep_network = new vis.Network(jit_dep_container, jit_dep_data, jit_dep_options) ;
        }

