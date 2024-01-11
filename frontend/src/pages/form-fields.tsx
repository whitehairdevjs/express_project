import React from 'react';
import { NextRouter, useRouter } from 'next/router';

//libs
import { Container, Section, Txt, Wrap } from '@/_ui_libs/_index';
import { MQ, colors, fontSize } from '@/libs/themes/_index';

//components
import SEO from '@/seo.config';
import Fields from '@/libs/components/form-fields/Fields';
import Result from '@/libs/components/form-fields/Result';

//
export default function FormFields() {
  const router: NextRouter = useRouter();

  return (
    <>
      <SEO title="가입하기 템플릿" description="Form 개발할때 다양한 인풋들을 사용해보세요!" />

      <Section>
        <Container
          maxWidth={560}
          gap={22}
          padding={{ top: 40, bottom: 20, horizontal: 20 }}
          css={{ [MQ[3]]: { paddingTop: 16, paddingBottom: 0 } }}
        >
          <Wrap gap={12}>
            <Txt as="h1" size={fontSize.s24}>
              {router.query.results
                ? `회원가입 완료!\n다양한 서비스를 경험 해보자구요!~`
                : `회원가입\n가입 후 다양한 서비스를 경험 해보세요~`}
            </Txt>

            {/* <Txt color={colors.grey800}>
              {router.query.results
                ? `빠르게 트랜디한 UI를 만들어보세요\n당신의 개발 효율이 압도적으로 오를 거에요`
                : `다양한 페이지 및 상황에 필요한 인풋들을\n누구나 쉽게 사용할 수 있도록 만들어뒀어요!`}
            </Txt> */}
          </Wrap>

          {router.query.results ? <Result /> : <Fields />}
        </Container>
      </Section>
    </>
  );
}
