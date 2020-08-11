
var iUser = null;

function enter(){
	iUser = document.getElementById("usrtx").value;
	document.getElementById("userDiv").style.display = "none";
	document.getElementById("chatDiv").style.display = "block";
	socket.emit('new', iUser);
}


var socket = io();
socket.on('message', function(data) {
 // console.log(data+"\n");
//document.getElementById("txtlog").innerHTML += data+"<br>";
//var dt = new Date().toLocaleString();
mkMsg(data.text,data.user,data.dt);
});
socket.on('info', function(data) {
 // console.log(data+"\n");
//document.getElementById("txtlog").innerHTML += data+"<br>";
var dt = new Date().toLocaleString();
mkInfo(data,dt);
});

function mkInfo(inf, tm) {
    var para = document.createElement("DIV");
    para.style.textAlign ="center";
    para.style.color="red";
    para.style.marginBottom = "10px";
	
	var ifo = document.createElement("SPAM");
    ifo.innerHTML = inf;
    ifo.style.fontSize = "12px";
    ifo.style.align = "center";
	
	var tmp = document.createElement("SPAM");
    tmp.innerHTML = "<br>" + tm;
    tmp.style.fontSize = "10px";
    tmp.style.align = "center";
	
    para.appendChild(ifo);
	para.appendChild(tmp);
    document.getElementById("myDIV").appendChild(para);
}

/*
<div id="myDIV">
<div style="font-size: 14px;margin: 0px 4px 2px 5px;padding-left: 10px;border:1px solid grey;">user</div>
//<div style="padding: 8px 10px 24px 10px;background: rgba(170, 221, 221, 0.44);text-align: left;border: 1px solid rgb(117, 117, 117);box-shadow: grey 0px 2px 9px;border-radius: 7px;margin-bottom: 10px;"><spam style="display: block; overflow-wrap: break-word; font-size: 16px;"></spam><spam style="font-size: 10px; margin: 8px 4px 5px 0px; float: right;">32</spam></div></div>
*/
function mkMsg(tx,us,tm) {
    var msgdv = document.createElement("DIV");
    var para = document.createElement("DIV");
    para.style.padding = "5px 5px 20px 0";
	if(us == iUser){
    para.style.background="#cfc";
    msgdv.style.textAlign ="-webkit-right";
	us = "Você";
    }else{
	para.style.background="#add";
    msgdv.style.textAlign ="-webkit-left";
	if (navigator.vibrate) {
	// vibrate for one second
	navigator.vibrate(500);
	}
	var snd1 = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
	snd1.play();
	}

    var msg = document.createElement("SPAM");
    msg.innerHTML = tx;
    msg.style.display="block";
    msg.style.wordWrap="break-word";
    msg.style.fontSize = "16px";
    msg.style.fontFamily= "Verdana";
    msg.style.fontWeight= "500";
    //msg.style.align = "right";
    //msg.style.float = "right";
    
    var usr = document.createElement("DIV");
    usr.innerHTML = us;
    usr.style.fontSize = "12px";
    msg.style.fontWeight = "200";
    msg.style.fontFamily= "Verdana";
    usr.style.margin = "0px 4px 2px 5px";
    usr.style.paddingLeft = "10px";
    usr.style.align = "left";
    usr.style.color = "grey";
    
    var tmp = document.createElement("SPAM");
    tmp.innerHTML = tm;
    tmp.style.fontSize = "10px";
    tmp.style.margin = "8px 4px 5px 0";
    tmp.style.align = "right";
    tmp.style.color = "grey";
    tmp.style.float = "right";
	
    para.style.border="1px solid rgb(117, 117, 117)";
    para.style.padding="8px 10px 24px 10px";
    para.style.boxShadow="grey 0px 2px 9px";
    para.style.borderRadius="7px";
    para.style.marginBottom = "10px";
    para.style.maxWidth = "80%";
    para.style.width = "fit-content";
    msgdv.appendChild(usr);
    para.appendChild(msg);
    para.appendChild(tmp);
    msgdv.appendChild(para);
	
    document.getElementById("myDIV").appendChild(msgdv);
}



function sendMsg() {
var datas = {text: "", user: null, dt: null}
var txo = document.getElementById("msgtx");
datas.text = txo.value;
datas.user = iUser;
datas.dt = new Date().toLocaleString();
//console.log("bt pressed\ntxt: " + txt +"\nsocket: " +socket);
socket.emit('send', datas);
txo.value = "";
}

//asteroids@example.com