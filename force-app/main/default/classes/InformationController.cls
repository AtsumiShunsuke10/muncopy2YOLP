public with sharing class InformationController {
    @AuraEnabled(cacheable=true)
    public static List<Information__c> getInformationList() {
        List<information__c> infomations = [
            SELECT Id, Name, Importance__c, Category__c, Title__c, Detail__c, NoticePeriodStart__c, NoticePeriodEnd__c 
            FROM information__c 
            WHERE NoticePeriodStart__c<=TODAY OR (NoticePeriodStart__c<=TODAY AND NoticePeriodEnd__c>=TODAY)
            ORDER BY Name desc
        ];
        if(infomations.isEmpty()) {
            return null;
        }
        return infomations;
    }
}