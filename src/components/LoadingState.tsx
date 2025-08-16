import React from 'react';
import StateView from './StateView';

const LoadingState: React.FC = () => (
  <StateView>
    {/* Inject a fallback keyframe in case Tailwind's animate-spin isn't generated */}
    <style>{`
      @keyframes twFallbackSpin { to { transform: rotate(360deg); } }
      .spinner-fallback { animation: twFallbackSpin 0.9s linear infinite; }
    `}</style>

    {/* Spinner: uses Tailwind animate-spin AND a fallback explicit animation */}
    <div
      className="mb-4 inline-block h-12 w-12 rounded-full border-4 border-slate-300 border-t-[#003366] animate-spin spinner-fallback"
      role="status"
      aria-label="Loading"
    />

    <p className="text-primary" aria-live="polite">
      Analyzing document...
    </p>

    {/* SVG (always rendered) with SMIL rotation as an additional fallback */}
    <svg
      className="sr-only"
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <symbol id="spinnerArc" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="6"
            opacity="0.3"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#003366"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="31.4 125.6"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </symbol>
      </defs>
    </svg>
  </StateView>
);

export default LoadingState;