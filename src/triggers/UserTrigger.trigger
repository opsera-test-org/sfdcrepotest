/**
* @description: Trigger on User sObject
* @author:	Accenture IDC.
*
* ============================================================================
* History:
* -------
*
* VERSION AUTHOR	DATE		DETAIL			FEATURES/CSR/TTP
* 1.0	   26/12/2016   Sprint 3 Doc Stretegy & LoA requirements.
* ============================================================================
*/
/* BRUNO PALMA REFACTOR*/
Trigger UserTrigger on User(before insert, after insert, before update, after Update, before delete, after delete)
{
	if(!UserInfo.getProfileId().equalsIgnoreCase(system.Label.Data_Loader_Profile_Id))
	{
		new UserTriggerHandler().run();
	}
	new UserHandler_TH().run();
}