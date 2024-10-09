# Description
	npm package for crypto address parser.
# Installation
	`npm i crypto-address-parser --save`
		
	let cpr = require('crypto-address-parser');

# How to use
Let's see about js code:
```js
	let cpr = require('crypto-address-parser');
	
	let _addressinfo=cpr.parseaddress("ethereum:0xe8312ec868303fc3f14DeA8C63A1013608038801@0x39?amount=0.003985&contract=0x");

	console.log(_addressinfo); // returns as follows
	{
	  params: { amount: '0.003985', contract: '0x' },
	  address: '0xe8312ec868303fc3f14DeA8C63A1013608038801',
	  chain: 'ethereum',
	  network: '0x39'
	}

	const ethereumAddress = '0x000000000000000000000000000000000000dEaD';  
	const ethereumUrl = cpr.generateCryptoAddressUrl('Ethereum', ethereumAddress, 0.1,"0x",1);
	console.log(ethereumUrl);
	// ethereum:0x000000000000000000000000000000000000dEaD@0x1?contract=0x&refid=1&amount=0.1
  


```

# Support

Happy to add more, and need any updates, do get in touch on my telegram over [@chigovera](https://t.me/chigovera)
