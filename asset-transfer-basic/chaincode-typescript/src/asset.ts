/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';


@Object() 
export class Patient {

  @Property()
    public docType?: string;

    @Property()
    public ID: string;

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

    // array of case id
    @Property()
    public Cases: Case[];


    @Property()
    public AuthorizedDoctors: Doctor[];

}

@Object()
export class Case {

  @Property()
  public docType?: string;

  @Property()
  public ID: string;

  @Property()
  public TestResult: string;

  @Property()
  public Diagnosis: string;

  @Property()
  public Treatment: string;

}


@Object()
export class Doctor {

  @Property()
  public docType?: string;

  @Property()
  public ID: string;

  @Property()
  public FullName: string;

  @Property()
  public Username: string;

  @Property()
  public DoB: string;

  @Property()
  public Gender: string;

  @Property()
  public Specification: string;

}


@Object()
export class UsageRecord {

  @Property()
  public docType?: string;

  @Property()
  public ID: string;

  @Property()
  public Operation: string;

  @Property()
  public Roles: string;

  @Property()
  public OperatorName: string;

  @Property()
  public Time: Date;

}



