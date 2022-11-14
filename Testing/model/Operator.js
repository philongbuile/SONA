class Operator{
    constructor(name, role){
        this.name = name,
        this.role = role
    }

    read(medicalCase){
        medicalCase.displayTo(this);
    }
}


module.exports=Operator
