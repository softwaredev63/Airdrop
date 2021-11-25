import BigNumber from 'bignumber.js'
import airdrop from 'config/abi/airdrop.json'
import multicall from 'utils/multicall'
import farmsConfig from 'config/constants/farms'
import { getAirdropAddress } from 'utils/addressHelpers'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const fetchAirdropUserBalance = async () => {
  const airdropAddress = getAirdropAddress()
  const calls = [
        {
          address: airdropAddress,
          name: 'getTopBuyers',
        }]
  const topBuyerAddresses = await multicall(airdrop, calls)

  const callsAgain = topBuyerAddresses.map((address)=>{
    return {
      address: airdropAddress,
      name: 'buyerInfo',
      params: [address],
    }
  })

  const buyerInfo = await multicall(airdrop, callsAgain)

  const arrayOfUserDataObjects = topBuyerAddresses.map((address, index) => {
    return {
      index,
      address: topBuyerAddresses[index],
      balance: buyerInfo[index]
    }
  })
  return arrayOfUserDataObjects
}

export fetchAirdropUserBalance