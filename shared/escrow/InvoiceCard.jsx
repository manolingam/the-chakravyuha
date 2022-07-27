import { useState, useEffect } from 'react';
import { Spinner, Text, VStack } from '@chakra-ui/react';
import { providers } from 'ethers';
import styled from '@emotion/styled';

import { InvoiceMetaDetails } from './InvoiceMetaDetails';
import { InvoicePaymentDetails } from './InvoicePaymentDetails';
import { getSmartInvoiceAddress, getRaidPartyAddress } from '../../utils/web3';
import { getInvoice } from '../../utils/requests';
import { GNOSIS_RPC } from '../../utils/constants';
import { theme } from '../../styles/theme';

const StyledCardTitle = styled(Text)`
  font-family: ${theme.fonts.rubik};
  background-color: ${theme.colors.red};
  color: ${theme.colors.black};
  padding: 1rem;
`;

export const InvoiceCard = ({ invoice_address }) => {
  const [invoice, setInvoice] = useState(null);
  const [raidPartyAddress, setRaidpartyAddress] = useState(null);

  const getSmartInvoiceData = async () => {
    let smartInvoice = await getSmartInvoiceAddress(invoice_address);
    if (smartInvoice) {
      const _invoice = await getInvoice(smartInvoice);
      setInvoice(_invoice);
      const _raidPartyAddress = await getRaidPartyAddress(_invoice.provider);
      setRaidpartyAddress(_raidPartyAddress);
    }
  };

  useEffect(() => {
    getSmartInvoiceData();
  }, []);

  return (
    <>
      <StyledCardTitle>Invoice</StyledCardTitle>
      {invoice && (
        <>
          <InvoiceMetaDetails
            invoice={invoice}
            raidPartyAddress={raidPartyAddress}
          />
          <InvoicePaymentDetails
            invoice={invoice}
            provider={new providers.JsonRpcProvider(GNOSIS_RPC)}
          />
        </>
      )}
      {!invoice && (
        <VStack alignItems='center' justifyContent='center' minH='200px'>
          <Spinner color='red' />
          <Text>Loading invoice data</Text>
        </VStack>
      )}
    </>
  );
};
