/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Text, Spinner, Image, Tooltip } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import { Raid } from '../../views/raids/Raid';
import { Page404 } from '../../shared/404';

import { getRaid } from '../../utils/requests';

export async function getServerSideProps(context) {
  return {
    props: {
      raidId: context.params.id
    }
  };
}

const RaidPage = ({ raidId }) => {
  const context = useContext(AppContext);

  const [raidRecord, setRaidRecord] = useState(null);

  const [recordValidated, setRecordValidated] = useState(false);

  const fetchRaidRecord = async () => {
    const _raidRecord = await getRaid(context.signature, raidId);
    setRaidRecord(_raidRecord);
    setRecordValidated(true);
  };

  useEffect(() => {
    context.isMember && fetchRaidRecord();
  }, [context.isMember]);

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
                {recordValidated && raidRecord && <Raid raid={raidRecord} />}
                {recordValidated && !raidRecord && <Page404 />}
              </>
            )}
          </>
        )}
      </Flex>
    </>
  );
};

export default RaidPage;
