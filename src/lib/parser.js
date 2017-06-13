/**
 * Created by batto on 6/12/17.
 */

//Generic mail parser
class MailParser{

    constructor(dataToGet = []){
        this.dataToGet = dataToGet;
    }

    parse(data, callback) {
        let result = {};
        this.dataToGet.forEach(dataToGet =>{
            if(dataToGet instanceof DataToGet){
                let values = dataToGet.getRegex().exec(this.getData(data));
                result[dataToGet.name] = values ? values[1].trim() : ""
            }
        });
        callback(result);
    }

    getData(data){
        return data
    }
}

export class NaturaParser extends MailParser{

    constructor(){
        super([
            new DataToGet("Nombre","Nombre: <b>","</b>"),
            new DataToGet("Telefono","Teléfono: <b>", "</b>"),
            new DataToGet("Mail","Email: <b>", "</b>")
        ])
    }

    getData(data){
        if(data.data){
            return data.data['body-html']
        }
        return null
    }
}

export class PowerHouseParser extends MailParser{

    constructor(){
        super([
            new DataToGet("Nombre","Nombre: </strong>","<br>"),
            new DataToGet("Telefono","Teléfono: </strong>", "<br>"),
            new DataToGet("Email","Email: </strong>", "<br>")
        ])
    }

    getData(data){
        if(data.data){
            return data.data['body-html']
        }
        return null
    }
}

export class VolkswagenParser extends MailParser{

    constructor(){
        super([
            new DataToGet("Nombre","Nombre Completo:\r\n\r\n","\r\n\r\n"),
            new DataToGet("Telefono","Teléfono:\r\n\r\n", "\r\n\r\n"),
            new DataToGet("Email","Email:\r\n\r\n", "<mailto:")
        ])
    }

    getData(data){
        if(data.data){
            return data.data['body-plain']
        }
        return null
    }
}

//Data to get when parsing
export class DataToGet {

    constructor(name, start, end){
        this.name = name;
        this.start = start;
        this.end = end;
    }

    getRegex(){
        return new RegExp(this.start+'(.*)'+this.end);
    }

}