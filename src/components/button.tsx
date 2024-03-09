import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { VariantProps, cva } from 'class-variance-authority';

import clsxm from '@/utils/clsxm';
import ModelContext from '@/hooks/model-context';

export const variants = cva(
  'inline-flex items-center justify-center text-center text-base rounded-lg transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-black hover:bg-primary/80',
        white: 'bg-white text-black hover:bg-neutral-200',
        yellow: 'bg-[#f3ba2c] text-black hover:bg-neutral-200',
        disabled: 'bg-gray-500 text-white pointer-events-none',
      },
      size: {
        md: 'h-11 px-6',
      },
      fluid: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fluid: false,
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants> & {};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, fluid, size, ...props }, ref) => {
    return (
      <button
        className={clsxm(variants({ variant, fluid, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Button;

type ButtonLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof variants> & {
    model?: any; // Add model prop here
  };

export const LinkButton = ({
  className,
  variant,
  fluid,
  size,
  href,
  model,
  ...props
}: ButtonLinkProps) => {
  const { setModel } = React.useContext<any>(ModelContext);
  const handleOnClick = () => {
    setModel(model)
  }
  return (
    <Link href={href} as={'/app'} className={clsxm(variants({ variant, fluid, size, className }))} {...props} onClick={handleOnClick}/>
  );
};

/**
 * import Button, { LinkButton } from '@/components/button';
 * şeklinde import edilir
 */
