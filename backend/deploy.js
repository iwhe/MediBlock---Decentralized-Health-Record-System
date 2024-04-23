const fs = require("fs");
const Web3 = require("web3");

// const abi = JSON.parse(fs.readFileSync("/Users/virajchandra/Developer/Projects/MediVault/backend/contracts/Cruds.abi"));
// const bytecode = fs.readFileSync("/Users/virajchandra/Developer/Projects/MediVault/backend/contracts/Cruds.bin").toString();

const abi = JSON.parse(
  fs.readFileSync(
    "C:\\Users\\bhupe\\OneDrive\\Desktop\\MediBlock\\backend\\contracts\\Cruds.abi"
  )
);
const bytecode = fs
  .readFileSync(
    "C:\\Users\\bhupe\\OneDrive\\Desktop\\MediBlock\\backend\\contracts\\Cruds.bin"
  )
  .toString();

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

async function deploy() {
  // const w3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(abi);
  contract = contract.deploy({ data: bytecode });

  const deployContract = await contract.send({
    from: "0xC8f92b4D43770F69BE88c644ad7cf3eeda1E0087",
    gas: "6721975",
  });
  console.log(deployContract.options.address);
}

deploy();
