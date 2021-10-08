import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getStoreRecord from '@salesforce/apex/DumyApplication4StoreInfo.getStoreRecord';
import STORE_ID from '@salesforce/schema/Store__c.Id';
import NAME from '@salesforce/schema/Store__c.Name';
import INDEX from '@salesforce/schema/Store__c.StoreIndex__c';
import STORE_NAME from '@salesforce/schema/Store__c.Application_Store_Name__c';
import STORE_APPLY_AMOUNT from '@salesforce/schema/Store__c.Application_Store_Apply_Amount__c';
import STORE_POSTAL_CODE from '@salesforce/schema/Store__c.Application_Store_Postal_Code__c';
import STORE_ADDRESS from '@salesforce/schema/Store__c.Application_Store_Address__c';
import STORE_ADDRESS_TYPE from '@salesforce/schema/Store__c.Application_Store_Address_Type__c';
import STORE_START_DATE from '@salesforce/schema/Store__c.Application_Store_Start_Date__c';
import STORE_END_DATE from '@salesforce/schema/Store__c.Application_Store_End_Date__c';
import STORE_DAYS from '@salesforce/schema/Store__c.Application_Store_Days__c';
import STORE_PER_DATE from '@salesforce/schema/Store__c.Application_Store_Per_Date__c';
import STORE_EFFORT_DETAILSA from '@salesforce/schema/Store__c.Application_Store_Effort_DetailsA__c';
import STORE_ADDRESS_CHECK from '@salesforce/schema/Store__c.Application_Store_Address_Check__c';

const fields = [STORE_ID, NAME, INDEX, STORE_NAME, STORE_APPLY_AMOUNT, STORE_POSTAL_CODE, STORE_ADDRESS, STORE_ADDRESS_TYPE,
                STORE_START_DATE, STORE_END_DATE, STORE_DAYS, STORE_PER_DATE, STORE_EFFORT_DETAILSA, STORE_ADDRESS_CHECK];

export default class dumyStoresInfo extends LightningElement {
    // 申請のレコードIDを取得
    @api recordId;
    // 申請に関連する店舗情報
    @track storeInfos;
    // 店舗数
    storeCount;
    // 10ごとに店舗を情報を管理する配列
    @track storeIndexArray = [];
    // 店舗メニューで選択された値を格納
    selectedStoreIndex;
    // タブに表示する店舗配列
    @track showingStoreInfos = [];
    // 更新ボタンの無効化フラグ
    isDisabled = true;
    // 更新する値の配列
    updateValues = [];
    // 変更された項目名
    changedFieldName;
    // 項目が変更されたレコードID
    changedRecordId;
    // 変更されたレコードの配列
    changedRecords = [];
    // ボタンメニューのデフォルト値
    @track buttonMenuValue = 0;
    // タブのデフォルト値
    @track activeTabValue = 1;
    // タブのデフォルト値
    storeNum = 30;

    connectedCallback() {
        console.log('connectedCallBack');
    }

    @wire(getStoreRecord, { app4RecordId: '$recordId' ,num:'$storeNum'})
    setStoreInfos(result) {
        console.log('getStoreRecord');
        if(result.data) this.storeInfos = result.data;
    }

    changetab(event) {
       
        window.clearTimeout(this.delayTimeout);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.storeNum = 5;
        }, 300);
        // this.template.querySelector('lightning-tabset').activeTabValue = '1';
    }

    // handleOnSelectStoreMenu(event) {
    //         if(this.isDisabled) {
    //             this.selectedStoreIndex = event.detail.value;
    //             console.log('selectedStoreIndex');
    //             console.log(this.selectedStoreIndex);
    //             this.showTab(this.selectedStoreIndex);
    //         } else {
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Warning',
    //                     message: '変更中は移動できません。',
    //                     variant: 'warning'
    //                 })
    //             );
    //         }
    //     }





    // @wire(getRecord, { recordId: '$recordId', field: fields })
    // result;

    // @wire(getStoreRecord, { app4RecordId: '$recordId' })
    // setStoreInfos(result) {
    //     this.storeInfos = result.data;
    // };

    // @wire(getStoreRecord, { app4RecordId: '$recordId' })
    // setMenuItem(result) {
    //     this.storeInfos = result.data;
    //     console.log(this.storeInfos);
    //     if(this.storeInfos != null) {
    //         this.storeCount = Object.keys(this.storeInfos).length;
    //     }
    //     if(this.storeCount > 0) {
    //         for(let i = 0; i < this.storeCount; i+=10) {
    //             this.storeIndexArray.push({ value: Number(i), label: Number(i+1) + '～' + Number(i+10) });
    //         }
    //         console.log(this.storeIndexArray);
    //     }
    // }

    // handleOnSelectStoreMenu(event) {
    //     if(this.isDisabled) {
    //         this.selectedStoreIndex = event.detail.value;
    //         console.log('selectedStoreIndex');
    //         console.log(this.selectedStoreIndex);
    //         this.showTab(this.selectedStoreIndex);
    //     } else {
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Warning',
    //                 message: '変更中は移動できません。',
    //                 variant: 'warning'
    //             })
    //         );
    //     }
    // }

    handleOnChangeField(event) {
        event.target.style.backgroundColor = '#faffbd';
        this.changedFieldName = event.target.fieldName;
        this.changedRecordId = event.target.parentNode.recordId;

        if(!this.changedRecords.includes(this.changedRecordId)) {
            this.changedRecords.push(this.changedRecordId);
        }
        this.isDisabled = false;
    }

    // updateStoreInfo() {
    //     this.changedRecords.forEach(changedRecord => {
    //         const selector = 'lightning-record-edit-form[data-id=\'' + changedRecord + '\']';
    //         const childNodes = this.template.querySelector(selector).childNodes;

    //         const fields = {};
    //         fields[STORE_ID.fieldApiName] = childNodes.item(0).value;
    //         fields[STORE_NAME.fieldApiName] = childNodes.item(1).value;
    //         fields[STORE_EFFORT_DETAILSA.fieldApiName] = childNodes.item(2).value;

    //         const recordInput = { fields };

    //         updateRecord(recordInput)
    //         .then(() => {
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Success',
    //                     message: childNodes.item(0).value + 'の更新が出来ました',
    //                     variant: 'success'
    //                 })
    //             );
    //             childNodes.forEach(childNode => {
    //                 childNode.style.backgroundColor = '#ffffff';
    //             });
    //         })
    //         .catch(error => {
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Error',
    //                     message: childNodes.item(0).value + 'の更新は出来ませんでした。ページを更新して、もう一度お試しください。',
    //                     variant: 'error'
    //                 })
    //             );
    //             console.log(error);
    //         });
    //     });
    //     this.isDisabled = true;
    //     this.changedRecords = [];
    // }

    // showTab(tabIndex) {
    //     this.showingStoreInfos = [];
    //     this.storeInfos = [];
    //     getStoreRecord( { app4RecordId: this.recordId } )
    //     .then((result) => {
    //         this.storeInfos = result;
    //         if(this.storeInfos != null) {
    //             this.storeCount = Object.keys(this.storeInfos).length;
    //         }
    //         if(this.storeCount > 0) {
    //             for(let i = tabIndex; i < (tabIndex+10) && i < this.storeCount; i++) {
    //                 this.showingStoreInfos.push(this.storeInfos[i]);
    //             }
    //             // this.activeTabValue = Number(tabIndex+1);
    //             // console.log('activeTabValue');
    //             // console.log(this.activeTabValue);
    //             setTimeout(() => {
    //                 const selector = 'lightning-tabset';
    //                 const childNodes = this.template.querySelector(selector).childNodes;
    //                 childNodes.item(2).ariaSelected = "true";
    //                 childNodes.item(2).tabIndex = 0;
    //                 console.log(childNodes.item(2));
    //             }, 1000);
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }

    // showTab(code) {
    //     if (code == 0) {
    //         this.template.querySelector('lightning-button-menu').click();
    //         const intervalId = setInterval(() => {
    //             if(this.template.querySelector('lightning-menu-item[data-index="0"]') != null) {
    //                 clearInterval(intervalId);
    //                 this.showTab(1);
    //             }
    //         }, 100);
    //     } else if (code == 1) {
    //         this.template.querySelector('lightning-menu-item[data-index="0"]').click();
    //     }
    // }

    // selectMinTab(storeIndex) {
    //     const selector = 'lightning-tabset';
    //     setTimeout(() => {
    //         const childNodes = this.template.querySelector(selector).childNodes;
    //         childNodes.item(0).click();
    //         // childNodes.forEach(childNode => {
    //         //     console.log(childNode.value);
    //         // });
    //     }, 2000);
    // }
}