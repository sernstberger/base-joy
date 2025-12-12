import * as React from 'react';
import { Sheet } from '@base-joy/ui-components';
import { ControlPanel, type PlaygroundControl } from './ControlPanel';
import { CodeBlock } from './CodeBlock';

interface PlaygroundProps {
  children: (props: Record<string, string>) => React.ReactNode;
  controls: PlaygroundControl[];
  codeTemplate: (props: Record<string, string>) => string;
}

export function Playground({ children, controls, codeTemplate }: PlaygroundProps) {
  const [props, setProps] = React.useState<Record<string, string>>(() =>
    controls.reduce(
      (acc, control) => {
        acc[control.name] = control.defaultValue;
        return acc;
      },
      {} as Record<string, string>
    )
  );

  const updateProp = (name: string, value: string) => {
    setProps((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
      {/* Main content area */}
      <div className="flex flex-col lg:flex-row">
        {/* Preview area - left side */}
        <div className="flex-1 p-8 flex items-center justify-center min-h-50 border-b lg:border-b-0 lg:border-r border-neutral-200 bg-white">
          {children(props)}
        </div>

        {/* Controls panel - right side */}
        <div className="w-full lg:w-72 p-4 bg-neutral-50">
          <ControlPanel controls={controls} values={props} onChange={updateProp} />
        </div>
      </div>

      {/* Code block - bottom */}
      <div className="border-t border-neutral-200">
        <CodeBlock code={codeTemplate(props)} />
      </div>
    </Sheet>
  );
}
