/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Tag,
  Text,
  Button,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Spinner
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { getAllMembers } from '../utils/requests';

const StyledPrimaryButton = styled(Button)`
  min-width: 160px;
  height: 50px;
  text-transform: uppercase;
  color: black;
  border-radius: 2px;
  padding-left: 24px;
  padding-right: 24px;
`;

const RECORDS_PER_PAGE = 10;

export const Members = ({ members, recordCount }) => {
  const [fetching, setFetching] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const cropRecords = (page, _members) => {
    setTotalPages(Math.ceil(recordCount / RECORDS_PER_PAGE));
    setCurrentRecords(_members);
  };

  const fetchMembers = async () => {
    setFetching(true);
    const data = await getAllMembers((currentPage - 1) * RECORDS_PER_PAGE);
    cropRecords(currentPage, data.members);
    setFetching(false);
  };

  useEffect(() => {
    fetchMembers();
  }, [currentPage]);

  useEffect(() => {
    cropRecords(1, members);
  }, [members]);

  return (
    <Flex
      direction='column'
      w='100%'
      minH='250px'
      alignItems='center'
      justifyContent='center'
      py='2rem'
    >
      {fetching && <Spinner color='red' size='xl' />}
      {!fetching && (
        <>
          <Flex w='100%' alignItems='center'>
            <Text
              maxW='350px'
              bg='red'
              p='5px'
              color='white'
              fontFamily='rubik'
              mr='auto'
            >
              Members Portal
            </Text>
          </Flex>

          <SimpleGrid columns='1' w='100%' my='2rem'>
            {currentRecords.map((record, index) => {
              return (
                <Link key={index} href={`/members/${record._id}`} passHref>
                  <Flex
                    direction='row'
                    p='1rem'
                    fontFamily='spaceMono'
                    justifyContent='space-between'
                    border='2px solid'
                    borderColor='blackLight'
                    color='white'
                    cursor='pointer'
                    _hover={{
                      backgroundColor: 'blackLight'
                    }}
                    my='5px'
                  >
                    <Text>{record.name}</Text>
                    {/* <Tag bg='purpleLight' fontSize='xs' mr='2rem'>
                      {filterType === 'apprentice' && (
                        <i className='fa-solid fa-circle-pause'></i>
                      )}
                      {filterType === 'member' && (
                        <i className='fa-solid fa-ban'></i>
                      )}
                    </Tag> */}
                  </Flex>
                </Link>
              );
            })}
          </SimpleGrid>

          {totalPages > 0 && (
            <Flex direction='row' mt='2rem'>
              <StyledPrimaryButton
                bg='red'
                mr='1rem'
                fontFamily='spaceMono'
                disabled={currentPage - 1 == 0}
                onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
                _hover={{
                  opacity: currentPage - 1 == 0 ? 0.5 : 0.8
                }}
              >
                Prev
              </StyledPrimaryButton>
              <NumberInput
                w='150px'
                max={totalPages}
                onChange={(e) => {
                  if (Number(e) > 0 && Number(e) <= totalPages) {
                    setCurrentPage(Number(e));
                  }
                }}
              >
                <NumberInputField
                  h='100%'
                  border='2px solid'
                  borderColor='red'
                  borderRadius='3px'
                  fontFamily='spaceMono'
                  color='red'
                  placeholder='Go to page'
                />
              </NumberInput>
              <StyledPrimaryButton
                bg='red'
                ml='1rem'
                fontFamily='spaceMono'
                disabled={currentPage + 1 > totalPages}
                onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
                _hover={{
                  opacity: currentPage + 1 > totalPages ? 0.5 : 0.8
                }}
              >
                Next
              </StyledPrimaryButton>
            </Flex>
          )}

          {totalPages > 0 && (
            <Text fontFamily='spaceMono' color='white' mt='2rem'>
              Page {currentPage} of {totalPages}
            </Text>
          )}
        </>
      )}
    </Flex>
  );
};
