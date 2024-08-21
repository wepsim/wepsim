/*
 *  Copyright 2015-2024 Saul Alonso Monsalve, Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos, Juan Banga Pardo
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


/* jshint esversion: 9 */


//
//  (3/3) Load JSON object to main memory (see README.md for more information)
//
//  Auxiliar function tree for wsasm_obj2mem  ( ret )
//   * wsasm_writememory_if_word              ( mp, gen, track_source, track_comments )
//   * wsasm_writememory_and_accumulate       ( mp, gen, valuebin )
//   * wsasm_zeropadding_and_writememory      ( mp, gen )
//   * wsasm_writememory_and_accumulate_part  ( mp, gen, valuebin, track_source_j, track_source, track_comments )
//   * wsasm_writememory_and_accumulate_part_endian ( ret_mp, gen, obj_i, valuebin, n_bytes, j_byte )
//

function wsasm_writememory_if_word ( mp, gen, track_source, track_comments )
{
        // check if a full word is present...
        if (gen.byteWord < WORD_BYTES) {
            return ;
        }

        // write into memory current word...
        var melto = {
                      "value":           gen.machine_code,
                      "source":          gen.source,
                      "source_bin":      gen.source_bin,
                      "source_tracking": gen.track_source,
                      "comments":        gen.comments,
		      "binary":          gen.machine_code,
                      "firm_reference":  gen.firm_reference,
                      "is_assembly":     gen.is_assembly,
                    } ;
        main_memory_set(mp, gen.addr, melto) ;

        // set 'gen' to 'default' values for next word...
        gen.byteWord       =  0 ;
        gen.addr           = '0x' + (parseInt(gen.addr) + WORD_BYTES).toString(16) ;
        gen.machine_code   = '' ;
        gen.source         = '' ;
        gen.source_bin     = '' ;
        gen.track_source   = track_source ;
        gen.comments       = track_comments ;
        gen.firm_reference = null ;
        gen.is_assembly    = false ;
}

function wsasm_writememory_and_accumulate ( mp, gen, valuebin )
{
        wsasm_writememory_if_word(mp, gen, [], []) ;

        gen.machine_code  = valuebin + gen.machine_code ;  //  3,2,1,0
        gen.byteWord     += 1 ;
}

function wsasm_zeropadding_and_writememory ( mp, gen )
{
        if (0 == gen.byteWord) {
            return ;
        }

        // zero-padding...
        var left_bytes = WORD_BYTES - gen.byteWord ;
	for (var k=0; k<left_bytes; k++) {
	     wsasm_writememory_and_accumulate(mp, gen, '0'.repeat(BYTE_LENGTH)) ;
	}

        // write last full word...
        wsasm_writememory_if_word(mp, gen, [], []) ;
}

function wsasm_writememory_and_accumulate_part ( mp, gen, valuebin, track_source_j, track_source, track_comments )
{
        wsasm_writememory_if_word(mp, gen, track_source, track_comments) ;

        gen.machine_code  = valuebin + gen.machine_code ;  //  3,2,1,0
        gen.byteWord     += 1 ;

        if (track_source_j != null) {
            gen.track_source.push(track_source_j) ;
	}
}

function wsasm_writememory_and_accumulate_part_endian ( ret_mp, gen, obj_i, valuebin, n_bytes, j_byte )
{
	var b_index = 0 ;

        switch (obj_i.endian)
	{
           case 'big':    // big endian
                b_index = j_byte * BYTE_LENGTH ;
                break ;

           case 'little': // little endian
		if (n_bytes < WORD_BYTES) {
		    b_index = n_bytes - j_byte - 1 ;
		}
		else {
		    b_index = (j_byte / WORD_BYTES) >>> 0 ;
		    b_index = b_index * WORD_BYTES + WORD_BYTES - (j_byte % WORD_BYTES) - 1 ;
		}

		b_index = b_index * BYTE_LENGTH ;
                break ;

           default:  // none
		b_index = n_bytes - j_byte - 1 ;
		b_index = b_index * BYTE_LENGTH ;
                break ;
	}

	var valuebin8 = valuebin.substr(b_index, BYTE_LENGTH) ;
	wsasm_writememory_and_accumulate_part(ret_mp, gen, valuebin8, null, obj_i.track_source, obj_i.comments) ;
}


 /*
  *  Public API (see README.md for more information)
  */

function wsasm_obj2mem  ( ret )
{
	 var addr      = '' ;
         var n_bytes   = 0 ;
         var valuebin  = '' ;
         var candidate = null ;

         var seg_name_old    = '' ;
         var seg_name        = '' ;
         var last_assig_word = {} ;
         var word_1 = 0 ;
         var word_2 = 0 ;

         var gen = {} ;
         gen.byteWord       = 0 ;
         gen.addr           = -1 ;
         gen.machine_code   = '' ;
         gen.source         = '' ;
         gen.source_bin     = '' ;
         gen.track_source   = [] ;
         gen.comments       = [] ;
         gen.firm_reference = null ;

         ret.mp = {} ;
         for (let i=0; i<ret.obj.length; i++)
         {
              // (1) flushing if there is some pending data in 'seg_name_old' segment...
              seg_name = ret.obj[i].seg_name ;
	      if (seg_name_old != seg_name)
              {
	          if (seg_name_old != '') {
                      wsasm_zeropadding_and_writememory(ret.mp, gen) ;
                  }
                  seg_name_old = seg_name ;
	      }

              // ...update initial word address for this segment if needed...
              if (typeof last_assig_word[seg_name] == "undefined")
              {
                  gen.addr = "0x" + ret.obj[i].elto_ptr.toString(16) ;
                  last_assig_word[seg_name] = gen.addr ;
              }

              // ... and setup the working address for the new obj[i]
              gen.addr = last_assig_word[seg_name] ; // recover last saved value if we switch to other segment

              // skip .byte to .half/.word/... alignment if needed
              if ((i != 0) && (ret.obj[i].seg_name == ret.obj[i-1].seg_name))
              {
                   word_1 = ret.obj[i].elto_ptr - (ret.obj[i-1].elto_ptr + ret.obj[i-1].byte_size) ;
                   if (word_1 > 0)
                   {
                       valuebin = "0".repeat(BYTE_LENGTH) ;
                       for (let j=0; j<word_1; j++) {
                            wsasm_writememory_and_accumulate_part(ret.mp, gen, valuebin, null, [], ret.obj[i].comments) ;
                       }
                   }

                   // flush current word if needed...
                   wsasm_writememory_if_word(ret.mp, gen, [], []) ;
              }

              word_1 = (ret.obj[i].elto_ptr / WORD_BYTES) >>> 0 ;
              word_2 = (parseInt(gen.addr)  / WORD_BYTES) >>> 0 ;
              if (word_1 > word_2) {
                  gen.addr = "0x" + ret.obj[i].elto_ptr.toString(16) ;
              }

              // (2) if .align X then address of next elto must be multiple of 2^X
              if (wsasm_has_datatype_attr(ret.obj[i].datatype, "align")) {
                  continue ; // skip align, already memory filled if needed
              }

              // (3) instructions and data...
              gen.source     = ret.obj[i].source ;
              gen.source_bin = ret.obj[i].source_bin ;
              gen.comments   = ret.obj[i].comments ;

              if ('instruction' == ret.obj[i].datatype)
              {
                    gen.track_source.push(...ret.obj[i].track_source) ;

                    valuebin = ret.obj[i].binary ;
                    n_bytes  = ret.obj[i].binary.length / BYTE_LENGTH ;
                    for (let j=0; j<n_bytes; j++)
                    {
                         candidate = ret.obj[i].firm_reference_index ;
                         candidate = ret.obj[i].firm_reference[candidate] ;
                         gen.firm_reference = candidate ;
                         gen.is_assembly    = true ;

			 // fill for little-endian by default...
			 wsasm_writememory_and_accumulate_part_endian(ret.mp, gen, ret.obj[i], valuebin, n_bytes, j) ;
                    }
              }
              else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "numeric"))
              {
                    gen.track_source.push(...ret.obj[i].track_source) ;

                    n_bytes  = wsasm_get_datatype_size(ret.obj[i].datatype) ;
                    valuebin = ret.obj[i].value.padStart(n_bytes*BYTE_LENGTH, '0') ;

                    // next: fill byte by byte
                    for (let j=0; j<n_bytes; j++)
                    {
			 // fill for little-endian by default...
			 wsasm_writememory_and_accumulate_part_endian(ret.mp, gen, ret.obj[i], valuebin, n_bytes, j) ;
                    }
              }
              else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "string"))
              {
                    // next: fill byte by byte
                    for (let j=0; j<ret.obj[i].value.length; j++)
                    {
                         valuebin = ret.obj[i].value[j].toString(2) ;
                         valuebin = valuebin.padStart(BYTE_LENGTH, '0') ;

                         wsasm_writememory_and_accumulate_part(ret.mp, gen, valuebin, ret.obj[i].track_source[j],
                                                               [], ret.obj[i].comments) ;
                    }
              }
              else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "space"))
              {
                    valuebin = "0".repeat(BYTE_LENGTH) ; // TO-CHECK: ummm, share the same object for all space is right?

                    for (let j=0; j<ret.obj[i].byte_size; j++)
                    {
                         wsasm_writememory_and_accumulate_part(ret.mp, gen, valuebin, ret.obj[i].track_source[j],
                                                               [], ret.obj[i].comments) ;
                    }
              }
              else if ("binary" == ret.obj[i].datatype)
              {
                    valuebin = ret.obj[i].binary ;
                    n_bytes  = ret.obj[i].binary.length / BYTE_LENGTH ;

                    // next: fill byte by byte
                    for (let j=0; j<n_bytes; j++)
                    {
			 wsasm_writememory_and_accumulate_part_endian(ret.mp, gen, ret.obj[i], valuebin, n_bytes, j) ;
                    }
              }

              // flush current word if needed...
              wsasm_writememory_if_word(ret.mp, gen, [], []) ;
              last_assig_word[seg_name] = gen.addr ;
         }

         // flushing if there is some pending data
         wsasm_zeropadding_and_writememory(ret.mp, gen) ;

         // copy back the last asigned address
         for (var seg_name in ret.seg)
         {
              ret.seg[seg_name].loaded = false ;

              if (typeof last_assig_word[seg_name] != "undefined") {
                   ret.seg[seg_name].end = parseInt(last_assig_word[seg_name]) ;
                   ret.seg[seg_name].loaded = true ;
              }
         }

         return ret ;
}


