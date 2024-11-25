import UsersTable from '@renderer/components/UsersTable';
import withAuth from '@renderer/hoc/with-auth';
import { useOrganizationUsers } from '@renderer/hooks/api/organization/get-organization-users';
import { useAppSelector } from '@renderer/store/hooks';

const usersListing = () => {
  const orgId = useAppSelector((state) => state.auth.auth.organizationId);

  const { data, isLoading, isError, error, isSuccess, refetch } =
    useOrganizationUsers(orgId);

  console.log(data);
  if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-red-500 p-4">Error loading organization data</div>
      );
    }

    if (isSuccess) {
      return (
        <UsersTable
          data={data.users.map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            // role: user.role,
          }))}
        />
      );
    }
};

export default withAuth(usersListing);
