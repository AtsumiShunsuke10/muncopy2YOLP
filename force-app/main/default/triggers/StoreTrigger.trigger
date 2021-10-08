/*******************************************************************************
 *  プロジェクト名 : ○○県新型コロナウイルス感染症拡大防止協力金
 *  クラス         : 店舗トリガ
 *  クラス名       : StoreTrigger
 *  概要           : 店舗トリガ
 *  作成者         : トランス・コスモス
 *  作成日         : 2021/09/01
 *******************************************************************************/
trigger StoreTrigger on Store__c (before insert, before update, after update) {
    
    if (Trigger.isBefore) {
        if (Trigger.isInsert) {
            StoreHandler.doBeforeInsert(Trigger.new);
        } else if (Trigger.isUpdate) {
            StoreHandler.doBeforeUpdate(Trigger.new);
        }
        
    }else if (Trigger.isAfter) {
        StoreHandler.doAfterUpdate(Trigger.new);
    }
    
}