'use client';

import { motion } from 'framer-motion';

const PhotosSection = () => {
  const photos = [
    {
      date: '2025.04.03',
      generation: '[7,8기]',
      emoji: '🌷',
    },
    {
      date: '2025.01.03',
      generation: '[6,7,8기]',
      emoji: '🌷',
    },
    {
      date: '2024.01.23',
      generation: '[5,6,7기]',
      emoji: '🌷',
    },
    {
      date: '2023.03.30',
      generation: '[4,5기]',
      emoji: '🌷',
    },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-neutral-50 to-white px-6 py-40 md:px-12 lg:px-24">
      <div className="mx-auto w-full max-w-7xl">
        {/* 제목 */}
        <motion.div
          className="mb-16 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="h-px w-32 bg-[#4f52e1]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <h2 className="font-mono text-2xl font-bold text-neutral-900">Photos</h2>
          <motion.div
            className="h-px flex-1 bg-[#4f52e1]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </motion.div>

        {/* 사진들 */}
        <div className="grid gap-8 md:grid-cols-2">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="border border-neutral-200 bg-neutral-50"
            >
              <div className="relative flex h-96 items-center justify-center bg-neutral-100">
                <span className="text-9xl">{photo.emoji}</span>

                {/* Decorative corners */}
                <div className="absolute left-6 top-6 font-mono text-3xl text-[#4f52e1]/40">.</div>
                <div className="absolute right-6 top-6 font-mono text-3xl text-[#4f52e1]/40">-</div>
                <div className="absolute bottom-6 left-6 font-mono text-3xl text-[#4f52e1]/40">-</div>
                <div className="absolute bottom-6 right-6 font-mono text-3xl text-[#4f52e1]/40">.</div>
              </div>

              <div className="border-t border-neutral-200 p-8">
                <p className="text-center font-mono text-lg text-neutral-600">
                  {photo.emoji} <span className="text-[#4f52e1]">|</span> {photo.date} {photo.generation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotosSection;