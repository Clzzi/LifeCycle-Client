import { dragNone } from 'src/core/styles/styleMoudle';
import ResumeUtil from 'src/core/utils/resume';
import { pxToRem } from 'src/core/utils/style';
import styled from '@emotion/styled';

const Banner = () => {
  return (
    <StyledBanner data-cy="banner">
      <Wrapper>
        <Title>
          ๐ ํซํ ๋์๊ณ ์ธ <br />
          ์ฌ๊ธฐ ๋ค๋ชจ์๋ค!
        </Title>
        <Desc>
          ๊ฐ๋ฐ์์ ๊ธฐ๋ณธ์ธ ํฌํธํด๋ฆฌ์ค, <br />
          ์ ๋ฐฐ๋ถํฐ ํ๋ฐฐ๊น์ง ๋ชจ๋  ๋์๊ณ ์ธ์ ํฌํธํด๋ฆฌ์ค๋ฅผ ๋ชจ์์ต๋๋ค.
          <br />
          ๋ชจ๋๊ฐ ์์ฐจ๊ณ  ์ ๋ฌ๋ ฅ์๋ ํฌํธํด๋ฆฌ์ค๋ฅผ ๊ฐ์ง๋ ๊ทธ๋ ๊น์ง!
        </Desc>
      </Wrapper>
    </StyledBanner>
  );
};

export default Banner;

const StyledBanner = styled.aside`
  ${dragNone};
  width: 100vw;
  height: 256px;
  min-height: 166px;
  background-image: ${() =>
    `url(${ResumeUtil.makeS3Url('/assets/Banner.svg')})`};
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  margin: -4px 0px 32px 0px;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.medias.smallDesktop} {
    height: 196px;
    margin: -4px 0px 12px 0px;
  }

  ${({ theme }) => theme.medias.mobile} {
    height: 166px;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  max-width: 1920px;
  height: 256px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: start;
  align-items: center;
  vertical-align: middle;
  padding: 0 215px;

  ${({ theme }) => theme.medias.smallDesktop} {
    padding: 0px 113px;
  }

  ${({ theme }) => theme.medias.mobile} {
    padding: 0px 38px;
  }
`;

const Title = styled.div`
  font-size: ${pxToRem(43)};
  color: ${({ theme }) => theme.colors.White900};
  line-height: 62px;
  font-weight: bolder;
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.Main1};
  text-decoration-thickness: 16px;
  text-underline-offset: -13px;
  display: inline-block;
  margin-right: 48px;
  white-space: nowrap;
  ${({ theme }) => theme.medias.smallDesktop} {
    font-size: ${pxToRem(34)};
    line-height: 42px;
    margin-right: 36px;
  }

  ${({ theme }) => theme.medias.mobile} {
    font-size: ${({ theme }) => theme.fonts.font28};
    line-height: 40px;
    margin-right: 24px;
  }
`;

const Desc = styled.div`
  display: inline-block;
  font-size: ${({ theme }) => theme.fonts.font15};
  line-height: 22px;
  font-weight: 400;
  color: #e3e6ed;
  white-space: nowrap;
  ${({ theme }) => theme.medias.smallDesktop} {
    font-size: ${({ theme }) => theme.fonts.font14};
    line-height: 22px;
  }

  ${({ theme }) => theme.medias.mobile} {
    font-size: ${({ theme }) => theme.fonts.font12};
    line-height: 20px;
  }
`;
