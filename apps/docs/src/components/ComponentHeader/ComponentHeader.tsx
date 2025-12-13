import {
  Button,
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
  ItemEnd,
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
    <Item render={<header />} variant="plain" size="lg" className="p-0">
      <ItemContent>
        <ItemTitle level="h1" component="h1">
          {title}
        </ItemTitle>
        <ItemDescription level="body-md">{description}</ItemDescription>
      </ItemContent>
      {baseUiUrl && (
        <ItemEnd>
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
        </ItemEnd>
      )}
    </Item>
  );
}
