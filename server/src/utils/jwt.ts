import { sign, SignOptions, verify } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

export function generateToken(payload: any): string {
    const privateKey = fs.readFileSync(path.join(__dirname, '../../keys/private.key'));
    const signInOptions: SignOptions = {
        // RS256 uses a public/private key pair. 
        // The API provides the private key to generate the JWT. 
        // The client gets a public key to validate the signature
        algorithm: 'RS256',
        expiresIn: '1h'
    }

    return sign(payload, privateKey, signInOptions);
}

export function verifyToken(token: string): any {
    const publicKey = fs.readFileSync(path.join(__dirname, '../../keys/public.key'));
    return verify(token, publicKey);
}