function deleteItem(id){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var response = xhttp.responseText;
			if(response != "success") console.log(response);
			loadItems();
		}
	};
	xhttp.open("POST", "db.php");
	var param = "delID=" + id;
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(param);
}

function editItem(id){
	var textbox = document.getElementById('textbox');
	var submit = document.getElementById('submit');
	var placeholder = document.getElementById(id).innerHTML;

	textbox.value = placeholder;
	textbox.setAttribute("placeholder", placeholder);
	textbox.focus();
	submit.value="Change";
	submit.setAttribute("onclick", "sendChangedItem("+id+")");
}

function showItem(item){
	var list = document.getElementById('list');
	list.innerHTML += "<tr><td id="+item.id+">"+ item.omschrijving + 
	"</td><td><input type='button' onclick='editItem("+item.id+")' value='Edit'></td><td><input type='button' onclick='deleteItem("+item.id+")' value='Delete'></td></tr>";
}

function sendChangedItem(id){
	var textbox = document.getElementById('textbox');
	var submit = document.getElementById('submit');
	if(textbox.value != ""){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(xhttp.readyState == 4 && xhttp.status == 200){
				var response = xhttp.responseText;
				if(response != "success") console.log(response);
				textbox.value = "";
				textbox.setAttribute("placeholder","Add an item...");
				submit.value = "Submit";
				submit.setAttribute("onclick","sendItem()");
				loadItems();
			}
		};
		xhttp.open("POST", "db.php");
		var params = "edit="+textbox.value+"&id="+id;
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(params);
	}else{
		textbox.value = "";
		textbox.setAttribute("placeholder","Add an item...");
		submit.value = "Submit";
		submit.setAttribute("onclick","sendItem()");
		loadItems();
	}
}

function sendItem(){
	var item = document.getElementById('textbox').value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var response = xhttp.responseText;
			if(response != "success") console.log(response);
			document.getElementById('textbox').value = "";
			loadItems();
		}
	};
	xhttp.open("POST", "db.php");
	var param = "item=" + item;
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(param);
}

function loadItems(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			document.getElementById('list').innerHTML = "";
			var items = JSON.parse(xhttp.responseText);
			for(var i=0; i < items.length; i++){
				showItem(items[i]);
			}
		}
	};
	xhttp.open("GET", "db.php");
	xhttp.send();
}

loadItems();