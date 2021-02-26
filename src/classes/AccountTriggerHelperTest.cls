@IsTest

//Test Class for Account Trigger
private class AccountTriggerHelperTest {
	
	@testSetup static void createTestData() {
			NCP_CustomerCommunitySetting__c cs = new NCP_CustomerCommunitySetting__c();
			cs.Name = 'Default';
			cs.Customer_Account__c = 'Customer - test';
			cs.Customer_Account_Number__c = '12345';
			cs.Customer_User_Profile__c = 'Customers';
			insert cs;
		}
	//Unit Test 1
	static testMethod void UnitTest1(){
		
		List<Account> accountList = new  List<Account>();
		List<Account> accountListTemp = new  List<Account>();
		
		Id LERecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Legal Entity').getRecordTypeId();
		Id custRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Customer').getRecordTypeId(); 
		
		accountList = TestDataFactory.createAccount(2);
		accountList[0].recordtypeid = custRecordTypeId;
		accountList[1].recordtypeid = LERecordTypeId;
		accountList[0].CTHeadEmail__c = 'anirudh.b.khanna@accenture.com';
		
		database.insert(accountList[0]); 
		accountList[1].parentid = accountList[0].id;
		accountList[1].Default_Legal_Entity__c = true;
		accountList[1].AccountNumber = '1000087011';

		database.insert(accountList[1]); 
		for(Integer i=1;i<accountList.size();i++){
			accountListTemp.add(accountList[i]);
		}
		
		//AccountModifier.computeCustomerList(accountListTemp);
		AccountTriggerHelper.chooseDefaultLegalEntity(accountListTemp);
		AccountTriggerHelper.checkParentIdChanges(accountListTemp);
		AccountTriggerHelper.updateDefaultLEforNewCustomer(accountListTemp[0].id, accountListTemp[0].AccountNumber);
		AccountTriggerHelper.validateDefaultLegalEntity(accountListTemp);
		
		
		accountList[0].CTHeadEmail__c = 'himani.parin.dave@accenture.com';
		database.update(accountList);
		//AccountModifier.computeCustomerList(accountListTemp);
		
		//creating Exception
		/*AccountModifier.computeCustomerList(NULL);
		AccountModifier.validateCustomerList(NULL, NULL);
		AccountModifier.updateAccountOwner(NULL);*/
	}
	//Unit Test 2
	static testMethod void UnitTest2(){
		
		List<Account> accountList = new  List<Account>();
		List<Account> accountListTemp = new  List<Account>();
		Id LERecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Legal Entity').getRecordTypeId();
		Id custRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Customer').getRecordTypeId(); 
		accountList = TestDataFactory.createAccount(2);
		accountList[0].recordtypeid = custRecordTypeId;
		accountList[1].recordtypeid = LERecordTypeId;
		
		database.insert(accountList[0]); 
		accountList[1].parentid = accountList[0].id;
		accountList[1].Default_Legal_Entity__c = false;
		accountList[1].AccountNumber = '1000087011';
		database.insert(accountList[1]); 
		
		Default_Legal_Entity__c DE = new Default_Legal_Entity__c();
		DE.Name = accountList[0].AccountNumber;
		DE.Default__c = accountList[1].AccountNumber;
		database.insert(DE); 
		for(Integer i=1;i<accountList.size();i++){
			accountListTemp.add(accountList[i]);
		}
		
		AccountTriggerHelper.chooseDefaultLegalEntity(accountListTemp);
		List<string> parentIdList = new List<string>();
	GlobalConstants.isDefaultUpdated = true;
	for(Account accObj : accountList){
	String parentId;
	parentId = accObj.ParentId;
	parentIdList.add(parentId);
	  }
	AccountTriggerHandler.beforeUpdateOperation(accountList);
	UpdateOpportunityLegalEntitiesBatch batchObj = new UpdateOpportunityLegalEntitiesBatch(parentIdList);
		database.executeBatch(batchObj,10);
	} 
	//Unit Test 3
	static testMethod void UnitTest3(){
		
		List<Account> accountList = new  List<Account>();
		List<Account> accountListTemp = new  List<Account>();
		Id LERecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Legal Entity').getRecordTypeId();
		Id custRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Customer').getRecordTypeId(); 
		accountList = TestDataFactory.createAccount(3);
		accountList[0].recordtypeid = custRecordTypeId;
		accountList[1].recordtypeid = LERecordTypeId;
		accountList[2].recordtypeid = LERecordTypeId;
		
		database.insert(accountList[0]); 
		accountList[1].parentid = accountList[0].id;
		accountList[1].Default_Legal_Entity__c = false;
		accountList[1].AccountNumber = '1000087011';
		database.insert(accountList[1]); 
		
		accountList[2].parentid = accountList[0].id;
		accountList[2].Default_Legal_Entity__c = true;
		accountList[2].AccountNumber = '1000087012';
		 database.insert(accountList[2]);  
		for(Integer i=1;i<accountList.size();i++){
			accountListTemp.add(accountList[i]);
		}
		AccountTriggerHelper.chooseDefaultLegalEntity(accountListTemp);
		AccountTriggerHelper.checkParentIdChanges(accountList);
		AccountTriggerHelper.validateDefaultLegalEntity(accountListTemp);
	}
	
	//Unit Test 4
	 static testMethod void UnitTest4(){
		List<Account> accountList = new  List<Account>();
		List<Account> accountListTemp = new  List<Account>();
		Id LERecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Legal Entity').getRecordTypeId();
		Id custRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Customer').getRecordTypeId(); 
		
		accountList = TestDataFactory.createAccount(3);
	
		accountList[0].recordtypeid = custRecordTypeId;
		accountList[1].recordtypeid = custRecordTypeId;
		accountList[2].recordtypeid = LERecordTypeId;
	
		database.insert(accountList[0]); 
		database.insert(accountList[1]); 
		accountList[2].parentid = accountList[0].id;
		accountList[2].Default_Legal_Entity__c = true;
		 accountList[2].AccountNumber = '1000087012';
		database.insert(accountList[2]); 
		 
	for(Integer i =1 ;i<accountList.size();i++){
		accountListTemp.add(accountList[i]);
	}
	AccountTriggerHelper.chooseDefaultLegalEntity(accountListTemp);
	AccountTriggerHelper.validateDefaultLegalEntity(accountListTemp);
	 }
	
	//Unit Test 5
	 static testMethod void UnitTest5(){
		
		List<Account> accountList = new  List<Account>();
		List<Account> accountListTemp = new  List<Account>();
		Id LERecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Legal Entity').getRecordTypeId();
		Id custRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Customer').getRecordTypeId(); 
		accountList = TestDataFactory.createAccount(3);
		accountList[0].recordtypeid = custRecordTypeId;
		accountList[1].recordtypeid = LERecordTypeId;
		accountList[2].recordtypeid = LERecordTypeId;
		
		database.insert(accountList[0]); 
		accountList[1].parentid = accountList[0].id;
		accountList[1].Default_Legal_Entity__c = true;
		 accountList[1].AccountNumber = '1000087011';
		database.insert(accountList[1]); 
		
		accountList[2].parentid = accountList[0].id;
		accountList[2].Default_Legal_Entity__c = true;
		 accountList[2].AccountNumber = '1000087012';
		 database.insert(accountList[2]); 
		
		Default_Legal_Entity__c DE = new Default_Legal_Entity__c();
		DE.Name = accountList[0].AccountNumber;
		DE.Default__c = accountList[1].AccountNumber;
		database.insert(DE);
		
		for(Integer i=1;i<accountList.size();i++){
			accountListTemp.add(accountList[i]);
		}
		AccountTriggerHelper.chooseDefaultLegalEntity(accountListTemp);
		AccountTriggerHelper.checkParentIdChanges(accountList);
		AccountTriggerHelper.validateDefaultLegalEntity(accountListTemp);
		AccountTriggerHelper.updateDefaultLEforNewCustomer(accountList[0].id,accountList[0].AccountNumber);
		 //AccountTriggerHelper.computeDS(accountListTemp);
	}
	
   //Unit Test 5 - Creating Exception 
	static testMethod void negativeUnitTest5(){
		AccountTriggerHelper.computeDS(NULL);
		AccountTriggerHelper.computeLegalEntityList(NULL);	  
	} 
	
	//Calling Schedular  
	static testMethod void testSchedule(){
		List<ObjectTerritory2Association> ObjectTerritory2AssociationList = new  List<ObjectTerritory2Association>();
		List<Account> accountList = new  List<Account>();
		List<Account> accountListTemp = new  List<Account>();
		Id LERecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Legal Entity').getRecordTypeId();
		Id custRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Customer').getRecordTypeId(); 
		
		accountList = TestDataFactory.createAccount(2);
		accountList[0].recordtypeid = custRecordTypeId;
		accountList[1].recordtypeid = LERecordTypeId;
		
		database.insert(accountList[0]); 
		accountList[1].parentid = accountList[0].id;
		accountList[1].Default_Legal_Entity__c = true;
		accountList[1].AccountNumber = '1000087011';
		database.insert(accountList[1]); 
		
		Default_Legal_Entity__c DE = new Default_Legal_Entity__c();
		DE.Name = accountList[0].AccountNumber;
		DE.Default__c = accountList[1].AccountNumber;
		database.insert(DE); 
		for(Integer i=1;i<accountList.size();i++){
			accountListTemp.add(accountList[i]);
		}
		Id territoryId = TestDataFactory.getTerritoryId();
		ObjectTerritory2AssociationList = TestDataFactory.assigningAccountToTerritory(1, accountList[0], territoryId);
		database.insert(ObjectTerritory2AssociationList);
		test.startTest();
		DetectCustomerTerritoryChangesSchedular dscheduler = new DetectCustomerTerritoryChangesSchedular();
		String schedule ='0 0 23 * * ?';
		system.schedule('Update', schedule, dscheduler);
		test.stopTest();
	}  
	
	  //Unit Test 6
	  static testMethod void UnitTest6(){
		List<Account> accountList = new  List<Account>();
		List<Account> accountListTemp2 = new  List<Account>();
		Id LERecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Legal Entity').getRecordTypeId();
		Id custRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Customer').getRecordTypeId(); 
		accountList = TestDataFactory.createAccount(3);
		accountList[0].recordtypeid = custRecordTypeId;
		accountList[1].recordtypeid = custRecordTypeId;
		accountList[2].recordtypeid = LERecordTypeId;
	
		database.insert(accountList[0]); 
		database.insert(accountList[1]);
		accountList[2].parentid = accountList[0].id;
		accountList[2].Default_Legal_Entity__c = true;
		accountList[2].AccountNumber = '1000087012';
		database.insert(accountList[2]); 
		 
	for(integer i = 0;i<accountList.size();i=i+2){
	 accountListTemp2.add(accountList[i]);
	}
		Default_Legal_Entity__c DE = new Default_Legal_Entity__c();
		DE.Name = accountList[0].AccountNumber;
		DE.Default__c = accountList[1].AccountNumber;
		database.insert(DE); 
		AccountTriggerHelper.checkParentIdChanges(accountListTemp2);
		accountList[2].parentid = accountList[1].id;
		accountList[2].Default_Legal_Entity__c = true;
		accountList[2].AccountNumber = '1000087012';
		database.update(accountList[2]);
		 
		
		AccountTriggerHelper.checkParentIdChanges(accountListTemp2);
		AccountTriggerHelper.checkParentIdChanges(accountListTemp2);
		accountList[2].parentid = accountList[1].id;
		accountList[2].AccountNumber = '1000087012';
		accountList[2].Default_Legal_Entity__c = false;
		database.update(accountList[2]);	  
		
		//exception creation  
		 AccountTriggerHelper.updateOpportunityLegaEnitities(NULL);
}
	//Unit Test 7
	 static testMethod void UnitTest7(){
		
		List<Account> accountList = new  List<Account>();
		List<Account> accountListTemp = new  List<Account>();
		Id LERecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Legal Entity').getRecordTypeId();
		Id custRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Customer').getRecordTypeId(); 
		accountList = TestDataFactory.createAccount(3);
		accountList[0].recordtypeid = custRecordTypeId;
		accountList[1].recordtypeid = LERecordTypeId;
		accountList[2].recordtypeid = LERecordTypeId;
		
		database.insert(accountList[0]); 
		accountList[1].parentid = accountList[0].id;
		accountList[1].Default_Legal_Entity__c = true;
		accountList[1].AccountNumber = '1000087011';
		database.insert(accountList[1]); 
		
		accountList[2].parentid = accountList[0].id;
		accountList[2].Default_Legal_Entity__c = true;
		accountList[2].AccountNumber = '1000087012';
		 database.insert(accountList[2]); 
		
		Default_Legal_Entity__c DE = new Default_Legal_Entity__c();
		DE.Name = accountList[0].AccountNumber;
		DE.Default__c = accountList[1].AccountNumber;
		database.insert(DE);
		
		for(Integer i=1;i<accountList.size();i++){
			accountListTemp.add(accountList[i]);
		}
	  AccountTriggerHelper.updateDefaultLEforNewCustomer(accountList[0].id,accountList[0].AccountNumber);
	}
	
	/******************************
	*Method Name: accountTerritoryMovementTest
	*Description: Test Method to cover accountTerritoryMovement Method
	********************************/
		@isTest
	static void accountTerritoryMovementTest()
	{		
		List<User> userList = new List<User>();
		List<Account> accountList = new List<Account>();
		Map<ID, Account> accNewMap = new Map<ID, Account>();
		Map<ID, Account> accOldMap = new Map<ID, Account>();
		Set<Id> L7ToL4Territories = new Set<Id>();
		List<UserTerritory2Association> userAssociList = new List<UserTerritory2Association>();		
		List<File_Sharing_Custom_Setting__c> fileSharingCustomSettingList = new List<File_Sharing_Custom_Setting__c>(); 
		List<ContentVersion> contentVersionList = new List<ContentVersion>();
		ContentVersion contentVersionObj = new ContentVersion();
		Id contentDocumentId;
		List<ContentDocumentLink> contentDocumentLinkList = new List<ContentDocumentLink>();
		Id territoryId,anotherTerritoryId;
		userList = TestDataFactory.userCreation(2,'System Administrator');
		userList[0].Nokia_ID__c= '6777777666';
		 userList[1].Nokia_ID__c= '6977777666';
		Database.insert(userList);
		System.runAs(userList[0])
		{ 
			GlobalConstants.RUN_CONTENTDOCUMENTLINK_TRIGGER_ON_FILESHARING = false;
			GlobalConstants.RUN_USERTERRITORY2ASSOCIATION_TRIGGER_ON_FILESHARING = false;
			
			territoryId = TestDataFactory.getL7TerritoryId();
			anotherTerritoryId = TestDataFactory.getAnotherL7TerritoryId(territoryId);
			accountList = TestDataFactory.createAccount(1);
			accountList[0].SFDC_L7TerritoryID__c = territoryId;			
			Test.startTest();			
			//Insert an File_Sharing_Custom_Setting	
			fileSharingCustomSettingList = TestDataFactory.create_File_Sharing_Custom_Setting();
			database.insert(fileSharingCustomSettingList);
			System.debug('fileSharingCustomSettingList:::>'+fileSharingCustomSettingList);
			System.assertNotEquals(fileSharingCustomSettingList, Null);			
			userAssociList = TestDataFactory.assigningUserToTerritory(1, userList[1], territoryId);
			Database.insert(userAssociList);			
			Database.insert(accountList);
			
			//Create ContentVersion Record
			contentVersionList = new list < ContentVersion >();
			contentVersionList = TestDataFactory.createContentVersion(1);
			Database.insert(contentVersionList);
			//Retrive ContentDocumentId from the Contentversion
			contentVersionObj =[select ContentDocumentId from ContentVersion where Id IN: contentVersionList];			
			contentDocumentId = contentVersionObj.ContentDocumentId;   
			contentDocumentLink contentDocLinkObj = [select LinkedEntityId from contentDocumentLink where ContentDocumentId =: contentDocumentId];
			Database.delete(contentDocLinkObj);
			contentDocumentLinkList = TestDataFactory.createContentDocumentLink(1, userList[0].Id, contentDocumentId);	  
			System.debug('userList[0].Id ::::::::::::::::::> '+userList[0].Id+' name - '+userList[0].name);
			System.debug('contentDocumentLink:::::::::::::::::::::>'+[select LinkedEntityId from contentDocumentLink where ContentDocumentId =: contentDocumentId]);
			Database.insert(contentDocumentLinkList);
			System.debug('contentDocumentLink2:::::::::::::::::::::>'+contentDocumentLinkList);
			Account accountObj = new Account();
			accountObj = [select id,SFDC_L7TerritoryID__c from Account where id =: accountList[0].Id ];
			accountObj.SFDC_L7TerritoryID__c =anotherTerritoryId;
			
			ContentDocumentLink link = TestDataFactory.createContentDocumentLinkWithShareTypeV(1, userList[1].Id, contentDocumentId)[0];
			//link.ShareType = 'C';
			Database.insert(link);
			
			Database.update(accountObj);
			L7ToL4Territories.add(territoryId);
			L7ToL4Territories.add(anotherTerritoryId);			
	 /* Batch_AccountTerritoryRemoval batchObj = new Batch_AccountTerritoryRemoval(L7ToL4Territories);
			Database.executeBatch(batchObj, 10);*/
			Test.stopTest();
		}
	}
	
	static testMethod void UnitTest9(){
		
		List<Account> accountList = new  List<Account>();
		List<String> accountListTemp = new  List<String>();
		Map<String, Account> parentIdVsLEAccountMap = new Map<String, Account>();
		Id LERecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Legal Entity').getRecordTypeId();
		Id custRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Customer').getRecordTypeId(); 
		accountList = TestDataFactory.createAccount(3);
		accountList[0].recordtypeid = custRecordTypeId;
		accountList[1].recordtypeid = LERecordTypeId;
		accountList[2].recordtypeid = LERecordTypeId;
	
		database.insert(accountList[0]); 
		accountList[1].parentid = accountList[0].id;
		accountList[1].AccountNumber = '1000087011';
		accountList[1].Active__c = false;
		database.insert(accountList[1]); 
		
		for(Integer i=1;i<accountList.size();i++){
			accountListTemp.add(accountList[i].AccountNumber);
		}
		
		accountList[2].parentid = accountList[0].id;
		accountList[2].AccountNumber = '1000087012';
		accountList[2].Active__c = true;
		database.insert(accountList[2]); 
		
		
		 for(Integer i=1;i<accountList.size();i++){
			accountListTemp.add(accountList[i].AccountNumber);
		}
		
		for(Integer i=1;i<accountList.size();i++){
			if(accountList[i].recordtypeid == LERecordTypeId)
	parentIdVsLEAccountMap.put(accountList[0].AccountNumber, accountList[i]);
		}
		
		GlobalConstants.isDefaultUpdated = true;
		Test.startTest();
		ChangeDefaultLegalEntity changeDefaultLE2 = new ChangeDefaultLegalEntity(parentIdVsLEAccountMap, accountListTemp);		
		QueueableContext context2;
		changeDefaultLE2.execute(context2);
 
		//exception creation
		ChangeDefaultLegalEntity changeDefaultLE1 = new ChangeDefaultLegalEntity(NULL, NULL);		
		QueueableContext context1;
		changeDefaultLE1.execute(context1);
		Test.stopTest();

		AccountTriggerHelper.validateLEDeactivation(NULL, NULL);
	}
	
		static testMethod void UnitTest10(){
		
		List<Account> accountList = new  List<Account>();
		List<String> accountListTemp = new  List<String>();
		Map<String, Account> parentIdVsLEAccountMap = new Map<String, Account>();
		Id LERecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Legal Entity').getRecordTypeId();
		Id custRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Customer').getRecordTypeId(); 
		accountList = TestDataFactory.createAccount(3);
		accountList[0].recordtypeid = custRecordTypeId;
		accountList[1].recordtypeid = LERecordTypeId;
		accountList[2].recordtypeid = LERecordTypeId;
		
		accountList[0].AccountNumber = '301000005';
		database.insert(accountList[0]); 
		accountList[1].parentid = accountList[0].id;
		accountList[1].AccountNumber = '1000087011';
		accountList[1].Active__c = true;
		database.insert(accountList[1]); 
		
		accountList[2].parentid = accountList[0].id;
		accountList[2].AccountNumber = '1000087012';
		accountList[2].Active__c = true;
		database.insert(accountList[2]); 

		for(Integer i=1;i<accountList.size();i++){
			accountListTemp.add(accountList[i].AccountNumber);
		}
		
		for(Integer i=1;i<accountList.size();i++){
			if(accountList[i].recordtypeid == LERecordTypeId)
	parentIdVsLEAccountMap.put(accountList[0].AccountNumber, accountList[i]);
		}
		
		accountList[1].Active__c = false;
		database.update(accountList[1]);
		
		Test.startTest();
		ChangeDefaultLegalEntity changeDefaultLE = new ChangeDefaultLegalEntity(parentIdVsLEAccountMap, accountListTemp);		
		QueueableContext context;
		changeDefaultLE.execute(context);
		Test.stopTest();

	}
	
		static testMethod void UnitTest11(){
	
		 List<Account> accountList = new  List<Account>();
		 List<Account> accountListTemp = new  List<Account>();
		 
		 ISO_Country_Codes__c isoCountryCode = new ISO_Country_Codes__c();
		 isoCountryCode.Name = 'IN'; 
		 isoCountryCode.Country_Name__c = 'India';
		 isoCountryCode.Market__c = 'Market India';
		 database.insert(isoCountryCode); 
		 
		 Id prospectRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Prospect').getRecordTypeId();
		 accountList = TestDataFactory.createAccount(1);
		 accountList[0].recordtypeid = prospectRecordTypeId;
		 accountList[0].BillingCountry = 'India';
		 accountList[0].BillingCountryCode = 'IN';
		 database.insert(accountList);
		 
		 AccountTriggerHandler.beforeOperation(accountList);
		 
		 for(Integer i=1;i<accountList.size();i++){
			accountListTemp.add(accountList[i]);
		}
		 
		 
		 AccountTriggerHandler.beforeOperation(accountListTemp);
		 AccountTriggerHandler.restrictEnablingPartner(accountListTemp);
	}
	
	static void accountOnwerChangeTest() {
		Id prospectRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Prospect').getRecordTypeId();
		List<Account> accountList = TestDataFactory.createAccount(1);
		accountList[0].recordtypeid = prospectRecordTypeId;
		accountList[0].BillingCountry = 'India';
		accountList[0].BillingCountryCode = 'IN';
		database.insert(accountList);
		List<User> userList = TestDataFactory.userCreation(1,'System Administrator');
		userList[0].Nokia_ID__c= '6777777666';
		Database.insert(userList);
		system.runAs(userList[0]) {
			accountList[0].ownerId = userList[0].Id;
			update accountList[0];
		}
	 }
	
	//added for test of NOKIASC-22869:Suniti
	public static testMethod void test12(){
	  
		Id accRecordTypeId=Schema.SObjectType.Account.getRecordTypeInfosByName().get('Prospect').getRecordTypeId();
		Id servRecordTypeId=Schema.SObjectType.ServiceContract.getRecordTypeInfosByName().get('CARE Service Contract').getRecordTypeId();
	Account acc = new Account();
		acc.RecordTypeId = accRecordTypeId;
		acc.name='test125';
		acc.BillingCountry='India';
		acc.BillingCity='Hyd';
		acc.BillingStreet='Hyd';
		acc.Customer_Compliance__c='';
		insert acc;	
		
		ServiceContract serContract1 =new ServiceContract();
		serContract1.RecordTypeId = servRecordTypeId;
		serContract1.AccountId = acc.id;
		serContract1.Name = 'TCS Service Contract TestData1';
		serContract1.CurrencyIsoCode='EUR';
		serContract1.CH_CDB_ContractId__c = '123456tes1t';
		serContract1.CH_CDB_PreviousContractId__c = '123456test';
		serContract1.StartDate = system.today();
		serContract1.EndDate = system.today()+10;
		serContract1.CH_CAPM_EmailAddress__c = 'cmmkp7777@nokia.com';
		serContract1.CH_PriceBook__c = 'Nokia CARE Price Book';
		insert serContract1;
		
		ServiceContract serContract2 =new ServiceContract();
		serContract2.RecordTypeId = servRecordTypeId;
		serContract2.AccountId = acc.id;
		serContract2.Name = 'TCS Service Contract TestData21';
		serContract2.CurrencyIsoCode='EUR';
		serContract2.CH_CDB_ContractId__c = '123456tes2u';
		serContract2.CH_CDB_PreviousContractId__c = '1234567test2';
		serContract2.StartDate = system.today();
		serContract2.EndDate = system.today()+10;
		serContract2.CH_CAPM_EmailAddress__c = 'cmmkp7777@nokia.com';
		serContract2.CH_PriceBook__c = 'Nokia CARE Price Book';
		insert serContract2;
	
		CH_SecurityGroups__c SecurityGroup = new CH_SecurityGroups__c();
		SecurityGroup.GroupName__c='SEC_Cox';
		SecurityGroup.CH_CustomerCompliance__c='US_Cox';
		SecurityGroup.Name = '10';
		SecurityGroup.GroupId__c='00G410000034hrLEAQ';
		insert SecurityGroup;
		
		CH_SecurityGroups__c SecurityGrop1 = new CH_SecurityGroups__c();
		SecurityGrop1.GroupName__c='SEC_Cox';
		SecurityGrop1.CH_CustomerCompliance__c='OTHER';
		SecurityGrop1.Name = '1234';
		SecurityGrop1.GroupId__c='00G410000034hrLEAQ';
		insert SecurityGrop1;
		
		Group GroupName = new Group();
		GroupName.DeveloperName='SEC_Cox1';
		GroupName.Name='SEC|Cox|||';
		insert GroupName;
		
		User internalUser = NCP_TestFactory.createInternalUser('internal test', 'test1@nokia.com.dev');
		insert internalUser;
		
		ServiceContractShare oContractShare = new ServiceContractShare();	
		oContractShare.AccessLevel = 'Read';	
		oContractShare.ParentId = serContract1.Id;
		oContractShare.UserOrGroupId = internalUser.Id;	
		insert oContractShare;
		
		Test.startTest();
		 
		acc.Customer_Compliance__c='US_Sprint';
		update acc;
		
		ServiceContractShare deletedShare = [SELECT Id, IsDeleted FROM ServiceContractShare WHERE Id = :oContractShare.Id LIMIT 1];
			System.assertEquals(deletedShare.IsDeleted, false);
		
		ServiceContractShare oContractShare2 = new ServiceContractShare();
		oContractShare2.AccessLevel = 'Read';
		oContractShare2.ParentId = serContract2.Id;
		oContractShare2.UserOrGroupId = internalUser.Id;	
		insert oContractShare2;
		
		Test.stopTest();
	}
   
}