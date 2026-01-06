'use client';

import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // 하이픈 확대 효과
  const hyphenScale = useTransform(scrollYProgress, [0.7, 1], [1, 50]);
  const hyphenOpacity = useTransform(scrollYProgress, [0.6, 0.75, 1], [0, 0.5, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 0.7], [1, 1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-neutral-950" style={{ height: '200vh' }}>
      <div className="sticky top-0 flex h-screen items-center justify-center">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />

        {/* Glowing accents - more subtle */}
        <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/3 h-[600px] w-[600px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(79, 82, 225, 0.15), transparent)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute right-1/3 bottom-1/4 h-[500px] w-[500px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(242, 67, 143, 0.1), transparent)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <motion.div className="relative z-10 w-full max-w-7xl px-6" style={{ opacity: contentOpacity }}>
        <div className="flex flex-col items-start">
          {/* Typography-focused title */}
          <motion.div
            className="mb-8 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-baseline gap-2 overflow-hidden">
              <motion.span
                className="font-mono text-4xl font-light md:text-6xl"
                style={{
                  background: 'linear-gradient(135deg, #4f52e1, #f2438f)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                team
              </motion.span>
              <motion.span
                className="text-4xl md:text-6xl"
                style={{ color: '#f2438f' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                .
              </motion.span>
            </div>
            <motion.div
              className="mt-2 flex items-baseline gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.span className="font-mono text-6xl font-bold text-white md:text-8xl lg:text-9xl">
                the
              </motion.span>
              <motion.span
                className="text-6xl md:text-8xl lg:text-9xl"
                style={{ color: '#4f52e1' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                -
              </motion.span>
              <motion.span className="font-mono text-6xl font-bold text-white md:text-8xl lg:text-9xl">
                moment
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.div
            className="max-w-2xl space-y-4 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="text-xl text-neutral-300 md:text-2xl">
              학교에 필요한 서비스를 개발하는 팀
            </p>
            <p className="text-lg text-neutral-400">
              가장 빠르게 트렌드를 파악하고, 새로운 기술을 도입합니다
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-12 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.a
              href="#crew"
              className="group relative overflow-hidden px-8 py-4 font-mono text-lg font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #4f52e1, #f2438f)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">팀원 보기</span>
            </motion.a>
            <motion.a
              href="#values"
              className="border-2 px-8 py-4 font-mono text-lg font-semibold transition-colors"
              style={{
                borderColor: '#4f52e1',
                color: '#4f52e1',
              }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(79, 82, 225, 0.1)' }}
              whileTap={{ scale: 0.98 }}
            >
              우리가 찾는 인재
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated hyphen decoration */}
      <motion.div
        className="absolute right-20 bottom-20 font-mono text-9xl font-bold"
        style={{ color: 'rgba(79, 82, 225, 0.15)', opacity: contentOpacity }}
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        -
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ opacity: contentOpacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-neutral-500">
          <span className="font-mono text-sm">scroll</span>
          <motion.div
            className="h-6 w-px"
            style={{
              background: 'linear-gradient(180deg, #4f52e1, #f2438f)',
            }}
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Zoom hyphen transition */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center"
        style={{
          scale: hyphenScale,
          opacity: hyphenOpacity,
        }}
      >
        <div className="font-mono text-[20rem] font-bold leading-none text-white">-</div>
      </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
