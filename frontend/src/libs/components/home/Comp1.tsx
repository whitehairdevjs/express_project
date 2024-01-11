import React from 'react';

//libs
import { BoxShadow, Column, ProfileImage, Row, Txt } from '@/_ui_libs/_index';
import { colors } from '@/libs/themes/colors';


interface DataItem {
  id: number;
  title: string;
  content: string;
  content_password: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export default function Comp1({ data } : { data : Array<DataItem> }) {
  return (          
        data.map((item: DataItem, index) => (
          <BoxShadow padding={{ all: 16 }} margin={{ bottom : 10 }}>                    
              <Row gap={12} align="center">
                <ProfileImage
                  src="https://imagedelivery.net/vJSpkH6oHM7zquolzolo7A/77550435-1cc9-4b42-4519-3cd83f149b00/public"
                  alt="템플릿"
                  size={40}
                />
                <Column gap={3}>          
                  <Txt as="strong" size={17}>
                    {item.title}
                  </Txt>          
                  
                  <Txt size={13} color={colors.grey600}>
                    {item.content}
                  </Txt>
                </Column>
              </Row>                          
          </BoxShadow>          
        ))

        // data.forEach(((item: DataItem, index)) => {

        // })
  );
}
