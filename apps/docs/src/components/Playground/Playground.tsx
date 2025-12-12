import * as React from 'react';
import { Sheet } from '@base-joy/ui-styled';
import { ControlPanel, type PlaygroundControl } from './ControlPanel';
import { CodeBlock } from './CodeBlock';

interface PlaygroundProps {
  children: (props: Record<string, string>) => React.ReactNode;
  controls: PlaygroundControl[];
  codeTemplate: (props: Record<string, string>) => string;
}

export function Playground({ children, controls, codeTemplate }: PlaygroundProps) {
  const [props, setProps] = React.useState<Record<string, string | boolean>>(() =>
    controls.reduce(
      (acc, control) => {
        acc[control.name] = control.defaultValue;
        return acc;
      },
      {} as Record<string, string | boolean>
    )
  );

  const updateProp = (name: string, value: string | boolean) => {
    setProps((prev) => ({ ...prev, [name]: value }));
  };

  // Convert boolean values to strings for children and codeTemplate
  const stringProps = Object.entries(props).reduce(
    (acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    },
    {} as Record<string, string>
  );

  return (
    <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
      {/* Main content area */}
      <div className="flex flex-col lg:flex-row">
        {/* Preview area - left side */}
        <div className="flex-1 p-8 flex items-center justify-center min-h-50 border-b lg:border-b-0 lg:border-r border-neutral-200 bg-white">
          {children(stringProps)}
        </div>

        {/* Controls panel - right side */}
        <div className="w-full lg:w-72 p-4 bg-neutral-50">
          <ControlPanel controls={controls} values={props} onChange={updateProp} />
        </div>
      </div>

      {/* Code block - bottom */}
      <div className="border-t border-neutral-200">
        <CodeBlock code={codeTemplate(stringProps)} />
      </div>
    </Sheet>
  );
}
