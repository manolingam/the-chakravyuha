/* eslint-disable react-hooks/exhaustive-deps */
import {
  Grid,
  GridItem,
  VStack,
  Text,
  Tag,
  Button,
  Textarea,
  Image,
  SimpleGrid,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Stack,
  Input
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';

import { AppContext } from '../../context/AppContext';
import { getProfile } from '../../utils/3Box';
import { theme } from '../../styles/theme';
import { SKILLS } from '../../utils/constants';
import { getChampions } from '../../utils/requests';

const StyledGrid = styled(Grid)`
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(1, 1fr);
  font-family: ${theme.fonts.spaceMono};
  margin-bottom: 2rem;
  grid-gap: 1rem;
`;

const StyledFormLabel = styled(FormLabel)`
  font-family: ${theme.fonts.rubik};
  background-color: ${theme.colors.red};
  color: ${theme.colors.black};
  padding: 1rem;
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
  color: ${theme.colors.greyLight};
  border: none;
  border: 2px solid ${theme.colors.red};
`;

const StyledInput = styled(Input)`
  border-color: ${theme.colors.red};
  border: 2px solid ${theme.colors.red};
  color: ${theme.colors.greyLight};
`;

export const Member = ({ member }) => {
  const context = useContext(AppContext);
  const [championBoxProfileImage, setChampionBoxProfileImage] = useState(null);
  const [champions, setChampions] = useState([]);
  const [primarySkills, setPrimarySkills] = useState(member.primary_skills);

  const {
    _id,
    name,
    email_address,
    discord_handle,
    eth_address,
    guild_class,
    is_raiding,
    championed_by,
    application
  } = member;

  const getBoxProfile = async (eth_address) => {
    const profile = await getProfile(eth_address);
    return profile.imageUrl;
  };

  const getMyChampions = async () => {
    const members = await getChampions(_id);
    setChampions(members);
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
    getMyChampions();
  }, []);

  return (
    <StyledGrid>
      <GridItem colSpan={5} rowSpan={1} bg='blackLight'>
        <StyledCardTitle>Member Info</StyledCardTitle>
        <VStack alignItems='flex-start' p='2rem'>
          <SimpleGrid columns={2} gridGap='10px' mb='.5rem' w='100%'>
            <FormControl fontFamily='spaceMono'>
              <FormLabel color='red' fontWeight='bold'>
                Name <StyledTag>{guild_class}</StyledTag>
              </FormLabel>
              <StyledInput onChange={() => {}} value={name} fontSize='sm' />
            </FormControl>
            <FormControl fontFamily='spaceMono'>
              <FormLabel color='white'>Discord</FormLabel>
              <StyledInput
                onChange={() => {}}
                value={discord_handle ? discord_handle : ''}
                fontSize='sm'
              />
            </FormControl>
            <FormControl fontFamily='spaceMono'>
              <FormLabel color='white'>Email</FormLabel>
              <StyledInput
                onChange={() => {}}
                value={email_address ? email_address : ''}
                fontSize='sm'
              />
            </FormControl>
            <FormControl fontFamily='spaceMono'>
              <FormLabel color='white'>Eth Address</FormLabel>
              <StyledInput
                onChange={() => {}}
                value={eth_address}
                fontSize='sm'
              />
            </FormControl>
          </SimpleGrid>
          <FormControl fontFamily='spaceMono'>
            <FormLabel color='white'>Introduction</FormLabel>
            <StyledDescriptionText
              value={application.introduction}
              fontSize='sm'
            />
          </FormControl>
        </VStack>
      </GridItem>

      <GridItem colSpan={2} spacing='10px'>
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
          {!championed_by ? (
            <Text>Not Found</Text>
          ) : (
            <Link
              href={`/members/${championed_by && championed_by._id}`}
              passHref
            >
              <StyledLinkText>
                {championed_by ? championed_by.name : 'NaN'}
              </StyledLinkText>
            </Link>
          )}
        </VStack>

        <StyledCardTitle textAlign='center'>Championed For</StyledCardTitle>
        {!champions.length && (
          <Text p='1rem' textAlign='center'>
            None
          </Text>
        )}
        {champions &&
          champions.map((champion, index) => {
            return (
              <Link href={`/members/${champion._id}`} passHref key={index}>
                <StyledLinkText>{champion.name}</StyledLinkText>
              </Link>
            );
          })}
      </GridItem>

      <GridItem colSpan={3}>
        <FormControl fontFamily='spaceMono'>
          <StyledFormLabel mb={5}>Skills</StyledFormLabel>
          <CheckboxGroup
            color='red'
            onChange={(e) => setPrimarySkills(e)}
            value={primarySkills}
          >
            <Stack direction='column' maxH='350px' overflowY='scroll'>
              {SKILLS.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    value={value}
                    color='red'
                    fontFamily='jetbrains'
                    size='sm'
                  >
                    {value}
                  </Checkbox>
                );
              })}
            </Stack>
          </CheckboxGroup>
        </FormControl>
        <Button
          w='100%'
          _hover={{
            opacity: '0.8'
          }}
          mt='1rem'
          disabled={context.signerAddress.toLowerCase() !== eth_address}
        >
          Update
        </Button>
      </GridItem>
    </StyledGrid>
  );
};
