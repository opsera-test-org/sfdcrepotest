<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>DS_New_Task_Email_Alert</fullName>
        <description>DS New Task Email Alert</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderAddress>salesforce.no_reply@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/DS_New_Task_Notification</template>
    </alerts>
    <alerts>
        <fullName>DS_New_Task_Email_Alert_SFR_Logistics</fullName>
        <ccEmails>projet-sfr.logistics@nokia.com</ccEmails>
        <description>DS New Task Email Alert SFR Logistics</description>
        <protected>false</protected>
        <senderAddress>salesforce.no_reply@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/DS_New_Task_Notification</template>
    </alerts>
    <alerts>
        <fullName>DS_New_Task_Email_Alert_SFR_Wipro</fullName>
        <ccEmails>eur.orderprocess@wipro.com</ccEmails>
        <ccEmails>projet-sfr.logistics@nokia.com</ccEmails>
        <description>DS New Task Email Alert SFR Wipro</description>
        <protected>false</protected>
        <recipients>
            <recipient>prabakar.jothi_munirathinam.ext@singlecrm.nokia.com</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>saranya.1.ganesan.ext@singlecrm.nokia.com</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>shridhar.pradhan.ext@singlecrm.nokia.com</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>suresh.arjunan.ext@singlecrm.nokia.com</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>vignesh.venkatesan.ext@singlecrm.nokia.com</recipient>
            <type>user</type>
        </recipients>
        <senderAddress>salesforce.no_reply@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/DS_New_Task_Notification</template>
    </alerts>
    <alerts>
        <fullName>DS_Task_reassigned_Email_Alert</fullName>
        <description>DS Task reassigned Email Alert</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderAddress>salesforce.no_reply@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/DS_Task_reassigned_Notification</template>
    </alerts>
    <alerts>
        <fullName>DS_Task_reassigned_Email_Alert_SFR_Logistics</fullName>
        <ccEmails>projet-sfr.logistics@nokia.com</ccEmails>
        <description>DS Task reassigned Email Alert SFR Logistics</description>
        <protected>false</protected>
        <senderAddress>salesforce.no_reply@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/DS_Task_reassigned_Notification</template>
    </alerts>
    <alerts>
        <fullName>DS_Task_reassigned_Email_Alert_SFR_Wipro</fullName>
        <ccEmails>eur.orderprocess@wipro.com</ccEmails>
        <description>DS Task reassigned Email Alert SFR Wipro</description>
        <protected>false</protected>
        <recipients>
            <recipient>prabakar.jothi_munirathinam.ext@singlecrm.nokia.com</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>saranya.1.ganesan.ext@singlecrm.nokia.com</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>shridhar.pradhan.ext@singlecrm.nokia.com</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>suresh.arjunan.ext@singlecrm.nokia.com</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>vignesh.venkatesan.ext@singlecrm.nokia.com</recipient>
            <type>user</type>
        </recipients>
        <senderAddress>salesforce.no_reply@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/DS_Task_reassigned_Notification</template>
    </alerts>
    <fieldUpdates>
        <fullName>Update_Task_Completion</fullName>
        <field>isTaskCompleted__c</field>
        <literalValue>1</literalValue>
        <name>Update Task Completion</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
</Workflow>
