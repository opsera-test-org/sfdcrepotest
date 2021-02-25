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
    <fieldUpdates>
        <fullName>CH_CPA_AutoFill_ADT</fullName>
        <field>CH_Assigned_Date_Time__c</field>
        <formula>NOW()</formula>
        <name>CH_CPA_AutoFill_ADT</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>CH_CPA_AutoFill_EDT</fullName>
        <field>CH_Executed_Date_Time__c</field>
        <formula>NOW()</formula>
        <name>CH_CPA_AutoFill_EDT</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>CH_CPA_Autofill_CDT</fullName>
        <field>CH_CPA_Closed__c</field>
        <formula>NOW()</formula>
        <name>CH_CPA_Autofill_CDT</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>CH_Update_Assigned_Date</fullName>
        <field>CH_Assigned_Date_Time__c</field>
        <formula>NOW()</formula>
        <name>CH Update Assigned Date</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>CH_Update_Cancelled_Date</fullName>
        <field>CH_Cancelled_Date_Time__c</field>
        <formula>NOW()</formula>
        <name>CH Update Cancelled Date</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>CH_Update_Closed_Date</fullName>
        <field>CH_CPA_Closed__c</field>
        <formula>NOW()</formula>
        <name>CH Update Closed Date</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>CH_Update_Rejected_Date</fullName>
        <field>CH_Rejected_Date_Time__c</field>
        <formula>NOW()</formula>
        <name>CH Update Rejected Date</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>CH_Update_Status_Field</fullName>
        <field>CH_CPA_Status__c</field>
        <literalValue>Created</literalValue>
        <name>CH Update Status Field</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <rules>
        <fullName>CH CPA Creation Notification</fullName>
        <actions>
            <name>CH_CPA_Creation_Notification</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Created</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>CH CPA Rejection Notification</fullName>
        <actions>
            <name>CH_CPA_Rejection_Notification</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Rejected</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>CH Update Assigned Date When CPA owner is Assigned</fullName>
        <actions>
            <name>CH_Update_Assigned_Date</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Assigned</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>CH Update Cancelled Date When CPA owner Cancel the Action</fullName>
        <actions>
            <name>CH_Update_Cancelled_Date</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Cancelled</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>CH Update Closed Date When CPA owner Closes the Action</fullName>
        <actions>
            <name>CH_Update_Closed_Date</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Closed</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>CH Update Rejected Date When CPA owner Rejects the Action</fullName>
        <actions>
            <name>CH_Update_Rejected_Date</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Rejected</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>CH Update Status as Created</fullName>
        <actions>
            <name>CH_Update_Status_Field</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>notEqual</operation>
            <value>Created</value>
        </criteriaItems>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>CH_CPA_Assignment Notification</fullName>
        <actions>
            <name>CH_CPA_Assignment_Email_Sent</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <description>When my name is put as Case owner ,I should receive  a notification based on the attached  template
https://yoursl.atlassian.net/browse/NOKIASC-19602</description>
        <formula>ISPICKVAL(CH_CPA_Status__c, &quot;Assigned&quot;)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>CH_CPA_Creation Notification</fullName>
        <actions>
            <name>CH_CPA_Creation_Notification</name>
            <type>Alert</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Created</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>CH_CPA_Creation_Email_Notification_Managers</fullName>
        <actions>
            <name>CH_CPA_Creation_Email_Notification_Managers</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Created</value>
        </criteriaItems>
        <description>US 18631</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>CH_CPA_ExecutedDateTime</fullName>
        <actions>
            <name>CH_CPA_AutoFill_EDT</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <formula>ISPICKVAL(CH_CPA_Status__c, &quot;Performed&quot;) &amp;&amp; ISBLANK(CH_Executed_Date_Time__c)</formula>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>CH_CPA_Rejection Notification</fullName>
        <actions>
            <name>CH_CPA_Rejection_Notification</name>
            <type>Alert</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Rejected</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>CH_CPA_RejectionEmailNot</fullName>
        <actions>
            <name>CH_CPA_EmailToManagerGroup</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Rejected</value>
        </criteriaItems>
        <description>This Rule will work when status will be Rejected.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>CH_CPA_Update Assigned Date When CPA owner is Assigned</fullName>
        <actions>
            <name>CH_Update_Assigned_Date</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Assigned</value>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>CH_CPA_Update Cancelled Date When CPA owner Cancel the Action</fullName>
        <actions>
            <name>CH_Update_Cancelled_Date</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Cancelled</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>CH_CPA_Update Closed Date When CPA owner Closes the Action</fullName>
        <actions>
            <name>CH_Update_Closed_Date</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Closed</value>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>CH_CPA_Update Rejected Date When CPA owner Rejects the Action</fullName>
        <actions>
            <name>CH_Update_Rejected_Date</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>CH_Corrective_Preventive_Action__c.CH_CPA_Status__c</field>
            <operation>equals</operation>
            <value>Rejected</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
</Workflow>
