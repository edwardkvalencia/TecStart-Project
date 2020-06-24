import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0x13867C401f373D99202611248e44Cd8Ac9c89Aa2'
);

export default instance