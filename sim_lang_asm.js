/*      
 *  Copyright 2015 Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos
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


function dataSegment(tokens,dataSegment) 
{
    /*DIRECCION COMIENZO*/
    var posicionEnMemoria = parseInt(dataSegment.begin);
    var alineacion = 1;
    //text = text.toLowerCase();
    //text = text.replace(/\n/g, ' ; ');
    var resultDataSegment=new Array();
    var segmentData = new Array();
    var compileSegmentDataByteLevel= new Object();
    var compileSegmentDataWordLevel= new Object();
    var byteCounter=posicionEnMemoria;
    var wordCounter=posicionEnMemoria;
    var i = 0;
    var j = 0;
    var z=0;

    for (i = 0; i < tokens.length; i++) 
    {
        j = 0;
        var linea = tokens[i].split("\"");
        if (linea.length > 1) 
        {
            linea[0] = linea[0].replace(/:/g, " : ");
            linea[0] = linea[0].replace(/,/g, " , ");
            linea[0] = linea[0].replace(/\(/g, " ( ");
            linea[0] = linea[0].replace(/\)/g, " )");
            linea[0] = linea[0].replace(/#/g, "# ");
            linea[0] = linea[0].replace(/\t/g, "");
            linea[0] = linea[0].replace(/  /g, " ");
            linea[0] = linea[0].replace(/\s{2,}/g, ' ');
	    linea[0] = linea[0].trim();
            var parteInicial = linea[0].split(" ");
            if (parteInicial[0].trim() == "#" || parteInicial[0].trim() == "") 
            {
                if (parteInicial[0].trim() == "#") 
                {
                    // console.log("COMENTARIO");
                } else 
                {
                    // console.log("LINEA EN BLANCO");
                }
            } else 
            {
                var dataObject = new Object();
                var tamVar = 0;
                var texto = "";
                var traduction=new Array();
		var defaultAlign;
                dataObject["name"] = parteInicial[j].trim();
                j++;
                if (parteInicial[j].trim() != ":") {
			return assemblyError("Error, ':' not found: ", linea[0], j);
                }
                j++;
                switch (parteInicial[j].trim()) 
                {
                    case ".ascii":
                        // console.log("TIPO: " + parteInicial[j].trim());
			defaultAlign=0;
		        if(defaultAlign>alineacion) 
		        {
			       alineacion=defaultAlign;
		        }
                        dataObject["tipo"] = parteInicial[j].trim();
                        j++;
                        texto = linea[1];
                        /*RECORREMOS LA CADENA DE CARACTERES*/
                        for(z=0;z<texto.length;z++)
                        {
                        	var n2="00000000";
                        	if (texto[z]=="\"")
                        	{
                        			if(texto[z+1]=='t') /*CASO /t --> dec=9*/
                        			{
                        				var n3=9;
                        				n2=n2+n3.toString(2);
                        				n3=n2.substr(n2.length-1-8,8);
                        				traduction.push(n3);
                        				z++;
                        			}else
                        			{
                        				if(texto[z+1]=='n') /*CASO /n --> dec=10*/
                            			{
                        				var n3=10;
                            				n2=n2+n3.toString(2);
                            				n3=n2.substr(n2.length-1-8,8);
                            				traduction.push(n3);
                        				z++;
                            			}else
                            			{
                            				if(texto[z+1]=='0') /*EOF --> /0 --> dec=3*/
                                			{
                            					var n3=0;
                                				n2=n2+n3.toString(2);
                                				n3=n2.substr(n2.length-1-8,8);
                                				traduction.push(n3);
                            					z++;
                                			}else
                                			{
                                				var n3=texto.charCodeAt(z).toString(2);
                                				n2=n2+n3;
                                				n3=n2.substr(n2.length-1-8,8);
                                				traduction.push(n3);
                                			}
                            			}
                        			}
                        	}else
                        	{
                        		var n3=texto.charCodeAt(z).toString(2);
               				n2=n2+n3;
               				n3=n2.substr(n2.length-1-8,8);
               				traduction.push(n3);
                        	}
                        }
                        /**/
                        tamVar = traduction.length;
                        // console.log("BYTES VARIABLE:" + tamVar);
                        dataObject["contenido"] = texto;
                        dataObject["longitud"] = tamVar;
                        dataObject["traduccion"]= traduction;
                        /*CALCULO DE POSICION*/
                        while (posicionEnMemoria % Math.pow(2, alineacion) != 0) {
                            //compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                            compileSegmentDataByteLevel[byteCounter]="00000000";
                            byteCounter++;
                        	posicionEnMemoria++;
                        }
                        for(z=0;z<traduction.length;z++)
                        {
                        	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z];
                        	compileSegmentDataByteLevel[byteCounter]=traduction[z];
                        	byteCounter++;
                        }
                        dataObject["posicion"] = "0x" + posicionEnMemoria.toString(16);
                        posicionEnMemoria = posicionEnMemoria + tamVar;
                        byteCounter=posicionEnMemoria;
                        alineacion=0;
			break;
                    case ".asciiz":
                        // console.log("TIPO: " + parteInicial[j]);
			defaultAlign=0;
                        dataObject["tipo"] = parteInicial[j].trim();
		        if(defaultAlign>alineacion) 
		        {
			       alineacion=defaultAlign;
		        }
                        j++;
                        texto = linea[1];
                        j++;
                        /*RECORREMOS LA CADENA DE CARACTERES*/
                        for(z=0;z<texto.length;z++)
                        {
                        	var n2="00000000";
                        	if(texto[z]=="\"")
                        	{
                        			if(texto[z+1]=='t') /*CASO /t --> dec=9*/
                        			{
                        				var n3=9;
                        				n2=n2+n3.toString(2);
                        				n3=n2.substr(n2.length-1-8,8);
                        				traduction.push(n3);
                        				z++;
                        			}else
                        			{
                        				if(texto[z+1]=='n') /*CASO /n --> dec=10*/
                            				{
                       						var n3=10;
                            					n2=n2+n3.toString(2);
                            					n3=n2.substr(n2.length-1-8,8);
                            					traduction.push(n3);
                       						z++;
                            				}else
                            				{
                            					if(texto[z+1]=='0') /*EOF --> /0 --> dec=3*/
                                				{
                            						var n3=0;
                                					n2=n2+n3.toString(2);
                                					n3=n2.substr(n2.length-1-8,8);
                                					traduction.push(n3);
                            						z++;
                                				}else
                                				{
                                					var n3=texto.charCodeAt(z).toString(2);
                                					n2=n2+n3;
                                					n3=n2.substr(n2.length-1-8,8);
                                					traduction.push(n3);
                                				}
                            				}
                        			}
                        	}else
                        	{
                        		var n3=texto.charCodeAt(z).toString(2);
               				n2=n2+n3;
               				n3=n2.substr(n2.length-1-8,8);
               				traduction.push(n3);
                        	}
                        }
                        var n3=0;
                        n2="00000000";
     			n2=n2+n3.toString(2);
        		n3=n2.substr(n2.length-1-8,8);
        		traduction.push(n3);
                        /**/
                        tamVar = traduction.length;
                        texto = texto + '\0';
                        // console.log("BYTES VARIABLE:" + tamVar);
                        dataObject["contenido"] = texto;
                        dataObject["traduccion"]= traduction;
                        dataObject["longitud"] = tamVar;
                        /*CALCULO DE POSICION*/
                        while (posicionEnMemoria % Math.pow(2, alineacion) != 0) 
			{
                        	 //compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                        	compileSegmentDataByteLevel[byteCounter]="00000000";
                        	byteCounter++;
                        	posicionEnMemoria++;
                        }
                        for(z=0;z<traduction.length;z++)
                        {
                        	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z];
                        	compileSegmentDataByteLevel[byteCounter]=traduction[z];
                        	byteCounter++;
                        }
                        dataObject["posicion"] = "0x" + posicionEnMemoria.toString(16);
                        posicionEnMemoria = posicionEnMemoria + tamVar;
                        byteCounter=posicionEnMemoria;
                        alineacion=0;
			break;
		    default:	
			return assemblyError("Error, type of variable incorrect: ", linea[0], j);
			break;	
                }
                // console.log(dataObject);
                segmentData.push(dataObject);
                // console.log(segmentData);
            }
        } else
        {
            tokens[i] = tokens[i].replace(/:/g, " : ");
            tokens[i] = tokens[i].replace(/,/g, " , ");
            tokens[i] = tokens[i].replace(/\(/g, " ( ");
            tokens[i] = tokens[i].replace(/\)/g, " ) ");
            tokens[i] = tokens[i].replace(/#/g, "# ");
            tokens[i] = tokens[i].replace(/\t/g, "");
            tokens[i] = tokens[i].replace(/  /g, " ");
            tokens[i] = tokens[i].replace(/\s{2,}/g, ' ');
	    tokens[i] = tokens[i].trim();
	    var linea = tokens[i].split(" ");
            if (linea[j]== "#" || linea[j].trim() == "") 
            {
                if (linea[j] == "#") {
                    // console.log("COMENTARIO");
                } else 
                {
                    // console.log("LINEA EN BLANCO");
                }
            }
            else
            {
                if (linea[j].trim() == ".align" || linea[j].trim() == ".text") 
                {
                    if (linea[j].trim() == ".text") {
                        /*FIN DEL .DATA*/
                        // console.log("FIN DE .DATA");
                        break;
                    } else 
                    {
                        /*CAMBIAMOS LA ALINEACION EN MEMORIA*/
                        /*igualamos el valor de alineacion a este valor y comprobamos que se encuentra en el rango permitido*/
                        j++;
                        alineacion = parseInt(linea[j].trim());
                        // console.log("ALIGN: " + alineacion);
                     }
                } else 
                {
                    var dataObject = new Object();
                    var traduction=new Array();
                    var tamVar = 0;
                    var texto = "";
                    var contenido="";
                    var longitud=0;
	    	    var defaultAlign;
                    dataObject["name"] = linea[j].trim();
                    j++;
                    if (linea[j].trim() != ":") 
                    {
			return assemblyError("Error, ':' not found: ", linea, j);
                    }
                    j++;
                    switch (linea[j].trim()) 
                    {
                        case ".byte":
                            // console.log("TIPO: " + linea[j]);
			    defaultAlign=0;
			    if(defaultAlign>alineacion) 
			    {
				alineacion=defaultAlign;
			    }
                            dataObject["tipo"] = linea[j].trim();
                            j++;
                            do
                            {
                            	if(linea[j].trim()==",")
                            	{
                            		contenido = contenido + ",";
                            		j++;
                            	}
                            	if(linea[j].trim().toLowerCase().substring(0,2)=="0x")
                                {
                                	if(linea[j].trim().substr(2,linea[j].trim().length-2).match(/^[0-9a-fA-F]+$/))
                                	{
                                		texto=parseInt(linea[j].trim()).toString();
                                	}else
                                	{
                                		//HEXADECIMAL INCORRECTO
						return assemblyError("Error in Hex format: ", linea, j);
                                	}
                                }else
                                {
                                	if(linea[j].trim().substring(0,1)=="0" && linea[j].trim().match(/^[0-9]+$/))
                                	{
                                		texto=parseInt(linea[j].trim(),8).toString();	/*octal*/
                                	}else
                                	{
                                		if(linea[j].trim().match(/^[0-9]+$/))
                                		{
                                			texto=parseInt(linea[j].trim(),10).toString();									/*DECIMAL*/
                                		}else
                                		{
							if(linea[j].trim().substring(0,1)=="'" && linea[j].trim().length>2)
							{
								if(linea[j].trim().substring(linea[j].trim().length-1,1)!="'")
								{
									var auxChar=linea[j];
									if(auxChar.length==3)
									{
                                						texto=auxChar[1].charCodeAt();   /*CARACTER*/
									}else
									{
										if(auxChar==4)
										{
											if(auxChar[2]=='t') /*CASO /t --> dec=9*/
											{
												texto=parseInt("9");   /*CARACTER*/
											}else
											{
												if(auxChar[2]=='n') /*CASO /n --> dec=10*/
												{
													texto=parseInt("10");   /*CARACTER*/
												}else
												{
													if(auxChar[2]=='0') /*EOF --> /0 --> dec=3*/
													{
														texto=parseInt("10");   /*CARACTER*/
													}else
													{
														return assemblyError("Error, char format incorrect: ",linea,j);
													}
												}
											}
										}
										else
										{
											return assemblyError("Error, char format incorrect: ",linea,j);
										}
									}	
								}else
								{	
											return assemblyError("Error, char format incorrect: ",linea,j);
								}
							}else
							{
								if(linea[j].trim()=="'" && linea[j+1].trim()=="'")
								{
									var auxChar=" ";
									texto=auxChar.charCodeAt();
									j++;
								}else
								{
									if(linea[j].trim()=="'#" && linea[j+1].trim()=="'")
									{
										var auxChar="#";
										texto=auxChar.charCodeAt();
										j++;
									}else
									{
										if((linea[j].trim()=="'" && linea[j+2].trim()=="'") &&
										(linea[j+1].trim()==":" || linea[j+1].trim()=="," || linea[j+1].trim()=="("
										 || linea[j+1].trim()==")"))
										{
											var auxChar=linea[j+1].trim();
											texto=auxChar.charCodeAt();
											j=j+2;
										}else
										{		
											return assemblyError("Error, numeric format incorrect: ", linea, j);
										}
									} 
								}
							}
                                		}
                                	}
                                }
                            	contenido = contenido + texto;
                                texto = parseInt(texto).toString(2);
                                if(texto.length>8)
                                {
                                	// console.log("En la linea i, el tipo byte sera truncado."); /*WARNING*/
                                }
                                var n2 = "00000000000000000000000000000000".substring(0, 32 - texto.length) + texto ;
                                texto=n2.substr(24,8);
                                traduction.push(texto);
                                longitud++;
                                j++;
                            }while(j<linea.length && linea[j].trim()==",");
                            dataObject["contenido"] = contenido;
                            dataObject["traduccion"] = traduction;
                            dataObject["longitud"] = longitud;
                            /*CALCULO DE POSICION*/
                            while (posicionEnMemoria % Math.pow(2, alineacion) != 0) {
                                //compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                            	compileSegmentDataByteLevel[byteCounter]="00000000";
                            	byteCounter++;
                            	posicionEnMemoria++;
                            }
                            for(z=0;z<traduction.length;z++)
                            {
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z];
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z];
                            	byteCounter++;
                            }
                            dataObject["posicion"] = "0x" + posicionEnMemoria.toString(16);
                            posicionEnMemoria = posicionEnMemoria + longitud;
                            byteCounter=posicionEnMemoria;
                            alineacion=0;
			    break;
                        case ".half":
                            // console.log("TIPO: " + linea[j]);
			    defaultAlign=1;
			    if(defaultAlign>alineacion) 
			    {
				alineacion=defaultAlign;
			    }
                            dataObject["tipo"] = linea[j].trim();
                            j++;
                            do
                            {
                            	if(linea[j].trim()==",")
                            	{
                            		contenido = contenido + ",";
                            		j++;
                            	}
                            	if(linea[j].trim().toLowerCase().substring(0,2)=="0x")
                                {
                                	if(linea[j].trim().substr(2,linea[j].trim().length-2).match(/^[0-9a-fA-F]+$/))
                                	{
                                		texto=parseInt(linea[j].trim()).toString();
                                	}else
                                	{
                                		//HEXADECIMAL INCORRECTO
						return assemblyError("Error in Hex format: ", linea, j);
                                	}
                                }else
                                {
                                	if(linea[j].trim().substring(0,1)=="0" && linea[j].trim().match(/^[0-9]+$/))
                                	{
                                		texto=parseInt(linea[j].trim(),8).toString();	/*octal*/
                                	}else
                                	{
                                		if(linea[j].trim().match(/^[0-9]+$/))
                                		{
                                			texto=parseInt(linea[j].trim(),10).toString();									/*DECIMAL*/
                                		}else
                                		{
							return assemblyError("Error, numeric format incorrect: ", linea, j);
                                		}
                                	}
                                }
                            	contenido = contenido + texto;
                                texto = parseInt(texto).toString(2);
                                if(texto.length>16)
                                {
                                	// console.log("En la linea i, el tipo half sera truncado.");  /*WARNING*/
                                }
                                var n2 = "00000000000000000000000000000000".substring(0, 32 - texto.length) + texto ;
                                texto=n2.substr(16,16);
                                traduction.push(texto);
                                longitud=longitud+2;
                                j++;
                            }while(j<linea.length && linea[j].trim()==",");
                            dataObject["contenido"] = contenido;
                            dataObject["traduccion"] = traduction;
                            dataObject["longitud"] = longitud;
                            /*CALCULO DE POSICION*/
                            while (posicionEnMemoria % Math.pow(2, alineacion) != 0) {
                                //compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                            	compileSegmentDataByteLevel[byteCounter]="00000000";
                                byteCounter++;
                            	posicionEnMemoria++;
                            }
                            for(z=0;z<traduction.length;z++)
                            {
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z].substr(8,8);
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z].substr(8,8);
                            	byteCounter++;
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z].substr(0,8);
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z].substr(0,8);
                            	byteCounter++;
                            }
                            dataObject["posicion"] = "0x" + posicionEnMemoria.toString(16);
                            posicionEnMemoria = posicionEnMemoria + longitud;
                            byteCounter=posicionEnMemoria;
                            alineacion=0;
			    break;
                        case ".word":
                            // console.log("TIPO: " + linea[j]);
			    defaultAlign=2;
			    if(defaultAlign>alineacion) 
			    {
				alineacion=defaultAlign;
			    }
                            dataObject["tipo"] = linea[j].trim();
                            j++;
                            do
                            {
                            	if(linea[j].trim()==",")
                            	{
                            		contenido = contenido + ",";
                            		j++;
                            	}
                            	if(linea[j].trim().toLowerCase().substring(0,2)=="0x")
                                {
                                	if(linea[j].trim().substr(2,linea[j].trim().length-2).match(/^[0-9a-fA-F]+$/))
                                	{
                                		texto=parseInt(linea[j].trim()).toString();
                                	}else
                                	{
                                		//HEXADECIMAL INCORRECTO
						return assemblyError("Error in Hex format: ", linea, j);
                                	}
                                }else
                                {
                                	if(linea[j].trim().substring(0,1)=="0" && linea[j].trim().match(/^[0-9]+$/))
                                	{
                                		texto=parseInt(linea[j].trim(),8).toString();	/*octal*/
                                	}else
                                	{
                                		if(linea[j].trim().match(/^[0-9]+$/))
                                		{
                                			texto=parseInt(linea[j].trim(),10).toString();									/*DECIMAL*/
                                		}else
                                		{
							return assemblyError("Error, numeric format incorrect: ", linea, j);
                                		}
                                	}
                                }
                            	contenido = contenido + texto;
                                texto = parseInt(texto).toString(2);
                                if(texto.length>32)
                                {
                                	// console.log("En la linea i, el tipo word sera truncado.");   /*WARNING*/
                                }
                                var n2 = "00000000000000000000000000000000".substring(0, 32 - texto.length) + texto ;
                                texto=n2;
                                traduction.push(texto);
                                longitud=longitud+4;
                                j++;
                            }while(j<linea.length && linea[j].trim()==",");
                            dataObject["contenido"] = contenido;
                            dataObject["traduccion"] = traduction;
                            dataObject["longitud"] = longitud;
                            /*CALCULO DE POSICION*/
                            while (posicionEnMemoria % Math.pow(2, alineacion) != 0) {
                                //compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                            	compileSegmentDataByteLevel[byteCounter]="00000000";
                                byteCounter++;
                            	posicionEnMemoria++;
                            }
                            for(z=0;z<traduction.length;z++)
                            {
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z].substr(24,8);
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z].substr(24,8);
                            	byteCounter++;
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z].substr(16,8);
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z].substr(16,8);
                            	byteCounter++;
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z].substr(8,8);
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z].substr(8,8);
                            	byteCounter++;
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z].substr(0,8);
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z].substr(0,8);
                            	byteCounter++;
                            }
                            dataObject["posicion"] = "0x" + posicionEnMemoria.toString(16);
                            posicionEnMemoria = posicionEnMemoria + longitud;
                            byteCounter=posicionEnMemoria;
		            alineacion=0;
                            break;
                        case ".space":
                            // console.log("TIPO: " + linea[j]);
			    defaultAlign=0;
			    if(defaultAlign>alineacion) 
			    {
				alineacion=defaultAlign;
			    }
                            dataObject["tipo"] = linea[j].trim();
                            /*ESPACIO DE N BYTES RESERVADOS EN MEMORIA*/
                            j++;
                            if(linea[j].trim().match(/^[0-9]+$/))
                    	    {
                    			tamVar=parseInt(linea[j].trim(),10);									/*DECIMAL*/
                    	    }else
                    	    {
					return assemblyError("Error, numeric format incorrect: ", linea, j);
                    			
                    	    }
                            dataObject["contenido"]="";
                            dataObject["longitud"]=tamVar;
                            /*CALCULO DE POSICION*/
                            while (posicionEnMemoria % Math.pow(2, alineacion) != 0) 
                            {
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                            	compileSegmentDataByteLevel[byteCounter]="00000000";
                                byteCounter++;
                            	posicionEnMemoria++;
                            }
                            for(z=0;z<tamVar;z++)
                            {
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                            	compileSegmentDataByteLevel[byteCounter]="00000000";
                            	byteCounter++;
                            }
                            dataObject["posicion"] = "0x" + posicionEnMemoria.toString(16);
                            posicionEnMemoria = posicionEnMemoria + tamVar;
                            byteCounter=posicionEnMemoria;
			    alineacion=0;
                            break;
			default:
			    return assemblyError("Error, type of variable incorrect: ", linea, j);
			    break;
                    }
                    // console.log(dataObject);
                    segmentData.push(dataObject);
                    // console.log(tokens[i]);
                }
            }  
        }
    }
    // console.log(segmentData);
    compileSegmentDataWordLevel["0x" + wordCounter.toString(16)]="";
    for(z=parseInt(dataSegment.begin);z<byteCounter;z++)
    {
    	if(z%4==0)
    	{
    		if(z!=parseInt(dataSegment.begin))
    		{
    			wordCounter=wordCounter+4;
    			word="";
    			compileSegmentDataWordLevel["0x" + wordCounter.toString(16)]="";
    		}
    		compileSegmentDataWordLevel["0x" + wordCounter.toString(16)]=compileSegmentDataByteLevel[z] + compileSegmentDataWordLevel["0x" + wordCounter.toString(16)];
    	}else
    	{
    		compileSegmentDataWordLevel["0x" + wordCounter.toString(16)]=compileSegmentDataByteLevel[z] + compileSegmentDataWordLevel["0x" + wordCounter.toString(16)];
    	}
    }
    while(compileSegmentDataWordLevel["0x" + wordCounter.toString(16)].length<32)
    {
    	compileSegmentDataWordLevel["0x" + wordCounter.toString(16)]="00000000" + compileSegmentDataWordLevel["0x" + wordCounter.toString(16)];
    }
    wordCounter=wordCounter+4;
    dataSegment.end=parseInt(wordCounter.toString(16),16);
    resultDataSegment.segmentData=segmentData;
    resultDataSegment.compileSegmentData=compileSegmentDataWordLevel;
    // console.log(compileSegmentDataWordLevel);
    return resultDataSegment;
}

function textSegment(tokens, datosCU, objText)
{
    var offset=parseInt(objText.begin);
    var instrucciones = new Array();
    var registers = new Array();
    var mp = new Array();
    var segments = new Object();
    var state = 0;
    var posInState = 0;
    var programa = new Object();
    /*aqui llega sin lineas vac�as, es decir, instruccion por linea*/
    //text = text.replace(/\n/g, ' ; ');
    var etiquetas = new Object;
    var lineasBorrar = new Array();
    var i = 0;
    var error = 0;
    var binaryCodeAssemblyTraduction=new Object();
    var selectionPseudoInstructions = new Array();
    //pasada 1 borrar lineas comentadas
    for (i = 0; i < tokens.length; i++) 
    {
    	  	tokens[i] = tokens[i].toLowerCase();
    		tokens[i] = tokens[i].replace(/:/g, " : ");
    		tokens[i] = tokens[i].replace(/,/g, " , ");
    		tokens[i] = tokens[i].replace(/\(/g, " ( ");
    		tokens[i] = tokens[i].replace(/\)/g, " )");
    		tokens[i] = tokens[i].replace(/\t/g, "");
    		tokens[i] = tokens[i].replace(/#/g, "# ");
    		tokens[i] = tokens[i].replace(/  /g, " ");
    		tokens[i] = tokens[i].replace(/\s{2,}/g, ' ');
		tokens[i] = tokens[i].trim();
    		var linea = tokens[i].toString().split(" ");
    		var j = 0;
    		if (linea[j] == "#") 
    		{
    			lineasBorrar.push(i);
    		}
    }
    j = lineasBorrar.length - 1;
    for (j = lineasBorrar.length - 1; j >= 0; j--) 
    {
        tokens.splice(parseInt(lineasBorrar[j]), 1);
    }
    //COMENTARIOS ELIMINADOS

    //COMENZAMOS EL REEMPLAZO DE ETIQUETAS
    //primera pasada
	/*REEMPLAZO DE PSEUDOINSTRUCCIONES*/
	var tokensAux=new Array();
	var tokensPrint1=new Array();
	var tokensPrint2=new Array();
	for(i = 0; i < tokens.length;i++)
	{
		j = 0;
		var labelPseudoExist=0;
		var linea2 = tokens[i].trim().toString().split(" ");
		var pseudoReplaced=0;
		if (linea2[1 + j] == ":") 
		{
		    	j += 2
			var labelPseudoAux="";
			labelPseudoAux=linea2[0] + " : ";
			labelPseudoExist=1;
		}
		var nameInstruction="";
		if (typeof linea2[j] == "undefined")
		    return assemblyError("Error in syntax of label, is have not instruction associated: ", linea2, j);
		nameInstruction = linea2[j].trim();
		j++;
		for(var z=0;z<datosCU.pseudoInstructions.length;z++)
		{
			if(datosCU.pseudoInstructions[z]["initial"].name==nameInstruction)
			{
				/*reemplazo*/
				var newLineCodeAux="";
				var newCode= new Array();
				newLineCodeAux=datosCU.pseudoInstructions[z]["finish"].signature;
				for(var k=0;k<datosCU.pseudoInstructions[z]["initial"].fields.length;k++)
				{
					var fieldAux="";
					fieldAux=datosCU.pseudoInstructions[z]["initial"].fields[k].name;
					var re = new RegExp(fieldAux,'g');
					newLineCodeAux=newLineCodeAux.replace(re,linea2[j]);
					j++;
				}
				pseudoReplaced=1;
				var newCode=newLineCodeAux.split('\n');
				break;
			}
		}

		if(pseudoReplaced==0)
		{
			tokensAux.push(tokens[i]);

                        tokensPrint1.push(tokens[i]); 
		        tokensPrint2.push(tokens[i]);

                        continue;
		}

		for(var k=0;k<newCode.length;k++)
		{
			var numAux;
			if(numAux=newCode[k].search("sel ")!=-1)
			{
				var fieldsInstruction=newCode[k].trim().split(" ");
				var lineAux="";
				var pseudoReplace=new Object();
				pseudoReplace.pos=tokensAux.length;
				pseudoReplace.label="";
				pseudoReplace.bi=0;
				pseudoReplace.bf=0;
				var l=0;
				while(fieldsInstruction[l]!="sel")
				{
					lineAux=lineAux + " " + fieldsInstruction[l];
					l++;
				}
				if(k==0 && labelPseudoExist==1)
				{
					pseudoReplace.fieldPos=l+2;
				}else
				{
					pseudoReplace.fieldPos=l;
				}
				lineAux=lineAux.trim();
				l=l+2;
				pseudoReplace.bi=fieldsInstruction[l];
				l=l+2;
				pseudoReplace.bf=fieldsInstruction[l];
				l=l+2;
				pseudoReplace.label=fieldsInstruction[l];
				lineAux=lineAux + " " + fieldsInstruction[l];
				selectionPseudoInstructions.push(pseudoReplace);

				if(k==0 && labelPseudoExist==1)
				{
					newCode[k]=labelPseudoAux + lineAux;
				}else
				{
					newCode[k]=lineAux;
				}
			}

			tokensAux.push(newCode[k]);

                        if (k == 0)
			     tokensPrint1.push(tokens[i]);
			else tokensPrint1.push("&nbsp;");
			tokensPrint2.push(newCode[k]);
		}

	}
	tokens=tokensAux;

	/*FIN REEMPLAZO DE PSEUDOINSTRUCCIONES*/
    for (i = 0; i < tokens.length; i++) 
    {
        var arrayLinea2 = new Array();
        j = 0;
        var linea2 = tokens[i].trim().toString().split(" ");
        var firmaAssembly2 = "";
	if(linea2.length>1)
	{
        	if (linea2[1 + j] == ":") 
        	{
            		etiquetas[linea2[j].trim()] = offset.toString(16);
            		j += 2
        	}
	}
        firmaAssembly2 += linea2[j].trim();
        j++;
        while (j < linea2.length) 
        {
            if (linea2[j].trim().substring(0, 1) == "$") 
            {
                //REGISTRO
                if (linea2[j - 1].trim() == "(") 
                {
                    firmaAssembly2 += "reg";
                } else 
                {
                    firmaAssembly2 += ",reg";
                }
                j++;
            } else
    	    {
		if(linea2[j].trim().substring(0,2) == "0x")
		{
				if(linea2[j].trim().substr(2,linea2[j].trim().length-2).match(/^[0-9a-fA-F]+$/))
				{
					firmaAssembly2 += ",num";
					j++;
				}else
				{
					return assemblyError("Error in Hex format: ", linea2, j);
				}
		}else
		{
			if(linea2[j].trim().substring(0,1)=="0" && linea2[j].trim().match(/^[0-9]+$/))
			{
				firmaAssembly2 += ",num";
				j++;
			}else
			{
				if((linea2[j].trim().substring(0,1)=="-" &&  linea2[j].trim().substr(1,linea2[j].trim().length-1).match(/^[0-9]+$/)) || (linea2[j].trim().match(/^[0-9]+$/)))
				{
					firmaAssembly2 += ",num";		
					j++;
				}else
				{
					if(linea2[j].trim()=="(")
					{
						firmaAssembly2 += "(";
						j++;
					}else
					{
						if(linea2[j].trim()== ")")
						{
							firmaAssembly2 += ")";
							j++;
						}else
						{
							if(linea2[j].trim()==",")
							{
								j++;
							}else
							{
								firmaAssembly2 += ",num";		
								j++;
							}
						}
					}
				}
			}
                  }        
            }
        }
	var signatureCorrect = 0;
        for (j = 1; j < datosCU.firmware.length; j++) 
        {
            if (datosCU.firmware[j].signatureGlobal == firmaAssembly2.trim()) 
            {
                offset = offset + 4 * parseInt(datosCU.firmware[j].nwords);
		signatureCorrect = 1;
                break;
            }
        }
	if(signatureCorrect == 0)
	{	
		return assemblyError("Signature not found, assembly instruction incorrect: ", linea2, 0);
	}
    }

    //SUSTITUCION DE VALOR DE ETIQUETA
    var x;
    for (x in etiquetas) 
    {
        for (i = 0; i < tokens.length; i++) 
        {
	   tokens[i]=tokens[i] + " ";
           tokens[i]=tokens[i].replace(" " + x + " ", " 0x" + etiquetas[x] + " ");
           tokens[i]=tokens[i].trim();
        }
    }
    //REEMPLAZO DE SEL EN PSEUDOINSTRUCCIONES
    for(i=0;i<selectionPseudoInstructions.length;i++)
    {
	var replacePos=selectionPseudoInstructions[i].pos;
	var replacePosLabel=selectionPseudoInstructions[i].fieldPos;
	var replaceLabel=selectionPseudoInstructions[i].label;
	var fieldAux=tokens[replacePos].split(" ");
	var labelAux=fieldAux[replacePosLabel].toString();
	fieldAux=parseInt(fieldAux[replacePosLabel]).toString(2);
	var n1="00000000000000000000000000000000";
	var n2=n1+fieldAux;
	n2=n2.substr(n2.length-32,32);
	n2=n2.substr(31-selectionPseudoInstructions[i].bi,(selectionPseudoInstructions[i].bi-selectionPseudoInstructions[i].bf)+1);
	tokens[replacePos]=tokens[replacePos].replace(labelAux,parseInt(n2,2).toString());
	tokensPrint2[replacePos]=tokens[replacePos];
    }

    //generamos binario
    offset = parseInt(objText.begin);
    var binaryCode = new Object();
    var error = 0;
    for (i = 0; i < tokens.length; i++) 
    {
        var arrayLinea = new Array();
        j = 0;
        var linea = tokens[i].trim().toString().split(" ");
        var firmaAssembly = "";
        if(linea.length>1)
	{
        	if (linea[1 + j].trim() == ":") 
        	{
            		j+=2
        	}
	}
        firmaAssembly += linea[j].trim();
        arrayLinea.push(linea[j].trim());
        j++;
        while (j < linea.length) 
        {
            	if (linea[j].trim().substring(0, 1) == "$") 
            	{
                	//REGISTRO
                	if (linea[j - 1].trim() == "(") 
                	{
                    		firmaAssembly += "reg";
                	} else 
                	{
                    		firmaAssembly += ",reg";
                	}
                	arrayLinea.push(linea[j].trim());
                	j++;
            	} else 
            	{	
			if(linea[j].trim().substring(0,2) == "0x")
			{
					if(linea[j].trim().substr(2,linea[j].trim().length-2).match(/^[0-9a-fA-F]+$/))
					{
						firmaAssembly += ",num";
						arrayLinea.push(linea[j].trim());
						j++;
					}else
					{
						// console.log("ERROR EN FORMATO HEXADECIMAL");
					}
			}else
			{
				if(linea[j].trim().substring(0,1)=="0" && linea[j].trim().match(/^[0-9]+$/))
				{
					firmaAssembly += ",num";
					arrayLinea.push(linea[j].trim());
					j++;
				}else
				{
					if((linea[j].trim().substring(0,1)=="-" &&  linea[j].trim().substr(1,linea[j].trim().length-1).match(/^[0-9]+$/)) || (linea[j].trim().match(/^[0-9]+$/)))
					{
						firmaAssembly += ",num";
						arrayLinea.push(linea[j].trim());		
						j++;
					}else
					{
						if(linea[j].trim()=="(")
						{
							firmaAssembly += "(";
							j++;
						}else
						{
							if(linea[j].trim()== ")")
							{
								firmaAssembly += ")";
								j++;
							}else
							{
								if(linea[j].trim()==",")
								{
									j++;
								}else
								{
									return assemblyError("Error, field not correct: ", linea, j);
								}
							}
						}
					}
				}
			  }       
                }
            }

            for (j = 1; j < datosCU.firmware.length; j++) 
            {
                var lineaAssembly = "";
                if (datosCU.firmware[j].signatureGlobal == firmaAssembly) 
                {
                    //REEMPLAZO DE INSTRUCCION !!!
                    var longitud = parseInt(datosCU.firmware[j].nwords);
                    lineaAssembly = "00000000000000000000000000000000";
                    for (z = 1; z < longitud; z++)
                    {
                        lineaAssembly = lineaAssembly + "00000000000000000000000000000000" ;
                    }

                    var camposInsertar = datosCU.firmware[j].co;
                    lineaAssembly = camposInsertar + lineaAssembly.substr(6, lineaAssembly.length - 6);
                    //instr.substr(0, start) + "replacement" + instr.substr(start + length);
                    //iteramos por los campos
                    for (z = 0; z < datosCU.firmware[j].fields.length; z++) 
                    {
                        switch (camposInsertar = datosCU.firmware[j].fields[z].type) 
                        {
                            case "reg":
                                /*SE HA DE VERIFICAR SI ES PSEUDONOMBRE --- CORREGIR*/
				//quitamos $ y sacamos el valor en binario
				var registerAux="";
				registerAux=arrayLinea[z+1].substr(1,arrayLinea[z+1].length -1);
				registerAux=parseInt(registerAux);
				if(registerAux>=0 && registerAux<=32)
				{
					camposInsertar = (parseInt(arrayLinea[z + 1].substr(1, arrayLinea[z + 1].length - 1))).toString(2);
				}else
				{
					var registerCorrect=0;
					for(var k in datosCU.registers)
					{
						if(datosCU.registers[k]==arrayLinea[z+1])
						{
							camposInsertar = parseInt(k).toString(2);
							registerCorrect=1;
						}
					}
					if(registerCorrect==0)
					{

						return assemblyError("Error, name of register incorrect: ", arrayLinea, z+1);
					}
				}
                                break;

                            case "address":
				if(arrayLinea[z+1].trim().substring(0,2) == "0x")
                        	{
                                        if(arrayLinea[z+1].trim().substr(2,arrayLinea[z+1].trim().length-2).match(/^[0-9a-fA-F]+$/))
                                        {
                                                camposInsertar = parseInt(arrayLinea[z + 1]).toString(2);
                                        }else
                                        {
						return assemblyError("Error in Hex format: ", arrayLinea, z+1);
                                        }
                        	}else
                        	{
                                	if(arrayLinea[z+1].trim().substring(0,1)=="0" && arrayLinea[z+1].trim().match(/^[0-9]+$/))
                                	{
                                        	camposInsertar = parseInt(arrayLinea[z + 1],8).toString(2);
                                	}else
                                	{
                                                if((arrayLinea[z+1].trim().substring(0,1)=="-" &&  arrayLinea[z+1].trim().substr(1,arrayLinea[z+1].trim().length).match(/^[0-9]+$/)) || 
						(arrayLinea[z+1].trim().match(/^[0-9]+$/)))
                                        	{
                                                	camposInsertar = parseInt(arrayLinea[z + 1] >>> 0).toString(2);
                                        	}else
                                        	{	
							return assemblyError("Error in numeric format: ", arrayLinea, z+1);
                                        	}
                                	}
                          	}
				if(datosCU.firmware[j].fields[z].address_type=="abs")
				{
					/*YA REALIZADO PREVIAMENTE EN EL REEMPLAZO DE ETIQUETA*/
				}else
				{
					if(datosCU.firmware[j].fields[z].address_type=="rel")
					{
						var rel = parseInt(camposInsertar,2);
						rel = rel - offset - 4;
						camposInsertar= (rel >>> 0).toString(2);
     					}else
					{
						// console.log("DIRECCIONAMIENTO NO ACEPTADO");
					}
				}
                                break;

                            case "inm":
                              	if(arrayLinea[z+1].trim().substring(0,2) == "0x")
                                {
                                        if(arrayLinea[z+1].trim().substr(2,arrayLinea[z+1].trim().length-2).match(/^[0-9a-fA-F]+$/))
                                        {
                                                camposInsertar = parseInt(arrayLinea[z + 1]).toString(2);
                                        }else
                                        {
						return assemblyError("Error in Hex format: ", arrayLinea, z+1);
                                        }
                                }else
                                {
                                        if(arrayLinea[z+1].trim().substring(0,1)=="0" && arrayLinea[z+1].trim().match(/^[0-9]+$/))
                                        {
                                                camposInsertar = parseInt(arrayLinea[z + 1],8).toString(2);
                                        }else
                                        {
                                                if((arrayLinea[z+1].trim().substring(0,1)=="-" &&  arrayLinea[z+1].trim().substr(1,arrayLinea[z+1].trim().length).match(/^[0-9]+$/)) || 
						(arrayLinea[z+1].trim().match(/^[0-9]+$/)))
                                                {
                                                        camposInsertar = parseInt(arrayLinea[z + 1] >>> 0).toString(2);
                                                }else
                                                {
							return assemblyError("Error in numeric format: ", arrayLinea, z+1);
                                                }
                                        }
                                }
				camposInsertar = parseInt(arrayLinea[z + 1] >>> 0).toString(2);
                                break;
                        }
                        //consultamos bi y bf, y procedemos a : outstr= instr.substr(0, start) + "replacement" + instr.substr(start + length, longitud- start+length);
                        //convertir bi
                        var bi = ((longitud*32) - 1) - parseInt(datosCU.firmware[j].fields[z].startbit);
                        var bf = ((longitud*32) - 1) - parseInt(datosCU.firmware[j].fields[z].stopbit);
                        var padding = "00000000000000000000000000000000";
/*
                        if(camposInsertar.length>32)
			{
				return assemblyError("Error, number out of range (>32 bits)", arrayLinea, z+1);
			}
			if(camposInsertar.length > (Math.abs(bf-bi)+1))
			{
				return assemblyError("Error, number out of range (>" + (Math.abs(bf-bi)+1)+ " bits)",arrayLinea, z+1);
			}
*/
			camposInsertar = padding + camposInsertar;
                        camposInsertar = camposInsertar.substr((camposInsertar.length - 1) - (bf - bi), (bf - bi) + 1);
                        //convertir bf
                        lineaAssembly = lineaAssembly.substr(0, bi) + camposInsertar + lineaAssembly.substr(bf + 1, parseInt(datosCU.firmware[j].fields[z].stopbit));
                    }

                    var initial_offset = "0x" + offset.toString(16) ;
                    for (var k = 0; k < longitud; k++) 
                    {
			    if ( (k==0) && (typeof datosCU.firmware[j].cop != "undefined") )
			    {
				var auxLineaAssemblyCop=lineaAssembly.substr(0,32-4);
				lineaAssembly=lineaAssembly.substr(31,lineaAssembly.length-32);
				auxLineaAssemblyCop=auxLineaAssemblyCop + datosCU.firmware[j].cop;
				lineaAssembly=auxLineaAssemblyCop + lineaAssembly;
			    }
		    	    //.toString(16)
		            binaryCode["0x" + offset.toString(16)] = lineaAssembly.substr(32 * k, 32);
		    	    offset = offset + 4;
                    }

		    var line = "";
		    for (var m=0; m<arrayLinea.length; m++) {
		         line = line + " " + arrayLinea[m];
		    }

		    var lineObj = new Object();
		//  lineObj.source          = line.trim();
		    lineObj.source_original = tokensPrint1[i] ;
		    lineObj.source          = tokensPrint2[i] ;
		    lineObj.breakpoint      = false;
		    lineObj.binary          = binaryCode[initial_offset];

		    binaryCodeAssemblyTraduction[initial_offset] = lineObj;
                    break;
                }
            }

            // console.log("Ensamblador");
            // console.log(arrayLinea);
            // console.log("Firma");
            // console.log(firmaAssembly);
            // console.log("Linea compilada");
            // console.log(lineaAssembly);
            //firma generada --> reemplazo
        }

        objText.end   = parseInt(offset.toString(16),16);
      //objText.begin = parseInt(objText.begin).toString(16);

	var finalTextSegmentCompilation	= new Object();
	finalTextSegmentCompilation.binaryCode		=	binaryCode;
	finalTextSegmentCompilation.assemblyCode	=	binaryCodeAssemblyTraduction;
	finalTextSegmentCompilation.etiquetas		= 	etiquetas;
        finalTextSegmentCompilation.error		= 	null;
	return finalTextSegmentCompilation;
}

function simlang_compile (text, datosCU)
{
	var memory=new Array();
	var tokens = text.split("\n");
	var textSegmentData=new Array();
	var textSegmentText=new Array();
    	var i = 0;
    	var j = 0;
    	var state=0; /*1==segment data --- 2==segment text*/
	var ret = new Object();
	ret.seg = {
                    "system": { "name":"system", "begin":0x0000, "end":0x0200, "color": "#A9D0F5" },
                    "data":   { "name":"data",   "begin":0x1000, "end":0xFFFF, "color": "#FACC2E" },
                    "code":   { "name":"code",   "begin":0x8000, "end":0xFFFF, "color": "#BEF781" },
                    "stack":  { "name":"stack",  "begin":0xFFFF, "end":0xFFFF, "color": "#F1F2A3" }
                  };

    for (i = 0; i < tokens.length; i++) 
    {
    	var lineaAux=tokens[i];
    	lineaAux= lineaAux.replace(/:/g, " : ");
    	lineaAux = lineaAux.replace(/,/g, " , ");
    	lineaAux = lineaAux.replace(/\(/g, " ( ");
    	lineaAux = lineaAux.replace(/\)/g, " )");
    	lineaAux = lineaAux.replace(/#/g, "# ");
    	lineaAux = lineaAux.replace(/\t/g, "");
    	lineaAux = lineaAux.replace(/  /g, " ");
    	lineaAux = lineaAux.replace(/\s{2,}/g, ' ');
        lineaAux = lineaAux.trim();
        var linea = lineaAux.split(" ");
        if(linea[0].trim() == ".data")
        {
        	state=1;
        }
        if(linea[0].trim() == ".text")
        {
        	state=2;
        }
        switch(state)
        {
        	case 1:
        		if(linea[0].length>0)
			{
				if(linea[0][0].trim () =="#" || linea[0].trim() == ".data")
               	 		{
                			//LINEA COMENTADA;
	                	}else
         	        	{
                			textSegmentData.push(tokens[i].trim());	
                		}
			}
        		break;
        	case 2:
        		if(linea[0].length>0)
			{
				if(linea[0][0].trim() == "#" || linea[0].trim() == ".text" || (linea[0].trim() == ".globl"))
                		{
                			//LINEA COMENTADA;
	                	}else
        	        	{
                			textSegmentText.push(tokens[i].trim());	
                		}
			}
        		break;
        	default:
        		break;
        }
    }

	if(state==1)
	{
		ret.mp		=	null;
		ret.labels2	=	null;
		ret.error	=	"Error, '.text' not defined.";
		return ret;
	}
    	var resultSegmentData=dataSegment(textSegmentData,ret.seg["data"]);
    	if(resultSegmentData.error!=null)
    	{
		ret.mp		=	null;
		ret.labels2	=	null;
		ret.error	=	resultSegmentData.error;
		return ret;
    	}
	var dataSegmentData=resultSegmentData.segmentData;
	var binarySegmentData=resultSegmentData.compileSegmentData;
	// console.log(dataSegmentData);
	/*generamos array de etiquetas*/
	var etiquetas = new Object;
	for(i=0;i<dataSegmentData.length;i++)
	{
		etiquetas[dataSegmentData[i].name]=dataSegmentData[i].posicion;	
	}
	var x;
	for (x in etiquetas) 
	{
		for (i = 0; i < textSegmentText.length; i++) 
		{
 			textSegmentText[i]=textSegmentText[i] + " ";
 			textSegmentText[i]=textSegmentText[i].replace(" "+ x + " ", " " + etiquetas[x].toString(16) + " ");
			textSegmentText[i]=textSegmentText[i].trim();
		}
	}
	var compilationSegmentText=textSegment(textSegmentText, datosCU, ret.seg["code"]);
	if(compilationSegmentText.error!=null)   
	{
		ret.mp		=	null;
		ret.labels2	=	null;
		ret.error	=	compilationSegmentText.error;
		return ret;
	}
	var dataSegmentText=compilationSegmentText.binaryCode;
	// console.log(dataSegmentData);
	// console.log(dataSegmentText);
	for(x in compilationSegmentText.etiquetas)
	{
		etiquetas[x]="0x" + compilationSegmentText.etiquetas[x];
	}    
	var finalMp = {};
	for (var attrname in dataSegmentText)   { finalMp[attrname] = dataSegmentText[attrname]; }
	for (var attrname in binarySegmentData) { finalMp[attrname] = binarySegmentData[attrname]; }
	// packing everything
	ret.mp      	= finalMp;
	ret.labels2 	= etiquetas;
	ret.error   	= null;
	ret.assembly	= compilationSegmentText.assemblyCode;
	return ret ;
}


function assemblyError (msgError, tokens, index)
{
	var ret = new Object();
	ret.binaryCode	= null;
	ret.etiquetas	= null;	
	ret.error	= null;
	ret.error = msgError + ":\n";
	for (var i=index-8; i<(index+8); i++)
	{
		if (typeof tokens[i] != "undefined")
			ret.error = ret.error + " " + tokens[i];
	}
	ret.error = "..." + ret.error + "...";

	return ret;
}

function dataError (msgError, tokens, index)
{
	var ret = new Object();
	ret.binaryCode		= null;
	ret.etiquetas		= null;	
	ret.error		= null;
	ret.assemblyCode 	= null;
	ret.error = msgError + ":\n";
	for (var i=index-8; i<(index+8); i++)
	{
		if (typeof tokens[i] != "undefined")
			ret.error = ret.error + " " + tokens[i];
	}
	ret.error = "..." + ret.error + "...";

	return ret;
}

