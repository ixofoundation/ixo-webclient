import { IWeb3Proxy } from './IWeb3Proxy';

import projectWalletAbi from '../abi/ProjectWalletRegistry.abi.json';
import ixoERC20TokenAbi from '../abi/IxoERC20Token.abi.json';

let projectWalletRegistryContract: any;
let ixoERC20TokenContract: any;
let web3: any;

export default class Web3Proxy implements IWeb3Proxy {
  constructor(web3Instance: any) {
    web3 = web3Instance;
    projectWalletRegistryContract = new web3.eth.Contract(
      projectWalletAbi,
      process.env.REACT_APP_PROJECT_REGISTRY_CONTRACT_ADDRESS,
    );
    ixoERC20TokenContract = new web3.eth.Contract(
      ixoERC20TokenAbi,
      process.env.REACT_APP_IXO_TOKEN_CONTRACT_ADDRESS,
    );
  }

  createEthProjectWallet = (projectDid: string): Promise<unknown> => {
    return new Promise((resolve: any, reject: any) => {
      web3.eth.getAccounts().then((accounts: any) => {
        projectWalletRegistryContract.methods
          .ensureWallet(
            `0x${ 
              new Buffer(projectDid.replace('did:ixo:', '')).toString('hex')}`,
          )
          .send({
            from: accounts[0],
          })
          .on('transactionHash', () => {
            resolve('creating'); // as soon as transaction is initiated
          })
          .on('receipt', receipt => {
            console.log(JSON.stringify(receipt)); // once the transaction is confirmed on the network
          })
          .on('error', error => {
            reject(error);
          });
      });
    });
  };

  getProjectWalletAddress(projectDid: string): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      web3.eth.getAccounts().then((accounts: any) => {
        projectWalletRegistryContract.methods
          .walletOf(
            `0x${ 
              new Buffer(projectDid.replace('did:ixo:', '')).toString('hex')}`,
          )
          .call({
            from: accounts[0],
          })
          .then(address => {
            resolve(address);
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
      });
    });
  }

  getIxoBalance = (account: string): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      ixoERC20TokenContract.methods
        .balanceOf(account)
        .call({
          from: account,
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  fundEthProjectWallet(
    projectWalletAddress: string,
    account: string,
    ixoAmount: string,
  ): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      web3.eth.getAccounts().then(() => {
        if (account!) {
          ixoERC20TokenContract.methods
            .transfer(projectWalletAddress, ixoAmount) // this should be the amount of ixo you want to send plus 8 zeros
            .send({
              from: account,
            })
            .on('transactionHash', hash => {
              resolve(hash);
            })
            .on('error', error => {
              reject(error);
            });
        } else {
          console.log('please log into metamask');
        }
      });
    });
  }
}
