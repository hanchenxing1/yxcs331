export default [
	{
		inputs: [
			{
				internalType: "contract GameItems",
				name: "item",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_itemId",
				type: "uint256",
			},
		],
		name: "buyItem",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
];
