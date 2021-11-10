import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Flex, Input, Text } from '@pancakeswap-libs/uikit'
// import { useUserSlippageTolerance } from 'state/user/hooks'
// import QuestionHelper from '../QuestionHelper'
// import TranslatedText from '../TranslatedText'

const MAX_SLIPPAGE = 5000
const RISKY_SLIPPAGE_LOW = 50
const RISKY_SLIPPAGE_HIGH = 500

const StyledSlippageToleranceSettings = styled.div`
  margin-bottom: 16px;
  margin-top: 16px;
  opacity: 0.5;
  font: Swis721 BT;
`

const Option = styled.div`
  padding: 0 4px;
`

const InputOption = styled.div`
  padding: 0 4px;
  width: 80px;
`

const Options = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  ${Option}:first-child {
    padding-left: 0;
  }

  ${Option}:last-child {
    padding-right: 0;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const Label = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 8px;
`

const StyledToggleButton = styled(Button)`
  width: 100%;
  backround-color: #2D7FC4;
  &:active {
    background-color: #2D7FC4;
  }
  &:focus {
    background-color: #2D7FC4;
  }



  &:hover:not(:disabled):not(:active) {
   background-color: #2D7FC4 !import;
   ;
  }
  

`

const predefinedValues = [
  { label: '30 days', value: '30' },
  { label: '60 days', value: '60' },
  { label: '90 days', value: '90' },
  { label: '360 days', value: '360' },
]

interface DaysProps {
  onSetDays: (days: string) => void
}

const SlippageToleranceSettings = ({onSetDays}) => {
  // const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  // const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value: inputValue } = evt.target
  //   setValue(parseFloat(inputValue))
  // }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      // if (!Number.isNaN(value) && value > 0 && value <= 360) {
      if (value !== '') {
        // setUserslippageTolerance(rawValue)
        setError(null)
      } else {
        setError('Select your harvesting days')
      }
    } catch {
      setError('Select your harvesting days')
    }
  }, [value, setError])

  // Notify user if slippage is risky
  // useEffect(() => {
  //   if (userSlippageTolerance < RISKY_SLIPPAGE_LOW) {
  //     setError('Your transaction may fail')
  //   } else if (userSlippageTolerance > RISKY_SLIPPAGE_HIGH) {
  //     setError('Your transaction may be frontrun')
  //   }
  // }, [userSlippageTolerance, setError])

  return (
    <StyledSlippageToleranceSettings>
      <Options>
        <Flex mb={['8px', 0]} mr={[0, '8px']}>
          {predefinedValues.map(({ label, value: predefinedValue }) => {
            const handleClick = () => {
              setValue(predefinedValue)
              onSetDays(predefinedValue)
            }

            return (
              <Option key={predefinedValue}>
                <StyledToggleButton variant={value === predefinedValue ? 'primary' : 'tertiary'} onClick={handleClick}>
                  {label}
                </StyledToggleButton>
              </Option>
            )
          })}
        </Flex>
        
      </Options>
      {error && (
        <Text mt="8px" color="failure">
          {error}
        </Text>
      )}
      <Text mt="8px" color="failure">
          You cannot withdraw your 2LC until harvesting day.
      </Text>  
    </StyledSlippageToleranceSettings>
  )
}

export default SlippageToleranceSettings
