import React, { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [expression, setExpression] = useState('') // 用於顯示計算過程
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const calculatorRef = useRef<HTMLDivElement>(null)

  // 檢測設備類型
  useEffect(() => {
    setIsClient(true)
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // ESC鍵關閉
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, onClose])

  // 計算邏輯
  const calculate = (firstOperand: number, secondOperand: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstOperand + secondOperand
      case '−':
        return firstOperand - secondOperand
      case '×':
        return firstOperand * secondOperand
      case '÷':
        return secondOperand !== 0 ? firstOperand / secondOperand : 0
      default:
        return secondOperand
    }
  }

  // 輸入數字
  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  // 輸入小數點
  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  // 清除
  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
    setExpression('')
  }

  // 百分比
  const percentage = () => {
    const value = parseFloat(display)
    const result = value / 100
    setDisplay(String(result))
    setExpression(`${value}% = ${result}`)
  }

  // 正負號切換
  const toggleSign = () => {
    const value = parseFloat(display)
    const result = -value
    setDisplay(String(result))
    if (expression) {
      setExpression(`-(${Math.abs(value)}) = ${result}`)
    }
  }

  // 執行運算 - 顯示計算過程
  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
      setExpression(`${inputValue} ${nextOperation}`)
    } else if (operation && !waitingForOperand) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)
      
      // 立即顯示新的運算符，不使用 setTimeout
      setExpression(`${newValue} ${nextOperation}`)
      setDisplay(String(newValue))
      setPreviousValue(newValue)
    } else {
      // 如果已經在等待操作數，只更新運算符
      setExpression(`${previousValue} ${nextOperation}`)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  // 計算結果
  const calculateResult = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setExpression(`${previousValue} ${operation} ${inputValue} = ${newValue}`)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  // 防止計算機內部點擊關閉
  const handleCalculatorClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // 避免服務器端渲染不一致
  if (!isClient) {
    return null
  }

  // 手機版全屏顯示
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            {/* 手機版計算機 */}
            <div 
              ref={calculatorRef}
              className="w-full max-w-sm calculator-mobile rounded-3xl flex flex-col shadow-2xl calculator-animate-in"
              onClick={handleCalculatorClick}
            >
              {/* 頂部工具欄 */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gray-800/95 rounded-t-3xl">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={onClose}
                    className="w-8 h-8 calculator-close-button rounded-full flex items-center justify-center active:scale-90 transition-transform duration-150"
                  >
                    <XMarkIcon className="w-4 h-4 text-white" />
                  </button>
                  <h1 className="text-white font-medium text-lg">Calculator</h1>
                </div>
              </div>

              {/* 計算機主體 */}
              <div className="flex-1 bg-gray-900 p-4 rounded-b-3xl">
                {/* 顯示屏 */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6 text-right">
                  {/* 計算過程顯示 */}
                  {expression && (
                    <div className="text-gray-400 text-lg font-light mb-2 min-h-[24px] flex items-end justify-end overflow-hidden">
                      {expression}
                    </div>
                  )}
                  {/* 主要結果顯示 */}
                  <div className="text-white text-5xl font-light min-h-[80px] flex items-end justify-end overflow-hidden">
                    {display}
                  </div>
                </div>

                {/* 按鈕區域 - macOS佈局 */}
                <div className="grid grid-cols-4 gap-3">
                  {/* 第一行 */}
                  <button onClick={clear} className="macos-calc-btn macos-calc-function">
                    <span>C</span>
                  </button>
                  <button onClick={toggleSign} className="macos-calc-btn macos-calc-function">
                    <span>+/−</span>
                  </button>
                  <button onClick={percentage} className="macos-calc-btn macos-calc-function">
                    <span>%</span>
                  </button>
                  <button onClick={() => performOperation('÷')} className="macos-calc-btn macos-calc-operator">
                    <span>÷</span>
                  </button>

                  {/* 第二行 */}
                  <button onClick={() => inputNumber('7')} className="macos-calc-btn macos-calc-number">
                    <span>7</span>
                  </button>
                  <button onClick={() => inputNumber('8')} className="macos-calc-btn macos-calc-number">
                    <span>8</span>
                  </button>
                  <button onClick={() => inputNumber('9')} className="macos-calc-btn macos-calc-number">
                    <span>9</span>
                  </button>
                  <button onClick={() => performOperation('×')} className="macos-calc-btn macos-calc-operator">
                    <span>×</span>
                  </button>

                  {/* 第三行 */}
                  <button onClick={() => inputNumber('4')} className="macos-calc-btn macos-calc-number">
                    <span>4</span>
                  </button>
                  <button onClick={() => inputNumber('5')} className="macos-calc-btn macos-calc-number">
                    <span>5</span>
                  </button>
                  <button onClick={() => inputNumber('6')} className="macos-calc-btn macos-calc-number">
                    <span>6</span>
                  </button>
                  <button onClick={() => performOperation('−')} className="macos-calc-btn macos-calc-operator">
                    <span>−</span>
                  </button>

                  {/* 第四行 */}
                  <button onClick={() => inputNumber('1')} className="macos-calc-btn macos-calc-number">
                    <span>1</span>
                  </button>
                  <button onClick={() => inputNumber('2')} className="macos-calc-btn macos-calc-number">
                    <span>2</span>
                  </button>
                  <button onClick={() => inputNumber('3')} className="macos-calc-btn macos-calc-number">
                    <span>3</span>
                  </button>
                  <button onClick={() => performOperation('+')} className="macos-calc-btn macos-calc-operator">
                    <span>+</span>
                  </button>

                  {/* 第五行 */}
                  <button onClick={() => inputNumber('0')} className="macos-calc-btn macos-calc-number macos-calc-zero col-span-2">
                    <span>0</span>
                  </button>
                  <button onClick={inputDecimal} className="macos-calc-btn macos-calc-number">
                    <span>.</span>
                  </button>
                  <button onClick={calculateResult} className="macos-calc-btn macos-calc-operator macos-calc-equals">
                    <span>=</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // 桌面版居中顯示
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          {/* 桌面版計算機 - macOS風格 */}
          <div 
            ref={calculatorRef}
            className="calculator-window-macos overflow-hidden shadow-2xl calculator-animate-in"
            onClick={handleCalculatorClick}
          >
            {/* macOS窗口控制按鈕 */}
            <div className="flex items-center justify-between p-4 bg-gray-700/90">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <button
                onClick={onClose}
                className="w-6 h-6 calculator-close-button rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-150"
              >
                <XMarkIcon className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* 計算機主體 */}
            <div className="p-4 bg-gray-800/95">
              {/* 顯示屏 */}
              <div className="bg-gray-900 rounded-lg p-6 mb-4 text-right border border-gray-700">
                {/* 計算過程顯示 */}
                {expression && (
                  <div className="text-gray-400 text-xl font-light mb-2 min-h-[28px] flex items-end justify-end overflow-hidden">
                    {expression}
                  </div>
                )}
                {/* 主要結果顯示 */}
                <div className="text-white text-6xl font-light min-h-[80px] flex items-end justify-end overflow-hidden">
                  {display}
                </div>
              </div>

              {/* 按鈕區域 - macOS佈局 */}
              <div className="grid grid-cols-4 gap-2">
                {/* 第一行 */}
                <button onClick={clear} className="macos-calc-btn macos-calc-function">
                  <span>C</span>
                </button>
                <button onClick={toggleSign} className="macos-calc-btn macos-calc-function">
                  <span>+/−</span>
                </button>
                <button onClick={percentage} className="macos-calc-btn macos-calc-function">
                  <span>%</span>
                </button>
                <button onClick={() => performOperation('÷')} className="macos-calc-btn macos-calc-operator">
                  <span>÷</span>
                </button>

                {/* 第二行 */}
                <button onClick={() => inputNumber('7')} className="macos-calc-btn macos-calc-number">
                  <span>7</span>
                </button>
                <button onClick={() => inputNumber('8')} className="macos-calc-btn macos-calc-number">
                  <span>8</span>
                </button>
                <button onClick={() => inputNumber('9')} className="macos-calc-btn macos-calc-number">
                  <span>9</span>
                </button>
                <button onClick={() => performOperation('×')} className="macos-calc-btn macos-calc-operator">
                  <span>×</span>
                </button>

                {/* 第三行 */}
                <button onClick={() => inputNumber('4')} className="macos-calc-btn macos-calc-number">
                  <span>4</span>
                </button>
                <button onClick={() => inputNumber('5')} className="macos-calc-btn macos-calc-number">
                  <span>5</span>
                </button>
                <button onClick={() => inputNumber('6')} className="macos-calc-btn macos-calc-number">
                  <span>6</span>
                </button>
                <button onClick={() => performOperation('−')} className="macos-calc-btn macos-calc-operator">
                  <span>−</span>
                </button>

                {/* 第四行 */}
                <button onClick={() => inputNumber('1')} className="macos-calc-btn macos-calc-number">
                  <span>1</span>
                </button>
                <button onClick={() => inputNumber('2')} className="macos-calc-btn macos-calc-number">
                  <span>2</span>
                </button>
                <button onClick={() => inputNumber('3')} className="macos-calc-btn macos-calc-number">
                  <span>3</span>
                </button>
                <button onClick={() => performOperation('+')} className="macos-calc-btn macos-calc-operator">
                  <span>+</span>
                </button>

                {/* 第五行 */}
                <button onClick={() => inputNumber('0')} className="macos-calc-btn macos-calc-number macos-calc-zero col-span-2">
                  <span>0</span>
                </button>
                <button onClick={inputDecimal} className="macos-calc-btn macos-calc-number">
                  <span>.</span>
                </button>
                <button onClick={calculateResult} className="macos-calc-btn macos-calc-operator macos-calc-equals">
                  <span>=</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Calculator 