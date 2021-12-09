<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <fieldUpdates>
        <fullName>CH_CA_Save_CLISA_For_Duplication_Check</fullName>
        <field>CH_Duplicate__c</field>
        <formula>CH_Workgroup__c  +  CH_ContractLineItem__c + TEXT(CH_Severity__c)</formula>
        <name>CH_CA_Save_CLISA_For_Duplication_Check</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>false</reevaluateOnChange>
    </fieldUpdates>
    <rules>
        <fullName>CH_CA_Save_ContractLineIemSeverityAssociation_For_Duplication_Check</fullName>
        <actions>
            <name>CH_CA_Save_CLISA_For_Duplication_Check</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <formula>true</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
</Workflow>
