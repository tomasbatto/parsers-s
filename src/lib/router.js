/**
 * Created by batto on 6/12/17.
 */

import {NaturaParser, PowerHouseParser, VolkswagenParser} from './parser'

export class ParserRouter {

    // Route an email to the correponding MailParser
    static parse(data, callback){
        if(data.data){
            let subject = data.data["Subject"];
            if(subject.includes("Natura")){
                new NaturaParser().parse(data, callback);
            }else if(subject.includes("Powerhouse")){
                new PowerHouseParser().parse(data, callback);
            }else if(subject.includes("VOLKSWAGEN")){
                new VolkswagenParser().parse(data,callback);
            }
        }
    }
}