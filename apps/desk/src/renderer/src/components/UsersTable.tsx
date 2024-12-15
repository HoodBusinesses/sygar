import { useTranslate } from '@renderer/hooks/useTranslate';
import { Dispatch, SetStateAction, useState } from 'react'
import { Components, CustomTable } from './custom-table';
import { Users, usersColumns } from './formations/users-columns';
import EditUsers from './formations/edit-users';
import { useAppSelector } from '@renderer/store/hooks';

export interface UsersProps {
  orgId: string;
  data: Users[];
  isReFetching: boolean;
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
}

export default function UsersTable({ data, orgId, setSearch, isReFetching, search }: UsersProps) {
  const [component, setComponent] = useState<Components>('table');

  const [defaultValue, setdefaultValue] = useState<Users | null>(null);

  const { isRtl } = useTranslate();

  const userType = useAppSelector((state) => state.auth.auth.userType);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      <CustomTable
        setSearch={setSearch}
        search={search}
        isReFetching={isReFetching}
        component={component}
        setComponent={setComponent}
        headTitle="themesTable.users"
        columns={usersColumns(userType, (rowData: Users) => {
          setdefaultValue(rowData);
          setComponent('edit');
        })}
        data={data.map(user => ({
          id: user.id,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          userCnss: user.userCnss,
          identityType: user.identityType,
          identity: user.identity,
          organizationId: user.organizationId
        }))}
        EditAndAddRowComponent={
          <EditUsers
            orgId={orgId}
            crud={component}
            defaultValues={defaultValue}
            goBack={() => setComponent('table')}
          />
        }
      />
    </div>
  );
}