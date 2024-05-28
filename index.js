var querystring = require('querystring');
function parseaddress(inputString) {
	let data={};
	let addr=inputString;
	if(inputString.indexOf("?")>0)
	{
		data.params=JSON.parse(JSON.stringify(querystring.parse(inputString.substring(inputString.indexOf("?")+1))));
		addr=inputString.substring(0,inputString.indexOf("?"));
	}
	if(addr.indexOf("@")>0)
	{
		if(addr.split("@")[0].indexOf(":")>0)
		{
			data.address=addr.split("@")[0].split(":")[1];
			data.chain=addr.split("@")[0].split(":")[0];
		}
		else
		{
			data.address=addr.split("@")[0];
		}
		data.network=addr.split("@")[1];
	}
	else
	{
		if(addr.indexOf(":")>0)
		{
			data.address=addr.split(":")[1];
			data.chain=addr.split(":")[0];
		}
		else
		{
			data.address=addr;
		}
	}
	//console.log(data);
	return data;
};

module.exports = {
	parseaddress
}