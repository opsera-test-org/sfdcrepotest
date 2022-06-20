<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>CPQ_Send_Email_to_Submitted_for_Approval_Status_Change</fullName>
        <description>Send Email to Submitted for Approval Status Change</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Apttus__ApttusEmailTemplates/CPQ_EBG_Send_Email_to_Inform_about_Approval_Stage</template>
    </alerts>
    <alerts>
        <fullName>CPQ_Send_Email_to_Submitter_for_Rejected_Stage</fullName>
        <description>EBG_Send Email to Submitter for Rejected Stage</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Apttus__ApttusEmailTemplates/CPQ_EBG_Send_Email_to_Inform_about_Rejected_Stage</template>
    </alerts>
    <alerts>
        <fullName>Email_to_AM</fullName>
        <description>Email to AM</description>
        <protected>false</protected>
        <recipients>
            <field>NokiaCPQ_Account_Manager_User__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/NotifyQuoteAccountManager_Approval_Required</template>
    </alerts>
    <alerts>
        <fullName>Send_Email_To_Partner_For_LEO_Quote</fullName>
        <ccEmails>heema.1.solanki@nokia.com</ccEmails>
        <ccEmails>Rahul.garje@nokia.com</ccEmails>
        <description>Send Email To Partner For LEO Quote</description>
        <protected>false</protected>
        <recipients>
            <field>NokiaCPQ_Partner_Sales_Manager__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/Send_Email_to_Partner_to_Inform_about_his_certification</template>
    </alerts>
    <alerts>
        <fullName>Send_Email_to_PSM_for_Approval_Status_Change</fullName>
        <ccEmails>rahul.garje@nokia.com</ccEmails>
        <description>Send Email to PSM for Approval Status Change</description>
        <protected>false</protected>
        <recipients>
            <field>NokiaCPQ_Partner_Sales_Manager__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Apttus__ApttusEmailTemplates/CPQ_Approval_Status_Change_to_PSM</template>
    </alerts>
</Workflow>
