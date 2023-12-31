/****************************************
Name            Modified DATE       Comments
Rajeshwari      Nov 2 2019			Created this Componenet as part of EPIC NOKIASC-23474 & 
									NOKIASC-24090
									NOKIASC-24091
*****************************************/
({
    doInit: function(component, event, helper) {
        var page = component.get("v.page") || 1;
        //var recordToDisply = component.find("recordSize").get("v.value");
        helper.getColumnNameBasedOnServiceClassification(component);
        var serviceClassification = component.get("v.serviceCLType");
        var recordToDisply = 2000;//component.find("recordSize").get("v.value");
        component.set("v.selectedfilterDetail",[] );
        component.set("v.selectedFilter",[]);
        component.set("v.searchKeyword",null);
        component.set('v.loadMoreStatus', 'Please scroll down to load more data');
        component.set('v.enableInfiniteLoading', true);
        helper.getAssetsWithSearchFilter(component, 1, recordToDisply, component.get("v.sortedBy"), component.get("v.sortedDirection"), "Onload");
        
        helper.sortData(component, component.get("v.sortedBy"), component.get("v.sortedDirection"));
    },
    
    updateColumnSorting: function (cmp, event, helper) {
        cmp.set("v.onRow", false);
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        var recordToDisply = 2000;//component.find("recordSize").get("v.value");
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.page",1);
        cmp.set("v.sortedDirection", sortDirection);
        event.getSource().set("v.isLoading", true);
        cmp.set('v.loadMoreStatus', 'Please scroll down to load more data');
        cmp.set('v.enableInfiniteLoading', true);
        helper.getAssetsWithSearchFilter(cmp, 1, recordToDisply, cmp.get("v.sortedBy"), sortDirection);
        //helper.sortData(cmp, fieldName, sortDirection);
    },
    
    navigate: function(component, event, helper) {
        component.set("v.onRow", false);
        var page = component.get("v.page") || 1;
        var direction = event.getSource().get("v.alternativeText");
        var recordToDisply = 2000;//component.find("recordSize").get("v.value");
        page = direction === "Previous Page" ? (page - 1) : (page + 1);
        var sortedBy = component.get("v.sortedBy");
        var sortDirection = component.get("v.sortedDirection");
        event.getSource().set("v.isLoading", true);
        component.set('v.loadMoreStatus', 'Please scroll down to load more data');
        component.set('v.enableInfiniteLoading', true);
        helper.getAssetsWithSearchFilter(component, page, recordToDisply, sortedBy, sortDirection);
        //helper.sortData(component, component.get("v.sortedBy"), component.get("v.sortedDirection"));
    },
    viewPicklist : function(component, event, helper) {
        component.set("v.showcomponent",true);
        var action = component.get("c.getFilterFieldDetails");
        action.setParams({
            "fieldLabel": null,
            "existingFilter" : component.get("v.selectedFilter"),
            "isChanged":  false,
            "contractLineItemId" : component.get("v.recordId") ,
            "serviceCLType" :  component.get("v.serviceCLType")
        });
        action.setCallback(this, function(response) {
            component.set("v.filterDetail",response.getReturnValue());
            var fieldList = component.get("v.filterDetail.fieldList");
            if(fieldList !=null && fieldList.length >0 ){
                component.set("v.selectedField",fieldList[0]);
            }
            var fieldOptValue = component.get("v.filterDetail.operators");
            if(fieldOptValue !=null ){
                component.set("v.selectedOpt",fieldOptValue[0]); 
            }
            var fieldpicklistValue = component.get("v.filterDetail.picklistValue");
            if(fieldpicklistValue !=null ){
                component.set("v.slValue",fieldpicklistValue[0]); 
            }
        });
        $A.enqueueAction(action);
    },
    closePiclistFilterSection: function(component, event, helper) {
        //  alert ('closePiclistFilterSection');
        component.set("v.showcomponent",false);
    },
    onSelectChange: function(component, event, helper) {   
        component.set("v.onRow", false);
        var page = 1
        var recordToDisply = 2000;//component.find("recordSize").get("v.value");
        var sortedBy = component.get("v.sortedBy");
        var sortDirection = component.get("v.sortedDirection");
        component.set("v.page",1);
        event.getSource().set("v.isLoading", true);
        component.set('v.loadMoreStatus', 'Please scroll down to load more data');
        component.set('v.enableInfiniteLoading', true);
        helper.getAssetsWithSearchFilter(component, page, recordToDisply, sortedBy, sortDirection);
        
        // helper.sortData(component, component.get("v.sortedBy"), component.get("v.sortedDirection"));
    },
    onChangeFieldName : function (component, event, helper) {
        var selectedFieldName = component.get("v.selectedField");
        var action = component.get("c.getFilterFieldDetails");
        action.setParams({
            "fieldLabel": selectedFieldName,
            "existingFilter" : component.get("v.selectedFilter"),
            "isChanged":  true,
            "contractLineItemId" : component.get("v.recordId") ,
            "serviceCLType" :  component.get("v.serviceCLType")
        });
        action.setCallback(this, function(response) {
            component.set("v.filterDetail",response.getReturnValue());
            var fieldOptValue = component.get("v.filterDetail.operators");
            if(fieldOptValue !=null ){
                component.set("v.selectedOpt",fieldOptValue[0]); 
            }
            
            if(selectedFieldName =='Product Release'){
                component.set("v.slValue", component.get("v.releaseValue") ); 
                component.set("v.filterDetail.picklistValue", component.get("v.releaseValue") ); 
            }
            else if(selectedFieldName =='Product Variant'){
                component.set("v.slValue", component.get("v.variantValue") ); 
                component.set("v.filterDetail.picklistValue", component.get("v.variantValue") ); 
            }
                else if(selectedFieldName =='Solution'){
                    component.set("v.slValue", component.get("v.solutionValue") ); 
                    component.set("v.filterDetail.picklistValue", component.get("v.solutionValue") );
                }
            var fieldpicklistValue = component.get("v.filterDetail.picklistValue");
            if(fieldpicklistValue !=null ){
                component.set("v.slValue",fieldpicklistValue[0]); 
            }
            
            
        });
        $A.enqueueAction(action);
    },
    
    saveFilter: function (component, event, helper) {
        component.set("v.showcomponent",false);
        var fieldList = component.get("v.filterDetail.fieldList");
        if(fieldList !=null  && fieldList.length >0){
            
            var selectedFieldValue = "";
            if(component.get("v.filterDetail.isPickValue")){
                selectedFieldValue =component.get("v.slValue");
            }else{
                selectedFieldValue = component.get("v.filterDetail.fieldValue");
            }
            var existingFieldName = component.get("v.selectedFilter");
            var selectedFieldName = component.get("v.selectedField");
            var selectedFieldOpertaor = component.get("v.selectedOpt");
            component.set("v.filterDetail.fieldName",selectedFieldName);
            component.set("v.filterDetail.fieldValue",selectedFieldValue);
            component.set("v.filterDetail.fieldOperator",selectedFieldOpertaor);
            component.set("v.filterDetail.isNew",true);
            existingFieldName.push(selectedFieldName);
            component.set("v.selectedFilter",existingFieldName);
            var action = component.get("c.assignSelectedFieldsForFilter");
            action.setParams({
                "jsonFieldFilter": JSON.stringify(component.get("v.filterDetail")),
                "jsonFieldFilterList": JSON.stringify(component.get("v.selectedfilterDetail"))
            });
            action.setCallback(this, function(response) {
                component.set("v.selectedfilterDetail",response.getReturnValue());
            });
            $A.enqueueAction(action);
            
        }
    },
    getAssertWithSearchFilter: function(component, event, helper) {
        var page = 1;//component.get("v.page") || 1;
        var recordToDisply = 2000;//component.find("recordSize").get("v.value");
        var sortedBy = component.get("v.sortedBy");
        var sortDirection = component.get("v.sortedDirection");
        component.set("v.page",page);
        event.getSource().set("v.isLoading", true);
        component.set('v.loadMoreStatus', 'Please scroll down to load more data');
        component.set('v.enableInfiniteLoading', true);
        helper.getAssetsWithSearchFilter(component, page, recordToDisply, sortedBy, sortDirection);
        
        // helper.sortData(component, component.get("v.sortedBy"), component.get("v.sortedDirection"));
        component.set("v.filtercomponent",false);
    },
    openFilterSection: function(component, event, helper) {       
        component.set("v.filtercomponent",true);
        component.set("v.showcomponent",false);
        
    },
    closeFilterSection: function(component, event, helper) {
        component.set("v.filtercomponent",false);
        component.set("v.showcomponent",false);
    },
    removeFromFilter : function(component, event, helper) {
        var filterList = component.get("v.selectedfilterDetail");
        var selectedItem = event.currentTarget;
        //Get the selected item index
        var index = selectedItem.dataset.record;
        filterList.splice(index, 1);
        component.set("v.selectedfilterDetail", filterList);
        
        var ctarget = event.currentTarget;
        var id_str = ctarget.dataset.value;
        var existingFieldName = component.get("v.selectedFilter");
        
        existingFieldName = existingFieldName.filter(e => e !== id_str);
        component.set("v.selectedFilter",existingFieldName);
        
    },
    removeAllFilter : function(component, event, helper) {
        var fl = [];
        component.set("v.selectedfilterDetail",fl );
        component.set("v.selectedFilter",fl);
    },
    cancel : function(component, event, helper) {
        
        var action = component.get("c.cancelSelectedFieldsForFilter");
        var fieldFilterList = component.get("v.selectedfilterDetail");
        if(fieldFilterList !=null && fieldFilterList.length>0){
            for(var i=0; i<fieldFilterList.length ; i++){
                if(fieldFilterList[i].isNew){
                    var existingFieldName = component.get("v.selectedFilter");
                    var id_str = fieldFilterList[i].fieldName
                    existingFieldName = existingFieldName.filter(e => e !== id_str);
                    component.set("v.selectedFilter",existingFieldName);
                }
            }
            action.setParams({
                "jsonFieldFilterList": JSON.stringify(component.get("v.selectedfilterDetail"))
            });
            action.setCallback(this, function(response) {
                component.set("v.selectedfilterDetail",response.getReturnValue());
            });
            $A.enqueueAction(action);
        }
        component.set("v.filtercomponent",false);
        component.set("v.showcomponent",false);
    },
    unlinkCoveredNetworkElementAsset :function (component, event, helper) {
        component.set("v.Spinner", true); 
        var selectedRows =component.get("v.selectedRowsList");
        var recordId = component.get("v.recordId");
        var action = component.get("c.unlinkToCoveredNetworkElement");
        action.setParams({
            "contractLineItemId" : component.get("v.recordId") ,
            "selectedRowID" : selectedRows 
        });  
        action.setCallback(this, function(response) { 
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.isError", false);
                var recordToDisply = 2000;//component.find("recordSize").get("v.value");
                event.getSource().set("v.isLoading", true);
                component.set('v.loadMoreStatus', 'Please scroll down to load more data');
                component.set('v.enableInfiniteLoading', true);
                helper.getAssetsWithSearchFilter(component, 1, recordToDisply, component.get("v.sortedBy"), component.get("v.sortedDirection"));
                
                component.set("v.Spinner", false); 
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
                component.set("v.isError", true);
                component.set("v.Spinner",false);
            }
            
        });
        $A.enqueueAction(action);
    }
    
    ,
    searchKey: function(component, event, helper) {
        component.set("v.onRow", false);
        var page = 1;//component.get("v.page") || 1;
        var recordToDisply = 2000;//component.find("recordSize").get("v.value");
        var sortedBy = component.get("v.sortedBy");
        var sortDirection = component.get("v.sortedDirection");
        component.set("v.page",page);
        event.getSource().set("v.isLoading", true);
        component.set('v.loadMoreStatus', 'Please scroll down to load more data');
        component.set('v.enableInfiniteLoading', true);
        helper.getAssetsWithSearchFilter(component, page, recordToDisply, sortedBy, sortDirection);
        component.set("v.filtercomponent",false);
    },
    updateSelectedText: function (component, event) {
        var obj =  component.get("v.selectedRowsList");
        if(component.get("v.onRow")){
            var selectedRows = event.getParam('selectedRows');
            var obj =  component.get("v.selectedRowsList");
            var currenSelectedRow =  [];
            for (var i = 0; i < selectedRows.length; i++){
                currenSelectedRow.push(selectedRows[i].Id);
                if(obj.indexOf(selectedRows[i].Id) > -1 ) {
                }else{
                    obj.push(selectedRows[i].Id);
                }
            }
            var currentIdList =  component.get("v.currentIdList");
            var removeIdList =  [];
            for(var i = 0; i < currentIdList.length; i++){
                if(currenSelectedRow.indexOf(currentIdList[i]) > -1 ) {
                    
                }else{
                    removeIdList.push(currentIdList[i]);
                }
            }
            var onlyInOld = obj.filter(comparer(removeIdList));
            component.set("v.selectedRowsList",onlyInOld);
            //helper comparer function
            function comparer(otherArray){
                return function(current){
                    return otherArray.filter(function(other){
                        return other == current
                    }).length == 0;
                }
            }
            
        }else{
            component.set("v.onRow", true);
        }
    },
    refreshFlag: function (component, event, helper) {
        var updFlag = event.getParam("refreshFlag");
        if(updFlag){
            console.log('If###'+updFlag);
            helper.doInit(component, event, helper);
            //$A.get('e.force:refreshView').fire();
        }
    },
    // this function automatic call by aura:waiting event  
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for display loading spinner 
        // component.set("v.Spinner", true); 
        
    },
    
    // this function automatic call by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
        // make Spinner attribute to false for hide loading spinner    
        // component.set("v.Spinner", false);
    },
    
    handleLoadMoreAssets: function (component, event, helper) {
        if(!event.getSource().get("v.isLoading")){
            event.getSource().set("v.isLoading", true);
            component.set('v.loadMoreStatus', 'Loading....');
            component.set("v.onRow", false);
            var page = component.get("v.page") || 1;
            var direction = event.getSource().get("v.alternativeText");
            var recordToDisply = component.get("v.recordSize");
            //page = direction === "Previous Page" ? (page - 1) : (page + 1);
            
            var sortedBy = component.get("v.sortedBy");
            var sortDirection = component.get("v.sortedDirection");
            page =  (page + 1);
            component.set("v.page",page);
            helper.getMoreAssets(component, page, recordToDisply, sortedBy, sortDirection,event).then($A.getCallback(function (data) {
                
                if (component.get('v.networkEleAssests').length == component.get('v.total') ||(data != undefined && data.length ==0) ) {//||(data != undefined && data.length ==0)
                    component.set('v.enableInfiniteLoading', false);
                    component.set('v.loadMoreStatus', 'No more data to load');
                } else {
                    
                    event.getSource().set("v.isLoading", false);
                    var serviceClassification = component.get("v.serviceCLType");
                    var rows = data;
                    var cid =[];
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        if (row!=null) {
                            row.Id =row.CH_NetworkElementAsset__r.CH_NetworkElementID__c;
                            cid.push(row.Id);
                            // row.AssetNID = row.CH_NetworkElementID__c;
                            //row.AssetName = row.Name;
                            // row.AssetStatus = row.Status;
                            row.linkName = '/'+row.CH_NetworkElementAsset__c;
                            if (row.CH_NetworkElementAsset__c && row.CH_NetworkElementAsset__c!=null) {
                                row.AssetNID = row.CH_NetworkElementAsset__r.CH_NetworkElementID__c;
                                row.AssetName = row.CH_NetworkElementAsset__r.Name;
                                row.AssetStatus = row.CH_Status__c;
                                row.AssetCity = row.CH_NetworkElementAsset__r.CH_City__c;
                                row.AssetState = row.CH_NetworkElementAsset__r.CH_State_Province__c;
                                row.LabEnvironment = row.CH_NetworkElementAsset__r.CH_LabEnvironment__c;
                                row.NEAStatus = row.CH_NetworkElementAsset__r.Status;
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
                    }
                    //component.set('v.currentIdList', cid);
                    var currentID = component.get('v.currentIdList');
                    var concatCurrentId = currentID.concat(cid); 
                    component.set('v.currentIdList', concatCurrentId);
                    var currentData = component.get('v.networkEleAssests');
                    var newData = currentData.concat(rows);
                    component.set('v.networkEleAssests', newData);
                    component.set('v.loadMoreStatus', 'Please scroll down to load more data');
                    
                }
                event.getSource().set("v.isLoading", false);
            }));
        }
    },
})