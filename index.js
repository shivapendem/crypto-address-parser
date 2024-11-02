var querystring = require('querystring');
function parseaddress(inputString) {
	let data = {};
	let addr = inputString;
	if (isEmptyOrNull(inputString)) {
		return data;
	}
	if (inputString.indexOf("?") > 0) {
		data.params = JSON.parse(JSON.stringify(querystring.parse(inputString.substring(inputString.indexOf("?") + 1))));
		addr = inputString.substring(0, inputString.indexOf("?"));
	}
	if (addr.indexOf("@") > 0) {
		if (addr.split("@")[0].indexOf(":") > 0) {
			data.address = addr.split("@")[0].split(":")[1];
			data.chain = addr.split("@")[0].split(":")[0];
		}
		else {
			data.address = addr.split("@")[0];
		}
		data.network = addr.split("@")[1];
	}
	else {
		if (addr.indexOf(":") > 0) {
			data.address = addr.split(":")[1];
			data.chain = addr.split(":")[0];
		}
		else {
			data.address = addr;
		}
	}
	//console.log(data);
	return data;
};

function isEmptyOrNull(data) {
	return isEmpty(data) ? isEmpty(data) : isNull(data);
};
function isEmpty(string) {
	if (isNull(string)) return true;
	else if ((typeof string) == "object") { return Object.keys(string).length == 0 ? true : false; }
	else if ((typeof string) == "boolean") return false;
	else if ((typeof string) == "number") return false;
	else if (Array.isArray(string)) { string.length == 0 ? true : false; }
	else if (string.trim() === "") return true;
	else return false;
};
function isNull(data) {
	if ((data === null) || (typeof data === 'undefined')) {
		return true;
	}
	return false;
}

function generateCryptoAddressUrl(network, address, amount=null, contractaddress = null, refid = null) {
	let url = '';
	let addrparams = {};
	// Common handling for contract addresses
	const addContractParam = (urlPrefix, chainid) => {
		if (contractaddress) {
			addrparams['contract'] = contractaddress;
		}
		return `${urlPrefix}:${address}${!isEmptyOrNull(chainid) ? "@0x" + (Number(chainid)).toString(16) : ""}`;
	};
	if(isEmptyOrNull(network) && isEmptyOrNull(address) )
	{
		return null;
	}
	else if(isEmptyOrNull(network))
	{
		url = `${address}`;
		if (amount) {
			addrparams['amount'] = amount;
		}
		if (refid) {
			addrparams['refid'] = refid;
		}
		return url + isEmptyOrNull(addrparams)?"":'?' + new URLSearchParams(addrparams).toString();
	}
	else
	{
		switch (network.toString().toLowerCase().trim()) {
			case 'bitcoin':
			case 'btc':
				url = `bitcoin:${address}`;
				break;
			case 'bitcoin cash':
			case 'bitcoincash':
			case 'bch':
				url = `bitcoincash:${address}`;
				break;
			case 'dash':
				url = `dash:${address}`;
				break;
			case 'litecoin':
			case 'lite coin':
			case 'ltc':
				url = `litecoin:${address}`;
				break;
			case 'ethereum':
			case 'eth':
				url = addContractParam('ethereum', 1);
				break;
			case 'base':
				url = addContractParam('base', 8453);
				break;
			case 'ethereum classic':
			case 'ethereumclassic':
			case 'etc':
				url = addContractParam('classic', 61);
				break;
			case 'vechain':
			case 'vet':
				url = `vechain:${address}`;
				break;
			case 'tron':
			case 'trx':
				url = addContractParam('tron');
				break;
			case 'icon':
			case 'icx':
				url = `icon:${address}`;
				break;
			case 'binance':
			case 'bnb':
				url = `binance:${address}`;
				break;
			case 'binance smart chain':
			case 'bsc':
				url = addContractParam('smartchain', 56);
				break;
			case 'mantle':
				url = addContractParam('mantle', 5000);
				break;
			case 'matic':
			case 'polygon':
			case 'pol':
				url = addContractParam('polygon', 137);
				break;
			case 'avaxc':
			case 'avalanche-c':
				url = addContractParam('avalanchec', 43114);
				break;
			case 'fantom':
			case 'ftm':
				url = addContractParam('fantom', 250);
				break;
			case 'arbitrum one':
			case 'arbitrumone':
			case 'arbitrum':
			case 'arb':
				url = addContractParam('arbitrum', 42161);
				break;
			case 'gnosis':
				url = addContractParam('xdai', 100);
				break;
			case 'aurora':
				url = addContractParam('aurora', 1313161554);
				break;
			case 'op mainnet':
			case 'opmainnet':
				url = addContractParam('optimism', 10);
				break;
			case 'linea':
				url = addContractParam('linea', 59144);
				break;
			case 'opbnb mainnet':
			case 'opbnbmainnet':
			case 'opbnb':
				url = addContractParam('opbnb', 204);
				break;
			case 'gochain':
				url = addContractParam('gochain', 60);
				break;
			case 'cronos mainnet':
			case 'cronosmainnet':
			case 'cronos':
				url = addContractParam('cronos', 25);
				break;
			case 'kcc mainnet':
			case 'kccmainnet':
			case 'kcc':
				url = addContractParam('kcc', 321);
				break;
			case 'crypto.org':
			case 'cryptoorg':
			case 'cro':
				url = `cryptoorg:${address}`;
				break;
			case 'internet_computer':
			case 'internetcomputer':
			case 'icp':
				url = `internet_computer:${address}`;
				break;
			case 'doge':
				url = `doge:${address}`;
				break;
			case 'ripple':
			case 'xrp':
				url = addContractParam('ripple');
				break;
			case 'tezos':
			case 'xtz':
				url = `tezos:${address}`;
				break;
			case 'qtum':
				url = `qtum:${address}`;
				break;
			case 'nimiq':
			case 'nim':
				url = `nimiq:${address}`;
				break;
			case 'stellar':
			case 'xlm':
				url = `stellar:${address}`;
				break;
			case 'aion':
			case 'aion':
				url = `aion:${address}`;
				break;
			case 'cosmos':
			case 'atom':
				url = `cosmos:${address}`;
				break;
			case 'theta':
				url = `theta:${address}`;
				break;
			case 'ontology':
			case 'ont':
				url = `ontology:${address}`;
				break;
			case 'zilliqa':
			case 'zil':
				url = `zilliqa:${address}`;
				break;
			case 'iotex':
			case 'iotx':
				url = `iotex:${address}`;
				break;
			case 'eos':
			case 'eos':
				url = `eos:${address}`;
				break;
			case 'nano':
			case 'nano':
				url = `nano:${address}`;
				break;
			case 'nuls':
			case 'nuls':
				url = `nuls:${address}`;
				break;
			case 'waves':
			case 'waves':
				url = addContractParam('waves');
				break;
			case 'aeternity':
			case 'aeternity':
				url = `aeternity:${address}`;
				break;
			case 'terra':
			case 'terra classic':
			case 'terraclassic':
				url = `terra:${address}`;
				break;
			case 'nebulas':
			case 'nebl':
				url = `nebulas:${address}`;
				break;
			case 'fio':
			case 'fio':
				url = `fio:${address}`;
				break;
			case 'solana':
			case 'sol':
				url = addContractParam('spl_governance');
				break;
			case 'harmony':
			case 'one':
				url = `harmony:${address}`;
				break;
			case 'near':
			case 'near':
				url = `near:${address}`;
				break;
			case 'algorand':
			case 'algo':
				url = `algorand:${address}`;
				break;
			case 'polkadot':
			case 'dot':
				url = addContractParam('polkadot');
				break;
			case 'cardano':
			case 'ada':
				url = `cardano:${address}`;
				break;
			case 'neo':
			case 'neo':
				url = `neo:${address}`;
				break;
			case 'filecoin':
			case 'fil':
				url = `filecoin:${address}`;
				break;
			case 'multiversx':
			case 'elrond':
				url = `multiversx:${address}`;
				break;
			case 'oasis network':
			case 'oasis':
				url = `oasis:${address}`;
				break;
			case 'decred':
			case 'dcr':
				url = `decred:${address}`;
				break;
			case 'zcash':
			case 'zec':
				url = `zcash:${address}`;
				break;
			case 'groestlcoin':
			case 'grs':
				url = `groestlcoin:${address}`;
				break;
			case 'thorchain':
			case 'rune':
				url = `thorchain:${address}`;
				break;
			case 'ronin':
			case 'ron':
				url = `ronin:${address}`;
				break;
			case 'kusama':
			case 'kusama':
				url = `kusama:${address}`;
				break;
			case 'nervos':
			case 'ckb':
				url = `nervos:${address}`;
				break;
			case 'everscale':
			case 'ever':
				url = `everscale:${address}`;
				break;
			case 'aptos':
			case 'apt':
				url = `aptos:${address}`;
				break;
			case 'hedera':
			case 'hbar':
				url = `hedera:${address}`;
				break;
			case 'the open network':
			case 'ton':
				url = `ton:${address}`;
				break;
			case 'sui':
			case 'sui':
				url = `sui:${address}`;
				break;
			default:
				url = `${address}`;
		}
	// Add amount parameter if provided
		if (amount) {
			addrparams['amount'] = amount;
		}
		if (refid) {
			addrparams['refid'] = refid;
		}
		return url + isEmptyOrNull(addrparams)?"":'?' + new URLSearchParams(addrparams).toString();
	}
}

module.exports = {
	parseaddress, generateCryptoAddressUrl
}