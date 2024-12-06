import UsersTable from '@renderer/components/UsersTable';
import withAuth from '@renderer/hoc/with-auth';
import { useOrganizationUsers } from '@renderer/hooks/api/organization/get-organization-users';
import { useAppSelector } from '@renderer/store/hooks';
import { Role } from '@renderer/store/slices/auth.slice';
import { useGetAllSygarUsers } from '@renderer/hooks/api/user/get-all-users';
import { Loading } from './laoding';

const usersListing = () => {
  const url = new URLSearchParams(window.location.search);

  const orgId1 = url.get('orgId');

  const user = useAppSelector((state) => state.auth.auth);

  const { data, isLoading, isError, isSuccess } =
    user.userType === 'SOLUTION_OWNER'
      ? useGetAllSygarUsers()
      : useOrganizationUsers(orgId1 || user.organizationId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4">Error loading organization data</div>
    );
  }

  if (isSuccess) {
    return (
      <UsersTable
        orgId={orgId1 || user.organizationId}
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
