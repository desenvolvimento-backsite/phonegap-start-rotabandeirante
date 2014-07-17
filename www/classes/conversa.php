<?php
class conversa {
	public $infoUsuario;
	public $infoAmigo;

	public $mensagens;
	public $numMensagens;

	public $codigoParceiro;
	public $nomeParceiro;
	public $emailParceiro;

	public function getNomeDestinatario() {
		return $this->nomeParceiro;
	}
	public function getCodigoDestinatario() {
		return $this->codigoParceiro;
	}
	public function getEmailDestinatario() {
		return $this->emailParceiro;
	}

	public function getNome($codigo) {
		if($codigo == $this->infoUsuario->getCodigoUsuario()) {
			return $this->infoUsuario->getNomeUsuario();
		} else if($codigo == $this->infoAmigo->getCodigoUsuario()) {
			return $this->infoAmigo->getNomeUsuario();
		}
	}

	public function __construct($usuario,$amigo) {
		$this->infoUsuario = new usuario($amigo);
		$this->infoUsuario->validar_por_id($usuario);
		
		$this->infoAmigo = new usuario($amigo);
		$this->infoAmigo->validar_por_id($amigo);
		$this->numMensagens = 0;
		
		$this->nomeParceiro = $this->infoAmigo->nomeUsuario;
		$this->codigoParceiro = $this->infoAmigo->codigoUsuario;
		$this->emailParceiro = $this->infoAmigo->emailUsuario;
	}

	public function addMensagem(
		$erp_not_codigo,
		$erp_not_destinatario,
		$erp_not_remetente,
		$erp_not_assunto,
		$erp_not_data_fatal,
		$erp_not_lida,
		$erp_not_data_leitura) {

		$this->mensagens[$this->numMensagens]["erp_not_codigo"]					= $erp_not_codigo;
		$this->mensagens[$this->numMensagens]["erp_not_destinatario_codigo"] 	= $erp_not_destinatario;
		$this->mensagens[$this->numMensagens]["erp_not_destinatario_nome"] 		= $this->getNome($erp_not_destinatario);
		$this->mensagens[$this->numMensagens]["erp_not_remetente_codigo"] 		= $erp_not_remetente;
		$this->mensagens[$this->numMensagens]["erp_not_remetente_nome"] 		= $this->getNome($erp_not_remetente);
		$this->mensagens[$this->numMensagens]["erp_not_assunto"] 				= $erp_not_assunto;
		$this->mensagens[$this->numMensagens]["erp_not_data_fatal"] 			= $erp_not_data_fatal;
		$this->mensagens[$this->numMensagens]["erp_not_lida"] 					= $erp_not_lida;
		$this->mensagens[$this->numMensagens]["erp_not_data_leitura"] 			= $erp_not_data_leitura;
		$this->numMensagens++;
	}
	
	public function enviarMensagem($mensagem) {
		$db = mysql_connect('192.168.20.116','projeto02','.com@2012') or die( mysql_error() );
		$conexao = mysql_select_db('projeto02', $db);
		$queryId = "INSERT INTO  erp_notificacao 
				(erp_not_remetente,
				 erp_not_destinatario,
				 erp_not_lida,
				 erp_not_data_leitura,
				 erp_not_data_fatal,
				 erp_not_app_origem,
				 erp_not_assunto) 
					VALUES 
				(".$this->infoUsuario->codigoUsuario.",
				 ".$this->codigoParceiro.",
				 0,
				 '".date("Y-m-d H:i:s")."',
				 '".date("Y-m-d H:i:s")."',
				 'Mensagem',
				'".$mensagem."')";
				
				echo '<br/><br/>'.$queryId.'<br/><br/>';

		if(mysql_query($queryId)) {
			return true;
		} else {
			return false;
		}
	}
}
?>