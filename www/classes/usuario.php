<?php
class usuario {
	public $codigoUsuario;
	public $nomeUsuario;
	public $emailUsuario;

	public function getCodigoUsuario() 	{return $this->codigoUsuario;}
	public function getNomeUsuario() 	{return $this->nomeUsuario;}
	public function getEmailUsuario() 	{return $this->emailUsuario;}

	public function __construct($id) {
		$this->codigoUsuario = $id;
	}

	public function validar_por_id($id="") {
		if($id=="") $id = $this->codigoUsuario;
		$db = mysql_connect('192.168.20.116','projeto02','.com@2012') or die( mysql_error() );
		$conexao = mysql_select_db('projeto02', $db);
		$queryId = "SELECT * FROM  erp_profissional WHERE erp_prof_codigo='".$id."'";
		$resultadoId = mysql_query($queryId);
		if($rId = mysql_fetch_array($resultadoId)) {
			$this->codigoUsuario = 	$rId["erp_prof_codigo"];
			$this->nomeUsuario = 	$rId["erp_prof_nome"];
			$this->emailUsuario = 	$rId["erp_prof_email"];
			$this->autenticado = true;
			return true;
		} else {
			return false;
		}	
	}
	
	public function name_por_id($id) {    //caso eu queria saber o nome de algum usuario que não seja o dono da classe
		$db = mysql_connect('192.168.20.116','projeto02','.com@2012') or die( mysql_error() );
		$conexao = mysql_select_db('projeto02', $db);
		$queryId = "SELECT * FROM  erp_profissional WHERE erp_prof_codigo='".$id."'";
		$resultadoId = mysql_query($queryId);
		if($rId = mysql_fetch_array($resultadoId)) return $rId["erp_prof_nome"];
		return false;	
	}	
	
}
?>