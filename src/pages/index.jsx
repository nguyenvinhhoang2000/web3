import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { ERC20TransferABI, SINH_ADDRESS } from './sinh_address'

import './style.scss'

const Demo = () => {
    const web3 = new Web3(window.ethereum)

    const reciverAddress = '0xEb2F2cC5E639B084a02597de53921eaD0af0b927';

    const sinhToken = new web3.eth.Contract(ERC20TransferABI, SINH_ADDRESS)

    const [table, setTable] = useState(1);

    const [account, setAccount] = useState('')
    const [balance, setBalance] = useState('')
    const [chainId, setChainId] = useState('')
    const [gasPrice, setGasPrice] = useState('')

    const getAccount = async () => {
        const address = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(address[0])
    }

    useEffect(() => {
        if (account) {

            web3.eth.getBalance(account)
                .then(setBalance);

            web3.eth.getChainId().then(setChainId);

            web3.eth.getGasPrice()
                .then(setGasPrice);

            // web3.eth.getTransaction('0x5e525335b4fa26694edad4fb7cff64e4633c08b1070736092aeffa8cc42ef625')
            //     .then(console.log);

            // web3.eth.getTransactionReceipt('0x5e525335b4fa26694edad4fb7cff64e4633c08b1070736092aeffa8cc42ef625')
            //     .then(console.log);


        }
    }, [account])

    const sendEth = async () => {
        const PRIVATE_KEY = '8102957e1c2858fe3661ae1d0b1eaecc2b3f85885613eb99d6dd175998806afc';
        const VINHOANG1 = "0xEb2F2cC5E639B084a02597de53921eaD0af0b927";

        const nonce = await web3.eth.getTransactionCount(account, 'latest'); // nonce starts counting from 0

        const transaction = {
            to: VINHOANG1,
            value: '1000000',
            gas: 2000000,
            gasPrice: gasPrice,
            nonce: nonce,
            chainId: chainId
        }

        const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
            if (!error) {
                console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
            } else {
                console.log("❗Something went wrong while submitting your transaction:", error)
            }
        });
    }

    // const sendEth = async () => {
    //     const nonce = await web3.eth.getTransactionCount(account, 'latest');

    //     const transaction = {
    //         gas: 2000000,
    //         gasPrice: gasPrice,
    //         nonce: nonce,
    //         chainId: chainId
    //     }

    //     await sinhToken.methods.transfer("0x869700Fa534233B0552320ADfada33d878d48Bc1", "1000").send({ from: account }, function (err, res) {
    //         if (err) {
    //             console.log("Oi zoi oi,", err);
    //             return
    //         }

    //         console.log("Hash of the transaction", res);
    //     })
    // }

    const estimateGas = async () => {
        // const PRIVATE_KEY = '8102957e1c2858fe3661ae1d0b1eaecc2b3f85885613eb99d6dd175998806afc';
        // const VINHOANG1 = "0xEb2F2cC5E639B084a02597de53921eaD0af0b927";

        // const nonce = await web3.eth.getTransactionCount(account, 'latest');

        // const transaction = {
        //     to: VINHOANG1,
        //     value: '1000000',
        //     gas: 2000000,
        //     gasPrice: gasPrice,
        //     nonce: nonce,
        //     chainId: chainId
        // }

        // web3.eth.estimateGas({
        //     to: VINHOANG1,
        //     data: transaction,
        // })
        //     .then(console.log);
    }



    // func
    const HandleClickTable = (table) => {
        setTable(table);
    }

    return (
        <div className='page'>
            <div className='header'>
                <img className='header-logo' src="https://miro.medium.com/max/1400/1*gRFH48Pd7u3TpbWnc9__BQ.png" alt="" />
                <h1>{chainId ? (chainId === 1 ? "Mainnet" : "Testnet") : ""}</h1>
                <button className='btn-sign' onClick={getAccount}>Connect</button>
            </div>

            <span className='address'>{`${account.substring(0, 5)}...${account.substr(-4, 4)}`}</span>

            <div className="page-body">
                <img className='page-body--img' src="https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg" alt="" />
                <h1>{balance ? Math.round(balance / 100000000000000) / 10000 : "0"} ETH</h1>

                <div className="page-body--btn">
                    <button onClick={sendEth}>Send eth</button>
                    <button onClick={estimateGas}>Estimate Gas</button>
                </div>
            </div>

            <div className="page-bottom">
                <div className="table-item">
                    <h1 onClick={() => HandleClickTable(1)}>Assets</h1>
                    <h1 onClick={() => HandleClickTable(2)}>Activity</h1>
                </div>
                <div className="table-container">
                    <div className={`table ${table === 1 ? 'active' : ''}`} >
                        <img className='table-img ' src="https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg" alt="" />
                        <span>{balance ? Math.round(balance / 100000000000000) / 10000 : "0"} ETH</span>
                    </div>
                    <div className={`table ${table === 2 ? 'active' : ''}`} >
                        <img className='table-img ' src="https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg" alt="" />
                        <span>2</span>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Demo;