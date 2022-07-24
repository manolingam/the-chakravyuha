import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { ObjectId } from 'mongodb';

import { AppContext } from '../../context/AppContext';
import { connectToDatabase } from '../../utils/mongo';
import { validateMembership } from '../../utils/web3';
import { Member } from '../../views/Member';
import { Page404 } from '../../shared/404';

export async function getServerSideProps(context) {
  try {
    const { db } = await connectToDatabase();
    const member = await db
      .collection('members')
      .find({ _id: ObjectId(context.params.id) })
      .toArray();
    return {
      props: {
        member: JSON.stringify(member)
      }
    };
  } catch (e) {
    return {
      props: {
        member: []
      }
    };
  }
}

const MemberPage = ({ member }) => {
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
    <>
      {member.length > 0 ? (
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
            <Member member={JSON.parse(member)} />
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
              <Flex
                direction='column'
                alignItems='center'
                m='auto'
                color='white'
              >
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
      ) : (
        <Page404 />
      )}
    </>
  );
};

export default MemberPage;
