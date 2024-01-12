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
        <Form gap={22} onSubmit={handleOnSubmit} align="center">
          {/* ----- 이메일 텍스트 타입 인풋 : PhoneNumberField ----- */}
          <Input label="이메일">
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

          {/* ----- 패스워드 타입 인풋 : PasswordField ----- */}
          <Input label="패스워드">
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

          {/* ----- 체크박스 ----- */}
          {/* <CheckBoxs isValues={isValues} handleCheckOnChange={handleCheckOnChange} /> */}

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
