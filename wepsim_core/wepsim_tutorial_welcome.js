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


    ws_info.tutorials.welcome = [
				  {
				     id:          "welcome",
				     title:       "<span data-langkey='title_0'>title 0</span>",
				     message:     "<span data-langkey='message_0'>message 0</span>",
				     code_pre:    simcore_do_nothing_handler,
				     code_post:   simcore_do_nothing_handler,
				     wait_next:   100
				  },
				  {
				     id:          "welcome",
				     title:       "<span data-langkey='title_1'>title 1</span>",
				     message:     "<span data-langkey='message_1'>message 1</span>",
				     code_pre:    simcore_do_nothing_handler,
				     code_post:   simcore_do_nothing_handler,
				     wait_next:   100
				  },
				  {
				     id:          "welcome",
				     title:       "<span data-langkey='title_2'>title 2</span>",
				     message:     "<span data-langkey='message_2'>message 2</span>",
				     code_pre:    simcore_do_nothing_handler,
				     code_post:   simcore_do_nothing_handler,
				     wait_next:   100
				  },
				  {
				     id:          "welcome",
				     title:       "<span data-langkey='title_3'>title 3</span>",
				     message:     "<span data-langkey='message_3'>message 3</span>",
				     code_pre:    simcore_do_nothing_handler,
				     code_post:   simcore_do_nothing_handler,
				     wait_next:   100
				  },
				  {
				     id:          "welcome",
				     title:       "<span data-langkey='title_4'>title 4</span>",
				     message:     "<span data-langkey='message_4'>message 4</span>",
				     code_pre:    simcore_do_nothing_handler,
				     code_post:   simcore_do_nothing_handler,
				     wait_next:   100
				  },
				  {
				     id:          "welcome",
				     title:       "<span data-langkey='title_5'>title 5</span>",
				     message:     "<span data-langkey='message_5'>message 5</span>",
				     code_pre:    function() {  },
				     code_post:   function() {
                                                      var welcome_example="ep:mips/ep_base.mc:mips/s1e1.asm";
						      load_from_example_firmware(welcome_example, true);
						  },
				     wait_next:   100
				  }
                                ] ;

