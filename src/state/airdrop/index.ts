/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/farms'
import fetchAirdrop from './fetchAirdrop'
import {
  fetchAirdropUserBalance,
} from './fetchAirdropUser'
import { AirdropState, Airdrop } from '../types'

const initialState: AirdropState = { data: [...[]] }

export const airdropSlice = createSlice({
  name: 'Airdrop',
  initialState,
  reducers: {
    setAirdropPublicData: (state, action) => {
      const liveAirdropData: Airdrop[] = action.payload
      state.data = state.data.map((airdrop) => {
        // const liveFarmData = liveAirdropData.find((f) => f.pid === farm.pid)
        return { ...airdrop }
      })
    },
    setAirdropUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setAirdropPublicData, setAirdropUserData } = airdropSlice.actions

// Thunks
export const fetchAirdropPublicDataAsync = () => async (dispatch) => {
  const airdrops = await fetchAirdrop()
  dispatch(setAirdropPublicData(airdrops))
}

export const fetchAirdropUserDataAsync = () => async (dispatch) => {
  const userAirdrop = await fetchAirdropUserBalance()
  // const userFarmTokenBalances = await fetchFarmUserTokenBalances(account)
  // const userStakedBalances = await fetchFarmUserStakedBalances(account)
  // const userFarmEarnings = await fetchFarmUserEarnings(account)

  // const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
  //   return {
  //     index,
  //     allowance: userFarmAllowances[index],
  //     // tokenBalance: userFarmTokenBalances[index],
  //     // stakedBalance: userStakedBalances[index],
  //     // earnings: userFarmEarnings[index],
  //   }
  // })

  dispatch(setAirdropUserData({ userAirdrop }))
}

export default airdropSlice.reducer
