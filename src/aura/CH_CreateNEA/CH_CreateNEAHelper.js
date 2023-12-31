/*<!--*****************************************
Modified : Rajeshwari		20 Feb 2019				 NOKIASC-25159 - CLI cannot have NEAs linked when Contract type internal or Service Classification blank.
***************************************** 
--> */
({
    init: function(component, event, helper) {
        this.incrementActionCounter(component);
        this.apexAction(component, "c.getCLIDetails", {
            "idCLI": component.get("v.recordId")
        }, (error, result) => {
            this.decrementActionCounter(component);
            if (error) {
                this.showToast('error', 'Error', error && error[0] && error[0].message ? error[0].message : "Something went wrong");
                return console.log(error);
            }
            var contractLineItemRecord = result;
            if (contractLineItemRecord) {
                component.set('v.Account', contractLineItemRecord.CH_Account__c);
                if (contractLineItemRecord.Asset) {
                    component.set('v.product', contractLineItemRecord.Asset.Product2);
                    component.set('v.productRelease', contractLineItemRecord.Asset.CH_ProductRelease__r);
                    component.set('v.assetProductRelease', contractLineItemRecord.Asset.CH_ProductRelease__r);
                    component.set('v.productVariant', contractLineItemRecord.Asset.CH_ProductVariant__r);
                    component.set('v.solution', contractLineItemRecord.Asset.CH_Solution__r);
                    component.set('v.preDefProductFields', {
                        'product': contractLineItemRecord.Asset.Product2 ? contractLineItemRecord.Asset.Product2 : null,
                        'productRelease': contractLineItemRecord.Asset.CH_ProductRelease__r ? contractLineItemRecord.Asset.CH_ProductRelease__r : null,
                        'productVariant': contractLineItemRecord.Asset.CH_ProductVariant__r ? contractLineItemRecord.Asset.CH_ProductVariant__r : null,
                        'solution': contractLineItemRecord.Asset.CH_Solution__r ? contractLineItemRecord.Asset.CH_Solution__r : null
                    });
                    component.set('v.Address', contractLineItemRecord.Asset.Address__c);
                    component.set('v.CountryISOName', contractLineItemRecord.CH_CountryISOName__c);
                }
                //
                if (contractLineItemRecord.ServiceContract) {
                    component.set('v.AccountId', contractLineItemRecord.ServiceContract.AccountId);
                    component.set('v.accountNumber', contractLineItemRecord.ServiceContract.Account.AccountNumber);
                }
                //component.set('v.Asset.AccountId', contractLineItemRecord.ServiceContract.AccountId);Asset.AccountId
                //component.set('v.Account1', contractLineItemRecord.CH_Account__r.Id);
                //component.set('v.NetworkElementID', contractLineItemRecord.Asset.CH_NetworkElementID__c);
                //component.set('v.LabEnvironment', contractLineItemRecord.Asset.CH_LabEnvironment__c);
                component.set('v.ServiceClassification', contractLineItemRecord.CH_ServiceClassification__c);
            	//NOKIASC-29426
            	this.apexAction(component, "c.getAccountLocation", {
                    "accountId": contractLineItemRecord.ServiceContract.AccountId,
                    "accountNumber": contractLineItemRecord.ServiceContract.Account.AccountNumber,
                }, (error, result) => result?component.set('v.locationId', result.Id):null);
            }
        });
    },
    // Apex Action
    apexAction: function(component, method, params, callback) {
        let helper = this,
            action = component.get(method);
        if (params) {
            action.setParams(params);
        }
        action.setCallback(helper, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                callback(null, response.getReturnValue());
            } else {
                callback(response.getError(), null);
            }
        });
        $A.enqueueAction(action);
    },
    // Generic Toast Message
    showToast: function(sType, title, message) {
        $A.get("e.force:showToast").setParams({
            "title": title,
            "message": message,
            "type": sType
        }).fire();
    },
    // Loading Framework
    isLoading: function(component) {
        return component.get("v.showSpinner");
    },
    incrementActionCounter: function(component) {
        var counter = component.get("v.actionCounter") + 1;
        if (counter === 1) {
            component.set("v.showSpinner", true);
        }
        component.set("v.actionCounter", counter);
    },
    decrementActionCounter: function(component) {
        var counter = component.get("v.actionCounter") - 1;
        if (counter === 0) {
            component.set("v.showSpinner", false);
        }
        component.set("v.actionCounter", counter);
    },
    /* Modified By - Rajeshwari 
    Details - NOKIASC-25121 - Only NE Admin Permission User Should have access to create NEA*/
    helperValidateUserPermission: function(component, event, action) {
        var action = component.get("c.validatePermissionSet");
        action.setCallback(this, function(response) {
            var state = response.getState();
            var response = response.getReturnValue();
            if (state == "SUCCESS" && response) {
                component.set("v.authorizedUser", response);
            } else {
                component.set("v.authorizedUser", false);
                $A.get("e.force:closeQuickAction").fire();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "You are not Authorized to create NEA",
                    "message": "Please contact Admin",
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);

    },
    //Suniti -24906
    //Rajeshwari-NOKIASC-25159 - Modified Error Message
    helperCheckCreateNEAButton: function(component, event, helper) {
        var action = component.get("c.CheckforButton");
        action.setParams({
            idCLI: component.get("v.recordId")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var response = null; //response.getReturnValue();
            if (state == "SUCCESS" && response) {
                /*component.set("v.buttonAccess", response);*/
                component.set("v.buttonAccess", false);
                console.log(JSON.stringify(response));
                $A.get("e.force:closeQuickAction").fire();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    /*"title": "When Service Classification field is Blank,NO access",
                    "message": "To access Create NEA button , please fill this field", */
                    "title": "This Contract Line Item cannot have Network Element Assets",
                    "message": "Please check Service Classification and Contract type",
                });
                toastEvent.fire();
            } else {
                component.set("v.buttonAccess", true);

            }
        });
        $A.enqueueAction(action);
    },
    /* Rajeshwari NOKIASC-25067*/
    onChangeAddress: function(component, addressId) {
        if (addressId != null && addressId != '') {
            var action = component.get("c.getAddressCountryName");
            action.setParams({
                addressId: addressId
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                var response = response.getReturnValue();

                if (state == "SUCCESS") {
                    component.set("v.Asset.CH_CountryISOName__c", response);

                }
            });
            $A.enqueueAction(action);
        } else {
            component.set("v.Asset.CH_CountryISOName__c", null);
        }
    },
    setTabInfo : function(component) {
        var workspaceAPI = component.find("workspace");
        workspaceAPI.getEnclosingTabId().then(function(response) {
            workspaceAPI.setTabLabel({
                tabId: response,
                label: "Create NEA",
                title: "Create NEA"
            });
            workspaceAPI.setTabIcon({
                tabId: response,
                icon: "standard:asset_action_source", //set icon you want to set
                iconAlt: "Create NEA"
            });
        })
    },
})