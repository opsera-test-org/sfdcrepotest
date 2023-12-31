({
    helperMethod : function(component, event, helper,opptyName,G3_Planned_Date,G4_Approval_Date,G5_Planned_Date,G6_Planned_Date) {
        // convert lead method call
      
        // set date values to method
        var actionupdatLead= component.get("c.updateLead");
        actionupdatLead.setParams({
            "LeadId":component.get("v.recordId"),
           // "G2_Planned_Date":G2_Planned_Date,
            "G3_Planned_Date":G3_Planned_Date,
            "G4_Approval_Date":G4_Approval_Date,
            "G5_Planned_Date":G5_Planned_Date,
            "G6_Planned_Date":G6_Planned_Date
        });  
        actionupdatLead.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS'){
                var actionConvertLeadDetails = component.get("c.ConvertLead");
                
                actionConvertLeadDetails.setParams({
                    "LeadId":component.get("v.recordId"),
                    "PartnerId":component.get("v.LeadDetails.PartnerAccount.Id"),
                    "OpptyName":opptyName
                });  
                
                actionConvertLeadDetails.setCallback(this, function(response) {
                    
                    var state = response.getState();
                    var Flag;
                    Flag=response.getReturnValue();
                    var ConvertID =Flag.split(",");
                    
                    component.set("v.OpptyId",ConvertID[0]);
                    if (state == 'SUCCESS'){
                        var firstPage = component.find("waitingCase");
                        //alert("firstPage"+firstPage);
                        //alert("Success"+state);
                        $A.util.addClass(firstPage,'slds-hide');                            
                        $A.util.removeClass(firstPage,'slds-show');
                       // $A.util.addClass(firstPage,'slds-show');                            
                       // $A.util.removeClass(firstPage,'slds-hide');
                        if(Flag.indexOf('Success')!= -1)
                        {
                            component.set("v.ErrMessage", ""); 
                            //  component.set("v.ErrMessage",'Your Lead has been converted');
                            
                            component.set("v.OpptyName",opptyName);
                            
                            //get partner contact
                            
                            var actionOwnerContact = component.get("c.getContactDeatils");
                            actionOwnerContact.setParams({
                                
                                "ownerID":component.get("v.LeadDetails.Owner.Id")
                                
                            });  
                            actionOwnerContact.setCallback(this, function(a) {
                                
                                component.set("v.ContactDetail",a.getReturnValue());
                                
                                
                            });
                            $A.enqueueAction(actionOwnerContact);
                            
                            
                            // end
                            var ConvertedHeader=component.find("ConvertedHeader");
                            $A.util.addClass(ConvertedHeader, 'slds-show');
                            $A.util.removeClass(ConvertedHeader, 'slds-hide');// changes made for Summer 18 release ticket no.00012216 
        					
                           // $A.util.addClass(ConvertedHeader, 'Show');
                           // $A.util.removeClass(ConvertedHeader, 'Hide');
                            var ConvertedBody=component.find("ConvertedBody");
                            $A.util.addClass(ConvertedBody, 'slds-show');
                            $A.util.removeClass(ConvertedBody, 'slds-hide');
        					
                            //$A.util.addClass(ConvertedBody, 'Show');
                            //$A.util.removeClass(ConvertedBody, 'Hide');
                            var HideConvert=component.find("ConvertHeader");
                            $A.util.addClass(HideConvert, 'slds-hide');
                            $A.util.removeClass(HideConvert, 'slds-show');
                            //$A.util.addClass(HideConvert, 'Hide');
                            //$A.util.removeClass(HideConvert, 'Show');
                            var ConvertBody=component.find("ConvertBody");
                            $A.util.addClass(ConvertBody, 'Hide');
                            $A.util.removeClass(ConvertBody, 'Show');
                            var FooterComp=component.find("FooterComp");
                            $A.util.addClass(FooterComp, 'Hide');
                            $A.util.removeClass(FooterComp, 'Show');
                            
                            
                        }
                        else
                        {
                            component.set("v.ErrMessage",response.getReturnValue());       
                            
                        }
                        
                    }
                    else if (state === "ERROR") {
                        
                        var firstPage = component.find("waitingCase");
                        $A.util.addClass(firstPage,'slds-hide');                            
                        $A.util.removeClass(firstPage,'slds-show');
                        var errors = response.getError();
                        
                        if (errors) {
                            if (errors[0] && errors[0].pageErrors) {
                                component.set("v.ErrMessage", errors[0].pageErrors[0].message); 
                                
                            }
                        } 
                    }
                });
                $A.enqueueAction(actionConvertLeadDetails);
                
            }           
        });
        $A.enqueueAction(actionupdatLead);
        
        
    },
    CheckEndCustomer : function(component, event, helper){
       // var leadId=component.get("v.recordId");
      
    }
})