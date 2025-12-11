import { variants, colors, sizes, type ColorScale } from '@base-joy/tokens';

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
      <h3 className="text-lg font-semibold text-neutral-900">Playground</h3>

      {controls.map((control) => (
        <div key={control.name}>
          <label className="block text-sm font-medium text-neutral-700 mb-2 capitalize">
            {control.name}
          </label>

          {control.type === 'variant' && (
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => (
                <button
                  key={variant}
                  onClick={() => onChange(control.name, variant)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    values[control.name] === variant
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
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
              <span className="text-xs text-neutral-500 capitalize">
                {values[control.name]}
              </span>
            </div>
          )}

          {control.type === 'size' && (
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onChange(control.name, size)}
                  className={`px-3 py-1 text-sm rounded border transition-colors ${
                    values[control.name] === size
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
