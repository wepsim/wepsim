/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


    i18n.eltos.compiler.en = {

	   "NO TAG OR DIRECTIVE":  "Expected tag or directive but found this token instead: ",
           "INVALID TAG FORMAT":   "A tag must follow an alphanumeric format (starting with a letter or underscore): ",
           "TAG OR INSTRUCTION":   "A tag can not have the same name as an instruction: ",
           "REPEATED TAG":         "Repeated tag: ",
           "NO NUMERIC DATATYPE":  "Expected value for numeric datatype but found: ",

           "NO POSITIVE NUMBER":   "Expected a positive number but found: ",
	   "NO NUMBER OF BYTES":   "Expected number of bytes to reserve in .space but found: ",
           "INVALID ALIGN VALUE":  "Expected the align parameter as positive number but found: ",
           "REMEMBER ALIGN VAL":   "Remember that number is the power of two for alignment, see MIPS documentation.",
           "NOT CLOSED STRING":    "String is not closed (forgot to end it with quotation marks)",
           "NO QUOTATION MARKS":   "Expected string between quotation marks but found: ",
           "UNEXPECTED DATATYPE":  "Unexpected datatype name: ",
           "INVALID SEGMENT NAME": "Expected .data/.text/... segment but found: ",
           "NO MAIN OR KMAIN":     "Tags 'main' or 'kmain' are not defined in the text segment(s). " +
                                   "It is compulsory to define at least one of those tags in order to execute a program",
           "UNKNOWN 1":            "An unknown error ocurred (1)",
           "UNKNOWN 2":            "Unexpected error (2)",
           "REMEMBER I. FORMAT":   "Remember that the instruction format has been defined as: ",
           "SEVERAL CANDIDATES":   "Instruction and fields match with more than one microprogram. " +
                                   "Please check the microcode. Currently, the instruction format can be: ",
           "NOT MATCH MICRO":      "Instruction and fields don't match with microprogram. ",
           "CHECK MICROCODE":      "Please check the microcode. Probably you forgot to add a field, a number does not fit in its space, or you just used a wrong instruction",

	   "_last_":						"_last_"
    } ;

