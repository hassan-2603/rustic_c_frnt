import { UserRound } from "lucide-react";

export default function EmptyWaiters() {
  return (
    <div className="bg-white border rounded-2xl py-20">

      <div className="flex flex-col items-center">

        <div className="w-20 h-20 rounded-full bg-olive/10 flex items-center justify-center">

          <UserRound
            size={40}
            className="text-olive"
          />

        </div>

        <h2 className="text-2xl font-bold mt-6">
          No Waiters Found
        </h2>

        <p className="text-gray-500 mt-2">
          Add your first waiter to begin managing staff.
        </p>

      </div>

    </div>
  );
}