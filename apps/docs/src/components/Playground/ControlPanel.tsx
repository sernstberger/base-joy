import { variants, colors, sizes, type ColorScale } from '@base-joy/tokens';
import { Toggle, ToggleGroup, Typography, Switch } from '@base-joy/ui-styled';
import { cn } from '@base-joy/utils';

export interface PlaygroundControl {
  name: string;
  type: 'variant' | 'color' | 'size' | 'boolean';
  defaultValue: string | boolean;
}

interface ControlPanelProps {
  controls: PlaygroundControl[];
  values: Record<string, string | boolean>;
  onChange: (name: string, value: string | boolean) => void;
}

export function ControlPanel({ controls, values, onChange }: ControlPanelProps) {
  return (
    <div className="space-y-4">
      <Typography level="h5">Playground</Typography>

      {controls.map((control) => (
        <div key={control.name}>
          <Typography level="body-sm" weight="medium" className="mb-2 capitalize">
            {control.name}
          </Typography>

          {control.type === 'variant' && (
            <ToggleGroup.Root
              value={[values[control.name]]}
              onValueChange={(newValue) => {
                if (newValue.length > 0) {
                  onChange(control.name, newValue[0]);
                }
              }}
              size="sm"
            >
              {variants.map((variant) => (
                <Toggle key={variant} value={variant}>
                  {variant}
                </Toggle>
              ))}
            </ToggleGroup.Root>
          )}

          {control.type === 'color' && (
            <div className="flex flex-col gap-2">
              <ToggleGroup.Root
                value={[values[control.name]]}
                onValueChange={(newValue) => {
                  if (newValue.length > 0) {
                    onChange(control.name, newValue[0]);
                  }
                }}
                className="flex flex-wrap gap-2"
              >
                {(Object.keys(colors) as ColorScale[]).map((color) => (
                  <Toggle
                    key={color}
                    value={color}
                    title={color}
                    className={cn(
                      'w-6 h-6 p-0 rounded-full border-2 transition-all',
                      'border-transparent hover:scale-110',
                      'data-pressed:scale-125 data-pressed:border-neutral-900',
                      'data-pressed:ring-2 data-pressed:ring-offset-1 data-pressed:ring-neutral-400'
                    )}
                    style={{ backgroundColor: colors[color][500] }}
                  >
                    <span className="hidden data-pressed:flex items-center justify-center text-white text-xs">
                      ✓
                    </span>
                  </Toggle>
                ))}
              </ToggleGroup.Root>
              <Typography level="body-xs" className="capitalize">
                {values[control.name]}
              </Typography>
            </div>
          )}

          {control.type === 'size' && (
            <ToggleGroup.Root
              value={[values[control.name] as string]}
              onValueChange={(newValue) => {
                if (newValue.length > 0) {
                  onChange(control.name, newValue[0]);
                }
              }}
              size="sm"
            >
              {sizes.map((size) => (
                <Toggle key={size} value={size}>
                  {size}
                </Toggle>
              ))}
            </ToggleGroup.Root>
          )}

          {control.type === 'boolean' && (
            <div className="flex items-center gap-2">
              <Switch.Root
                checked={Boolean(values[control.name])}
                onCheckedChange={(checked) => onChange(control.name, checked)}
                size="sm"
              >
                <Switch.Thumb />
              </Switch.Root>
              <Typography level="body-xs" className="capitalize text-neutral-600">
                {values[control.name] ? 'On' : 'Off'}
              </Typography>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
