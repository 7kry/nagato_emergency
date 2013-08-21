// (C) 2013 7kry (Katsunori SUZUI) <http://7kry.net>
//
// GitHub repository: https://github.com/7kry/nagato_emergency
//
//                              -*- LICENSE -*-
//
//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.
//
//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.
//
//     The complete text of the GNU General Public License version 3
//     can be found in http://www.gnu.org/licenses/gpl-3.0.en.html

function nagato_emergency(id, duration, ok, cancel, message){
	var htmlesc = function(c){
		switch(c){
		case "&":
			return "&amp;";
		case "\"":
			return "&quot;";
		case "'":
			return "&#39;";
		case "<":
			return "<";
		case ">":
			return ">";
		case "\n":
			return "<br />";
		case " ":
			return "&nbsp;";
		default:
			return c;
		}
	};
	document.getElementById(id).innerHTML = "_";
	(function append(idx){
		document.getElementById(id).innerHTML = document.getElementById(id).innerHTML.substring(0, document.getElementById(id).innerHTML.length - 1);
		if(message[idx] == "\1"){
			while(message[++idx] != "\1"){
				document.getElementById(id).innerHTML += htmlesc(message[idx]);
			}
			++idx;
		}
		if(idx < message.length && message[idx] != "\0"){
			document.getElementById(id).innerHTML += htmlesc(message[idx]);
		}
		document.getElementById(id).innerHTML += "_";
		if(idx + 1 < message.length)
			setTimeout(function(){ append(idx + 1); }, duration);
		else
			document.onkeydown = function(evt){
				var e = (evt.which > 0 ? evt.which : event.keyCode);
				if(e == 13)
					document.location = ok;
				else
					document.location = cancel;
			};
	})(0);
}
