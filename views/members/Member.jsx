/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Grid,
  GridItem,
  VStack,
  Text,
  Tag,
  UnorderedList,
  ListItem,
  Button,
  Textarea,
  Image,
  SimpleGrid
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { getProfile } from '../../utils/3Box';
import { theme } from '../../styles/theme';

const StyledGrid = styled(Grid)`
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(1, 1fr);
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

export const Member = ({ member }) => {
  const [championBoxProfileImage, setChampionBoxProfileImage] = useState(null);
  const {
    name,
    email_address,
    discord_handle,
    eth_address,
    guild_class,
    primary_skills,
    is_raiding,
    championed_by,
    application
  } = member;

  const getBoxProfile = async (eth_address) => {
    const profile = await getProfile(eth_address);
    return profile.imageUrl;
  };

  useEffect(() => {
    if (championed_by && championed_by.eth_address) {
      getBoxProfile(championed_by.eth_address)
        .then((image) => {
          setChampionBoxProfileImage(image);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <StyledGrid>
      <GridItem colSpan={4} rowSpan={1} bg='blackLight'>
        <StyledCardTitle>Member Info</StyledCardTitle>
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
              <StyledTag size='sm'>{guild_class}</StyledTag>
              <StyledTag size='sm'>{getAccountString(eth_address)}</StyledTag>
              {discord_handle && (
                <StyledTag size='sm'>{discord_handle}</StyledTag>
              )}
              {email_address && (
                <StyledTag size='sm'>{email_address}</StyledTag>
              )}
            </Flex>
          </Flex>

          <StyledDescriptionText
            value={application.introduction}
            fontSize='sm'
          />

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

      <GridItem colSpan={4} rowSpan={1}>
        <StyledCardTitle>Mutations</StyledCardTitle>
        <SimpleGrid columns={3}></SimpleGrid>
      </GridItem>

      <GridItem colStart={5} rowStart={1} spacing='10px'>
        <StyledStatusText>
          {is_raiding ? 'raiding' : 'not raiding'}
        </StyledStatusText>
        <StyledCardTitle textAlign='center'>Championed By</StyledCardTitle>
        <VStack mb='1rem' p='.5rem'>
          <Image
            src={championBoxProfileImage && championBoxProfileImage}
            w='50px'
            borderRadius='50%'
            alt='profile image'
            fallbackSrc='/assets/logos/cleric.png'
            mt='10px'
          />
          <Link
            href={`/members/${championed_by && championed_by._id}`}
            passHref
          >
            <StyledLinkText>
              {championed_by ? championed_by.name : 'NaN'}
            </StyledLinkText>
          </Link>
        </VStack>

        {/* <StyledCardTitle>Championed For</StyledCardTitle>
        {!raid_party && <StyledLinkText>NaN</StyledLinkText>}
        {raid_party &&
          raid_party.members.map((member, index) => {
            return (
              <Link href={`/members/${member._id}`} passHref key={index}>
                <StyledLinkText>{member.name}</StyledLinkText>
              </Link>
            );
          })} */}
      </GridItem>
    </StyledGrid>
  );
};
