import {
  ArrowLeftIcon,
  CaretLeftIcon,
  CaretRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import React from 'react'

interface Props {
  itemCount: number
  pageSize: number
  currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) return null

  return (
    <Flex align='center' gap='2'>
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Button variant='surface' disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button variant='surface' disabled={currentPage === 1}>
        <CaretLeftIcon />
      </Button>
      <Button variant='surface' disabled={currentPage === pageCount}>
        <CaretRightIcon />
      </Button>
      <Button variant='surface' disabled={currentPage === pageCount}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  )
}

export default Pagination
