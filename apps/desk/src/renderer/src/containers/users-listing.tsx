import UsersTable from '@renderer/components/UsersTable';
import withAuth from '@renderer/hoc/with-auth';
import { mockUsers } from '@renderer/utils/static/organizations';


const usersListing = () => {
    // const { data, isSuccess, isLoading, isError } = useGetAllUsers();

    // if (isLoading) {
    //     return (
    //       <div className="flex items-center justify-center h-screen">
    //         Loading...
    //       </div>
    //     );
    //   }
    
    //   if (isError) {
    //     return (
    //       <div className="text-red-500 p-4">Error loading organization data</div>
    //     );
    //   }
    
    //   if (isSuccess) {
    //     return <UsersTable data={data} />;
    //   }
    
        return <UsersTable  data={mockUsers}  />;
}

export default withAuth(usersListing)