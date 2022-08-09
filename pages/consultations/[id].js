/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Text, Spinner, Image, Tooltip } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import { Consultation } from '../../views/consultations/Consultation';
import { Page404 } from '../../shared/404';

import { getConsultation } from '../../utils/requests';

export async function getServerSideProps(context) {
  return {
    props: {
      consultationId: context.params.id
    }
  };
}

const ConsultationPage = ({ consultationId }) => {
  const context = useContext(AppContext);

  const [consultationRecord, setConsultationRecord] = useState(null);

  const [recordValidated, setRecordValidated] = useState(false);

  const fetchConsultationRecord = async () => {
    const _consultationRecord = await getConsultation(
      context.signature,
      consultationId
    );
    setConsultationRecord(_consultationRecord);
    setRecordValidated(true);
  };

  useEffect(() => {
    if (context.isMember || context.whitelistedAccess.includes('Consultations'))
      fetchConsultationRecord();
  }, [context.isMember, context.whitelistedAccess]);

  return (
    <>
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

        {context.signerAddress && !context.profileValidated && (
          <Flex direction='column' alignItems='center' m='auto'>
            <Box fontSize='40px'>
              <Spinner color='red' />
            </Box>
            <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
              Validating your account type..
            </Text>
          </Flex>
        )}

        {context.profileValidated &&
          (context.whitelistedAccess.includes('Consultations') ? (
            <>
              {recordValidated && consultationRecord && (
                <Consultation consultation={consultationRecord} />
              )}
              {recordValidated && !consultationRecord && <Page404 />}
            </>
          ) : context.isMember ? (
            <>
              {recordValidated && consultationRecord && (
                <Consultation consultation={consultationRecord} />
              )}
              {recordValidated && !consultationRecord && <Page404 />}
            </>
          ) : (
            <Flex direction='column' alignItems='center' m='auto'>
              <Box fontSize='40px'>
                <i className='fa-solid fa-lock'></i>
              </Box>
              <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
                You are not a member onchain.
              </Text>
            </Flex>
          ))}
      </Flex>
    </>
  );
};

export default ConsultationPage;
