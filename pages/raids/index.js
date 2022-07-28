/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import { useContext, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import { AllRaids } from '../../views/raids/AllRaids';

import connectMongo from '../../utils/mongoose';
import Raid from '../../models/raid';

export async function getServerSideProps(context) {
  await connectMongo();
  // const recordCount = await Raid.find({ status: 'Awaiting' }).count();
  const raids = await Raid.find({ status: 'Awaiting' });
  return {
    props: {
      raids: JSON.stringify(raids)
    }
  };
}

const Index = ({ raids }) => {
  const context = useContext(AppContext);
  const [accountValidated, setAccountValidated] = useState(false);

  return (
    <Flex w='80%'>
      {!context.signerAddress && (
        <Flex direction='column' alignItems='center' m='auto'>
          <Box fontSize='40px'>
            <i className='fa-solid fa-compass'></i>
          </Box>
          <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
            Connect your wallet to enable more portals (RaidGuild Membership
            Required).
          </Text>
        </Flex>
      )}

      {context.isMember ? (
        <AllRaids raidsOnLoad={JSON.parse(raids)} />
      ) : context.profileValidated ? (
        <Flex direction='column' alignItems='center' m='auto'>
          <Box fontSize='40px'>
            <i className='fa-solid fa-lock'></i>
          </Box>
          <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
            You are not a member onchain.
          </Text>
        </Flex>
      ) : (
        context.signerAddress && (
          <Flex direction='column' alignItems='center' m='auto'>
            <Box fontSize='40px'>
              <Spinner color='red' />
            </Box>
            <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
              Validating your account type..
            </Text>
          </Flex>
        )
      )}
    </Flex>
  );
};

export default Index;
