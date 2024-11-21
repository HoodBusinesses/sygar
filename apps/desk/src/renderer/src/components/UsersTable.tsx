import { useTranslate } from '@renderer/hooks/useTranslate';
import { mockUsers } from '@renderer/utils/static/organizations';
import React, { useState } from 'react'
import { Components, CustomTable } from './custom-table';
import { usersColumns } from './formations/users-columns';

const UsersTable = () => {
  const [component, setComponent] = useState<Components>('table');

  const { isRtl } = useTranslate();
  
  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full w-full p-6 space-y-6">
      <CustomTable 
          component={component}
          setComponent={setComponent}
          headTitle="Users"
          columns={usersColumns()}
          data={mockUsers}
          EditAndAddRowComponent={null}
      />
    </div>
  )
}

export default UsersTable