import type { Metadata } from 'next';

import { TanStackProvider } from '@/shared/lib';
import '@/shared/styles/globals.css';

export const metadata: Metadata = {
  title: 'The Moment - 학교 서비스 개발 팀',
  description:
    '학교에 필요한 서비스를 개발하는 The Moment 팀입니다. 입학지원시스템, 선후배 연결 서비스, 커뮤니티 서비스 등을 만들고 있습니다.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
