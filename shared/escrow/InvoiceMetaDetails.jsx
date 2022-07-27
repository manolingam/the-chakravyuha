import { Box, HStack, Text, Tooltip } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../../styles/theme';

const StyledCardTitle = styled(Text)`
  font-family: ${theme.fonts.rubik};
  background-color: ${theme.colors.red};
  color: ${theme.colors.black};
  padding: 1rem;
`;

export const InvoiceMetaDetails = ({ invoice, raidPartyAddress }) => {
  return (
    <Box px='.5rem'>
      <HStack mb='.5rem' mt='2rem' justifyContent='space-between' fontSize='sm'>
        <Text fontWeight='bold' fontFamily='jetbrains'>
          Safety Valve Date:
        </Text>
        <HStack>
          <Text>{new Date(invoice.terminationTime * 1000).toDateString()}</Text>
          <Tooltip
            label='The funds can be withdrawn by the client after 00:00:00 GMT on this date'
            placement='auto-start'
          >
            <i className='fa-solid fa-circle-question'></i>
          </Tooltip>
        </HStack>
      </HStack>
      <HStack mb='.5rem' justifyContent='space-between' fontSize='sm'>
        <Text fontWeight='bold' fontFamily='jetbrains'>
          Client:
        </Text>
        <Text>{invoice.client}</Text>
      </HStack>
      <HStack mb='.5rem' justifyContent='space-between' fontSize='sm'>
        <Text fontWeight='bold' fontFamily='jetbrains'>
          Raid Party:
        </Text>
        <Text>{raidPartyAddress}</Text>
      </HStack>
      <HStack mb='.5rem' justifyContent='space-between' fontSize='sm'>
        <Text fontWeight='bold' fontFamily='jetbrains'>
          Resolver:
        </Text>
        <Text>{invoice.resolver}</Text>
      </HStack>
    </Box>
  );
};
