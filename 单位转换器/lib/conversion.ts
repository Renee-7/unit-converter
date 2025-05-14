/**
 * 单位转换函数库
 * 实现各种计量单位之间的转换计算
 */

// 单位类型
export type UnitType = 'temperature' | 'length' | 'weight' | 'volume';

// 单位定义
export interface Unit {
  id: string;
  name: string;
  type: UnitType;
  conversionToBase: (value: number) => number;
  conversionFromBase: (value: number) => number;
}

// 温度单位
const temperatureUnits: Unit[] = [
  {
    id: 'celsius',
    name: '摄氏度 (°C)',
    type: 'temperature',
    conversionToBase: (celsius) => celsius,
    conversionFromBase: (celsius) => celsius,
  },
  {
    id: 'fahrenheit',
    name: '华氏度 (°F)',
    type: 'temperature',
    conversionToBase: (fahrenheit) => (fahrenheit - 32) * 5 / 9,
    conversionFromBase: (celsius) => celsius * 9 / 5 + 32,
  },
  {
    id: 'kelvin',
    name: '开尔文 (K)',
    type: 'temperature',
    conversionToBase: (kelvin) => kelvin - 273.15,
    conversionFromBase: (celsius) => celsius + 273.15,
  },
];

// 长度单位
const lengthUnits: Unit[] = [
  {
    id: 'meter',
    name: '米 (m)',
    type: 'length',
    conversionToBase: (meter) => meter,
    conversionFromBase: (meter) => meter,
  },
  {
    id: 'centimeter',
    name: '厘米 (cm)',
    type: 'length',
    conversionToBase: (cm) => cm / 100,
    conversionFromBase: (meter) => meter * 100,
  },
  {
    id: 'kilometer',
    name: '千米 (km)',
    type: 'length',
    conversionToBase: (km) => km * 1000,
    conversionFromBase: (meter) => meter / 1000,
  },
  {
    id: 'inch',
    name: '英寸 (in)',
    type: 'length',
    conversionToBase: (inch) => inch * 0.0254,
    conversionFromBase: (meter) => meter / 0.0254,
  },
  {
    id: 'foot',
    name: '英尺 (ft)',
    type: 'length',
    conversionToBase: (foot) => foot * 0.3048,
    conversionFromBase: (meter) => meter / 0.3048,
  },
  {
    id: 'yard',
    name: '码 (yd)',
    type: 'length',
    conversionToBase: (yard) => yard * 0.9144,
    conversionFromBase: (meter) => meter / 0.9144,
  },
  {
    id: 'mile',
    name: '英里 (mi)',
    type: 'length',
    conversionToBase: (mile) => mile * 1609.344,
    conversionFromBase: (meter) => meter / 1609.344,
  },
];

// 重量单位
const weightUnits: Unit[] = [
  {
    id: 'kilogram',
    name: '千克 (kg)',
    type: 'weight',
    conversionToBase: (kg) => kg,
    conversionFromBase: (kg) => kg,
  },
  {
    id: 'gram',
    name: '克 (g)',
    type: 'weight',
    conversionToBase: (g) => g / 1000,
    conversionFromBase: (kg) => kg * 1000,
  },
  {
    id: 'pound',
    name: '磅 (lb)',
    type: 'weight',
    conversionToBase: (lb) => lb * 0.45359237,
    conversionFromBase: (kg) => kg / 0.45359237,
  },
  {
    id: 'ounce',
    name: '盎司 (oz)',
    type: 'weight',
    conversionToBase: (oz) => oz * 0.02834952,
    conversionFromBase: (kg) => kg / 0.02834952,
  },
  {
    id: 'ton',
    name: '吨 (t)',
    type: 'weight',
    conversionToBase: (t) => t * 1000,
    conversionFromBase: (kg) => kg / 1000,
  },
];

// 容量单位
const volumeUnits: Unit[] = [
  {
    id: 'liter',
    name: '升 (L)',
    type: 'volume',
    conversionToBase: (l) => l,
    conversionFromBase: (l) => l,
  },
  {
    id: 'milliliter',
    name: '毫升 (mL)',
    type: 'volume',
    conversionToBase: (ml) => ml / 1000,
    conversionFromBase: (l) => l * 1000,
  },
  {
    id: 'gallon',
    name: '加仑 (gal)',
    type: 'volume',
    conversionToBase: (gal) => gal * 3.78541,
    conversionFromBase: (l) => l / 3.78541,
  },
  {
    id: 'pint',
    name: '品脱 (pt)',
    type: 'volume',
    conversionToBase: (pt) => pt * 0.473176,
    conversionFromBase: (l) => l / 0.473176,
  },
  {
    id: 'cubic_cm',
    name: '立方厘米 (cm³)',
    type: 'volume',
    conversionToBase: (cm3) => cm3 / 1000,
    conversionFromBase: (l) => l * 1000,
  },
];

// 所有单位合并
export const allUnits = [
  ...temperatureUnits,
  ...lengthUnits,
  ...weightUnits,
  ...volumeUnits,
];

// 单位类型标签映射
export const unitTypeLabels: Record<UnitType, string> = {
  temperature: '温度',
  length: '长度',
  weight: '重量',
  volume: '容量',
};

// 按类型获取单位
export const getUnitsByType = (type: UnitType): Unit[] => {
  return allUnits.filter(unit => unit.type === type);
};

// 获取单位类型列表
export const getUnitTypes = (): UnitType[] => {
  return ['temperature', 'length', 'weight', 'volume'];
};

// 转换函数
export const convert = (value: number, fromUnit: Unit, toUnit: Unit): number => {
  if (fromUnit.type !== toUnit.type) {
    throw new Error(`无法在不同类型的单位之间转换: ${fromUnit.type} 到 ${toUnit.type}`);
  }
  
  // 先转换到基础单位，再转换到目标单位
  const baseValue = fromUnit.conversionToBase(value);
  return toUnit.conversionFromBase(baseValue);
};

// 格式化输出
export const formatValue = (value: number): string => {
  // 处理非常小或非常大的数字
  if (Math.abs(value) < 0.000001 && value !== 0) {
    return value.toExponential(6);
  }
  
  // 处理一般数字，保留合适的小数位
  const decimalPlaces = value % 1 === 0 ? 0 : Math.min(10, Math.max(2, 6 - Math.floor(Math.log10(Math.abs(value)))));
  return value.toFixed(decimalPlaces);
}; 