import { useEffect, useState } from "react";

import SectionHeader from "../components/SectionHeader";
import WaiterTable from "../components/WaiterTable";
import WaiterDrawer from "../components/WaiterDrawer";
import DeleteWaiterModal from "../components/DeleteWaiterModal";

import { getWaiters } from "../services/waiterService";

export default function Waiters() {
  const [waiters, setWaiters] = useState<any[]>([]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedWaiter, setSelectedWaiter] =
    useState<any>(null);

  async function loadWaiters() {
    const data = await getWaiters();
    setWaiters(data);
  }

  useEffect(() => {
    loadWaiters();
  }, []);

  return (
    <div className="space-y-8">

      <SectionHeader
        title="Waiters"
        subtitle="Manage restaurant waiters"
      >
        <button
          onClick={() => {
            setSelectedWaiter(null);
            setDrawerOpen(true);
          }}
          className="bg-olive text-white px-5 py-3 rounded-xl"
        >
          + Add Waiter
        </button>
      </SectionHeader>

      <WaiterTable
        waiters={waiters}
        onEdit={(waiter) => {
          setSelectedWaiter(waiter);
          setDrawerOpen(true);
        }}
        onDelete={(waiter) => {
          setSelectedWaiter(waiter);
          setDeleteOpen(true);
        }}
      />

      <WaiterDrawer
        open={drawerOpen}
        item={selectedWaiter}
        onClose={() => setDrawerOpen(false)}
        onSaved={loadWaiters}
      />

      <DeleteWaiterModal
        open={deleteOpen}
        item={selectedWaiter}
        onClose={() => setDeleteOpen(false)}
        onDeleted={loadWaiters}
      />

    </div>
  );
}