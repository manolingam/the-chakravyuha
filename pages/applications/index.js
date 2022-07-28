import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';

import { AllApplications } from '../../views/applications/AllApplications';

import connectMongo from '../../utils/mongoose';
import Application from '../../models/application';

export async function getServerSideProps(context) {
  await connectMongo();
  // const recordCount = await Member.find({}).count();
  const applications = await Application.find({});
  return {
    props: {
      applications: JSON.stringify(applications)
    }
  };
}

const Index = ({ applications }) => {
  const context = useContext(AppContext);

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
        <AllApplications applicationsOnLoad={JSON.parse(applications)} />
      ) : context.profileValidated ? (
        <Flex direction='column' alignItems='center' m='auto'>
          <Box fontSize='40px'>
            <i className='fa-solid fa-lock'></i>
          </Box>
          <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
            You are either not whitelisted or a member on chain.
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
