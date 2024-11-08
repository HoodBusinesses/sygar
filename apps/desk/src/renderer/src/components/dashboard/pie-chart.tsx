import { cn } from '../ui/lib/utils';
import Chart from './echart';
import { getPieChartOption } from './get-echart-option';
type Props = {
  name: string;
  items: {
    label: string;
    value: number;
    color: string;
  }[];
};

export default function PieChart({ items, name }: Props) {
  return (
    <div className="border-2 rounded-lg p-2">
      <h1 className="font-bold text-center">{name}</h1>
      <div className="flex items-center">
        <Chart
          chartOptions={getPieChartOption(items.filter((_, index) => index))}
          className={'w-[170px] h-[170px]'}
        />

        <div className="flex flex-col gap-3">
          {items.map((pieItem, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full text-[13px] font-normal"
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn('h-4 w-4 rounded-full')}
                  style={{ backgroundColor: pieItem.color }}
                ></div>
                <p className="text-gray-950 font-bold">{pieItem.label}:</p>
              </div>
              <p className="ml-2 text-right text-sm text-gray-950 font-semibold">
                {pieItem.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
