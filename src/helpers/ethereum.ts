import Web3 from 'web3'
import { Transaction as EvmTransaction } from '@ethereumjs/tx';
import { defaultAbiCoder as AbiCoder } from '@ethersproject/abi';
import { EVMTransaction, TransactionWithTxHash, TX_TYPE } from '@/definitions';

export function parseEvmTransaction(tx: EVMTransaction): TransactionWithTxHash {
  const serializedEVMTxWithout0x = tx.payload.slice(2); // delete 0x
  const evmTx = EvmTransaction.fromSerializedTx(Buffer.from(serializedEVMTxWithout0x, 'hex'));

  return {
    txHash: '0x' + evmTx.hash().toString('hex'),
    v: 0,
    creator: evmTx.getSenderAddress().toString(),
    type: TX_TYPE.EVM_CALL,
    nonce: Number(evmTx.nonce),
    fee: Number(Web3.utils.fromWei((evmTx.gasLimit * evmTx.gasPrice).toString(),'ether')),
    payload: {
      to: evmTx.to?.toString(),
      value: Web3.utils.fromWei(evmTx.value.toString(), 'ether'),
      evmBytecode: evmTx.data.toString('hex')
    },
    sigType: 'ECDSA',
    sig: 'ECDSA'
  };
}

export async function decodeCalldata(calldata: string) {
  const functionSigHash = calldata.slice(0, 10).slice(2);
  const functionParams = calldata.slice(10);

  try {
    const funcProto = await getFunctionPrototype(functionSigHash);
    if (!funcProto) {
      throw new Error('Function prototype not found');
    }

    const { paramTypes } = parseFunctionPrototype(funcProto);
    const results = AbiCoder.decode(paramTypes, `0x${functionParams}`);

    const parameters = results.map((param, index) => ({
      index: `[${index}]`,
      value: param.toString()
    }));

    return { funcProto, funcId: `0x${functionSigHash}`, parameters };
  } catch (error) {
    console.error('Error decoding calldata:', error);
    return null;
  }
}

async function getFunctionPrototype(fourBytesSigHash: string) {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/ethereum-lists/4bytes/master/signatures/${fourBytesSigHash}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch function prototype');
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching function prototype:', error);
    return null;
  }
}

function parseFunctionPrototype(prototype: string) {
  const regex = /^([a-zA-Z_][a-zA-Z0-9_]*)\((.*)\)$/;
  const match = prototype.match(regex);

  if (!match) {
    throw new Error('Invalid function prototype format.');
  }

  const functionName = match[1];
  const paramTypes = match[2].length > 0 ? match[2].split(',').map(param => param.trim()) : [];

  return {
    functionName,
    paramTypes
  };
}



