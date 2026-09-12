import { motion } from "framer-motion";
import butterfly from "../assets/stickers/butterfly.png";
import tulips from "../assets/stickers/tulips.png";
import bowCream from "../assets/stickers/bow-cream.png";

export default function RestDay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="paper-card relative p-10 text-center"
    >
      <motion.img
        src={butterfly}
        alt=""
        className="w-16 mx-auto mb-3 select-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <h2 className="font-script text-5xl text-plum mb-3">Rest day</h2>
      <p className="font-body text-ink/80 max-w-xs mx-auto leading-relaxed">
        No tasks today. Walk if you feel like it, skip it if you don't —
        Sunday is what makes the other six days sustainable.
      </p>
      <div className="flex justify-center gap-6 mt-6">
        <img src={tulips} className="w-14 select-none" alt="" />
        <img src={bowCream} className="w-14 select-none" alt="" />
      </div>
    </motion.div>
  );
}
