/*Documentação http://docs.phonegap.com/en/3.2.0/index.html*/
/*Inicializar Variables*/
var pictureSource;   
var destinationType;
var AppVersion = "1.0.0";
var pushNotification;
var RegId;
/*--------------------*/
/*Aguardar Carga*/
document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
	try{
		// new FastClick(document.body);//FastClick
		pictureSource=navigator.camera.PictureSourceType;//Foto
		destinationType=navigator.camera.DestinationType;//Foto	
		document.addEventListener("menubutton", menuKeyDown, true);//Menu Button
		CheckUpdate(AppVersion);//Update
		/*PUSH PLUGIN*/
		pushNotification = window.plugins.pushNotification;
		pushNotification.register(successHandler, errorHandler,{"senderID":"108385737412","ecb":"app.onNotificationGCM"});	
		/*END PUSH*/
	}
	catch(e){}
}
/*-------------*/
/*----------------------------------BOTON-MENU----------------------------------------*/
function menuKeyDown() {
	alert('Menu button pressed.');
}
/*------------------------------END-BOTON-MENU----------------------------------------*/
/*----------------------------------------FOTO----------------------------------------*/
function onPhotoDataSuccess(imageData) {	
	// console.log(imageData);	
	var smallImage = document.getElementById('smallImage');
	smallImage.style.display = 'block';	
	smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onPhotoURISuccess(imageURI) {
	var options = new FileUploadOptions();
	options.fileKey="file";
	options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	options.mimeType="image/jpeg";
	options.headers = {
        Connection: "close"
    }
    options.chunkedMode = false;

	var params = {};
	params.value1 = "test";
	params.value2 = "param";

	options.params = params;

	var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://projeto01.backsite.com.br/dispositivo/mobile/publico/android/android.php"), win, fail, options);
}
function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
	alert("Code = " + r.responseCode);
	alert("Response = " + r.response);
	alert("Sent = " + r.bytesSent);
}

function fail(error) {
	alert("An error has occurred: Code = " + error.code);
	console.log("upload error source " + error.source);
	console.log("upload error target " + error.target);
}

/*Botones*/
function capturePhoto() {
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}
function capturePhotoEdit() {
	// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
	destinationType: destinationType.DATA_URL });
}
function getPhoto(source) {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}
/*Error*/
function onFail(message) {
  alert('Failed because: ' + message);
}
/*------------------------------------END-FOTO----------------------------------------*/
/*------------------------------------CONTATOS----------------------------------------*/
function listContacts(){
	var options = new ContactFindOptions();//Contatos
	options.filter = "";//Contatos
    var fields = ["displayName", "name"];//Contatos
    navigator.contacts.find(fields, onSuccess, onError, options);//Contatos
}
function onSuccess(contacts) {
	$("#resContatos").html("");
	var append = '<ul>';
	for (var i = 0; i < contacts.length; i++) {
		//console.log("Display Name = " + contacts[i].displayName);
		append = append + '<li>' + contacts[i].displayName + '</li>';
    }
	append = append + '</ul>';
	$("#resContatos").html(append);
}
function onError(contactError) {
	alert('onError!');
}
/*--------------------------------END-CONTATOS----------------------------------------*/
/*--------------------------------ENVIAR-POST-----------------------------------------*/
function enviarPOST(nome){	
	$.ajax({ 
		url:'http://projeto01.backsite.com.br/dispositivo/mobile/publico/android/android.php', 
		type:'POST', 
		data:'NOME='+nome, 		
		error:function(jqXHR,text_status,strError){ 
			alert("no connection");
		}, 
		timeout:60000, 
		success:function(data){ 
			$("#resultPOST").html(data); 			
		} 
	});
} 	
/*--------------------------------END-ENVIAR-POST-------------------------------------*/
/*--------------------------------ENVIAR-JSON-----------------------------------------*/
function enviarJson(Json){	
	$.ajax({ 
		url:'http://projeto01.backsite.com.br/dispositivo/mobile/publico/android/android.php', 
		type:'POST', 
		data:'JSON='+Json, 		
		dataType: 'json',
		error:function(jqXHR,text_status,strError){ 
			alert("no connection");
		}, 
		timeout:60000, 
		success:function(data){ 
			var append = '<ul>';			
			for(i=0;i<data.length;i++){
				append = append + '<li>' + data[i] + '</li>';
			}
			append = append + '</ul>';
			$("#resultJson").html(append); 
		} 
	});
} 	
/*--------------------------------END-ENVIAR-JSON-------------------------------------*/
/*------------------------------------VIBRAR------------------------------------------*/
function Vibrar(){
	navigator.notification.vibrate(2500);	
}
/*--------------------------------END-VIBRAR------------------------------------------*/
/*------------------------------------TOCAR-------------------------------------------*/
function Tocar(){
	navigator.notification.beep(3);	
}
/*--------------------------------END-TOCAR-------------------------------------------*/
/*-----------------------------------UPDATE-------------------------------------------*/
function respActualizar(Boton){

	if ( Boton == "1"){
		window.open('http://projeto01.backsite.com.br/dispositivo/mobile/publico/android/android.php?FUNC=ACT', '_system')	
	}
}
function CheckUpdate(Actual){
	$(".version").html(Actual);
	$.ajax({
		url:'http://projeto01.backsite.com.br/dispositivo/mobile/publico/android/android.php', 
		type:'POST', 
		data:'VERSION='+Actual, 		
		error:function(jqXHR,text_status,strError){ 
			alert("no connection");
		}, 
		timeout:60000, 
		success:function(data){ 
			if(data == "SI"){
				 navigator.notification.confirm(
					'Desea Actualizar?',
					respActualizar,          
					'Actualização Disponivel',       
					['Si','No']         
        		);
			}
		} 
	});
}
/*-------------------------------END-UPDATE-------------------------------------------*/
/*-----------------------------------QR----------------------------------------------*/
function scanQR(){	
	 var scanner = cordova.require("cordova/plugin/BarcodeScanner");

		scanner.scan(
        function (result) {
          alert("We got a barcode\n" +
            "Result: " + result.text + "\n" +
            "Format: " + result.format + "\n" +
            "Cancelled: " + result.cancelled);
        }, 
        function (error) {
          alert("Scanning failed: " + error);
        }
       );
	   
	   /*
	    scanner.encode(
        function (result) {
          alert("We got a barcode\n" +
            "Result: " + result.text + "\n" +
            "Format: " + result.format + "\n" +
            "Cancelled: " + result.cancelled);
        }, 
        function (error) {
          alert("Scanning failed: " + error);
        }
       ); */
	   
}
/*-------------------------------END-QR----------------------------------------------*/
/*------------------------------SQL-LITE---------------------------------------------*/

	var db = window.openDatabase("NuevaBD", "1.0", "Just a Dummy DB", 200000); //will create database Dummy_DB or open it
       
	//Insertar en la bd
    function insertar(){
        db.transaction(populateDB,errorCB);                 
    }
	//mostrar los datos insertados
    function mostrar(){    
		db.transaction(successCB,errorCB);
    }  
	//borrar datos de tabla
	function borrar(){
		db.transaction(deleteCB,errorCB);
	}  
    function deleteCB(tx){
		tx.executeSql('DELETE FROM productos'); 
		mostrar();
	}
	//crear la tabla y darle los elemntos a insertar
    function populateDB(tx) {
        var val1 = $("#val1").val();
		var val2 = $("#val2").val();
		tx.executeSql('CREATE TABLE IF NOT EXISTS productos (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Desc TEXT NOT NULL)');
        tx.executeSql('INSERT INTO productos(Name,Desc) VALUES ("'+val1+'", "'+val2+'")');        
		$("#val1").val("");
		$("#val2").val("");
		mostrar();
    }
    //Error mensaje
    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }
    //Si todo fue correcto
    function successCB() {
        //alert("success!");
        db.transaction(queryDB,errorCB);
    }
    //consulta para mostrar los productos
    function queryDB(tx){
        tx.executeSql('SELECT * FROM productos',[],querySuccess,errorCB);
    }	
	//Imprimir los productos en un listview y en mensaje alert
    function querySuccess(tx, results) {
        var len = results.rows.length;
       // alert("productos table: " + len + " rows found.");
        $('#productosList').html('');
		for (var i=0; i<len; i++){
           //alert("Row = " + i + " id = " + results.rows.item(i).id + " Nombre =  " + results.rows.item(i).Name);
           $('#productosList').append('<li><a href="#"><h3 class="ui-li-heading">'+results.rows.item(i).id+'</h3><p class="ui-li-desc">val1 '+results.rows.item(i).Name+' | val2 '+results.rows.item(i).Desc+'</p></a></li>');
		   $('#productosList').listview('refresh');
        }
    }
/*--------------------------END-SQL-LITE---------------------------------------------*/
/*-----------------------------------GPS---------------------------------------------*/
function GPS(){

	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />';
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }		
}
/*-------------------------------END-GPS---------------------------------------------*/
/*-------------------------------CALENDAR--------------------------------------------*/
function AddEvent(){  
	var startDate = new Date("December 24, 2013 13:00:00");
	var endDate = new Date("December 24, 2013 14:30:00");
	var title = $("#Titulo").val();//"My nice event";
	var location = $("#Lugar").val();//"Home";
	var notes = $("#Notas").val();//"Some notes about this event.";
	var success = function(message) { alert("Success: " + JSON.stringify(message)); };
	var error = function(message) { alert("Error: " + message); };
	
	// create (the only function also supported on Android for now)
	window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,success,error);
}
/*---------------------------END-CALENDAR--------------------------------------------*/
/*-----------------------------------PUSH--------------------------------------------*/
function sendRegId(key){//Envio de Id do Dispositivo para enviar notificacion
	$.ajax({
		url:'http://projeto01.backsite.com.br/dispositivo/mobile/publico/android/android.php', 
		type:'POST', 
		data:'KEY='+key, 		
		error:function(jqXHR,text_status,strError){ 
			alert("no connection");
		}, 
		timeout:60000, 
		success:function(data){ 
			$("#app-status-ul").append('<li>REGID SEND -> SUCCESS:' + data + "</li>");			
		} 
	});	
}
function successHandler (result) {
    alert('result = ' + result);
}
function errorHandler (error) {
    alert('error = ' + error);
}
// iOS
function onNotificationAPN (event) {
    if ( event.alert )
    {
        navigator.notification.alert(event.alert);
    }

    if ( event.sound )
    {
        var snd = new Media(event.sound);
        snd.play();
    }

    if ( event.badge )
    {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}

// Android
function onNotificationGCM(e) {
    switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    alert('registration id = '+e.regid);
					sendRegId(e.regid);
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
              break;
        }
}