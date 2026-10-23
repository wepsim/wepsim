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
import { wsHTMLElement } from "../wepsim_nodejs/wepsim_node_adapt.js";
import { ws_uielto, register_uielto } from "./wepsim_uielto.js";
/*
 *  Load link
 */
export class ws_load_link extends wsHTMLElement {
    static get observedAttributes() {
        return ['fid', 'jload'];
    }
    constructor() {
        // parent
        super();
    }
    update_internal_attributes() {
        // fid
        var fid = this.getAttribute('fid');
        if (fid === null)
            this.setAttribute('fid', 'id58');
        // jload
        var jload = this.getAttribute('jload');
        if (jload === null)
            this.setAttribute('jload', '');
    }
    render(event_name) {
        // update attributes
        this.update_internal_attributes();
        // save html
        var o1 = '';
        o1 += "<div class='card border-secondary h-auto'>" +
            "<div class='card-header border-secondary text-white bg-secondary p-1'>" +
            " <h5 class='m-0'>" +
            " <span class='text-white bg-secondary' data-langkey='Input link'>Input link</span>" +
            //	  " <button class='btn bg-body-tertiary mx-1 float-end py-0 col-auto' " +
            //        "         onclick='" + this.jload + "'><span data-langkey='Load'>Load</span></button>" +
            " </h5>" +
            "</div>" +
            "<div class='card-body'>" +
            //
            "<div class='container p-1'>" +
            "  <div class='row py-2'>" +
            "    <div class='col-12 pb-2'>" +
            "    <label for='" + this.fid + "' class='collapse7 w-100'><em>1. <span data-langkey='Please paste the link'>Please paste the link</span>:</em></label>" +
            "    </div>" +
            "    <div class='col-12 pb-2'>" +
            '    <textarea id="' + this.fid + '" class="form-control" ' +
            '          row="5" style="height:20vh;"></textarea>' +
            "    </div>" +
            "  </div>" +
            "  <div class='row py-2'>" +
            "    <div class='col-12 pb-2'>" +
            "    <label for='load_btn' class='collapse7 w-100'><em>2. <span data-langkey='Please click load'>Please click load</span>:</em></label>" +
            "    </div>" +
            "    <div class='col-12 pb-2'>" +
            "    <button id='load_btn' class='btn bg-body-tertiary border border-secondary float-none w-100' " +
            "            onclick='" + this.jload + "'><span data-langkey='Load'>Load</span></button>" +
            "    </div>" +
            "  </div>" +
            "</div>" +
            //
            "</div>";
        this.innerHTML = o1;
    }
    connectedCallback() {
        this.render('connectedCallback');
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.render('attributeChangedCallback');
    }
    get fid() {
        return this.getAttribute('fid');
    }
    set fid(value) {
        this.setAttribute('fid', value);
    }
    get jload() {
        return this.getAttribute('jload');
    }
    set jload(value) {
        this.setAttribute('jload', value);
    }
}
register_uielto('ws-load-link', ws_load_link);
