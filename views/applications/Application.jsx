/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Grid,
  GridItem,
  VStack,
  Text,
  Tag,
  Divider,
  UnorderedList,
  ListItem,
  Button,
  Tooltip,
  Image,
  SimpleGrid,
  Textarea
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { getProfile } from '../../utils/3Box';

import { theme } from '../../styles/theme';

const StyledGrid = styled(Grid)`
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  font-family: ${theme.fonts.spaceMono};
  margin-bottom: 2rem;
  grid-gap: 1rem;
`;

const StyledCardTitle = styled(Text)`
  font-family: ${theme.fonts.rubik};
  background-color: ${theme.colors.red};
  color: ${theme.colors.black};
  padding: 1rem;
`;

const StyledStatusText = styled(Text)`
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  background-color: ${theme.colors.purple};
  padding: 10px;
  margin-bottom: 1rem;
`;

const StyledTag = styled(Tag)`
  margin-right: 5px;
  background-color: ${theme.colors.blackDark};
  color: ${theme.colors.white};
  font-weight: bold;
`;

const StyledLinkText = styled(Text)`
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: ${theme.colors.red};
  text-decoration: underline;
  cursor: pointer;
  text-transform: uppercase;
  margin-top: 10px;
`;

const StyledDescriptionText = styled(Textarea)`
  width: 100%;
  min-height: 200px;
  color: white;
  border: none;
  border: 2px solid ${theme.colors.red};
`;

const getAccountString = (account) => {
  const len = account.length;
  return `0x${account.substr(2, 3).toUpperCase()}...${account
    .substr(len - 3, len - 1)
    .toUpperCase()}`;
};

export const Application = ({ application }) => {
  const [boxProfile, setBoxProfile] = useState(null);
  const {
    name,
    introduction,
    email_address,
    discord_handle,
    eth_address,
    primary_skills,
    skill_type
  } = application;

  //   const getBoxProfile = async () => {
  //     const profile = await getProfile(raid.cleric.eth_address);
  //     setBoxProfile(profile);
  //   };

  //   useEffect(() => {
  //     if (raid && raid.cleric && raid.cleric.eth_address) {
  //       getBoxProfile();
  //     }
  //   }, []);

  return (
    <StyledGrid>
      <GridItem colSpan={4} rowSpan={1} bg='blackLight'>
        <StyledCardTitle>Applicant Info</StyledCardTitle>
        <VStack alignItems='flex-start' p='2rem'>
          <Flex
            direction='column'
            justifyContent='space-between'
            alignItems='flex-start'
            mb='.5rem'
          >
            <Text color='red' fontWeight='bold' mb='5px' fontSize='xl'>
              {name}
            </Text>

            <Flex direction='row'>
              <StyledTag size='sm'>{skill_type}</StyledTag>
              <StyledTag size='sm'>{getAccountString(eth_address)}</StyledTag>
              {discord_handle && (
                <StyledTag size='sm'>{discord_handle}</StyledTag>
              )}
              {email_address && (
                <StyledTag size='sm'>{email_address}</StyledTag>
              )}
            </Flex>
          </Flex>

          <StyledDescriptionText size='sm' value={introduction} />

          <Flex direction='column'>
            <Text
              mt='2rem'
              mb='.5rem'
              fontFamily='spaceMono'
              color='purpleLight'
            >
              Primary Skills
            </Text>
            <UnorderedList>
              {primary_skills.map((skill, index) => {
                return (
                  <ListItem key={index} color='white' fontSize='sm'>
                    {skill}
                  </ListItem>
                );
              })}
            </UnorderedList>
          </Flex>
        </VStack>
      </GridItem>

      <GridItem colSpan={4} rowSpan={1} bg='blackLight'></GridItem>

      <GridItem colSpan={4} rowSpan={1}>
        <StyledCardTitle>Mutations</StyledCardTitle>
        {/* <SimpleGrid columns={3}>
          {raid && consultationStatus === 'pending' && (
            <VStack mt='1rem'>
              <Button
                w='100%'
                _hover={{
                  opacity: '0.8'
                }}
              >
                <i className='fa-solid fa-circle-check'></i>
                <Text ml='5px'>Complete</Text>
              </Button>
              <Text fontSize='xs' fontFamily='jetbrains'>
                Already promoted to a raid. Please mark the consultation as
                complete.
              </Text>
            </VStack>
          )}

          {!raid && bidStatus !== 'queued' && consultationStatus === 'pending' && (
            <VStack mt='1rem'>
              <Button
                bg='black'
                w='100%'
                _hover={{
                  opacity: '0.8'
                }}
              >
                Promote
              </Button>
              <Button
                w='100%'
                _hover={{
                  opacity: '0.8'
                }}
              >
                Cancel
              </Button>
            </VStack>
          )}
        </SimpleGrid> */}
      </GridItem>

      <GridItem colStart={5} rowStart={1} spacing='10px'>
        <StyledStatusText>not championed</StyledStatusText>
        <StyledCardTitle textAlign='center'>Championed By</StyledCardTitle>
        {/* <VStack mb='1rem' p='.5rem'>
          <Image
            src={boxProfile && boxProfile.imageUrl}
            w='75px'
            borderRadius='50%'
            alt='profile image'
            fallbackSrc='/assets/logos/cleric.png'
            mt='10px'
          />
          <Link href={`/members/${raid.cleric && raid.cleric._id}`} passHref>
            <StyledLinkText>
              {raid && raid.cleric ? raid.cleric.name : 'NaN'}
            </StyledLinkText>
          </Link>
        </VStack>

        {raid && (
          <Link href={`/raids/${raid._id}`} passHref>
            <StyledLinkText>View Raid</StyledLinkText>
          </Link>
        )} */}
      </GridItem>
    </StyledGrid>
  );
};
