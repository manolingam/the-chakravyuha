import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import { getAllBids } from '../../utils/requests';
import { Bids } from '../../views/Bids';

export async function getServerSideProps(context) {
  const bids = await getAllBids();
  return {
    props: {
      bids
    }
  };
}

const Index = ({ bids }) => {
  const context = useContext(AppContext);

  return (
    <Flex w='80%'>
      <Bids bids={bids} />
    </Flex>
  );
};

export default Index;
