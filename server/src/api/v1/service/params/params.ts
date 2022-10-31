import {IsEmail, MinLength, IsString} from "class-validator";

export class CreateUserParams {
    @IsEmail()
    public email!: string;

    @MinLength(7)
    public username!: string;

    @MinLength(10)
    @IsString()
    public password!: string;

    @IsString()
    public fullname!: string;

    @IsString()
    public gender!: string;

    @IsString()
    public dob!: string;

    @MinLength(10)
    public phone!: string;

    @IsString()
    public address!: string;
}

export class CreateDoctorParams {
    @MinLength(7)
    public username!: string;

    @MinLength(10)
    @IsString()
    public password!: string;

    @IsString()
    public fullname!: string;

    @IsString()
    public gender!: string;

    @IsString()
    public specialization!: string;
}

export class CreateResearcherParams {
    @MinLength(7)
    public username!: string;

    @MinLength(10)
    @IsString()
    public password!: string;

    @IsString()
    public fullname!: string;
}