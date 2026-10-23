/*
 *  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
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


        import { wsHTMLElement }   from "../wepsim_nodejs/wepsim_node_adapt.js";
        import { ws_uielto,
                 register_uielto } from "./wepsim_uielto.js";


        /*
         *  Load browser cache
         */

        export class ws_load_browser_cache extends wsHTMLElement
        {
              static get observedAttributes()
	      {
	            return [ 'fid', 'jload' ] ;
	      }

	      constructor ()
	      {
		    // parent
		    super();
	      }

	      update_internal_attributes ( )
	      {
                    // fid
                    var fid = this.getAttribute('fid') ;
                    if (fid === null)
                        this.setAttribute('fid', 'id58') ;

                    // jload
                    var jload = this.getAttribute('jload') ;
                    if (jload === null)
                        this.setAttribute('jload', '') ;
	      }

	      render ( event_name )
	      {
                    // update attributes
                    this.update_internal_attributes() ;

                    // save html
                    var o1 = '' ;

		    o1 += "   <div class='card border-secondary h-100'>" +
			  "      <div class='card-header border-secondary text-white bg-secondary p-1'>" +
/*
			  "	  <h5 class='m-0'>" +
			  "	    <span class='text-white bg-secondary' data-langkey='Browser cache'>Browser cache</span>" +
			  "	    <button class='btn bg-body-tertiary mx-1 float-end py-0 col-auto'" +
			  "		    onclick='var ret = ws.wepsim_checkpoint_loadFromCache(\"browserCacheElto\");" +
			  "			     ws.wsweb_dialog_close(\"current_checkpoint\");" +
			  "			     if (ret.error)" +
			  "				  ws.wepsim_notify_success(\"<strong>INFO</strong>\", ret.msg);" +
			  "			     else ws.wepsim_notify_success(\"<strong>INFO</strong>\", \"Processing load request...\");" +
			  "			     return false;'><span data-langkey='Load'>Load</span></button>" +
			  "		  <div class='dropdown float-end'>" +
			  "		    <button class='btn bg-body-tertiary text-danger py-0 mx-1 float-end col-auto dropdown-toggle' " +
			  "			    type='button' id='resetyn2' data-bs-toggle='dropdown' " +
			  "			    aria-haspopup='true' aria-expanded='false' " +
			  "			    ><span data-langkey='Reset'>Reset</span></button>" +
			  "		    </button>" +
			  "		    <div class='dropdown-menu' aria-labelledby='resetyn2'>" +
			  "		     <a class='dropdown-item py-2 bg-body text-danger' type='button' " +
			  "			onclick='ws.wepsim_checkpoint_clearCache();" +
			  "				 ws.wepsim_checkpoint_listCache(\"browserCacheList1\");" +
			  "				 return false;'" +
			  "			 ><span data-langkey='Yes'>Yes</span></a>" +
			  "		      <div class='dropdown-divider'></div>" +
			  "		      <a class='dropdown-item py-2 bg-body text-info' type='button' " +
			  "			 ><span data-langkey='No'>No</span></a>" +
			  "		    </div>" +
			  "		  </div>" +
			  "	  </h5>" +
 */
			  "	  <h5 class='m-0'>" +
			  "	    <span class='text-white bg-secondary' data-langkey='Browser cache'>Browser cache</span>" +
			  "		  <div class='dropdown float-end'>" +
			  "		    <button class='btn bg-body-tertiary text-danger py-0 mx-1 float-end col-auto dropdown-toggle' " +
			  "			    type='button' id='resetyn2' data-bs-toggle='dropdown' " +
			  "			    aria-haspopup='true' aria-expanded='false' " +
			  "			    ><span data-langkey='Reset'>Reset</span></button>" +
			  "		    </button>" +
			  "		    <div class='dropdown-menu' aria-labelledby='resetyn2'>" +
			  "		     <a class='dropdown-item py-2 bg-body text-danger' type='button' " +
			  "			onclick='ws.wepsim_checkpoint_clearCache();" +
			  "				 ws.wepsim_checkpoint_listCache(\"browserCacheList1\");" +
			  "				 return false;'" +
			  "			 ><span data-langkey='Yes'>Yes</span></a>" +
			  "		      <div class='dropdown-divider'></div>" +
			  "		      <a class='dropdown-item py-2 bg-body text-info' type='button' " +
			  "			 ><span data-langkey='No'>No</span></a>" +
			  "		    </div>" +
			  "		  </div>" +
			  "	  </h5>" +
			  "      </div>" +
			  "      <div class='card-body'>" +
			  //
                          "      <div class='container p-1 d-flex flex-column h-100'>" +
                          "        <div class='row py-2'>" +
                          "          <div class='col-12 pb-2'>" +
			  "          <label for='browserCacheList1' class='collapse7 w-100'>1. <em><span data-langkey='Session to be restore'>Session to be restore</span>:</em><br></label>" +
                          "          </div>" +
                          "          <div class='col-12 pb-2'>" +
			  "          <div id='browserCacheList1'" +
			  "      	  style='max-height:30vh; width:inherit; overflow:auto; -webkit-overflow-scrolling:touch;'>&lt;Empty&gt;</div>" +
                          "          </div>" +
                          "        </div>" +
                          "        <div class='row py-2 mt-auto'>" +
                          "          <div class='col-12 pb-2'>" +
			  "          <label for='browserCacheLoad' class='collapse7 w-100'>2. <em><span data-langkey='Click load button'>Click load button</span>:</em><br></label>" +
                          "          </div>" +
                          "          <div class='col-12 pb-2'>" +
			  "	     <button id='browserCacheLoad' class='btn bg-body-tertiary border mx-1 float-none w-100'" +
                          "                  onclick='" + this.jload + "'><span data-langkey='Load'>Load</span></button>" +
                          "          </div>" +
                          "        </div>" +
                          "      </div>" +
                          //
			  "   </div>" +
			  "</div>" ;

                    this.innerHTML = o1 ;
	      }

	      connectedCallback ()
	      {
		    this.render('connectedCallback') ;
	      }

	      attributeChangedCallback (name, oldValue, newValue)
	      {
		    this.render('attributeChangedCallback') ;
	      }

	      get fid ( )
	      {
                   return this.getAttribute('fid') ;
	      }

	      set fid ( value )
	      {
                   this.setAttribute('fid', value) ;
	      }

	      get jload ( )
	      {
                   return this.getAttribute('jload') ;
	      }

	      set jload ( value )
	      {
                   this.setAttribute('jload', value) ;
	      }
        }

        register_uielto('ws-load-browser-cache', ws_load_browser_cache) ;

