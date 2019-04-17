import SHA256 from "crypto-js/sha256";
import dayjs  from "dayjs";

type BlockChain = Block[];

export interface Block {
  index:        number;
  timestamp:    string;
  data:         any;
  previousHash: string;
  hash:         string;
}

export function calculateHash({index, previousHash, timestamp, data}: Block): string {
  return SHA256(index + previousHash + timestamp + JSON.stringify(data)).toString();
}

export function generateGenesisBlock(): Block {

  const block: any = {
    index:        0, 
    timestamp:    "/",
    data:         "Genesis Block",
    previousHash: "0",
  };

  return {
    ...block,
    hash: calculateHash(block)
  }
}

export function getLatestBlock(chain: BlockChain): Block {
  return chain[chain.length - 1];
}

export function addBlock(chain: BlockChain, {timestamp, data}: Block): BlockChain {
  const latestBlock:   Block = getLatestBlock(chain);
  const previousHash: string = latestBlock.hash;
  const index:        number = latestBlock.index + 1;
  const block:           any = { index, timestamp, data, previousHash }
  const newBlock:        any = { ...block, hash: calculateHash(block) }

  return chain.concat(newBlock);
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