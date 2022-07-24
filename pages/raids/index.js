import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import { connectToDatabase } from '../../utils/mongo';
import { validateMembership } from '../../utils/web3';
import { Raids } from '../../views/Raids';

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const raids = await db
    .collection('raids')
    .aggregate([{ $match: { status: 'Awaiting' } }])
    .toArray();
  return {
    props: {
      raids: JSON.stringify(raids)
    }
  };
}

const Index = ({ raids }) => {
  const context = useContext(AppContext);
  const [accountValidated, setAccountValidated] = useState(false);

  const checkMembership = async () => {
    const isMember = await validateMembership(context.signerAddress);
    context.setWeb3Data({ isMember });
    setAccountValidated(true);
  };

  useEffect(() => {
    context.signerAddress && checkMembership();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.signerAddress]);

  return (
    <Flex w='80%'>
      {!context.signerAddress && (
        <Flex direction='column' alignItems='center' m='auto' color='white'>
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
        <Raids raids={JSON.parse(raids)} />
      ) : accountValidated ? (
        <Flex direction='column' alignItems='center' m='auto' color='white'>
          <Box fontSize='40px'>
            <i className='fa-solid fa-lock'></i>
          </Box>
          <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
            You are not a member
          </Text>
        </Flex>
      ) : (
        context.signerAddress && (
          <Flex direction='column' alignItems='center' m='auto' color='white'>
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
