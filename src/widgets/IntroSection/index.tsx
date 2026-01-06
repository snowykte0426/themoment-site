'use client';

import { useEffect, useRef, useState } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const IntroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [animationPhase, setAnimationPhase] = useState<
    'entering' | 'positioned' | 'typing' | 'complete'
  >('entering');
  const [typingText, setTypingText] = useState('');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);

  // 하이픈+moment 전체가 왼쪽에서 들어옴
  const containerX = useTransform(scrollYProgress, [0.05, 0.2], [-500, 0]);
  const containerOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  // 하이픈 width가 줄어들면서 왼쪽으로 퇴장
  const hyphenWidth = useTransform(scrollYProgress, [0.2, 0.28, 0.38], [200, 200, 0]);
  const hyphenOpacity = useTransform(scrollYProgress, [0.32, 0.4], [1, 0]);

  // 애니메이션 페이즈 감지
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value < 0.28) {
        setAnimationPhase('entering');
      } else if (value >= 0.28 && value < 0.4) {
        setAnimationPhase('positioned');
      } else if (value >= 0.4 && animationPhase !== 'complete') {
        setAnimationPhase('typing');
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, animationPhase]);

  // 타이핑 효과
  useEffect(() => {
    if (animationPhase !== 'typing') return;

    const targetText = '순간';
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setTypingText(targetText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setAnimationPhase('complete');
      }
    }, 200);

    return () => clearInterval(typingInterval);
  }, [animationPhase]);

  return (
    <motion.section ref={ref} className="relative bg-white" style={{ opacity: sectionOpacity }}>
      {/* Sticky 애니메이션 영역 */}
      <div className="relative h-screen">
        <div className="sticky top-0 z-10 flex h-screen items-center bg-white px-6 md:px-12 lg:px-24">
          <div className="mx-auto w-full max-w-4xl">
            {/* About 타이틀 */}
            <motion.div
              className="mb-16 flex items-center gap-4"
              style={{
                opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1]),
              }}
            >
              <motion.div
                className="h-px flex-1 origin-left bg-neutral-900"
                style={{
                  scaleX: useTransform(scrollYProgress, [0.15, 0.3], [0, 1]),
                }}
              />
              <h2 className="font-mono text-2xl font-bold text-neutral-900">About</h2>
              <motion.div
                className="h-px flex-1 origin-right bg-neutral-900"
                style={{
                  scaleX: useTransform(scrollYProgress, [0.15, 0.3], [0, 1]),
                }}
              />
            </motion.div>

            {/* 메인 타이틀 영역 */}
            <div className="relative">
              <h3 className="text-4xl leading-tight font-bold text-neutral-900 md:text-5xl lg:text-6xl">
                {/* 사용자의 - 타이핑 완료 후 나타남 */}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    animationPhase === 'complete' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  사용자의{' '}
                </motion.span>

                {/* 하이픈 + moment 컨테이너 - 왼쪽에서 함께 들어옴 */}
                <motion.span
                  className="inline-flex items-baseline"
                  style={{
                    x: containerX,
                    opacity: containerOpacity,
                  }}
                >
                  {/* 하이픈 - width가 줄어들면서 왼쪽으로 퇴장 */}
                  <motion.span
                    className="inline-flex items-center justify-end overflow-hidden"
                    style={{
                      width: hyphenWidth,
                      opacity: hyphenOpacity,
                    }}
                  >
                    <span className="text-4xl text-[#4f52e1] md:text-5xl lg:text-6xl">-</span>
                  </motion.span>

                  {/* moment → 순간 전환 영역 */}
                  <span className="relative inline-block">
                    {/* moment */}
                    <motion.span
                      className="font-mono text-[#4f52e1]"
                      animate={{
                        opacity:
                          animationPhase === 'typing' || animationPhase === 'complete' ? 0 : 1,
                        display:
                          animationPhase === 'typing' || animationPhase === 'complete'
                            ? 'none'
                            : 'inline',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      moment
                    </motion.span>

                    {/* 타이핑되는 순간 */}
                    {(animationPhase === 'typing' || animationPhase === 'complete') && (
                      <motion.span
                        className="text-[#4f52e1]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {typingText}
                        {animationPhase === 'typing' && (
                          <motion.span
                            className="ml-1 inline-block h-[0.9em] w-1 bg-[#4f52e1] align-middle"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                          />
                        )}
                      </motion.span>
                    )}
                  </span>
                </motion.span>

                {/* 을 - 타이핑 완료 후 나타남 */}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    animationPhase === 'complete' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  을
                </motion.span>
                <br />
                {/* 혁신하는데 최고의 장소 - 타이핑 완료 후 나타남 */}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    animationPhase === 'complete' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  혁신하는데 최고의 장소
                </motion.span>
              </h3>

              {/* 설명 텍스트 - 타이핑 완료 후 나타남 */}
              <motion.p
                className="mt-8 text-2xl leading-relaxed text-neutral-600"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  animationPhase === 'complete' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                본교 입학지원시스템부터 선후배를 연결해주는 서비스, 커뮤니티 서비스를 만들어요.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* 추가 콘텐츠 - 스크롤하면 보이는 영역 */}
      <div className="relative z-20 bg-white px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-4xl space-y-16">
          {/* Description */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl leading-relaxed text-neutral-700">
              우리는 가장 빠르게 트렌드를 파악하고, 새로운 기술을 도입하고 있어요.
            </p>
            <p className="text-xl leading-relaxed text-neutral-700">
              항상 새로운 비즈니스 모델에 대해 고민하고, 기술을 통해 사용자의 경험을 향상시키려
              노력해요.
            </p>
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
        </div>
      </div>
    </motion.section>
  );
};

export default IntroSection;
