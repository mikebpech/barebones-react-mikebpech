import web3 from './web3';

const address = "0x8A5a0Da05C5e982B566910Ca0D49b48c7411C0B5";
const abi = [{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isCanvasSale","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_price","type":"uint256"}],"name":"createSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ownerCut","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_price","type":"uint256"},{"name":"_seller","type":"address"}],"name":"createSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"saleCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getSale","outputs":[{"name":"seller","type":"address"},{"name":"price","type":"uint256"},{"name":"postedAt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"buy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"nonFungibleContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_nftAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"}],"name":"SalePosted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"},{"indexed":false,"name":"buyer","type":"address"}],"name":"SaleSuccessful","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"SaleCancelled","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]
export default new web3.eth.Contract(abi, address);