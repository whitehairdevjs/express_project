import React, { useRef, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter, NextRouter } from 'next/router';

//hooks
import { useRaiseEditor } from 'react-raise-editor';

//libs
import {
  Button,
  Column,
  Form,
  Input,
  LoadingLayer,
  Row,
  Select,
  Option,
  Tab,
  ProfileUploadBox,
} from '@/_ui_libs/_index';
import { colors } from '@/libs/themes/_index';

//utils
import { moment } from '@/libs/utils/moment';
import { regEx } from '@/libs/utils/regEx';

//components
import CheckBoxs from './CheckBoxs';
import CheckModals from './CheckModals';

// interface isValuesProps {
//   profile_image_path: string;
//   name: string;
//   tel: string;
//   email: string;
//   gender: string;
//   price: string;
//   date: Date | string;
//   context: string;
//   check1: boolean;
//   chk_privacy: boolean;
//   chk_marketing: boolean;
// }

interface isValuesProps {
  profile_image_path: string;
  name: string;
  password : string;
  phone_number: string;  
  email: string;
  gender: string;  
  chk_terms_use: boolean;
  chk_privacy: boolean;
  chk_marketing: boolean;
}

//
export default function Fields() {
  const router: NextRouter = useRouter();
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isType, setIsType] = useState<'default' | 'box'>('box');

  // const [isValues, setIsValues] = useState<isValuesProps>({
  //   profile_image_path: '',
  //   name: '',
  //   tel: '',
  //   email: '',
  //   gender: '',
  //   price: '',
  //   date: new Date(),
  //   context: '',
  //   check1: false,
  //   chk_privacy: false,
  //   chk_marketing: false,
  // });

  const [isValues, setIsValues] = useState<isValuesProps>({
    profile_image_path: '',
    name: '',
    password : '',
    phone_number: '',
    email: '',
    gender: '',        
    chk_terms_use: false,
    chk_privacy: false,
    chk_marketing: false,
  });

  //
  /// 인풋 핸들러
  const handleCheckOnChange = (type: 'chk_terms_use' | 'chk_privacy' | 'chk_marketing') => {
    if (type === 'chk_terms_use') setIsValues({ ...isValues, chk_terms_use: !isValues.chk_terms_use });
    if (type === 'chk_privacy') setIsValues({ ...isValues, chk_privacy: !isValues.chk_privacy });
    if (type === 'chk_marketing') setIsValues({ ...isValues, chk_marketing: false });
  };

  //
  /// 문의하기 : 에디터
  // useRaiseEditor({
  //   state: isValues.context,
  //   ref: textRef,
  // });

  //
  /// 제출하기
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const response = await fetch('http://localhost:3001/users/save', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                userInfo: isValues,
            }
            ),
        });
        if (response.ok) {
            const resData = await response.json();
            setIsLoading(false);
            router.push({ query: { results: true } });        
        } else {
            alert('서버 응답 에러가 발생 했어요...');
            setIsLoading(false);
            console.error('서버 응답 에러:', response.statusText);
        }
    } catch (error: any) {
        alert('서버 호출 에러가 발생 했어요...');
        setIsLoading(false);
        console.error('API 호출 에러:', error.message);
    }
  };

  return (
    <>
      {isLoading && <LoadingLayer />}

      <Column gap={30}>
        {/* <Row gap={10}>
          <Tab
            onClick={() => setIsType('default')}
            txtSize={13}
            colors={{
              button: isType === 'default' ? colors.keyColor : colors.grey200,
              txt: isType === 'default' ? colors.white : colors.grey600,
            }}
          >
            인풋 기본타입
          </Tab>
          <Tab
            txtSize={13}
            colors={{
              button: isType === 'box' ? colors.keyColor : colors.grey200,
              txt: isType === 'box' ? colors.white : colors.grey600,
            }}
            onClick={() => setIsType('box')}
          >
            인풋 박스타입
          </Tab>
        </Row> */}

        <Form gap={22} onSubmit={handleOnSubmit} align="center">
          {/* ----- 프로필 사진 업로드 : ProfileUploadBox ----- */}
          <ProfileUploadBox
            size={120}
            image={isValues.profile_image_path}
            imageOnload={(result: any) => setIsValues({ ...isValues, profile_image_path: result })}
            uploadCancel={() => setIsValues({ ...isValues, profile_image_path: '' })}
          />

          {/* ----- 이름 텍스트 타입 인풋 : TextField ----- */}
          <Input label="이름" labelEdge="(필수)">
            <Input.TextField
              shape={isType}
              placeholder="이름을 입력하세요"
              type="text"
              name="name"
              value={isValues.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, name: e.target.value })
              }
            />
          </Input>

          {/* ----- 패스워드 타입 인풋 : PasswordField ----- */}
          <Input label="패스워드" labelEdge="(필수)">
            <Input.TextField
              shape={isType}
              placeholder="이름을 입력하세요"
              type="password"
              name="password"
              value={isValues.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, password: e.target.value })
              }
            />
          </Input>

          {/* ----- 연락처 타입 인풋 : PhoneNumberField ----- */}
          <Input label="연락처" labelEdge="(필수)">
            <Input.PhoneNumberField
              shape={isType}
              placeholder="연락처를 입력하세요"
              value={isValues.phone_number}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, phone_number: e.target.value })
              }
            />
          </Input>

          {/* ----- 이메일 텍스트 타입 인풋 : PhoneNumberField ----- */}
          <Input label="이메일" labelEdge="(필수)">
            <Input.TextField
              shape={isType}
              placeholder="이메일을 입력하세요"
              type="text"
              name="email"
              value={isValues.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, email: e.target.value })
              }
              error={!!isValues.email && !regEx.email.test(isValues.email)}
              errorMsg="이메일 형식으로 입력하세요"
            />
          </Input>

          {/* ----- 셀렉트 타입 인풋 : SelectBox ----- */}
          <Select label="성별">
            <Select.SelectBox
              shape={isType}
              placeholder="성별을 입력하세요"
              value={isValues.gender}
              onChange={(e) => setIsValues({ ...isValues, gender: e.target.value })}
            >
              <Option value="남성">남성</Option>
              <Option value="여성">여성</Option>
            </Select.SelectBox>
          </Select>

          {/* ----- 가격 넘버릭 타입 인풋 : NumericField ----- */}
          {/* <Input label="가격">
            <Input.NumbericField
              shape={isType}
              placeholder="가격을 입력하세요"
              name="price"
              value={isValues.price}
              onChange={(e) => setIsValues({ ...isValues, price: e.target.value })}
              edge="원"
            />
          </Input> */}

          {/* ----- 텍스트 인풋 + 켈렌더 : 날짜 선택 ----- */}
          {/* <Input label="날짜">
            <Input.DateField
              shape={isType}
              placeholder="날짜를 선택하세요"
              value={moment(isValues.date)}
              onChange={(date: any) => setIsValues({ ...isValues, date: date })}
            />
          </Input> */}

          {/* ----- 에디터 타입 인풋 : Textarea ----- */}
          {/* <Input label="내용" labelEdge="(필수)">
            <Input.Textarea
              shape={isType}
              placeholder="내용을 입력하세요"
              name="context"
              value={isValues.context}
              ref={textRef}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setIsValues({ ...isValues, context: e.target.value })
              }
              tolTip="문의 내용을 자유룝게 작성해주세요"
            />
          </Input> */}

          {/* ----- 체크박스 ----- */}
          <CheckBoxs isValues={isValues} handleCheckOnChange={handleCheckOnChange} />

          <Button
            maxWidth={520}
            bottomFixed
            type="submit"
            disabled={
              !(
                isValues.name &&
                isValues.password &&
                isValues.email &&
                isValues.phone_number &&
                // isValues.context &&
                isValues.chk_terms_use &&
                isValues.chk_privacy
              )
            }
          >
            제출
          </Button>
        </Form>
      </Column>

      {/* ----- 체크박스 모달 ----- */}
      <CheckModals dialogOnChange={() => setIsValues({ ...isValues, chk_marketing: true })} />
    </>
  );
}
