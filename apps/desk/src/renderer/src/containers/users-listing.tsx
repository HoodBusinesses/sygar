import UsersTable from '@renderer/components/UsersTable';
import withAuth from '@renderer/hoc/with-auth';
import { useOrganizationUsers } from '@renderer/hooks/api/organization/get-organization-users';
import { useAppSelector } from '@renderer/store/hooks';
import { Role } from '@renderer/store/slices/auth.slice';

const usersListing = () => {
  const url = new URLSearchParams(window.location.search);

  const orgId1 = url.get('orgId');

  const orgId2 = useAppSelector((state) => state.auth.auth.organizationId);

  const { data, isLoading, isError, isSuccess } = useOrganizationUsers(
    orgId1 || orgId2
  );

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
          role: user.role as Role,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          userCnss: user.cnss.toString(),
          identityType: user.identityType,
          identity: user.identity,
          organizationId: user.organizationId,
        }))}
      />
    );
  }
};

export default withAuth(usersListing);
