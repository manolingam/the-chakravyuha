/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import { Member } from '../../views/members/Member';
import { Page404 } from '../../shared/404';

import { getMemberById } from '../../utils/requests';

export async function getServerSideProps(context) {
  return {
    props: {
      memberId: context.params.id
    }
  };
}

const RaidPage = ({ memberId }) => {
  const context = useContext(AppContext);

  const [memberRecord, setMemberRecord] = useState(null);

  const [recordValidated, setRecordValidated] = useState(false);

  const fetchMemberRecord = async () => {
    const _memberRecord = await getMemberById(memberId);
    setMemberRecord(_memberRecord);
    setRecordValidated(true);
  };

  useEffect(() => {
    context.isMember && fetchMemberRecord();
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
                {recordValidated && memberRecord && (
                  <Member member={memberRecord} />
                )}
                {recordValidated && !memberRecord && <Page404 />}
              </>
            )}
          </>
        )}
      </Flex>
    </>
  );
};

export default RaidPage;
