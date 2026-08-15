import {
  CheckCircle2,
  Circle,
} from "lucide-react";

type Props = {
  currentStatus: string;
};

const steps = [
  "Pending",
  "Accepted",
  "Preparing",
  "Ready",
  "Served",
  "Bill Requested",
  "Payment Done",
  "Completed",
];

export default function OrderTimeline({
  currentStatus,
}: Props) {
  const currentIndex =
    steps.indexOf(currentStatus);

  return (
    <div className="space-y-5">

      <h3 className="font-semibold text-lg">
        Order Timeline
      </h3>

      {steps.map((step, index) => {
        const completed =
          index <= currentIndex;

        return (
          <div
            key={step}
            className="flex items-center gap-4"
          >
            {completed ? (
              <CheckCircle2
                className="text-green-600"
                size={22}
              />
            ) : (
              <Circle
                className="text-gray-300"
                size={22}
              />
            )}

            <span
              className={
                completed
                  ? "font-semibold text-gray-900"
                  : "text-gray-400"
              }
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}