import Blockchain, { Block } from "../src/blockchain";

test("Testing 'Blockchain' class", () => {

  const Aquarium = new Blockchain();
  const genesis  = Aquarium.chain[0];

  expect(genesis.data).toBe("Genesis Block");
  expect(genesis.timestamp).toBeDefined();
  expect(typeof genesis.timestamp).toBe("object");
  expect(genesis.previousHash).toBe("0");
  expect(genesis.index).toBe(0);

  const firstBlock: any = {timestamp: new Date(), data: JSON.stringify({amount: 10})};
  Aquarium.addBlock(new Block(firstBlock));
  const firstBlockCh = Aquarium.chain[1];

  expect(JSON.parse(firstBlockCh.data).amount).toBe(10);
  expect(firstBlockCh.timestamp).toBeDefined();
  expect(typeof firstBlockCh.timestamp).toBe("object");
  expect(firstBlockCh.previousHash).toBe(genesis.hash);
  expect(firstBlockCh.index).toBe(1);

  const secondBlock: any = {timestamp: new Date(), data: JSON.stringify({amount: 50})};
  Aquarium.addBlock(new Block(secondBlock));
  const secondBlockCh = Aquarium.chain[2];

  expect(JSON.parse(secondBlockCh.data).amount).toBe(50);
  expect(secondBlockCh.timestamp).toBeDefined();
  expect(typeof secondBlockCh.timestamp).toBe("object");
  expect(secondBlockCh.previousHash).toBe(firstBlockCh.hash);
  expect(secondBlockCh.index).toBe(2);

  expect(Aquarium.chain.length).toBe(3);
  expect(JSON.parse(Aquarium.getLatestBlock().data).amount).toBe(50);
  expect(Aquarium.validate()).toBeTruthy();

});

test("Testing Blockchain Validation 1", () => {

  const Aquarium         = new Blockchain();
  const firstBlock:  any = {timestamp: new Date(), data: JSON.stringify({amount: 10})};
  const secondBlock: any = {timestamp: new Date(), data: JSON.stringify({amount: 50})};

  Aquarium.addBlock(new Block(firstBlock));
  Aquarium.addBlock(new Block(secondBlock));
  expect(Aquarium.validate()).toBeTruthy();
  
  Aquarium.chain[1].previousHash = "random";
  expect(Aquarium.validate()).toBeFalsy();

});

test("Testing Blockchain Validation 2", () => {

  const Aquarium         = new Blockchain();
  const firstBlock:  any = {timestamp: new Date(), data: JSON.stringify({amount: 10})};
  const secondBlock: any = {timestamp: new Date(), data: JSON.stringify({amount: 50})};

  Aquarium.addBlock(new Block(firstBlock));
  Aquarium.addBlock(new Block(secondBlock));
  expect(Aquarium.validate()).toBeTruthy();
  
  Aquarium.chain[2].data = JSON.stringify({amount: 500});
  expect(Aquarium.validate()).toBeFalsy();

});