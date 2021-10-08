import { LightningElement, api,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getRelatedFilesByRecordId from '@salesforce/apex/filePreviewController.getRelatedFilesByRecordId'

const CARD_VISIBLE_CLASSES = 'slds-show'
const CARD_HIDDEN_CLASSES = 'slds-hide'

const DOT_VISIBLE_CLASSES = 'dot active'
const DOT_HIDDEN_CLASSES = 'dot'
export default class caroselmage  extends NavigationMixin( LightningElement ) {

    @api recordId
    slideIndex = 1
    filesList
    btn
    @wire(getRelatedFilesByRecordId, {recordId: '$recordId'})
    wiredResult({data, error}){ 
        if(data){ 
            if(Object.keys(data).length){
                this.filesList = Object.keys(data).map(item=>({"label":data[item],
                "value": item,
                "url":`/sfc/servlet.shepherd/document/download/${item}`
                })).map((item,index) =>{
                    return index === 0 ? {
                        ...item,
                        slideIndex:index+1,
                        cardClasses:CARD_VISIBLE_CLASSES,
                        dotClasses:DOT_VISIBLE_CLASSES
                    }:{
                        ...item,
                        slideIndex:index+1,
                        cardClasses:CARD_HIDDEN_CLASSES,
                        dotClasses:DOT_HIDDEN_CLASSES
                    }

                })
            }
        }

        if(error){ 
            console.log(error)
        }

    }

    currentSilde(event){
        let slideIndex = Number(event.target.dataset.id)
        this.slideSelectionHandler(slideIndex)
    }

    backSilde(){
        let slideIndex = this.slideIndex - 1 
        this.slideSelectionHandler(slideIndex)
    }

    forwardSilde(){
        let slideIndex = this.slideIndex + 1 
        this.slideSelectionHandler(slideIndex)
    }

    slideSelectionHandler(id){
        if(id > this.filesList.length){
            this.slideIndex = 1;
        }else if(id < 1){
            this.slideIndex = this.filesList.length
        }else{
            this.slideIndex = id
        }
        console.log(this.filesList.length);
        console.log(this.slideIndex);
        this.filesList= this.filesList.map(item =>{
            return this.slideIndex === item.slideIndex ? {
                ...item,
                cardClasses:CARD_VISIBLE_CLASSES,
                dotClasses:DOT_VISIBLE_CLASSES
            }:{
                ...item,
                cardClasses:CARD_HIDDEN_CLASSES,
                dotClasses:DOT_HIDDEN_CLASSES
            }

        })
    }

    navigateToVFPage() {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                url: '/apex/imagePreviewList?recordId=' + this.recordId
            }
        }).then(generatedUrl => {
            window.open(generatedUrl);
        });        
    }

}