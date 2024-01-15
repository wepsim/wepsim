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


    ws_info.breakpoint_icon_list = {
                    "classic": 		{ type: "classic",      addclass: "no-dark-mode",  origin: "https://www.optikunde.de/farbe/rot.php" },
                    "pushpin": 		{ type: "classic",      addclass: "no-dark-mode",  origin: "http://clipart-library.com/red-push-pin.html" },
                    "cat1": 		{ type: "pets",         addclass: "no-dark-mode",  origin: "" },
                    "dog1": 		{ type: "pets",         addclass: "no-dark-mode",  origin: "" },
                    "halloween1": 	{ type: "halloween",    addclass: "no-dark-mode",  origin: "https://es.vexels.com/svg-png/halloween/" },
                    "halloween2": 	{ type: "halloween",    addclass: "no-dark-mode",  origin: "https://es.vexels.com/png-svg/vista-previa/153871/casa-de-halloween-de-miedo" },
                    "xmas1": 		{ type: "christmas",    addclass: "",              origin: "https://week-of-icons-2018.netlify.com/data/5/animations/1.gif" },
                    "xmas2": 		{ type: "christmas",    addclass: "",              origin: "https://week-of-icons-2018.netlify.com/data/5/animations/3.gif" },
                    "xmas3": 		{ type: "christmas",    addclass: "",              origin: "https://peaceartsite.com/images/stained-glass-snowy-peace-t.gif" },
                    "r2d2": 		{ type: "star wars",    addclass: "",              origin: "https://imgur.com/gallery/gKSmy" },
                    "sw": 		{ type: "star wars",    addclass: "",              origin: "https://i2.wp.com/icons.iconarchive.com/icons/sensibleworld/starwars/1024/Death-Star-icon.png" },
                    "bb8": 		{ type: "star wars",    addclass: "no-dark-mode",  origin: "" },
                    "vader1": 		{ type: "star wars",    addclass: "",              origin: "" },
                    "ds1": 		{ type: "star wars",    addclass: "",              origin: "https://media0.giphy.com/media/SVhnmDDdOzrZC/source.gif" },
                    "lotr4": 		{ type: "lotr",         addclass: "no-dark-mode",  origin: "http://www.cinecollectibles.com/gentle-giant-c-1_62.html" },
                    "lotr2": 		{ type: "lotr",         addclass: "no-dark-mode",  origin: "https://www.forbes.com/sites/adrianbridgwater/2016/01/15/microsoft-r-one-big-data-tool-to-rule-them-all/" },
                    "lotr6": 		{ type: "lotr",         addclass: "no-dark-mode",  origin: "https://pm1.narvii.com/5903/f831ee80d012b8a8ba7156c39505cc4824889901_128.jpg" },
                    "hp1": 		{ type: "harry potter", addclass: "no-dark-mode",  origin: "http://www.logosclicks.com/logos/harry-potter-name-logo-46a93c.html" },
                    "hp2": 		{ type: "harry potter", addclass: "no-dark-mode",  origin: "https://www.flaticon.com/free-icon/harry-potter_86485" },
                    "hp3": 		{ type: "harry potter", addclass: "no-dark-mode",  origin: "https://lafrikileria.com/es/cosas-de-harry-potter-regalos/20569-funko-pop-patronus-harry-potter-889698469944.html" },
                    "super": 		{ type: "films",        addclass: "no-dark-mode",  origin: "https://worldvectorlogo.com/logo/superman-3" },
                    "batman": 		{ type: "films",        addclass: "",              origin: "http://getwallpapers.com/collection/black-and-white-batman-wallpaper" },
                    "grail": 		{ type: "films",        addclass: "no-dark-mode",  origin: "http://3png.com/a-31243892.html" },
                    "despicable": 	{ type: "films",        addclass: "no-dark-mode",  origin: "https://www.helloforos.com/t/cerrado/350821/81" },
                    "t800b": 		{ type: "films",        addclass: "no-dark-mode",  origin: "https://www.pngegg.com/en/png-buhsk" },
                    "t1000a": 		{ type: "films",        addclass: "no-dark-mode",  origin: "https://i0.pngocean.com/files/328/174/569/the-terminator-sticker-t-1000-telegram-world-of-tanks-suren-mnatsakanyan-street.jpg" }
    } ;


    function sim_core_breakpointicon_get ( icon_name )
    {
	  var icon_obj = null ;

	  icon_obj = ws_info.breakpoint_icon_list[icon_name] ;
	  if (typeof icon_obj === "undefined") {
	      icon_name = 'classic' ;
	      icon_obj = ws_info.breakpoint_icon_list[icon_name] ;
	  }

	  return "<img alt='stop icon' height=22 " +
		 "     class='" + icon_obj.addclass + "' " +
		 "     src='images/stop/stop_" + icon_name + ".gif'>" ;
    }

