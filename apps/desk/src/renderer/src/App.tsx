import OrganizationsListing from './containers/organizations-listing';
import Home from './containers/home';
import Registration from './containers/Registration';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <OrganizationsListing />
      <Registration />
    </QueryClientProvider>
  );
}

export default App;
