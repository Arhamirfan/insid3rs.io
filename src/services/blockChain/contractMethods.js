import AuthApi from '../../api/auth';
import Web3 from 'web3';
import AppApi from '../../api/app'
import UserApi from '../../api/user'
import { MetaKeep } from 'metakeep'
import { bool } from 'yup';
import detectEthereumProvider from '@metamask/detect-provider';


let account = ""
let web3 = ""
let web3MetaKeepProvider = async (userEmail) => {
    let rpcNodeUrls = JSON.parse(process.env.NEXT_PUBLIC_METAKEEP_RPC_NODE_URL)
    const sdk = await new MetaKeep({
        /* App id to configure UI */
        appId: process.env.NEXT_PUBLIC_METAKEEP_APP_ID,
        /* Default chain to use */
        chainId: process.env.NEXT_PUBLIC_METAKEEP_RPC_NODE_ID,
        /* RPC node urls map */
        rpcNodeUrls: rpcNodeUrls,
        user: {
            email: userEmail
        }
    });
    let provider = await sdk.ethereum
    web3 = await new Web3(provider);
    return web3
}

let contractConnection = async () => {
    try {
        let res = await AppApi.getNetworks();
        if (res.status == 200) {
            let network = res.data.data[0];
            let ADDRESS = network.networkAddress
            let ABI = network.networkAbi;
            let contract = new web3.eth.Contract(ABI, ADDRESS);
            return contract
        } else {
            return ""
        }
    } catch (error) {
        console.log(error);
        return error
    }

}
let buyTicket = async (data) => {
    try {
        let contract = await contractConnection();
        console.log("contract", contract)
        if (contract) {
            let amount = await convertToWie(data.price);
            console.log("contract methods params:", data)
            console.log("account", account);
            // return
            // ************************************************
            console.log(account, data.ticketId, data.noOfCopies, account, amount);
            let gas = await getEstimateGas();
            let result = await contract.methods.mintTicketsWithFixPrice(account, data.ticketId, data.noOfCopies, data.promoCode).send({
                from: account,
                gas: gas * 1.5,
                value: amount
            }, (error, transactionHash) => {
                console.log(error)
                console.log(transactionHash)
            }).on('receipt', function (data) {
                console.log(data)
                // return { success: true, message: "Event created successfully" };
            }).on('error', function (error) {
                console.log('onErrorBlockchain:', error);
                return { error: true, message: "Transaction error from blockchain please try later." };
            });
            console.log("blockchainResult ", result)
            return result
        } else {
            return { status: true, message: "Contract connection failed." }
        }
    } catch (error) {
        console.log(error)
        let message = ""
        if (error?.message?.includes("EVM:") || error?.message?.includes("RPC")) {
            message = "Transaction failed form blockChain due to congested network please try later."
        } else {
            if (error?.message) {
                message = error.message
            } else {
                if (error?.message) {
                    message = error.message
                } else {
                    message = "Transaction failed form blockChain"
                }
            }
        }
        if (message == "insufficient funds for gas * price + value") {
            message = "You do not have sufficient funds. Please add funds and try again.";
        }
        return { status: true, message: message };
    }
}

let createAuction = async (data) => {
    try {
        let contract = await contractConnection();
        if (contract) {
            console.log("contract methods params:", data)
            // data.price * WIE_UNIT,
            console.log("from address", account);
            let amount = await convertToWie(data.price);
            console.log("amount:", amount);
            let gas = await getEstimateGas();
            let result = await contract.methods.placePackageForTimedAuction(data.eventId,
                data.ticketsIds,
                data.ticketsCopies,
                data.auctionStartTime,
                data.auctionEndTime,
                amount,
                data.incrementPercentage).send({
                    from: account,
                    gas: gas * 2,
                }, (error, transactionHash) => {
                    console.log(error)
                    console.log(transactionHash)
                }).on('receipt', function (data) {
                    console.log(data)
                    // return { success: true, message: "Event created successfully" };
                }).on('error', function (error) {
                    console.log(error);
                    return { error: true, message: "Transaction error from blockchain please try later." };
                });
            return result
        } else {
            return { status: true, message: "Contract connection failed." }
        }
    } catch (error) {
        console.log(error)
        let message = ""
        if (error?.message?.includes("EVM:") || error?.message?.includes("RPC")) {
            message = "Transaction failed form blockChain due to congested network please try later."
        } else {
            if (error?.message) {
                message = error.message
            } else {
                message = "Transaction failed form blockChain"
            }
        }
        if (message == "insufficient funds for gas * price + value") {
            message = "You do not have sufficient funds. Please add funds and try again.";
        }
        return { status: true, message: message }
    }

}
let createPackage = async (data) => {
    try {
        let contract = await contractConnection();
        if (contract) {
            console.log("contract methods params:", data)
            // data.price * WIE_UNIT,
            console.log("from address", account);
            // console.log((data.price * WIE_UNIT).toString())
            let amount = await convertToWie(data.price);
            console.log("amount", amount)
            let gas = await getEstimateGas();
            let result = await contract.methods.placePackageForFixedPrice(data.eventId, data.ticketsIds, data.ticketsCopies, amount).send({
                from: account,
                gas: gas * 2,
            }, (error, transactionHash) => {
                console.log(error)
                console.log(transactionHash)
            }).on('receipt', function (data) {
                console.log(data)
                // return { success: true, message: "Event created successfully" };
            }).on('error', function (error) {
                console.log(error);
                return { error: true, message: "Transaction error from blockchain please try later." };
            });
            return result
        } else {
            return { status: true, message: "Contract connection failed." }
        }
    } catch (error) {
        console.log(error)
        let message = ""
        if (error?.message?.includes("EVM:") || error?.message?.includes("RPC")) {
            message = "Transaction failed form blockChain due to congested network please try later."
        } else {
            if (error?.message) {
                message = error.message
            } else {
                message = "Transaction failed form blockChain"
            }
        }
        if (message == "insufficient funds for gas * price + value") {
            message = "You do not have sufficient funds. Please add funds and try again.";
        }
        return { status: true, message: message }
    }

}
let AcceptYourHighestBid = async (data) => {
    try {
        let contract = await contractConnection();
        if (contract) {
            console.log("contract methods params:", data)
            // data.price * WIE_UNIT,
            console.log("from address", account);
            // console.log((data.price * WIE_UNIT).toString())
            let gas = await getEstimateGas();
            let result = await contract.methods.AcceptYourHighestBid(data.packageID, data.eventID).send({
                from: account,
                gas: gas * 1.5,
            }, (error, transactionHash) => {
                console.log(error)
                console.log(transactionHash)
            }).on('receipt', function (data) {
                console.log(data)
                // return { success: true, message: "Event created successfully" };
            }).on('error', function (error) {
                console.log(error);
                return { error: true, message: "Transaction error from blockchain please try later." };
            });
            return result
        } else {
            return { status: true, message: "Contract connection failed." }
        }
    } catch (error) {
        console.log(error)
        let message = ""
        if (error?.message?.includes("EVM:") || error?.message?.includes("RPC")) {
            message = "Transaction failed form blockChain due to congested network please try later."
        } else {
            if (error?.message) {
                message = error.message
            } else {
                message = "Transaction failed form blockChain"
            }
        }
        if (message == "insufficient funds for gas * price + value") {
            message = "You do not have sufficient funds. Please add funds and try again.";
        }
        return { status: true, message: message }
    }

}
let bidOnAuction = async (data) => {
    try {
        let contract = await contractConnection();
        if (contract) {
            console.log("contract methods params:", data)
            // data.price * WIE_UNIT,
            console.log("from address", account);
            // console.log((data.price * WIE_UNIT).toString())
            let amount = await convertToWie(data.price);
            console.log("amount", amount)
            let gas = await getEstimateGas();
            let result = await contract.methods.addAuctionBid(data.packageID, amount).send({
                from: account,
                value: amount,
                gas: gas * 1.5,
                // value: (data.price * WIE_UNIT).toString()
            }, (error, transactionHash) => {
                console.log(error)
                console.log(transactionHash)
            }).on('receipt', function (data) {
                console.log(data)
                // return { success: true, message: "Event created successfully" };
            }).on('error', function (error) {
                console.log(error);
                return { error: true, message: "Transaction error from blockchain please try later." };
            });
            return result
        } else {
            return { status: true, message: "Contract connection failed." }
        }
    } catch (error) {
        console.log(error)
        let message = ""
        if (error?.message?.includes("EVM:") || error?.message?.includes("RPC")) {
            message = "Transaction failed form blockChain due to congested network please try later."
        } else {
            if (error?.message) {
                message = error.message
            } else {
                message = "Transaction failed form blockChain"
            }
        }
        if (message == "insufficient funds for gas * price + value") {
            message = "You do not have sufficient funds. Please add funds and try again.";
        }
        return { status: true, message: message }
    }

}
let buyPackage = async (data) => {
    try {
        let contract = await contractConnection();
        if (contract) {
            console.log("contract methods params:", data)
            let amount = await convertToWie(data.price);
            let gas = await getEstimateGas();
            let result = await contract.methods.buyPackageForFixedPrice(account, data.packageID, data.eventID).send({
                from: account,
                value: amount,
                gas: gas * 1.5,
            }, (error, transactionHash) => {
                console.log(error)
                console.log(transactionHash)
            }).on('receipt', function (data) {
                console.log(data)
                // return { success: true, message: "Event created successfully" };
            }).on('error', function (error) {
                console.log(error);
                return { error: true, message: "Transaction error from blockchain please try later." };
            });
            return result
        } else {
            return { status: true, message: "Contract connection failed." }
        }
    } catch (error) {
        console.log(error)
        let message = ""
        if (error?.message?.includes("EVM:") || error?.message?.includes("RPC")) {
            message = "Transaction failed form blockChain due to congested network please try later."
        } else {
            if (error?.message) {
                message = error.message
            } else {
                message = "Transaction failed form blockChain"
            }
        }
        if (message == "insufficient funds for gas * price + value") {
            message = "You do not have sufficient funds. Please add funds and try again.";
        }
        return { status: true, message: message }
    }

}
let dropSiteStatus = async () => {
    try {
        if (!localStorage.getItem("token") && !web3) {
            let ethereum = window.ethereum
            web3 = new Web3(ethereum);
        }
        let contract = await contractConnection();
        if (contract) {
            let result = await contract.methods.paused().call()
            console.log("Drop site status: ", result);
            return result

        } else {
            return { status: true, message: "Contract connection failed." }
        }
    } catch (error) {
        console.log("error on getting dropSiteStatus", error)
        return ""
    }
}
let eventStatus = async (id) => {
    try {
        if (!web3) {
            let ethereum = window.ethereum
            web3 = new Web3(ethereum);
        }
        let contract = await contractConnection();
        let result = await contract.methods.eventIsPaused(id).call()
        console.log("event status: ", result);
        return result
    } catch (error) {
        console.log("error on getting dropSiteStatus", error)
        return ""
    }
}
let convertToWie = async (amount) => {
    return Web3.utils.toWei(amount.toString(), 'ether');
}
let createAccount = async () => {
    let web3 = new Web3()
    let res = await web3.eth.accounts.create();
    console.log('account', res);
}
// **************************************************************

let removeProfile = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    localStorage.removeItem("profileId");
    window.location.reload();
}

let web3MetaMaskProvider = async () => {
    let ethereum = window.ethereum
    let web3 = new Web3(ethereum);
    ethereum.on('accountsChanged', async function (accounts) {
        removeProfile()
    });
    ethereum.on('chainChanged', (chainId) => {
        removeProfile()
    });
    return web3
}
let connectMetaMask = async (networkId, autoConnect = false) => {
    try {
        let res = await AppApi.getNetworks();
        if (res.status == 200) {
            let network = res.data.data[0];
            console.log(network.networkId)
            if (typeof window.ethereum !== 'undefined') {
                //******************* MOBILE WALLET CONNECTION */
                const ethereumProvider = await detectEthereumProvider();
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                console.log("🚀 ~ file: contractMethods.js:411 ~ connectMetaMask ~ isMobile:", isMobile)
                console.log("🚀 ~ file: contractMethods.js:411 ~ connectMetaMask ~ navigator.userAgent:", navigator.userAgent)
                if (isMobile) {
                    if (!ethereumProvider.isConnected()) {
                        console.log('Please open the MetaMask app and connect to your account');
                        window.open(`https://metamask.app.link/dapp/<${process.env.NEXT_PUBLIC_APP_URL}>`, '_blank');
                    }
                } else {
                    console.log('pc version metamask connecting')
                }
                //**********************************************
                let chainId = await ethereum.request({ method: 'eth_chainId' });
                if (chainId !== network.networkId) {
                    return { connected: false, account: "", messages: "you are not on right network.You need to connect you metaMask wallet to polygon." }
                }
                web3 = await web3MetaMaskProvider()
                if (!autoConnect) {
                    await ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: network.networkId }],
                    });
                }
                let accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                })
                console.log("accounts", accounts)
                if (accounts) {
                    account = accounts[0];
                    let balance = await web3.eth.getBalance(account).then((bal) => {
                        console.log('balance:', parseFloat(web3.utils.fromWei(bal, 'ether')).toFixed(4));
                        return parseFloat(web3.utils.fromWei(bal, 'ether')).toFixed(4);
                    });
                    let message = "Login to INSID3ERS.IO"
                    if (!autoConnect) {
                        let token = await web3.eth.personal.sign(message, account);
                        if (token) {
                            let apiResult = await AuthApi.metaMaskLogin({
                                token: token,
                                login_message: message,
                                account_type: "METAMASK"
                            });
                            if (apiResult && apiResult.status == 200) {
                                if (token) {
                                    console.log(res);
                                    //TODO 
                                    //   ethereum.on('connect', handler: (connectInfo: ConnectInfo) => void);
                                    // ethereum.on('disconnect', handler: (error: ProviderRpcError) => void);
                                    // ethereum._metamask.isUnlocked();
                                    // ethereum.isConnected()
                                    // console.log(ethereum.isConnected())
                                    let chainId = await ethereum.request({ method: 'eth_chainId' });
                                    console.log(chainId)
                                    if (chainId === network.networkId) {
                                        let token = apiResult.data.data.token
                                        localStorage.setItem("token", token);
                                        return { connected: true, account, balance, token, messages: "Login successfully.", profile: apiResult.data.data };
                                    } else {
                                        return { connected: false, account: "", messages: "you are not on right network.You need to connect you metaMask wallet to Mumbai-Test-Net." }
                                    }
                                } else {
                                    return { connected: false, account: "", messages: "Login failed." }
                                }
                            } else {
                                return { connected: false, account: "", messages: "Account login failed." }
                            }
                        } else {
                            return { connected: false, account: "", messages: "login failed due to connection." }
                        }
                    } else {
                        try {
                            let token = localStorage.getItem("token");
                            let res = await UserApi.getUserProfile();
                            if (res.status == 200) {
                                let profile = res.data.data;
                                return { connected: true, account, balance, profile, token, messages: "Login successfully." };
                            } else {
                                localStorage.removeItem("token");
                                return { connected: false, messages: "Login failed." };
                            }
                        } catch (error) {
                            localStorage.removeItem("token");
                            return { connected: false, messages: "Login failed." };
                        }
                    }
                } else {
                    return { connected: false, account: "", messages: "" }
                }
            } else {
                return { connected: false, account: "", messages: "Please install metaMask extension in your chrome browser." }
            }
        } else {
            return { connected: false, account: "", messages: "Network not found" }
        }
    } catch (error) {
        return { connected: false, account: "", messages: error.message }
    }
}
let connectEmail = async (data, walletType) => {
    try {
        // web3 = await web3MetaMaskProvider()
        web3 = await web3MetaKeepProvider(data?.email);
        let balance = await web3.eth.getBalance(data?.address).then((bal) => {
            console.log('balance:', parseFloat(web3.utils.fromWei(bal, 'ether')).toFixed(4));
            return parseFloat(web3.utils.fromWei(bal, 'ether')).toFixed(4);
        });
        if (data.token) {
            account = data.address;
            localStorage.setItem("token", data?.token);
            localStorage.setItem("profileId", data?._id);
            localStorage.setItem("profile", JSON.stringify(data));
            localStorage.setItem("walletType", walletType);
            return { connected: true, account: data?.address, balance, profile: data, token: data?.token, messages: "Login successfully." };
            // let message = "Login to INSID3ERS.IO"
            // const token = await web3.eth.sign(message, data?.address);
            // if (token) {

            // } else {
            //     return { connected: false, account: "", messages: "login failed due to sign in rejection." }

            // }
        } else {
            return { connected: false, account: "", messages: "login failed due to connection." }
        }
    } catch (error) {
        console.log("🚀 ~ file: contractMethods.js:492 ~ connectEmail ~ error", error)
        return { connected: false, account: "", messages: error?.message ? error?.message : error?.status }
    }
}
let getGasPrice = async () => {
    let gasPrice = await web3.eth.getGasPrice();
    return gasPrice
}
let getEstimateGas = async () => {
    return 210000
}
let getAccountBalance = async (account, email = '', type = 'METAMASK') => {
    try {
        console.log('account:', account)
        console.log('account:', type)
        web3 = type == 'METAMASK' ? await web3MetaMaskProvider() : await web3MetaKeepProvider(email);
        let balance = await web3.eth.getBalance(account).then((bal) => {
            console.log('balance:', parseFloat(web3.utils.fromWei(bal, 'ether')).toFixed(4));
            return parseFloat(web3.utils.fromWei(bal, 'ether')).toFixed(4);
        });
        console.log('balance:', balance)
        return balance
    } catch (error) {
        console.log("🚀 ~ file: contractMethods.js:505 ~ getAccountBalance ~ error", error)

    }

}
//******************************************************* */ 
let connectMetakeep = async (autoConnect = false) => {
    try {
        web3 = await web3MetaKeepProvider('');
        // Get accounts  
        const web3Accounts = await web3.eth.getAccounts();
        console.log(web3Accounts);
        account = web3Accounts[0];
        console.log("account", account);
        let balance = await web3.eth.getBalance(account).then((bal) => {
            console.log('balance:', parseFloat(web3.utils.fromWei(bal, 'ether')).toFixed(4));
            return parseFloat(web3.utils.fromWei(bal, 'ether')).toFixed(4);
        });
        let message = "Login to INSID3ERS.IO"
        if (autoConnect == false) {
            const token = await web3.eth.sign(message, web3Accounts[0]);
            console.log("token", token);
            if (token) {
                let apiResult = await AuthApi.metaMaskLogin({
                    token: token,
                    login_message: message,
                    account_type: "METAKEEP"
                });
                if (apiResult && apiResult.status == 200) {
                    return { connected: true, account, balance, token, messages: "Login successfully.", profile: apiResult.data.data };
                } else {
                    return { connected: false, account: "", messages: "Login failed." }
                }
            } else {
                return { connected: false, account: "", messages: "login failed due to connection." }
            }
        } else {
            try {
                let token = localStorage.getItem("token");
                let res = await UserApi.getUserProfile();
                if (res.status == 200) {
                    let profile = res.data.data;
                    return { connected: true, account, balance, profile, token, messages: "Login successfully." };
                } else {
                    localStorage.removeItem("token");
                    return { connected: false, account: "", balance: 0, messages: "Login failed." };
                }
            } catch (error) {
                localStorage.removeItem("token");
                return { connected: false, account: "", balance: 0, messages: "Login failed." };
            }
        }
    } catch (error) {
        console.log(error)
        return { connected: false, account: "", messages: "login failed due to connection." }

    }

}

//******************************************************* */


export {
    convertToWie,
    createAccount,
    buyTicket,
    dropSiteStatus,
    eventStatus,
    createPackage,
    buyPackage,
    createAuction,
    bidOnAuction,
    AcceptYourHighestBid,

    connectMetakeep,
    connectEmail,
    connectMetaMask, account, getGasPrice, getAccountBalance
}



