'use client'

import { useState, useEffect } from 'react';
import { 
  UnitType, 
  Unit, 
  getUnitTypes, 
  getUnitsByType, 
  unitTypeLabels, 
  convert, 
  formatValue 
} from '@/lib/conversion';
import UnitSelector from './UnitSelector';
import ArrowIcon from './icons/ArrowIcon';
import SwapIcon from './icons/SwapIcon';

/**
 * 单位转换器主组件
 * 实现多种单位类型的转换功能
 */
export default function UnitConverter() {
  // 状态管理
  const [unitType, setUnitType] = useState<UnitType>('temperature');
  const [fromValue, setFromValue] = useState<string>('0');
  const [toValue, setToValue] = useState<string>('0');
  const [fromUnit, setFromUnit] = useState<Unit | null>(null);
  const [toUnit, setToUnit] = useState<Unit | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);

  // 初始化单位
  useEffect(() => {
    const availableUnits = getUnitsByType(unitType);
    setUnits(availableUnits);
    
    if (availableUnits.length > 0) {
      setFromUnit(availableUnits[0]);
      setToUnit(availableUnits.length > 1 ? availableUnits[1] : availableUnits[0]);
    }
    
    // 重置值
    setFromValue('0');
    setToValue('0');
  }, [unitType]);

  // 执行转换
  useEffect(() => {
    if (!fromUnit || !toUnit) return;
    
    try {
      const numericValue = parseFloat(fromValue);
      
      if (!isNaN(numericValue)) {
        const result = convert(numericValue, fromUnit, toUnit);
        setToValue(formatValue(result));
      } else {
        setToValue('');
      }
    } catch (error) {
      console.error('转换错误:', error);
      setToValue('错误');
    }
  }, [fromValue, fromUnit, toUnit]);

  // 交换单位
  const handleSwapUnits = () => {
    if (!fromUnit || !toUnit) return;
    
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    
    const tempValue = fromValue;
    setFromValue(toValue);
    setToValue(tempValue);
  };

  // 处理输入变化
  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-apple p-6 md:p-8">
      {/* 单位类型选择器 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          单位类型
        </label>
        <select
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-apple-blue transition-colors"
          value={unitType}
          onChange={(e) => setUnitType(e.target.value as UnitType)}
        >
          {getUnitTypes().map((type) => (
            <option key={type} value={type}>
              {unitTypeLabels[type]}
            </option>
          ))}
        </select>
      </div>

      {/* 转换区域 */}
      <div className="space-y-4">
        {/* 输入值 */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            输入值
          </label>
          <input
            type="text"
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-apple-blue transition-colors"
            value={fromValue}
            onChange={handleFromValueChange}
            placeholder="输入数值"
          />
        </div>

        {/* 单位选择器 */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* 从单位 */}
          {fromUnit && (
            <div className="w-full">
              <UnitSelector
                label="从"
                units={units}
                selectedUnit={fromUnit}
                onChange={setFromUnit}
              />
            </div>
          )}

          {/* 交换按钮 */}
          <div className="flex items-center justify-center my-2 md:my-0">
            <div className="hidden md:block">
              <ArrowIcon className="text-gray-500 mx-1" />
            </div>
            <SwapIcon 
              className="text-apple-blue mx-2" 
              onClick={handleSwapUnits} 
            />
            <div className="block md:hidden">
              <ArrowIcon className="transform rotate-90 text-gray-500 mx-1" />
            </div>
          </div>

          {/* 到单位 */}
          {toUnit && (
            <div className="w-full">
              <UnitSelector
                label="到"
                units={units}
                selectedUnit={toUnit}
                onChange={setToUnit}
              />
            </div>
          )}
        </div>

        {/* 结果显示 */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-1">转换结果</h3>
            <div className="flex items-center justify-center">
              <div className="text-3xl font-bold bg-apple-gray px-4 py-2 rounded-lg">
                {toValue}
              </div>
              <div className="ml-2 text-lg text-gray-600">
                {toUnit?.name}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {fromValue} {fromUnit?.name} = {toValue} {toUnit?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 