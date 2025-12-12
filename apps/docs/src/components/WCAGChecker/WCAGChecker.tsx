import { Typography, Card } from '@base-joy/ui-styled';
import type { Theme } from '@base-joy/tokens';
import { getWCAGWarnings } from '../../utils/colorScaleGenerator';

interface WCAGCheckerProps {
  theme: Theme;
}

export function WCAGChecker({ theme }: WCAGCheckerProps) {
  const warnings = getWCAGWarnings(theme);

  if (warnings.length === 0) {
    return (
      <Card variant="soft" color="success" className="p-4">
        <div className="flex items-start gap-3">
          <div className="text-success-700 mt-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div>
            <Typography level="body-sm" weight="semibold">
              WCAG Compliant
            </Typography>
            <Typography level="body-xs" className="mt-1">
              All color combinations meet WCAG AA standards for contrast.
            </Typography>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {warnings.map((warning, i) => (
        <Card key={i} variant="soft" color="warning" className="p-4">
          <div className="flex items-start gap-3">
            <div className="text-warning-700 mt-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <Typography level="body-sm" weight="semibold">
                {warning.scale} ({warning.variant})
              </Typography>
              <Typography level="body-xs" className="mt-1">
                {warning.issue}
              </Typography>
              <Typography level="body-xs" className="mt-1 text-neutral-600">
                💡 {warning.recommendation}
              </Typography>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
