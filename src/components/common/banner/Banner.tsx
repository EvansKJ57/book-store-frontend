import { IBanner } from '@/models/banner.model';
import styled from 'styled-components';
import BannerItem from './BannerItem';
import { useMemo, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
  banners: IBanner[];
}

const Banner = ({ banners }: Props) => {
  const [curidx, setCurIdx] = useState(0);

  const transformValue = useMemo(() => {
    return curidx * -100;
  }, [curidx]);

  const handlePrev = () => {
    if (curidx === 0) {
      return setCurIdx(banners.length - 1);
    }
    setCurIdx(curidx - 1);
  };
  const handleNext = () => {
    if (curidx === banners.length - 1) {
      return setCurIdx(0);
    }
    setCurIdx(curidx + 1);
  };

  const handleIndicatorClick = (index: number) => {
    setCurIdx(index);
  };
  return (
    <BannerStyle>
      <BannerContainerStyle $transfromValue={transformValue}>
        {banners.map((banner) => (
          <BannerItem banner={banner} />
        ))}
      </BannerContainerStyle>
      <BannerButtonStyle>
        <button className="prev" onClick={handlePrev}>
          {<FaAngleLeft />}
        </button>
        <button className="next" onClick={handleNext}>
          {<FaAngleRight />}
        </button>
      </BannerButtonStyle>
      <BannerIndicatorStyle>
        {banners.map((banner, index) => (
          <span
            className={index === curidx ? 'active' : ''}
            onClick={() => handleIndicatorClick(index)}
          ></span>
        ))}
      </BannerIndicatorStyle>
    </BannerStyle>
  );
};

const BannerStyle = styled.div`
  overflow: hidden;
  position: relative;
`;

interface BannerContainerStyleProps {
  $transfromValue: number;
}
const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
  display: flex;
  transform: translateX(${(props) => props.$transfromValue}%);
  transition: transform 0.5s ease-in-out;
`;

const BannerButtonStyle = styled.div`
  button {
    border: 0;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 500px;
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    svg {
      fill: #fff;
    }
    &.prev {
      left: 10px;
    }
    &.next {
      right: 10px;
    }
  }
`;

const BannerIndicatorStyle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 100px;
    background: #fff;
    margin: 0 4px;
    cursor: pointer;

    &.active {
      background: ${({ theme }) => theme.color.primary};
    }
  }
`;

export default Banner;
