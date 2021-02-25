/****************************************
Name            Modified DATE       Comments
Rajeshwari      Nov 2 2019			Created this Componenet as part of EPIC NOKIASC-23474 & 
									NOKIASC-24090
									NOKIASC-24091
*****************************************/
({
    getColumnNameBasedOnServiceClassification :function(component){
        var action = component.get("c.getServiceClassification");
        action.setParams({
            "contractLineItemId" : component.get("v.recordId")
        }); 
        action.setCallback(this, function(response) { 
            var state = response.getState();
            if (state === "SUCCESS") {
                var responseValue = response.getReturnValue();
                component.set("v.serviceCLType",responseValue.CH_ServiceClassification__c);
                
                if(component.get("v.serviceCLType") =="HWS Service"){
                    component.set('v.mycolumns', [
                        {label: 'Network Element ID', fieldName: 'AssetNID', type: 'text',sortable:'true'},
                       // {label: 'Asset Name', fieldName: 'AssetName', type: 'text',sortable:'true'},
					    {label: 'Asset Name', fieldName: 'linkName', type: 'url' ,  
						typeAttributes: {label: { fieldName: 'AssetName' }, target: '_blank', sortable:'true'}},
                       // {label: 'Status', fieldName: 'AssetStatus', type: 'text',sortable:'true'},
                        {label: 'Address Details', fieldName: 'AssetAddressDetails', type: 'text',sortable:'true'},
                        {label: 'Lab', fieldName: 'LabEnvironment', type: 'Boolean',sortable:'true',
                         "cellAttributes": {
                             "iconName": { "fieldName": "LabEnvironment_chk" },
                             "iconPosition": "left"
                         }},
                        {label: 'Product', fieldName: 'AssetProduct', type: 'text',sortable:'true'},
                        {label: 'Solution', fieldName: 'AssetSolution', type: 'text',sortable:'true'},
                        {label: 'Product Variant', fieldName: 'AssetProductVariant', type: 'text',sortable:'true'},
                        {label: 'Product Release', fieldName: 'AssetProductRelease', type: 'text',sortable:'true'}
                        
                    ]);
                }else{
                    component.set('v.mycolumns', [
                        {label: 'Network Element ID', fieldName: 'AssetNID', type: 'text',sortable:'true'},
                        //{label: 'Asset Name', fieldName: 'AssetName', type: 'text',sortable:'true'},
						 {label: 'Asset Name', fieldName: 'linkName', type: 'url' ,  
						typeAttributes: {label: { fieldName: 'AssetName' }, target: '_blank', sortable:'true'}},
                       // {label: 'Status', fieldName: 'AssetStatus', type: 'text',sortable:'true'},
                        {label: 'Address Details', fieldName: 'AssetAddressDetails', type: 'text',sortable:'true'},
                        {label: 'Lab', fieldName: 'LabEnvironment', type: 'Boolean',sortable:'true',
                         "cellAttributes": {
                             "iconName": { "fieldName": "LabEnvironment_chk" },
                             "iconPosition": "left"
                         }},
                        {label: 'Product', fieldName: 'AssetProduct', type: 'text',sortable:'true'},
                        
                        {label: 'Product Release', fieldName: 'AssetProductRelease', type: 'text',sortable:'true'}
                        
                    ]);
                    
                }
            }
            
        });
        $A.enqueueAction(action);
    },
    getAssetsWithSearchFilter: function(component, page, recordToDisply, sortedBy, sortedDirection, type) {
        component.set("v.isError", false);
        var action = component.get("c.fetchAssetNetworkElementWithSearch");
        var selectedFilter = component.get("v.selectedfilterDetail");
        var selectedFilterObj = [];
        if(selectedFilter !=null && selectedFilter.length >0){
            for(var i =0; i< selectedFilter.length ; i++){
                var filterDetail = selectedFilter[i];
                filterDetail.isNew = false;
                selectedFilterObj.push(filterDetail);
            }
        }
        component.set("v.selectedfilterDetail",selectedFilterObj);
        action.setParams({
            "pageNumber": page,
            "recordToDisply": recordToDisply,
            "contractLineItemId" : component.get("v.recordId") ,
            "searchKeyWord" : component.get("v.searchKeyword") ,
            "jsonFiterSelected": JSON.stringify(component.get("v.selectedfilterDetail")),
            "sortedBy" : sortedBy,
            "sortedDirection" : sortedDirection,
            "type" : "Unlink",
            "serviceCLType" : component.get("v.serviceCLType")
        });  
        action.setCallback(this, function(response) { 
            var state = response.getState();
            var serviceClassification = component.get("v.serviceCLType");
            if (state === "SUCCESS") {
                var responseValue = response.getReturnValue();
                var rows = responseValue.networkEleAssests;
                var currentIdList = [];
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];	
                    if (row.CH_NetworkElementAsset__c && row.CH_NetworkElementAsset__c!=null) {
                        
                        row.Id = row.CH_NetworkElementAsset__c;
                        currentIdList.push(row.Id);
                        row.AssetNID = row.CH_NetworkElementAsset__r.CH_NetworkElementID__c;
                        row.AssetName = row.CH_NetworkElementAsset__r.Name;
						row.linkName = '/'+row.CH_NetworkElementAsset__c;
                        row.AssetStatus = row.CH_NetworkElementAsset__r.Status;
                        row.AssetCity = row.CH_NetworkElementAsset__r.CH_City__c;
                        row.AssetState = row.CH_NetworkElementAsset__r.CH_State_Province__c;
                        row.LabEnvironment = row.CH_NetworkElementAsset__r.CH_LabEnvironment__c;
                        if(row.LabEnvironment ){
                            row.LabEnvironment_chk ='utility:check';
                        }
                        
                        if(row.CH_NetworkElementAsset__r.Product2Id !=null){
                            row.AssetProduct = row.CH_NetworkElementAsset__r.Product2.Name;
                        }
                        if(serviceClassification =="HWS Service"){
                            if(row.CH_NetworkElementAsset__r.CH_Solution__c !=null){
                                row.AssetSolution= row.CH_NetworkElementAsset__r.CH_Solution__r.Name;
                            }
                            if(row.CH_NetworkElementAsset__r.CH_ProductVariant__c !=null){
                                row.AssetProductVariant = row.CH_NetworkElementAsset__r.CH_ProductVariant__r.Name;
                            }
                        }
                        if(row.CH_NetworkElementAsset__r.CH_ProductRelease__c !=null){
                            row.AssetProductRelease = row.CH_NetworkElementAsset__r.CH_ProductRelease__r.Name;
                        }  
                        if(row.CH_NetworkElementAsset__r.Address__c !=null){
                            var street = row.CH_NetworkElementAsset__r.Address__r.Street? row.CH_NetworkElementAsset__r.Address__r.Street+', ' :'' ;
                            var city = row.CH_NetworkElementAsset__r.CH_City__c? row.CH_NetworkElementAsset__r.CH_City__c+', ' :'' ;
                            var postalcode = row.CH_NetworkElementAsset__r.Address__r.PostalCode? row.CH_NetworkElementAsset__r.Address__r.PostalCode+', ' :'' ;
                            var state = row.CH_NetworkElementAsset__r.CH_State_Province__c? row.CH_NetworkElementAsset__r.CH_State_Province__c+', ' :'' ;
                            var country = row.CH_NetworkElementAsset__r.Address__r.Country? row.CH_NetworkElementAsset__r.Address__r.Country :'' ;
                            row.AssetAddressDetails = street + city + postalcode + state + country;
                            row.AssetStreet = row.CH_NetworkElementAsset__r.Address__r.Street;
                        }  
                    }
                }
                component.set('v.networkEleAssests', rows);
                if(type !=undefined && type=="Onload"){
                    component.set('v.releaseValue', responseValue.releaseValue);
                    component.set('v.variantValue', responseValue.variantValue);
                    component.set('v.solutionValue', responseValue.solutionValue);
                }
                
                
                component.set('v.currentIdList', currentIdList);
                component.set("v.page", responseValue.page);
                component.set("v.total", responseValue.total);
                component.set("v.pages", Math.ceil(responseValue.total / recordToDisply));
                var obj = component.get("v.selectedRowsList");
                component.set("v.selectedRowsList",obj);
                if(obj == undefined || obj.length == 0){
                    component.set("v.onRow", true);
                }
                if(responseValue.total < 20 ){
                    component.set("v.isScroll", false);
                }else{
                    component.set("v.isScroll", true);
                }
                component.set("v.Spinner",false);
                return responseValue;
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
                component.set("v.isError", true);
                component.set("v.Spinner",false);
            }
            
        });
        $A.enqueueAction(action);
    },
    sortData: function (cmp, fieldName, sortDirection) {
        var data = cmp.get("v.networkEleAssests");
        var reverse = sortDirection !== 'asc';
        data.sort(this.sortBy(fieldName, reverse));
        cmp.set("v.networkEleAssests", data);
    },
    
    sortBy: function (field, reverse, primer) {
        var key = primer ?
            function(x) {return primer(x.hasOwnProperty(field) ? (typeof x[field] === 'string' ? x[field].toLowerCase() : x[field]) : 'aaa')} :
        function(x) {return x.hasOwnProperty(field) ? (typeof x[field] === 'string' ? x[field].toLowerCase() : x[field]) : 'aaa'};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {            
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },
    doInit: function(component, event, helper) {
        component.set("v.Spinner",true);
        var page = component.get("v.page") || 1;
        var recordToDisply = 2000;//component.find("recordSize").get("v.value");
        component.set('v.mycolumns', [
            {label: 'Network Element ID', fieldName: 'AssetNID', type: 'text',sortable:'true'},
            {label: 'Asset Name', fieldName: 'AssetName', type: 'text',sortable:'true'},
            // {label: 'Status', fieldName: 'AssetStatus', type: 'text',sortable:'true'},
            {label: 'Address Details', fieldName: 'AssetAddressDetails', type: 'text',sortable:'true'},
            {label: 'Lab Environment', fieldName: 'LabEnvironment', type: 'Boolean',sortable:'true',
             "cellAttributes": {
                 "iconName": { "fieldName": "LabEnvironment_chk" },
                 "iconPosition": "left"
             }},
            {label: 'Product', fieldName: 'AssetProduct', type: 'text',sortable:'true'},
            {label: 'Product Release', fieldName: 'AssetProductRelease', type: 'text',sortable:'true'}
            
        ]);
        component.set("v.selectedfilterDetail",[] );
        component.set("v.selectedFilter",[]);
        component.set("v.searchKeyword",null);
        helper.getAssetsWithSearchFilter(component, 1, recordToDisply, component.get("v.sortedBy"), component.get("v.sortedDirection"));
        helper.sortData(component, component.get("v.sortedBy"), component.get("v.sortedDirection"));
    },
    getMoreAssets: function(component, page, recordToDisply, sortedBy, sortedDirection,event){
        return new Promise($A.getCallback(function(resolve, reject) {
            event.getSource().set("v.isLoading", false);
            var action = component.get("c.fetchAssetNetworkElementWithSearch");
            var selectedFilter = component.get("v.selectedfilterDetail");
            var selectedFilterObj = [];
            if(selectedFilter !=null && selectedFilter.length >0){
                for(var i =0; i< selectedFilter.length ; i++){
                    var filterDetail = selectedFilter[i];
                    filterDetail.isNew = false;
                    selectedFilterObj.push(filterDetail);
                }
            }
            component.set("v.selectedfilterDetail",selectedFilterObj);
            action.setParams({
                "pageNumber": page,
                "recordToDisply": recordToDisply,
                "contractLineItemId" : component.get("v.recordId") ,
                "searchKeyWord" : component.get("v.searchKeyword") ,
                "jsonFiterSelected": JSON.stringify(component.get("v.selectedfilterDetail")),
                "sortedBy" : sortedBy,
                "sortedDirection" : sortedDirection,
                "type" : "Unlink",
                "serviceCLType" : component.get("v.serviceCLType")
            });  
            action.setCallback(this, function(response) {
                var state = response.getState();
                if(state === "SUCCESS"){
                    var serviceClassification = component.get("v.serviceCLType");
                    var responseValue = response.getReturnValue();
                    var resultData = responseValue.networkEleAssests;
                    resolve(resultData);   
                    component.set("v.page", responseValue.page);
                    component.set("v.total", responseValue.total);
                    component.set("v.pages", Math.ceil(responseValue.total / recordToDisply));
                    var obj = component.get("v.selectedRowsList");
                    if(obj == undefined ||  obj.length == 0){
                        component.set("v.onRow", true);
                    }
                    
                    component.set("v.selectedRowsList",obj);
                    
                }   
                else if (state === "ERROR") {
                    var errors = response.getError();
                    
                    console.error(errors);
                    component.set("v.refreshFlag",false);
                }
                
            });
            $A.enqueueAction(action);
        }));
    },
})