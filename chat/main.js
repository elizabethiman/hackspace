var config = {
    apiKey: "AIzaSyBCY35YbSVN4y4Eb_WJ6FSIL1c0sbpJPaE",
    authDomain: "proyecto-demo-cc493.firebaseapp.com",
    databaseURL: "https://proyecto-demo-cc493.firebaseio.com",
    storageBucket: "proyecto-demo-cc493.appspot.com",
  };
  firebase.initializeApp(config);


var storage = firebase.storage();
var database = firebase.database();

$(window).ready(
    function(){
        defineUserId();
        database.ref('mensajes/').on('child_added', function(childSnapshot) {
            pintarMensajesExternos(childSnapshot.val());
        });
    }
);


var user = new Object();
$('.btn-primary').on('click',
    function(evt){
        user['id']=obtenerUserId();
        user['name']=$('#userName').val();
        salvarUsuario(user);
        $('#myModal').modal('hide')
    }
);
function salvarUsuario(user){
    console.log("Su usuario ya se almaceno, puede chatear");
    defineMensajeId();
    database.ref('chat/'+user.id+'/').set(user);
}
function defineMensajeId(){
    $('#messageId').val(parseInt(Math.random()*10000000));
}
function obtenerMensajeId(){
    return $('#messageId').val();
}
$('#upload').on('change',
    function(evt){
        var file = evt.target.files[0];
        var metadata = {
            'contentType' : file.type
        }
        var uploadTask = storage.ref().child(obtenerUserId()+'/'+file.name).put(file,metadata);
        uploadTask.on('state_changed',null,
            function(error){
                console.log(error);
            },
            function(){
                console.log("La imagen se subio");
                user['image']=uploadTask.snapshot.metadata.downloadURLs[0];
            });
    }
);

function defineUserId(){
    $('#chatId').val(parseInt(Math.random()*10000000));
}
function obtenerUserId(){
    return $('#chatId').val();
}
var mensaje = new Object();
$('#message').on('keypress',
    function(evt){
        if(evt.which==13){

            evt.preventDefault();
            mensaje['id'] = obtenerMensajeId();
            mensaje['idEnviador'] = user.id;
            mensaje['enviador'] = user.name;
            mensaje['imagen'] = user.image;
            mensaje['texto'] = $(this).val();
            actualizarSuChat();
            enviarATodos();
        }
    }
);
function actualizarSuChat(){
    addMineText(mensaje.enviador,mensaje.texto,mensaje.imagen);
    defineMensajeId();
}
function enviarATodos(){
    database.ref('mensajes/'+mensaje.id).set(mensaje);
    mensaje= new Object();
    console.log("Tu mensaje fue enviado a todos los que estan conectados");
}

function addMineText(name,text,imageSource){
    var $template=$('.template').clone();
    $template.children('div')
                .children('img')
                    .attr('src',imageSource);
    $template.children('div')
                .children('div').children('.chat-message-content').append('<p>'+text+'</p');
    $template.children('div')
                .children('div').children('.chat-details').append(name);
    $template.children('div').addClass('chat-message-sender');
    $('.chat-wrapper>.chat-message').append($template.html());
}

function pintarMensajesExternos(datos){
    if(datos.idEnviador!=obtenerUserId()){
        console.log("Se pinto un mensaje");
        addForeignText(datos.enviador,datos.texto,datos.imagen);
    }
}

function addForeignText(name,text,imageSource){
    var $template=$('.template').clone();
    $template.children('div')
                .children('img')
                    .attr('src',imageSource);
    $template.children('div')
                .children('div').children('.chat-message-content').append('<p>'+text+'</p');
    $template.children('div')
                .children('div').children('.chat-details').append(name);
    $template.children('div').addClass('chat-message-recipient');
    $('.chat-wrapper>.chat-message').append($template.html());
}
