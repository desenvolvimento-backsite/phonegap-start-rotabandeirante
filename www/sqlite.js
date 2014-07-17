var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 200000;
var hatabela;

var logged_idUsuario;

var contador_sucesso;
var numero_a_registrar;
var erro;
var sincronia_return;
var tentativas;

var db = window.openDatabase("NuevaBD", "1.0", "Just a Dummy DB", 200000); //will create database Dummy_DB or open it
//document.addEventListener("deviceready", onDeviceReady, false);

//function onDeviceReady() {

//}


$( document ).ready(function() {
	ListDBValues();
});


	function openPage(url) {
		var caption = 'Fechar' // get translation from i18n
		window.open(url, '_system', 'location=yes,presentationstyle=pagesheet');
	}

	function confirmacao(mensagem, func) {
		$("#caixa p").html(mensagem);
		$(".dimmer").fadeIn();
		$("#caixa").center().fadeIn();
		$(".dimmer").delay(3500).fadeOut();
		$("#caixa").delay(3400).fadeOut(function(){
			if( typeof(func) !=  'undefined' ){
				func.call();
			}
		});
	}



	function setDb(drop) {
		//drop = true -> significa que ele vai destruir a tabela antes de setala
		//drop = false -> sinificar que a tabela e seus dados serão mantidos

		if(drop==true) {
			db.transaction(function(tx) {
				tx.executeSql('DROP TABLE login_backsite',[],
				function() {
					idUsuario = '';
					$("div.form").show();
					$("#login").show();
					$(".conteudo").hide();
					$("#amigos").html("");
				},
				function() {
					//alert("Erro: "+error.message);
				});
			});

			db.transaction(function(tx) {
				tx.executeSql('DROP TABLE registro_passagem',[],
				function() {
					idUsuario = '';
					$("#login").show();
					$(".conteudo").hide();
					$("#amigos").html("");
				},
				function() {
					//alert("Erro: "+error.message);
				});
			});
		}

		db.transaction(function(tx){
			tx.executeSql('CREATE TABLE IF NOT EXISTS login_backsite (id_erp INTEGER NULL,email TEXT NULL,nome TEXT NULL,logado INTEGER NULL)',
						[],
						function() {
							//alert("Sucesso Banco login");
							//ListDBValues();
							//alert('sucesso na conexão');
						},
						function(transaction,error) {
							//alert("Erro: "+error.message);
						});
			},
			function() {//sucesso
			},
			function(tx,error) {//erro
			//alert("Erro: "+error.message);
			}
		);

		db.transaction(function(tx){		
			tx.executeSql('CREATE TABLE IF NOT EXISTS registro_passagem (id INTEGER PRIMARY KEY AUTOINCREMENT,HORA TEXT NOT NULL,DATA TEXT NOT NULL,PORTICO_ID INTEGER NOT NULL, IDENTIFICACAO TEXT NULL,CIDADE TEXT NULL,LOCALIZACAO TEXT NULL,ULTIMA_COMUNICACAO TEXT NULL,IP TEXT NULL,STATUS TEXT NULL,USUARIO INTEGER NOT NULL)',
						[],
						function() {
							//alert("Sucesso Banco registro_passagem");
						},
						function(transaction,error) {
							//alert("Erro: "+error.message);
						});
			},
			function() {//sucesso
			},
			function(tx,error) {//erro
			//alert("Erro: "+error.message);
			}
		);	
	}

	function drop() {
		setDb(true);
	}

	function ListDBValues() {
		var flag = false;
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
			return;
		}
		
		$("#login").show();
		$('#lbUsers').html('');
		$('#mensagens').html('');
  
		db.transaction(function(transaction) {
			transaction.executeSql('SELECT * FROM login_backsite', [],
			function(transaction, result) {
				if (result != null && result.rows != null) {					
					for (var i = 0; i < result.rows.length; i++) {
						flag = true;
					
						var row = result.rows.item(i);
						//$('#lbUsers').html(row.id_erp + ": " + row.nome +" ("+row.email+")");
						/*idUsuario = row.id;
						logged_idUsuario = idUsuario;*/
						
						$("id_logged").val(row.id_erp);
						$("nome_logged").val(row.nome);
						
						$(".logado").html("Olá, "+row.nome+"!");

						$("#login").hide();
						/*$(".opcao_inicial").hide();*/
						/*$("#tenho_cadastro").show();*/
						$(".conteudo").show();
					}
				}
			},function(tx,erro) {
				//alert("Erro: "+erro)
			});
		});		
		
		if(flag==false) {
			$("#login").show();
			/*$(".opcao_inicial").hide();*/
			/*$("#tenho_cadastro").show();*/
			$(".conteudo").hide();
		}
		return false; 
	}

	
	function AddValueToDB(id,nome,email) {
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
			return;
		}

		db.transaction(function(transaction) {
			transaction.executeSql('INSERT INTO login_backsite (id_erp, nome, email) VALUES (\''+id+'\',\''+nome+'\',\''+email+'\')',
								[],
								//nullHandler,
								function() { //error
									//alert("Sucesso");
								},
								function(transaction,error) { //success
									//alert("Erro: "+error.message);
								});
		});
		// this calls the function that will show what is in the User table in the database

		ListDBValues();
		return false;
	}

	$(document).ajaxError(function(e, jqxhr, settings, exception) {  
		if (jqxhr.readyState == 0 || jqxhr.status == 0) {  
			return; //Skip this error  
		}  
	});
	
	function listPorticosRegistrados() {
		db.transaction(function(transaction) {
			transaction.executeSql('SELECT * FROM registro_passagem', [],
			function(transaction, result) {
				$('.contain').html('');
				if (result != null && result.rows != null) {
					for (var i = 0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
							var figura = "";
							id = row.PORTICO_ID + '';
							data = row.DATA;
							hora = row.HORA;
							data = row.DATA.split("-");
							data = data[2]+"/"+data[1]+"/"+data[0];
							switch(id) {
								case '2':
								case '3': 
								case '4': figura = 'ico_maripora.jpg';
							break;
								case '5':
								case '6': figura = 'ico_nazare.jpg';
							break;
								case '7': figura = 'ico_bomjesus.jpg';
							break;
								case '8':
								case '9': figura = 'ico_atibaia.jpg';
							break;
								case '10':
								case '11': figura = 'ico_piracaira.jpg';
							break;
								case '12':
								case '13': figura = 'ico_braganca.jpg';
							break;	
								case '14':
								case '15': figura = 'ico_joanopolis.jpg';
							break;		
								case '16': figura = 'ico_tuiuti.jpg';
							break;		
								case '17': figura = 'ico_pinhalzinho.jpg';
							break;	
								case '18':
								case '19': figura = 'ico_pedra.jpg';
							break;	
								case '18':
								case '19': figura = 'ico_pedra.jpg';
							break;	
								case '20': figura = 'ico_vargem.png';
							break;
								case '21':
								case '22': 
								case '23': figura = 'ico_guarulhos.jpg';
							break;
								default: 
								figura = 'ico_guarulhos.jpg';
								//alert("default");
							break;
							} 
						//$('.container').append("<div class=\"capa\"><div class=\"cont_cidade\"><div class=\"titulo_cidade\"><h2>"+row.CIDADE+"</h2></div><div class=\"conteudo_cidade\"><img name=\"foto\" src=\"img/cidades/"+figura+"\" width=\"92\" height=\"92\" alt=\"\"><p><strong>Id:</strong>"+row.PORTICO_ID+"</p><p>"+row.LOCALIZACAO+"</p><p><strong>Data:</strong>"+row.DATA+"</p><p><strong>Hora:</strong>"+row.HORA+"</p></div></div></div>");
						$('.contain').append("<div class=\"registro\"><div =\"header\"><p class=\"titulo\">"+row.CIDADE+": "+row.LOCALIZACAO+"</p></div><div class=\"content\"><img src=\"img/cidades/"+figura+"\" /><ul><li class=\"data\">"+data+" às "+hora+"</li></ul></div></div>");
					}
				}
				return true;
			},function(tx,erro) {
				//alert("Erro: "+erro)
			});
		});
		return false; 
	}		

	
//----------------------------------------------------------
	function remover_registro_caminhada(id) {
		var resultado = 'false';
		db.transaction(function(transaction) {
			transaction.executeSql('DELETE FROM registro_passagem where id=\''+id+'\'', [],
			function(transaction, result) {
				contador_sucesso = contador_sucesso + 1;
			},function() {
				erro = true;
			});
		});		
	}
//----------------------------------------------------------	
	
	//EXCLUIR 2
	function sincronizar_excluir(id_atual,usuario,portico,data,hora,urlSincroniza) {
		var resultado = null;
		$.ajax({
			url: urlSincroniza,
			type: "POST",
			timeout:8000,
			async: false,
			data: {"usuario": usuario,"portico": portico,"data":data,"hora":hora},
			success: function(dt) {
				if(dt==1) {
					remover_registro_caminhada(id_atual);
				} else {
					//alert("Ocorreu um erro.");
					resultado = 'false';
				}				
			},
			error: function(e) {
				//alert("Erro <sincronizar_excluir>: "+e.error);
				resultado = 'false';
			}
		});
		return resultado;
	}

	//SINCRONIZAR 1
	function sincronizar_passagem() {
		sincronia_return = '';
		numero_a_registrar = 0;
		contador_sucesso = 0;
		tentativas = 0;

		var resultado = '';
		get_id();
		urlSincroniza = "http://www.rotabandeirante.com.br/corporativo/suite/exclusiva/aplicativo/ide/sistema_ferramenta/ferramentas/ferramenta_customizada/acao/rota_bandeirante/registro/index.php";
		db.transaction(function(transaction) {
			transaction.executeSql('SELECT * FROM registro_passagem', [],
			function(transaction, result) {
				numero_a_registrar = result.rows.length;
				if (result != null && result.rows != null && result.rows.length != 0) {
					var lista_id = new Array(result.rows.length);
					var lista_portico = new Array(result.rows.length);
					var lista_data = new Array(result.rows.length);
					var lista_hora = new Array(result.rows.length);
					for (var i = 0; i < result.rows.length; i++) {
						row = result.rows.item(i);
						lista_id[i] = row.id;
						lista_portico[i] = row.PORTICO_ID;
						lista_data[i] = row.DATA;
						lista_hora[i] = row.HORA;
					}
					for (var j = 0; j < lista_id.length; j++) {
						sincronizar_excluir(lista_id[j],$("#id_logged").val(),lista_portico[j],lista_data[j],lista_hora[j],urlSincroniza);
					}
				} else {
					sincronia_return = 'null';
					//alert('Sincronia: ' + sincronia_return);
				}
			},function(tx,erro) {
				sincronia_return = 'false';

			});
		});	
	}

	function get_id() {
		db.transaction(function(transaction) {
			transaction.executeSql('SELECT * FROM login_backsite', [],
			function(transaction, result) {
				if (result != null && result.rows != null) {
					for (var i = 0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						$('#id_logged').val(row.id_erp);
						$('#nome_logged').val(row.nome);
					}
				}
			},function(tx,erro) {
				alert("Erro <get_id>: "+erro);
			});
		});		
	}		

function registrar_passagem(portico_id,identificacao,cidade,localizacao) {
		var id;
		var data;
		var hora;
		
		var d = new Date();

		hr  = d.getHours();
		min = d.getMinutes();
		sec = d.getSeconds();
		dia = d.getDate(); 
		mes = d.getMonth()+1;
		ano = d.getYear() + 1900; 
		
		data = ano+"-"+mes+"-"+dia;
		hora = hr+":"+min;

		id = logged_idUsuario;

		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
			return;
		}

		string = 'INSERT INTO registro_passagem (usuario, DATA,HORA,PORTICO_ID, IDENTIFICACAO,CIDADE,LOCALIZACAO) VALUES (\''+id+'\',\''+data+'\',\''+hora+'\',\''+portico_id+'\',\''+identificacao+'\',\''+cidade+'\',\''+localizacao+'\')';
		
		db.transaction(function(transaction) {
			transaction.executeSql(string,
								[],
								//nullHandler,
								function() {
									mensagem = "Passagem registrada com sucesso!";
									confirmacao(mensagem);
									setTimeout('listPorticosRegistrados()',4000);
									return true;
								},
								function(transaction,error) { 
									mensagem = "Ocorreu um erro ao tentar registrar sua passagem. Tente novamente.";
									confirmacao(mensagem);
									return false;
								});
		});
	}