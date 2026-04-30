import { CardTitle } from '@strapi/design-system';
import styled from 'styled-components';

export const CardItemTitle = styled(CardTitle)`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spaces[2]};

  > div:first-child {
    min-width: 0;
    flex: 1 1 auto;
    overflow: hidden;
  }

  > div:last-child {
    flex: 0 0 auto;
  }
`;

export const CardHeaderMain = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces[1]};
`;

export const CardHeaderActions = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces[1]};
  flex: 0 0 auto;
`;

export const CardHeaderText = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces[1]};
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
`;

export const TruncatedText = styled.div`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PathText = styled(TruncatedText)`
  max-width: min(220px, 34vw);
`;
