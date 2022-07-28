/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import { Application } from '../../views/applications/Application';
import { Page404 } from '../../shared/404';

import { getApplication } from '../../utils/requests';

export async function getServerSideProps(context) {
  return {
    props: {
      applicationId: context.params.id
    }
  };
}

const ApplicationPage = ({ applicationId }) => {
  const context = useContext(AppContext);

  const [applicationRecord, setApplicationRecord] = useState(null);

  const [recordValidated, setRecordValidated] = useState(false);

  const fetchApplicationRecord = async () => {
    const _applicationRecord = await getApplication(applicationId);
    setApplicationRecord(_applicationRecord);
    setRecordValidated(true);
  };

  useEffect(() => {
    context.isMember && fetchApplicationRecord();
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
                  You are not a member onchain.
                </Text>
              </Flex>
            )}
            {context.isMember && (
              <>
                {recordValidated && applicationRecord && (
                  <Application application={applicationRecord} />
                )}
                {recordValidated && !applicationRecord && <Page404 />}
              </>
            )}
          </>
        )}
      </Flex>
    </>
  );
};

export default ApplicationPage;
