/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  Button,
  SimpleGrid,
  Box,
  Flex,
  Spinner,
  Image
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { AppContext } from '../context/AppContext';
import { validateMembership } from '../utils/web3';
import { getMemberByAddress } from '../utils/requests';
import { getProfile } from '../utils/3Box';

export default function Home() {
  const context = useContext(AppContext);
  const router = useRouter();
  const [accountValidated, setAccountValidated] = useState(false);
  const [boxProfile, setBoxProfile] = useState(null);

  const checkMembership = async () => {
    const isMember = await validateMembership(context.signerAddress);
    context.setWeb3Data({ isMember });
    if (isMember) {
      const profile = await getProfile(context.signerAddress);
      setBoxProfile(profile);
    }
  };

  const getMemberProfile = async () => {
    const member = await getMemberByAddress(context.signerAddress);
    context.setWeb3Data({ member });
    setAccountValidated(true);
  };

  useEffect(() => {
    if (context.signerAddress) {
      checkMembership();
      getMemberProfile();
    }
  }, [context.signerAddress]);

  return (
    <SimpleGrid
      columns={{ lg: 2, sm: 1 }}
      w='80%'
      spacing='1rem'
      alignItems='center'
    >
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
        <Flex direction='column' alignItems='center' m='auto'>
          {context.member.name ? (
            <>
              {boxProfile && (
                <Image
                  src={boxProfile.imageUrl}
                  w='100px'
                  borderRadius='50%'
                  alt='profile image'
                />
              )}
              <Text
                textAlign='center'
                maxW='500px'
                fontFamily='uncial'
                fontSize='18px'
                mt='1rem'
                color='red'
                textDecoration='underline'
                onClick={() => router.push(`/members/${context.member._id}`)}
                cursor='pointer'
                _hover={{ color: 'black' }}
              >
                {`Welcome ${context.member.name}`}!
              </Text>
            </>
          ) : context.isMember ? (
            <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
              You are a member onchain but no records found offchain.
            </Text>
          ) : (
            <>
              <Box fontSize='40px' color='purple'>
                <i className='fa-solid fa-lock'></i>
              </Box>
              <Text textAlign='center' maxW='500px' fontFamily='spaceMono'>
                You are not a member onchain.
              </Text>
            </>
          )}
        </Flex>
      )}

      <SimpleGrid
        columns='2'
        gridGap='1rem'
        fontFamily='spaceMono'
        fontSize='18px'
        px='1rem'
        h='300px'
      >
        <Button
          w='100%'
          h='100%'
          justifyContent='center'
          isDisabled={!context.isMember}
          bg={context.isMember ? 'red' : 'greyLight'}
          onClick={() => router.push('/applications')}
          textTransform='uppercase'
        >
          <Flex direction='column'>
            <Box fontSize='2rem' mb='5px'>
              <i className='fa-solid fa-dungeon'></i>
            </Box>
            <Text>applications</Text>
          </Flex>
        </Button>
        <Button
          w='100%'
          h='100%'
          justifyContent='center'
          isDisabled={!context.isMember}
          bg={context.isMember ? 'red' : 'greyLight'}
          onClick={() => router.push('/consultations')}
          textTransform='uppercase'
        >
          <Flex direction='column'>
            <Box fontSize='2rem' mb='5px'>
              <i className='fa-solid fa-dungeon'></i>
            </Box>
            <Text>consultations</Text>
          </Flex>
        </Button>
        <Button
          w='100%'
          h='100%'
          justifyContent='center'
          isDisabled={!context.isMember}
          bg={context.isMember ? 'red' : 'greyLight'}
          onClick={() => router.push('/raids')}
          textTransform='uppercase'
        >
          <Flex direction='column'>
            <Box fontSize='2rem' mb='5px'>
              <i className='fa-solid fa-dungeon'></i>
            </Box>
            <Text>raids</Text>
          </Flex>
        </Button>
        <Button
          w='100%'
          h='100%'
          justifyContent='center'
          isDisabled={!context.isMember}
          bg={context.isMember ? 'red' : 'greyLight'}
          onClick={() => router.push('/members')}
          textTransform='uppercase'
        >
          <Flex direction='column'>
            <Box fontSize='2rem' mb='5px'>
              <i className='fa-solid fa-dungeon'></i>
            </Box>
            <Text>members</Text>
          </Flex>
        </Button>
      </SimpleGrid>
    </SimpleGrid>
  );
}
