import {
  IconButton as BaseIconButton,
  IconButtonGroup,
  Flex,
  Tooltip,
  Typography,
} from '@strapi/design-system';
import { FC, MutableRefObject, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import { getTrad } from '../../../../../translations';
import { VoidEffect } from '../../../../../types';
import { usePluginMediaQuery } from '../../../hooks';
import DragButton from '../../DragButton';
import { ItemCardBadge } from '../ItemCardBadge';
import {
  CardHeaderActions,
  CardHeaderMain,
  CardHeaderText,
  CardItemTitle,
  PathText,
  TruncatedText,
} from './Wrapper';
import { eyeIcon, pencilIcon, arrowClockwise, trashIcon } from './icons';

interface IProps {
  title: string;
  path?: string;
  icon: ReactNode;
  removed?: boolean;
  canUpdate: boolean;
  onItemRemove: VoidEffect;
  onItemEdit: VoidEffect;
  onItemRestore: VoidEffect;
  dragRef: MutableRefObject<HTMLHeadingElement>;
  menuAttached: boolean;
  isSearchActive?: boolean;
}

export const ItemCardHeader: FC<IProps> = ({
  title,
  path,
  icon,
  removed,
  canUpdate,
  onItemRemove,
  onItemEdit,
  onItemRestore,
  dragRef,
  menuAttached,
  isSearchActive,
}) => {
  const { formatMessage } = useIntl();

  const { isSmallMobile } = usePluginMediaQuery();

  return (
    <CardItemTitle>
      <CardHeaderMain>
        {canUpdate && <DragButton ref={dragRef} isActive={isSearchActive} />}
        <CardHeaderText>
          <TruncatedText title={title}>
            <Typography
              variant="omega"
              fontWeight="bold"
              fontSize={isSmallMobile ? '12px' : '14px'}
              ellipsis
            >
              {title}
            </Typography>
          </TruncatedText>
          {path && (
            <Tooltip description={path}>
              <PathText>
                <Typography
                  variant="omega"
                  fontWeight="bold"
                  textColor="neutral500"
                  fontSize={isSmallMobile ? '12px' : '14px'}
                  ellipsis
                >
                  {path}
                </Typography>
              </PathText>
            </Tooltip>
          )}
        </CardHeaderText>
        <Flex>{icon}</Flex>
      </CardHeaderMain>
      <CardHeaderActions>
        <ItemCardBadge
          borderColor={menuAttached ? 'success200' : 'neutral200'}
          backgroundColor={menuAttached ? 'success100' : 'neutral100'}
          textColor={menuAttached ? 'success600' : 'neutral600'}
          small
        >
          {formatMessage(
            getTrad(`components.navigationItem.badge.${menuAttached ? 'attached' : 'notAttached'}`)
          )}
        </ItemCardBadge>
        {removed && (
          <ItemCardBadge borderColor="danger200" backgroundColor="danger100" textColor="danger600">
            {formatMessage(getTrad('components.navigationItem.badge.removed'))}
          </ItemCardBadge>
        )}
        <IconButtonGroup>
          <IconButton
            $isActive={isSearchActive}
            disabled={removed}
            onClick={onItemEdit}
            label={formatMessage(
              getTrad(
                `components.navigationItem.action.${canUpdate ? 'edit' : 'view'}`,
                canUpdate ? 'Edit' : 'View'
              )
            )}
            children={canUpdate ? pencilIcon : eyeIcon}
            $isMobile={isSmallMobile}
          />
          {canUpdate && (
            <>
              {removed ? (
                <IconButton
                  $isActive={isSearchActive}
                  onClick={onItemRestore}
                  label={formatMessage(
                    getTrad('components.navigationItem.action.restore', 'Restore')
                  )}
                  variant="success-light"
                  children={arrowClockwise}
                  $isMobile={isSmallMobile}
                />
              ) : (
                <IconButton
                  $isActive={isSearchActive}
                  onClick={onItemRemove}
                  variant="danger-light"
                  label={formatMessage(
                    getTrad('components.navigationItem.action.remove', 'Remove')
                  )}
                  children={trashIcon}
                  $isMobile={isSmallMobile}
                />
              )}
            </>
          )}
        </IconButtonGroup>
      </CardHeaderActions>
    </CardItemTitle>
  );
};

const IconButton = styled(BaseIconButton)<{ $isActive?: boolean; $isMobile?: boolean }>`
  transition: background-color 0.3s ease-in;
  ${({ $isActive, theme }) => ($isActive ? `background-color: ${theme.colors.neutral150} ;` : '')}
  height: ${({ $isMobile }) => ($isMobile ? '24px' : '32px')};
  width: ${({ $isMobile }) => ($isMobile ? '24px' : '32px')};
  padding: ${({ $isMobile, theme }) => ($isMobile ? theme.spaces[1] : theme.spaces[2])};
`;
