/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import { validateMembership } from '../../utils/web3';
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
  const [accountValidated, setAccountValidated] = useState(false);

  const checkMembership = async () => {
    const isMember = await validateMembership(context.signerAddress);
    context.setWeb3Data({ isMember });
    setAccountValidated(true);
  };

  const fetchMemberRecord = async () => {
    const _memberRecord = await getMemberById(memberId);
    setMemberRecord(_memberRecord);
    setRecordValidated(true);
  };

  useEffect(() => {
    context.signerAddress && checkMembership();
    context.isMember && fetchMemberRecord();
  }, [context.signerAddress, context.isMember]);

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

        {context.signerAddress && !accountValidated && (
          <Flex direction='column' alignItems='center' m='auto'>
            <Box fontSize='40px'>
              <Spinner color='red' />
            </Box>
            <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
              Validating your account type..
            </Text>
          </Flex>
        )}

        {accountValidated && (
          <>
            {!context.isMember && (
              <Flex direction='column' alignItems='center' m='auto'>
                <Box fontSize='40px'>
                  <i className='fa-solid fa-lock'></i>
                </Box>
                <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
                  You are not a member
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