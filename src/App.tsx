import { all, create } from 'mathjs'
import { useState } from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import { LuDivide, LuEqual, LuMinus, LuPercent, LuPlus } from 'react-icons/lu'
import { PiPlusMinusLight } from 'react-icons/pi'
import styled from 'styled-components'

const MainApp = styled.div`
  background-color: #000000;
  color: #e4e4e4;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const Body = styled.div`
  background-color: #0f1112;
  padding: 20px;
  border-radius: 10px;
`

const OutputDisplay = styled.div`
  background-color: #000000;
  color: #e4e4e4;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`

const DisplayFormula = styled.div`
  text-align: right;
  font-size: 14px;
  height: 24px;
  padding: 5px 10px;
`

const DisplayOutput = styled.div`
  text-align: right;
  font-size: 30px;
  padding: 5px 10px;
`

const Keypad = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  font-size: 20px;
`

const KeypadRow = styled.div`
  display: flex;
  flex-direction: row;
`
const CalcButton = styled.button`
  height: 50px;
  width: 50px;
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin: 3px;
`

const NumberButton = styled(CalcButton)`
  background-color: #393939;
  color: #ffffff;
`

const SpecialButton = styled(CalcButton)`
  background-color: #989898;
  color: #000000;
`

const FunctionButton = styled(CalcButton)`
  background-color: #ff7551;
  color: #000000;
`

const App = () => {
  const [value, setValue] = useState('0')
  const [formula, setFormula] = useState('')
  const config = {}
  const math = create(all, config)

  const handleReset = () => {
    setValue('0')
  }

  const Display = (val: string) => {
    if (value === '0') {
      setValue(val)
    } else {
      setValue(value + val)
    }
  }

  const FunctionKey = (val: string) => {
    const newValue = value + val
    setFormula(newValue)
    setValue('0')
  }

  const Percent = () => {
    let newValue = ''
    if (Number(value)) {
      newValue = (Number(value) / 100).toString()
    } else {
      const evalValue = math.evaluate(value)
      newValue = (Number(evalValue) / 100).toString()
    }
    const parsedValue = parseFloat(newValue).toFixed(6)
    setValue(parsedValue)
  }

  const PlusMinus = () => {
    let newValue = 0
    if (Number(value)) {
      newValue = -Number(value)
    } else {
      newValue = -Number(math.evaluate(value))
    }
    const parsedValue = parseFloat(newValue.toFixed(6))
    setValue(parsedValue.toString())
  }

  const Solve = () => {
    const evalValue = formula + value
    const newValue = math.evaluate(evalValue)
    const parsedValue = newValue.toFixed(6)
    setValue(parsedValue.toString())
    setFormula('')
  }

  return (
    <MainApp>
      <Body>
        <OutputDisplay>
          <DisplayFormula>{formula}</DisplayFormula>
          <DisplayOutput>{value}</DisplayOutput>
        </OutputDisplay>
        <Keypad>
          <KeypadRow>
            <SpecialButton onClick={handleReset}>C</SpecialButton>
            <SpecialButton onClick={PlusMinus}>
              <PiPlusMinusLight />
            </SpecialButton>
            <SpecialButton onClick={Percent}>
              <LuPercent />
            </SpecialButton>
            <FunctionButton onClick={() => FunctionKey('/')}>
              <LuDivide />
            </FunctionButton>
          </KeypadRow>
          <KeypadRow>
            <NumberButton onClick={() => Display('7')}>7</NumberButton>
            <NumberButton onClick={() => Display('8')}>8</NumberButton>
            <NumberButton onClick={() => Display('9')}>9</NumberButton>
            <FunctionButton onClick={() => FunctionKey('*')}>
              <LiaTimesSolid />
            </FunctionButton>
          </KeypadRow>
          <KeypadRow>
            <NumberButton onClick={() => Display('4')}>4</NumberButton>
            <NumberButton onClick={() => Display('5')}>5</NumberButton>
            <NumberButton onClick={() => Display('6')}>6</NumberButton>
            <FunctionButton onClick={() => FunctionKey('-')}>
              <LuMinus />
            </FunctionButton>
          </KeypadRow>
          <KeypadRow>
            <NumberButton onClick={() => Display('1')}>1</NumberButton>
            <NumberButton onClick={() => Display('2')}>2</NumberButton>
            <NumberButton onClick={() => Display('3')}>3</NumberButton>
            <FunctionButton onClick={() => FunctionKey('+')}>
              <LuPlus />
            </FunctionButton>
          </KeypadRow>
          <KeypadRow>
            <NumberButton
              style={{ flexGrow: 1 }}
              onClick={() => Display('0')}>
              0
            </NumberButton>
            <NumberButton onClick={() => Display('.')}>.</NumberButton>
            <FunctionButton onClick={Solve}>
              <LuEqual />
            </FunctionButton>
          </KeypadRow>
        </Keypad>
      </Body>
    </MainApp>
  )
}

export default App
