'use client';

import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const IntroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // 전환 효과를 위한 별도 스크롤 트래킹
  const { scrollYProgress: transitionProgress } = useScroll({
    target: transitionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.85], [0, 1, 1, 0]);

  // 하이픈 확대 애니메이션
  const hyphenScaleX = useTransform(transitionProgress, [0, 0.3, 0.7, 1], [1, 1, 50, 200]);
  const hyphenScaleY = useTransform(transitionProgress, [0, 0.3, 0.7, 1], [1, 1, 30, 100]);
  const hyphenOpacity = useTransform(transitionProgress, [0, 0.2, 0.5, 0.9], [0, 1, 1, 1]);
  const textOpacity = useTransform(transitionProgress, [0, 0.2, 0.5, 0.7], [0, 1, 1, 0]);
  const textScale = useTransform(transitionProgress, [0, 0.2, 0.5, 0.7], [0.9, 1, 1, 1.1]);

  return (
    <>
      <motion.section
        ref={ref}
        className="relative min-h-screen bg-white px-6 py-40 md:px-12 lg:px-24"
        style={{ opacity }}
      >
        <motion.div className="mx-auto w-full max-w-4xl space-y-24">
          {/* Title */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="h-px flex-1 bg-neutral-900"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <h2 className="font-mono text-2xl font-bold text-neutral-900">About</h2>
            <motion.div
              className="h-px flex-1 bg-neutral-900"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="space-y-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <h3 className="text-5xl leading-tight font-bold text-neutral-900 md:text-6xl">
                학교에 필요한 서비스를
                <br />
                함께 만들어갑니다
              </h3>
              <p className="text-2xl leading-relaxed text-neutral-600">
                본교 입학지원시스템부터 선후배를 연결해주는 서비스, 커뮤니티 서비스를 만들어요.
              </p>
            </div>

            <div className="space-y-8">
              <p className="text-xl leading-relaxed text-neutral-700">
                우리는 가장 빠르게 트렌드를 파악하고, 새로운 기술을 도입하고 있어요.
              </p>
              <p className="text-xl leading-relaxed text-neutral-700">
                항상 새로운 비즈니스 모델에 대해 고민하고, 기술을 통해 사용자의 경험을 향상시키려
                노력해요.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 border-y border-neutral-200 py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <p className="mb-2 font-mono text-5xl font-bold text-neutral-900">30+</p>
              <p className="text-sm text-neutral-600">팀 크루</p>
            </div>
            <div className="text-center">
              <p className="mb-2 font-mono text-5xl font-bold text-neutral-900">10+</p>
              <p className="text-sm text-neutral-600">서비스</p>
            </div>
            <div className="text-center">
              <p className="mb-2 font-mono text-5xl font-bold text-neutral-900">5</p>
              <p className="text-sm text-neutral-600">년차</p>
            </div>
          </motion.div>

          {/* Team Info */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-neutral-900">Team Info</h3>
            <div className="space-y-6">
              {[
                '우리는 30명 정도의 재학생 / 졸업생 크루가 함께 팀을 운영하고 있어요.',
                '우리는 하고 싶은게 있을 때 항상 크루들과 함께 하려고 해요.',
                '여러개의 서비스를 만들지 않고, 소수의 서비스에 오너쉽을 갖고 몰입해서 개발해요.',
                '열정적인 재학생 크루들과 교육, 성장에 관심이 많은 졸업생 크루들이 있어요.',
              ].map((text, idx) => (
                <motion.div
                  key={idx}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <span className="mt-2 font-mono text-neutral-400">—</span>
                  <p className="flex-1 text-lg leading-relaxed text-neutral-700">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 전환 효과 섹션 - 하이픈 확대 */}
      <div ref={transitionRef} className="relative bg-white" style={{ height: '150vh' }}>
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          {/* 배경 - 하이픈이 확대되면서 채워짐 */}
          <motion.div
            className="absolute inset-0 z-0 bg-neutral-950"
            style={{
              opacity: useTransform(transitionProgress, [0.4, 0.7], [0, 1]),
            }}
          />

          {/* team.the-moment 텍스트 */}
          <motion.div
            className="relative z-10 flex items-center justify-center"
            style={{
              opacity: textOpacity,
              scale: textScale,
            }}
          >
            <span className="font-mono text-4xl font-bold text-neutral-900 md:text-6xl lg:text-7xl">
              team
            </span>
            <span className="font-mono text-4xl font-bold text-neutral-900 md:text-6xl lg:text-7xl">
              .
            </span>
            <span className="font-mono text-4xl font-bold text-neutral-900 md:text-6xl lg:text-7xl">
              the
            </span>
            {/* 확대되는 하이픈 */}
            <motion.span
              className="mx-1 inline-block origin-center font-mono text-4xl font-bold text-neutral-900 md:text-6xl lg:text-7xl"
              style={{
                scaleX: hyphenScaleX,
                scaleY: hyphenScaleY,
                opacity: hyphenOpacity,
                backgroundColor: useTransform(
                  transitionProgress,
                  [0.3, 0.5],
                  ['transparent', '#0a0a0a'],
                ),
                color: useTransform(transitionProgress, [0.3, 0.5], ['#171717', '#0a0a0a']),
              }}
            >
              -
            </motion.span>
            <span className="font-mono text-4xl font-bold text-neutral-900 md:text-6xl lg:text-7xl">
              moment
            </span>
          </motion.div>

          {/* 페이드인 되는 안내 텍스트 */}
          <motion.p
            className="absolute bottom-32 font-mono text-sm tracking-widest text-neutral-500"
            style={{
              opacity: useTransform(transitionProgress, [0.2, 0.4, 0.6, 0.7], [0, 1, 1, 0]),
            }}
          >
            SCROLL TO EXPLORE
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default IntroSection;
