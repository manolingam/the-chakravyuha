import {
  Flex,
  Text,
  Tag,
  Divider,
  UnorderedList,
  ListItem,
  Button,
  SimpleGrid,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Textarea
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getApplication } from '../utils/requests';

export const Member = ({ member }) => {
  const router = useRouter();
  const formattedMember = member[0];

  const [application, setApplication] = useState(null);

  const fetchApplication = async () => {
    const { application } = await getApplication(formattedMember.application);
    setApplication(application[0]);
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  return (
    <Flex
      direction='row'
      w='100%'
      minH='250px'
      alignItems='center'
      justifyContent='center'
      fontFamily='spaceMono'
      border='2px solid'
      borderColor='blackLight'
      p='2rem'
      my='2rem'
    >
      {!application && <Spinner color='red' />}

      {application && (
        <>
          <Flex direction='column' h='100%' w='75%'>
            <Flex
              direction='row'
              w='100%'
              justifyContent='space-between'
              alignItems='center'
              mb='1rem'
            >
              <Flex
                direction='column'
                alignItems='baseline'
                justifyContent='center'
              >
                <Text
                  fontFamily='jetbrains'
                  color='greyLight'
                  fontWeight='bold'
                  fontSize='sm'
                >
                  {formattedMember.is_raiding ? 'Raiding' : 'Not raiding'}
                </Text>
                <Link
                  href={`/applications/${formattedMember.application}`}
                  passHref
                >
                  <Text
                    color='red'
                    fontFamily='rubik'
                    textDecoration='underline'
                    cursor='pointer'
                  >
                    {formattedMember.name} <i className='fa-solid fa-link'></i>
                  </Text>
                </Link>
              </Flex>
              <Flex>
                {formattedMember.email_address && (
                  <Popover>
                    <PopoverTrigger>
                      <Tag
                        fontFamily='jetbrains'
                        bg='purple'
                        fontWeight='bold'
                        fontSize='sm'
                        color='white'
                        mr='1rem'
                        cursor='pointer'
                      >
                        <i className='fa-solid fa-envelope'></i>
                      </Tag>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverBody>{formattedMember.email_address}</PopoverBody>
                    </PopoverContent>
                  </Popover>
                )}
                {formattedMember.discord_handle && (
                  <Popover>
                    <PopoverTrigger>
                      <Tag
                        fontFamily='jetbrains'
                        bg='purple'
                        fontWeight='bold'
                        fontSize='sm'
                        color='white'
                        mr='1rem'
                        cursor='pointer'
                      >
                        <i className='fa-brands fa-discord'></i>
                      </Tag>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverBody>
                        {formattedMember.discord_handle}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                )}
                {formattedMember.telegram_handle && (
                  <Popover>
                    <PopoverTrigger>
                      <Tag
                        fontFamily='jetbrains'
                        bg='purple'
                        fontWeight='bold'
                        fontSize='sm'
                        color='white'
                        mr='1rem'
                        cursor='pointer'
                      >
                        <i className='fa-brands fa-telegram'></i>
                      </Tag>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverBody>
                        {formattedMember.telegram_handle}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                )}
              </Flex>
            </Flex>

            <Flex direction='column' color='white'>
              <Textarea
                value={application.introduction}
                bg='blackLight'
                border='none'
              />
            </Flex>
          </Flex>

          <Flex
            h='100%'
            w='25%'
            direction='column'
            alignItems='flex-start'
            spacing='10px'
            ml='2rem'
          >
            <Text color='red' fontWeight='bold' mx='auto'>
              {formattedMember.guild_class}
            </Text>

            <Divider my='1rem' />

            <Flex w='100%' direction='column'>
              <Text my='1rem' fontFamily='spaceMono' color='purpleLight'>
                Primary Skills
              </Text>
              <UnorderedList>
                {formattedMember.primary_skills.map((skill, index) => {
                  return (
                    <ListItem key={index} color='white' fontSize='sm'>
                      {skill}
                    </ListItem>
                  );
                })}
              </UnorderedList>

              <Button bg='red' w='100%' mt='1rem' isDisabled>
                <i className='fa-solid fa-ban'></i>
                <Text ml='5px'>Update Roles</Text>
              </Button>
            </Flex>

            {/* {formattedRaid.status === 'Shipped' && (
                <Button bg='red' w='100%' mb='1rem' isDisabled>
                  <i className='fa-solid fa-ban'></i>
                  <Text ml='5px'>Shipped</Text>
                </Button>
              )}
              {formattedRaid.status === 'Lost' && (
                <Button bg='red' w='100%' mb='1rem' isDisabled>
                  <i className='fa-solid fa-ban'></i>
                  <Text ml='5px'>Lost</Text>
                </Button>
              )}
              {formattedRaid.status === 'Raiding' && (
                <Button bg='red' w='100%' mb='1rem' isDisabled>
                  <i className='fa-solid fa-ban'></i>
                  <Text ml='5px'>Raiding</Text>
                </Button>
              )} */}
          </Flex>
        </>
      )}
    </Flex>
  );
};
