'use client';

import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Phase 1: 초기 상태 (0 ~ 0.15) - 콘텐츠 표시
  // Phase 2: 하이픈 늘어나기 (0.15 ~ 0.4) - 하이픈이 늘어나면서 moment 밀어냄
  // Phase 3: 페이드아웃 및 전환 (0.4 ~ 0.7) - 흰색 배경으로 전환

  // 하이픈 width 변화 - 스크롤 초반부터 반응
  const hyphenWidth = useTransform(scrollYProgress, [0.1, 0.3, 0.45], [24, 400, 1200]);

  // 콘텐츠 페이드아웃
  const contentOpacity = useTransform(scrollYProgress, [0, 0.08, 0.3, 0.4], [1, 1, 1, 0]);

  // the, team. 페이드아웃
  const teamOpacity = useTransform(scrollYProgress, [0.2, 0.35], [1, 0]);

  // moment 페이드아웃 (밀려나면서)
  const momentOpacity = useTransform(scrollYProgress, [0.3, 0.45], [1, 0]);

  // 배경 전환
  const bgToWhite = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);

  return (
    <section ref={ref} className="relative bg-neutral-950" style={{ height: '300vh' }}>
      {/* Sticky container - 스크롤해도 화면에 고정 */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950" />

        {/* 흰색 배경으로 전환 */}
        <motion.div className="absolute inset-0 z-20 bg-white" style={{ opacity: bgToWhite }} />

        {/* Glowing accents */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: useTransform(scrollYProgress, [0.35, 0.5], [1, 0]) }}
        >
          <motion.div
            className="absolute top-1/4 left-1/3 h-150 w-150 rounded-full blur-[150px]"
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
            className="absolute right-1/3 bottom-1/4 h-125 w-125 rounded-full blur-[150px]"
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
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl px-6">
          <div className="flex flex-col items-start">
            {/* team. 타이틀 */}
            <motion.div className="mb-4 text-left" style={{ opacity: teamOpacity }}>
              <motion.div
                className="flex items-baseline gap-2 overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
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
              </motion.div>
            </motion.div>

            {/* the-moment 타이틀 - 하이픈이 늘어나면서 moment를 밀어냄 */}
            <motion.div
              className="flex items-baseline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.span
                className="font-mono text-6xl font-bold text-white md:text-8xl lg:text-9xl"
                style={{ opacity: teamOpacity }}
              >
                the
              </motion.span>

              {/* 늘어나는 하이픈 - width로 실제 공간 차지하며 moment 밀어냄 */}
              <motion.div
                className="flex items-center justify-end"
                style={{ width: hyphenWidth }}
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <span className="text-6xl md:text-8xl lg:text-9xl" style={{ color: '#4f52e1' }}>
                  -
                </span>
              </motion.div>

              {/* 밀려나는 moment */}
              <motion.span
                className="font-mono text-6xl font-bold whitespace-nowrap text-white md:text-8xl lg:text-9xl"
                style={{ opacity: momentOpacity }}
              >
                moment
              </motion.span>
            </motion.div>

            {/* Description */}
            <motion.div
              className="mt-8 max-w-2xl space-y-4 text-left"
              style={{ opacity: contentOpacity }}
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
              style={{ opacity: contentOpacity }}
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
        </div>

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
      </div>
    </section>
  );
};

export default HeroSection;
