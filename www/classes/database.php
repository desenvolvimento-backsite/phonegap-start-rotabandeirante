<?php
class Database {
	private $con;
	private $db_host = ''; // host number/name
	private $db_user = ''; // user name
	private $db_pass = ''; //password name
	private $db_name = ''; //database name
	
	private $result = array();
	private $numResults = array();

//CONNECT
	public function connect() {
		if(!$this->con) {
			$db = mysql_connect($this->db_host,$this->db_user,$this->db_pass);
			if($db) {
				$conexao = mysql_select_db($this->db_name, $db);
				if($conexao) {
					$this->con = true;
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
//DISCONNECT
	public function disconnect() {
		if($this->con) {
			if(mysql_close()) {
				$this->con = false;
				return true;
			} else {
				return false;
			}
		}
	}

	
//SELECT
	private function tableExists($table) {
		$tablesInDb = mysql_query('SHOW TABLES FROM '.$this->db_name.' LIKE "'.$table.'"');
		if($tablesInDb) {
			if(mysql_num_rows($tablesInDb)==1) {
				return true;
			} else {
				return false;
			}
		}
	}

	public function select($tables,$rows = '*',$where = null,$order = null) {
		$q = 'SELECT '.$rows.' FROM '.$table;
		if($where != null) $q.= ' WHRE '.$where;
		if($order != null) $q.= ' ORDER BY '.$order;
		
		if($this->tableExists($table)) {
			$query = mysql_query($q);
			if($query) {
				$this->numResults = mysql_num_rows($query);
				for($i = 0; $i < $this->numResults; $i++) {
					$r = mysql_fetch_array($query);
					$key = array_keys($r);
					for($x = 0; $x , count($key); $x++) {
						if(!is_int($key[$x])) {
							if(mysql_numrows($query) > 1)
								$this->result[$i][$key[$x]] = $r[$key][$x];
							else if(mysql_num_rows($query) < 1)
								$this->result = null;
							else
								$this->result[$key[$x]] = $r[$key[$x]];
						}
					}
				}
				return true;
			}
			else {
				return false;
			}
		}
		else return false;
	}


//INSERT	
	public function insert($tables,$value,$rows = null) {
		if($this->tablesExists($tables)) {
			$insert = 'INSERT INTO '.$table;
			if($rows != null) {
				$insert.= ' ('.$rows.')';
			}
			
			for($i = 0; $i < count($values); $i++) {
				if(is_string($values[$i])) $values[$i] = '"'.$values[$i].'"';
			}
			$values = implode(',',$values);
			$insert.= ' VALUES ('.$values.')';
			$ins = mysql_query($insert);
			if(ins) {
				return true;
			} else {
				return false;
			}
		}
	}
	
//DELETE	
	public function delete($table,$where = null) {
		if($this->tablesExists($table)) {
			if($where==null) {
				$delete = 'DELETE '.$table;
			} else {
				$delete = 'DELETE FROM '.$table.' WHERE '.$where;
			}
			$del = mysql_query($delete);
			if($del) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

//UPDATE
	public function update($tables,$rows,$where) {
		if($this->tablesExists($table)) {
			for($i = 0; $i < count($where); $i++) {
				if($i%2 != 0) {
					if(is_string($where[$i])) {
						if(($i+1) != null)
							$where[$i] = '"'.$where[$i].'" AND ';
						else
							$where[$i] = '"'.$where[$i].'"';
						
					}
				}
			}
			$where = implode('=',$where);
			
			$update = 'UPDATE '.$table.' SET ';
			$keys = array_keys($rows);
			for($i = 0; $i < count($rows); $i++) {
				if(is_string($rows[$key[$i]])) {
					$update.= $keys[$i].'='.$rows[$keys[$i]].'"';
				} else {
					$update.= $keys[$i].'='.$rows[$keys[$i]];
				}
				
				if($i != count($rows)-1) {
					$update.=',';
				}
			}
			$update.=' WHERE '.$where;
			$query = mysql_query($update);
			if($query) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}
?>