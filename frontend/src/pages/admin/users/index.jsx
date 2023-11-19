import React  from 'react';
import UserOverviewCard from './UserOverviewCard';  
import UserAnalyticsCard from './UserAnalyticsCard';
import UsersTable from './UsersTable';

const ManageUsers = () => {

  return (
    <div>
      <UserOverviewCard />
      <UserAnalyticsCard />
      <UsersTable />
    </div>
  );
};

export default ManageUsers;
