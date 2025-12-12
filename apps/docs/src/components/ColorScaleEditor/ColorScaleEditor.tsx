import { useState } from 'react';
import { Typography, Input, Button } from '@base-joy/ui-styled';
import type { ColorScaleShades } from '@base-joy/tokens';

interface ColorScaleEditorProps {
  label: string;
  scale: ColorScaleShades;
  baseColor: string;
  onChange: (baseColor: string) => void;
}

export function ColorScaleEditor({ label, scale, baseColor, onChange }: ColorScaleEditorProps) {
  const [localColor, setLocalColor] = useState(baseColor);

  return (
    <div className="space-y-3 pb-4 border-b border-neutral-200 last:border-b-0">
      <Typography level="h4">{label}</Typography>

      <div className="flex gap-3 items-end">
        <div>
          <Typography level="body-sm" className="mb-2">
            Base Color (500)
          </Typography>
          <div className="flex gap-2">
            <input
              type="color"
              value={localColor}
              onChange={(e) => setLocalColor(e.target.value)}
              className="w-16 h-10 rounded border border-neutral-300 cursor-pointer"
            />
            <Input
              value={localColor}
              onChange={(e) => setLocalColor(e.target.value)}
              placeholder="#3b82f6"
              className="w-32"
            />
          </div>
        </div>

        <Button onClick={() => onChange(localColor)} size="sm">
          Apply
        </Button>
      </div>

      <div className="flex gap-1 mt-2">
        {Object.entries(scale).map(([shade, hex]) => (
          <div
            key={shade}
            className="flex-1 h-8 rounded"
            style={{ backgroundColor: hex }}
            title={`${shade}: ${hex}`}
          />
        ))}
      </div>
    </div>
  );
}
