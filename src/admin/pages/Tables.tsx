import { useEffect, useMemo, useState } from "react";

import SectionHeader from "../components/SectionHeader";
import TableFilters from "../components/TableFilters";
import TableCard from "../components/TableCard";
import TableDetailsDrawer from "../components/TableDetailsDrawer";

import { createTable, listenTables } from "../services/tableService";
import { DEFAULT_TABLE_AREAS, getAreaLabel } from "../../utils/tableUtils";

export default function Tables() {
  const [tables, setTables] = useState<any[]>([]);

  const [selectedTable, setSelectedTable] =
    useState<any>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");
  const [selectedArea, setSelectedArea] = useState("All");
  const [nextTableNumber, setNextTableNumber] = useState("1");
  const [isCreatingTable, setIsCreatingTable] = useState(false);

  useEffect(() => {
    const unsubscribe = listenTables(setTables, (err) => {
      setTablesError(err.message || "Failed to load tables");
    });

    return () => unsubscribe();
  }, []);

  const [tablesError, setTablesError] = useState<string | null>(null);

  console.log("TABLES:", tables);

  const filteredTables = useMemo(() => {
  return tables.filter((table) => {
    const tableNumber = table.tableNumber ?? "";
    const area = table.area || "";
    const matchesSearch = `${tableNumber}`.includes(search) || (table.areaLabel || getAreaLabel(area)).toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" ||
      table.status === status;

    const matchesArea = selectedArea === "All" || area === selectedArea;

    return matchesSearch && matchesStatus && matchesArea;
  });
}, [tables, search, status, selectedArea]);

  const groupedTables = useMemo(() => {
    const grouped: Record<string, any[]> = {};

    DEFAULT_TABLE_AREAS.forEach((area) => {
      grouped[area.key] = [];
    });

    filteredTables.forEach((table) => {
      const areaKey = table.area || "unassigned";
      if (!grouped[areaKey]) grouped[areaKey] = [];
      grouped[areaKey].push(table);
    });

    return grouped;
  }, [filteredTables]);

  async function handleCreateTable() {
    const parsedNumber = Number(nextTableNumber);
    if (!parsedNumber || parsedNumber <= 0) return;

    setIsCreatingTable(true);
    try {
      const areaLabel = DEFAULT_TABLE_AREAS.find((item) => item.key === selectedArea)?.label || "Area";
      await createTable(selectedArea, parsedNumber, areaLabel);
      setNextTableNumber((parsedNumber + 1).toString());
    } finally {
      setIsCreatingTable(false);
    }
  }

  return (
    <div className="space-y-8">

      <SectionHeader
        title="Tables"
        subtitle="Manage restaurant tables"
      />

      <TableFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <div className="bg-white rounded-2xl border shadow-sm p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          <div className="flex-1">
            <label className="text-sm font-semibold text-gray-700">Area</label>
            <select
              value={selectedArea}
              onChange={(event) => setSelectedArea(event.target.value)}
              className="mt-2 w-full rounded-xl border px-4 py-3"
            >
              <option value="All">All Areas</option>
              {DEFAULT_TABLE_AREAS.map((area) => (
                <option key={area.key} value={area.key}>{area.label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-semibold text-gray-700">New Table Number</label>
            <input
              value={nextTableNumber}
              onChange={(event) => setNextTableNumber(event.target.value)}
              type="number"
              min="1"
              className="mt-2 w-full rounded-xl border px-4 py-3"
              placeholder="Enter table number"
            />
          </div>
          <button
            onClick={handleCreateTable}
            disabled={isCreatingTable}
            className="rounded-xl bg-olive px-5 py-3 font-semibold text-white disabled:opacity-60"
          >
            {isCreatingTable ? "Creating..." : "Create Table"}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedTables).map(([areaKey, areaTables]) => (
          <div key={areaKey} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {getAreaLabel(areaKey)}
              </h3>
              <span className="text-sm text-gray-500">{areaTables.length} tables</span>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {areaTables.map((table) => (
                <TableCard
                  key={table.id}
                  table={table}
                  onView={() => {
                    setSelectedTable(table);
                    setDrawerOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <TableDetailsDrawer
        open={drawerOpen}
        table={selectedTable}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedTable(null);
        }}
      />

    </div>
  );
}