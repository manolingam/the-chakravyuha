import { Flex, Box, Text, Spinner, Image, Tooltip } from '@chakra-ui/react';
import { useContext } from 'react';

import { AppContext } from '../../context/AppContext';
import { AllConsultations } from '../../views/consultations/AllConsultations';

import connectMongo from '../../utils/mongoose';
import Consultation from '../../models/consultation';

export async function getServerSideProps(context) {
  await connectMongo();
  // const recordCount = await Consultation.find({
  //   consultation_hash: { $not: { $ne: null } }
  // }).count();
  const consultations = await Consultation.find({
    consultation_hash: { $not: { $ne: null } }
  });
  return {
    props: {
      consultations: JSON.stringify(consultations)
    }
  };
}

const Index = ({ consultations }) => {
  const context = useContext(AppContext);

  return (
    <Flex w='80%'>
      {!context.signerAddress && (
        <Flex direction='column' alignItems='center' m='auto'>
          <Image src='/assets/illustrations/map.png' alt='map' w='200px' />
          <Text
            textAlign='center'
            maxW='300px'
            fontFamily='rubik'
            mt='1rem'
            color='red'
          >
            Connect your wallet to walk through{' '}
            <Tooltip
              label='Need to be a raidguild member'
              placement='auto-start'
            >
              <i className='fa-solid fa-circle-question'></i>
            </Tooltip>
          </Text>
        </Flex>
      )}

      {context.isMember ||
      context.whitelistedAccess.includes('Consultations') ? (
        <AllConsultations consultationsOnLoad={JSON.parse(consultations)} />
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
