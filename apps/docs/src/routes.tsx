import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/index';
import { SheetPage } from './pages/components/Sheet';
import { ItemPage } from './pages/components/Item';
import { TablePage } from './pages/components/Table';
import { TypographyPage } from './pages/components/Typography';
import { BadgePage } from './pages/components/Badge';
import { DividerPage } from './pages/components/Divider';
import { AvatarPage } from './pages/components/Avatar';
import { ButtonPage } from './pages/components/Button';
import { LinkPage } from './pages/components/Link';
import { InputPage } from './pages/components/Input';
import { ContainerPage } from './pages/components/Container';
import { StackPage } from './pages/components/Stack';
import { GridPage } from './pages/components/Grid';
import { TextareaPage } from './pages/components/Textarea';
import { CardPage } from './pages/components/Card';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'components/sheet',
        element: <SheetPage />,
      },
      {
        path: 'components/item',
        element: <ItemPage />,
      },
      {
        path: 'components/table',
        element: <TablePage />,
      },
      {
        path: 'components/typography',
        element: <TypographyPage />,
      },
      {
        path: 'components/badge',
        element: <BadgePage />,
      },
      {
        path: 'components/divider',
        element: <DividerPage />,
      },
      {
        path: 'components/avatar',
        element: <AvatarPage />,
      },
      {
        path: 'components/button',
        element: <ButtonPage />,
      },
      {
        path: 'components/link',
        element: <LinkPage />,
      },
      {
        path: 'components/input',
        element: <InputPage />,
      },
      {
        path: 'components/container',
        element: <ContainerPage />,
      },
      {
        path: 'components/stack',
        element: <StackPage />,
      },
      {
        path: 'components/grid',
        element: <GridPage />,
      },
      {
        path: 'components/textarea',
        element: <TextareaPage />,
      },
      {
        path: 'components/card',
        element: <CardPage />,
      },
    ],
  },
]);
