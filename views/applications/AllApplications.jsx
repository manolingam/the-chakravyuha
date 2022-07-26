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

export const AllApplications = ({ applicationsOnLoad }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const paginate = (_records, _pageNumber) => {
    _pageNumber ? setCurrentPage(_pageNumber) : null;
    const indexOfLastRecord = currentPage * RECORDS_PER_PAGE;
    const indexOfFirstRecord = indexOfLastRecord - RECORDS_PER_PAGE;
    const currentRecords = _records.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );

    setCurrentRecords(currentRecords);
  };

  const cropRecords = (_applications, _page) => {
    setTotalPages(Math.ceil(_applications.length / RECORDS_PER_PAGE));
    paginate(_applications, _page);
  };

  useEffect(() => {
    cropRecords(applicationsOnLoad);
  }, [currentPage]);

  useEffect(() => {
    cropRecords(applicationsOnLoad, 1);
  }, [applicationsOnLoad]);

  return (
    <Flex
      direction='column'
      w='100%'
      minH='250px'
      alignItems='center'
      justifyContent='center'
      py='2rem'
    >
      <Flex w='100%' alignItems='center'>
        <Text maxW='350px' bg='red' p='5px' fontFamily='rubik' mr='auto'>
          Applicants Portal
        </Text>
      </Flex>

      <SimpleGrid columns='1' w='100%' my='2rem'>
        {currentRecords.map((record, index) => {
          return (
            <Link key={index} href={`/applications/${record._id}`} passHref>
              <Flex
                direction='row'
                p='1rem'
                fontFamily='spaceMono'
                justifyContent='space-between'
                border='2px solid'
                borderColor='blackLight'
                color='blackLight'
                cursor='pointer'
                _hover={{
                  backgroundColor: 'blackLight',
                  color: 'white'
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
        <Text fontFamily='spaceMono' mt='2rem'>
          Page {currentPage} of {totalPages}
        </Text>
      )}
    </Flex>
  );
};
