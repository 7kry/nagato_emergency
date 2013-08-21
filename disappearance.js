function dspr_terminal(id, duration, ok, cancel, message){
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
