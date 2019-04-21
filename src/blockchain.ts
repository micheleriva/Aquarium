import SHA256         from "crypto-js/sha256";
import { trampoline } from "./utils";

type BlockChain = Block[];
type Hash       = string;

export interface Block {
  timestamp:    string;
  data:         any;
  previousHash: Hash;
  hash:         Hash;
  nonce:        number;
}

/**
 * @function calculateHash
 * @param {Block} a block of the BlockChain
 * @returns {string} Returns the hash fo the block.
 */

export function calculateHash({previousHash, timestamp, data, nonce}: Block): string {
  return SHA256(previousHash + timestamp + JSON.stringify(data) +  nonce).toString();
}

/**
 * @function generateGenesisBlock
 * @returns {Block} returns the first block of the BlockChain
 */

export function generateGenesisBlock(): Block {

  const block: any = {
    timestamp:    "",
    data:         "Genesis Block",
    previousHash: "0",
  };

  return {
    ...block,
    hash: calculateHash(block)
  }
}

/**
 * @function getLatestBlock
 * @param {BlockChain} chain
 * @returns {Block} Returns the latest block of the BlockChain
 */

export function getLatestBlock(chain: BlockChain): Block {
  return chain[chain.length - 1];
}

/**
 * @function addBlock
 * @param {BlockChain} chain
 * @param {Block} block new block to add to the BlockChain
 * @returns {BlockChain} Returns a new BlockChain with the newly added block.
 */

export function addBlock(chain: BlockChain, {timestamp, data}: Block): BlockChain {
  const latestBlock:   Block = getLatestBlock(chain);
  const previousHash: string = latestBlock.hash;
  const block:           any = { timestamp, data, previousHash, nonce: 0 }
  const newBlock:        any = mineBlock(4, block);

  return chain.concat(newBlock);
}

/**
 * @function checkDifficulty
 * @param {number} difficulty
 * @param {string} hash
 * @returns {boolean}
 */

export function checkDifficulty(difficulty: number, hash: string): boolean {
  return hash.substr(0, difficulty) === "0".repeat(difficulty)
}

/**
 * @function nextNonce
 * @param {Block} block
 * @returns {Block}
 */

export function nextNonce(block: Block): Block {
  return updateHash({ ...block, nonce: block.nonce + 1 })
}

/**
 * @function updateHash
 * @param {Block} block
 * @returns {Block}
 */

function updateHash(block: Block): Block {
  return { ...block, hash: calculateHash(block) }
}

/**
 * @function mineBlock
 * @param {number} difficulty
 * @param {Block} block
 * @returns {Block} the mined block
 */

export function mineBlock(difficulty: number, block: Block): Block {

  function mine(block: Block): any {
    const newBlock: Block = nextNonce(block);

    return checkDifficulty(difficulty, newBlock.hash)
                ? newBlock
                : () => mine(nextNonce(block));
  }

  return trampoline(mine(nextNonce(block)));
}

/**
 * @function validateChain
 * @param {BlockChain} chain
 * @returns {boolean} Returns `true` when the blockchain is valid
 * @description Uses tail call elimination in order to handle memory safe recursion.
 */

export function validateChain(chain: BlockChain): boolean {

  function tce(chain: BlockChain, index: number): boolean {

    if (index === 0) return true;

    const { hash, ...currentBlockWithoutHash }: any   = chain[index];
    const currentBlock:                         Block = chain[index];
    const previousBlock:                        Block = chain[index - 1];

    const isValidHash:         boolean  = (hash === calculateHash(currentBlockWithoutHash));
    const isPreviousHashValid: boolean  = (currentBlock.previousHash === previousBlock.hash);
    const isValidChain:        boolean  = (isValidHash && isPreviousHashValid);

    if (!isValidChain) return false;

    return tce(chain, index -1);

  }

  return tce(chain, chain.length - 1)
}