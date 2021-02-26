@isTest
public class Batch_ProductFeaturesTest {
@testSetup
	static void createData()
	{  
		 
		List<EDP_URLs__c> urlList = new List<EDP_URLs__c>();
		EDP_URLs__c edpentry=new EDP_URLs__c();
		edpentry.Name='resource';
		edpentry.URL__c='https://edpqaapi.azurewebsites.net';
		urlList.add(edpentry);
		
		EDP_URLs__c entry= new EDP_URLs__c();
		entry.Name='PF';
		entry.URL__c='https://edpqaapi.azurewebsites.net/api/ProductFeatures';
		 urlList.add(entry);
		insert urlList;
	}
	
	@isTest static void ProdFeatureMock1(){
		
	   EDP_CH_Settings__c  pcEntry =	new EDP_CH_Settings__c();
		pcEntry.Name='ProductFeatures';
		pcEntry.Full_Load__c=true;
		//pcEntry.ModifiedDate__c= DateTime.valueOf('2018-06-25 16:13:22');
		 //pcEntry.ModifiedDate__c=date.parse('12/27/2018');
			//pcEntry.ModifiedDate__c=null;
			insert pcEntry;

		
		
		List<String> Queries=new List<String>();
		List<String> QueryList = new List<String>();
		QueryList.add('https://edpqaapi.azurewebsites.net/api/ProductFeatures?$orderby=Name');
		 Queries=QueryList;
		
  
		MultiStaticResourceCalloutMock multimock = new MultiStaticResourceCalloutMock();
		multimock.setStaticResource('https://edpqaapi.azurewebsites.net/api/ProductFeatures?$orderby=Name', 'ProductFeatures');
		 multimock.setStaticResource('https://login.microsoftonline.com/5d471751-9675-428d-917b-70f44f9630b0/oauth2/token','ProductToken');
		 multimock.setStaticResource('callout:EDP_Login','ProductToken');
		String url = 'https://edpqaapi.azurewebsites.net/api/ProductFeatures?$orderby=Name&$count=true&$top=1';
		multimock.setStaticResource(url,'ProductFeaturesCount');
		multimock.setStatusCode(200);
		multimock.setHeader('Content-Type', 'application/json');
		
		
		 Test.startTest();
		
		Test.setMock(HttpCalloutMock.class, multimock);
		SchedulableContext SC;
		Batch_ProductFeatures tsc=new Batch_ProductFeatures();
		tsc.execute(SC);
		Batch_ProductFeatures batch= new Batch_ProductFeatures();
		Database.executebatch(batch,1);
	   // batch.unscheduleMe();
	   // batch.rescheduleMethod();
		
		 Test.stopTest();

		
	}
	@isTest
	static void testgetTokenFailure()
	{
		EDP_CH_Settings__c  pcEntry= new EDP_CH_Settings__c();
		pcEntry.Name='ProductFeatures';
		pcEntry.Full_Load__c=false;
	  // pcEntry.Full_Load_Filter__c='NSNCode = \'p12345\''; 
	  // pcEntry.ModifiedDate__c= DateTime.valueOf('2018-06-25 16:13:22');
		 
			insert pcEntry;
		
		 MultiStaticResourceCalloutMock multimock = new MultiStaticResourceCalloutMock();
		multimock.setStaticResource('callout:EDP_Login','ProductToken');
		
		Test.startTest();
		
		Test.setMock(HttpCalloutMock.class, multimock);
		 Batch_ProductFeatures batch= new Batch_ProductFeatures();
		batch.getToken();
		 EDP_CH_Settings__c  pcEntry1 = EDP_CH_Settings__c.getInstance('ProductFeatures');
		pcEntry1.Full_Load__c=true;
		update pcEntry1;
		batch.getCountofRecords('https://edpqaapi.azurewebsites.net/api/ProductFeatures?$orderby=Name&$count=true&$top=1');
	}
	
	@isTest
	static void testgetToken1Failure()
	{
		EDP_CH_Settings__c  pcEntry= new EDP_CH_Settings__c();
		pcEntry.Name='ProductFeatures';
		pcEntry.Full_Load__c=false;
	  // pcEntry.Full_Load_Filter__c='NSNCode = \'p12345\''; 
	  // pcEntry.ModifiedDate__c= DateTime.valueOf('2018-06-25 16:13:22');
		 
			insert pcEntry;
		
		 MultiStaticResourceCalloutMock multimock = new MultiStaticResourceCalloutMock();
		multimock.setStaticResource('callout:EDP_Login','ProductToken');
		
		Test.startTest();
		
		Test.setMock(HttpCalloutMock.class, multimock);
		 Batch_ProductFeatures batch= new Batch_ProductFeatures();
	   batch.getCountofRecords('https://edpqaapi.azurewebsites.net/api/ProductFeatures?$orderby=Name&$count=true&$top=1');
		 EDP_CH_Settings__c  pcEntry1 = EDP_CH_Settings__c.getInstance('ProductFeatures');
		pcEntry1.Full_Load__c=true;
		update pcEntry1;
		 batch.getToken();
		
	}
	
	@isTest static void ProdFeatureMock2(){
		
	   EDP_CH_Settings__c pcEntry =	 new EDP_CH_Settings__c ();
		pcEntry.Name='ProductFeatures';
		pcEntry.Full_Load__c=true;  
		pcEntry.Full_Load_Filter__c='FeatureItemId=\'p12345\'';
		 //pcEntry.ModifiedDate__c=DateTime.valueOf('2018-06-25 16:13:22');
		insert pcEntry;
		  
		List<String> Queries=new List<String>();
	   
		  List<String> QueryList = new List<String>();
		 QueryList.add('https://edpqaapi.azurewebsites.net/api/ProductFeatures?$orderby=Name');
		  Queries=QueryList;
		 
		 MultiStaticResourceCalloutMock multimock = new MultiStaticResourceCalloutMock();
		  multimock.setStaticResource('https://edpqaapi.azurewebsites.net/api/ProductFeatures?$orderby=Name','ProductFeatures');
		  multimock.setStaticResource('https://login.microsoftonline.com/5d471751-9675-428d-917b-70f44f9630b0/oauth2/token','ProductToken');
		  multimock.setStaticResource('callout:EDP_Login','ProductToken');
		  String url = 'https://edpqaapi.azurewebsites.net/api/ProductFeatures?$orderby=Name&$count=true&$top=1';
		  multimock.setStaticResource(url,'ProductFeaturesCount');
		  multimock.setStatusCode(200);
		  multimock.setHeader('Content-Type', 'application/json');
		 
		  
		 Test.startTest();
		
		Test.setMock(HttpCalloutMock.class, multimock);
		SchedulableContext SC = null;
		Batch_ProductFeatures tsc=new Batch_ProductFeatures();
		tsc.execute(SC);
		Batch_ProductFeatures batch= new Batch_ProductFeatures();
		Database.executebatch(batch,1);
		Database.BatchableContext BC;
		batch.finish(BC);
	 //   batch.unscheduleMe();
	   // batch.rescheduleMethod();
		Test.stopTest();

		
		 
}
	
	 @isTest static void ProdFeatureMock3(){
		
	   EDP_CH_Settings__c pcEntry =	 new EDP_CH_Settings__c ();
		pcEntry.Name='ProductFeatures';
		//pcEntry.Full_Load__c=true;  
		//pcEntry.Full_Load_Filter__c='FeatureItemId=\'p12345\'';
		pcEntry.ModifiedDate__c=DateTime.valueOf('2018-06-25 16:13:22');
		insert pcEntry;
		  
		List<String> Queries=new List<String>();
	   
		  List<String> QueryList = new List<String>();
		 QueryList.add('https://edpqaapi.azurewebsites.net/api/ProductFeatures?$orderby=Name');
		  Queries=QueryList;
		 
		 MultiStaticResourceCalloutMock multimock = new MultiStaticResourceCalloutMock();
		  multimock.setStaticResource('https://edpqaapi.azurewebsites.net/api/ProductFeatures?$orderby=Name','ProductFeatures');
		  multimock.setStaticResource('https://login.microsoftonline.com/5d471751-9675-428d-917b-70f44f9630b0/oauth2/token','ProductToken');
		  multimock.setStaticResource('callout:EDP_Login','ProductToken');
		  String url = 'https://edpqaapi.azurewebsites.net/api/ProductFeatures?$orderby=Name&$count=true&$top=1';
		  multimock.setStaticResource(url,'ProductFeaturesCount');
		  multimock.setStatusCode(400);
		  multimock.setHeader('Content-Type', 'application/json');
		 
		  
		 Test.startTest();
		
		Test.setMock(HttpCalloutMock.class, multimock);
		SchedulableContext SC = null;
		Batch_ProductFeatures tsc=new Batch_ProductFeatures();
		tsc.execute(SC);
		Batch_ProductFeatures batch= new Batch_ProductFeatures();
		Database.executebatch(batch,1);
		Database.BatchableContext BC;
		batch.finish(BC);
	   // batch.unscheduleMe(); 
	   // batch.rescheduleMethod();
		Test.stopTest();

		
		 
}
}