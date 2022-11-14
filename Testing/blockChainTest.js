const hash = require('crypto-js/sha256')

class Block{
    constructor(prevHash, data){
        this.prevHash = prevHash;
        this.data = data;
        this.timeStamp = new Date();

        this.hash=this.calculateHash();
        this.mineVar=0
    }

    calculateHash(){
        return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp + this.mineVar).toString();
    }

    mine(){
        while(!this.hash.startsWith('00000000')){
            this.hash = this.calculateHash();
            this.mineVar ++;
        }
    }
}

class BlockChain{
    constructor(){
        this.genesisBlock = new Block('Genesis', {
            'content': new Date()
        });
        this.chain = [this.genesisBlock];
    }


    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(data){
        const lastBlock = this.getLastBlock();
        const newBlock = new Block(lastBlock.hash, data);
        newBlock.mine();
        this.chain.push(newBlock);
    }
}

const block = new Block('', {
    'say': 'hello world', 
    'sing':'do re mi fa sol la si do'
})
// console.log(block)

const blockChain = new BlockChain()
// console.log(blockChain)

blockChain.addBlock({
    'from': 'Le Duc Minh', 
    'amount': '10000000USD', 
    'deadline': 'tomorrow',
    'to': 'YOU 1'
})

blockChain.addBlock({
    'from': 'Le Duc Minh', 
    'amount': '10000000USD', 
    'deadline': 'tomorrow',
    'to': 'YOU 2'
})


blockChain.addBlock({
    'from': 'Le Duc Minh', 
    'amount': '10000000USD', 
    'deadline': 'tomorrow',
    'to': 'YOU 3'
})


console.log(blockChain.chain)