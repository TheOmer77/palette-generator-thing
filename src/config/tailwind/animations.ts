import plugin from 'tailwindcss/plugin';

export const animations = plugin(
  ({ matchUtilities, theme }) => {
    matchUtilities(
      { duration: value => ({ '--animation-duration': value }) },
      { values: theme('transitionDuration') }
    );
    matchUtilities(
      { duration: value => ({ '--animation-timing-function': value }) },
      { values: theme('transitionTimingFunction') }
    );
  },
  {
    theme: {
      extend: {
        animation: ({ theme }) => {
          const duration = `var(
    --animation-duration,
    ${theme('transitionDuration.DEFAULT')}
  )`,
            timingFunction = `var(
    --animation-timing-function,
    ${theme('transitionTimingFunction.DEFAULT')}
  )`;
          return {
            'collapse-in': `collapse-in ${duration} ${timingFunction}`,
            'collapse-out': `collapse-out ${duration} ${timingFunction}`,
            'fade-in': `fade-in ${duration} ${timingFunction}`,
            'fade-out': `fade-out ${duration} ${timingFunction}`,
            'scale-x-in': `scale-x-in ${duration} ${timingFunction}`,
            'scale-x-out': `scale-x-out ${duration} ${timingFunction}`,
            'scale-y-in': `scale-y-in ${duration} ${timingFunction}`,
            'scale-y-out': `scale-y-out ${duration} ${timingFunction}`,
            'slide-in': `slide-in ${duration} ${timingFunction}`,
            'slide-out': `slide-out ${duration} ${timingFunction}`,
            'tooltip-in': `tooltip-in 150ms ${timingFunction}`,
            'tooltip-out': `fade-out 150ms ${timingFunction}`,
            'zoom-in': `zoom-in ${duration} ${timingFunction}`,
            'zoom-out': `zoom-out ${duration} ${timingFunction}`,
          };
        },
        keyframes: {
          'collapse-in': {
            from: { height: '0', overflow: 'hidden' },
            to: {
              height: 'var(--radix-collapsible-content-height)',
              overflow: 'hidden',
            },
          },
          'collapse-out': {
            from: {
              height: 'var(--radix-collapsible-content-height)',
              overflow: 'hidden',
            },
            to: { height: '0', overflow: 'hidden' },
          },
          'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
          'fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
          'scale-x-in': {
            from: { opacity: '0', transform: 'scaleX(0.95)' },
            to: { opacity: '1', transform: 'scaleX(1)' },
          },
          'scale-x-out': {
            from: { opacity: '1', transform: 'scaleX(1)' },
            to: { opacity: '0', transform: 'scaleX(0.95)' },
          },
          'scale-y-in': {
            from: { opacity: '0', transform: 'scaleY(0.95)' },
            to: { opacity: '1', transform: 'scaleY(1)' },
          },
          'scale-y-out': {
            from: { opacity: '1', transform: 'scaleY(1)' },
            to: { opacity: '0', transform: 'scaleY(0.95)' },
          },
          'slide-in': {
            from: {
              transform: `translate(
                  var(--slide-translate-origin-x, 0%),
                  var(--slide-translate-origin-y, 0%)
                )`,
            },
            to: { transform: 'translate(0%, 0%)' },
          },
          'slide-out': {
            from: { transform: 'translate(0%, 0%)' },
            to: {
              transform: `translate(
    var(--slide-translate-origin-x, 0%),
    var(--slide-translate-origin-y, 0%)
  )`,
            },
          },
          'tooltip-in': {
            from: {
              opacity: '0',
              transform: `translate(
    var(--slide-translate-origin-x, 0%),
    var(--slide-translate-origin-y, 0%)
  )`,
            },
            to: { opacity: '1', transform: 'translate(0%, 0%)' },
          },
          'zoom-in': {
            from: {
              opacity: '0',
              transform: `translate(
    var(--zoom-translate-x, 0%),
    var(--zoom-translate-y, 0%)
  ) scale(0.95)`,
            },
            to: {
              opacity: '1',
              transform: `translate(
    var(--zoom-translate-x, 0%),
    var(--zoom-translate-y, 0%)
  ) scale(1)`,
            },
          },
          'zoom-out': {
            from: {
              opacity: '1',
              transform: `translate(
    var(--zoom-translate-x, 0%),
    var(--zoom-translate-y, 0%)
  ) scale(1)`,
            },
            to: {
              opacity: '0',
              transform: `translate(
    var(--zoom-translate-x, 0%),
    var(--zoom-translate-y, 0%)
  ) scale(0.95)`,
            },
          },
        },
      },
    },
  }
);
