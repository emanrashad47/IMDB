import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function HalfRating() {
  return (
    <Stack spacing={1} className='d-inline bg-warning-subtle rounded-5 overflow-hidden '>
      <Rating name="half-rating " defaultValue={2.5} precision={0.5} />
    </Stack>
  );
}
