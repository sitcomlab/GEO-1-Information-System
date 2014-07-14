import java.util.ArrayList;

import com.hp.hpl.jena.query.ARQ;
import com.hp.hpl.jena.query.Query;
import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QueryFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.RDFNode;

public class QueryLodum {

	ArrayList<RDFNode> listURI = new ArrayList<RDFNode>();
	ArrayList<RDFNode> listName = new ArrayList<RDFNode>();
	ArrayList<RDFNode> pic = new ArrayList<RDFNode>();
	ArrayList<String> projects = new ArrayList<String>();
	ArrayList<DatabaseEntry> databaseEntries = new ArrayList<DatabaseEntry>();
	int instituteId;

	public QueryLodum(int id) {
		this.instituteId = id;
	}

	public void queryPerson() {
		String sparqlQueryString2 = "prefix xsd: <http://www.w3.org/2001/XMLSchema#> "
				+ "prefix dct: <http://purl.org/dc/terms/> "
				+ "prefix dc: <http://purl.org/dc/elements/1.1/> "
				+ "prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> "
				+ "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> "
				+ "prefix owl: <http://www.w3.org/2002/07/owl#> "
				+ "prefix isbd: <http://iflastandards.info/ns/isbd/elements/> "
				+ "prefix skos: <http://www.w3.org/2004/02/skos/core#> "
				+ "prefix bibo: <http://purl.org/ontology/bibo/> "
				+ "prefix rda: <http://RDVocab.info/ElementsGr2/> "
				+ "prefix blt: <http://data.bl.uk/schema/bibliographic#> "
				+ "prefix bio: <http://purl.org/vocab/bio/0.1/> "
				+ "prefix foaf: <http://xmlns.com/foaf/0.1/> "
				+ "prefix event: <http://purl.org/NET/c4dm/event.owl#> "
				+ "prefix org: <http://www.w3.org/ns/org#> "
				+ "prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> "
				+ "prefix pv: <http://linkedscience.org/pv/ns#> "
				+ "prefix fn:<http://www.w3.org/2005/xpath-functions#> "
				+ "prefix vcard:<http://www.w3.org/2006/vcard/ns#> "
				+ "prefix aiiso:<http://purl.org/vocab/aiiso/schema#> "
				+ "prefix teach:<http://linkedscience.org/teach/ns#> "
				+ "prefix res:<http://www.medsci.ox.ac.uk/vocab/researchers/0.1/> "
				+ "prefix resume: <http://rdfs.org/resume-rdf/#> "
				+ "prefix tis:<http://www.ontologydesignpatterns.org/cp/owl/timeindexedsituation.owl#> "
				+ "prefix ti:<http://www.ontologydesignpatterns.org/cp/owl/timeinterval.owl#> "
				+ "prefix lode:<http://linkedevents.org/ontology/> "
				+ "prefix wgs84:<http://www.w3.org/2003/01/geo/wgs84_pos#> "
				+ "prefix tipr:<http://www.ontologydesignpatterns.org/cp/owl/timeindexedpersonrole.owl#> \n"
				+ "SELECT DISTINCT ?member ?name ?depict WHERE {"
				+ "<http://data.uni-muenster.de/context/cris/organization/"+this.instituteId+"> "
				+ "<http://xmlns.com/foaf/0.1/member> ?member . "
				+ "?member <http://xmlns.com/foaf/0.1/name> ?name . "
				+ "?member <http://xmlns.com/foaf/0.1/depiction> ?depict . } "
				+ "Order by ?name";

		Query query = QueryFactory.create(sparqlQueryString2);
		ARQ.getContext().setTrue(ARQ.useSAX);
		// Executing SPARQL Query and pointing to the SPARQL Endpoint
		QueryExecution qexec = QueryExecutionFactory.sparqlService(
				"http://data.uni-muenster.de/sparql", query);
		// Retrieving the SPARQL Query results
		ResultSet results = qexec.execSelect();
		// Iterating over the SPARQL Query results
		
		DatabaseEntry entry = null;
		
		while (results.hasNext()) {
			QuerySolution soln = results.nextSolution();
			// Printing DBpedia entries' abstract.
			listURI.add(soln.get("?member"));
			listName.add(cleanName(soln.get("?name").toString()));
			pic.add(soln.get("?depict"));
			entry = new DatabaseEntry(soln.get("?member").toString(), soln.get(
					"?depict").toString(), soln.get("?name").toString(),
					"Institute for Geoinformatics");
			

		  String sparqlQueryString3 =
		  "prefix xsd: <http://www.w3.org/2001/XMLSchema#> " +
		  "prefix dct: <http://purl.org/dc/terms/> " + "" +
		  "prefix dc: <http://purl.org/dc/elements/1.1/> " +
		  "prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
		  "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
		  "prefix owl: <http://www.w3.org/2002/07/owl#> " +
		  "prefix isbd: <http://iflastandards.info/ns/isbd/elements/> " +
		  "prefix skos: <http://www.w3.org/2004/02/skos/core#> " +
		  "prefix bibo: <http://purl.org/ontology/bibo/> " +
		  "prefix rda: <http://RDVocab.info/ElementsGr2/> " +
		  "prefix blt: <http://data.bl.uk/schema/bibliographic#> " +
		  "prefix bio: <http://purl.org/vocab/bio/0.1/> " +
		  "prefix foaf: <http://xmlns.com/foaf/0.1/> " +
		  "prefix event: <http://purl.org/NET/c4dm/event.owl#> " +
		  "prefix org: <http://www.w3.org/ns/org#> " +
		  "prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> " +
		  "prefix pv: <http://linkedscience.org/pv/ns#> " +
		  "prefix fn:<http://www.w3.org/2005/xpath-functions#> " +
		  "prefix vcard:<http://www.w3.org/2006/vcard/ns#> " +
		  "prefix aiiso:<http://purl.org/vocab/aiiso/schema#> " +
		  "prefix teach:<http://linkedscience.org/teach/ns#> " +
		  "prefix res:<http://www.medsci.ox.ac.uk/vocab/researchers/0.1/> " +
		  "prefix resume: <http://rdfs.org/resume-rdf/#> " +
		  "prefix tis:<http://www.ontologydesignpatterns.org/cp/owl/timeindexedsituation.owl#> "  +
		  "prefix ti:<http://www.ontologydesignpatterns.org/cp/owl/timeinterval.owl#> "
		  + "prefix lode:<http://linkedevents.org/ontology/> " +
		  "prefix wgs84:<http://www.w3.org/2003/01/geo/wgs84_pos#> " +
		  "prefix tipr:<http://www.ontologydesignpatterns.org/cp/owl/timeindexedpersonrole.owl#> \n"
		  + "SELECT DISTINCT * WHERE { "+ "OPTIONAL {"+
		  "?project pv:participant <"+soln.get("?member")+">."
		  + "?project pv:acronym ?projectAcronym ."+
		  "?project pv:title ?projectTitle"+ "}"+ "}";
		  
		  Query query2 = QueryFactory.create(sparqlQueryString3);
		  ARQ.getContext().setTrue(ARQ.useSAX); // Executing SPARQL Query and pointing to the SPARQL Endpoint 
		  QueryExecution qexec2 = QueryExecutionFactory.sparqlService(
				  "http://data.uni-muenster.de/sparql", query2); // Retrieving the SPARQL Query results 
		  ResultSet results2 = qexec2.execSelect(); //Iterating over the SPARQL Query results 
		  
		  while (results2.hasNext()) {
			  QuerySolution soln2 = results2.nextSolution(); // Printing DBpedia entries' abstract.
			  	if (soln2.get("?projectTitle")!=null){
			  		entry.projects.add(soln2.get("?projectTitle").toString());
			  	}
			}
		  
		  String sparqlQueryString4 =
				  "prefix xsd: <http://www.w3.org/2001/XMLSchema#> " +
				  "prefix dct: <http://purl.org/dc/terms/> " + "" +
				  "prefix dc: <http://purl.org/dc/elements/1.1/> " +
				  "prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
				  "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
				  "prefix owl: <http://www.w3.org/2002/07/owl#> " +
				  "prefix isbd: <http://iflastandards.info/ns/isbd/elements/> " +
				  "prefix skos: <http://www.w3.org/2004/02/skos/core#> " +
				  "prefix bibo: <http://purl.org/ontology/bibo/> " +
				  "prefix rda: <http://RDVocab.info/ElementsGr2/> " +
				  "prefix blt: <http://data.bl.uk/schema/bibliographic#> " +
				  "prefix bio: <http://purl.org/vocab/bio/0.1/> " +
				  "prefix foaf: <http://xmlns.com/foaf/0.1/> " +
				  "prefix event: <http://purl.org/NET/c4dm/event.owl#> " +
				  "prefix org: <http://www.w3.org/ns/org#> " +
				  "prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> " +
				  "prefix pv: <http://linkedscience.org/pv/ns#> " +
				  "prefix fn:<http://www.w3.org/2005/xpath-functions#> " +
				  "prefix vcard:<http://www.w3.org/2006/vcard/ns#> " +
				  "prefix aiiso:<http://purl.org/vocab/aiiso/schema#> " +
				  "prefix teach:<http://linkedscience.org/teach/ns#> " +
				  "prefix res:<http://www.medsci.ox.ac.uk/vocab/researchers/0.1/> " +
				  "prefix resume: <http://rdfs.org/resume-rdf/#> " +
				  "prefix tis:<http://www.ontologydesignpatterns.org/cp/owl/timeindexedsituation.owl#> "  +
				  "prefix ti:<http://www.ontologydesignpatterns.org/cp/owl/timeinterval.owl#> "
				  + "prefix lode:<http://linkedevents.org/ontology/> " +
				  "prefix wgs84:<http://www.w3.org/2003/01/geo/wgs84_pos#> " +
				  "prefix tipr:<http://www.ontologydesignpatterns.org/cp/owl/timeindexedpersonrole.owl#> \n"
				  + "SELECT DISTINCT ?courseTitle WHERE { "+ "OPTIONAL {"+
				  " ?course teach:teacher <"+soln.get("?member")+">."
				  + "?course teach:courseTitle ?courseTitle}}";
				  
				  Query query3 = QueryFactory.create(sparqlQueryString4);
				  ARQ.getContext().setTrue(ARQ.useSAX); // Executing SPARQL Query and pointing to the SPARQL Endpoint 
				  QueryExecution qexec3 = QueryExecutionFactory.sparqlService(
						  "http://data.uni-muenster.de/sparql", query3); // Retrieving the SPARQL Query results 
				  ResultSet results3 = qexec3.execSelect(); //Iterating over the SPARQL Query results 
				  
				  while (results3.hasNext()) {
					  QuerySolution soln3 = results3.nextSolution(); // Printing DBpedia entries' abstract.
					  	if (soln3.get("?courseTitle")!=null){
					  		entry.teachings.add(soln3.get("?courseTitle").toString());
					  	}
					}
			  
		  databaseEntries.add(entry);
		  qexec2.close();
		  qexec3.close();
		  }
		qexec.close();
	}
	public String cleanName(name){
		return name;
	}


}