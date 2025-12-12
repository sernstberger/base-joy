import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/index';
import { SheetPage } from './pages/components/Sheet';
import { ItemPage } from './pages/components/Item';
import { TablePage } from './pages/components/Table';

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
    ],
  },
]);
