'use client';

import dynamic from 'next/dynamic';
import { Component, type ReactNode } from 'react';

const ToothScene = dynamic(() => import('./ToothScene'), { ssr: false });

// No WebGL (old device, blocked GPU): the hero simply renders without the 3D tooth.
class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function HeroTooth({ className }: { className?: string }) {
  return (
    <WebGLBoundary>
      <ToothScene className={className} />
    </WebGLBoundary>
  );
}
