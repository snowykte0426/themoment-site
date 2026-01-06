'use client';

import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const ValuesSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const values = [
    {
      type: 'Professional',
      title: '전문성을 갖춘 인재.',
      description: '자신의 분야에서 최고가 되기 위해\n끊임없이 학습하고 역량을 키우는 인재',
      tags: ['#넘치는책임감', '#끊임없이노력하는'],
    },
    {
      type: 'Communication',
      title: '소통하고 협력하는 인재.',
      description: '열린태도와 신뢰를 바탕으로\n서로를 존중하고 협력하는 인재',
      tags: ['#수평적인문화', '#존중은편견없이'],
    },
    {
      type: 'Passion',
      title: '열정적으로 도전하는 인재.',
      description: '창의적 사고로 변화와 도전을\n두려워 하지 않는 열정적인 인재',
      tags: ['#도전은누구나', '#열정은힘이다'],
    },
  ];

  // 각 아이템의 opacity와 y position을 스크롤 진행도에 따라 계산
  const getItemTransform = (index: number) => {
    const start = index * 0.25;
    const end = start + 0.25;

    const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);

    // 부드러운 페이드와 약간의 수직 이동
    const y = useTransform(
      scrollYProgress,
      [start, start + 0.15, end - 0.15, end],
      [20, 0, 0, -20]
    );

    const scale = useTransform(scrollYProgress, [start, start + 0.12, end - 0.12, end], [0.95, 1, 1, 0.95]);

    return { opacity, y, scale };
  };

  return (
    <section ref={ref} id="values" className="relative bg-gradient-to-b from-neutral-950 to-neutral-900" style={{ height: '400vh' }}>
      {/* 고정된 컨테이너 */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-7xl">
          {/* 제목 */}
          <motion.div
            className="absolute left-6 top-20 md:left-12 lg:left-24"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
            }}
          >
            <h2 className="font-mono text-2xl font-bold text-white">What we want</h2>
            <motion.div
              className="mt-2 h-px w-32 bg-[#4f52e1]"
              style={{
                scaleX: useTransform(scrollYProgress, [0, 0.15], [0, 1]),
              }}
            />
          </motion.div>

          {/* 인재상 콘텐츠 */}
          <div className="relative flex items-center justify-center">
            {values.map((value, index) => {
              const { opacity, y, scale } = getItemTransform(index);

              return (
                <motion.div
                  key={index}
                  className="absolute flex max-w-4xl flex-col items-center text-center"
                  style={{ opacity, y, scale }}
                >
                  <motion.p className="mb-6 font-mono text-sm tracking-widest text-[#4f52e1]">
                    {value.type}
                  </motion.p>

                  <h3 className="mb-12 text-5xl font-bold leading-tight text-white md:text-7xl">
                    {value.title}
                  </h3>

                  <p className="mb-16 whitespace-pre-line text-2xl font-light leading-relaxed text-neutral-400 md:text-3xl">
                    {value.description}
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    {value.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full border border-neutral-700 bg-neutral-800/50 px-6 py-2 font-mono text-sm text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 진행도 표시 */}
          <motion.div
            className="absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-2"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
            }}
          >
            {values.map((_, index) => {
              const isActive = useTransform(
                scrollYProgress,
                [index * 0.25, (index + 1) * 0.25],
                [0, 1]
              );

              return (
                <motion.div
                  key={index}
                  className="h-1 w-12 bg-neutral-700"
                  style={{
                    backgroundColor: useTransform(isActive, [0, 0.5, 1], ['#404040', '#4f52e1', '#4f52e1']),
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;