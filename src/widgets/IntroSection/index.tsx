'use client';

import { useEffect, useRef, useState } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const IntroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [typingText, setTypingText] = useState('moment');
  const [isTypingForward, setIsTypingForward] = useState(false);
  const [isTypingBackward, setIsTypingBackward] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // ===== 1단계: 등장 (0.05-0.2) =====
  // 하이픈 + moment 컨테이너가 왼쪽 바깥에 위치
  const containerX = useTransform(scrollYProgress, [0, 1], [-300, -300]);

  // 하이픈이 0 → 300px로 늘어나며 moment를 밀어냄
  const hyphenWidth = useTransform(scrollYProgress, [0.05, 0.2, 0.38, 0.43], [0, 300, 300, 0]);

  // moment가 하이픈에 밀려서 이동 (하이픈 늘어남 + 컨테이너 이동)
  // 0.05: -300px (화면 밖), 0.2: 0px (도착)
  const momentX = useTransform(scrollYProgress, [0.05, 0.2], [-300, 0]);

  // ===== 2단계: 도착 (0.2-0.3) =====
  // momentX는 0.2에서 0에 도달, "사용자의 " 다음 위치에 정확히 도착

  // ===== 3단계: 타이핑 효과 (0.3-0.38) =====
  // 타이핑은 useEffect에서 scrollYProgress 0.3에 트리거됨

  // ===== 4단계: 하이픈 퇴장 (0.38-0.43) =====
  // 하이픈이 300 → 0으로 줄어들며 사라짐
  // hyphenWidth는 0.38에서 300, 0.43에서 0

  // ===== 5단계: 문장 완성 (0.43+) =====
  const showSentence = useTransform(scrollYProgress, (value) => (value >= 0.43 ? 1 : 0));

  // 전체 컨테이너 페이드인
  const containerOpacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);

  // 하이픈 opacity
  const hyphenOpacity = useTransform(scrollYProgress, [0.05, 0.08, 0.42, 0.44], [0, 1, 1, 0]);

  // About 섹션
  const aboutOpacity = useTransform(scrollYProgress, [0.03, 0.1], [0, 1]);
  const aboutLineScale = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  // ===== 6단계: 추가 정보 (0.5+) =====
  const descriptionOpacity = useTransform(scrollYProgress, [0.5, 0.57], [0, 1]);
  const descriptionY = useTransform(scrollYProgress, [0.5, 0.57], [30, 0]);

  const statsOpacity = useTransform(scrollYProgress, [0.6, 0.67], [0, 1]);
  const statsY = useTransform(scrollYProgress, [0.6, 0.67], [30, 0]);

  const teamInfoOpacity = useTransform(scrollYProgress, [0.7, 0.77], [0, 1]);
  const teamInfoY = useTransform(scrollYProgress, [0.7, 0.77], [30, 0]);

  // 타이핑 트리거
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      // 3단계: 0.3에서 타이핑 시작
      if (value >= 0.3 && typingText === 'moment' && !isTypingForward) {
        setIsTypingForward(true);
      }

      // 역방향 스크롤 시
      if (value < 0.28 && typingText === '순간' && !isTypingBackward) {
        setIsTypingBackward(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, typingText, isTypingForward, isTypingBackward]);

  // moment → 순간 타이핑
  useEffect(() => {
    if (!isTypingForward) return;

    let currentText = 'moment';
    let timeoutId: NodeJS.Timeout;

    // 타이핑 시작 전 짧은 대기
    timeoutId = setTimeout(() => {
      const deleteChar = () => {
        if (currentText.length > 0) {
          currentText = currentText.slice(0, -1);
          setTypingText(currentText || '|');
          timeoutId = setTimeout(deleteChar, 60);
        } else {
          // 삭제 완료 후 짧은 대기
          timeoutId = setTimeout(() => {
            let idx = 0;
            const targetText = '순간';
            const typeChar = () => {
              if (idx <= targetText.length) {
                setTypingText(targetText.slice(0, idx) || '|');
                idx++;
                timeoutId = setTimeout(typeChar, 150);
              } else {
                setTypingText('순간');
                setIsTypingForward(false);
              }
            };
            typeChar();
          }, 200);
        }
      };
      deleteChar();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [isTypingForward]);

  // 순간 → moment 타이핑 (역방향)
  useEffect(() => {
    if (!isTypingBackward) return;

    let currentText = '순간';
    let timeoutId: NodeJS.Timeout;

    // 타이핑 시작 전 짧은 대기
    timeoutId = setTimeout(() => {
      const deleteChar = () => {
        if (currentText.length > 0) {
          currentText = currentText.slice(0, -1);
          setTypingText(currentText || '|');
          timeoutId = setTimeout(deleteChar, 80);
        } else {
          // 삭제 완료 후 짧은 대기
          timeoutId = setTimeout(() => {
            let idx = 0;
            const targetText = 'moment';
            const typeChar = () => {
              if (idx <= targetText.length) {
                setTypingText(targetText.slice(0, idx) || '|');
                idx++;
                timeoutId = setTimeout(typeChar, 100);
              } else {
                setTypingText('moment');
                setIsTypingBackward(false);
              }
            };
            typeChar();
          }, 200);
        }
      };
      deleteChar();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [isTypingBackward]);

  return (
    <section ref={ref} className="relative bg-white" style={{ height: '400vh' }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-12 lg:px-24">
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

          <div className="relative">
            <h3 className="text-4xl leading-tight font-bold text-neutral-900 md:text-5xl lg:text-6xl">
              <motion.span style={{ opacity: showSentence }}>사용자의 </motion.span>

              {/* 하이픈 + moment - 왼쪽에서 등장하면서 하이픈 늘어나며 moment 밀림 */}
              <motion.span
                className="inline-flex items-baseline"
                style={{ opacity: containerOpacity, x: containerX }}
              >
                {/* 하이픈 - origin-left로 왼쪽 끝 고정, 오른쪽으로 늘어남 */}
                <motion.span
                  className="inline-block h-1 origin-left self-center bg-[#4f52e1] md:h-1.5"
                  style={{
                    width: hyphenWidth,
                    opacity: hyphenOpacity,
                  }}
                />
              </motion.span>

              {/* moment/순간 - 하이픈에 밀려서 이동, 하이픈 퇴장 시 제자리 고정 */}
              <motion.span
                className={`${typingText === 'moment' || typingText.length > 2 ? 'font-mono' : ''} text-4xl font-bold text-[#4f52e1] md:text-5xl lg:text-6xl`}
                style={{ x: momentX, opacity: containerOpacity }}
              >
                {typingText === '|' ? (
                  <span className="inline-block h-[0.9em] w-1 animate-pulse bg-[#4f52e1] align-middle" />
                ) : (
                  <>
                    {typingText}
                    {(isTypingForward || isTypingBackward) && (
                      <span className="ml-0.5 inline-block h-[0.9em] w-1 animate-pulse bg-[#4f52e1] align-middle" />
                    )}
                  </>
                )}
              </motion.span>

              <motion.span style={{ opacity: showSentence }}>을</motion.span>
              <br />
              <motion.span style={{ opacity: showSentence }}>혁신하는데 최고의 장소</motion.span>
            </h3>

            <motion.p
              className="mt-6 text-xl leading-relaxed text-neutral-600"
              style={{ opacity: showSentence }}
            >
              본교 입학지원시스템부터 선후배를 연결해주는 서비스, 커뮤니티 서비스를 만들어요.
            </motion.p>
          </div>

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
