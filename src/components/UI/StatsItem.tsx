type StatsProps = {
  title: string;
  count: number;
  tag: string;
};

function StatsItem({ title, count, tag }: StatsProps) {
  return (
    <li className="flex justify-between items-center bg-[#11141D] p-4 border border-[#3B3A3F] rounded-xl w-full">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-white/50">{title}</p>
        <p className="text-2xl font-bold text-white">{count}</p>
      </div>
      <p className="rounded-2xl text-xs font-semibold bg-[#8a38f5]  py-[2px] px-[10px]">
        {tag}
      </p>
    </li>
  );
}

export default StatsItem;
