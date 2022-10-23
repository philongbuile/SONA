/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';


@Object() 
export class Patient {

  @Property()
    public docType?: string;

    @Property()
    public FullName: string;

    @Property()
    public Username: string;

    @Property()
    public Phone: string;

    @Property()
    public Address: string;

    @Property()
    public DoB: string;

    @Property()
    public Gender: string;

    @Property()
    public MedicalInfo: MedicalInfo;

    @Property()
    public AuthorizedDoctors: string[];

    @Property()
    public Records: UsageRecord[];

    

}

@Object()
export class Examination {

  // the examination contains the case id
  // of the case it belongs to
  @Property()
  public docType?: string;

  @Property()
  public TestResult: string;

  @Property()
  public Diagnosis: string;

  @Property()
  public Treatment: string;

}



@Object()
export class Case {

  @Property()
  public docType?: string;

  @Property()
  public Case_ID: string;

  @Property()
  public Examinations: Examination[];

}



@Object()
export class MedicalInfo {

  @Property()
  public docType?: string;

  @Property()
  public ID: string;

  @Property()
  public Cases: Case[];

}



@Object()
export class Operator {

  @Property()
  public docType?: string;

  @Property()
  public ID: string;

  @Property()
  public Username: string;

  @Property()
  public Role: string;

}


@Object()
export class UsageRecord {

  @Property()
  public docType?: string;

  // case_id will be undefined if the operation is query
  @Property()
  public Case_ID?: string;

  @Property()
  public MedicalInfo_ID: string;

  @Property()
  public Record_ID: string;

  // operation can be:
  //    append (append to an existing case - by calling updateCase())
  //    add (add a new case to medicalinfo - by calling createCase())
  //    read (query medical record - by calling QueryMedicalInfo())

  @Property()
  public Operation: string;

  // get this from Operator info
  @Property()
  public Roles: string;

  // get this from Operator info
  @Property()
  public OperatorName: string;

  @Property()
  public Time: string;

}



