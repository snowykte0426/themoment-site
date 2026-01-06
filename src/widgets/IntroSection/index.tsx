'use client';

import { useEffect, useRef, useState } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const IntroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [animationPhase, setAnimationPhase] = useState<'entering' | 'typing' | 'complete'>(
    'entering',
  );
  const [typingText, setTypingText] = useState('');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // 하이픈+moment 컨테이너가 왼쪽 화면 밖에서 올바른 위치까지 이동
  // 하이픈 끝에 moment가 붙어있음
  const containerX = useTransform(scrollYProgress, [0, 0.03, 0.15], [-400, -400, 0]);
  const containerOpacity = useTransform(scrollYProgress, [0.03, 0.06], [0, 1]);

  // 하이픈이 왼쪽으로 줄어들며 퇴장 (moment가 도착한 후)
  const hyphenWidth = useTransform(scrollYProgress, [0.15, 0.22], [300, 0]);
  const hyphenOpacity = useTransform(scrollYProgress, [0.2, 0.24], [1, 0]);

  // About 타이틀
  const aboutOpacity = useTransform(scrollYProgress, [0.03, 0.1], [0, 1]);
  const aboutLineScale = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  // 추가 콘텐츠 나타나는 타이밍 (타이핑 완료 후)
  const descriptionOpacity = useTransform(scrollYProgress, [0.4, 0.47], [0, 1]);
  const descriptionY = useTransform(scrollYProgress, [0.4, 0.47], [30, 0]);

  const statsOpacity = useTransform(scrollYProgress, [0.5, 0.57], [0, 1]);
  const statsY = useTransform(scrollYProgress, [0.5, 0.57], [30, 0]);

  const teamInfoOpacity = useTransform(scrollYProgress, [0.6, 0.67], [0, 1]);
  const teamInfoY = useTransform(scrollYProgress, [0.6, 0.67], [30, 0]);

  // 애니메이션 페이즈 감지 (스크롤 되감기 지원)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value < 0.24) {
        setAnimationPhase('entering');
        setTypingText('');
      } else if (value >= 0.24 && value < 0.35) {
        if (animationPhase === 'entering') {
          setAnimationPhase('typing');
        }
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
    }, 150);

    return () => clearInterval(typingInterval);
  }, [animationPhase]);

  return (
    <section ref={ref} className="relative bg-white" style={{ height: '400vh' }}>
      {/* Sticky 컨테이너 */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-4xl">
          {/* About 타이틀 */}
          <motion.div className="mb-12 flex items-center gap-4" style={{ opacity: aboutOpacity }}>
            <motion.div
              className="h-px flex-1 origin-left bg-neutral-900"
              style={{ scaleX: aboutLineScale }}
            />
            <h2 className="font-mono text-2xl font-bold text-neutral-900">About</h2>
            <motion.div
              className="h-px flex-1 origin-right bg-neutral-900"
              style={{ scaleX: aboutLineScale }}
            />
          </motion.div>

          {/* 메인 타이틀 영역 */}
          <div className="relative">
            <h3 className="text-4xl leading-tight font-bold text-neutral-900 md:text-5xl lg:text-6xl">
              {/* 사용자의 - 타이핑 완료 후 나타남 */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={animationPhase === 'complete' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                사용자의{' '}
              </motion.span>

              <motion.span
                className="inline-flex items-baseline"
                style={{
                  x: containerX,
                  opacity: containerOpacity,
                }}
              >
                <motion.span
                  className="mb-1 inline-block h-0.75 self-end bg-[#4f52e1] md:h-1 lg:h-1.25"
                  style={{
                    width: hyphenWidth,
                    opacity: hyphenOpacity,
                  }}
                />

                <span className="inline-block">
                  {/* moment */}
                  {animationPhase === 'entering' && (
                    <span className="font-mono text-4xl font-bold text-[#4f52e1] md:text-5xl lg:text-6xl">
                      moment
                    </span>
                  )}

                  {(animationPhase === 'typing' || animationPhase === 'complete') && (
                    <motion.span
                      className="text-4xl font-bold text-[#4f52e1] md:text-5xl lg:text-6xl"
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
                initial={{ opacity: 0 }}
                animate={animationPhase === 'complete' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                을
              </motion.span>
              <br />
              {/* 혁신하는데 최고의 장소 - 타이핑 완료 후 나타남 */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={animationPhase === 'complete' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                혁신하는데 최고의 장소
              </motion.span>
            </h3>

            {/* 설명 텍스트 - 타이핑 완료 후 나타남 */}
            <motion.p
              className="mt-6 text-xl leading-relaxed text-neutral-600"
              initial={{ opacity: 0 }}
              animate={animationPhase === 'complete' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              본교 입학지원시스템부터 선후배를 연결해주는 서비스, 커뮤니티 서비스를 만들어요.
            </motion.p>
          </div>

          {/* Description - 스크롤에 따라 나타남 */}
          <motion.div
            className="mt-10 space-y-4"
            style={{ opacity: descriptionOpacity, y: descriptionY }}
          >
            <p className="text-lg leading-relaxed text-neutral-700">
              우리는 가장 빠르게 트렌드를 파악하고, 새로운 기술을 도입하고 있어요.
            </p>
            <p className="text-lg leading-relaxed text-neutral-700">
              항상 새로운 비즈니스 모델에 대해 고민하고, 기술을 통해 사용자의 경험을 향상시키려
              노력해요.
            </p>
          </motion.div>

          {/* Stats - 스크롤에 따라 나타남 */}
          <motion.div
            className="mt-12 grid grid-cols-3 gap-8 border-y border-neutral-200 py-10"
            style={{ opacity: statsOpacity, y: statsY }}
          >
            <div className="text-center">
              <p className="mb-1 font-mono text-4xl font-bold text-neutral-900">30+</p>
              <p className="text-sm text-neutral-600">팀 크루</p>
            </div>
            <div className="text-center">
              <p className="mb-1 font-mono text-4xl font-bold text-neutral-900">10+</p>
              <p className="text-sm text-neutral-600">서비스</p>
            </div>
            <div className="text-center">
              <p className="mb-1 font-mono text-4xl font-bold text-neutral-900">5</p>
              <p className="text-sm text-neutral-600">년차</p>
            </div>
          </motion.div>

          {/* Team Info - 스크롤에 따라 나타남 */}
          <motion.div
            className="mt-10 space-y-6"
            style={{ opacity: teamInfoOpacity, y: teamInfoY }}
          >
            <h3 className="text-2xl font-bold text-neutral-900">Team Info</h3>
            <div className="space-y-3">
              {[
                '우리는 30명 정도의 재학생 / 졸업생 크루가 함께 팀을 운영하고 있어요.',
                '우리는 하고 싶은게 있을 때 항상 크루들과 함께 하려고 해요.',
                '여러개의 서비스를 만들지 않고, 소수의 서비스에 오너쉽을 갖고 몰입해서 개발해요.',
                '열정적인 재학생 크루들과 교육, 성장에 관심이 많은 졸업생 크루들이 있어요.',
              ].map((text, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="mt-1 font-mono text-neutral-400">—</span>
                  <p className="flex-1 text-base leading-relaxed text-neutral-700">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
