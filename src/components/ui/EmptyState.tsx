import React from 'react';
import { FileSearch } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {icon ?? <FileSearch size={24} />}
      </div>
      <h3 className="text-[15px] font-600 text-foreground mb-1">{title}</h3>
      <p className="text-[13px] text-muted-foreground max-w-xs">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground text-[13px] font-500 hover:bg-primary/90 transition-all duration-150 active:scale-95"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}