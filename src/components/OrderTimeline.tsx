import { useEffect, useState } from 'react';
import { ClipboardList, ChefHat, Utensils, CheckCircle, ArrowLeft, RefreshCw, Star, XCircle } from 'lucide-react';
import { OrderStatus, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { motion } from 'motion/react';

interface OrderTimelineProps {
  language: Language;
  currentTable: string | number | null;
  currentOrderNumber: string;
  currentOrderStatus: OrderStatus;
  sessionOrders: any[];
  onBackToMenu: () => void;
  onResetOrder: () => void;
  onRequestBill: () => void;
}

export default function OrderTimeline({
  language,
  currentTable,
  currentOrderNumber,
  currentOrderStatus,
  sessionOrders,
  onBackToMenu,
  onResetOrder,
  onRequestBill,
}: OrderTimelineProps) {
  const t = TRANSLATIONS[language];
  console.log("Timeline session orders:", sessionOrders);

  if (currentOrderStatus === "Rejected") {
    return (
      <div className="max-w-xl mx-auto px-3 py-6 sm:px-4 sm:py-12 text-center" id="order-rejected-container">
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-red-200 shadow-lg mb-8">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-red-600 mb-2">Order Rejected</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Unfortunately, your order could not be accepted by the restaurant. Your table ({currentTable || "--"}) is now available again and your session has ended.
          </p>
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-xs text-red-700 font-medium">
            {currentTable || "--"} is available again.
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onResetOrder}
            className="bg-olive hover:bg-olive-dark text-white font-semibold text-xs tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            id="back-to-home-rejected-btn"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t.backToHome || "Return Home"}</span>
          </button>
        </div>
      </div>
    );
  }

  const steps: { status: OrderStatus; icon: any; title: string; desc: string }[] = [
    {
      status: 'Pending',
      icon: ClipboardList,
      title: t.statusPending,
      desc: t.statusPendingDesc,
    },
    {
      status: 'Preparing',
      icon: ChefHat,
      title: t.statusPreparing,
      desc: t.statusPreparingDesc,
    },
    {
      status: 'Ready',
      icon: Utensils,
      title: t.statusReady,
      desc: t.statusReadyDesc,
    },
    {
      status: 'Completed',
      icon: CheckCircle,
      title: t.statusCompleted,
      desc: t.statusCompletedDesc,
    },
  ];
  const currentStep = steps.findIndex(
  (step) => step.status === currentOrderStatus
);

  

 

  return (
    <div className="max-w-xl mx-auto px-3 py-6 sm:px-4 sm:py-12" id="order-timeline-wrapper">
      {/* Card Header Info */}
      <div className="text-center mb-10" id="order-timeline-intro">
        <span className="text-olive text-[11px] font-extrabold uppercase tracking-[0.25em] bg-olive/5 px-4 py-1.5 rounded-full border border-olive/15 shadow-2xs">
          Live Culinary Status
        </span>
        <h2 className="font-elegant font-bold text-3xl md:text-4xl text-charcoal tracking-wide mt-4">
          {t.orderStatusTitle}
        </h2>
        <div className="flex items-center justify-center gap-1.5 mt-3 text-soft-gray text-xs tracking-wider">
          <span>{t.orderId}:</span>
          <span className="font-mono font-bold text-charcoal">{currentOrderNumber || "RC-----"}</span>
          <span className="text-light-gray/60">|</span>
          <span className="bg-gold/10 text-amber-800 font-semibold px-2.5 py-0.5 rounded-md text-[10px] uppercase">
            {t.table} {currentTable}
          </span>
        </div>
      </div>

      {/* Main Timeline Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 md:p-8 border border-light-gray/40 shadow-[0_4px_24px_-10px_rgba(85,107,47,0.08)] mb-8" id="order-timeline-card">
        <div className="relative space-y-10 pl-10" id="timeline-steps-container">
          {/* Vertical Connecting Line */}
          <div className="absolute left-5 top-2 bottom-2 w-[2px] bg-light-gray/60" id="timeline-track">
            {/* Animated Progress Line */}
            <motion.div
              initial={{ height: '0%' }}
              animate={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full bg-olive rounded-full"
              id="timeline-progress-line"
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={step.status} className="relative flex items-start gap-4" id={`step-node-${index}`}>
                {/* Node Dot / Icon wrapper */}
                <div className="absolute -left-[30px] z-10" id={`node-indicator-${index}`}>
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-olive text-cream w-10 h-10 rounded-full flex items-center justify-center shadow-md border-4 border-white"
                    >
                      <CheckCircle className="w-5 h-5 fill-cream text-olive" />
                    </motion.div>
                  ) : isActive ? (
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                      className="bg-gold text-white w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(200,169,106,0.3)] border-4 border-white"
                    >
                      <Icon className="w-4 h-4 animate-spin-slow" />
                    </motion.div>
                  ) : (
                    <div className="bg-cream text-soft-gray/60 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Step Text details */}
                <div className="flex-grow pt-1 pl-4" id={`step-text-wrapper-${index}`}>
                  <h4
                    className={`font-elegant text-base font-semibold tracking-wide transition-colors duration-500 ${
                      isActive ? 'text-olive text-lg font-bold' : isCompleted ? 'text-charcoal' : 'text-soft-gray/60'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${
                      isActive ? 'text-charcoal/90 font-medium' : isCompleted ? 'text-soft-gray' : 'text-soft-gray/40'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Previous Orders */}
{sessionOrders.length > 1 && (
  <div className="mb-8">
    <h3 className="text-lg font-bold text-charcoal mb-4">
  Your Orders
</h3>

    <div className="space-y-3">
      {sessionOrders.map((order: any) => (
        <div
          key={order.id}
          className="bg-cream border border-light-gray rounded-xl p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">
              {order.orderNumber}
            </p>

            <p className="text-sm text-soft-gray">
              {order.status}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              order.status === "Served"
                ? "bg-green-100 text-green-700"
                : order.status === "Preparing"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {order.status}
          </span>
        </div>
      ))}
    </div>
  </div>
)}

        {/* Dynamic Status Indicator Ribbon */}
        <div className="mt-10 pt-6 border-t border-light-gray/40 text-center" id="timeline-bottom-banner">
          <p className="text-xs text-soft-gray font-serif italic">
            {currentStep === 3
              ? t.statusCompletedDesc
              : `${t.welcome}.`}
          </p>
        </div>
      </div>
      {currentOrderStatus === "Served" && (
  <div className="mb-6">
    <button
      onClick={onRequestBill}
      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all"
    >
      💳 Request Bill
    </button>
  </div>
)}

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center" id="order-timeline-actions">
        <button
          onClick={onBackToMenu}
          className="w-full sm:w-auto bg-olive hover:bg-olive-dark text-white font-semibold text-xs tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2"
          id="back-to-menu-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.viewMenu}</span>
        </button>

        <button
          onClick={onResetOrder}
          className="w-full sm:w-auto border border-light-gray hover:border-gold hover:text-gold text-soft-gray font-medium text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 bg-white flex items-center justify-center gap-2"
          id="simulate-new-order-btn"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.backToHome}</span>
        </button>
      </div>
    </div>
  );
}
