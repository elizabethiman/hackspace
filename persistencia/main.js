var config = {
    apiKey: "AIzaSyBCY35YbSVN4y4Eb_WJ6FSIL1c0sbpJPaE",
    authDomain: "proyecto-demo-cc493.firebaseapp.com",
    databaseURL: "https://proyecto-demo-cc493.firebaseio.com",
    storageBucket: "proyecto-demo-cc493.appspot.com",
  };
  firebase.initializeApp(config);

  var storage = firebase.storage();
  var database= firebase.database();

  $(document).ready(
  function(){
  	console.log("El formulario cargo");
  	definirWorkerId();
  	  }
  	  );

  function definirWorkerId(){
  	$('#workerId').val(parseInt(Math.random()*10000000));
  }

  $('#image').on('change',
function(evt){
	var file = evt.target.files[0];
	var metadata = {
		'contentType' : file.type
	}
	var uploadTask = storage.ref().child(obtenerWorkerId()+'/'+file.name).put(file,metadata);
	uploadTask.on('state_changed',null,
		function(error){
			console.log(error);
		},
		function(){
			url.push(uploadTask.snapshot.metadata.downloadURLs[0])
		});
	}
  	);

$('#worker').submit(
	function(evt){
		worker= new Object();
		$('form').serializeArray().forEach(
			function(currentValue,index){
				worker[currentValue.name]=currentValue.value;
			}
			);
		worker['url']=url;
		console.log(worker);
		evt.preventDefault();
	}
	);

function storeWorker(worker){
	database.ref(worker.workerId+'/').set(worker);
}