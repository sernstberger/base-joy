import { variants, colors, sizes, type ColorScale } from '@base-joy/tokens';
import { Toggle, ToggleGroup, Typography } from '@base-joy/ui-styled';

export interface PlaygroundControl {
  name: string;
  type: 'variant' | 'color' | 'size';
  defaultValue: string;
}

interface ControlPanelProps {
  controls: PlaygroundControl[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
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
              <div className="flex gap-2">
                {(Object.keys(colors) as ColorScale[]).map((color) => (
                  <button
                    key={color}
                    onClick={() => onChange(control.name, color)}
                    title={color}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      values[control.name] === color
                        ? 'scale-125 border-neutral-900 ring-2 ring-offset-1 ring-neutral-400'
                        : 'border-transparent hover:scale-110'
                    }`}
                    style={{ backgroundColor: colors[color][500] }}
                  >
                    {values[control.name] === color && (
                      <span className="flex items-center justify-center text-white text-xs">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <Typography level="body-xs" className="capitalize">
                {values[control.name]}
              </Typography>
            </div>
          )}

          {control.type === 'size' && (
            <ToggleGroup.Root
              value={[values[control.name]]}
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
        </div>
      ))}
    </div>
  );
}
