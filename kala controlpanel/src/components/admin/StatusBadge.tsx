import { Badge } from "@/components/ui/badge";

type StatusType = string;

const statusColors: Record<string, string> = {
  "New": "bg-info/15 text-info border-info/30",
  "In Progress": "bg-warning/15 text-warning border-warning/30",
  "Quoted": "bg-primary/15 text-primary border-primary/30",
  "Completed": "bg-success/15 text-success border-success/30",
  "Received": "bg-info/15 text-info border-info/30",
  "Processing": "bg-warning/15 text-warning border-warning/30",
  "In Production": "bg-warning/15 text-warning border-warning/30",
  "Shipped": "bg-primary/15 text-primary border-primary/30",
  "Delivered": "bg-success/15 text-success border-success/30",
  "Cancelled": "bg-destructive/15 text-destructive border-destructive/30",
  "Paid": "bg-success/15 text-success border-success/30",
  "Pending": "bg-warning/15 text-warning border-warning/30",
  "Failed": "bg-destructive/15 text-destructive border-destructive/30",
  "Contacted": "bg-info/15 text-info border-info/30",
  "In Review": "bg-warning/15 text-warning border-warning/30",
  "Confirmed": "bg-primary/15 text-primary border-primary/30",
};

export function StatusBadge({ status }: { status: StatusType }) {
  return (
    <Badge variant="outline" className={`${statusColors[status] || "bg-muted text-muted-foreground"} font-medium`}>
      {status}
    </Badge>
  );
}
