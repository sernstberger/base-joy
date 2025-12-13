import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  Typography,
} from '@base-joy/ui-styled';
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
    <Item
      render={<header />}
      variant="plain"
      color="neutral"
      size="lg"
      className="mb-8 flex-col items-start p-0"
    >
      <ItemContent truncate={false}>
        <ItemHeader className="mb-2">
          <Typography level="h1">{title}</Typography>
          {baseUiUrl && (
            <ItemActions>
              <Button
                render={
                  <Link
                    to={baseUiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                variant="outlined"
                color="neutral"
                size="sm"
                endDecorator={<ArrowUpRight size={16} />}
              >
                Base UI
              </Button>
            </ItemActions>
          )}
        </ItemHeader>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
    </Item>
  );
}
