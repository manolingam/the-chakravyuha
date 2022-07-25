import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';

import { validateMembership } from '../../utils/web3';
import { AllMembers } from '../../views/members/AllMembers';

import connectMongo from '../../utils/mongoose';
import Member from '../../models/member';

export async function getServerSideProps(context) {
  await connectMongo();
  // const recordCount = await Member.find({}).count();
  const members = await Member.find({});
  return {
    props: {
      members: JSON.stringify(members)
    }
  };
}

const Index = ({ members }) => {
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
        <AllMembers membersOnLoad={JSON.parse(members)} />
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
