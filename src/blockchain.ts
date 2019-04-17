import SHA256 from 'crypto-js/sha256';

export class Block {

  index:        number;
  previousHash: string;
  timestamp:    Date;
  data:         any;
  hash:         string;
  nonce:        number;

  constructor({timestamp, data}: Block) {
    this.index        = 0;
    this.previousHash = "0";
    this.timestamp    = timestamp;
    this.data         = data;
    this.hash         = this.calculateHash();
    this.nonce        = 0;
  }

  /**
   * @method mineBlock
   * @param {number} difficulty
   * @todo to be implemented
   */

  public mineBlock(difficulty: number): any {
    return void 0;
  }

  /**
   * @method calculateHash
   * @returns {string} a computed hash of our Block
   */

  public calculateHash(): string {
    return SHA256(this.index + this.previousHash + this.timestamp + this.data).toString();
  }

}

export default class Blockchain {

  chain: Block[];

  constructor() {
    this.chain = [this.createGenesis()];
  }

  /**
   * @method getLatestBlock
   * @returns {Block} the latest block of our blockchain
   */

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }


  /**
   * @method addBlock
   * @param {Block} block a new block to be added to our blockchain
   * @returns {void}
   */

  public addBlock(block: Block): void {

    const latestBlock: Block = this.getLatestBlock();

    block.previousHash = latestBlock.hash;
    block.hash         = block.calculateHash();
    block.index        = latestBlock.index + 1;
    this.chain.push(block);
    return;
  }

  /**
   * @method validate
   * @returns {boolean} returns true if our blockchain is valid
   */

  public validate(): boolean {

    let i: number = 1;

    while(i < this.chain.length) {

      const currentBlock:  Block = this.chain[i];
      const previousBlock: Block = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      i++;
    }

    return true;

  }

  /**
   * @method createGenesis
   * @returns {block} Returns the genesis block of our blockchain
   */

  private createGenesis(): Block {

    const genesisBlock: any = {
      index:        0,
      timestamp:    new Date(),
      data:         "Genesis Block",
      previousHash: "0"
    }

    return new Block(genesisBlock);
  }

}