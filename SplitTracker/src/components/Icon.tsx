/**
 * Central icon wrapper using lucide-react-native.
 * Use this everywhere instead of emojis or Paper icon strings.
 *
 * Usage:
 *   <Icon name="Home" size={24} color={Colors.textPrimary} />
 */
import React from 'react';
import * as LucideIcons from 'lucide-react-native';
import { Colors } from '../theme';

type LucideIconName = keyof typeof LucideIcons;

interface IconProps {
  name: LucideIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export default function Icon({
  name,
  size = 24,
  color = Colors.textPrimary,
  strokeWidth = 1.75,
}: IconProps) {
  const LucideIcon = LucideIcons[name] as React.ComponentType<{
    size: number;
    color: string;
    strokeWidth: number;
  }>;

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react-native`);
    return null;
  }

  return <LucideIcon size={size} color={color} strokeWidth={strokeWidth} />;
}
