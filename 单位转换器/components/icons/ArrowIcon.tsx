/**
 * 箭头图标组件
 * 用于单位转换界面中表示转换方向
 */

interface ArrowIconProps {
  className?: string;
}

export default function ArrowIcon({ className = '' }: ArrowIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`w-6 h-6 ${className}`}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
} 