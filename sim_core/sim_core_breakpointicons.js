/*
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


    var breakpoint_icon_list = [
                    { type: "classic", shortname: "classic",	origin: "https://www.optikunde.de/farbe/rot.php" },
                    { type: "classic", shortname: "pushpin",	origin: "http://clipart-library.com/red-push-pin.html" },
                    { type: "pets",    shortname: "cat1",	origin: "" },
                    { type: "pets",    shortname: "dog1",	origin: "" },
                    { type: "films",   shortname: "super",	origin: "https://worldvectorlogo.com/logo/superman-3" },
                    { type: "films",   shortname: "batman",	origin: "http://getwallpapers.com/collection/black-and-white-batman-wallpaper" },
                    { type: "films",   shortname: "r2d2",	origin: "https://imgur.com/gallery/gKSmy" },
                    { type: "films",   shortname: "sw",		origin: "https://i2.wp.com/icons.iconarchive.com/icons/sensibleworld/starwars/1024/Death-Star-icon.png" },
                    { type: "films",   shortname: "bb8",	origin: "" },
                    { type: "films",   shortname: "vader1",	origin: "" },
                    { type: "films",   shortname: "grail", 	origin: "http://3png.com/a-31243892.html" },
                    { type: "films",   shortname: "despicable",	origin: "https://www.helloforos.com/t/cerrado/350821/81" },
                    { type: "films",   shortname: "lotr4",	origin: "http://www.cinecollectibles.com/gentle-giant-c-1_62.html" },
                    { type: "films",   shortname: "lotr2",	origin: "https://www.forbes.com/sites/adrianbridgwater/2016/01/15/microsoft-r-one-big-data-tool-to-rule-them-all/" },
                    { type: "films",   shortname: "hp1",	origin: "http://www.logosclicks.com/logos/harry-potter-name-logo-46a93c.html" }
    ] ;

    function sim_core_breakpointicon_get ( icon_name )
    {
	  return "<img alt='stop icon' height=22 src='images/stop/stop_" + icon_name + ".gif'>" ;
    }

