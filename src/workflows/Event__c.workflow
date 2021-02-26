<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>EEC_Cancellation_Notify</fullName>
        <description>EEC Cancellation Notify</description>
        <protected>false</protected>
        <recipients>
            <field>Event_Host__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/EEC_Event_notification_Cancellation</template>
    </alerts>
    <alerts>
        <fullName>EEC_Event_Cancellation</fullName>
        <description>EEC - Event Cancellation</description>
        <protected>false</protected>
        <recipients>
            <field>Event_Host__c</field>
            <type>userLookup</type>
        </recipients>
        <senderAddress>salesforce.no_reply@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>EEC_Email_Template/EEC_Event_Cancellation</template>
    </alerts>
    <alerts>
        <fullName>EEC_Event_Request</fullName>
        <description>EEC - Event Request</description>
        <protected>false</protected>
        <recipients>
            <field>Venue_Contact_Email_common__c</field>
            <type>email</type>
        </recipients>
        <senderAddress>salesforce.no_reply@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>EEC_Email_Template/EEC_Event_Request</template>
    </alerts>
    <alerts>
        <fullName>EEC_Request</fullName>
        <description>EEC Request</description>
        <protected>false</protected>
        <recipients>
            <field>Venue_Contact_Email_common__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/EEC_Event_Notification</template>
    </alerts>
    <alerts>
        <fullName>ERM_Event_Cancellation</fullName>
        <description>ERM - Event Cancellation</description>
        <protected>false</protected>
        <recipients>
            <field>Event_Host__c</field>
            <type>userLookup</type>
        </recipients>
        <senderAddress>salesforce.no_reply@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>ERM/ERM_Event_Cancellation</template>
    </alerts>
    <alerts>
        <fullName>ERM_Notification_When_new_ERM_is_created_CF</fullName>
        <description>ERM - Notification When new ERM is created - CF</description>
        <protected>false</protected>
        <recipients>
            <recipient>ERM_Team</recipient>
            <type>group</type>
        </recipients>
        <senderAddress>salesforce.no_reply@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>ERM/ERM_Event_notification_New_CF_and_Backup</template>
    </alerts>
    <alerts>
        <fullName>Event_Cancellation_notification_to_the_event_stakeholders</fullName>
        <description>Event - Cancellation notification to the event stakeholders</description>
        <protected>false</protected>
        <recipients>
            <field>Customer_Engagement_team_s_contact__c</field>
            <type>email</type>
        </recipients>
        <recipients>
            <field>GLT_availability_contact_information__c</field>
            <type>email</type>
        </recipients>
        <recipients>
            <field>Venue_Contact_Email_common__c</field>
            <type>email</type>
        </recipients>
        <recipients>
            <field>Venue_Contact_Email_internal_use__c</field>
            <type>email</type>
        </recipients>
        <senderAddress>nokia_global_partner_communications@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Event_notification_Cancellation</template>
    </alerts>
    <alerts>
        <fullName>Event_Notification_to_Customer_engagement_team_to_upload_draft_presentations</fullName>
        <description>Event - Notification to Customer engagement team to upload draft presentations</description>
        <protected>false</protected>
        <recipients>
            <field>Customer_Engagement_team_s_contact__c</field>
            <type>email</type>
        </recipients>
        <senderAddress>nokia_global_partner_communications@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Event_notification_Draft_presentations_30d</template>
    </alerts>
    <alerts>
        <fullName>Event_Notification_to_Customer_engagement_team_to_upload_final_presentations</fullName>
        <description>Event - Notification to Customer engagement team to upload final presentations</description>
        <protected>false</protected>
        <recipients>
            <field>Customer_Engagement_team_s_contact__c</field>
            <type>email</type>
        </recipients>
        <senderAddress>nokia_global_partner_communications@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Event_notification_Final_presentations</template>
    </alerts>
    <alerts>
        <fullName>Event_Notification_to_Event_host_about_to_start_event_preparations</fullName>
        <description>Event - Notification to Event host about to start event preparations</description>
        <protected>false</protected>
        <recipients>
            <field>Event_Host__c</field>
            <type>userLookup</type>
        </recipients>
        <senderAddress>nokia_global_partner_communications@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Event_notification_Start_preparations</template>
    </alerts>
    <alerts>
        <fullName>Event_Notification_to_Event_host_to_approve_the_agenda_30_days_before_the_event</fullName>
        <description>Event - Notification to Event host to approve the agenda 30 days before the event</description>
        <protected>false</protected>
        <recipients>
            <field>Event_Host__c</field>
            <type>userLookup</type>
        </recipients>
        <senderAddress>nokia_global_partner_communications@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Event_notification_Approve_agenda_30d</template>
    </alerts>
    <alerts>
        <fullName>Event_Notification_to_Event_host_to_arrange_debriefing_session</fullName>
        <description>Event - Notification to Event host to arrange debriefing session</description>
        <protected>false</protected>
        <recipients>
            <field>Event_Host__c</field>
            <type>userLookup</type>
        </recipients>
        <senderAddress>nokia_global_partner_communications@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Event_notification_Debriefing</template>
    </alerts>
    <alerts>
        <fullName>Event_Notification_to_venue_contact_to_arrange_ERM_practicalities_meeting</fullName>
        <description>Event - Notification to venue contact to arrange ERM practicalities meeting</description>
        <protected>false</protected>
        <recipients>
            <field>Venue_Contact_Email_common__c</field>
            <type>email</type>
        </recipients>
        <recipients>
            <field>Venue_Contact_Email_internal_use__c</field>
            <type>email</type>
        </recipients>
        <recipients>
            <field>Event_Manager__c</field>
            <type>userLookup</type>
        </recipients>
        <senderAddress>nokia_global_partner_communications@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Event_notification_Practicalities_meeting</template>
    </alerts>
    <alerts>
        <fullName>Event_Notification_to_venue_contacts_about_a_new_event_request_logged_in_the_too</fullName>
        <description>Event - Notification to venue contacts, GLT executive assistants and Customer engagement team about a new event request logged in the tool</description>
        <protected>false</protected>
        <recipients>
            <field>Customer_Engagement_team_s_contact__c</field>
            <type>email</type>
        </recipients>
        <recipients>
            <field>GLT_availability_contact_information__c</field>
            <type>email</type>
        </recipients>
        <recipients>
            <field>Venue_Contact_Email_common__c</field>
            <type>email</type>
        </recipients>
        <recipients>
            <field>Venue_Contact_Email_internal_use__c</field>
            <type>email</type>
        </recipients>
        <senderAddress>nokia_global_partner_communications@nokia.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Event_notification_New</template>
    </alerts>
    <fieldUpdates>
        <fullName>Event_Cancellation_date</fullName>
        <field>Cancellation_date__c</field>
        <formula>TODAY()</formula>
        <name>Event - Cancellation date</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Event_Venue_email</fullName>
        <field>Venue_Contact_Email_internal_use__c</field>
        <formula>Venue_Contact_Email__c</formula>
        <name>Event - Venue email</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Event_Venue_email_common</fullName>
        <field>Venue_Contact_Email_common__c</field>
        <formula>Venue__r.Venue_Mailbox__c</formula>
        <name>Event - Venue email (common)</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Event_phase_Approval</fullName>
        <field>Event_phase__c</field>
        <literalValue>Approval</literalValue>
        <name>Event phase - Approval</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Event_phase_Closed</fullName>
        <field>Event_phase__c</field>
        <literalValue>Closed</literalValue>
        <name>Event phase - Closed</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Event_phase_Execution</fullName>
        <field>Event_phase__c</field>
        <literalValue>Execution</literalValue>
        <name>Event phase - Execution</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Event_phase_Feedback</fullName>
        <field>Event_phase__c</field>
        <literalValue>Feedback</literalValue>
        <name>Event phase - Feedback</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Event_phase_New</fullName>
        <field>Event_phase__c</field>
        <literalValue>New</literalValue>
        <name>Event phase - New</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Event_phase_Preparation</fullName>
        <field>Event_phase__c</field>
        <literalValue>Preparation</literalValue>
        <name>Event phase - Preparation</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <rules>
        <fullName>Event - Approve draft agenda</fullName>
        <active>false</active>
        <criteriaItems>
            <field>Event__c.Event_phase__c</field>
            <operation>notEqual</operation>
            <value>Closed</value>
        </criteriaItems>
        <description>The event host is notified to approve the ERM meeting agenda 30 days before the meeting. Customer engagement team is asked to upload draft presentations.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Event_Notification_to_Customer_engagement_team_to_upload_draft_presentations</name>
                <type>Alert</type>
            </actions>
            <actions>
                <name>Event_Notification_to_Event_host_to_approve_the_agenda_30_days_before_the_event</name>
                <type>Alert</type>
            </actions>
            <offsetFromField>Event__c.Event_Start_Date__c</offsetFromField>
            <timeLength>-30</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Event - Cancellation</fullName>
        <actions>
            <name>Event_Cancellation_notification_to_the_event_stakeholders</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Event_Cancellation_date</name>
            <type>FieldUpdate</type>
        </actions>
        <actions>
            <name>Event_phase_Closed</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>Event__c.Event_cancelled__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Event__c.Cancellation_reason__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Event__c.Cancellation_date__c</field>
            <operation>equals</operation>
        </criteriaItems>
        <description>Stakeholders will be notified about event cancellation and the phase is changed to Closed.</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Event - Closed</fullName>
        <active>false</active>
        <criteriaItems>
            <field>Event__c.Event_phase__c</field>
            <operation>equals</operation>
            <value>Feedback</value>
        </criteriaItems>
        <description>Event is closed 21 days after event end date.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Event_phase_Closed</name>
                <type>FieldUpdate</type>
            </actions>
            <offsetFromField>Event__c.Event_End_Date__c</offsetFromField>
            <timeLength>21</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Event - Debriefing</fullName>
        <active>false</active>
        <criteriaItems>
            <field>Event__c.Event_phase__c</field>
            <operation>equals</operation>
            <value>Execution</value>
        </criteriaItems>
        <description>The event host is asked to arrange a debriefing session with stakeholders after the event.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Event_Notification_to_Event_host_to_arrange_debriefing_session</name>
                <type>Alert</type>
            </actions>
            <actions>
                <name>Event_phase_Feedback</name>
                <type>FieldUpdate</type>
            </actions>
            <offsetFromField>Event__c.Event_End_Date__c</offsetFromField>
            <timeLength>1</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Event - Execution</fullName>
        <active>true</active>
        <criteriaItems>
            <field>Event__c.Event_phase__c</field>
            <operation>notEqual</operation>
            <value>Feedback,Closed</value>
        </criteriaItems>
        <description>Event phase is changed to Execution when today equals Event start date.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Event_phase_Execution</name>
                <type>FieldUpdate</type>
            </actions>
            <offsetFromField>Event__c.Event_Start_Date__c</offsetFromField>
            <timeLength>-6</timeLength>
            <workflowTimeTriggerUnit>Hours</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Event - Executive briefing</fullName>
        <active>false</active>
        <criteriaItems>
            <field>Event__c.Event_phase__c</field>
            <operation>notEqual</operation>
            <value>Closed</value>
        </criteriaItems>
        <description>The event host is asked to prepare a executive briefing document and to arrange a briefing call.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Executive_Briefing_document_and_call</name>
                <type>Task</type>
            </actions>
            <offsetFromField>Event__c.Event_Start_Date__c</offsetFromField>
            <timeLength>-21</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Event - Feedback</fullName>
        <active>false</active>
        <criteriaItems>
            <field>Event__c.Event_phase__c</field>
            <operation>equals</operation>
            <value>Execution</value>
        </criteriaItems>
        <description>Feedback phase starts 1 day after event end date.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Event_phase_Feedback</name>
                <type>FieldUpdate</type>
            </actions>
            <offsetFromField>Event__c.Event_End_Date__c</offsetFromField>
            <timeLength>1</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Event - Last checks</fullName>
        <active>false</active>
        <criteriaItems>
            <field>Event__c.Event_phase__c</field>
            <operation>notEqual</operation>
            <value>Closed</value>
        </criteriaItems>
        <description>Final presentations have to be available in Salesforce and ERM practicalities meeting has to be arranged by 7 days before the event.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Event_Notification_to_Customer_engagement_team_to_upload_final_presentations</name>
                <type>Alert</type>
            </actions>
            <actions>
                <name>Event_Notification_to_venue_contact_to_arrange_ERM_practicalities_meeting</name>
                <type>Alert</type>
            </actions>
            <offsetFromField>Event__c.Event_Start_Date__c</offsetFromField>
            <timeLength>-14</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Event - New event</fullName>
        <actions>
            <name>Event_Notification_to_venue_contacts_about_a_new_event_request_logged_in_the_too</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Event_Venue_email</name>
            <type>FieldUpdate</type>
        </actions>
        <actions>
            <name>Event_Venue_email_common</name>
            <type>FieldUpdate</type>
        </actions>
        <actions>
            <name>Event_phase_New</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>Event__c.Venue_Contact_Email__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Event__c.GLT_availability_contact_information__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Event__c.Customer_Engagement_team_s_contact__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>Venue contact, Executive assistants and Customer engagement team will be notified about a new event request logged in the tool.</description>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Event - Preparation</fullName>
        <actions>
            <name>Event_Notification_to_Event_host_about_to_start_event_preparations</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Event_phase_Preparation</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>Event__c.Event_phase__c</field>
            <operation>equals</operation>
            <value>New</value>
        </criteriaItems>
        <criteriaItems>
            <field>Event__c.GLT_member_s_availability_checked__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <criteriaItems>
            <field>Event__c.Venue_Status__c</field>
            <operation>equals</operation>
            <value>Confirmed</value>
        </criteriaItems>
        <description>The event host is asked to start meeting preparations with stakeholders after availability of GLT members and the venue have been confirmed.</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <tasks>
        <fullName>Briefing_session_for_BG_representatives</fullName>
        <assignedToType>owner</assignedToType>
        <description>Availability of the venue and GLT participants have been confirmed. 
Please arrange a briefing session for BG representatives to agree a draft agenda. 
The contacts can be found on ERM Sharepoint site.</description>
        <dueDateOffset>7</dueDateOffset>
        <notifyAssignee>false</notifyAssignee>
        <priority>High</priority>
        <protected>false</protected>
        <status>Open</status>
        <subject>Briefing session for BG representatives</subject>
    </tasks>
    <tasks>
        <fullName>ERM_practicalities_meeting</fullName>
        <assignedToType>owner</assignedToType>
        <description>ACTION NEEDED BY CT / EVENT HOST:
ERM practicalities meeting organized 7 days before the event by venue contact.</description>
        <dueDateOffset>-7</dueDateOffset>
        <notifyAssignee>false</notifyAssignee>
        <offsetFromField>Event__c.Event_Start_Date__c</offsetFromField>
        <priority>High</priority>
        <protected>false</protected>
        <status>Open</status>
        <subject>ERM practicalities meeting</subject>
    </tasks>
    <tasks>
        <fullName>Executive_Briefing_document_and_call</fullName>
        <assignedToType>owner</assignedToType>
        <description>ACTION NEEDED BY CT / EVENT HOST:
Executive Briefing document has to be created and uploaded to CRM. Sent it to speakers and arrange Executive Briefing call explaining the business for speakers latest 14 days before the event.</description>
        <dueDateOffset>-14</dueDateOffset>
        <notifyAssignee>false</notifyAssignee>
        <offsetFromField>Event__c.Event_Start_Date__c</offsetFromField>
        <priority>High</priority>
        <protected>false</protected>
        <status>Open</status>
        <subject>Executive Briefing document and call</subject>
    </tasks>
</Workflow>