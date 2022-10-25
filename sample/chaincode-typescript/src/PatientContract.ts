/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Patient, MedicalInfo} from './asset';
import {Case} from './asset';
import { MedicalInfoContract } from './MedicalInfo_Contract';
import { OperatorContract } from './MedicalOperator_Contract';
import { UsageRecordContract } from './UsageRecordContract';
@Info({title: 'AssetTransfer', description: 'Smart contract for trading assets'})
export class PatientContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {


        console.log('calling init function of patient contract')
        // first creat the medicalInfo for that patient 
        // then add it to the patient info
        // const medical1 = await new MedicalInfoContract().CreateMedicalInfo(ctx , 'patient1000');
        // const medical2 = await new MedicalInfoContract().CreateMedicalInfo(ctx, 'patient1001');



        const patients: Patient[] = [
            {
                FullName: 'Cam Tu',
                Username: 'camtu123',
                Phone: '0095', 
                Address: '43/2 abc street',
                DoB: '11/2',
                Gender: 'female',
                MedicalInfo_ID: 'medical1',
                AuthorizedDoctors: ['Doctor1', 'Doctor2'],
            },
            {
                FullName: 'Bui Le Phi Long',
                Username: 'philong123',
                Phone: '0969120322',
                Address: '12 xyz Street',
                DoB: '12/03/2001',
                Gender: 'male',
                MedicalInfo_ID: 'medical2',
                AuthorizedDoctors:['Doctor1'],
            },
            {
                FullName: 'Le Duc Minh',
                Username: 'minhleduc0210',
                Phone: '0706208723',
                Address: '2018 2019 OG Street',
                DoB: '02/10/2001',
                Gender: 'male',
                MedicalInfo_ID: 'medical2',
                AuthorizedDoctors:['Doctor2'],
            }
        ];

        for (const patient of patients) {
            patient.docType = 'patient';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(patient.Username, Buffer.from(stringify(sortKeysRecursive(patient))));
            console.info(`Patient ${patient.Username} initialized`);
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    @Transaction()
    public async CreatePatient(ctx: Context,fullname: string, username: string, medinfo_id: string, phone: string, address: string, dob: string, gender: string, operator_username: string): Promise<void> {
        const exists = await this.AssetExists(ctx,username);
        if (exists) {
            throw new Error(`The asset ${username} already exists`);
        }
        // create medicalinfo for this patient
        await new MedicalInfoContract().CreateMedicalInfo(ctx, medinfo_id);

        const patient = {
            docType: 'patient',
            FullName: fullname,
            Username: username,
            Phone: phone,
            Address: address,
            DoB: dob,
            Gender: gender,
            MedicalInfo: medinfo_id,
            AuthorizedDoctors: [operator_username]
            
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(username, Buffer.from(stringify(sortKeysRecursive(patient))));
        // return JSON.stringify(patient);

    }

    // ReadAsset returns the asset stored in the world state with given id.
    // Read patient record given patient name
    @Transaction(false)
    private async ReadPatient(ctx: Context, username: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(username); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${username} does not exist`);
        }
        return assetJSON.toString();
    }


    // AssetExists returns true when asset with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    private async AssetExists(ctx: Context, username: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(username);
        return assetJSON && assetJSON.length > 0;
    }


    @Transaction(false)
    @Returns('boolean')
    public async IsAuthorized(ctx: Context, patient_username: string, doctor_username: string): Promise<boolean> {

        const exists = await this.AssetExists(ctx, doctor_username);

        if (!exists) {
            throw new Error(`The asset ${doctor_username} does not exist`);
        }
        const assetString = await this.ReadPatient(ctx, patient_username);
        const asset = JSON.parse(assetString);

        // check if the doctor exist in the authorized doctor array
        const doctors = asset.AuthorizedDoctors;

        const doctor_authorized = doctors.some(name => {
            if (name === doctor_username) {
              return true;
            }
        });
        return doctor_authorized;
    }

    // doctor call this funciton
    // return a patient from world state provided patient_username and doctor_username
    @Transaction(false)
    @Returns('boolean')
    public async doctorQuery(ctx: Context, patient_username: string, doctor_username: string, record_id: string, time: string): Promise<string> {

        const isAuthorized = await this.IsAuthorized(ctx, patient_username, doctor_username);

        if (!isAuthorized) {
            throw new Error(`permission denied to query ${patient_username} info`);
        }

        const patient = await this.ReadPatient(ctx, patient_username);
        const patient_obj = JSON.parse(patient);

        // create usage record
        let recordContract = new UsageRecordContract();
        recordContract.CreateRecord(ctx, record_id ,undefined, patient_obj.Medical_Info.ID, 'read patient\'s data', doctor_username, time);

        return patient;    
    }

    @Transaction(false)
    public async patientQuery(ctx: Context, username: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(username); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${username} does not exist`);
        }
        return assetJSON.toString();
    }

    @Transaction(false)
    @Returns('string')
    public async GetAll(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all MedicalInfos in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let MedicalInfo;
            try {
                MedicalInfo = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                MedicalInfo = strValue;
            }
            allResults.push(MedicalInfo);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }


    @Transaction()
    public async AuthorizeOperator(ctx: Context, patient_username: string, operator_username: string): Promise<void> {
        
        // check if operator exists
        let isExists = await this.AssetExists(ctx, operator_username);

        if (!isExists) {
            throw Error(`username ${operator_username} does not exist`);
        }
        // retriev patient info
        let patient = await this.ReadPatient(ctx, patient_username);

        let patient_obj = JSON.parse(patient);

        // add operator username to authorizedDoctorss

        patient_obj.AuthorizedDoctors.push(operator_username);
        
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(patient_username, Buffer.from(stringify(sortKeysRecursive(patient_obj))));
        // return JSON.stringify(patient);

    }


    @Transaction()
    public async RevokeOperator(ctx: Context, patient_username: string, operator_username: string): Promise<void> {
        
        // check if operator exists
        let isExists = await this.AssetExists(ctx, operator_username);

        if (!isExists) {
            throw Error(`username ${operator_username} does not exist`);
        }
        // retriev patient info
        let patient = await this.ReadPatient(ctx, patient_username);
        let patient_obj = JSON.parse(patient);


        // remove operator username to authorizedDoctorss
        for( var i = 0; i < patient_obj.AuthorizedDoctors.length; i++){ 
    
            if ( patient_obj.AuthorizedDoctors[i] === operator_username) { 
        
                patient_obj.AuthorizedDoctors.splice(i, 1); 
            }
        
        }
                
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(patient_username, Buffer.from(stringify(sortKeysRecursive(patient_obj))));
        // return JSON.stringify(patient);

    }






}
