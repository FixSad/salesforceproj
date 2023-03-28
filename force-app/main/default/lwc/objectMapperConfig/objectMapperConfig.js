import { LightningElement, track, wire } from 'lwc';
import getObjects from '@salesforce/apex/sObjectController.getObjects';
import getObjectFields from '@salesforce/apex/sObjectController.getObjectFields';

export default class ObjectMapperConfig extends LightningElement {
    @track value = 'Some Record';
    @track error;
    @track selectedOption = 'Contract';

    @wire(getObjects, {exceptObject : ''})
    wiredAccount({error, data}){
        if(data){
            this.record = data;
            this.error = undefined;
        } else if(error){
            this.error = error;
            this.record = undefined;
        }
    }


    @track record1;
    @track error1;

    @wire(getObjectFields, {objectApiName : '$selectedOption'})
    wiredFields({error, data}){
        if(data){
            this.record1 = data;
            this.error1 = undefined;
        } else if(error){
            this.error1 = error;
            this.record1 = undefined;
        }
    }

    changeHandler(event) {
        const field = event.target.name;
        if (field === 'optionSelect') {
            this.selectedOption = event.target.value;
            this.wiredFields();
        }
    }



    @track secondRecord;
    @track secondError;
    @track secondSelectedOption = 'Contact';

    @wire(getObjects, {exceptObject : '$selectedOption'})
    wiredAccount2({error, data}){
        if(data){
            this.secondRecord = data;
            this.secondError = undefined;
        } else if(error){
            this.secondError = error;
            this.secondRecord = undefined;
        }
    }

    @track secondFields;
    @track secondFieldsError;
    
    @wire(getObjectFields, {objectApiName : '$secondSelectedOption'})
    secondWiredFields({error, data}){
        if(data){
            this.secondFields = data;
            this.secondFieldsError = undefined;
        } else if(error){
            this.secondFieldsError = error;
            this.secondFields = undefined;
        }
    }

    сhangeHandler2(event) {
        const field = event.target.name;
        if (field === 'secondOptionSelect') {
            this.secondSelectedOption = event.target.value;
            this.secondWiredFields();
        }
    }
}