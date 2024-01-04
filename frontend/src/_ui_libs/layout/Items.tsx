/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from 'react';
import {
  FlexTheme,
  MarignTheme,
  PaddingTheme,
  ScrollTheme,
  StyleTheme,
  TabTheme,
  ViewportTheme,
} from '@/_ui_libs/_theme';

// --------------------------------------------
// -------------- Type Interface --------------
// --------------------------------------------
interface ItemsProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'center' | 'stretch' | 'end';
  crossAlign?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number;
  crossGap?: number;
  width?: 'auto' | '100%';
  height?: 'auto' | '100%';
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  backgroundColor?: string;
  borderRadius?: number | string;
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
  scroll?: {
    type?: 'visible' | 'auto' | 'scroll' | 'hidden';
    bar?: boolean;
  };
}

interface ItemProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode;
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'center' | 'stretch' | 'end';
  crossAlign?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number;
  crossGap?: number;
  width?: 'auto' | '100%';
  height?: 'auto' | '100%';
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  backgroundColor?: string;
  borderRadius?: number | string;
  boxShadow?: {
    x?: number;
    y?: number;
    blur?: number;
    color?: string;
  };
  border?: {
    solid: number;
    position?: 'left' | 'right' | 'top' | 'bottom';
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
  scroll?: {
    type?: 'visible' | 'auto' | 'scroll' | 'hidden';
    bar?: boolean;
  };
  cursor?: 'default' | 'grab' | 'pointer' | 'zoom';
}

// -----------------------------------
// -------------- Items --------------
// -----------------------------------
export const Items = forwardRef(function Items(
  {
    children,
    direction = 'vertical',
    align,
    crossAlign,
    wrap = 'nowrap',
    gap = 0,
    crossGap = 0,
    width = '100%',
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    padding = { all: 0 },
    margin = { all: 0 },
    backgroundColor,
    borderRadius,
    scroll,
    ...props
  }: ItemsProps,
  ref?: ForwardedRef<HTMLUListElement>,
) {
  return (
    <ul
      ref={ref}
      css={[
        { backgroundColor: backgroundColor, borderRadius: `${borderRadius}px` },
        PaddingTheme({ padding }),
        MarignTheme({ margin }),
        ViewportTheme({ width, height, minWidth, maxWidth, minHeight, maxHeight }),
        FlexTheme({
          direction,
          align: align ? align : direction === 'horizontal' ? 'stretch' : 'center',
          crossAlign,
          wrap,
          gap,
          crossGap,
        }),
        ScrollTheme({ scroll }),
      ]}
      {...props}
    >
      {children}
    </ul>
  );
});

// ----------------------------------
// -------------- Item --------------
// ----------------------------------
export const Item = forwardRef(function Item(
  {
    children,
    direction = 'vertical',
    align,
    crossAlign,
    wrap = 'nowrap',
    gap = 0,
    crossGap = 0,
    width = '100%',
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    padding = { all: 0 },
    margin = { all: 0 },
    border,
    backgroundColor,
    borderRadius,
    boxShadow,
    scroll,
    cursor,
    ...props
  }: ItemProps,
  ref?: ForwardedRef<HTMLLIElement>,
) {
  return (
    <li
      ref={ref}
      css={[
        PaddingTheme({ padding }),
        MarignTheme({ margin }),
        ViewportTheme({ width, height, minWidth, maxWidth, minHeight, maxHeight }),
        FlexTheme({ direction, align, crossAlign, wrap, gap, crossGap }),
        StyleTheme({ backgroundColor, border, borderRadius, boxShadow }),
        ScrollTheme({ scroll }),
        TabTheme({ cursor }),
      ]}
      {...props}
    >
      {children}
    </li>
  );
});
