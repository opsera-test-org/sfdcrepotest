<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>CH_CPA_Assignment_Email_Sent</fullName>
        <description>CH_CPA Assignment Email Sent</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CPA_Management/CH_CPACH_CPA_Assignment_Notification</template>
    </alerts>
    <alerts>
        <fullName>CH_CPA_Creation_Email_Notification_Managers</fullName>
        <description>CH_CPA_Creation_Email_Notification_Managers</description>
        <protected>false</protected>
        <recipients>
            <field>CH_CPA_Manager__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CPA_Management/CH_CPA_Creattion</template>
    </alerts>
    <alerts>
        <fullName>CH_CPA_Creation_Notification</fullName>
        <description>CH CPA Creation Notification</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CPA_Management/CH_CPA_Creation_Notification</template>
    </alerts>
    <alerts>
        <fullName>CH_CPA_EmailToManagerGroup</fullName>
        <description>CH_CPA_EmailToManagerGroup</description>
        <protected>false</protected>
        <recipients>
            <recipient>CPA_Manager_Group</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CPA_Management/CH_CPA_RejectionStatus</template>
    </alerts>
    <alerts>
        <fullName>CH_CPA_Rejection_Notification</fullName>
        <description>CH CPA Rejection Notification</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <field>CH_CPA_Manager__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CPA_Management/CH_CPA_Rejection_Notification</template>
    </alerts>
    <alerts>
        <fullName>CH_CPA_TargetDateApproachingEmail</fullName>
        <description>CH_CPA_TargetDateApproachingEmail</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <field>CH_CPA_Manager__c</field>
            <type>userLookup</type>
        </recipients>
        <recipients>
            <field>CH_CPA_Owner__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CPA_Management/CH_CPA_TargetDateApproachingEmailTemplate</template>
    </alerts>
</Workflow>