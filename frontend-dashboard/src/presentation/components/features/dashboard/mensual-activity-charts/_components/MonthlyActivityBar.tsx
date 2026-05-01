import { UserMonthlyActivity } from "@/domain/models";
import { DateUtils } from "@/shared/utils";

interface MonthlyActivityBarProps {
  monthlyActivity: UserMonthlyActivity;
  max: number;
}

export const MonthlyActivityBar = ({
  monthlyActivity,
  max,
}: MonthlyActivityBarProps) => {
  const { month, totalPosts } = monthlyActivity;
  const width = max > 0 ? (totalPosts / max) * 100 : 0;
  const formattedMonth = DateUtils.formatMonth(month);

  return (
    <div className="flex items-center gap-3">
      <span className="w-8 text-right text-xs font-mono text-muted-foreground">
        {formattedMonth}
      </span>

      <svg
        className="flex-1"
        height="6"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        <rect x="0" y="0" width="100%" height="6" rx="3" fill="var(--border)" />
        <rect x="0" y="0" width={`${width}%`} height="6" rx="3" fill="var(--primary)" />
      </svg>

      <span className="w-4 text-xs text-right text-muted-foreground font-mono">
        {totalPosts}
      </span>
    </div>
  );
};

