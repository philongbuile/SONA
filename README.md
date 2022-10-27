# Sona Healthcare System

> SONA (**S**tuttgart **O**nline **N**etwork he**A**lthcare) is an application for Electric Healthcare Record Storage (EHRS)  with blockchain support. We apply Hyperledger Fabric to complete our solution in blockchain. With that being said, it can become more secure, lightweight and convenient for data access, management, and security.
> 

## Our team

- Bui Le Phi Long (team lead)
- Truong Canh Thanh Vinh (dev)
- Huynh Cam Tu (dev)
- Nguyen Quoc Trung (dev, UI/UX designer)
- Le Duc Minh (dev)

## Architecture and Design

## Setup


## Routes:
- POST /patient/create/ 
    req.body: fullname, username, address, phone, dob, gender, authorized_doctor


- GET /patient/query/:username 

    patient = {
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

- get /patient/doctorQuery/:patient_username/:doctor_username
    patient = {
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

- GET /patient/authorize_doctor/:patient_username/:operator_username
    patient = {
            docType: 'patient',
            FullName: fullname,
            Username: username,
            Phone: phone,
            Address: address,
            DoB: dob,
            Gender: gender,
            MedicalInfo: medinfo_id,
            AuthorizedDoctors: [operator_username]
        }

- GET /patient/revoke_doctor/:patient_username/:operator_username

- GET/operator/query/:username
     operator = {
            docType: 'operator',
            Username: username,
            Role: role
        }
- POST /operator/create/
    req.body: username, role


- GET /record/query/:medinfo_id
    - return array of usage-records of that medinfo_id
    [
        {
                Case_ID: 'case2',
                MedicalInfo_ID: 'medical1',
                Record_ID: 'record',
                Operation: 'read',
                Roles: 'doctor',
                OperatorName: 'Doctor1',
                Time : '22/03/2010'
        },
        {
                Case_ID: 'case1',
                MedicalInfo_ID: 'medical1',
                Record_ID: 'record1',
                Operation: 'read',
                Roles: 'doctor',
                OperatorName: 'Doctor1',
                Time : '22/03/2010'
        },
    ]


- GET medinfo/operator_query_medicalinfo/:medicalinfo_id/:operator_username
    - return 1 medicalinfo object

    {
        ID: 'medical1',
        Cases: [
            {
            Case_ID: 'case1',
            Examinations: [
                {
                    TestResult : 'Success',
                    Diagnosis: 'Allergic Rhinitis',
                    Treatment: 'Use medicine'

                }
        ]}]
    },

- GET /medinfo/patient_query_medicalinfo/:medicalinfo_id/
    - return 1 medicalinfo object
    {
        ID: 'medical1',
        Cases: [
            {
            Case_ID: 'case1',
            Examinations: [
                {
                    TestResult : 'Success',
                    Diagnosis: 'Allergic Rhinitis',
                    Treatment: 'Use medicine'

                }
        ]}]
    },

- POST /medinfo/query_by_keyword/
    - req.body.keywords = ['keyword1', 'keyword2']
    - return array of medicalinfo's containing the keywords

- POST /medinfo/addcase/ 
    req.body.info_id,
    req.body.test_result,
    req.body.diagnosis,
    req.body.treatment,
    req.body.operator_username,
    req.body.patient_username,


- POST /medinfo/appendcase/
    req.body.info_id,
    req.body.case_id,
    req.body.test_result,
    req.body.diagnosis,
    req.body.treatment,
    req.body.operator_username,
    req.body.patient_username,