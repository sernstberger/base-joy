import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { ColorContext, useColorContext, type ColorContextValue } from './ColorContext';
import { useResolvedColorProps } from './useResolvedColorProps';
import { getInvertedVariant, VARIANT_INVERSION_MAP } from './variantInversion';

describe('ColorContext', () => {
  describe('useColorContext', () => {
    it('returns null when not inside a provider', () => {
      const { result } = renderHook(() => useColorContext());
      expect(result.current).toBeNull();
    });

    it('returns context value when inside a provider', () => {
      const contextValue: ColorContextValue = {
        color: 'primary',
        isInsideSolid: true,
        parentVariant: 'solid',
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ColorContext.Provider value={contextValue}>{children}</ColorContext.Provider>
      );

      const { result } = renderHook(() => useColorContext(), { wrapper });
      expect(result.current).toEqual(contextValue);
    });
  });

  describe('useResolvedColorProps', () => {
    it('returns defaults when no context and no explicit props', () => {
      const { result } = renderHook(() =>
        useResolvedColorProps(undefined, undefined, 'primary', 'solid')
      );
      expect(result.current).toEqual({
        color: 'primary',
        variant: 'solid',
        isInsideSolid: false,
      });
    });

    it('uses explicit color over context and default', () => {
      const contextValue: ColorContextValue = {
        color: 'danger',
        isInsideSolid: false,
        parentVariant: 'soft',
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ColorContext.Provider value={contextValue}>{children}</ColorContext.Provider>
      );

      const { result } = renderHook(
        () => useResolvedColorProps('success', undefined, 'primary', 'solid'),
        { wrapper }
      );
      expect(result.current.color).toBe('success');
    });

    it('inherits color from context when not explicitly set', () => {
      const contextValue: ColorContextValue = {
        color: 'danger',
        isInsideSolid: false,
        parentVariant: 'soft',
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ColorContext.Provider value={contextValue}>{children}</ColorContext.Provider>
      );

      const { result } = renderHook(
        () => useResolvedColorProps(undefined, undefined, 'primary', 'solid'),
        { wrapper }
      );
      expect(result.current.color).toBe('danger');
    });

    it('uses explicit variant over inversion', () => {
      const contextValue: ColorContextValue = {
        color: 'primary',
        isInsideSolid: true,
        parentVariant: 'solid',
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ColorContext.Provider value={contextValue}>{children}</ColorContext.Provider>
      );

      const { result } = renderHook(
        () => useResolvedColorProps(undefined, 'soft', 'primary', 'solid'),
        { wrapper }
      );
      // Explicit soft should be used, not inverted
      expect(result.current.variant).toBe('soft');
    });

    it('inverts solid to plain when inside solid container', () => {
      const contextValue: ColorContextValue = {
        color: 'primary',
        isInsideSolid: true,
        parentVariant: 'solid',
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ColorContext.Provider value={contextValue}>{children}</ColorContext.Provider>
      );

      const { result } = renderHook(
        () => useResolvedColorProps(undefined, undefined, 'primary', 'solid'),
        { wrapper }
      );
      expect(result.current.variant).toBe('plain');
    });

    it('inverts soft to plain when inside solid container', () => {
      const contextValue: ColorContextValue = {
        color: 'primary',
        isInsideSolid: true,
        parentVariant: 'solid',
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ColorContext.Provider value={contextValue}>{children}</ColorContext.Provider>
      );

      const { result } = renderHook(
        () => useResolvedColorProps(undefined, undefined, 'primary', 'soft'),
        { wrapper }
      );
      expect(result.current.variant).toBe('plain');
    });

    it('keeps outlined as outlined when inside solid container', () => {
      const contextValue: ColorContextValue = {
        color: 'primary',
        isInsideSolid: true,
        parentVariant: 'solid',
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ColorContext.Provider value={contextValue}>{children}</ColorContext.Provider>
      );

      const { result } = renderHook(
        () => useResolvedColorProps(undefined, undefined, 'primary', 'outlined'),
        { wrapper }
      );
      expect(result.current.variant).toBe('outlined');
    });

    it('does not invert when not inside solid container', () => {
      const contextValue: ColorContextValue = {
        color: 'primary',
        isInsideSolid: false,
        parentVariant: 'soft',
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ColorContext.Provider value={contextValue}>{children}</ColorContext.Provider>
      );

      const { result } = renderHook(
        () => useResolvedColorProps(undefined, undefined, 'primary', 'solid'),
        { wrapper }
      );
      expect(result.current.variant).toBe('solid');
    });

    it('returns isInsideSolid from context', () => {
      const contextValue: ColorContextValue = {
        color: 'primary',
        isInsideSolid: true,
        parentVariant: 'solid',
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ColorContext.Provider value={contextValue}>{children}</ColorContext.Provider>
      );

      const { result } = renderHook(
        () => useResolvedColorProps(undefined, undefined, 'primary', 'solid'),
        { wrapper }
      );
      expect(result.current.isInsideSolid).toBe(true);
    });
  });

  describe('variantInversion', () => {
    it('inverts solid to plain', () => {
      expect(getInvertedVariant('solid')).toBe('plain');
    });

    it('inverts soft to plain', () => {
      expect(getInvertedVariant('soft')).toBe('plain');
    });

    it('keeps outlined as outlined', () => {
      expect(getInvertedVariant('outlined')).toBe('outlined');
    });

    it('keeps plain as plain', () => {
      expect(getInvertedVariant('plain')).toBe('plain');
    });

    it('has correct inversion map', () => {
      expect(VARIANT_INVERSION_MAP).toEqual({
        solid: 'plain',
        soft: 'plain',
        outlined: 'outlined',
        plain: 'plain',
      });
    });
  });
});
