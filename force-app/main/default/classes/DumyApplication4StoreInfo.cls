public with sharing class DumyApplication4StoreInfo {
    @AuraEnabled(cacheable=true)
    public static List<Store__c> getStoreRecord(Id app4RecordId,Integer num) {
        try {
            return [
                SELECT Id, Name, Application_Store_Name__c, Application_Store_Apply_Amount__c,
                        Application_Store_Postal_Code__c, Application_Store_Address__c,
                        Application_Store_Address_Type__c, Application_Store_Start_Date__c,
                        Application_Store_End_Date__c, Application_Store_Days__c,
                        Application_Store_Per_Date__c, Application_Store_Effort_DetailsA__c,
                        Application_Store_Address_Check__c, StoreIndex__c
                FROM Store__c
                WHERE Application4__c =: app4RecordId
                ORDER BY StoreIndex__c
                Limit :num
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}