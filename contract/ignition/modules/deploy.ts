import ethers from 'ethers';
async function main() {
  const contractAddress = ' 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 ';
  console.log(ethers.ChainstackProvider, 'ethers');
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8545/');

  // const [deployer] = await ethers.getAddress;

  // console.log('Deploying contracts with the account:', deployer.address);

  // console.log('Account balance:', (await deployer.getBalance()).toString());

  // const Token = await ethers.getContractFactory('Token');
  // const token = await Token.deploy();

  // console.log('Token address:', token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
