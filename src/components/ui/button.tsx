import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const variantStyles: Record<string, string> = {
  default: "bg-gradient-to-r from-[#418AC1] to-[#506DFD] text-white hover:brightness-105 shadow-xs hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.96]",
  destructive: "bg-red-600 text-white hover:bg-red-700 shadow-xs active:scale-[0.96]",
  outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-2xs active:scale-[0.96]",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 active:scale-[0.96]",
  ghost: "hover:bg-slate-100 text-slate-700 active:scale-[0.96]",
  link: "text-[#0055FF] underline-offset-4 hover:underline"
};

const sizeStyles: Record<string, string> = {
  default: "h-10 px-4 py-2 text-sm font-normal rounded-xl",
  sm: "h-9 rounded-lg px-3.5 text-xs font-normal",
  lg: "h-11 rounded-2xl px-6 text-base font-normal",
  icon: "h-10 w-10 rounded-xl"
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const combinedClasses = cn(
      "inline-flex items-center justify-center whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
      variantStyles[variant] || variantStyles.default,
      sizeStyles[size] || sizeStyles.default,
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn(combinedClasses, (children.props as any).className),
        ...props
      });
    }

    return (
      <button className={combinedClasses} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
