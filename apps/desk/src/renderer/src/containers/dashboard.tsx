import FormationBarChart from '@renderer/components/dashboard/formation-bar-chart';
import FormationsPieChart from '@renderer/components/dashboard/Formations-Pie-Chart';
import OverviewDashboard from '@renderer/components/dashboard/overview-dashboard';
import TasksPieChart from '@renderer/components/dashboard/Tasks-Pie-Chart';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto py-6 space-y-6">
      {/* Overview of the organization */}
      <h1 className="text-2xl font-semibold">Overview</h1>
      <OverviewDashboard />

      <div className="flex justify-between">
        {/* Pie chart of users : total users, educated users, absent users , users in progress*/}
        {/* < /> */}

        {/* Pie chart of formations : total formation, finished formation , formation in progress*/}
        <FormationsPieChart />

        {/* chart of formations : total formation, finished formation , formation in progress*/}
        <TasksPieChart />
      </div>

      <FormationBarChart />
    </div>
  );
}
