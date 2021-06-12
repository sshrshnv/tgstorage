const isAnimationSupported = !!self.document.body.animate

export const animationClassName =
  isAnimationSupported ? '_animation' : '_animationFallback'
