import dayjs           from "dayjs";
import * as BlockChain from "../src/blockchain";

test("Testing 'calculateHash' function", () => {

  const block1: any = {
    timestamp:    "2019-04-17T21:25:55+02:00",
    data:         {foo: "bar"},
    previousHash: "dld27081ue2g7f6fsa79eh0182wfgwe780fsh",
  };

  const block2: any = {
    timestamp:    "2019-04-17T21:26:19+02:00",
    data:         {amount: 1391},
    previousHash: "a78dfhej12ihd9gas97hf0ajspdohg3d79qhs",
  }

  expect(BlockChain.calculateHash(block1)).toBe("fb0b43ea8cc2e3207f48e0fed0f07facaea5eeb7cef55fc650ae666b74357967");
  expect(BlockChain.calculateHash(block2)).toBe("c2721ede2bd1657f45e7063e3e851f7e25d685742013387e3ddea0e5bdba0eee");

});

test("Testing 'generateGenesisBlock' function", () => {

  const genesisBlock = BlockChain.generateGenesisBlock();

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