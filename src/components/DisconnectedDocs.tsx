import { motion } from "motion/react";
import {
  FileText, ShieldQuestion, Wallet, Leaf, FileCheck2, Scale,
} from "lucide-react";

const docs = [
  { icon: FileText, label: "Contracts", tone: "text-primary", x: -12, y: -8, rot: -3 },
  { icon: ShieldQuestion, label: "Security Questionnaire", tone: "text-primary", x: 8, y: 12, rot: 2 },
  { icon: Wallet, label: "Finance Approval", tone: "text-primary", x: -6, y: 20, rot: -1 },
  { icon: Leaf, label: "ESG Documents", tone: "text-primary", x: 14, y: -14, rot: 3 },
  { icon: FileCheck2, label: "Insurance", tone: "text-primary", x: -14, y: 4, rot: -2 },
  { icon: Scale, label: "Legal Review", tone: "text-primary", x: 6, y: -6, rot: 2 },
];

export function DisconnectedDocs() {
  return (
    <div className="relative h-[380px] md:h-[440px]">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 440" fill="none" preserveAspectRatio="none">
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          d="M80 90 C 180 60, 250 220, 340 160 S 500 340, 540 300"
          stroke="currentColor"
          className="text-border"
          strokeDasharray="4 6"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative grid grid-cols-3 sm:grid-cols-3 gap-4 md:gap-5 h-full items-center">
        {docs.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            style={{
              transform: `translate(${d.x}px, ${d.y}px) rotate(${d.rot}deg)`,
            }}
            className="surface-card card-hover p-4 relative"
          >
            <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center shadow-sm">!</span>
            <div className={`h-9 w-9 rounded-md bg-secondary flex items-center justify-center ${d.tone}`}>
              <d.icon className="h-4.5 w-4.5" />
            </div>
            <div className="mt-3 text-[13px] font-semibold text-primary leading-tight">{d.label}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">Unlinked source</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
