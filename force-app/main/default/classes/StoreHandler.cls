/*******************************************************************************
*  プロジェクト名 : 神奈川県新型コロナウイルス感染症拡大防止協力金
*  クラス         : 店舗トリガハンドラクラス
*  クラス名       : StoreTrigger
*  概要           : 店舗トリガハンドラクラス
*  作成者         : トランス・コスモス
*  作成日         : 2021/09/01
*******************************************************************************/
public class StoreHandler {
    /**
* 申請（感染症拡大防止協力金：第3弾）: 合計金額計算
* 
* @param List<Store__c> store 店舗レコードリスト
*/
    public static void doBeforeInsert(List<Store__c> newStoreList) {
        calculateSumAmount(newStoreList);
    }
    
    public static void doBeforeUpdate(List<Store__c> newStoreList) {
        calculateSumAmount(newStoreList);
    }
    
    public static void doAfterUpdate(List<Store__c> newStoreList) {
        reUpdateApplication(newStoreList);
    }
    
    private static void calculateSumAmount(List<Store__c> storeList) {
        try {
            for (Store__c s : storeList){
                s.Application_For_Parent_Amount__c = s.Application_Store_Apply_Amount__c;
            }
        } catch (Exception e) {
            System.debug(e.getMessage());
        }
    }
    
    private static void reUpdateApplication(List<Store__c> storeList) {
        try {
            Application4__c app = new Application4__c();
            for (Store__c s : storeList){
                if(app.id == null){
                    app.id = s.Application4__c;
                    break;
                }
            }
            update app;
        } catch (Exception e) {
            System.debug(e.getMessage());
        }
    }
}