"use client";

import { motion } from "framer-motion";
import { AeoSeoHealthCenter, ContentQueuePanel, DashboardHero, QuickActionsPanel, MetricsSnapshotGrid } from "@/components/cms/DashboardPanels";

const entryMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function CMSDashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={entryMotion}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass rounded-[32px] p-8 shadow-[0_40px_120px_rgba(15,23,42,0.08)]"
      >
        <DashboardHero />
      </motion.div>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={entryMotion}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
      >
        <MetricsSnapshotGrid />
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={entryMotion}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
      >
        <AeoSeoHealthCenter />
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={entryMotion}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
      >
        <ContentQueuePanel />
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={entryMotion}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
      >
        <QuickActionsPanel />
      </motion.section>
    </div>
  );
}
