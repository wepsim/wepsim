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


    //
    // General tooltip
    //

    function wepsim_tooltip_init ( tooltip_id, tooltip_cfg, fun_ownshown )
    {
         // 1) get object
         var obj1 = document.querySelector(tooltip_id) ;
         if (null == obj1) {
             return null ;
         }

         // 2) new tooltip(object) for object
	 var po1 = new bootstrap.Popover(obj1, tooltip_cfg) ;

         // 3) associate event to object
         if (null != fun_ownshown) {
             obj1.addEventListener('shown.bs.tooltip', fun_ownshown) ;
         }

         return po1 ;
    }

    function wepsim_tooltips_init ( tooltip_set_id, tooltip_cfg, fun_ownshown )
    {
         // 1) get object list
         var list1 = document.querySelectorAll(tooltip_set_id) ;
         if (null == list1) {
             return null ;
         }

         // 2) new tooltip(object) for each object in the list
         var plist1 = [...list1].map((elto) => new bootstrap.Popover(elto, tooltip_cfg)) ;

         // 3) associate event to all objects
         if (null != fun_ownshown) {
             [...list1].map((elto) => elto.addEventListener('shown.bs.tooltip', fun_ownshown)) ;
         }

         return plist1 ;
    }

    function wepsim_tooltip_show ( tooltip_id )
    {
         $('#' + tooltip_id).tooltip('show') ;
    }

    function wepsim_tooltip_hide ( tooltip_id )
    {
         $('#' + tooltip_id).tooltip('hide') ;
    }

    function wepsim_tooltip_action ( tooltip_id, action )
    {
         $('#' + tooltip_id).tooltip(action) ;
    }

    function wepsim_tooltips_hide ( tooltips_id )
    {
         $(tooltips_id).tooltip('hide') ;
    }

    function wepsim_tooltips_closeAll ( )
    {
         var e2 = null ;

         var l1 = document.querySelectorAll('[data-bs-toggle="tooltip"]') ;
    	 for (var i1=0; i1<l1.length; i1++) {
              e2 = bootstrap.Tooltip.getInstance(l1[i1]) ;
              if (e2 != null) e2.hide();
         }
    }

