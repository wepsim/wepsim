
# WepSIM: Web Elemental Processor Simulator

![Build Status](https://github.com/acaldero/wepsim/actions/workflows/node.js.yml/badge.svg)
[![Maintainability](https://qlty.sh/gh/acaldero/projects/wepsim/maintainability.svg)](https://qlty.sh/gh/acaldero/projects/wepsim)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/579e744cedde4dc78f8084d9db7abd32)](https://app.codacy.com/gh/acaldero/wepsim/dashboard)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
[![Release](https://img.shields.io/badge/Stable-2.3.9-green.svg)](https://github.com/wepsim/wepsim/releases/tag/v2.3.9)

<html>
	<ul>
	<table>
		<tr align="left">  
		      <td> 📖 &nbsp; <a href="https://wepsim.github.io/">The WepSIM website</a> </td> 
		      <td> 📖 &nbsp; <a href="https://wepsim.github.io/info/">WepSIM documentation</a> </td> 
		      <td> 🧰 &nbsp; <a href="https://wepsim.github.io/wepsim/">The WepSIM simulator</a> </td> 
		</tr>
		<tr align="left">  
			  <td> 🔁 &nbsp; <a href="https://github.com/wepsim/tester#readme">Command-line Tester</a> </td>  
		      <td> ⏳ &nbsp; <a href="https://wepsim.github.io/evolution/">WepSIM history</a> </td>
		      <td> 📈 &nbsp; <a href="https://lookerstudio.google.com/reporting/6c7aafbd-2c6b-4a86-91a2-3db55b03225a">Usage Statistics</a> </td> 
		</tr>
	</table>
	</ul>
</html>

## Introduction

* WepSIM can be used from the web at https://wepsim.github.io/wepsim and from command-line:
  ```bash
  sudo apt-get install nodejs npm bash -y
  wget https://github.com/wepsim/wepsim/releases/download/v2.3.8/wepsim-2.3.8.zip
  unzip wepsim-2.3.8.zip ; cd wepsim-2.3.8
  npm install terser jq jshint yargs clear inquirer@8.2.6 fuzzy inquirer-command-prompt inquirer-autocomplete-prompt@1
  ./wepsim.sh -h
  ``` 

* WepSIM helps to gain an integrated view of how hardware and software interact through microprogramming and assembly programming.
<a href="https://wepsim.github.io/wepsim/ws_dist/wepsim-classic.html?mode=ep&examples_set=Default-MIPS&example=8&simulator=assembly:screen">Interrupts</a>,
<a href="https://wepsim.github.io/wepsim/ws_dist/wepsim-classic.html?mode=ep&examples_set=Default-MIPS&example=10&simulator=assembly:screen">exceptions</a>,
<a href="https://wepsim.github.io/wepsim/ws_dist/wepsim-classic.html?mode=ep&examples_set=Default-MIPS&example=9&simulator=assembly:register_file">system calls</a>,
<a href="https://wepsim.github.io/wepsim/ws_dist/wepsim-classic.html?mode=ep&examples_set=Default-MIPS&example=19&simulator=assembly:screen">threads</a>,
etc., are included in the initial Examples.
  <html>
  <img class="img-responsive mb-5 px-3"
       src="https://raw.githubusercontent.com/wepsim/wepsim/master/images/welcome/simulation_xinstruction.gif"
       style="max-height:55vh !important; max-width:90vw !important;"
       alt="wepsim screenshot 2">
  </html>


## More information

<html>
	<center>
	<table width="100%">
		<tr>
			<td>
				Developers
			</td>
			<td>
				Teaching with WepSIM
			</td>
			<td>
				Getting Started 
			</td>
		</tr>
		<tr>
			<td>
				<li><a href="https://wepsim.github.io/info/developer/source_code.html">WepSIM Source Code</a></li>
				<li><a href="https://wepsim.github.io/info/developer/api_js.html">WepSIM engine API</a></li>
				<li><a href="https://wepsim.github.io/info/developer/mobile.html">WepSIM for Apache Cordova</a></li>
			</td>
			<td>
				<li><a href="https://wepsim.github.io/info/integration/links.html">WepSIM Links in documents</a></li>
				<li><a href="https://wepsim.github.io/info/integration/gcolab.html">WepSIM on Google Colab</a></li>
			</td>
			<td>
                <li> Getting WepSIM
				<ul>
				<li><a href="https://wepsim.github.io/info/web/getting-wepsim.html">Run WepSIM</a></li>
				<li><a href="https://wepsim.github.io/info/web/getting-wepsim.html#2-install-wepsim-as-progressive-web-application-pwa">Install WepSIM as PWA</a></li>
				</ul>
                <li> Using WepSIM
				<ul>			
				<li><a href="https://wepsim.github.io/info/web/using-wepsim.html">Visual UI</a></li>
				<li><a href="https://wepsim.github.io/info/command-line/using-wepsim-cl.html">Command Line</a></li>
				</ul>
			</td>
		</tr>
	</table>
	</center>
</html>


