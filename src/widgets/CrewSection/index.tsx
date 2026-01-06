'use client';

import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const CrewSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 0.3, 0.7], ['-30%', '0%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.3], [-5, 0]);

  const crew = {
    Frontend: [
      'sunwoo0706',
      'hyeongrok7874',
      'yoosion030',
      'yebin0310',
      'frorong',
      'gaoooon',
      'gjaegyun',
      'h-0y28',
      'junjuny0227',
      'LeeSangHyeok0731',
    ],
    Backend: [
      'jyeonjyan',
      'siwony',
      'YangSiJun528',
      'hajeu',
      'jangwooooo',
      'snowykte0426',
      'tlsgmltjd',
      'kimkyumbi',
      'wwwcomcomcomcom',
    ],
    Design: ['iamwls', 'haonee'],
    DevOps: ['coodns'],
    Cloud: ['jueuunn7'],
  };

  return (
    <motion.section
      ref={ref}
      id="crew"
      className="flex min-h-screen items-center bg-gradient-to-b from-neutral-900 to-neutral-950 px-6 py-40 md:px-12 lg:px-24"
      style={{ opacity }}
    >
      <motion.div className="mx-auto w-full max-w-7xl" style={{ x, rotate }}>
        <motion.div
          className="mb-16 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-mono text-2xl font-bold text-white">Crew</h2>
          <motion.div
            className="h-px flex-1 bg-[#4f52e1]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </motion.div>

        <div className="space-y-16">
          {Object.entries(crew).map(([role, members], idx) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="mb-8 flex items-center gap-4">
                <motion.h3
                  className="font-mono text-xl font-bold text-[#4f52e1]"
                  whileHover={{ x: 5 }}
                >
                  {role}
                </motion.h3>
                <div className="h-px flex-1 bg-neutral-800" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {members.map((member, memberIdx) => (
                  <motion.a
                    key={member}
                    href={`https://github.com/${member}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: memberIdx * 0.05 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="group flex items-center gap-3 border border-neutral-800 bg-neutral-900 p-4 font-mono text-sm transition-colors hover:border-[#4f52e1]/50 hover:bg-neutral-900/50"
                  >
                    <motion.div
                      className="flex h-8 w-8 items-center justify-center border border-neutral-700 bg-neutral-800 text-[#4f52e1] transition-colors group-hover:border-[#4f52e1] group-hover:bg-[#4f52e1] group-hover:text-neutral-950"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                    <span className="text-neutral-400 transition-colors group-hover:text-white">
                      {member}
                    </span>
                    <motion.span
                      className="ml-auto text-[#4f52e1] opacity-0 transition-opacity group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CrewSection;
