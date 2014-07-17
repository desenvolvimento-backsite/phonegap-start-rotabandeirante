<?php 

require "classes/classes.php";

header('Access-Control-Allow-Origin: *');
/*case 'http://from.com': case 'https://from.com':*/
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');

header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

$logado = new usuarioLogado('2013-07-01 00:00:00');
$op = $_POST["op"];

if($op==1) {  //validar o usuario com usuario e senha
	if($logado->validar($_POST["email"],$_POST["senha"])) {
		$data['log'] = 1;
		$data['id'] = $logado->getCodigoUsuario();
		$data['nome'] = $logado->getNomeUsuario();
		$data['email'] = $logado->getEmailUsuario();
	} else {
		$data['log'] = 0;
	}
	echo json_encode($data);
	/*echo "Email: ".$_POST["email"]."<br/>";
	echo "Senha: ".$_POST["senha"]."<br/>";*/
}
/*
if($op==2) {  // verificar se tem novas mensagnes
	$idAmigo = $_POST["idAmigo"];
	
	$logado->validar_por_id($_POST["id"]);
	$logado->novaMensagens();
	$data = array();
	$data["amigos"] 		= $logado->listaAmigos;
	$data["mensagens"] 		= $logado->listaMensagens($idAmigo);
	$data["ultimaMensagem"] = $logado->idUltimaMensagem;

	echo json_encode($data);
}

if($op==3) {  // enviar uma mensagem
	$euid = $_POST['euid'];
	$amigoid = $_POST['amigoid'];
	$mensagem = $_POST['mensagem'];

	$logado->validar_por_id($euid);
	if($logado->cadastrarMensagem($euid,$amigoid,$mensagem)) {
		$resposta = true;
	} else {
		$resposta = false;
	}
	echo json_encode($resposta);
}
*/
?>