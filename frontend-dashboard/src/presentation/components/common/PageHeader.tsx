import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/presentation/components/common";

export interface PageHeaderProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: ReactNode;
  };
}

export const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-start gap-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {action && (
        <>
          {action.href ? (
            <Link href={action.href}>
              <Button variant="gradient">
                {action.icon}
                {action.label}
              </Button>
            </Link>
          ) : (
            <Button variant="gradient" onClick={action.onClick}>
              {action.icon}
              {action.label}
            </Button>
          )}
        </>
      )}
    </div>
  );
};
