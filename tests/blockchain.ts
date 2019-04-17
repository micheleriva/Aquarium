import dayjs           from "dayjs";
import * as BlockChain from "../src/blockchain";

test("Testing 'calculateHash' function", () => {

  const block1: any = {
    index:        5, 
    timestamp:    "2019-04-17T21:25:55+02:00",
    data:         {foo: "bar"},
    previousHash: "dld27081ue2g7f6fsa79eh0182wfgwe780fsh",
  };

  const block2: any = {
    index:        9238, 
    timestamp:    "2019-04-17T21:26:19+02:00",
    data:         {amount: 1391},
    previousHash: "a78dfhej12ihd9gas97hf0ajspdohg3d79qhs",
  }

  expect(BlockChain.calculateHash(block1)).toBe("164854d77c5c269ce7dfd94d60a150167c72fcc1a0103e809bdf4a957b608677");
  expect(BlockChain.calculateHash(block2)).toBe("fa20ea32aa1823014570b8f4177b14938a3219e2d89f1475eaae81b9c4520e0b");

});

test("Testing 'generateGenesisBlock' function", () => {

  const genesisBlock = BlockChain.generateGenesisBlock();

  expect(genesisBlock.index).toBe(0);
  expect(genesisBlock.data).toBe("Genesis Block");
  expect(genesisBlock.timestamp).toBeDefined();
  expect(genesisBlock.previousHash).toBe("0");
  expect(genesisBlock.hash).toBeDefined();

});

test("Testing 'getLatestBlock' and 'addBlock' functions ", () => {

  const genesis = BlockChain.generateGenesisBlock();
  const chain   = [genesis];

  const block1: any = {timestamp: "2019-04-17T21:25:55+02:00", data: {amount: 50}};
  const newChain    = BlockChain.addBlock(chain, block1);

  expect(newChain.length).toBe(2);
  expect(newChain[1].index).toBe(1);
  expect(newChain[1].timestamp).toBe("2019-04-17T21:25:55+02:00");
  expect(newChain[1].data.amount).toBe(50);
  expect(newChain[1].previousHash).toBeDefined();
  expect(newChain[1].hash).toBeDefined();

});

test("Testing 'validateChain' function ", () => {

  const genesis = BlockChain.generateGenesisBlock();
  const chain   = [genesis];

  const block1: any = {timestamp: "2019-04-17T21:25:55+02:00", data: {amount: 50}};
  const newChain    = BlockChain.addBlock(chain, block1);

  expect(BlockChain.validateChain(newChain)).toBeTruthy();

  newChain[1].data.amount = 500;
  expect(BlockChain.validateChain(newChain)).toBeFalsy();

});