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


    // EP

    examples.es.push({
                       id: 'S1E1',
                       title: "Instrucciones",
                       level: "Inicial",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_base",
                       assembly:  "ep_s1_e1",
                       description: "Ejemplo simple con fetch, instrucciones aritm&eacute;ticas y segmento de c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S1E2',
                       title: "Acceso a memoria",
                       level: "Inicial",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_base",
                       assembly:  "ep_s1_e2",
                       description: "Ejemplo simple con fetch, acceso a memoria y segmento de c&oacute;digo/datos b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S1E3',
                       title: "Bucles",
                       level: "Inicial",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_enhanced",
                       assembly:  "ep_s1_e3",
                       description: "Ejemplo simple con fetch, salto y segmento de c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S1E4',
                       title: "Vector",
                       level: "Inicial",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_enhanced",
                       assembly:  "ep_s1_e4",
                       description: "Ejemplo simple con fetch, salto y segmento de datos/c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S2E1',
                       title: "E/S",
                       level: "Intermedio",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_base",
                       assembly:  "ep_s2_e1",
                       description: "Ejemplo ampliado con E/S programada, segmento de datos/c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S2E2',
                       title: "Subrutina",
                       level: "Intermedio",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_enhanced",
                       assembly:  "ep_s2_e2",
                       description: "Ejemplo ampliado con m&aacute;s instrucciones y E/S (keyboard, display).<br>"
                     });

    examples.es.push({
                       id: 'S2E3',
                       title: "M&aacute;scaras y desplazamientos",
                       level: "Intermedio",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s2_e3",
                       assembly:  "ep_s2_e3",
                       description: "Ejemplo ampliado con m&aacute;scaras, desplazamientos y segmento de datos/c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S2E4',
                       title: "Matriz",
                       level: "Intermedio",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s2_e4",
                       assembly:  "ep_s2_e4",
                       description: "Ejemplo ampliado con subrutina y matriz.<br>"
                     });

    examples.es.push({
                       id: 'S3E1',
                       title: "Interrupciones",
                       level: "Avanzado",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s3_e1",
                       assembly:  "ep_s3_e1",
                       description: "<b>Instructive</b> example con interrupciones: fetch, RETI y .ktext/.kdata.<br>"
                     });

    examples.es.push({
                       id: 'S3E2',
                       title: "Llamada al sistema",
                       level: "Avanzado",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s3_e2",
                       assembly:  "ep_s3_e2",
                       description: "<b>Instructive</b> example con llamada al sistema.<br>"
                     });

    examples.es.push({
                       id: 'S3E3',
                       title: "Excepci&oacute;n",
                       level: "Avanzado",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s3_e3",
                       assembly:  "ep_s3_e3",
                       description: "<b>Instructive</b> example con excepci&oacute;n de coma flotante.<br>"
                     });

    examples.es.push({
                       id: 'S4E1',
                       title: "Int. + S.C. + Exc.",
                       level: "Sistemas Operativos",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s4_e1",
                       assembly:  "ep_s4_e1",
                       description: "Ejemplo avanzado con interrupci&oacute;n, llamada al sistema y excepci&oacute;n.<br>"
                     });

    examples.es.push({
                       id: 'S4E2',
                       title: "SC 1, 4-5, 8, 11-12",
                       level: "Sistemas Operativos",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_os",
                       assembly:  "ep_s4_e2",
                       description: "Ejemplo de llamada al sistema para imprimir/leer entero y cadena de caracteres.<br>"
                     });

    examples.es.push({
                       id: 'S4E3',
                       title: "Hilos",
                       level: "Sistemas Operativos",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_os",
                       assembly:  "ep_s4_e3",
                       description: "Ejemplo de hilos.<br>"
                     });

    examples.es.push({
                       id: 'S4E4',
                       title: "Alloc.s",
                       level: "Sistemas Operativos",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_os",
                       assembly:  "ep_s4_e4",
                       description: "Ejemplo de malloc y free.<br>"
                     });

    examples.es.push({
                       id: 'S5E1',
                       title: "addv + seqv.",
                       level: "Laboratorio",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s5_e1",
                       assembly:  "ep_s5_e1",
                       description: "Extensiones espec&iacute;ficas de aplicaci&oacute;n: addv + seqv.<br>"
                     });

    examples.es.push({
                       id: 'S5E2',
                       title: "strlen_2 + skipasciicode_2",
                       level: "Laboratorio",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s5_e2",
                       assembly:  "ep_s5_e2",
                       description: "Extensiones espec&iacute;ficas de aplicaci&oacute;n: strlen_2 + skipasciicode_2.<br>"
                     });

    examples.es.push({
                       id: 'S5E3',
                       title: "madd, mmul, mxch",
                       level: "Laboratorio",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s5_e3",
                       assembly:  "ep_s5_e3",
                       description: "Extensiones espec&iacute;ficas de aplicaci&oacute;n: madd + mmul + mxch.<br>"
                     });

    examples.es.push({
                       id: 'S6E1',
                       title: "Para completar",
                       level: "Especial",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_bare",
                       assembly:  "ep_s6_e1",
                       description: "Ejemplo para pruebas.<br>"
                     });


    // EP+MIPS

    examples.es.push({
                       id: 'S1E1',
                       title: "Instrucciones",
                       level: "Inicial",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s1_e1",
                       description: "Ejemplo simple con fetch, instrucciones aritm&eacute;ticas y segmento de c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S1E2',
                       title: "Acceso a memoria",
                       level: "Inicial",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s1_e2",
                       description: "Ejemplo simple con fetch, acceso a memoria y segmento de c&oacute;digo/datos b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S1E3',
                       title: "Bucles",
                       level: "Inicial",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s1_e3",
                       description: "Ejemplo simple con fetch, salto y segmento de c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S1E4',
                       title: "Vector",
                       level: "Inicial",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s1_e4",
                       description: "Ejemplo simple con fetch, salto y segmento de datos/c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S2E1',
                       title: "E/S",
                       level: "Intermedio",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s2_e1",
                       description: "Ejemplo ampliado con E/S programada, segmento de datos/c&oacute;digo b&aacute;sico.<br>"
                     });

/*
    examples.es.push({
                       id: 'S2E2',
                       title: "Subrutina",
                       level: "Intermedio",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s2_e2",
                       description: "Ejemplo ampliado con m&aacute;s instrucciones y E/S (keyboard, display).<br>"
                     });
*/

    examples.es.push({
                       id: 'S2E3',
                       title: "M&aacute;scaras y desplazamientos",
                       level: "Intermedio",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s2_e3",
                       description: "Ejemplo ampliado con m&aacute;scaras, desplazamientos y segmento de datos/c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S2E4',
                       title: "Matriz",
                       level: "Intermedio",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s2_e4",
                       description: "Ejemplo ampliado con subrutina y matriz.<br>"
                     });

    examples.es.push({
                       id: 'S3E1',
                       title: "Interrupciones",
                       level: "Avanzado",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s3_e1",
                       description: "Ejemplo con interrupciones: fetch, RETI y .ktext/.kdata.<br>"
                     });

    examples.es.push({
                       id: 'S3E2',
                       title: "Llamada al sistema",
                       level: "Avanzado",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s3_e2",
                       description: "Ejemplo con llamada al sistema.<br>"
                     });

    examples.es.push({
                       id: 'S3E3',
                       title: "Excepci&oacute;n",
                       level: "Avanzado",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s3_e3",
                       description: "Ejemplo con excepci&oacute;n de coma flotante.<br>"
                     });

    examples.es.push({
                       id: 'S3E4',
                       title: "Int. + syscall + except.",
                       level: "Avanzado",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s3_e4",
                       description: "Ejemplo avanzado con interrupci&oacute;n, llamada al sistema y excepci&oacute;n.<br>"
                     });

    examples.es.push({
                       id: 'S4E2',
                       title: "strlen_2 + skipasciicode_2",
                       level: "Laboratorio",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s4_e2",
                       description: "Extensiones espec&iacute;ficas de aplicaci&oacute;n: strlen_2 + skipasciicode_2.<br>"
                     });

    examples.es.push({
                       id: 'S4E4',
                       title: "syscall 1, 4-5, 8, 11-12",
                       level: "Laboratorio",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s4_e4",
                       description: "Ejemplo de llamada al sistema para imprimir/leer entero y cadena de caracteres.<br>"
                     });

    // POC

    examples.es.push({
                       id: 'S1E1',
                       title: "Instrucciones",
                       level: "Inicial",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "poc_s1_e1",
                       description: "Ejemplo simple.<br>"
                     });

    examples.es.push({
                       id: 'S1E2',
                       title: "Memory access",
                       level: "Initial",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s1_e2",
                       description: "Ejemplo simple con fetch, acceso a memoria y segmento de c&oacute;digo/datos b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S1E3',
                       title: "Looping",
                       level: "Initial",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s1_e3",
                       description: "Ejemplo simple con fetch, salto y segmento de c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S1E4',
                       title: "Vector",
                       level: "Initial",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s1_e4",
                       description: "Ejemplo simple con fetch, salto y segmento de datos/c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S2E1',
                       title: "E/S",
                       level: "Intermedio",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s2_e1",
                       description: "Ejemplo ampliado con E/S programada, segmento de datos/c&oacute;digo b&aacute;sico.<br>"
                     });

    examples.es.push({
                       id: 'S2E2',
                       title: "Subrutina",
                       level: "Intermedio",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s2_e2",
                       description: "Ejemplo ampliado con m&aacute;s instrucciones y E/S (keyboard, display).<br>"
                     });

/*
    examples.es.push({
                       id: 'S2E3',
                       title: "M&aacute;scaras y desplazamientos",
                       level: "Intermedio",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s2_e3",
                       description: "Ejemplo ampliado con m&aacute;scaras, desplazamientos y segmento de datos/c&oacute;digo b&aacute;sico.<br>"
                     });
*/

    examples.es.push({
                       id: 'S2E4',
                       title: "Matriz",
                       level: "Intermedio",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s2_e4",
                       description: "Ejemplo ampliado con subrutina y matriz.<br>"
                     });

    examples.es.push({
                       id: 'S3E1',
                       title: "Interrupciones",
                       level: "Avanzado",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_s3",
                       assembly:  "ep_s3_e1",
                       description: "<b>Instructive</b> example con interrupciones: fetch, RETI y .ktext/.kdata.<br>"
                     });

    examples.es.push({
                       id: 'S3E2',
                       title: "Llamada al sistema",
                       level: "Avanzado",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_s3",
                       assembly:  "ep_s3_e2",
                       description: "<b>Instructive</b> example con llamada al sistema.<br>"
                     });

    examples.es.push({
                       id: 'S3E3',
                       title: "Excepci&oacute;n",
                       level: "Avanzado",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_s3",
                       assembly:  "ep_s3_e3",
                       description: "<b>Instructive</b> example con excepci&oacute;n de coma flotante.<br>"
                     });

    examples.es.push({
                       id: 'S3E4',
                       title: "Int. + syscall + except.",
                       level: "Avanzado",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_s3",
                       assembly:  "ep_s3_e4",
                       description: "Ejemplo avanzado con interrupci&oacute;n, llamada al sistema y excepci&oacute;n.<br>"
                     });

    examples.es.push({
                       id: 'S5E1',
                       title: "Para completar",
                       level: "Especial",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_bare",
                       assembly:  "poc_s5_e1",
                       description: "Ejemplo para pruebas.<br>"
                     });

