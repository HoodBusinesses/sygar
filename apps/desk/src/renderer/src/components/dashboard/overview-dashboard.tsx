const fields = [
  {
    title: 'Total Revenue',
    icon: '💸',
    value: '$45,231.89',
    description: '+20.4% from last month',
  },
  {
    title: 'Total participants',
    icon: '💸',
    value: '+4,231',
    description: '+20.4% from last month',
  },
  {
    title: 'Total Formatioms',
    icon: '💸',
    value: '+345',
    description: '+20.4% from last month',
  },
  {
    title: 'Total Charges',
    icon: '💸',
    value: '$4,490',
    description: '+20.4% from last month',
  },
];

export default function OverviewDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {fields.map((field, index) => (
        <div
          key={index}
          className="rounded-xl border-2 p-4 text-gray-900  shadow"
        >
          <h3 className="tracking-tight text-md font-semibold">
            {field.title}
          </h3>
          <p className="text-2xl font-bold">{field.value}</p>
          <p className="text-xs text-gray-400">{field.description}</p>
        </div>
      ))}
    </div>
  );
}
