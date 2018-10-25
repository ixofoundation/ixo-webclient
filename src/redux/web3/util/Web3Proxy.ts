import { IWeb3Proxy } from './IWeb3Proxy';

const projectWalletAbi = require('../abi/ProjectWalletRegistry.abi.json');
const ixoERC20TokenAbi = require('../abi/IxoERC20Token.abi.json');

let projectWalletRegistryContract: any;
let ixoERC20TokenContract: any;
let web3: any;

export default class Web3Proxy implements IWeb3Proxy {

	constructor(web3Instance: any) {
		web3 = web3Instance;
		projectWalletRegistryContract = new web3.eth.Contract(projectWalletAbi, process.env.REACT_APP_PROJECT_REGISTRY_CONTRACT_ADDRESS);
		ixoERC20TokenContract = new web3.eth.Contract(ixoERC20TokenAbi, process.env.REACT_APP_IXO_TOKEN_CONTRACT_ADDRESS);

	}

	createEthProjectWallet = (projectDid: string) => {
		web3.eth.getAccounts().then((accounts: any) => {
			projectWalletRegistryContract.methods
				.ensureWallet('0x' + new Buffer(projectDid.replace('did:ixo:', '')).toString('hex'))
				.send({
					from: accounts[0]
				})
				.on('transactionHash', hash => {
					console.log('TX hash: ' + hash);
				})
				.on('receipt', receipt => {
					console.log(JSON.stringify(receipt));
				})
				.on('error', error => {
					console.error(error);
				});
		});
	}

	getProjectWalletAddress(projectDid: string): Promise<string> {
		return new Promise((resolve: any, reject: any) => {
			web3.eth.getAccounts().then((accounts: any) => {
				projectWalletRegistryContract.methods
					.walletOf('0x' + new Buffer(projectDid.replace('did:ixo:', '')).toString('hex'))
					.call({
						from: accounts[0]
					})
					.then(address => {
						console.log('Wallet address: ' + address);
						resolve(address);
					})
					.catch(error => {
						console.error(error);
						reject(error);
					});
			});
		});
	}

	fundEthProjectWallet = (projectWalletAddress: string) => {
		web3.eth.getAccounts().then((accounts: any) => {

			ixoERC20TokenContract.methods
				.transfer(projectWalletAddress, '10000000000')
				.send({
					from: accounts[0]
				})
				.on('transactionHash', hash => {
					console.log('TX hash: ' + hash);
				})
				.on('error', error => {
					console.error(error);
				});
		});
	}
}