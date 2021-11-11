import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Text, Skeleton, LinkExternal } from '@pancakeswap-libs/uikit'
import { communityFarms } from 'config/constants'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import { useFarmFromPid, useFarmFromSymbol, useFarmUser } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'


import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'

import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 16px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

const NotificationOldText = styled.div`
  margin-top: 5px;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border: 1px solid #ff0050;
  background: linear-gradient(#1d5ebb, #4175bf);
  border-radius: 16px;
  color: #fff !important;
  font-size: 14px;
  font-weight: bold;
  height: auto;
  line-height: 1.5;
  padding: 0 8px;
  white-space: pre-wrap;
  place-content: center;
  margin-bottom: 10px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const Flex = styled.div`
  display: flex;
  padding: 10px 5px 5px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
`


interface FarmCardProps {
  ethereum?: provider
  account?: string
}

const AirdropCard: React.FC<FarmCardProps> = ({ ethereum, account }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  // const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()

  // const { pid, lpAddresses, isTokenOnly, tokenAmount, depositFeeBP } = useFarmFromPid(farm.pid)
  // const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid)
  // const rawEarningsBalance = getBalanceNumber(earnings)
  // const displayBalance = rawEarningsBalance.toLocaleString('en-US')
  // const rawStakingBalance = getBalanceNumber(stakedBalance)
  // const displayStakingBalance = rawStakingBalance.toLocaleString('en-US')

  // const numTokenAmount:number = +tokenAmount
  // const displayTotalToken = numTokenAmount.toFixed(4)

  console.log('FarmCard!!!!!!')
  // const totalValue: BigNumber = useMemo(() => {
  //   if (!farm.lpTotalInQuoteToken) {
  //     return null
  //   }
  //   if (farm.quoteTokenSymbol === QuoteToken.BNB) {
  //     return bnbPrice.times(farm.lpTotalInQuoteToken)
  //   }
  //   if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
  //     return cakePrice.times(farm.lpTotalInQuoteToken)
  //   }
  //   return farm.lpTotalInQuoteToken
  // }, [bnbPrice, cakePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  // const totalValueFormated = totalValue
  //   ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  //   : '-'

  // const lpLabel = farm.tokenSymbol.concat(' POOL')
  // const earnLabel = '2LC'
  // const farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2,
  //   })

  // const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, risk } = farm
  const address = '0xFcfd20bFB75B83d5eb61D2F0c4A0aecc4e585a63';

  return (
    <FCard>
      {/* {farm.tokenSymbol === '2LC' && <StyledCardAccent />} */}
      <Flex >
        <Text fontSize="30px" >Top Buyers</Text>
      </Flex>
      <Flex >
        <StyledLinkExternal href={
              `https://bscscan.com/address/${address}`
          }>
            {address}
        </StyledLinkExternal>
        <Text>
        123456 2LC
        </Text>
      </Flex>
      <Flex >
        <StyledLinkExternal href={
              `https://bscscan.com/address/${address}`
          }>
            {address}
        </StyledLinkExternal>
        <Text>
        123456 2LC
        </Text>
      </Flex>
      <Flex >
        <StyledLinkExternal href={
              `https://bscscan.com/address/${address}`
          }>
            {address}
        </StyledLinkExternal>
        <Text>
        123456 2LC
        </Text>
      </Flex>

      
      
      {/* 
      <CardActionsContainer farm={farm} ethereum={ethereum} account={account} />
      
      
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          isTokenOnly={farm.isTokenOnly}
          bscScanAddress={
            farm.isTokenOnly ?
              `https://bscscan.com/token/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
              :
              `https://bscscan.com/token/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
          }
          totalValueFormated={totalValueFormated}
          lpLabel={lpLabel}
          quoteTokenAdresses={quoteTokenAdresses}
          quoteTokenSymbol={quoteTokenSymbol}
          tokenAddresses={tokenAddresses}
        />
      </ExpandingWrapper> */}
    </FCard>
  )
}

export default AirdropCard
