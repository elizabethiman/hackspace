var config = {
    apiKey: "AIzaSyBCY35YbSVN4y4Eb_WJ6FSIL1c0sbpJPaE",
    authDomain: "proyecto-demo-cc493.firebaseapp.com",
    databaseURL: "https://proyecto-demo-cc493.firebaseio.com",
    storageBucket: "proyecto-demo-cc493.appspot.com",
  };
  firebase.initializeApp(config);

$(document).ready(function(){
$('#tags').on('keypress',function(e){
	console.log(e.which+"-"+e.key);
});
  });

function getAutoCompleteElements(substring){
	console.log(substring);
}
function loadForm(data){
	console.log(data);
}
$(document).ready(function(){
	$('#tags').on('keyup',function(e){
		if(e.which==13){
			loadForm($(this).val());
		}else{
			getAutoCompleteElements($(this).val());
		}
	});
});

function.loadAutoComplete(data){
	console.log(data);
}
function getAutoCompleteElements(substring){
	var val=substring;
	var i=0;
	var names = [];
	firebase.database().ref('usuario/').on('value',function(snapshot){
		for(key in snapshot.val()){
			if(key.indexOf(val)>-1){
				if(i<5){
					names.push(key);
					i++;
				}
			}
		}
		loadAutoComplete(names);
	})
}

function loadAutoComplete(data){
	$("#tags").autocomplete(
	{
		source : data,
	});
}

function setDataIntoHTML(data){
	console.log(data);
}

function loadForm(data){
	firebase.database().ref('usuario/'+data).on('value',function(snapshot){
		var data=snapshot.val();
		setDataIntoHTML(data);
	});
}

funtion setDataIntoHTML(data){
	$("#email").val(data.email);
	$("#last").val(data.apellido);
	$("#dni").val(data.dni);
	$("#age").val(data.edad);
	$("#name").val(data.nombre);
	$("#sex").val(data.sexo);
	$("#telephone").val(data.telefono);
}

//changes222