/**
 * 交换图标组件
 * 用于单位转换界面中表示交换两个单位
 */

interface SwapIconProps {
  className?: string;
  onClick?: () => void;
}

export default function SwapIcon({ className = '', onClick }: SwapIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`w-6 h-6 cursor-pointer transform transition-transform hover:scale-110 ${className}`}
      onClick={onClick}
    >
      <path d="M7 16V4m0 0L3 8m4-4l4 4" />
      <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  );
} 