import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import {
  listenToOffers,
  addOffer,
  updateOffer,
  deleteOffer,
} from "../services/offerService";
import type { Offer } from "../../types";
import { Edit2, Trash2, Plus, X, Tag } from "lucide-react";

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [discountTag, setDiscountTag] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToOffers(setOffers);
    return () => unsubscribe();
  }, []);

  const openAddModal = () => {
    setSelectedOffer(null);
    setTitle("");
    setDescription("");
    setCode("");
    setDiscountTag("");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (offer: Offer) => {
    setSelectedOffer(offer);
    setTitle(offer.title);
    setDescription(offer.description || "");
    setCode(offer.code || "");
    setDiscountTag(offer.discountTag || "");
    setIsActive(offer.isActive !== false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Offer name/title is required.");
      return;
    }

    const offerData = {
      title,
      description,
      code,
      discountTag,
      isActive,
    };

    try {
      if (selectedOffer) {
        await updateOffer(selectedOffer.id, offerData);
      } else {
        await addOffer(offerData);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error saving offer.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this offer?")) {
      try {
        await deleteOffer(id);
      } catch (err) {
        console.error(err);
        alert("Error deleting offer.");
      }
    }
  };

  const handleToggleActive = async (offer: Offer) => {
    try {
      await updateOffer(offer.id, { isActive: !offer.isActive });
    } catch (err) {
      console.error(err);
      alert("Error updating status.");
    }
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 max-w-7xl mx-auto">
      <SectionHeader
        title="Offers & Promotions"
        subtitle="Manage offers displayed on the customer menu"
      >
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-olive hover:bg-olive/90 text-white px-5 py-3 rounded-xl transition font-semibold"
        >
          <Plus size={18} />
          Add Offer
        </button>
      </SectionHeader>

      {/* Offers Grid */}
      {offers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center text-gray-500">
          <Tag size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="font-semibold text-lg">No active promotions</p>
          <p className="text-sm mt-1">Create offers to showcase them on the customer menu page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`bg-white rounded-2xl border ${
                offer.isActive ? "border-gray-200" : "border-gray-100 opacity-75"
              } shadow-sm p-6 relative flex flex-col justify-between hover:shadow-md transition-shadow`}
            >
              <div>
                {/* Header Tag / Badge */}
                <div className="flex justify-between items-start mb-4">
                  {offer.discountTag ? (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {offer.discountTag}
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      Promo
                    </span>
                  )}

                  {/* Active Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={offer.isActive !== false}
                      onChange={() => handleToggleActive(offer)}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:width-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {offer.title}
                </h3>

                {offer.description && (
                  <p className="text-gray-600 text-sm mb-4 whitespace-pre-line leading-relaxed">
                    {offer.description}
                  </p>
                )}

                {offer.code && (
                  <div className="inline-block bg-gray-50 border border-dashed border-gray-300 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-700 select-all mb-4">
                    CODE: <span className="font-bold">{offer.code}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 border-t border-gray-100 pt-4 mt-4">
                <button
                  onClick={() => openEditModal(offer)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition font-medium"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition font-medium"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-950">
                {selectedOffer ? "Edit Offer" : "Add New Offer"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-500 hover:text-gray-950 hover:bg-gray-50 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Offer Title / Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weekend Feast - 15% OFF"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-olive/20 focus:border-olive transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Description / Subtext
                </label>
                <textarea
                  placeholder="Mention multiple details or specific rules on separate lines if needed."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-olive/20 focus:border-olive transition text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Promo Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. WEEKEND15"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-olive/20 focus:border-olive transition text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Discount Badge / Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 15% OFF, BOGO"
                    value={discountTag}
                    onChange={(e) => setDiscountTag(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-olive/20 focus:border-olive transition text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:width-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                </label>
                <span className="text-sm font-medium text-gray-700">
                  Visible to Customers immediately
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-olive hover:bg-olive/90 rounded-xl transition"
                >
                  {selectedOffer ? "Save Changes" : "Create Offer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
