const main = async () => {
  const [owner, _randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to: ", waveContract.address);
  console.log("Contract deployed by: ", owner.address);

  //Get contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract Balance",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveCount;
  // waveCount = await waveContract.getTotalWaves();

  // send wave
  let waveTxn = await waveContract.wave("Hello!");
  await waveTxn.wait();

  waveTxn = await waveContract.wave("Hello again!");
  await waveTxn.wait();

  // get contract balance
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract Balance",
    hre.ethers.utils.formatEther(contractBalance)
  );

  //send wave using random address
  // waveTxn = await waveContract.connect(_randomPerson).wave("Strange hello");
  // await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  // let waveStats = await waveContract.connect(owner).stats();
  // waveStats = await waveContract.connect(_randomPerson).stats();

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runMain();
