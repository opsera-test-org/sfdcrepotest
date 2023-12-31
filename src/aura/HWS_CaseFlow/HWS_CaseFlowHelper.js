({
    showWaiting: function(cmp) {
        cmp.set("v.IsSpinner", true);
    },
    hideWaiting: function(cmp) {
        cmp.set("v.IsSpinner", false);
    },
    clearChild : function(component, event){
        component.set("v.newChildCase",{'sobjectType':'Case',
                                        'HWS_Site_ID__c':'',
                                        'HWS_Replacement_Unit_Serial_Number__c':'',
                                        'HWS_Fault_Reported_By_Name__c':'',
                                        'HWS_Faulty_Serial_Number__c':'',
                                        'HWS_Failure_Occurance__c':'',
                                        'HWS_Failure_Detection__c':'',
                                        'HWS_Site_Information__c':'',
                                        'HWS_Fault_Reported_By_Phone__c':'',
                                        'HWS_Fault_Reported_By_Email__c':'',
                                        'HWS_Customer_Reference_Number__c':'',
                                        'HWS_Failure_Description__c':'',
                                        'HWS_Quantity__c':'',
                                        'HWS_Failure_Detection_Date__c':'',
                                        'HWS_Requested_Delivery_Date_Time__c':null,
                                        'HWS_Planned_Delivery_Date__c':null,
                                        'HWS_Failure_Description_Server_ID__c':''});
        //component.set("v.PartCode",'');
        component.set("v.CustPartrevison",'');
    },
    clearParent : function(component, event){
        component.set("v.newParentCase",{'sobjectType':'Case',
                                         'HWS_Site_ID__c':'',
                                         'HWS_Replacement_Unit_Serial_Number__c':'',
                                         'HWS_Fault_Reported_By_Name__c':'',
                                         'HWS_Faulty_Serial_Number__c':'',
                                         'HWS_Communication_Contact__c':'',
                                         'Hws_Ship_to_Party_Address__c':'',
                                         'HWS_Site_Information__c':'',
                                         'HWS_Fault_Reported_By_Phone__c':'',
                                         'HWS_Fault_Reported_By_Email__c':'',
                                         'HWS_Customer_Reference_Number__c':'',
                                         'HWS_Failure_Description__c':'',
                                         'HWS_ShipmentRecipientEmailId__c':'',
                                         'HWS_Failure_Description_Server_ID__c':''});
        component.set('v.ShiptopartyAddress','');
        component.set('v.communicationContact','');
    },
    getFailureOccurrencePickListValues : function(component, event) {
        
        var action = component.get("c.getPickListValues1");
        action.setParams({ obj:"Case",str:"HWS_Failure_Occurance__c"});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var stringItems = response.getReturnValue();
                
                component.set("v.FailureOccurance", stringItems); 
            }
        });
        $A.enqueueAction(action);
    },
    getFailureDetectionPickListValues : function(component, event) {
        
        var action = component.get("c.getPickListValues1");
        action.setParams({ obj:"Case",str:"HWS_Failure_Detection__c"});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var stringItems = response.getReturnValue();
                
                component.set("v.FailureDetection", stringItems); 
            }
        });
        $A.enqueueAction(action);
    },
    getFailureDescriptionPickListValues : function(component, event) {
        
        var action = component.get("c.getPickListValues1");
        action.setParams({ obj:"Case",str:"HWS_Failure_Description__c"});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var stringItems = response.getReturnValue();
                
                component.set("v.FailureDescription", stringItems); 
            }
        });
        $A.enqueueAction(action);
    },   
    //Helper method to display the error toast message
    showToast : function(type,title,message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : title,
            message: message,
            duration:'10000',
            key: 'info_alt',
            type: type,
            mode: 'dismissible'
        });
        toastEvent.fire(); 
    },  
    getEmailValidation : function(component,event){
        
        var emailField = component.find('reportEmail');
        var validation = false;
        var emailValue = component.find('reportEmail').get('v.value');
        validation = this.emailValidation(emailValue);
        if(!validation){
            emailField.setCustomValidity('Please Enter Valid Emial Id'); //do not get any message
            emailField.reportValidity();
        }
        return validation;
    },
    emailValidation  : function(emailValue){
        
        var regExpEmailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;          
        var validation = false;
        if(regExpEmailformat.test(emailValue) || emailValue == undefined || emailValue == '' ){
            validation = true; 
        }else{
            validation = false;
        }
        return validation;
    },
    getPhoneValidation : function(component,event){
        
        var phoneField = component.find('reportPhone'); 
        var validation = false;
        var phoneValue = phoneField.get('v.value');
        validation = this.phoneValidation(phoneValue);
        if(!validation){
            phoneField.setCustomValidity('Please enter valid Phone number. Phone number should only contain digits(ex: +XXX XX XXXX, XXXXXXXXXX)'); //do not get any message
            phoneField.reportValidity();
        }
        return validation;
    },
    phoneValidation : function(phoneValue){
        
        var regExpEmailformat = /^[+]*[\s0-9]*$/;
        var validation = false;
        if(regExpEmailformat.test(phoneValue) || phoneValue == undefined || phoneValue ==''){
            validation = true; 
        }else{
            validation = false;
        }
        return validation;
    },
    gotoSearchScreen: function(component, event, helper) {
        
        var rows = component.get("v.selectedAccount");
        if(rows!=null && rows!='' && rows!=undefined){
            component.set("v.StageNumber", 2);
            var Cli=component.get("v.selectedclis");
            var Asset=component.get("v.selectedAssets");
            var Acc=component.get("v.selectedAccount");
            var selAcc=JSON.parse(JSON.stringify(Acc[0]));
            var oldAcc = component.get("v.oldSelectedAccount");
            var showAssets = component.get("v.showAssets");
            var showCli = component.get("v.showClis");
            if(selAcc.Id==oldAcc){
                var searchCriteria =component.get("v.searchCriteria");
                var searchType=component.find("InputSelectSingle");
                searchType.set("v.value",searchCriteria);
                if(Asset!=null && Asset!='' && Asset!=undefined && showAssets=='true'){
                    
                    var dTable = component.find("cliTable");
                    var selectedAcc = dTable.getSelectedRows();
                    var selectedAcc = component.get("v.selectedAssets");
                    if (typeof selectedAcc != 'undefined' && selectedAcc) {
                        var selectedRowsIds = [];
                        for(var i=0;i<selectedAcc.length;i++){
                            selectedRowsIds.push(selectedAcc[i].Id);  
                        }         
                        var dTable = component.find("cliTable");
                        dTable.set("v.selectedRows", selectedRowsIds);
                    }
                    
                }
                if((Cli!=null && Cli!='' && Cli!=undefined) && showCli=='true'){
                    
                    var dTable = component.find("conTable");
                    var selectedAcc = dTable.getSelectedRows();
                    var selectedAcc = component.get("v.selectedclis");
                    if (typeof selectedAcc != 'undefined' && selectedAcc) {
                        var selectedRowsIds = [];
                        for(var i=0;i<selectedAcc.length;i++){
                            selectedRowsIds.push(selectedAcc[i].Id);  
                        }         
                        var dTable = component.find("conTable");
                        dTable.set("v.selectedRows", selectedRowsIds);
                    }
                    
                }
            }else{
                component.set("v.showParentEntS",false);//HIDE ENTITLEMENT IF ACC IS CHANGED
                component.set("v.showLineEntS",false);//HIDE ENTITLEMENT IF ACC IS CHANGED
                component.set("v.isADFDescription",false);//HIDE COMMENTS IF ACC IS CHANGED
                component.set("v.Assets", null);
                component.set("v.AllAssets", null);
                component.set("v.selectedAssets", null);
                component.set("v.clis", null);
                component.set("v.ALLclis", null);
                component.set("v.selectedclis", null);
                component.set("v.selectedVersions", null);
                component.set("v.versionItems", null);
                component.set("v.searchKeyword",'');
                component.set("v.contractNumber",'');
                component.set("v.serviceType",'');
                component.set("v.showStep6",false);
                component.set("v.showAssets",false);
                component.set("v.showClis",false);
                component.set("v.searchCriteria",'Part Code');
                if(oldAcc!=null && oldAcc!='' && oldAcc!=undefined){
                    this.clearChild(component,event);
                    this.clearParent(component,event);
                }
            }
            
        }else{
            this.showToast('error','Error Message','Please select Account before proceeding');
        }
        var today = new Date();
        component.set('v.newChildCase.HWS_Planned_Delivery_Date__c', today);
    },
    requestDateChangeValidate : function(component, event){
        var reqVal = false;
        var planedDate = component.get('v.newChildCase.HWS_Planned_Delivery_Date__c');
        var requestedDate = component.get('v.newChildCase.HWS_Requested_Delivery_Date_Time__c');
        if(new Date(planedDate) > new Date(requestedDate) && requestedDate != null){
            component.set("v.dateValidationError" , true);
            reqVal = false; 
        }else{
            component.set("v.dateValidationError" , false);
            reqVal = true; 
        }
        return reqVal;
    }, 
    getplannedDeliveryDateTime : function(component, event){
        /*var selectedAsset = component.get("v.selectedAssets");
        var action = component.get("c.plannedDeliveryDateTime");
        var businesshours = selectedAsset[0].HWS_ContractLineItem__r.CH_BusinessHour__c;
        var leadTimeUnit = selectedAsset[0].HWS_ContractLeadTimeUnit__c;
        var leadTimeDuration = selectedAsset[0].HWS_ContractLeadTimeDuration__c;
        var specifiedTime = selectedAsset[0].HWS_SpecifiedDeliveryTargetTime__c;
        //alert('specifiedTime'+specifiedTime);
        var byPassPlannedDate = component.get("v.byPassDate");
        //console.log('##### bypass'+byPassPlannedDate);
        action.setParams({ businessHrsId : businesshours,
                          leadTimeUnit : leadTimeUnit,
                          leadTimeDuration : leadTimeDuration,
                          byPassPlannedDate: byPassPlannedDate,
                          specifiedTime : specifiedTime
                         });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var stringItems = response.getReturnValue();
                //alert('stringItems'+stringItems);
                //var userLocalDateTime = stringItems[1];
                var date = new Date(stringItems);
                component.set("v.newChildCase.HWS_Planned_Delivery_Date__c",date);
                component.set("v.plannedDateTime",date);
            }
        });
        $A.enqueueAction(action);*/
        //Added By Ajesh 
        var listChildCases = component.get("v.childCases");
        var selectedAccount = component.get('v.ShiptopartyAddress');
        //alert('listChildCases**'+listChildCases);
        //alert('selectedAccount**'+selectedAccount);
        var action = component.get("c.accountTimeZoneplannedDeliveryDateTime");
        action.setParams({ listChildCases : listChildCases,
                          selectedAccount : selectedAccount
                         });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var stringItems = response.getReturnValue();                
                var st = [];
                st.push(stringItems.newTimeZoneCaseList);
                //component.set("v.childCases",st[0]);
                var st1 = [];
                st1.push(stringItems.bhTimeZone);
                console.log('SSSSTT:'+st1[0]);
                component.set("v.deliveryTimeZone",st1[0]);
                var listChildCasetimeZone = st[0];
                for(var i=0; i<listChildCasetimeZone.length; i++){
                    var countryTime = listChildCasetimeZone[i].HWS_PlannedDeliveryDateShipment__c;
                    countryTime = new Date(countryTime);
                    var counteryDateOnly = $A.localizationService.formatDate(countryTime); 
                	counteryDateOnly = counteryDateOnly.replace(/[\/\\.-]/g, ' ');
                	var counteryTimeOnly = $A.localizationService.formatTime(countryTime);
                	var hours = countryTime.getHours();
                	var minutes = countryTime.getMinutes();
                	var ampm = hours >= 12 ? 'pm' : 'am';
                    if(counteryTimeOnly.includes("AM") || counteryTimeOnly.includes("PM")){
                        ampm = hours >= 12 ? 'PM' : 'AM';
                    }
                	hours = hours % 12;
                	hours = hours ? hours : 12; // the hour '0' should be '12'
               		minutes = minutes < 10 ? '0'+minutes : minutes;
                	var strTime = hours + ':' + minutes + ' ' + ampm; 
                	listChildCasetimeZone[i].HWS_PlannedDeliveryDateShipment__c = counteryDateOnly +', ' + strTime+' ( '+listChildCasetimeZone[i].HWS_Delivery_TimeZone__c+ ' )';
                    console.log('listChildCasetimeZone[i].HWS_PlannedDeliveryDateShipment__c:'+listChildCasetimeZone[i].HWS_PlannedDeliveryDateShipment__c);
                    
                }
                component.set("v.childCases",listChildCasetimeZone);
                console.log('listChildCasetimeZone:'+JSON.stringify(listChildCasetimeZone));
            }
        });
        $A.enqueueAction(action);
    },
    getServiceContracts: function(component, event, helper){
        component.set("v.IsSpinner", true);
        component.set("v.showParentEntS",false);//Hide Entitlements while searching
        component.set("v.showLineEntS",false);//Hide Entitlements while searching
        var selectedRows = component.get("v.selectedAccount");
        var searchCriteria =component.get("v.searchCriteria");
        var searchValue = component.get("v.searchKeyword");
        if(searchValue==undefined || searchValue=='' || searchValue.length<3){
            this.showToast('Warning','Warning Message','Please enter minimum 3 characters');
            this.hideWaiting(component);
            component.set("v.Assets", null);
            component.set("v.AllAssets", null);
            component.set("v.clis",null);
            component.set("v.ALLclis",null);
            component.set("v.selectedAssets",null);
            component.set("v.selectedclis",null);
        }else{
            if(searchCriteria=='Part Code'){
                component.set("v.showAssets","true");
                component.set("v.showClis","false");
                component.set("v.showStep6","false");
                //NOKIASC-25686 Reordered all the columns
                component.set('v.assetColumns', [
                    {label: 'Part Code', fieldName: 'HWS_Part_Code__c', type: 'text',"initialWidth": 150},
                    {label: 'Description', fieldName: 'HWS_Product_Name__c', type: 'text',"initialWidth": 310},
                    {label: 'Product Name', fieldName: 'HWS_High_Level_Product_Name__c', type: 'text',"initialWidth": 310},
                    {label: 'Service Item Description', fieldName: 'HWS_ServiceItemDescription__c', type: 'text',"initialWidth": 200},
                    {label: 'Service Type', fieldName: 'HWS_Service_Type__c', type: 'text',"initialWidth": 200},
                    //NOKIASC-25659
                    {label: 'NEA Count', fieldName: 'CoveredNetworkElementCount', type: 'text',"initialWidth": 80},
                    //NOKIASC-25677
                    {label: 'Country', fieldName: 'CountryName', type: 'text',"initialWidth": 80},
                    {label: 'SLA Value', fieldName: 'HWS_ContractLeadTimeDuration__c', type: 'text',"initialWidth": 105},
                    {label: 'SLA Unit', fieldName: 'HWS_ContractLeadTimeUnit__c', type: 'text',"initialWidth": 100},
                    {label: 'Contract Number', fieldName: 'HWS_Service_Contract_Number__c', type: 'text',"initialWidth": 165},
                    {label: 'Price', fieldName: 'HWS_Price__c', type: 'text',"initialWidth": 80},
                    {label: 'Currency', fieldName: 'HWS_Currency__c', type: 'text',"initialWidth": 105},
                    
                ]); 
                    //3697 - passing contactId
                    var action = component.get('c.getContractlineItems');
                    action.setParams({
                    listAccounts : selectedRows,
                    searchValue : searchValue,
                    serviceType : component.get("v.serviceType"),
                    contractNumber : component.get("v.contractNumber"),
                    country : component.get("v.serviceContractCountry"), 
                    contactId : component.get("v.recordId")
                    });
                    action.setCallback(this, $A.getCallback(function (response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                    component.set("v.IsSpinner", false);
                    var mapContact = new Map();
                    mapContact = response.getReturnValue();
                    console.log('#### return value'+JSON.stringify(mapContact));
                    if(!Object.keys(mapContact).includes("No Error")){
                    component.set("v.Assets", null);
                    component.set("v.AllAssets", null);
                    component.set("v.selectedAssets",null);
                    var Asset = component.get("v.Assets");
                    console.log('Asset '+Asset);
                    if(Object.keys(mapContact).includes("Error Message1")){
                    this.showToast('error','Error Message',$A.get("$Label.c.HWS_Case_flow_incorrect_part_code_error_message"));
                    }
                    else if(Object.keys(mapContact).includes("Error Message2")){
                    this.showToast('error','Error Message',$A.get("$Label.c.HWS_Case_flow_part_code_inactive_error_message"));
                    }
                    else if(Object.keys(mapContact).includes("Error Message3")){
                    this.showToast('error','Error Message',$A.get("$Label.c.HWS_Case_flow_part_code_not_found_error_message	"));
                    }
                    }else{
                    // NOKIASC-25659, 25677 added to get lookup field in a string to display country and Nea count fields in the data table after search
                    var Assets = mapContact["No Error"];
					var QuantityNEA;
                              for (var i = 0; i < Assets.length; i++) {
                    var row = Assets[i];
                    var country = row.HWS_ContractLineItem__r.CH_CountryISOName__c;
					if(row.HWS_ContractLineItem__r.CH_CountryISOName__c != undefined && row.HWS_ContractLineItem__r.CH_CountryISOName__c != null && row.HWS_ContractLineItem__r.CH_CountryISOName__c != ''){
                        var country = row.HWS_ContractLineItem__r.CH_CountryISOName__c;
                        row.CountryName = country.toString();
                    }
                    
                    QuantityNEA = row.HWS_ContractLineItem__r.CH_QtyCoveredNetworkElementAssets__c;
                    row.CoveredNetworkElementCount = QuantityNEA.toString();
                    // NOKIASC-25661 to enable Select NEA button checking count
                    var nea = row.CoveredNetworkElementCount > 0 ;
                    if(QuantityNEA > 0){
                        console.log('NEAB:' + row.CoveredNetworkElementCount);
                        component.set("v.enableSelectNEA" , false);
                    }
					                   
                }
                // Ending changes NOKIASC-25659 , 25677
                if(Assets.length>0){
                    component.set("v.Assets", null);
                    component.set("v.AllAssets", null);
                    component.set("v.selectedAssets",null);
                }
                
                component.set("v.Assets", mapContact["No Error"]);
                component.set("v.AllAssets", mapContact["No Error"]);
                component.set("v.clearNEAAssets", mapContact["No Error"]);
            }
        }
    }));
    $A.enqueueAction(action);
}
 
 if(searchCriteria=='Contract Number'){
    component.set("v.showClis","true");
    component.set("v.showAssets","false");
    component.set("v.showStep6","true");
    component.set('v.CLIColumns', [
        {label: 'Contract Number', fieldName: 'HWS_ServiceContractNumber__c', type: 'text'},
        //NOkiasc-25659
        {label: 'NEA Count', fieldName: 'CoveredNetworkElementCount', type: 'text'},
        {label: 'Contract Description', fieldName: 'HWS_ServiceContractName__c', type: 'text'},
        {label: 'Service Type', fieldName: 'CH_ServiceType__c', type: 'text'}
    ]);
    //3697 - passing contactId
    var action = component.get('c.getServiceContracts');
    action.setParams({
        selectedAccounts : selectedRows,
        searchString : searchValue,
        serviceType : component.get("v.serviceType"),
        selectedContractNumber : component.get("v.selectedContractNumber"),
        contactId : component.get("v.recordId")
    });
    action.setCallback(this, $A.getCallback(function (response) {
        var state = response.getState();
        if (state === "SUCCESS") {
            component.set("v.IsSpinner", false);
            var mapContact = new Map();
            mapContact = response.getReturnValue();
            if(!Object.keys(mapContact).includes("No Error")){
                component.set("v.clis",null);
                component.set("v.ALLclis",null);
                component.set("v.showStep6",false);
                component.set("v.selectedclis",null);
                if(Object.keys(mapContact).includes("Error Message1")){
                    this.showToast('error','Error Message',$A.get("$Label.c.HWS_Case_flow_contract_inactive_error_message"));
                }
                else if(Object.keys(mapContact).includes("Error Message2")){
                    this.showToast('error','Error Message',$A.get("$Label.c.HWS_Case_flow_incorrect_part_code_error_message"));
                }
                    else if(Object.keys(mapContact).includes("Error Message3")){
                        
                        this.showToast('error','Error Message',$A.get("$Label.c.HWS_Case_flow_add_part_error_message"));
                    }
            }else{
                component.set("v.clis",null);
                component.set("v.ALLclis",null);
                component.set("v.showStep6",true);
                component.set("v.selectedclis",null);
                component.set("v.clis", mapContact["No Error"]);
                component.set("v.ALLclis", mapContact["No Error"]);
                // NOKIASC-25659 added to get lookup field in a string to display country and Nea count fields in the data table after search
                var clis = mapContact["No Error"];
                var QuantityNEA;
                              for (var i = 0; i < clis.length; i++) {
                    var row = clis[i];
                   QuantityNEA = row.CH_QtyCoveredNetworkElementAssets__c;
                    row.CoveredNetworkElementCount = QuantityNEA.toString();
                    // NOKIASC-25661 to enable Select NEA button checking count
                    var nea = row.CoveredNetworkElementCount > 0 ;
                    if(QuantityNEA > 0){
                        component.set("v.enableSelectNEA" , false);
                    }
					                   
                }
                // NOKIASC-25659 changes end
                component.set("v.clis", clis);
                component.set("v.ALLclis", clis);
                component.set("v.clearNEACLIS", clis);
            }
        }
    }));$A.enqueueAction(action);
}
}
},
    getVersionItems: function(component, event, helper) {
        console.log('SELECTED NEAS:'+component.get('v.selectedNEA'));
        console.log('Stage NUmber'+component.get('v.StageNumber'));
        var rows = component.get("v.selectedAssets");
        // var searchCode = component.get("v.searchKeyword");
        if(rows!=null && rows!='' && rows!=undefined){
            component.set("v.StageNumber", 3);
            var selectedRows = component.get("v.selectedAssets");
            var searchCriteria =component.get("v.searchCriteria");
            var searchCode = component.get("v.searchKeyword");
            if(searchCriteria == 'Contract Number'){
                searchCode = null;
            }            
            var action = component.get('c.getVersions');
            console.log('-hlpr 415-action--'+action);
            action.setParams({
                listServiceServiceCon : selectedRows,
                searchValue : searchCode
            });
            action.setCallback(this, $A.getCallback(function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.versionItems", response.getReturnValue());
                    component.set("v.AllversionItems", response.getReturnValue());
                    
					let responseLength = response.getReturnValue();
                    if(responseLength.length == 1){
                        component.set("v.selectedVersionstep3",true);
                        component.set("v.newChildAddPart",false);
                    }
					
                    //start HWST-4189
                    console.log('-426 --hlpr----'+component.get("v.versionItems"));
                    var versionItems = component.get("v.versionItems");
                    var regExpr = /[^a-zA-Z0-9]/g;                    
                    var captureSearchVal = component.get("v.searchKeyword").toUpperCase();                   
                    var searchVal = component.get("v.searchKeyword").replace(regExpr, '').toUpperCase();            
                    var sfdcPartCode = component.get("v.ProductCode");                    
                    var partCod = null;
                    if(sfdcPartCode != null && sfdcPartCode != undefined){						
                        partCod = sfdcPartCode.replace(regExpr, '').toUpperCase();                      
                    }
                    if(searchVal != null && partCod != null && searchVal != undefined && partCod != undefined && searchVal.length > partCod.length){					
                        var partRev = searchVal.replace(partCod,'');
                        //HWS-4187
                        var exactPartRev = null;
                        if(sfdcPartCode != null && sfdcPartCode != undefined){
                            exactPartRev = captureSearchVal.replace(sfdcPartCode.toUpperCase(),'');                            
                        }
                        
                        var dTable = component.find("vItems");						
                        var selectedAcc = component.get("v.AllversionItems");                    
                        var selectedRowsIds = [];
                        var viId = '';                                             
                        if (selectedAcc!= null && selectedAcc!= '' && selectedAcc != undefined && selectedAcc) { 
                            var isExist = false;
                            for(var i=0;i<selectedAcc.length;i++){
                                if(selectedAcc[i].HWS_Version_Code__c.toUpperCase() === exactPartRev ){
                                    viId = selectedAcc[i].Id;
                                    component.set("v.selectedVersions", selectedAcc[i]);
                                    component.set("v.newChildCase.HWS_Stockable_Product__c", selectedAcc[i].Id);
                                    component.set("v.CustPartrevison", selectedAcc[i].HWS_Version_Code__c);
                                    component.set("v.newChildCase.HWS_Customer_Part_Revision__c", "");	
									//25689
									component.set("v.newChildCase.Street_Address_1__c",selectedAcc[i].HWS_Version_Code__c);
                                    isExist = true;
                                }
                                if(selectedAcc[i].HWS_Version_Code__c.toUpperCase() === captureSearchVal){									
                                    viId = selectedAcc[i].Id;
                                    component.set("v.selectedVersions", selectedAcc[i]);
                                    component.set("v.newChildCase.HWS_Stockable_Product__c", selectedAcc[i].Id);
                                    component.set("v.CustPartrevison", selectedAcc[i].HWS_Version_Code__c);
                                    component.set("v.newChildCase.HWS_Customer_Part_Revision__c", "");
									//25689
									component.set("v.newChildCase.Street_Address_1__c",selectedAcc[i].HWS_Version_Code__c);
                                    isExist = true;
                                }
                                if(selectedAcc[i].HWS_Part_Code_Part_Revision__c != null && selectedAcc[i].HWS_Part_Code_Part_Revision__c != undefined && selectedAcc[i].HWS_Part_Code_Part_Revision__c.toUpperCase() === searchVal ){									
                                    viId = selectedAcc[i].Id;
                                    component.set("v.selectedVersions", selectedAcc[i]);
                                    component.set("v.newChildCase.HWS_Stockable_Product__c", selectedAcc[i].Id);
                                    component.set("v.CustPartrevison", selectedAcc[i].HWS_Version_Code__c);
                                    component.set("v.newChildCase.HWS_Customer_Part_Revision__c", "");
									//25689
									component.set("v.newChildCase.Street_Address_1__c",selectedAcc[i].HWS_Version_Code__c);
                                    isExist = true;
                                }
                                else if(isExist ===false && selectedAcc[i].HWS_Version_Code__c.toUpperCase() === 'ANY' && searchVal.includes(partCod)){									
                                    // start 4190
                                    
                                    if (exactPartRev.indexOf("-") == 0 || exactPartRev.indexOf(".") == 0 || exactPartRev.indexOf(":") == 0 || exactPartRev.indexOf("/") == 0 || exactPartRev.indexOf(",") == 0)
                                    {									  
                                        exactPartRev = exactPartRev.slice(1);
                                        if(exactPartRev.indexOf("-") == 0){        
                                            exactPartRev = exactPartRev.slice(1);
                                        }									  
                                    }                                   
                                    component.set("v.CustPartrevison", exactPartRev);
                                    component.set("v.newChildCase.HWS_Customer_Part_Revision__c", exactPartRev);
                                    viId = selectedAcc[i].Id;
                                    component.set("v.selectedVersions", selectedAcc[i]);
                                    component.set("v.newChildCase.HWS_Stockable_Product__c", selectedAcc[i].Id);
									//25689
									component.set("v.newChildCase.Street_Address_1__c",selectedAcc[i].HWS_Version_Code__c);
                                }
                                
                            } 
                            selectedRowsIds.push(viId);   
                            var dTable = component.find("vItems");                            
                            if(dTable != null && dTable != '' && dTable != undefined){
                                dTable.set("v.selectedRows", selectedRowsIds);								
                            }
                            
                        }						
                    }                   
                    if(searchVal != null && partCod != null && searchVal != undefined && partCod != undefined && searchVal === partCod){
                        
                        var dTable = component.find("vItems");						
                        var selectedAcc = component.get("v.AllversionItems");                    
                        var selectedRowsIds = [];
                        var viId = null;
                        if (selectedAcc!= null && selectedAcc!= '' && selectedAcc != undefined && selectedAcc) {
                            var isExist = false;
                            for(var i=0;i<selectedAcc.length;i++){								
                                if(selectedAcc[i].HWS_Version_Code__c.toUpperCase() === captureSearchVal){									
                                    viId = selectedAcc[i].Id;
                                    component.set("v.selectedVersions", selectedAcc[i]);
                                    component.set("v.newChildCase.HWS_Stockable_Product__c", selectedAcc[i].Id);
                                    component.set("v.CustPartrevison", selectedAcc[i].HWS_Version_Code__c);
                                    component.set("v.newChildCase.HWS_Customer_Part_Revision__c", "");
									//25689
									component.set("v.newChildCase.Street_Address_1__c",selectedAcc[i].HWS_Version_Code__c);
                                    
                                }                                
                                if(selectedAcc[i].HWS_Part_Code_Part_Revision__c != null && selectedAcc[i].HWS_Part_Code_Part_Revision__c != undefined && selectedAcc[i].HWS_Part_Code_Part_Revision__c.toUpperCase() === searchVal ){									
                                    viId = selectedAcc[i].Id;
                                    component.set("v.selectedVersions", selectedAcc[i]);
                                    component.set("v.newChildCase.HWS_Stockable_Product__c", selectedAcc[i].Id);
                                    component.set("v.CustPartrevison", selectedAcc[i].HWS_Version_Code__c);
                                    component.set("v.newChildCase.HWS_Customer_Part_Revision__c", "");
									//25689
									component.set("v.newChildCase.Street_Address_1__c",selectedAcc[i].HWS_Version_Code__c);
                                    
                                }
                            } 
                            if(viId != null){
                                selectedRowsIds.push(viId);   
                                var dTable = component.find("vItems");								
                                if(dTable != null && dTable != '' && dTable != undefined){
                                    dTable.set("v.selectedRows", selectedRowsIds);                                    
                                }
                            }
                            
                        }	
                    }
                    //End HWST-4189
                    //Start HWST-4191
                    
                    if((versionItems!=null && versionItems!='' && versionItems != undefined) && versionItems.length === 1){
						component.set("v.enableVi" , false);
                        var dTable = component.find("vItems");						
                        if(dTable != null && dTable != '' && dTable != undefined){
                            var selectedAcc = dTable.getSelectedRows();
                        }
                        var selectedAcc = component.get("v.AllversionItems");  
                        
                        var selectedRowsIds = [];
                        component.set("v.selectedVersions", selectedAcc[0]);
                        component.set("v.newChildCase.HWS_Stockable_Product__c", selectedAcc[0].Id);
						//25689
						component.set("v.newChildCase.Street_Address_1__c",selectedAcc[0].HWS_Version_Code__c);
                        selectedRowsIds.push(selectedAcc[0].Id);   
                        var dTable = component.find("vItems");							
                        if(dTable != null && dTable != '' && dTable != undefined){
                            dTable.set("v.selectedRows", selectedRowsIds);                            
                        }
                    }
                    //End HWST-4191
                    
                }
            }));
            $A.enqueueAction(action);
            
            var versions= component.get("v.selectedVersions");
            var selAsset=JSON.parse(JSON.stringify(rows[0]));
            
            var oldAsset = component.get("v.oldSelectedAssets");
            if(selAsset.Id==oldAsset){
                if(versions!=null && versions!='' && versions!=undefined){
                    
                    var dTable = component.find("vItems");					
                    if(dTable != null && dTable != '' && dTable != undefined){
                        var selectedAcc = dTable.getSelectedRows();
                    }
                    var selectedAcc = component.get("v.selectedVersions");
                    if (typeof selectedAcc != 'undefined' && selectedAcc) {
                        var selectedRowsIds = [];
                        for(var i=0;i<selectedAcc.length;i++){
                            selectedRowsIds.push(selectedAcc[i].Id);  
                        }         
                        var dTable = component.find("vItems");						
                        if(dTable != null && dTable != '' && dTable != undefined){
                            dTable.set("v.selectedRows", selectedRowsIds);
                        }
                    }
                }
            }else{
                component.set("v.versionItems", null);
                component.set("v.AllversionItems", null);
                component.set("v.selectedVersions", null);
            }
        }
        else{
            var clis = component.get("v.clis");
            if(clis != null && clis != '' && clis != undefined){
                component.set("v.SelectConNum",false);
                component.set("v.selectedAssetstep2",true);
                component.set("v.selectedLineItemstep2",true);
                component.set("v.ContProgressBarCounter" ,2);
                component.set("v.ContNEAProgressBarCounter" ,3);
                
            }
            else
            {
                component.set("v.selectedAssetstep2",false);
                component.set("v.selectedLineItemstep2",false);
                component.set("v.ProgressBarCounter" ,1);
            }
        }
    },
        getSellableItems: function(component,event,helper){
            
            var rows = component.get("v.selectedclis");
            if(rows!=null && rows!='' && rows!=undefined){
                component.set("v.StageNumber", 6);
                var selectedRows = component.get("v.selectedclis");
                component.set('v.assetColumns', [
                    {label: 'Service Type', fieldName: 'HWS_Service_Type__c', type: 'text'},
                    {label: 'Service Item Code', fieldName: 'HWS_ServiceItemCode__c', type: 'text',"initialWidth": 200},
                    {label: 'Service Item Description', fieldName: 'HWS_ServiceItemDescription__c', type: 'text',"initialWidth": 200},
                    {label: 'SLA Value', fieldName: 'HWS_ContractLeadTimeDuration__c', type: 'text'},
                    {label: 'SLA Unit', fieldName: 'HWS_ContractLeadTimeUnit__c', type: 'text'},
                    {label: 'Contract Number', fieldName: 'HWS_Service_Contract_Number__c', type: 'text'},
                    {label: 'Hour of the day', fieldName: 'HWS_SpecifiedDeliveryTargetTime__c', type: 'text',"initialWidth": 150},
                    //HWST-3669 - added High Level Product Name column
                    {label: 'Product Name', fieldName: 'HWS_High_Level_Product_Name__c', type: 'text',"initialWidth": 310},
                    {label: 'Part Code', fieldName: 'HWS_Part_Code__c', type: 'text'},
                    {label: 'Currency', fieldName: 'HWS_Currency__c', type: 'text',"initialWidth": 105},
                    {label: 'Price', fieldName: 'HWS_Price__c', type: 'text',"initialWidth": 80},
                    {label: 'Description', fieldName: 'HWS_Product_Name__c', type: 'text'}
                ]);
                var action = component.get('c.getCLIOfServiceContracts');
                action.setParams({
                    selectedServiceContracts : rows
                });
                action.setCallback(this, $A.getCallback(function (response) {
                    var state = response.getState();
                    if (state === "SUCCESS"){
                        component.set("v.Assets", response.getReturnValue());
                        component.set("v.AllAssets", response.getReturnValue());
                    } 
                }));
                $A.enqueueAction(action);
                var Assets= component.get("v.selectedAssets");
                var selCli=JSON.parse(JSON.stringify(rows[0]));
                var oldCli = component.get("v.oldSelectedclis");
                var showClis = component.get("v.showClis");
                if(selCli.Id==oldCli){
                    if(Assets!=null && Assets!='' && Assets!=undefined){
                        //var dTable = component.find("assetTable");
                        //var selectedAcc = dTable.getSelectedRows();
                        var selectedAcc = component.get("v.selectedAssets");
                        if (typeof selectedAcc != 'undefined' && selectedAcc) {
                            var selectedRowsIds = [];
                            for(var i=0;i<selectedAcc.length;i++){
                                selectedRowsIds.push(selectedAcc[i].Id);  
                            }         
                            var dTable = component.find("assetTable");
                            dTable.set("v.selectedRows", selectedRowsIds);
                        }
                    }
                }else{
                    component.set("v.Assets", null);
                    // component.set("v.AllAssets", null);
                    component.set("v.selectedAssets", null);
                    component.set("v.versionItems", null);
                    component.set("v.selectedVersions", null);
                }
            }else{
                this.showToast('error','Error Message','Please select Service Contract before proceeding or Click on "Select NEA" button to Proceed'); 
                component.set("v.SelectConNum",false);
                component.set("v.selectedAssetstep2",false);
                component.set("v.selectedLineItemstep2",false);
                component.set("v.ContProgressBarCounter",1);
                
            }
        },
            //25689
            deliveryInfo: function(component, event, helper) {
                var parentCase = component.get("v.newParentCase");           
                var Emailvalidation = false;
                var phoneNoValidation = false;
                var EmailFieldShip = component.find('ShipRecipntEmail');
                var phoneField = component.find('ShipRecipntphone');
                var communicationContact = component.get('v.communicationContact');
                var ShiptopartyAddress = component.get('v.ShiptopartyAddress'); 
                var deliveryTimeZone = component.get("v.deliveryTimeZone")
                parentCase.HWS_Communication_Contact__c = communicationContact;
                parentCase.Hws_Ship_to_Party_Address__c = ShiptopartyAddress;
                parentCase.HWS_Delivery_TimeZone__c  = deliveryTimeZone;
                console.log('DTZ:'+parentCase.HWS_Delivery_TimeZone__c);
                var phoneValue1;
                var EmailFeildShipEmail;
                if(EmailFieldShip!=undefined){            
                    EmailFeildShipEmail = EmailFieldShip.get('v.value');
                    Emailvalidation = this.emailValidation(EmailFeildShipEmail);            
                }
                if(phoneField!=undefined){            
                    phoneValue1 = phoneField.get('v.value');
                    phoneNoValidation = this.phoneValidation(phoneValue1);            
                }
                var isValidEmail = true; 
                //commented by sarat as lookup component is giving error
                if(ShiptopartyAddress == null || ShiptopartyAddress == undefined || ShiptopartyAddress == '')
                {
                    this.hideWaiting(component);
                    component.find("recordValue3").set("v.errors", [{message:"Please Enter Ship to party Address before Proceeding"}]);
                    isValidEmail = true;
                    component.set("v.parentcaseStep5", false);
                    component.set("v.ProgressBarCounter",4);
                    component.set("v.ProgressBarNEACounter" ,5);
                    component.set("v.ContProgressBarCounter" ,5);
                } 
                else {   
                    component.find("recordValue3").set("v.errors", [{message: null}]);
                    $A.util.removeClass(component.find("recordValue3"), 'slds-has-error');
                    isValidEmail = false;
                }
                if(!$A.util.isEmpty(ShiptopartyAddress) && phoneNoValidation && Emailvalidation){
                    console.log('child Listt=='+JSON.stringify(component.get("v.childCases")));
					//25689
                    var userTimeZone = component.get("v.currentUserTimeZone");
                    var selectedServiceType = component.get("v.serviceTypeCheck");
                    if(selectedServiceType == 'Advanced Exchange in Hours'){
                        component.set('v.childCaseColumns', [
                            {label: 'Part Code', fieldName: 'HWS_Part_Code__c', type: 'text', "initialWidth": 150},
                            {label: 'Part Revision', fieldName: 'Street_Address_1__c', type: 'text', "initialWidth": 150},
                            {label: 'Planned Delivery Date (User TZ)', fieldName: 'HWS_Planned_Delivery_Date__c', type: 'date', "initialWidth": 250,
                             typeAttributes:{
                                 day: 'numeric',
                                 year: "numeric",
                                 month: "short",
                                 day: "2-digit",
                                 hour: "2-digit",
                                 minute: "2-digit",
                                 hour12: true,
								 timeZone: userTimeZone
                             }
                            },
                            {label: 'Planned Delivery Date (Ship to TZ)', fieldName: 'HWS_PlannedDeliveryDateShipment__c', type: 'date', "initialWidth": 260,
                            	typeAttributes:{
                                 day: '2-digit',
                                 year: "numeric",
                                 month: "short",
                                 day: "2-digit",
                                 hour: "2-digit",
                                 minute: "2-digit",
                                 hour12: true,
								 timeZone: userTimeZone
                             } 
                            },  
                            {label: 'Cust Req Delivery Date (User TZ)', fieldName: 'HWS_Requested_Delivery_Date_Time__c', editable:true, type: 'date', "initialWidth": 260,
                                 typeAttributes: {
                                     day: '2-digit',
                                     month: 'short',
                                     year: 'numeric',
                                     hour: '2-digit',
                                     minute: '2-digit',                                     
                                     hour12: true,
									 timeZone: userTimeZone
                                 },
                                 cellAttributes:{  
                                     class:{  
                                         fieldName:"Street_Address_3__c"
                                     }
                                 }
                         	},
                            {label: 'Cust Req Delivery Date (Ship to TZ)', fieldName: 'HWS_RequestedDateShipment__c', type: 'text', "initialWidth": 260},      
                        ]);
                            }
                            else{
                            component.set('v.childCaseColumns', [
                            {label: 'Part Code', fieldName: 'HWS_Part_Code__c', type: 'text'},
                            {label: 'Part Revision', fieldName: 'Street_Address_1__c', type: 'text'},
                            {label: 'Planned Delivery Date (User TZ)', fieldName: 'HWS_Planned_Delivery_Date__c', type: 'date',
                            typeAttributes:{
                            day: '2-digit',
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                            }
                            },
                            {label: 'Planned Delivery Date (Ship to TZ)', fieldName: 'HWS_PlannedDeliveryDateShipment__c', type: 'date',
                            	typeAttributes: {
                                     day: 'numeric',
                                     month: 'short',
                                     year: 'numeric',
                                     hour: '2-digit',
                                     minute: '2-digit',
                                     second: '2-digit',
                                     hour12: true,
									 timeZone: userTimeZone
                                 },
                            }					   
                        ]);
                    }
                    this.getShipToTimeZone(component, event, helper);                                       
                }
                else{			
                    if(!Emailvalidation){
                        this.hideWaiting(component);
                        EmailFieldShip.setCustomValidity('Please enter a valid EmailId'); //do not get any message
                    }
                    else{
                        EmailFieldShip.setCustomValidity('');
                    }
                    EmailFieldShip.reportValidity(); 
                    if(!phoneNoValidation){
                        this.hideWaiting(component);
                        phoneField.setCustomValidity('Please enter valid Phone number. Phone number should only contain digits(ex: +XXX XX XXXX, XXXXXXXXXX)'); //do not get any message
                        phoneField.reportValidity(); 
                    }
                }
            },
                //25689
                save: function(component, event, helper) {        
                    var buttonName = event.getSource().getLocalId();  
                    var submitToSOO= (buttonName=='saveAsDraft') ? false :true;
                    var workspaceAPI = component.find("CreateCaseWorkspace");
                    var accountList = component.get("v.selectedAccount");
                    var contractLines = component.get("v.selectedAssets");
                    console.log('#contractLines: '+JSON.stringify(contractLines));
                    var versionItems = component.get("v.selectedVersions");
                    var childCase = component.get("v.newChildCase");
                    var childCaseList = component.get("v.childCases");
                    var parentCase = component.get("v.newParentCase");
                    console.log('PARENT CASE DETAILS:'+JSON.stringify(parentCase));
                    var contactid = component.get("v.recordId");
                    var selectedContact = component.get("v.contcatDetails");        
                    var caseInitiationTime = component.get('v.caseStartTime');        
                    component.set("v.saveDisable",true);
                    component.set("v.saveSubmitDisable",true);
                    var searchCode = component.get("v.searchKeyword");
                    //Code Changes for 26952
                    var newAssetList = component.get('v.getAllAssets');
                    console.log('##FinalnewAssetLis##'+JSON.stringify(newAssetList));
                    if(newAssetList != null){
                        for(var i=0;i<newAssetList.length;i++){
                            var getPayPerUse=newAssetList[i].HWS_ServiceOffering__c;
                            if( getPayPerUse != undefined && (getPayPerUse.includes('RES RFR PU') || getPayPerUse.includes('RES AED PU'))){
                                component.set("v.getPayPerUse", true);
                            }
                        }
                    }
                    var getPO=parentCase.HWS_Customer_PO__c;
                    if(component.get("v.getPayPerUse") && (getPO==null || getPO=='' || getPO==undefined ||getPO=='undefined') && submitToSOO){
                        component.set("v.saveCase", false);   
                        this.showToast('error','Error Message','Please Fill Customer Purchase Order Number In Previous Screen');
                        this.hideWaiting(component);
                        component.set("v.StageNumber", 8);
                        component.set("v.saveDisable",false);
                        component.set("v.saveSubmitDisable",false);
                    }
                    else{
                        component.set("v.saveCase", true);  
                    }
                    if(!submitToSOO){
                        component.set("v.saveCase", true); 
                    }
                    var saveCase=component.get("v.saveCase");
                    if(component.get("v.saveCase")===true){
                        var action = component.get('c.createHWSCase');
                        action.setParams({
                            accountList : accountList,
                            contractLines : contractLines,
                            versionItems : versionItems,
                            childCaseList : childCaseList,
                            parentCase : parentCase,
                            contactid : contactid,
                            submitToSOO:submitToSOO,
                            caseInitiationTime : caseInitiationTime,
                            deliveryTimeZone : component.get('v.deliveryTimeZone')
                        });
                        action.setCallback(this, $A.getCallback(function (response) {
                            var state = response.getState();
                            if (state === "SUCCESS") {					
                                var recordid = response.getReturnValue();
                                component.set("v.caseNumber", response.getReturnValue());                    
                                // display toast message
                                if (submitToSOO)
                                {
                                    var actionCallout=component.get('c.makeSOOCallout');
                                    actionCallout.setParams({
                                        parentCaseId : recordid});
                                    actionCallout.setCallback(this, $A.getCallback(function (response) {
                                        var state = response.getState();
                                        component.set("v.ProcessResponse", response.getReturnValue());
                                        var processResponse=component.get("v.ProcessResponse");
                                        if (state === "SUCCESS") {
                                            if(processResponse!=null){
                                                var statuscode=processResponse.statusCode;
                                                
                                                if(statuscode === 200){
                                                    this.showToast('success','Success Message','Case was created and submitted to SOO');
                                                }
                                                else
                                                {
                                                    this.hideWaiting(component);  
                                                    this.showToast('error','Error Message','Case was created and but not submitted to SOO');
                                                }
                                                this.openCaseTab(component, this.getLightningURL(recordid));
                                                this.closeTab(component);
                                                
                                            }
                                        }
                                        else{
                                            this.showToast('error','Success Message','Case was created and but not submitted to SOO');
                                            this.openCaseTab(component, this.getLightningURL(recordid));
                                            this.closeTab(component);
                                            
                                        }
                                    }));
                                    $A.enqueueAction(actionCallout);
                                    
                                }
                                else
                                {
                                    this.showToast('success','Success Message','Case was created Successfully');
                                    this.openCaseTab(component, this.getLightningURL(recordid));
                                    this.closeTab(component);
                                    //Navigate to detail page
                                    
                                }
                                
                            } 
                            //Display Error msg for Customer Reference number field
                            else {
                                component.set("v.IsSpinner", false);
                                component.set("v.saveDisable",false);
                                component.set("v.saveSubmitDisable",false);
                                var toastEvent = $A.get("e.force:showToast");
                                var message = '';
                                if (state === "INCOMPLETE") {
                                    message = 'Server could not be reached. Check your internet connection.';
                                } else if (state === "ERROR") {
                                    var errors = response.getError();
                                    if (errors) {
                                        for(var i=0; i < errors.length; i++) {
                                            for(var j=0; errors[i].pageErrors && j < errors[i].pageErrors.length; j++) {
                                                message += (message.length > 0 ? '\n' : '') + errors[i].pageErrors[j].message;
                                            }
                                            if(errors[i].fieldErrors) {
                                                for(var fieldError in errors[i].fieldErrors) {
                                                    var thisFieldError = errors[i].fieldErrors[fieldError];
                                                    for(var j=0; j < thisFieldError.length; j++) {
                                                        message += (message.length > 0 ? '\n' : '') + thisFieldError[j].message;
                                                    }
                                                }
                                            }
                                            if(errors[i].message) {
                                                message += (message.length > 0 ? '\n' : '') + errors[i].message;
                                            }
                                        }
                                    } else {
                                        message += (message.length > 0 ? '\n' : '') + 'Unknown error';
                                    }
                                }
                                toastEvent.setParams({
                                    title: 'Error',
                                    type: 'error',
                                    message: message
                                });
                                toastEvent.fire();
                            }//Error code ends 
                        }));
                        $A.enqueueAction(action);  
                    }
                },
          getIsTracked: function(component, event, createchildcase){
                        
                        var serialNumber = component.find("faultSerial").get("v.value");
                        var failureOccurrence = component.find("FailureOccurrenceId").get("v.value");
                        var failureDetection = component.find("FailureDetectionId").get("v.value");
                        var failureDescription = component.find("FailureDescriptionId").get("v.value");
                        var failureDetectionDate = component.find("FailureDetectionDate").get("v.value");
                        var isTracable = false;
                        var faultSerialfromApex;
                        var selectedAsset = component.get("v.selectedAssets");
                        //25672
                        if(selectedAsset[0].HWS_ContractLineItem__r.CH_CountryISOName__c !=null){
                            component.set("v.serviceContractCountry", selectedAsset[0].HWS_ContractLineItem__r.CH_CountryISOName__c);
                        }
                        //NOKIASC-25669
                        var country= component.get("v.serviceContractCountry");  
              
                        //US 27245 begin Z
                        var serviceTypeCheck = this.assignServiceType(component);
                        //US 27245 end
                        
                        var versionItems = component.get("v.selectedVersions");
                        var emailValidation = false;
                        var phoneValidation = false;
                        var duplicateSerialnumCheck = false;
                        var dateChangeValidate = false;
                        emailValidation = this.getEmailValidation(component, event);
                        phoneValidation = this.getPhoneValidation(component, event);
                        dateChangeValidate = this.requestDateChangeValidate(component, event);
                        duplicateSerialnumCheck = component.get("v.duplicateSerialnumCheck");
                        var action = component.get("c.getSerialNumberInfo");
                        action.setParams({
                            versionItems : versionItems
                        });
                        action.setCallback(this, function(response){
                            var state = response.getState();
                            if (state === "SUCCESS") {
                                component.set("v.IsSpinner", false);
                                faultSerialfromApex= response.getReturnValue();               
                                if(dateChangeValidate && duplicateSerialnumCheck && emailValidation && phoneValidation && (faultSerialfromApex.toUpperCase() == 'NO' || ((faultSerialfromApex.toUpperCase() == 'YES' && serialNumber != undefined && serialNumber != '' && serialNumber != null) || serviceTypeCheck == 'Advanced Exchange in Hours')) && (((serviceTypeCheck == 'Return for Repair or Replacement' || serviceTypeCheck == 'Identical Repair' || serviceTypeCheck == 'Advanced Exchange in Days') && ((failureOccurrence != '--None--' && failureOccurrence != undefined && failureOccurrence != '') && (failureDetection != '--None--' && failureDetection != undefined && failureDetection != '') && (failureDescription != '--None--' && failureDescription != undefined && failureDescription != '') && (failureDetectionDate != '--None--' && failureDetectionDate != undefined && failureDetectionDate != ''))) || (serviceTypeCheck == 'Advanced Exchange in Hours'))){
                                    component.set("v.ProgressBarCounter",4);
                                    component.set("v.ProgressBarNEACounter" ,5);
                                    component.set("v.ContProgressBarCounter" ,5);
                                    if(createchildcase == 'createchild'){
                                        component.set("v.childcasestep4", false);     
                                        component.set("v.selectedAssetstep2", false);
                                        component.set("v.selectedLineItemstep2", false);
                                        component.set("v.selectedVersionstep3", false);
                                        component.set("v.newChildAddPart", true);
                                        component.set("v.SelectNEA", false);
                                        component.set("v.SelectConNum", false);
                                        component.set("v.parentcaseStep5", false);
                                        component.set("v.ProgressBarCounter",1);
                                        component.set("v.ProgressBarNEACounter",1);
                                        component.set("v.ContProgressBarCounter",1);    
                                        component.set("v.ContNEAProgressBarCounter",1);      
                                    }
                                    this.childCaseCreation(component, event);
                                }
                                else{
                                    component.set("v.IsSpinner", false);
                                    component.set('v.isHide1', false);
                                    component.set('v.isHide', false);
                                    if(serviceTypeCheck != 'Advanced Exchange in Hours' && ((failureOccurrence == '--None--' || failureOccurrence == undefined || failureOccurrence == '') || (failureDetection == '--None--' || failureDetection == undefined || failureDetection == '') || (failureDescription == '--None--' || failureDescription == undefined || failureDescription == '') || (failureDetectionDate == '--None--' || failureDetectionDate == undefined || failureDetectionDate == ''))){
                                        this.showToast('error','Error Message','Please select Failure Occurrence, Failure Detection, Failure Detection Date and Failure Description Values'); 
                                        component.set("v.childcasestep4", false);
                                    }
                                    
                                    if(faultSerialfromApex.toUpperCase() == 'YES' && (serialNumber == undefined || serialNumber == '' || serialNumber == null)){                        
                                        var field = component.find('faultSerial');
                                        field.setCustomValidity('Please Enter Faulty Unit Serial Number');
                                        field.reportValidity();
                                        component.set("v.childcasestep4", false);
                                    }
                                    component.set("v.ProgressBarCounter",3);
                                    component.set("v.ProgressBarNEACounter" ,4);
                                    component.set("v.ContProgressBarCounter" ,4);
                                    if(createchildcase == 'createchild'){
                                        component.set("v.selectedVersionstep3", true);
                                        component.set("v.newChildAddPart", false);
                                    }
                                    component.set("v.newChildCaseCheck", false);
                                }
                            }
                        });
                        $A.enqueueAction(action);
                    },
                        childCaseCreation: function(component, event){
                            var childCaseCheck = component.get("v.newChildCaseCheck");
                            //Start Changes for 26952
                            var listToADDValues = []; 
                            var newAssetListValues = component.get('v.getAllAssets');
                            var assetListValues = component.get("v.selectedAssets");
                            for(var i in newAssetListValues){
                                var oldRecipentValues = newAssetListValues[i];
                                if(oldRecipentValues!=[]){
                                    listToADDValues.push(oldRecipentValues);
                                }
                            }
                            for(var i in assetListValues){
                                var oldRecipentValues = assetListValues[i];
                                if(oldRecipentValues!=[]){
                                    listToADDValues.push(oldRecipentValues);
                                }
                            }
                            component.set('v.getAllAssets',listToADDValues);
                            console.log('##Final'+JSON.stringify(component.get('v.getAllAssets')));
                            //End Changes for 26952
                            if(childCaseCheck){
                                component.set("v.StageNumber", 2);
                                //3952
                                component.set("v.backDisable", true);
                                //3478
                                component.set("v.showCancelButton", true);
                                var listToADD = [];  
                                var newChildCasesList = component.get('v.childCases');
                                var assetList = component.get("v.selectedAssets");
                                var contractNumber = assetList[0].HWS_Service_Contract_Number__c;
                                //US 27245 begin
                                var serviceType = this.assignServiceType(component);
                                //US 27245 end
                                var cliId = assetList[0].HWS_ContractLineItem__c;
                                var prod2Id = assetList[0].Product2Id;
                                var prodName = assetList[0].Product2.Name;
                                var assetId = assetList[0].Id;
                                var parentContractId = assetList[0].HWS_ContractLineItem__r.ServiceContractId;
                                //25662
                                var selNEA = component.get("v.selectedNEA");            
                                if(selNEA != null && selNEA != '' && selNEA != undefined){
                                    var neaId = selNEA[0].Id;
                                }
                                component.set("v.newChildCase.HWS_Contract_Line_Item__c",cliId);
                               	//25689	
								component.set("v.newChildCase.Street_Address_2__c",assetList[0].HWS_ContractLineItem__r.CH_BusinessHour__c);
                                component.set("v.newChildCase.HWS_Sellable_Product__c",prod2Id);
                                //added for single email
                                component.set("v.newChildCase.NCP_Product_Name__c",prodName);
                                component.set("v.newChildCase.HWS_ServiceType__c",serviceType);
                                component.set("v.newChildCase.NCP_Service_Contract__c",parentContractId);
                                component.set("v.newChildCase.AssetId",assetId);
                                component.set("v.newChildCase.HWS_Part_Code__c",assetList[0].HWS_Part_Code__c);
								//Commented for defect fix - NOKIASC-29263
                                //component.set("v.newChildCase.CH_NetworkElementAsset__c",neaId);
                                component.set("v.showtestContract",true);
                                component.set("v.contractNumber", contractNumber);
                                component.set("v.selectedContractNumber", contractNumber);
                                component.set("v.serviceType", serviceType);
                                component.set("v.hideFilter",false);
                                var childCase = component.get("v.newChildCase");
                                for(var i in newChildCasesList){
                                    
                                    var oldRecipent = newChildCasesList[i];
                                    if(oldRecipent!=[]){
                                        listToADD.push(oldRecipent);
                                    }
                                }
                                listToADD.push( JSON.parse(JSON.stringify(childCase)));
                                component.set('v.childCases',listToADD);
                                component.set('v.childCaseCreate',true);
                                component.set("v.newChildCaseCheck", false);
                                this.clearChild(component,event);
                                component.set('v.Assets',[]);
                                component.set('v.clis',[]);
                                component.set("v.searchKeyword",'');
                                component.set("v.selectedAssets",'');
                                component.set("v.selectedclis",'');
                                component.set("v.versionItems", null);
                                component.set("v.selectedVersions", null);
                                component.set("v.assetFilterText", null);
                                component.set("v.VersionItemFilterText", null);
                                var searchCriteria =component.get("v.searchCriteria");
                                var searchType=component.find("InputSelectSingle");
                                searchType.set("v.value",searchCriteria);
                                //this.getServiceContracts(component,event);
                            }else{
                                var assetList = component.get("v.selectedAssets");
                                var contractNumber = assetList[0].HWS_Service_Contract_Number__c;
                                //US 27245 begin
                                var serviceType = this.assignServiceType(component);
                                //US 27245 end
                                var cliId = assetList[0].HWS_ContractLineItem__c;
                                var prod2Id = assetList[0].Product2Id;
                                var prodName = assetList[0].Product2.Name;
                                var assetId = assetList[0].Id;
                                var parentContractId = assetList[0].HWS_ContractLineItem__r.ServiceContractId;
                                //25662
                                var selNEA = component.get("v.selectedNEA");            
                                if(selNEA != null && selNEA != '' && selNEA != undefined){
                                    var neaId = selNEA[0].Id;
                                }
                                component.set("v.newChildCase.HWS_Contract_Line_Item__c",cliId);
                                //25689	
								component.set("v.newChildCase.Street_Address_2__c",assetList[0].HWS_ContractLineItem__r.CH_BusinessHour__c);
                                component.set("v.newChildCase.HWS_Sellable_Product__c",prod2Id);
                                //Added for single email
                                component.set("v.newChildCase.NCP_Product_Name__c",prodName);
                                component.set("v.newChildCase.HWS_ServiceType__c",serviceType);
                                component.set("v.newChildCase.NCP_Service_Contract__c",parentContractId);
                                component.set("v.newChildCase.AssetId",assetId);
                                component.set("v.newChildCase.HWS_Part_Code__c",assetList[0].HWS_Part_Code__c);
								//Commented for defect fix - NOKIASC-29263
                                //component.set("v.newChildCase.CH_NetworkElementAsset__c",neaId);
                                component.set("v.contractNumber", contractNumber);
                                //component.set("v.selectedContractNumber", contractNumber); 
                                //component.set("v.serviceType", serviceType); 
                                component.set("v.assetFilterText", null);
                                component.set("v.VersionItemFilterText", null);
                                var childCase = component.get("v.newChildCase");
                                var listToADD = [];  
                                var newChildCasesList = component.get('v.childCases');
                                for(var i in newChildCasesList){
                                    var oldRecipent = newChildCasesList[i];
                                    if(oldRecipent!=[]){
                                        listToADD.push(oldRecipent);
                                    }
                                }
                                listToADD.push( JSON.parse(JSON.stringify(childCase)));
                                component.set('v.childCases',listToADD);
                                component.set("v.StageNumber", 5);
                                //3952
                                //component.set("v.backDisable", true);
                                //3478
                                component.set("v.showCancelButton", false);
                                component.set("v.newChildCaseCheck", false);
                            }
                        },
                            GetSPSTracked: function(component, event,createchildcase){
                                component.set("v.IsSpinner", false);
                                var childCase = component.get("v.newChildCase");
                                var listToADD = [];
                                var newChildCasesList = component.get('v.childCases'); 
                                var Quantity =  component.find('Quantity').get("v.value");
                                var childCaseCheck = component.get("v.newChildCaseCheck");
                                var selectedAsset = component.get("v.selectedAssets");
                                //25672
                                if(selectedAsset[0].HWS_ContractLineItem__r.CH_CountryISOName__c !=null){
                                    component.set("v.serviceContractCountry", selectedAsset[0].HWS_ContractLineItem__r.CH_CountryISOName__c);
                                }
                                //25669
                                var country=component.get("v.serviceContractCountry");
                                
                                //US 27245 begin
                                var serviceTypeCheck = this.assignServiceType(component);
                                //US 27245 end
                                
                                var dateChangeValidate = false;
                                dateChangeValidate = this.requestDateChangeValidate(component, event);
                                //var validateDate = component.get('v.dateValidationError');
                                if(!($A.util.isEmpty(Quantity)) && Quantity != null && Quantity !=''&& serviceTypeCheck == 'Spare Part Sales' && dateChangeValidate){
                                    this.childCaseCreation(component, event);  
                                }else{
                                    if(($A.util.isEmpty(Quantity)) || Quantity == null || Quantity ==''){
                                        var field1 = component.find('Quantity');
                                        field1.showHelpMessageIfInvalid();
                                        component.set('v.isHide1', false);
                                    }
                                    component.set("v.newChildCaseCheck", false);
                                }
                                
                            },
                                duplicateSerialnumCheck: function(component, event, createchildcase){
                                    
                                    var serialNumber = component.find('faultSerial').get("v.value");  
                                    var contractLines = component.get("v.selectedAssets");
                                    var duplicateSerialnumCheck = false;
                                    var childCaseCheck = component.get("v.newChildCaseCheck");
                                    var newChildCasesList = component.get('v.childCases');
                                    var action = component.get("c.duplicateSerialNumberInfo");
                                    action.setParams({
                                        "serialNumber" : serialNumber,
                                        materialCode  : contractLines[0].HWS_Part_Code__c
                                    });
                                    
                                    action.setCallback(this, function(response) {
                                        var state = response.getState();
                                        
                                        if (state === "SUCCESS") {
                                            var dupSerfromApex = response.getReturnValue();
                                            
                                            if(!$A.util.isEmpty(dupSerfromApex) &&  dupSerfromApex != '' &&  dupSerfromApex != null){
                                                console.log('DuplicateSNum '+dupSerfromApex);
                                                component.set("v.duplicateSerialnumCheck",false);
                                                var sNumBooleanAttribute = component.get("v.duplicateSerialnumCheck");
                                                var resultsToast = $A.get("e.force:showToast");
                                                resultsToast.setParams({
                                                    title : 'Error Message',
                                                    mode: 'sticky',
                                                    type: 'error',
                                                    key: 'info_alt',
                                                    message: 'message',
                                                    messageTemplate: 'Sorry, Cannot proceed with case creation as entered serial number and {0} pending for closure! {1}',
                                                    messageTemplateData: ['material code is part of an existing case', {
                                                        url: $A.get("$Label.c.Duplicate_SerialNumber")+dupSerfromApex[0].Id,
                                                        label: 'Case Number: '+dupSerfromApex[0].CaseNumber
                                                    }]   
                                                });
                                                resultsToast.fire();
                                                
                                            }  
                                            else if(newChildCasesList.length !== 0){
                                                var faultCodeList =[];
                                                for(var i in newChildCasesList){
                                                    var faultCode = newChildCasesList[i].HWS_Faulty_Serial_Number__c;
                                                    if(faultCode !='' && faultCode != null && faultCode != undefined){
                                                        faultCodeList.push(faultCode.toUpperCase());
                                                    }
                                                }
                                                if(faultCodeList.includes(serialNumber.toUpperCase())){
                                                    this.showToast('error','Error Message','Entered faulty serial number is Part of previously added part');
                                                    component.set("v.duplicateSerialnumCheck",false);  
                                                    var sNumBooleanAttribute = component.get("v.duplicateSerialnumCheck");
                                                    component.set("v.childcasestep4",false);
                                                }
                                                else{
                                                    component.set("v.duplicateSerialnumCheck",true);
                                                    var sNumBooleanAttribute = component.get("v.duplicateSerialnumCheck");                    
                                                }                     
                                            }else{
                                                component.set("v.duplicateSerialnumCheck",true);
                                                var sNumBooleanAttribute = component.get("v.duplicateSerialnumCheck");                    
                                            } 
                                            this.getIsTracked(component, event, createchildcase); // this function is called after success of duplicate num check
                                        }
                                    });
                                    $A.enqueueAction(action);
                                    
                                },
                                    /* getParentAccount : function(component, event){
        var action = component.get("c.getParentAccountId");
        action.setParams({ contactId : component.get("v.recordId")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var stringItems = response.getReturnValue();
                
                component.set("v.defaultAccount", stringItems);
                
            }
        });
        $A.enqueueAction(action);
    },*/
        getCaseInitiationTime : function(component, event){
            var action =component.get("c.getCaseInitiationTime");
            action.setCallback(this, function(response) {                       
                var caseInitiationTime = response.getReturnValue();
                //var caseInitiationTime = caseInitiationTime1.toString();
                component.set("v.caseStartTime",caseInitiationTime);            
            });
            $A.enqueueAction(action);
        },
            //added for US-3205 to get Contact Name
            /* getContactName : function(component, event, helper) {        
        var id = component.get("v.recordId");                
        var action =component.get("c.getContactName");
        action.setParams({
            contactid: id
        });                
        action.setCallback(this, function(response) {                       
            var contactName = response.getReturnValue();
            component.set("v.ContactName",contactName);            
        });
        $A.enqueueAction(action);
    },*/
        /* getContactType : function(component, event, helper) {
        var id = component.get("v.recordId");
        var action =component.get("c.getContactType");
        action.setParams({
            contactid: id
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            
            if(response.getReturnValue()=='Communication Contact'){
                component.set("v.isCommunicationContact","true");
                component.set("v.communicationContactMessage",'Contact is a Communication Contact and Support Tickets cannot be initiated.')
            }
            else{
                component.set("v.isCommunicationContact","false");
            }
        });
        $A.enqueueAction(action);
    },*/
        getContactDetails : function(component, event, helper) {
            var id = component.get("v.recordId");
            var action =component.get("c.getContactDetails");
            action.setParams({
                contactId: id
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                var con = response.getReturnValue(); 
                component.set("v.contcatDetails",con);
                component.set("v.ContactName",con.Name);
				component.set("v.ContactName",con.Name);
				component.set("v.newParentCase.CH_Email2__c",con.Email1__c);//Nokiasc-27247
                component.set("v.newParentCase.CH_Email3__c",con.CH_Email3__c);//Nokiasc-27247
                component.set("v.defaultAccount", con.AccountId);
                if(con.CH_ContactType__c=='Communication Contact'){
                    component.set("v.isCommunicationContact","true");
                    component.set("v.communicationContactMessage",'Contact is a Communication Contact and Support Tickets cannot be initiated.')
                }
                else{
                    component.set("v.isCommunicationContact","false");
                }
            });
            $A.enqueueAction(action);
        },
            
            //ESCALATE CASE HELPER CODE 
            createEscCase: function(component,event,helper){
                this.showWaiting(component);
                var accountList;
                if (component.get("v.selectedAccount")!=null){
                    accountList = component.get("v.selectedAccount");
                }
                var contactId = component.get("v.recordId");  
                var escalationCase = component.get("v.newEscalationCase");
                var action= component.get("c.ecsalateCase"); 
                action.setParams({contactId : contactId, accList : accountList,escCase : escalationCase});
                action.setCallback(this, $A.getCallback(function (response) {
                    var state;
                    if (response!=null){
                        state = response.getState();
                    }
                    
                    if (state === "SUCCESS"){
                        this.hideWaiting(component);
                        var can = response.getReturnValue();
                        if (component.get("v.StageNumber")!=1){
                            component.set("v.StageNumber", 1);//NAVIGATING TO LEGAL ENTITY SCREEN
                            component.set("v.selectedAccount",null);
                        }
                        this.showToast('success','Success','A Case has been created and escalated to CaPM. Reference #'+can[0].CaseNumber);  
                    }else{
                        this.showToast('error','Error','Case could not be escalated due to an Internal Problem. Please try after some time');
                        this.hideWaiting(component);
                    }
                }));
                $A.enqueueAction(action);
            },
                /*showWaitingHelper : function(component){
        component.set("v.IsSpinner",true);
    },
    hideWaitingHelper : function(component){
        component.set("v.IsSpinner",false);  
    },
    setFocusedTabLabel : function(component, event, helper) {
        var workspaceAPI = component.find("CreateCaseWorkspace");
        workspaceAPI.getFocusedTabInfo().then(function(response) {
            var focusedTabId = response.tabId;
            workspaceAPI.setTabLabel({
                tabId: focusedTabId,
                label: "Create Case"
            });
            workspaceAPI.setTabIcon({
                tabId: focusedTabId,
                icon: "action:new_case",
                iconAlt: "Create Case" 
            });
            workspaceAPI.focusTab({
                tabId : response                
            }); 
        })
        .catch(function(error) {
            console.log(error);
        });
    },*/
        // Set Tab Icon and Label - added for the US-3196, 3198 - start
        setTabIcon : function(component) {
            //Js Controller
            var workspaceAPI = component.find("CreateCaseWorkspace");        
            workspaceAPI.getEnclosingTabId().then(function(response) {            
                workspaceAPI.setTabLabel({
                    tabId: response.subtabId,
                    label: "Create Case" //set label you want to set
                    //title: "Create Case"                
                });
                workspaceAPI.setTabIcon({
                    tabId: response.subtabId,
                    icon: "action:new_case", //set icon you want to set
                    iconAlt: "Create Case" //set label tooltip you want to set
                });
                workspaceAPI.focusTab({
                    tabId : response.subtabId               
                }); 
            })
        },
            openCaseTab : function(component, newCaseURL) {
                var workspaceAPI = component.find("CreateCaseWorkspace");
                workspaceAPI.openTab({
                    url: newCaseURL,
                    focus: true
                });
            },
                getLightningURL: function(recordId) {
                    return '/one/one.app?#/sObject/' + recordId + '/view';
                },
                    closeTab : function(component) {
                        var workspaceAPI = component.find("CreateCaseWorkspace");        
                        workspaceAPI.getEnclosingTabId().then(function(response) {
                            workspaceAPI.closeTab({
                                tabId : response
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                        })
                    },
                        // Set Tab Icon and Label - added for the US-3196, 3198 - end
                        getRelatedAccounts : function(component, event, helper) {
                            component.set('v.AccountColumns', [
                                //US-3199 code added Legal Account hyper link
                                {label: 'Name', fieldName: 'linkName', type: 'url', typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}},
                                //{label: 'Name', fieldName: 'Name', type: 'text'},//,sortable:true
								{label: 'Operational Customer Name', fieldName: 'OperationalCustomerName__c', type: 'text'},
                                {label: 'Account Number', fieldName: 'AccountNumber', type: 'text'},   //,sortable:true 
								{label: 'Parent Account', fieldName: 'CH_ParentAccountName__c', type: 'text'}
                                								
                            ]);
                            component.set('v.VersionItemColumns', [
                                {label: 'Part Revision', fieldName: 'HWS_Product_Name__c', type: 'text'},
                                {label: 'Version Code', fieldName: 'HWS_Version_Code__c', type: 'text'},
                                {label: 'CLEI Code', fieldName: 'CLEI__c', type: 'text'},
                                {label: 'Comcode', fieldName: 'Comcode__c', type: 'text'}
                            ]);
                            var id = component.get("v.recordId");            
                            var action =component.get("c.getAllAccounts");
                            action.setParams({
                                contactid: id
                            });
                            action.setCallback(this, function(response){
                                var state = response.getState();
                                if(response.getReturnValue()==null){
                                    component.set("v.isActive","false");
                                    component.set("v.cntInactiveMessage",'Contact is inactive and Support Tickets cannot be initiated.')
                                }
                                else{
                                    //US-3199 code added Legal Account hyper link
                                    var records =response.getReturnValue();
                                    records.forEach(function(record){
                                        //record.linkName = this.getLightningURL(record.Id);
                                        record.linkName ='/one/one.app?#/sObject/' + record.Id + '/view';
                                    });
                                    component.set("v.isActive","true");
                                    component.set("v.conAccounts", response.getReturnValue());
                                    component.set("v.AllAccounts", response.getReturnValue());
                                }
                            });
                            $A.enqueueAction(action);
                        },
                            //NOKIASC-25662
                            getNetworkElementAssets : function(component, accountId, cliId) {
                                var assets = component.get("v.AllAssets");    
                                var searchCrit = component.get("v.searchCriteria");
                                var CLIIDS = [];
                                if(assets != null && searchCrit == 'Part Code'){
                                    console.log('ASSETS RETURNED HELPER####'+JSON.stringify(assets));            
                                    for(var i=0;i<assets.length;i++){
                                        CLIIDS.push(assets[i].HWS_ContractLineItem__c);
                                    }
                                    console.log("CLIS####"+CLIIDS);
                                }
                                var clitems = component.get("v.clis");
                                if(clitems != null && searchCrit == 'Contract Number'){
                                    console.log('CLIS RETURNED HELPER####'+JSON.stringify(clitems));            
                                    for(var i=0;i<clitems.length;i++){
                                        CLIIDS.push(clitems[i].Id);
                                    }
                                    console.log("CLIS####"+CLIIDS);
                                }
                                var action =component.get("c.getNEA");  
                                action.setParams({
                                    accId : accountId,
                                    cliId : cliId,
                                    cliIdList : CLIIDS
                                });
                                action.setCallback(this, function(response){
                                    var state = response.getState();            
                                    var neaList = response.getReturnValue();            
                                    for(var i = 0; i < neaList.length; i++) {
                                        neaList[i].URL = '/one/one.app?#/sObject/' + neaList[i].Id + '/view';
                                        neaList[i].Address = neaList[i].Address__r?neaList[i].Address__r.CH_AddressDetails__c :'N/A';
                                        neaList[i] = this.setObjectNameUrl(neaList[i], 'Product2', 'Product');
                                        neaList[i] = this.setObjectNameUrl(neaList[i], 'CH_Solution__r', 'Solution');
                                        neaList[i] = this.setObjectNameUrl(neaList[i], 'CH_ProductVariant__r', 'Variant');
                                        neaList[i] = this.setObjectNameUrl(neaList[i], 'CH_ProductRelease__r', 'Release');
                                        if(neaList[i].Id === component.get("v.selected")) {
                                            selected = true;
                                            component.find("neaTable").setSelectedRows(new Array(neaList[i].Id));
                                        }
                                        component.set('v.netElemAssets',neaList);
                                        component.set('v.showAllNEA',neaList);
                                    }            
                                });
                                $A.enqueueAction(action);
                                var selNEA= component.get("v.selectedNEA");
                                var selAst = component.get("v.selectedAssets");	
                                var selCLI = component.get("v.selectedclis");	
                                var selAstCheck = false;	
                                var selCLICheck = false;	
                                if((selAst != null && selAst != '' && selAst != undefined) || (selCLI != null && selCLI != '' && selCLI != undefined)){	
                                    if(selAst != null && selAst != '' && selAst != undefined){	
                                        selAstCheck = true;	
                                        var selAsset=JSON.parse(JSON.stringify(selAst[0]));	
                                        var oldAsset = component.get("v.oldSelectedAssets");	
                                    }	
                                    if(selCLI != null && selCLI != '' && selCLI != undefined){	
                                        selCLICheck = true;	
                                        var selCLItem=JSON.parse(JSON.stringify(selCLI[0]));	
                                        var oldCLItem = component.get("v.oldSelectedclis");	
                                    }	
                                    console.log('OLD CLI:'+JSON.stringify(oldCLItem));	
                                    console.log('SEL CLI:'+selCLItem);	
                                    if((selAstCheck && (selAsset.Id==oldAsset || (oldAsset == null || oldAsset == '' || oldAsset == undefined)))	
                                       || (selCLICheck && (selCLItem.Id==oldCLItem || (oldCLItem == null || oldCLItem == '' || oldCLItem == undefined)))){
                                        if(selNEA!=null && selNEA!='' && selNEA!=undefined){
                                            var dTable = component.find("nea");					
                                            if(dTable != null && dTable != '' && dTable != undefined){
                                                var selectedNEA = dTable.getSelectedRows();
                                            }
                                            var sNEA = component.get("v.selectedNEA");
                                            if (typeof sNEA != 'undefined' && sNEA) {
                                                var selectedRowsIds = [];
                                                for(var i=0;i<sNEA.length;i++){
                                                    selectedRowsIds.push(sNEA[i].Id);  
                                                }         
                                                var dTable = component.find("nea");						
                                                if(dTable != null && dTable != '' && dTable != undefined){
                                                    dTable.set("v.selectedRows", selectedRowsIds);
                                                }
                                            }
                                        }
                                    }else{
                                        component.set("v.versionItems", null);
                                        component.set("v.AllversionItems", null);
                                        component.set("v.selectedVersions", null);
                                        component.set("v.selectedNEA",null);
                                        //component.set('v.showVI',false);
                                        component.set('v.enableVI',true);
										component.set('v.enableNea',true);
                                    }
                                }
                            },
                                setObjectNameUrl: function(entry, object, key) {
                                    entry[key+'URL'] = (entry[object] != null)?('/one/one.app?#/sObject/' + entry[object].Id + '/view'):'';
                                    entry[key+'Name'] = (entry[object] != null)?entry[object].Name:'';
                                    return entry;
                                },
	//25689
    getShipToTimeZone : function(component, event, helper) {
        var childCasesList = component.get("v.childCases");
        var bhIdList = [];
        for(var i=0;i<childCasesList.length;i++){            
            bhIdList.push(childCasesList[i].Street_Address_2__c);
        }
        console.log('Business Id'+bhIdList);
        var action =component.get("c.getShipToTimeZone");
        action.setParams({
            selectedAccount: component.get('v.ShiptopartyAddress'),
            businessHourIdList : bhIdList,
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var stringTimeZoneMap = response.getReturnValue();                
                if(Object.keys(stringTimeZoneMap).includes("Account")){
                    component.set("v.shipToTimeZone", "Account");
                    component.set("v.shipToTimeZoneMap",stringTimeZoneMap["Account"]);
                    
                }
                else if(Object.keys(stringTimeZoneMap).includes("BusinessHour")){
                   component.set("v.shipToTimeZone", "BusinessHour");
                   component.set("v.shipToTimeZoneMap",stringTimeZoneMap["BusinessHour"]);
                   
                }                
            }
             this.handleCustReqShipmentDate(component,event,helper);
        });
        $A.enqueueAction(action);
    }, 
        //show list of Version Item details
    gotoStep3: function(component, event, helper) {
        //2503 SPS Last Order Date validation started
        console.log('Entered on non NEA TEST ##');
        component.set("v.SelectConNum" ,true);
        component.set("v.ProgressBarCounter" ,2);
        component.set("v.ProgressBarNEACounter" ,3);
        component.set("v.ContProgressBarCounter" ,3);
        component.set("v.ContNEAProgressBarCounter" ,4);
        //component.set("v.selectedAssetstep2", true);
        //component.set("v.selectedLineItemstep2", true);
        var selNEA = component.get("v.selectedNEA");            
        if(selNEA != null && selNEA != '' && selNEA != undefined){
            component.set("v.SelectNEA",true);
        }
        // Start Changes for US-26951
        if(component.get("v.toProceedSPSLOD") || component.get("v.getPayPerPrice")){
            if(component.get("v.toProceedSPSLOD")){
                this.showToast('error','Error Message','Cannot add this part as last order date for the part has already passed, Please contact HWS Customer Delivery Manager');
            }
            else{
                this.showToast('error','Error Message','The service requires quotation, please escalate'); 
                component.set("v.ProgressBarCounter" ,1);
                component.set("v.ProgressBarNEACounter" ,1);
                component.set("v.ContProgressBarCounter" ,1);
            }
        }
        else{
            this.getVersionItems(component, event);
        }
        //2503 SPS Last Order Date validation Ended
        // this.getVersionItems(component, event);
        // added for US-3205 to display Asset Name in main Case Flow 
        var assets = component.get("v.selectedAssets");  
        component.set("v.VersionItemFilterText", null);
        if(assets && assets.length) {
            component.set("v.ProductCode", assets[0].HWS_Part_Code__c);
        }
        var selectedNEA = component.get("v.selectedNEA");     
        var stageNum = component.get("v.StageNumber");
        /*if(stageNum == 3 && (selectedNEA == null || selectedNEA == undefined || selectedNEA =='')){
            this.showToast('error','Error Message','Please select Network Element Asset before proceeding');
            component.set("v.StageNumber",7);
            //component.set("v.ProgressBarCounter" ,2);
            component.set("v.ProgressBarNEACounter" ,2);
            component.set("v.ContProgressBarCounter" ,2);
            component.set("v.ContNEAProgressBarCounter" ,3);
            
        }
        */
    },
        //NOKIASC-25662
    selectNetworkElementAsset : function(component, event, helper){
        console.log('NEXT TO NEA'+JSON.stringify(component.get("v.selectedNEA")));
        component.set("v.SelectNEAProgress",true);
        component.set("v.selectedAssetstep2", true);
        var clis = component.get("v.clis");
        if(clis != null && clis != '' && clis != undefined){
            console.log('enter NEA for ### clis'+component.get("v.clis"));
            component.set("v.ContractNumNEAProgress", true);
            component.set("v.ContNEAProgressBarCounter", 2);
            
        }
        component.set("v.SelectNEA",false);
        //progress Bar changes starts
        var selecNEA = component.get("v.selectedNEA");
        if(selecNEA != null && selecNEA != '' && selecNEA != undefined){
          component.set("v.SelectNEA",true);  
        }
        component.set("v.ProgressBarNEACounter",2);
        component.set("v.StageNumber",7);        
        component.set('v.neaColumns', [
            {label: 'Network Element ID', fieldName: 'CH_NetworkElementID__c', sortable: 'true', searchable: 'true', type: 'text'},
            {label: 'Asset Name', fieldName: 'URL', sortable: 'true', searchable: 'true', type: 'url', typeAttributes: {
                label: { fieldName: 'Name' }
            }},
            {label: 'Product', fieldName: 'ProductURL', sortable: 'true', searchable: 'true', type: 'url', typeAttributes: {
                label: { fieldName: 'ProductName' }
            }},
            {label: 'Solution', fieldName: 'SolutionURL', sortable: 'true', searchable: 'true', type: 'url', typeAttributes: {
                label: { fieldName: 'SolutionName' }
            }},
            {label: 'Product Variant', fieldName: 'VariantURL', sortable: 'true', searchable: 'true', type: 'url', typeAttributes: {
                label: { fieldName: 'VariantName' }
            }},
            {label: 'Product Release', fieldName: 'ReleaseURL', sortable: 'true', searchable: 'true', type: 'url', typeAttributes: {
                label: { fieldName: 'ReleaseName' }
            }},
            {label: 'Address', fieldName: 'Address', sortable: 'true', searchable: 'true', type: 'text'},
            {label: 'Lab', fieldName: 'CH_LabEnvironment__c', sortable: 'true', type: 'boolean'},        
            {label: 'Country', fieldName: 'CH_CountryISOName__c', searchable: 'true', type: 'hidden'}
        ]);
        var conAccounts = component.get('v.conAccounts');
        var selectedAsset = component.get("v.selectedAssets");
        var selectedCLI = component.get("v.selectedclis");
        console.log('SELECTED CLI NEA:'+JSON.stringify(selectedCLI));
        var cliId = null;
        //console.log('SEL ASSET:'+selectedAsset[0].HWS_ContractLineItem__c);
        if(selectedAsset != undefined && selectedAsset != '' && selectedAsset != null){
            cliId = selectedAsset[0].HWS_ContractLineItem__c;
        }  if(selectedCLI != undefined && selectedCLI != '' && selectedCLI != null){
            cliId = selectedCLI[0].Id;
        } 
        console.log('CLI ID NEA:'+cliId);
        this.getNetworkElementAssets(component,conAccounts[0].Id,cliId);
    },
   gotoStep6: function(component,event,helper){
        //2503 SPS Last Order Date validation started
        var selCLI = component.get("v.selectedclis");
        if(selCLI != null && selCLI != '' && selCLI != undefined)
            if(selCLI[0].CH_QtyCoveredNetworkElementAssets__c == 0){
                component.set("v.showVI",true);
            } else{
                component.set("v.showVI",false);
            }
        component.set("v.selectedAssetstep2",true);
        component.set("v.selectedLineItemstep2",true);
        var clis = component.get("v.clis");
        if(clis != null && clis != '' && clis != undefined){
            console.log('enter NEA for ### clis'+JSON.stringify(component.get("v.clis")));
            component.set("v.ContractNumProgress" ,true);
            component.set("v.ContProgressBarCounter" ,2);
            
        }
        var selNEA = component.get("v.selectedNEA");            
        if(selNEA != null && selNEA != '' && selNEA != undefined && clis != null && clis != '' && clis != undefined){
            console.log('contract number true and Select NEA > 0');
            component.set("v.SelectNEA" ,true); 
            component.set("v.ContNEAProgressBarCounter" ,3);
        }
        
        if(component.get("v.toProceedSPSLOD")){
            this.showToast('error','Error Message','Cannot add this part as last order date for the part has already passed, Please contact HWS Customer Delivery Manager');
        }
        else{
            this.getSellableItems(component,event);    
        }
        //2503 SPS Last Order Date validation Ended
        //this.getSellableItems(component,event);     
        component.set("v.assetFilterText", null); 
    },
   open2: function(component, event, helper) {  
        console.log('Entered here open2');
        component.set("v.ProgressBarCounter",1);
        component.set("v.ProgressBarNEACounter",1);
        component.set("v.ContProgressBarCounter", 1);
       // progress bar change start
        component.set("v.selectedAssetstep2",true);
        component.set("v.selectedLineItemstep2",true);
         // progress bar change Ends
        component.set("v.ContractNumNEAProgress", false);
        component.set("v.SelectNEAProgress",false); 
        var clis = component.get("v.clis");
        if(clis != null && clis != '' && clis != undefined){
            console.log('enter NEA for clis'+component.get("v.clis"));
            component.set("v.ContractNumProgress" ,false);
        }
       
       component.set("v.StageNumber", 2);
        var selectedAssets = component.get("v.selectedAssets");
        var selectedClis = component.get("v.selectedclis");
        var showAssets = component.get("v.showAssets");
        var showClis = component.get("v.showClis");                
        component.set("v.assetFilterText", '');
        component.set("v.Assets",component.get("v.AllAssets"));
        component.set("v.VersionItemFilterText", '');
        component.set("v.versionItems",component.get("v.AllversionItems"));
        if(showAssets=='true'){
            
            var searchType=component.find("InputSelectSingle");
            searchType.set("v.value",'Part Code');
            var dTable = component.find("cliTable");
            var selectedAcc = dTable.getSelectedRows();
            var selectedAcc = component.get("v.selectedAssets")
            if (typeof selectedAcc != 'undefined' && selectedAcc) {
                var selectedRowsIds = [];
                for(var i=0;i<selectedAcc.length;i++){
                    selectedRowsIds.push(selectedAcc[i].Id);  
                }         
                var dTable = component.find("cliTable");
                dTable.set("v.selectedRows", selectedRowsIds);
                component.set("v.oldSelectedAssets",dTable.get("v.selectedRows"));
            }
        }
        if(showClis=='true'){
            var searchType=component.find("InputSelectSingle");
            searchType.set("v.value",'Contract Number');
            var dTable = component.find("conTable");
            var selectedCli = dTable.getSelectedRows();
            console.log('selected rows'+selectedCli);
            var selectedCli = component.get("v.selectedclis")
            if (typeof selectedCli != 'undefined' && selectedCli) {
                var selectedRowsIds = [];
                for(var i=0;i<selectedCli.length;i++){
                    selectedRowsIds.push(selectedCli[i].Id);  
                }         
                var dTable = component.find("conTable");
                dTable.set("v.selectedRows", selectedRowsIds);
                component.set("v.oldSelectedclis",dTable.get("v.selectedRows"));
            }
        }
        var selectedNEA = component.get("v.selectedNEA");
        var buttonName = event.getSource().getLocalId();
        var neaButton= (buttonName=='neaNext') ? true :false;
        if(neaButton && (selectedNEA == null || selectedNEA == undefined || selectedNEA =='')){
            this.showToast('error','Error Message','Please select Network Element Asset before proceeding');
            component.set("v.StageNumber",7);
        }
    },
    //25689 To handle the Requested Date Shipment function from Dlivery Info screen in line Edit
    handleCustReqShipmentDate: function(component,event,helper) {       
       	var childCasesList = component.get("v.childCases");        
       	var reqVal = true;
        var countryTimezone = 'GMT';
        var shipToTimeZone = component.get("v.shipToTimeZone");        
        var shipToTimeZoneMap = component.get("v.shipToTimeZoneMap");
        if(childCasesList){            
            for(var i=0;i<childCasesList.length;i++){
                var requestedDate = childCasesList[i].HWS_Requested_Delivery_Date_Time__c; 
                if(childCasesList[i].HWS_Requested_Delivery_Date_Time__c != null && childCasesList[i].HWS_Requested_Delivery_Date_Time__c != undefined){
						childCasesList[i].Street_Address_3__c =  null;                                           
                        
                        if(shipToTimeZone == 'Account'){
                            countryTimezone = shipToTimeZoneMap[component.get('v.ShiptopartyAddress')];
                        }
                        if (shipToTimeZone == 'BusinessHour'){
                            var bhId = childCasesList[i].Street_Address_2__c;
                            countryTimezone = shipToTimeZoneMap[bhId];
                            console.log('bhIdddd'+bhId+'  countryTimezoneeee'+countryTimezone);
                        }
                        var countryTime = new Date(requestedDate).toLocaleString("en-US", {timeZone: countryTimezone});                    
                        countryTime = new Date(countryTime);
                        var counteryDateOnly = $A.localizationService.formatDate(countryTime);                       
                        counteryDateOnly = counteryDateOnly.replace(/[\/\\.-]/g, ' ');                        
                        var counteryTimeOnly = $A.localizationService.formatTime(countryTime);                        
                      /*  var monthNames = [
                            "Jan", "Feb", "Mar",
                            "Apr", "May", "Jun", "Jul",
                            "Aug", "Sep", "Oct",
                            "Nov", "Dec"
                          ];*/
                        var hours = countryTime.getHours();
                        var minutes = countryTime.getMinutes();
                        var ampm = hours >= 12 ? 'pm' : 'am';
                        if(counteryTimeOnly.includes("AM") || counteryTimeOnly.includes("PM")){
                            ampm = hours >= 12 ? 'PM' : 'AM';
                        }
                        hours = hours % 12;
                        hours = hours ? hours : 12; // the hour '0' should be '12'
                        minutes = minutes < 10 ? '0'+minutes : minutes;
                        var strTime = hours + ':' + minutes + ' ' + ampm;                        
                        childCasesList[i].HWS_RequestedDateShipment__c = counteryDateOnly +', ' + strTime +' ('+countryTimezone+')';
                                        
                    }                    
                    else{
                        childCasesList[i].HWS_Requested_Delivery_Date_Time__c = null;
                        childCasesList[i].HWS_RequestedDateShipment__c = null;
                        childCasesList[i].Street_Address_3__c =  "delInfoBGCol"; 
                    }
                } 
            	component.set("v.childCases",childCasesList);            	
            	this.getplannedDeliveryDateTime(component, event,helper);
            	component.set("v.StageNumber",8);
           	}
    },
     //US 27245 SR  begin
    gotoStep3a: function(component, event, helper) {
        this.gotoStep3(component, event, helper);
        var searchCriteria = component.get("v.searchCriteria");
        if(searchCriteria == 'Part Code'){
        	component.set("v.SelectNEAProgress",false);
        	component.set("v.SelectNEAProgressBar",false);
            component.set("v.SelectProgressBar",true);
            
            }
        var selecVersionItems = component.get("v.selectedVersions");
        if(selecVersionItems == null || selecVersionItems == '' || selecVersionItems == undefined){
            console.log('null'); 
            component.set("v.selectedVersionstep3",false);
            component.set("v.newChildAddPart",true);
        }
        var selNEA = component.get("v.selectedNEA");            
        if(selNEA != null && selNEA != '' && selNEA != undefined){
            if(searchCriteria == 'Part Code'){
                component.set("v.SelectNEAProgress",true);
                component.set("v.SelectNEAProgressBar",true);
                //added by lakshman
                component.set("v.SelectProgressBar",false);
                component.set("v.ContractNumProgress",false);
                component.set("v.ContractNumNEAProgress",false);
                //added by lakshman
            }
       }
    },	
    gotoStep3c: function(component, event, helper) {
        console.log('step3c');
        this.gotoStep3(component, event, helper);
    },
    //NOKIASC-25662    
    selectNetworkElementAssetA : function(component, event, helper){
        console.log('selectNetworkElementAssetA'+component.get("v.selectedNEA"));
        this.selectNetworkElementAsset(component, event, helper);
        var searchCriteria = component.get("v.searchCriteria");
        if(searchCriteria == 'Part Code'){
            component.set("v.SelectNEAProgress",true);
            component.set("v.SelectNEAProgressBar",true); 
            //added by lakshman
            component.set("v.SelectProgressBar",false); 
            component.set("v.ContractNumProgress",false);
            component.set("v.ContractNumNEAProgress",false);
            //added by lakshman
            }
        var selecNEA = component.get("v.selectedNEA");
        if(selecNEA == null && selecNEA == '' && selecNEA == undefined){
          component.set("v.SelectNEA",false);  
        }
        var selecVersionItems = component.get("v.selectedVersions");
        if(selecVersionItems == null || selecVersionItems == '' || selecVersionItems == undefined){
            console.log('null'); 
            component.set("v.selectedVersionstep3",false);
            component.set("v.newChildAddPart",true);
        }
       component.set("v.ContractNumNEAProgress", false);
    },
    //to convert the service type based on the value choosen on the popup
    convertServiceType : function(component){
        var valueChoosen = component.get("v.valueChoosen");
        console.log('valuechoosen '+valueChoosen);
        if(this.valid(valueChoosen)){
            //assign popup value 
            if(valueChoosen == 'Service Notification Based SPS'){
                component.set("v.serviceTypeCheck",'Advanced Exchange in Days');
            }
            else{
                component.set("v.serviceTypeCheck",valueChoosen);
            }
        }
    },
    //to assign/convert the service type based on the value choosen on the popup
    assignServiceType : function(component){
        var valueChoosen = component.get("v.valueChoosen");
        var selectedAsset = component.get("v.selectedAssets");
        if(this.valid(valueChoosen)){
            if(valueChoosen == 'Service Notification Based SPS'){
                return 'Advanced Exchange in Days';
            }
            else{
                return valueChoosen;
            }
        }
        else{
            return selectedAsset[0].HWS_Service_Type__c;
        }       
     },
     valid : function(object) {
         return object != null && object != '' && object != undefined;
     }
     //end US27245    
        
})