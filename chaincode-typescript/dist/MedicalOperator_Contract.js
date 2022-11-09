"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorContract = void 0;
/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
// import { V4MAPPED } from 'dns';
const fabric_contract_api_1 = require("fabric-contract-api");
const json_stringify_deterministic_1 = __importDefault(require("json-stringify-deterministic"));
const sort_keys_recursive_1 = __importDefault(require("sort-keys-recursive"));
let OperatorContract = class OperatorContract extends fabric_contract_api_1.Contract {
    async InitLedger(ctx) {
        const operators = [
            {
                Username: 'Doctor1',
                Role: 'doctor'
            },
            {
                Username: 'Doctor2',
                Role: 'doctor'
            },
            {
                Username: 'Researcher1',
                Role: 'researcher'
            }
        ];
        for (const operator of operators) {
            operator.docType = 'operator';
            await ctx.stub.putState(operator.Username, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(operator))));
            console.info(`Patient ${operator.Username} initialized`);
        }
    }
    async CreateOperator(ctx, username, role) {
        const operator = {
            docType: 'operator',
            Username: username,
            Role: role
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(username, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(operator))));
    }
    async QueryOperator(ctx, username) {
        console.log('QueryOperator::OperatorContract running');
        const assetJSON = await ctx.stub.getState(username);
        let isExists = assetJSON && assetJSON.length > 0;
        if (!isExists) {
            throw Error('Operator does not exist');
        }
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        const operatorStringUInt8 = await ctx.stub.getState(username);
        const operatorString = Buffer.from(operatorStringUInt8).toString('utf8');
        const operatorObject = JSON.parse(operatorString);
        return operatorObject;
    }
};
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], OperatorContract.prototype, "InitLedger", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], OperatorContract.prototype, "CreateOperator", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], OperatorContract.prototype, "QueryOperator", null);
OperatorContract = __decorate([
    (0, fabric_contract_api_1.Info)({ title: 'MedicalOperatorContract', description: 'Smart contract for Medical Operator' })
], OperatorContract);
exports.OperatorContract = OperatorContract;
//# sourceMappingURL=MedicalOperator_Contract.js.map