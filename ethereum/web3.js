import Web3 from 'web3'

let web3

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	//Checks if we are in the browser & MM is running
	web3 = new Web3(window.web3.currentProvider)
} else {
	//We are on server or user is not running MM
	const provider = new Web3.providers.HttpProvider(
		'https://rinkeby.infura.io/v3/5312eb0aaf83463db32b581d2ff54aab'
	);

	web3 = new Web3(provider)
}

export default web3