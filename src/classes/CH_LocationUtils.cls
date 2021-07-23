/** 
 * About 
 * ----- 
 * @Description	  : Case Handling Location Utils.
 * @TestClass		: CH_LocationUtils_Test.
 * @Project		  : Case Handling.
 * @Modification Log : 
 *  Created  : 2019 11 27 – tiago.almeida@nokia.com
 * ----- 
**/
public class CH_LocationUtils {
	public static DML_SObject DM_ISOCountryCodes = new DML_SObject(ISO_Country_Codes__c.sObjectType);
	private final static String GOOGLE_GEOCODE_API_KEY  = 'AIzaSyA29FmOjIHTRha3ORZkzjK_iQ5eUw9q4Ac'; 
	private final static String GOOGLE_TIMEZONE_API_KEY  = 'AIzaSyCglJ2EME0Xr74N4by-M5_K__U8YMjBO3w'; 

	/**
	 * @description : Check if a specific Country is Multi-TimeZone - NOKIASC-#####
	 * @param	   : String countryName
	 * @return	  : Boolean
	**/
	public static Boolean countryIsMultiTimezone(String countryName) {
		List<ISO_Country_Codes__c> oISOCountryCodes = DM_ISOCountryCodes.doSelect('Id, Country_Name__c, Multi_Timezone__c').doWhere('Country_Name__c = "'+countryName+'"').setOptions('LIMIT 1').doQuery();
		try {
			return oISOCountryCodes.get(0).Multi_Timezone__c;
		} catch (Exception e) {
			System.debug('CH_LocationUtils Error: No Country found!');
			throw new AuraHandledException('No Country found!');
		}
	}

	/**
	 * @description : 
	 * @param	   : Map<String, Object> 
	 * @return	  : String
	**/
	public static String getTimeZone(Map<String, Object> coordinates) {
		Map<String, Object> request = null;
		try {
			request = googleMapsRequest('timezone', 'location=' + coordinates.get('lat') + ',' + coordinates.get('lng') + '&timestamp=1331161200');
			return (String) request.get('timeZoneId');
		} catch (Exception e) {
			throw new AuraHandledException(((String) request.get('status')).equals('ZERO_RESULTS') ? 'No Location found!' : ('Something went wrong! '+ e.getMessage()));
		}
	}
	
	/**
	 * @description : 
	 * @param	   : String address
	 * @param	   : String city
	 * @param	   : String postalCode
	 * @param	   : String state
	 * @param	   : String country
	 * @return	  : Map<String, Object>
	**/
	public static Map<String, Object> getCoordinates(String address, String city, String postalCode, String state, String country) {
		Map<String, Object> request = null;
		String url = 'components=street_address:' + address + '|locality:' + city + ', ' + state + '|postal_code:' + postalCode + '|country:'+ country;
		try {
			request = googleMapsRequest('geocode', (url != null ? url.replace(' ', '+') : ''));
			return (Map<String, Object>) ((List<Object>) request.get('results')).get(0);
		} catch (Exception e) {
			throw new AuraHandledException(((String) request.get('status')).equals('ZERO_RESULTS') ? 'No Location found!' : ('Something went wrong! '+ e.getMessage()));
		}
		
	}
	
	/**
	 * @description : 
	 * @param	   : String request
	 * @return	  : Map<String, Object>
	**/
	public static Map<String, Object> googleMapsRequest(String requestType, String request) {
		Map<String, Object> result = null;
		try {
			Http h = new Http();
			// Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
			HttpRequest req = new HttpRequest();
			req.setEndpoint(
				'https://maps.googleapis.com/maps/api/' +
				requestType + '/json?' + request + '&key=' +
				(requestType.equals('geocode')?GOOGLE_GEOCODE_API_KEY:GOOGLE_TIMEZONE_API_KEY)
			);
			req.setMethod('GET');
			// Send the request, and return a response
			HttpResponse res = h.send(req); 
			//
			result = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
		} catch(Exception ex) {
			throw new AuraHandledException('Google Maps Request Exception: ' + ex.getMessage());
		}
		return result;
	}
}