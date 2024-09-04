import { Transaction as EvmTransaction } from '@ethereumjs/tx';
import Web3 from 'web3'
import { EVMTransaction, TransactionWithTxHash } from '@/definitions';

export function parseEvmTransaction(tx: EVMTransaction): TransactionWithTxHash {
  const serializedEVMTxWithout0x = tx.payload.slice(2); // delete 0x
  const evmTx = EvmTransaction.fromSerializedTx(Buffer.from(serializedEVMTxWithout0x, 'hex'));

  return {
    txHash: '0x' + evmTx.hash().toString('hex'),
    v: 0,
    creator: evmTx.getSenderAddress().toString(),
    type: 'EVM_CALL',
    nonce: Number(evmTx.nonce),
    fee: Number(evmTx.gasLimit * evmTx.gasPrice),
    payload: {
      sigType: 'ECDSA',
      to: evmTx.to?.toString(),
      value: Web3.utils.fromWei(evmTx.value.toString(), 'ether'),
      evmBytecode: evmTx.data.toString('hex')
    },
    sig: 'ECDSA'
  };
}