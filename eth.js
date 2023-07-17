import GameToken from "./GameToken.js";
import GameItems from "./GameItems.js";
import Marketplace from "./Marketplace.js";

let gameContract;
let gameItemsContract;
let marketplaceContract;

const initialize = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    
    gameContract = new ethers.Contract(
        "0x393276f1E3192E07CFD74E08E086a554A3E4f437",
        GameToken,
        signer
    );

    gameItemsContract = new ethers.Contract(
        "0xCe53Ee23e068945f1Ff48E13282e88bf84e18CeF",
        GameItems,
        signer
    );

    marketplaceContract = new ethers.Contract(
        "0xF50f6F3FEaE075066e3eb6bAfd601690aC32a244",
        Marketplace,
        signer
    );

}

async function getUserItems(callback){
    //TO-DO: get connected address
    const pumpTalisman = await gameItemsContract.balanceOf(address, 1);
    const superBoots = await gameItemsContract.balanceOf(address, 2);
    const timewarpCape = await gameItemsContract.balanceOf(address, 3);

    const values = await Promise.all([pumpTalisman, superBoots, timewarpCape]);

    var numTalismans = values[0];
    var numBoots = values[1];
    var numCapes = values[2];

    if(numTalismans > 0) COIN_GENERATION_INTERVAL = COIN_GENERATION_INTERVAL * Math.pow(0.75, numTalismans);
    if(numBoots > 0) PLAYER_SPEED = PLAYER_SPEED  * Math.pow(1.3, numBoots);
    if(numCapes > 0) GAME_SECOND = GAME_SECOND * Math.pow(1.5, numCapes);

    callback();
}

async function mintAfterGame(address, tokenNum) {
    const tx = await gameContract.mint(address, tokenNum);
    await tx.wait(1);

    console.log("Transaction complete");

}

async function buyItems(id){
    let value;
    if (id === 1) {
        value = 100000000000000;
    } else if (id === 2) {
        value = 200000000000000;
    } else if (id === 3) {
        value = 300000000000000;
    }
    const tx = await marketplaceContract.buyItem(id, {value: value});
    await tx.wait(1);
}


//To-Do: Check front-end implementation of these functions
window.mintAfterGame = mintAfterGame;
window.buyItems = buyItems;
window.getUserItems = getUserItems;

initialize();
