import { Context, Contract } from 'fabric-contract-api';
import { Operator } from './asset';
export declare class OperatorContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    CreateOperator(ctx: Context, username: string, role: string): Promise<void>;
    QueryOperator(ctx: Context, username: string): Promise<Operator>;
}
