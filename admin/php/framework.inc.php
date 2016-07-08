<?php
class DB {

	private $db;
	
	public function __construct() {
		global $config;
		$this->db = pg_connect("host={$config['dbhost']} port={$config['dbport']} dbname={$config['dbname']} user={$config['dbuser']} password={$config['dbpassword']}");
		if (!$this->db) {
			die('Verbindungsaufbau zur Datenbank fehlgeschlagen: ' . pg_last_error());
		}
	}
	
	protected function query($query, $data = array()) {
		$queryName = uniqid();
		$resource = pg_prepare($this->db, $queryName, $query);
		if ($resource !== false) {
			return pg_execute($this->db, $queryName, $data);
		}
		else {
			die('Datenbankabfrage fehlgeschlagen: ' . pg_last_error());
		}
	}
	
	public function execute($query, $data = array()) {
		$this->query($query, $data);
	}
	
	public function fetch_one($query, $data = array()) {
		$result = $this->query($query, $data);
		$row = pg_fetch_assoc($result);
		if ($row !== false) {
			return $row;
		}
		else {
			return array();
		}
	}
	
	public function fetch_all($query, $data = array()) {
		$result = $this->query($query, $data);
		return pg_fetch_all($result);
	}

}