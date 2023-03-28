public class sObjectController {
    @AuraEnabled(cacheable=true)
    public static List<sObjectList> getObjects(string exceptObject){

     	List<sObjectList> result = new List<sObjectList>();
         
         
     	for(Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values()){
         	if(!objTyp.getDescribe().getName().equalsignorecase(exceptObject) && !objTyp.getDescribe().isCustomSetting())
            	 result.add(new sObjectList(objTyp.getDescribe().getLabel(), objTyp.getDescribe().getName()));
    		}
         
     	System.debug('objs: ' + result);
     	return result;
     }

    @AuraEnabled(cacheable=true)
    public static List<objDescription> getObjectFields(string objectApiName){

        SObjectType accountType = Schema.getGlobalDescribe().get(objectApiName);
        
        if(accountType == null)
            return null;
      
        Map<String,Schema.SObjectField> mfields = accountType.getDescribe().fields.getMap();

        
        
        List<objDescription> descrip = new List<objDescription>();
        
        for (String fieldName : mfields.keySet()) {
            objDescription obj = new objDescription(fieldName, mfields.get(fieldName).getDescribe().getLabel());
            descrip.add(obj);
    	}
        
        for(objDescription field : descrip){
            System.debug('Field Name: ' + field.fieldName + '| Description: ' + field.description);
        }
        return descrip;
    }
    
    public class sObjectList { 
        @AuraEnabled public String objectLabel;
        @AuraEnabled public String objectApiName;

        public sObjectList() {}

        public sObjectList(String l, String n) {
          objectLabel = l;
          objectApiName = n;
        }
    }
    
    public class objDescription{
        @AuraEnabled public String fieldName;
        @AuraEnabled public String description;
        
        public objDescription(){}
        
        public objDescription(String n, String d){
            fieldName = n;
            description = d;
        }
    }
}