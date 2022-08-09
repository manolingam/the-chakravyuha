/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Box,
  Text,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  Link as ChakraLink,
  Image,
  Tooltip
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';

import { getValhallaFiles, getValhallaFile } from '../../utils/requests';

const Index = () => {
  const context = useContext(AppContext);

  const [files, setFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState('');
  const [fetching, setFetching] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const listFiles = async () => {
    setFetching(true);
    const files = await getValhallaFiles(context.signature);
    setFiles(files);
    setFetching(false);
  };

  const getFile = async (key) => {
    const file = await getValhallaFile(key, context.signature);
    setFileUrl(file);
  };

  useEffect(() => {
    if (context.isMember) {
      listFiles();
    }
  }, [context.isMember]);

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

      {context.isMember || context.whitelistedAccess.includes('Valhalla') ? (
        !fetching ? (
          files.length && (
            <Flex direction='column'>
              <Text
                maxW='350px'
                bg='red'
                p='5px'
                fontFamily='rubik'
                mr='auto'
                mb='1rem'
              >
                Valhalla Portal
              </Text>
              <SimpleGrid columns={{ lg: 3, md: 2, sm: 1 }} gap={2}>
                {files.slice(1).map((file, index) => (
                  <Text
                    px='10px'
                    py='10px'
                    fontFamily='spaceMono'
                    bg='blackLight'
                    border='2px solid'
                    borderColor='blackLight'
                    color='white'
                    cursor='pointer'
                    _hover={{
                      bg: 'white',
                      color: 'blackLight'
                    }}
                    key={index}
                    onClick={() => {
                      onOpen();
                      getFile(file.Key);
                    }}
                  >
                    {file.Key.slice(9, -5)}
                  </Text>
                ))}
              </SimpleGrid>
            </Flex>
          )
        ) : (
          <Spinner size='xl' color='red' mx='auto' />
        )
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction='column'
              alignItems='center'
              justifyContent='center'
              p='2rem'
            >
              <Text
                fontWeight='bold'
                fontFamily='spaceMono'
                textTransform='uppercase'
                mb='1rem'
              >
                File url generated
              </Text>
              <Text mb='2rem' fontFamily='spaceMono'>
                The generated url will expire in 15 minutes.
              </Text>
              <ChakraLink
                isExternal
                href={fileUrl}
                bg='#ff3864'
                color='white'
                p='10px'
                fontFamily='spaceMono'
                _hover={{
                  opacity: 0.8,
                  textDecoration: 'none'
                }}
              >
                View Channel
              </ChakraLink>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Index;
