import React from 'react';
import { NextRouter, useRouter } from 'next/router';

//libs
import { Container, Section, Txt, Wrap } from '@/_ui_libs/_index';
import { MQ, colors, fontSize } from '@/libs/themes/_index';

//components
import SEO from '@/seo.config';
import LoginFields from '@/libs/components/form-fields/LoginFields';

export default function FormFields() {
  const router: NextRouter = useRouter();

  return (
    <>
      <SEO title="로그인" description="로그인 페이지" />

      <Section>
        <Container
          maxWidth={560}
          gap={22}
          padding={{ top: 240, bottom: 20, horizontal: 20 }}
          css={{ [MQ[3]]: { paddingTop: 16, paddingBottom: 0 } }}
        >
          <Wrap gap={12}>
            <Txt as="h1" size={fontSize.s24}>
              {`로그인`}
            </Txt>            
          </Wrap>          
          <LoginFields />
        </Container>
      </Section>
    </>
  );
}
