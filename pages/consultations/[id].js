/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import { Consultation } from '../../views/Consultations/Consultation';
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
    const _consultationRecord = await getConsultation(consultationId);
    setConsultationRecord(_consultationRecord);
    setRecordValidated(true);
  };

  useEffect(() => {
    context.isMember && fetchConsultationRecord();
  }, [context.isMember]);

  return (
    <>
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

        {context.profileValidated && (
          <>
            {!context.isMember && (
              <Flex direction='column' alignItems='center' m='auto'>
                <Box fontSize='40px'>
                  <i className='fa-solid fa-lock'></i>
                </Box>
                <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
                  You are either not whitelisted or a member on chain.
                </Text>
              </Flex>
            )}
            {context.isMember && (
              <>
                {recordValidated && consultationRecord && (
                  <Consultation consultation={consultationRecord} />
                )}
                {recordValidated && !consultationRecord && <Page404 />}
              </>
            )}
          </>
        )}
      </Flex>
    </>
  );
};

export default ConsultationPage;
