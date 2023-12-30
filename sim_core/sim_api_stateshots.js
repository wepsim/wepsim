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


    /* jshint esversion: 6 */

    function simcore_simstate_checklist2state ( checklist )
    {
        var o = {} ;
	var ret = false ;

	// white-spaces...
	checklist = checklist.replace(/;|==|!=|>=|<=|=|>|</gi,
                                      function (x){return ' ' + x + ' ';});
        checklist = checklist.replace(/  /g,' ') ;

	// lines...
        var lines = checklist.split(";") ;
        for (var i=0; i<lines.length; i++)
        {
             var line = lines[i].trim() ;
	     if ("" === line)
		 continue ;

             var parts = line.split(" ") ;
	     if (parts.length < 4)
		 continue ;

	     var check = { "type": parts[0],
                           "id": parts[1],
                           "condition": parts[2],
                           "value": decodeURI(parts[3]) } ;
             for (var index in simhw_sim_components())
             {
	          ret = simhw_sim_component(index).read_state(o, check) ;
                  if (true === ret) break ;
             }

             if (false === ret) {
                 console.log("ERROR in checklist at component " + check.type + ": " + line) ;
             }
        }

        return o ;
    }

    function simcore_simstate_current2state ( )
    {
	var o = {} ;
	for (var index in simhw_sim_components()) {
	     simhw_sim_component(index).write_state(o) ;
	}

        return o ;
    }

    function simcore_simstate_expandfilter ( filter )
    {
	var first_value = 0 ;
	var last_value  = 0 ;
        var elto = null ;
        var j = 0 ;

        // to prepare filter
	var filter_ext = [] ;
	var filter_base = filter.toUpperCase().split(/[,;:]+/).filter((v) => v!='') ;
        for (var i=0; i<filter_base.length; i++)
        {
	     elto = filter_base[i].split('-') ;

             // R10/0X8008
             if (elto.length == 1) {
	         filter_ext.push(filter_base[i]) ;
                 continue ;
             }

             // 0x8000-0x8008
             if (elto[0].startsWith('0X'))
             {
                 first_value = parseInt(elto[0], 16) ;
                 last_value  = parseInt(elto[1], 16) ;
                 for (j=first_value; j<=last_value; j++) {
	              filter_ext.push('0X' + j.toString(16)) ;
                 }
                 continue ;
             }

             // R10-R20
             if (elto[0].startsWith('R'))
             {
                 elto[0] = elto[0].replace('R', '0') ;
                 elto[1] = elto[1].replace('R', '0') ;
                 first_value = parseInt(elto[0], 10) ;
                 last_value  = parseInt(elto[1], 10) ;
                 for (j=first_value; j<=last_value; j++) {
	              filter_ext.push('R' + j.toString(16)) ;
                 }
             }

             // console.log("elto = " + JSON.stringify(elto));
             // console.log("filter_ext = " + JSON.stringify(filter_ext));
        }

        return filter_ext ;
    }

    function simcore_simstate_state2checklist ( s_obj, filter )
    {
	var ret = "" ;

	var filter_ext = simcore_simstate_expandfilter(filter) ;
        for (var component in s_obj)
	{
	     for (var eltos in s_obj[component])
             {
		  var elto    = s_obj[component][eltos] ;
                  var elto_id = elto.id.toString().toUpperCase() ;

                  // console.log(" >> " + JSON.stringify(filter_ext) + " << " + JSON.stringify(elto)) ;
                  if ( (filter_ext.length != 0) && (filter_ext.indexOf(elto_id) == -1) ) {
                      continue ;
	          }

	          ret = ret + elto.type + " " + elto.id + " " + elto.op + " " + encodeURI(elto.value) + "; " ;
	     }
	}

        return ret ;
    }

    function simcore_simstate_check_results ( expected_result, obtained_result, newones_too )
    {
        var d = {} ;
        d.result = [] ;
        d.errors = 0 ;
        d.neltos_expected = 0 ;
        d.neltos_obtained = 0 ;

        var elto = null ;
	var diff = {} ;

        var obtained_value = 0 ;
	for (var compo in simhw_sim_components())
	{
	    // if there are different values -> diff
            if (typeof expected_result[compo] != "undefined")
	    {
		    for (elto in expected_result[compo])
		    {
                         d.neltos_expected++ ;

                         obtained_value = expected_result[compo][elto].default_value ;
			 if ( (typeof obtained_result[compo]       != "undefined") &&
			      (typeof obtained_result[compo][elto] != "undefined") ) {
                               obtained_value = obtained_result[compo][elto].value ;
                         }

			 diff = {} ;
			 diff.expected  = expected_result[compo][elto].value ;
			 diff.obtained  = obtained_value ;
			 diff.elto_type = compo.toLowerCase() ;
			 diff.elto_id   = expected_result[compo][elto].id ;
			 diff.elto_op   = expected_result[compo][elto].op ;

		         diff.fulfill   = false ;
			      if ("=" === expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained) == parseInt(diff.expected)) ;
			 else if (">" === expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained)  > parseInt(diff.expected)) ;
			 else if ("<" === expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained)  < parseInt(diff.expected)) ;
			 else if (">=" === expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained) >= parseInt(diff.expected)) ;
			 else if ("<=" === expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained) <= parseInt(diff.expected)) ;
			 else if ("==" === expected_result[compo][elto].op)
			          diff.fulfill = (diff.expected == diff.obtained) ;
			 else if ("!=" === expected_result[compo][elto].op)
			          diff.fulfill = (diff.expected != diff.obtained) ;

			 d.result.push(diff) ;

			 if (diff.fulfill === false)
			     d.errors++ ;
		    }
            }

	    // if there are new elements -> diff
	    if ((newones_too) && (typeof obtained_result[compo] != "undefined"))
	    {
		    for (elto in obtained_result[compo])
		    {
                         d.neltos_obtained++ ;

			 if ( (typeof expected_result[compo]       != "undefined") &&
			      (typeof expected_result[compo][elto] != "undefined") ) {
			       continue ;
		         }

			 diff = {} ;
			 diff.expected  = obtained_result[compo][elto].default_value ;
			 diff.obtained  = obtained_result[compo][elto].value ;
			 diff.fulfill   = (diff.expected === diff.obtained) ;
			 diff.elto_type = compo.toLowerCase() ;
			 diff.elto_id   = obtained_result[compo][elto].id ;
			 diff.elto_op   = "=" ;
			 d.result.push(diff) ;

			 if (diff.fulfill === false)
			     d.errors++ ;
		    }
	    }
        }

        return d ;
    }

    function simcore_simstate_diff_results ( expected_result, obtained_result )
    {
        return simcore_simstate_check_results(expected_result, obtained_result, true) ;
    }

    function simcore_simstate_diff_states ( before_state_obj, after_state_obj )
    {
	var before_arr = simcore_simstate_state2checklist(before_state_obj, '').split(";") ;
	var after_arr  = simcore_simstate_state2checklist(after_state_obj,  '').split(";") ;
	return after_arr.filter(function(elto) { return !before_arr.includes(elto); }).join(";").trim() ;
    }

    function simcore_simstate_checkreport2txt ( checklist )
    {
        var o = "";

        for (var i=0; i<checklist.length; i++)
        {
             if (checklist[i].fulfill === false) {
                 o += checklist[i].elto_type + "[" + checklist[i].elto_id + "]='" +
                      (checklist[i].obtained) + "' (expected '" + (checklist[i].expected)  + "'), ";
             }
        }

        return o;
    }

    function simcore_simstate_checkreport2html ( checklist, only_errors )
    {
        var o = "" ;
        var color = "green" ;

        if (typeof only_errors === 'undefined')
            only_errors = false ;

        o += "<table style='margin:0 0 0 0;' " +
             "       class='table table-hover table-bordered table-sm'>" +
             "<thead>" +
             "<tr>" +
             "<th>Type</th>" +
             "<th><span class='d-none d-sm-inline-flex'>Identification</span><span class='d-sm-none'>Id.</span></th>" +
             "<th><span class='d-none d-sm-inline-flex'>Values in the</span> clipboard <span class='d-none d-sm-inline-flex'>state</th>" +
             "<th><span class='d-none d-sm-inline-flex'>Values in the</span> selected <span class='d-none d-sm-inline-flex'>state</th>" +
             "</tr>" +
             "</thead>" +
             "<tbody>" ;
        for (var i=0; i<checklist.length; i++)
        {
             if (checklist[i].fulfill === false)
                  color = "table-danger" ;
             else color = "table-success" ;

             if (only_errors && checklist[i].fulfill)
                 continue ;

             o += "<tr class=" + color + ">" +
                  "<td>" + checklist[i].elto_type + "</td>" +
                  "<td>" + checklist[i].elto_id   + "</td>" +
                  "<td>" + checklist[i].elto_op + "&nbsp;" + checklist[i].expected  + "</td>" +
                  "<td>" + checklist[i].obtained  + "</td>" +
                  "</tr>" ;
        }
        o += "</tbody>" +
             "</table>" ;

        return o ;
    }

