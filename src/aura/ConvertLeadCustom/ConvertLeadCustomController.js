({
    myAction : function(component, event, helper) {
        
         var WaitMsg = component.find("waitingCase");  
        //alert('WaitMsg'+ WaitMsg);
        //$A.util.addClass(WaitMsg,'slds-show');                            
        //$A.util.removeClass(WaitMsg,'slds-hide');
        $A.util.addClass(WaitMsg,'slds-hide');                            
        $A.util.removeClass(WaitMsg,'slds-show');
        var HideModal=component.find("ConvertedHeader");
        //alert('HideModal'+ HideModal);
        // var required = component.find("firstPage");
        $A.util.addClass(HideModal, 'slds-hide');
        $A.util.removeClass(HideModal, 'slds-show'); 
        var HideConvertedBody=component.find("ConvertedBody");
        //alert('HideConvertedBody'+ HideConvertedBody);
        // var required = component.find("firstPage");
        $A.util.addClass(HideConvertedBody, 'slds-hide');
        $A.util.removeClass(HideConvertedBody, 'slds-show');
        
       var actionLeadDetails = component.get("c.getLeadDeatils");
        
        actionLeadDetails.setParams({
            
            "parentId":component.get("v.recordId")
            
        });  
        actionLeadDetails.setCallback(this, function(response) {
             
            component.set("v.LeadDetails",response.getReturnValue());
           
            
        });
        
        $A.enqueueAction(actionLeadDetails);
        
         },
    
      
    convrtLead : function(component, event, helper)
    {
        
          //Code Added for req #3343
       // var G2_Planned_Date  = component.find("G2_Planned_Date").get("v.value");
        var G3_Planned_Date  = component.find("G3_Planned_Date").get("v.value");
        var G4_Approval_Date = component.find("G4_Approval_Date").get("v.value");
        var G5_Planned_Date  = component.find("G5_Planned_Date").get("v.value");
        var G6_Planned_Date  = component.find("G6_Planned_Date").get("v.value");
        
        var FieldError=['These required fields must be completed before Conversion: '];
        var FieldName=[];
        var count = 0;
       /* if(G2_Planned_Date == '' || G2_Planned_Date == undefined){
            FieldError.push('G2 Planned Date,');
            count++;
            
        }*/
        if(G3_Planned_Date == '' || G3_Planned_Date == undefined){
            
            FieldName.push('G3 Planned Date,');
            count++;
        }
         if(G4_Approval_Date == '' || G4_Approval_Date == undefined){
             
            FieldName.push('G4 Planned Date');
             count++;
        }
        if(G5_Planned_Date == '' || G5_Planned_Date == undefined){
            
            FieldName.push('G5 Planned Date');
            count++;
        }
        if(G6_Planned_Date == '' || G6_Planned_Date == undefined){
           
            FieldName.push('G6 Planned Date');
            count++;
        }
        FieldError =FieldError.join('');
        FieldError =FieldError.concat(FieldName);
        var ConvertHeader1 = component.find("ConvertHeader");
        if(count > 0)
        {
            
         component.set("v.ErrMessage", FieldError); 
         $A.util.addClass(ConvertHeader1,'slds-show');                            
         $A.util.removeClass(ConvertHeader1,'slds-hide');
         return false; 
        } 
        
         var WaitMsg = component.find("waitingCase");
         $A.util.addClass(WaitMsg,'slds-show');                            
         $A.util.removeClass(WaitMsg,'slds-hide');
        var opptyName = component.find("OpptyName").get("v.value");
        var LeadStatus = component.get("v.LeadDetails.Status");
        //helper.CheckEndCustomer(component, event, helper);
       
        if(LeadStatus != 'Approved')
        {
            var showToast = $A.get('e.force:showToast');  
            showToast.setParams(
                {
                    'message': 'Cannot convert lead without approved status',
                    'type' : 'error'
                    
                }
            );
            
            showToast.fire(); 
            
            $A.get("e.force:closeQuickAction").fire();
            // return false;
        }
        else
        {
              var actionCheckEndCustomer = component.get("c.getEndCustomerName");
         actionCheckEndCustomer.setParams({
                "leadID":component.get("v.recordId"),
            }); 
             actionCheckEndCustomer.setCallback(this, function(response) {                
                 var state = response.getState();    
                 if (state === 'SUCCESS'){
                     if(response.getReturnValue() != 'Active'){
                     component.set("v.EndCustomerName", response.getReturnValue());  
                     //var msg = 'The End Customer: ' + response.getReturnValue() + ' is inactive. Please request account activation in CMD or set the prospect to active in singleCRM.'
                     /*** #00016817 SF Ticket ***/
                     var msg = 'The End Customer: ' + response.getReturnValue() + ' is inactive. Please request account activation in CMD by contacting your regions Market Owner found at https://nokia.sharepoint.com/sites/CMD/Contacts' 
                     component.set("v.ErrMessage",msg);
                     var firstPage = component.find("waitingCase");
                     $A.util.addClass(firstPage,'slds-hide');                            
                     $A.util.removeClass(firstPage,'slds-show');
                         return false;
                     }else{
                              //check activate  
           var actionInactivePartner = component.get("c.getInactiveAccName");
           
             actionInactivePartner.setParams({
                "leadID":component.get("v.recordId"),
            }); 
             actionInactivePartner.setCallback(this, function(response) {                
                 var state = response.getState();                 
                 var Message=response.getReturnValue();  
                 if (state === 'SUCCESS'){
                     if(Message =='No Error')
                     {
      					helper.helperMethod(component, event, helper,opptyName,G3_Planned_Date,G4_Approval_Date,G5_Planned_Date,G6_Planned_Date);
                     }else if(Message =='End Customer Not Present'){
                        
                         var errorMsgForPartner = 'Please select the "End Customer Legal Entity Account" on Deal Reg and proceed with Conversion.';
                         component.set("v.ErrMessage",errorMsgForPartner);
                          var firstPage = component.find("waitingCase");
                        $A.util.addClass(firstPage,'slds-hide');                            
                        $A.util.removeClass(firstPage,'slds-show');
                         return false;
                     }else if(Message =='BOTH Inactive'){
                         
                         var errorMsgForPartner = $A.get("$Label.c.End_Customer_Partner_Account_Inactive_Error");
                         component.set("v.ErrMessage",errorMsgForPartner);
                          var firstPage = component.find("waitingCase");
                        $A.util.addClass(firstPage,'Hide');                            
                        $A.util.removeClass(firstPage,'Show');
                         return false;
                     }else if(Message =='Partner Account Inactive'){
                         
                         var errorMsgForPartner = $A.get("$Label.c.Partner_Account_Inactive_Error");
                         component.set("v.ErrMessage",errorMsgForPartner);
                          var firstPage = component.find("waitingCase");
                        $A.util.addClass(firstPage,'slds-hide');                            
                        $A.util.removeClass(firstPage,'slds-show');
                         return false;
                     }else if(Message =='End Customer Account Inactive'){
                       
                         var errorMsgForPartner = 'The End Customer Legal Entity: "'+ component.get("v.LeadDetails.End_Customer_Legal_Entity_Account__r.Name")+'" is inactive in CMD. Please request Account Activation in CMD and return to convert this deal once active.';
                         component.set("v.ErrMessage",errorMsgForPartner);
                          var firstPage = component.find("waitingCase");
                        $A.util.addClass(firstPage,'slds-hide');                            
                        $A.util.removeClass(firstPage,'slds-show');
                         return false;
                     }
                 }
                  });
             $A.enqueueAction(actionInactivePartner);    
                     }
                 }
             });
          $A.enqueueAction(actionCheckEndCustomer);
            //new code

   
            
        }
    },
    closeButton : function(component, event, helper)
    {
        $A.get("e.force:closeQuickAction").fire();
    },
    navigateToOppty : function (component, event, helper)
    {
        var OpptyID= component.get("v.OpptyId");
        
        var navEvt = $A.get("e.force:navigateToSObject");
                        navEvt.setParams({
                            "recordId": OpptyID,
                            "slideDevName": "detail"
                        });
                        navEvt.fire();
    },
     navigateToAccount : function (component, event, helper)
    {
        var AccID= component.get("v.LeadDetails.PartnerAccount.Id");
        
        var navEvt = $A.get("e.force:navigateToSObject");
                        navEvt.setParams({
                            "recordId": AccID,
                            "slideDevName": "detail"
                        });
                        navEvt.fire();
    },
     navigateToContact : function (component, event, helper)
    {
        var ConID= component.get("v.ContactDetail.Contact.Id");
        
        var navEvt = $A.get("e.force:navigateToSObject");
                        navEvt.setParams({
                            "recordId": ConID,
                            "slideDevName": "detail"
                        });
                        navEvt.fire();
    }
    
})