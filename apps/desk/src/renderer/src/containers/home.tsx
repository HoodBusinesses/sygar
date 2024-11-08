import withAuth from '../hoc/with-auth';

function Home() {
  return <div className="text-blue-900">home</div>;
}

export default withAuth(Home);
