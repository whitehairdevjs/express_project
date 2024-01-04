/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from 'react';
import { FlexTheme, MarignTheme, PaddingTheme, TypographyTheme } from '@/_ui_libs/_theme';

// --------------------------------------------
// -------------- Type Interface --------------
// --------------------------------------------
interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  size?: number | string;
  color?: string;
  txtAlign?: 'start' | 'end' | 'center';
  weight?: 'lighter' | 'normal' | 'medium' | 'bold';
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
  padding?: {
    all?: number;
    horizontal?: number;
    vertical?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  margin?: {
    all?: number;
    horizontal?: number;
    vertical?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

// -------------------------------------
// -------------- TxtSpan --------------
// -------------------------------------
export const TxtSpan = forwardRef(function TxtSpan(
  {
    children,
    size = 13,
    txtAlign,
    weight = 'normal',
    color = '#9a9a9a',
    whiteSpace = 'nowrap',
    padding = { all: 0 },
    margin = { all: 0 },
    ...props
  }: Props,
  ref?: ForwardedRef<HTMLSpanElement>,
) {
  return (
    <span
      ref={ref}
      css={[
        TypographyTheme({ size, weight, color, whiteSpace }),
        PaddingTheme({ padding }),
        MarignTheme({ margin }),
        FlexTheme({ align: 'center', direction: 'horizontal', gap: 4 }),
      ]}
      {...props}
    >
      {children}
    </span>
  );
});
