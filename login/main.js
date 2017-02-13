
$('.forgot a').on('click'
    ,function(evt){
        target=$(this).attr('href');
        $('ul>li').removeClass('active');

        $('.tab-content > div').not(target).hide();
        $(target).fadeIn(600);
    }
);
$('.tab a').on('click', function (e) {

  e.preventDefault();

  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();

  $(target).fadeIn(600);
});
$('.form').find('input, textarea').on('keyup blur focus', function (e) {

  var $this = $(this),
      label = $this.prev('label');

      if (e.type === 'keyup') {
            if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
            label.removeClass('active highlight');
            } else {
            label.removeClass('highlight');
            }
    } else if (e.type === 'focus') {

      if( $this.val() === '' ) {
            label.removeClass('highlight');
            }
      else if( $this.val() !== '' ) {
            label.addClass('highlight');
            }
    }

});
var config = {
    apiKey: "AIzaSyBCY35YbSVN4y4Eb_WJ6FSIL1c0sbpJPaE",
    authDomain: "proyecto-demo-cc493.firebaseapp.com",
    databaseURL: "https://proyecto-demo-cc493.firebaseio.com",
    storageBucket: "proyecto-demo-cc493.appspot.com",
  };
  firebase.initializeApp(config);

  var database=firebase.database();

  $(window).ready(
  function(evt){
    console.log("Cargo la pagina")
  }
);
  $('#sign').submit(
    function(evt){
      evt.preventDefault();
     worker=new Object();
     $('#sign').serializeArray().forEach(
      function(currentValue,index){
        worker[currentValue.name]=currentValue.value
      }
      );
console.log(worker);
     existsEmail(worker)     
   
          }
          );


function existsEmail(worker){
  var worker=worker;
  var emailArray= new Array();
  database.ref('/').once('value',
    function(snapshot){
      snapshot.forEach(
        function(currentValue){
          emailArray.push(currentValue.val().email)
        }
        );
        if (emailArray.indexOf(worker.email)>-1){
          console.log("Email repetido");
      }
      else{
        registerWorker(worker);
        console.log("Registrado");
      }
    }
  );
}

  //  
  //if(true){
   // message= "El correo ya esta registrado";
  //}
  //else{
  //  registeredWorker(worker);
  //  message= "Usuario registrado";
  //}
 // alert(message);
//
function registerWorker(worker){
  database.ref(worker.workerId+'/').set(worker);

 // console.log(worker);

}



$('#log').submit(
    function(evt){
      worker=new Object();
      $('#log').serializeArray().forEach(
        function(currentValue,index){
          worker[currentValue.name]=currentValue.value;
        }
        );
      //console.log(worker);
      existsLogin(worker);
      evt.preventDefault();
          }
          );

function existsLogin(worker){
  var worker=worker;
  var emailArray= new Array();
  var passwordArray= new Array();
  database.ref('/').once('value',
    function(snapshot){
      snapshot.forEach(
      function(currentValue){
        emailArray.push(currentValue.val().email);
        passwordArray.push(currentValue.val().password);

        //console.log(currentValue.val().email);
        //console.log(currentValue.val().password);
        //console.log(worker);
      }
      );
      index=emailArray.indexOf(worker.email);
console.log(index)

      if(index>-1){
        if(passwordArray[index]==worker.password){
          console.log("te has logueado con exito");
        }   
        else{
          console.log("contraseña incorrecta");
        }      
        }
        else{
          console.log("correo inexistente");
        }
      }
    
    );
}


$("#forgotten>div>[name='email'").on('keypress',
  function(evt){
    if(evt.which==13){
      loadQuestion($(this).val())
    }
  }
  );

function loadQuestion(valor){
  var valor=valor;
  var emailArray=new Array();
  var questionArray=new Array();
  database.ref('/').once('value',
    function(snapshot){
      snapshot.forEach(
        function(currentValue){
          emailArray.push(currentValue.val().email);
          questionArray.push(currentValue.val().pregunta);
        }
        );
      index=emailArray.indexOf(valor);
      if(index>-1){
        alert(questionArray[index]);
      }
    }
    );
}

$('#forgotten').submit(
    function(evt){
      worker=new Object();
      $('#forgotten').serializeArray().forEach(
        function(currentValue,index){
          worker[currentValue.name]=currentValue.value;
        }
        );
      showsPassword(worker);
      evt.preventDefault();
          }
          );

function showsPassword(worker){
  var worker=worker;
  var emailArray=new Array();
  var answerArray= new Array();
  var passwordArray = new Array();
  database.ref('/').once('value',
    function(snapshot){
      snapshot.forEach(
        function(currentValue){
          emailArray.push(currentValue.val().email);
          answerArray.push(currentValue.val().respuesta);
          passwordArray.push(currentValue.val().password);
        }
        );
      index=emailArray.indexOf(worker.email);
      if(index>-1){
        if(answerArray[index]===worker.answer){
          alert(passwordArray[index]);
        }
        else{
          console.log("respuesta incorrecta");
        }
      }
      else{
        console.log("correo inexistente");
      }
    }
    );
}