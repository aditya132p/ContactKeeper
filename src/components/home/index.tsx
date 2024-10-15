"use client"

import * as react from 'react';
import { Text, Button, Box, Grid, Container, Heading, Flex, Spinner } from "@radix-ui/themes";
import CardBox from '../contactCard/cardBox';
import ButtonDailog from '../buttonDailog/buttonDailog';
import { useAddContactMutation, useGetContactsQuery } from '@/store/api';
import { useEffect, useState } from 'react';
import { User } from "@/types/Error"
import { useSelector } from 'react-redux';
import { IoMdContacts } from 'react-icons/io';



const Home = () => {
  const { data, refetch } = useGetContactsQuery({})
  const [opens, setOpens] = react.useState([])
  console.log(data)

  return (

    <Box width={"100%"} className=' bg-violet-100'  >
      <Box className='py-11 px-14'>
        <Container size={"4"} className=' h-screen '>
          <Flex justify="between" className=''>
            <Box as='div' className='w-[50%]'>
              <Heading className='text-3xl'>Contact</Heading>
              <Text as='p'>Lorem ipsum dolor sit amet consectetur.</Text>
            </Box>
            <Flex as='div' justify="end" align={"center"} >
              <ButtonDailog isEdit buttonName=" Add Contact" style='inline-flex h-[35px] gap-2 items-center justify-center rounded bg-purple-700 py-[20px] text-white  px-[15px] font-medium leading-none focus:outline-none' />
            </Flex>
          </Flex>
          {!data ? (
            <div className='flex w-full h-[400px] justify-center items-center'>
              <Spinner className='text-purple-600 ' />
            </div>

          ) : (
            <>
              <Grid columns="4" gap="4" rows="repeat(2, 300px)" width="auto" className="pt-11">
                {data?.map((user, idx) => (
                  <CardBox
                    key={idx}
                    userData={user}
                  />
                ))}
              </Grid>
            </>
          )}
        </Container>
      </Box >
    </Box >
  )
}
export default Home