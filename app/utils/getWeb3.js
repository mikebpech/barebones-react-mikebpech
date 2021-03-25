import Web3 from 'web3';

const getWeb3 = () => new Promise((res, rej) => {
  window.addEventListener('load', async() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access
        await window.ethereum.enable();
        res(web3);
      } catch(e) {
        rej(e);
      }
    } else if (window.web3) {
      const web3 = window.web3;
      console.log('Injected web3 detected');
      res(web3);
    }
  })
});

export default getWeb3;