import * as  jwt from 'jsonwebtoken';
import { readFileSync, writeFileSync } from 'fs'
import {join} from 'path'
import config from "config";

const privateKey = readFileSync(join('keys', '.private.key'));
const publicKey = readFileSync(join('keys', '.public.key.pem'));

export function signJWT(object:Object,options?:jwt.SignOptions|undefined){

    return jwt.sign(object,privateKey,{...(options && options),algorithm:"RS256",});

}

export function verifyJWT(token:string){

    try{
        const decoded = jwt.verify(token,publicKey,{algorithms:["RS256"]});
        return{
            valid:true,
            expired:false,
            decoded,
        };
        
    }
    catch(e:any){
        return{
            valid:false,
            expired:e.message === "jwt expired",
            decoded:null,
        };
    }
}