<?php
class usuarioLogado extends usuario {
	public $tempoLimite;	
	public $autenticado;
	public $conversa = array();

	public $listaAmigos = array();
	public $idUltimaMensagem;

	public function tempoLimite() 		{return $this->tempoLimite;}
	public function estaAutenticado() 	{return $this->autenticado;}

	public function __construct($tempoLimite) {
		$this->tempoLimite = $tempoLimite;
		$this->autenticado = false;
	}

	public function validar($email,$senha) {
		$db = mysql_connect('192.168.20.116','projeto02','.com@2012') or die( mysql_error() );
		$conexao = mysql_select_db('projeto02', $db);
		$query = "SELECT * FROM  erp_profissional WHERE erp_prof_email='".$email."' and erp_prof_senha='".md5($senha)."'";
		$resultado = mysql_query($query);
		if($r = mysql_fetch_array($resultado)) {
			$this->codigoUsuario = 	$r["erp_prof_codigo"];
			$this->nomeUsuario = 	$r["erp_prof_nome"];
			$this->emailUsuario = 	$r["erp_prof_email"];
			$this->autenticado = true;
			return true;
		} else {
			return false;
		}
	}

/*	
	public function listaAmigos() {
		foreach($this->conversa as $amigo => $conteudo) {
			$id = $this->conversa[$amigo]->getCodigoDestinatario();
			if(!isset($this->conversa[$id]))
				$result[$id]["Nome"] = $this->conversa[$amigo]->getNomeDestinatario();
		}
		return $result;
	}*/

	public function addListaAmigos($id) {
		foreach($this->listaAmigos as $idAmigo => $nomeAmigo) {
			if(isset($this->listaAmigos[$idAmigo])) {
				return true;
			}	
		}
		$this->listaAmigos[$id] = $this->name_por_id($id);
		return true;
	}

	public function listaMensagens($idAmigo) {
		if(isset($idAmigo)) {
			$conversa = $this->conversa[$idAmigo]->mensagens;
			$string = "";
			$cc = 0;
			foreach($this->conversa[$idAmigo]->mensagens as $mensagem) {
				$lida = "";

				if($mensagem["erp_not_lida"]==0) {
					$lida = "*";
				}
				$string[$cc]["erp_not_codigo"]				= $mensagem["erp_not_codigo"];
				$string[$cc]["erp_not_destinatario_codigo"] = $mensagem["erp_not_destinatario_codigo"];
				$string[$cc]["erp_not_remetente_codigo"] 	= $mensagem["erp_not_remetente_codigo"];
				$string[$cc]["erp_not_destinatario_nome"] 	= $mensagem["erp_not_destinatario_nome"];
				$string[$cc]["erp_not_destinatario_nome"] 	= $mensagem["erp_not_destinatario_nome"];
				$string[$cc]["erp_not_remetente_nome"] 		= $mensagem["erp_not_remetente_nome"];
				$string[$cc]["erp_not_assunto"] 			= $mensagem["erp_not_assunto"];
				$string[$cc]["erp_not_data_fatal"] 			= $mensagem["erp_not_data_fatal"];
				$string[$cc]["erp_not_lida"] 				= $mensagem["erp_not_lida"];
				$string[$cc]["erp_not_data_leitura"] 		= $mensagem["erp_not_data_leitura"];
				$cc++;				
			}
		} else {
			$string = $this->todasConversas;
		}
		$this->idUltimaMensagem = $string[$cc-1]["erp_not_codigo"];
		
		return $string;
	}	


	
	public function cadastrarMensagem(
							$eu,
							$amigo,
							$mensagem
				) {
				
		$conversa = new conversa($eu,$amigo);
		if($conversa->enviarMensagem($mensagem)) {
			return true;
		} else {
			return false;
		}
	}				
	
}
?>