import { motion } from "framer-motion";

interface StickerProps {
  src: string;
  alt?: string;
  className?: string;
  rotate?: number;
}

/** A decorative sticker image that wiggles playfully on hover. */
export default function Sticker({ src, alt = "", className = "", rotate = 0 }: StickerProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      draggable={false}
      className={`select-none drop-shadow-md ${className}`}
      initial={{ rotate }}
      whileHover={{ rotate: rotate + 10, scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    />
  );
}
