/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import {
  MarignTheme,
  PaddingTheme,
  FlexTheme,
  ViewportTheme,
  TypographyTheme,
  TabTheme,
} from '@/_ui_libs/_theme';
import { MQ, colors } from '@/libs/themes/_index';
import { Wrap } from '../_index';

// --------------------------------------------
// -------------- Type Interface --------------
// --------------------------------------------
interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  children: ReactNode;
  bottomFixed?: boolean;
  width?: 'auto' | '100%';
  minWidth?: number | string;
  maxWidth?: number | string;
  txtSize?: number | string;
  weight?: 'lighter' | 'normal' | 'medium' | 'bold';
  colors?: { button?: string; txt?: string };
  borderRadius?: number | string;
  boxShadow?: {
    x?: number;
    y?: number;
    blur?: number;
    color?: string;
  };
  border?: {
    solid: number;
    color?: string;
  };
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
type ThemeStyleProps = Omit<Props, 'children'>;

// ------------------------------------
// -------------- Button --------------
// ------------------------------------
const color = colors;
export const Button = forwardRef(function Button(
  {
    children,
    bottomFixed,
    width = '100%',
    maxWidth,
    minWidth,
    txtSize = 15,
    weight = 'normal',
    colors = { button: color.keyColor, txt: '#f0f0f0' },
    borderRadius = 18,
    border,
    boxShadow,
    padding,
    margin,
    ...props
  }: Props,
  ref?: ForwardedRef<HTMLButtonElement>,
) {
  if (bottomFixed) {
    return (
      <Wrap height="100%" minHeight={76} maxHeight={76}>
        <Wrap
          align="center"
          position={{ type: 'fixed', bottom: 0, left: 0, right: 0 }}
          backgroundColor="#fff"
          css={[
            PaddingTheme({ safeArea: true, padding: { bottom: 20, horizontal: 20 } }),
            { [MQ[2]]: { paddingBottom: `max(10px, env(safe-area-inset-bottom))` } },
          ]}
        >
          <button
            ref={ref}
            css={[
              ViewportTheme({ width, maxWidth, minWidth, minHeight: 56 }),
              FlexTheme({ align: 'center', crossAlign: 'center' }),
              PaddingTheme({ padding }),
              MarignTheme({ margin }),
              TypographyTheme({
                size: txtSize,
                color: colors.txt,
                weight,
                lineHeight: '26px',
              }),
              TabTheme({
                backgroundColor: colors?.button,
                border,
                borderRadius,
                boxShadow,
                opacityHover: 0.9,
                opacityDisabled: 0.25,
              }),
            ]}
            {...props}
          >
            {children}
          </button>
        </Wrap>
      </Wrap>
    );
  } else {
    return (
      <button
        ref={ref}
        css={[
          ViewportTheme({ width, maxWidth, minWidth, minHeight: 56 }),
          FlexTheme({ align: 'center', crossAlign: 'center' }),
          PaddingTheme({ padding }),
          MarignTheme({ margin }),
          TypographyTheme({
            size: txtSize,
            color: colors.txt,
            weight,
            lineHeight: '26px',
          }),
          TabTheme({
            backgroundColor: colors?.button,
            border,
            borderRadius,
            boxShadow,
            opacityHover: 0.9,
            opacityDisabled: 0.25,
          }),
        ]}
        {...props}
      >
        {children}
      </button>
    );
  }
});
