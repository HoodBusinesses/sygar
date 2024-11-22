import { useTranslate } from '@renderer/hooks/useTranslate';
import { useState } from 'react'
import { Components, CustomTable } from './custom-table';
import { Users, usersColumns } from './formations/users-columns';
import EditUsers from './formations/edit-users';


export interface UsersProps {
  data: Users[];
}
type UserRollType = 'admin' | 'user' | 'owner';

export default function UsersTable ({data} : {data: Users[]}) {
  const [component, setComponent] = useState<Components>('table');

  const [defaultValue, setdefaultValue] = useState<Users | null>(null);

  // const 


  const { isRtl } = useTranslate();
  
  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      <CustomTable 
          component={component}
          setComponent={setComponent}
          headTitle="themesTable.users"
          columns={usersColumns(
            (rowData: Users) => {
              setdefaultValue(rowData);
              setComponent('edit');
            }
          )}
          data={data}
          EditAndAddRowComponent={
            <EditUsers
              crud={component}
              defaultValues={defaultValue}
              goBack={() => setComponent('table')}
            />
          }
      />
    </div>
  )
}