import { Button, Typography } from '@base-joy/ui-components';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

interface ComponentHeaderProps {
  title: string;
  description: string;
  baseUiUrl?: string;
}

export function ComponentHeader({
  title,
  description,
  baseUiUrl,
}: ComponentHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <Typography level="h1">{title}</Typography>
        {baseUiUrl && (
          <Button
            render={
              <Link to={baseUiUrl} target="_blank" rel="noopener noreferrer" />
            }
            variant="outlined"
            color="neutral"
            size="sm"
            endDecorator={<ArrowUpRight size={16} />}
          >
            Base UI
          </Button>
        )}
      </div>
      <Typography level="body-lg">{description}</Typography>
    </header>
  );
}
