export const CONTRACT_ADDRESS = "0xFA3270CD9862358b3a28199A7066E69eCfDA358D";
export const CONTRACT_ABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
        {
          internalType: "string",
          name: "_ipfsHash",
          type: "string",
        },
      ],
      name: "uploadFile",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
      ],
      name: "viewFiles",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];